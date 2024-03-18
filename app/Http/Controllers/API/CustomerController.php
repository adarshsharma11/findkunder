<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Company;
use App\Models\ContactPerson;
use App\Models\Category;
use App\Models\CustomerType;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        if ($user->hasRole('admin')) {
            $customers = Customer::with(['company', 'person', 'categories', 'customerTypes'])->get();
        } else {
            $customers = Customer::with(['company', 'person', 'categories', 'customerTypes'])
            ->where('user_id', $user->id)
            ->get();
        }
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
            'notes' => 'nullable|string',
            'categories' => 'array',
            'customerTypes' => 'array',
            'status' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], 422);
        }
        $user = Auth::user();
        $data = $request->all();

        $existingCustomer = Customer::where('company_id', $data['company_id'])
        ->where('person_id', $data['person_id'])
        ->first();

        if ($existingCustomer) {
            return response()->json(['status' => 'error', 'message' => 'Customer already exists with the same company and contact person','status' => false], 201);
        }
        if ($user->hasRole('admin')) {
            $data['user_id'] = $user->id;
            $customer = Customer::create($data);
        } else {
            $customer = $user->customers()->create($data);
        }

        if (!empty($data['categories'])) {
            $categories = Category::whereIn('id', $data['categories'])->get();
            $customer->categories()->attach($categories);
        }

       // Attach customer types to the customer
        if (!empty($data['customerTypes'])) {
            $customerTypes = CustomerType::whereIn('id', $data['customerTypes'])->get();
            $customer->customerTypes()->attach($customerTypes);
        }
        return response()->json(['status' => true, 'data' => $customer]);
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
            'status' => 'nullable|string',
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
            'status' => $request->input('status'),
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
    public function destroy(Request $request, $id)
    {
        $customer = Customer::find($id);
    
        if (!$customer) {
            return response()->json(['error' => 'Customer not found'], 404);
        }
    
        $deleteCompany = $request->input('deleteCompany', false);
        $deleteContact = $request->input('deleteContact', false);
    
        // Delete the customer profile
        $customer->delete();
    
        // Delete associated company and contact if specified
        if ($deleteCompany || $deleteContact) {
            $customer->load(['company', 'person']);
    
            if ($deleteCompany && $customer->company) {
                Company::where('id', $customer->company->id)->delete();
            }
    
            if ($deleteContact && $customer->person) {
                ContactPerson::where('id', $customer->person->id)->delete();
            }
    
            return response()->json(['message' => 'Customer profile and associated company/contact deleted successfully']);
        }
    
        // If no association deletion is specified, just delete the customer profile
        return response()->json(['message' => 'Customer profile deleted successfully']);
    }    
}
