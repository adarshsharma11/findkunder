<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lead;
use App\Models\CustomerLead;
use App\Models\Customer;
use Illuminate\Support\Facades\Mail;

class AssignLeadController extends Controller
{
    /**
     * Get user profiles based on location ID.
     *
     * @param  int  $locationId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRelevantLeadProfiles(Request $request)
    {
        $leadId = $request->input('lead_id');
        $locationId = $request->input('location_id') ?? null;
        $lead = Lead::find($leadId);
        if (!$lead) {
            return response()->json(['error' => 'Lead not found'], 404);
        }
        $matches = $lead->findBestMatches($locationId);   
        foreach ($matches as $matchGroup => &$customers) {
            foreach ($customers as &$match) {
                $match['lead_assigned'] = CustomerLead::where('customer_id', $match['customer']->id)
                                                      ->where('lead_id', $leadId)
                                                      ->exists();
            }
        } 
        return response()->json($matches);
    }

    /**
     * Assign a lead to multiple customers.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function assignLeadToCustomers(Request $request)
    {
        $leadId = $request->input('lead_id');
        $customerIds = $request->input('assigned_customers');
        $status = $request->input('status');

        $lead = Lead::find($leadId);

        if (!$lead) {
            return response()->json(['error' => 'Lead not found'], 404);
        }

        $customers = Customer::whereIn('id', $customerIds)->get();

        if ($status !== null) {
            $lead->status = $status;
            $lead->save();
        }

        foreach ($customers as $customer) {
            // Check if the lead is already assigned to the customer
            if (!CustomerLead::where('customer_id', $customer->id)->where('lead_id', $leadId)->exists()) {
                CustomerLead::create([
                    'customer_id' => $customer->id,
                    'lead_id' => $leadId,
                ]);

                $person = $customer->person;
                if ($person && $person->email) {
                    Mail::send('emails.lead_assigned', ['lead' => $lead], function ($message) use ($person) {
                        $message->to($person->email)
                                ->subject('New Lead Assigned');
                    });
                }
            }
        }

        return response()->json(['success' => 'Lead assigned to customers successfully']);
    }
}
