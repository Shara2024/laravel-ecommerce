<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Product::query()
            ->where('user_id', auth()->id());

        $recordsTotal = $query->count();

        $search = $request->input('search.value');

        if ($search) {
            $query->where('name', 'like', "%{$search}%");
        }

        $recordsFiltered = $query->count();

        $columns = [
            'name',
            'price',
            'stock',
            'created_at',
        ];

        $orderColumnIndex = (int) $request->input(
            'order.0.column',
            0
        );

        $orderDirection = $request->input(
            'order.0.dir',
            'asc'
        );

        $orderColumn = $columns[$orderColumnIndex] ?? 'name';

        $query->orderBy($orderColumn, $orderDirection);

        $start = (int) $request->input('start', 0);
        $length = (int) $request->input('length', 10);

        if ($length !== -1) {
            $query->skip($start)->take($length);
        }

        $products = $query->get();

        return response()->json([
            'draw' => (int) $request->input('draw'),
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => $products,
        ]);
    }


    public function create(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $product = Product::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Product created successfully.',
            'product' => $product,
        ], 201);
    }


    public function update(
        Request $request,
        Product $product
    ): JsonResponse {
        abort_unless(
            $product->user_id === auth()->id(),
            404
        );

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['required', 'integer', 'min:0'],
        ]);

        $product->update($validated);

        return response()->json([
            'message' => 'Product updated successfully.',
            'product' => $product->fresh(),
        ]);
    }


    public function delete(Product $product): JsonResponse
    {
        abort_unless(
            $product->user_id === auth()->id(),
            404
        );

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully.',
        ]);
    }

    public function options(): JsonResponse
    {
        $products = Product::query()
            ->where('user_id', auth()->id())
            ->where('stock', '>', 0)
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'price',
                'stock',
            ]);

        return response()->json([
            'products' => $products,
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $search = trim($request->input('search', ''));

        if ($search === '') {
            return response()->json([
                'products' => [],
            ]);
        }

        $products = Product::query()
            ->where('user_id', auth()->id())
            ->where('stock', '>', 0)
            ->where('name', 'like', "%{$search}%")
            ->orderBy('name')
            ->limit(10)
            ->get([
                'id',
                'name',
                'price',
                'stock',
            ]);

        return response()->json([
            'products' => $products,
        ]);
    }
}
