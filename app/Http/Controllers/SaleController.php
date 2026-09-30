<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use App\Models\Product;
use App\Models\Sale;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class SaleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Sale::query()
            ->where('user_id', auth()->id())
            ->with('customer');

        $recordsTotal = $query->count();

        $search = $request->input('search.value');

        if ($search) {
            $query->whereHas('customer', function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%");
            });
        }

        $recordsFiltered = $query->count();

        $columns = [
            'id',
            'total_amount',
            'created_at',
        ];

        $orderColumnIndex = (int) $request->input(
            'order.0.column',
            2
        );

        $orderDirection = $request->input(
            'order.0.dir',
            'desc'
        );

        $orderColumn = $columns[$orderColumnIndex] ?? 'created_at';

        $query->orderBy($orderColumn, $orderDirection);

        $start = (int) $request->input('start', 0);
        $length = (int) $request->input('length', 10);

        if ($length !== -1) {
            $query->skip($start)->take($length);
        }

        $sales = $query->get();

        return response()->json([
            'draw' => (int) $request->input('draw'),
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => $sales,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'customer_id' => [
                'required',
                'integer',
                'exists:customers,id',
            ],

            'items' => [
                'required',
                'array',
                'min:1',
            ],

            'items.*.product_id' => [
                'required',
                'integer',
                'exists:products,id',
            ],

            'items.*.quantity' => [
                'required',
                'integer',
                'min:1',
            ],
        ]);

        $customer = Customer::query()
            ->where('id', $validated['customer_id'])
            ->where('user_id', auth()->id())
            ->first();

        if (!$customer) {
            return response()->json([
                'message' => 'Customer not found.',
            ], 404);
        }

        $sale = DB::transaction(function () use ($validated) {
            $saleItems = [];
            $totalAmount = 0;

            foreach ($validated['items'] as $item) {
                $product = Product::query()
                    ->where('id', $item['product_id'])
                    ->where('user_id', auth()->id())
                    ->lockForUpdate()
                    ->first();

                if (!$product) {
                    throw ValidationException::withMessages([
                        'items' => [
                            'One or more selected products were not found.',
                        ],
                    ]);
                }

                if ($item['quantity'] > $product->stock) {
                    throw ValidationException::withMessages([
                        'items' => [
                            "Insufficient stock for {$product->name}.",
                        ],
                    ]);
                }

                $unitPrice = (float) $product->price;
                $subtotal = $unitPrice * $item['quantity'];

                $saleItems[] = [
                    'product_id' => $product->id,
                    'quantity' => $item['quantity'],
                    'unit_price' => $unitPrice,
                    'subtotal' => $subtotal,
                ];

                $totalAmount += $subtotal;

                $product->decrement(
                    'stock',
                    $item['quantity']
                );
            }

            $sale = Sale::create([
                'user_id' => auth()->id(),
                'customer_id' => $validated['customer_id'],
                'total_amount' => $totalAmount,
            ]);

            $sale->items()->createMany($saleItems);

            return $sale->load([
                'customer',
                'items.product',
            ]);
        });

        return response()->json([
            'message' => 'Sale created successfully.',
            'sale' => $sale,
        ], 201);
    }

    public function show(Sale $sale): JsonResponse
    {
        abort_unless(
            $sale->user_id === auth()->id(),
            404
        );

        $sale->load([
            'customer',
            'items.product',
        ]);

        return response()->json([
            'sale' => $sale,
        ]);
    }
}
