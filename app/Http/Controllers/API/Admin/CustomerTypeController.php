<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CustomerType;


class CustomerTypeController extends Controller
{
    /**
     * Get all customer types.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $customerTypes = CustomerType::all();
        return response()->json($customerTypes);
    }
    /**
     * Store a new customer type.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:customer_types',
        ]);

        $customerType = CustomerType::create([
            'name' => $request->input('name'),
        ]);

        return response()->json($customerType, 201);
    }

    /**
     * Get a specific customer type.
     *
     * @param  \App\Models\CustomerType  $customerType
     * @return \Illuminate\Http\JsonResponse
     */

    public function show(CustomerType $customerType)
    {
        return response()->json($customerType);
    }
    /**
     * Update an existing customer type.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CustomerType  $customerType
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, CustomerType $customerType)
    {
        $request->validate([
            'name' => 'required|string|unique:customer_types,name,' . $customerType->id,
        ]);

        $customerType->update([
            'name' => $request->input('name'),
        ]);

        return response()->json($customerType);
    }
    /**
     * Delete a customer type.
     *
     * @param  \App\Models\CustomerType  $customerType
     * @return \Illuminate\Http\JsonResponse
     */

    public function destroy(CustomerType $customerType)
    {
        $customerType->delete();
        return response()->json(['message' => 'Customer type deleted successfully']);
    }
}
