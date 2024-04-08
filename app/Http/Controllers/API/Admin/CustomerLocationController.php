<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CustomerLocation;

class CustomerLocationController extends Controller
{
    /**
     * Get all customer locations.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $customerLocations = CustomerLocation::all();
        return response()->json($customerLocations);
    }

    /**
     * Store a new customer location.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|unique:customer_locations',
        ]);

        $customerLocation = CustomerLocation::create([
            'name' => $request->input('name'),
        ]);

        return response()->json($customerLocation, 201);
    }

    /**
     * Get a specific customer location.
     *
     * @param  \App\Models\CustomerLocation  $customerLocation
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(CustomerLocation $customerLocation)
    {
        return response()->json($customerLocation);
    }

    /**
     * Update an existing customer location.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\CustomerLocation  $customerLocation
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, CustomerLocation $customerLocation)
    {
        $request->validate([
            'name' => 'required|string|unique:customer_locations,name,' . $customerLocation->id,
        ]);

        $customerLocation->update([
            'name' => $request->input('name'),
        ]);

        return response()->json($customerLocation);
    }

    /**
     * Delete a customer location.
     *
     * @param  \App\Models\CustomerLocation  $customerLocation
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(CustomerLocation $customerLocation)
    {
        $customerLocation->delete();
        return response()->json(['message' => 'Customer location deleted successfully']);
    }
}
