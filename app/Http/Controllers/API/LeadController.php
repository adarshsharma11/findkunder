<?php
namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Customer;
use App\Models\CustomerLead;
use Illuminate\Support\Facades\Auth;

class LeadController extends Controller
{

    /**
     * Get all leads.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        $user = Auth::user();
        if ($user->hasRole('admin')) {
            $leads = Lead::with('location:id,name', 'customerType:id,name', 'categories:id,name,parent_id', 'categories.subcategories:id,name,parent_id')->get();
        } else {
            $customerIds = Customer::where('user_id', $user->id)->pluck('id');
            $leadIds = CustomerLead::whereIn('customer_id', $customerIds)->pluck('lead_id');
            $leads = Lead::whereIn('id', $leadIds)->with('location:id,name', 'customerType:id,name', 'categories:id,name,parent_id', 'categories.subcategories:id,name,parent_id')->get();
        }
        return response()->json($leads);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'company_name' => 'required|string',
            'contact_name' => 'required|string',
            'contact_email' => 'required|email',
            'contact_phone' => 'required|string',
            'cvr_number' => 'nullable|string',
            'do_not_contact' => 'nullable|string',
            'physical_attendance_required' => 'nullable|string',
            'physical_attendance_details' => 'nullable|string',
            'specific_preferences' => 'nullable|string',
            'street' => 'required|string',
            'city' => 'required|string',
            'who_do_you_need'=> 'required|string',
            'company_description'=> 'nullable|string',
            'postal_code' => 'required|string',
            'customer_type_id' => 'required|exists:customer_types,id',
            'location_id' => 'required|exists:customer_locations,id',
            'website' => 'nullable|string',
            'categories' => 'nullable|array',
            'categories.*' => 'exists:categories,id', // Validate each category ID in the array
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Create the lead
        $lead = Lead::create($request->all());

        // Attach categories to the lead if provided
        if ($request->has('categories')) {
            $lead->categories()->attach($request->input('categories'));
        }

        // Return success response with the newly created lead
        return response()->json(['message' => 'Lead created successfully', 'lead' => $lead], 201);
    }

      /**
     * Show the details of a specific lead.
     *
     * @param  \App\Models\Lead  $lead
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $lead = Lead::with(['location:id,name', 'customerType:id,name', 'user', 'categories:id,name,parent_id', 'categories.subcategories:id,name,parent_id'])
                    ->find($id);
        if (!$lead) {
            return response()->json(['error' => 'Lead not found'], 404);
        }
        return response()->json($lead);
    }
        /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Lead  $lead
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Lead $lead)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'company_name' => 'sometimes|required|string',
            'contact_name' => 'sometimes|required|string',
            'contact_email' => 'sometimes|required|email',
            'contact_phone' => 'sometimes|required|string',
            'cvr_number' => 'nullable|string',
            'do_not_contact' => 'nullable|string',
            'physical_attendance_required' => 'nullable|string',
            'physical_attendance_details' => 'nullable|string',
            'specific_preferences' => 'nullable|string',
            'street' => 'sometimes|required|string',
            'city' => 'sometimes|required|string',
            'postal_code' => 'sometimes|required|string',
            'customer_type_id' => 'sometimes|required|exists:customer_types,id',
            'location_id' => 'sometimes|required|exists:customer_locations,id',
            'categories' => 'nullable|array',
            'user_id' => 'sometimes|required|string',
            'categories.*' => 'exists:categories,id',
            'status' => 'nullable|in:0,1,2', 
        ]);

        // If validation fails, return error response
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Update the lead with the request data
        $lead->update($request->all());

        // Sync categories with the lead if provided
        if ($request->has('categories')) {
            $lead->categories()->sync($request->input('categories'));
        }

        // Return success response with the updated lead
        return response()->json(['message' => 'Lead updated successfully', 'lead' => $lead]);
    }
}
