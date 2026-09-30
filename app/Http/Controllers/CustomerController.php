<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $query = Customer::query()
            ->where('user_id', auth()->id());

        $recordsTotal = $query->count();

        $search = $request->input('search.value');

        if ($search) {
            $query->where(function ($query) use ($search) {
                $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            });
        }

        $recordsFiltered = $query->count();

        $columns = [
            'name',
            'phone',
            'created_at',
        ];

        $orderColumnIndex = (int) $request->input('order.0.column', 0);
        $orderDirection = $request->input('order.0.dir', 'asc');
        $orderColumn = $columns[$orderColumnIndex] ?? 'name';

        $query->orderBy($orderColumn, $orderDirection);

        $start = (int) $request->input('start', 0);
        $length = (int) $request->input('length', 10);

        if ($length !== -1) {
            $query->skip($start)->take($length);
        }

        $customers = $query->get();

        return response()->json([
            'draw' => (int) $request->input('draw'),
            'recordsTotal' => $recordsTotal,
            'recordsFiltered' => $recordsFiltered,
            'data' => $customers,
        ]);
    }

    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'phone' => ['required', 'string', 'max:20'],
        ]);

        $customer = Customer::create([
            ...$validated,
            'user_id' => auth()->id(),
        ]);

        return response()->json([
            'message' => 'Customer created successfully.',
            'customer' => $customer,
        ], 201);
    }

    public function update(
        Request $request,
        Customer $customer
    ): JsonResponse {
        abort_unless(
            $customer->user_id === auth()->id(),
            404
        );

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:150'],
            'phone' => ['required', 'string', 'max:20'],
        ]);

        $customer->update($validated);

        return response()->json([
            'message' => 'Customer updated successfully.',
            'customer' => $customer->fresh(),
        ]);
    }

    public function destroy(Customer $customer): JsonResponse
    {
        abort_unless(
            $customer->user_id === auth()->id(),
            404
        );

        $customer->delete();

        return response()->json([
            'message' => 'Customer deleted successfully.',
        ]);
    }

    public function options(): JsonResponse
    {
        $customers = Customer::query()
            ->where('user_id', auth()->id())
            ->orderBy('name')
            ->get([
                'id',
                'name',
                'phone',
            ]);

        return response()->json([
            'customers' => $customers,
        ]);
    }

    public function search(Request $request): JsonResponse
    {
        $search = trim($request->input('search', ''));

        if ($search === '') {
            return response()->json([
                'customers' => [],
            ]);
        }

        $customers = Customer::query()
            ->where('user_id', auth()->id())
            ->where(function ($query) use ($search) {
                $query
                    ->where('name', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%");
            })
            ->orderBy('name')
            ->limit(10)
            ->get([
                'id',
                'name',
                'phone',
            ]);

        return response()->json([
            'customers' => $customers,
        ]);
    }
}
