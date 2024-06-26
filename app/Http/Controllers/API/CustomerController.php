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
use App\Models\User;
use App\Models\CustomerType;
use App\Models\CustomerLocation;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
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
            $customers = Customer::with(['company', 'person', 'categories' => function ($query) {
                $query->with('subcategories');
            }, 'customerTypes', 'customerLocations'])
            ->where('user_id', $userId)
            ->get();
        } else {
            if ($user->hasRole('admin')) {
                $customers = Customer::with(['company', 'person', 'categories' => function ($query) {
                    $query->with('subcategories');
                }, 'customerTypes', 'customerLocations'])->get();
            } else {
            $customers = Customer::with(['company', 'person', 'categories' => function ($query) {
                $query->with('subcategories');
            }, 'customerTypes', 'customerLocations'])
            ->where('user_id', $user->id)
            ->get();
            }
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
            'customer_types' => 'array',
            'customer_locations' => 'array',
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
            return response()->json(['message' => ' Profile already exists with the same company and contact person','status' => false], 201);
        }
        if ($user->hasRole('admin') && !$data['user_id']) {
            $data['user_id'] = $user->id;
            $customer = Customer::create($data);
        } 
        else if ($user->hasRole('admin') && $data['user_id']) {
            $customer = Customer::create($data);
        } 
        else {
            $customer = $user->customers()->create($data);
        }

        if (!empty($data['categories'])) {
            $categories = Category::whereIn('id', $data['categories'])->get();
            $customer->categories()->attach($categories);
        }

        if (!empty($data['customer_locations'])) {
            $locations = CustomerLocation::whereIn('id', $data['customer_locations'])->get();
            $customer->customerLocations()->attach($locations);
        }

       // Attach customer types to the customer
        if (!empty($data['customer_types'])) {
            $customerTypes = CustomerType::whereIn('id', $data['customer_types'])->get();
            $customer->customerTypes()->attach($customerTypes);
        }
        return response()->json(['status' => true, 'data' => $customer, 'message' => ' Profile created successfully!']);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Customer  $customer
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $customer = Customer::with(['company', 'person','user','categories' => function ($query) {
            $query->with('subcategories');
        }, 'customerTypes', 'customerLocations'])->find($id);
        if (!$customer) {
            return response()->json(['error' => 'Profile not found'], 404);
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
        $data = $request->all();
    
        $customer->update([
            'company_id' => $request->input('company_id'),
            'person_id' => $request->input('person_id'),
            'status' => $request->input('status'),
            'notes' => $request->input('notes'),
        ]);

        if (isset($data['categories'])) {
            if (count($data['categories']) > 0) {
                $categoryIds = [];
                if (!empty($data['categories'])) {
                    if (is_array($data['categories']) && !empty($data['categories'][0]['id'])) {
                        $categoryIds = array_map(function($type) {
                            return $type['id'];
                        }, $data['categories']);
                    } else {
                        $categoryIds = $data['categories'];
                    }
                }
                $categories = Category::whereIn('id', $categoryIds)->get();
                $customer->categories()->sync($categories->pluck('id'));
            } else {
                $customer->categories()->detach();
            }
        }
    
        if (isset($data['customer_locations'])) {
            if (count($data['customer_locations']) > 0) {
                $locationIds = [];
                if (!empty($data['customer_locations'])) {
                    if (is_array($data['customer_locations']) && !empty($data['customer_locations'][0]['id'])) {
                        $locationIds = array_map(function($type) {
                            return $type['id'];
                        }, $data['customer_locations']);
                    } else {
                        $locationIds = $data['customer_locations'];
                    }
                }
                $locations = CustomerLocation::whereIn('id', $locationIds)->get();
                $customer->customerLocations()->sync($locations->pluck('id'));
            } else {
                $customer->customerLocations()->detach();
            }
        }
    
        if (isset($data['customer_types'])) {
            if (count($data['customer_types']) > 0) {
                $customerTypeIds = [];
                if (!empty($data['customer_types'])) {
                    if (is_array($data['customer_types']) && !empty($data['customer_types'][0]['id'])) {
                        $customerTypeIds = array_map(function($type) {
                            return $type['id'];
                        }, $data['customer_types']);
                    } else {
                        $customerTypeIds = $data['customer_types'];
                    }
                }
                $customerTypes = CustomerType::whereIn('id', $customerTypeIds)->get();
                $customer->customerTypes()->sync($customerTypes->pluck('id'));
            } else {
                $customer->customerTypes()->detach();
            }
        }
    
        $updatedCustomer = Customer::with(['company', 'person', 'categories', 'customerTypes', 'customerLocations'])->find($id);
        return response()->json($updatedCustomer);
    
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
            return response()->json(['error' => 'Profile not found'], 404);
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
    
            return response()->json(['message' => 'Profile and associated company/contact deleted successfully']);
        }
    
        // If no association deletion is specified, just delete the customer profile
        return response()->json(['message' => 'Profile deleted successfully']);
    }    
}
