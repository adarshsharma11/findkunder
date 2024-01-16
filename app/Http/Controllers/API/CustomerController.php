<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $customers = Customer::with(['company', 'person'])->get();
        return response()->json($customers);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'company_id' => 'required|exists:companies,id',
            'person_id' => 'required|exists:contact_person,id',
            'notes' => 'string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], 422);
        }

        $customer = Customer::create($request->all());
        return response()->json(['status' => 'success', 'data' => $customer]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }
        return response()->json($customer);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'company_id' => 'exists:companies,id',
            'person_id' => 'exists:contact_person,id',
            'notes' => 'nullable|string',
        ]);

    
        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], 422);
        }
        try {
            $customer = Customer::findOrFail($id);
        } catch (ModelNotFoundException $e) {
            return response()->json(['status' => 'error', 'message' => 'Customer not found.'], 404);
        }
    
        $customer->update([
            'company_id' => $request->input('company_id'),
            'person_id' => $request->input('person_id'),
            'notes' => $request->input('notes'),
        ]);
    
        return response()->json($customer);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }

        $customer->delete();
        return response()->json(['message' => 'Customer deleted successfully']);
    }
}
