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
        foreach ($matches as &$match) {
            $match['lead_assigned'] = CustomerLead::where('customer_id', $match['customer']->id)
            ->where('lead_id', $leadId)->exists();
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
        $emailSubject = $request->input('subject');
        $emailBody = $request->input('body');
        $selectedFields = $request->input('selectedFields');
        $selectedData = $request->input('selectedData');

        $lead = Lead::with(['location:id,name', 'customerType:id,name', 'user', 'categories:id,name'])
            ->find($leadId);

        if (!$lead) {
            return response()->json(['error' => 'Lead not found'], 404);
        }

        if ($status !== null) {
            $lead->status = $status;
            $lead->save();
        }

        if (!empty($customerIds)) {
            foreach ($customerIds as $customerId) {
                // Check if the lead is already assigned to the customer
                $assignment = CustomerLead::where('customer_id', $customerId)
                    ->where('lead_id', $leadId)
                    ->first();
                if ($assignment) {
                    // Assignment exists, remove it
                    $assignment->delete();
                } else {
                    // Assignment does not exist, add it
                    CustomerLead::create([
                        'customer_id' => $customerId,
                        'lead_id' => $leadId,
                    ]);

                    // Retrieve the customer's person and send email if available
                    $customer = Customer::with('person')->find($customerId);
                    $person = $customer->person;
                    if ($person && $person->email) {
                        $emailData = [
                            'lead' => $lead,
                            'body' => $emailBody ?: '',
                            'selectedFields' => $selectedFields,
                            'selectedData' => $selectedData,
                        ];
                        Mail::send('emails.lead_assigned', $emailData, function ($message) use ($person, $emailSubject) {
                            $message->to('adarshsharma002@gmail.com')
                                ->subject($emailSubject ?: 'New Lead Assigned');
                        });
                    }
                }
            }
        }

        return response()->json($lead);
    }
}
