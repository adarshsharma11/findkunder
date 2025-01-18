<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Customer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\Category;
use App\Models\User;
use App\Models\CustomerType;
use App\Models\CustomerLocation;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $userId = $request->userId;

        if ($userId) {
            $user = User::find($userId);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            $customers = Customer::with(['person.location', 'customerLocations'])
                ->where('user_id', $userId)
                ->get();
        } else {
            $query = Customer::with(['person.location', 'customerLocations']);
            $customers = $user->hasRole('admin') ? $query->get() : $query->where('user_id', $user->id)->get();
        }

        return response()->json($customers);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'person_id' => 'required|exists:contact_person,id',
            'notes' => 'nullable|string',
            'customer_locations' => 'array',
            'status' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], 422);
        }

        $user = Auth::user();
        $data = $request->all();

        $existingCustomer = Customer::where('person_id', $data['person_id'])->first();
        if ($existingCustomer) {
            return response()->json([
                'message' => 'A profile already exists for this contact person.',
                'status' => false
            ], 201);
        }

        $data['user_id'] = $user->hasRole('admin') && isset($data['user_id']) ? $data['user_id'] : $user->id;

        $customer = Customer::create($data);

        if (!empty($data['customer_locations'])) {
            $locations = CustomerLocation::whereIn('id', $data['customer_locations'])->get();
            $customer->customerLocations()->attach($locations);
        }

        return response()->json([
            'status' => true,
            'data' => $customer,
            'message' => 'Profile created successfully!'
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $customer = Customer::with(['person.location', 'user', 'categories.subcategories', 'customerTypes', 'customerLocations'])->find($id);

        if (!$customer) {
            return response()->json(['error' => 'Profile not found'], 404);
        }

        return response()->json($customer);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'person_id' => 'exists:contact_person,id',
            'notes' => 'nullable|string',
            'status' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['status' => 'error', 'message' => $validator->errors()], 422);
        }

        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['status' => 'error', 'message' => 'Customer not found.'], 404);
        }

        $data = $request->only(['person_id', 'status', 'notes']);
        $customer->update($data);    

        if (isset($data['customer_locations'])) {
            $customer->customerLocations()->sync($data['customer_locations'] ?? []);
        }

   
        $updatedCustomer = Customer::with(['person.location', 'categories', 'customerTypes', 'customerLocations'])->find($id);
        return response()->json($updatedCustomer);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        $customer = Customer::find($id);
        if (!$customer) {
            return response()->json(['error' => 'Profile not found'], 404);
        }

        $deleteCompany = $request->input('deleteCompany', false);
        $deleteContact = $request->input('deleteContact', false);

        $customer->delete();

        if ($deleteCompany || $deleteContact) {
            $customer->load(['person.location']);

            if ($deleteCompany && $customer->person->location) {
                $customer->person->location->delete();
            }

            if ($deleteContact) {
                $customer->person->delete();
            }

            return response()->json(['message' => 'Profile and associated location/contact deleted successfully']);
        }

        return response()->json(['message' => 'Profile deleted successfully']);
    }
}
