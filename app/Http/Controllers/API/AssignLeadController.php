<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Services\LeadMatchingService;
use App\Models\Lead;

class AssignLeadController extends Controller
{

    protected $leadMatchingService;

    public function __construct(LeadMatchingService $leadMatchingService)
    {
        $this->leadMatchingService = $leadMatchingService;
    }
    /**
     * Get user profiles based on location ID.
     *
     * @param  int  $locationId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getRelevantLeadProfiles(Request $request)
    {
        $leadId = $request->input('lead_id');
        $lead = Lead::find($leadId);
        if (!$lead) {
            return response()->json(['error' => 'Lead not found'], 404);
        }
        $matches = $this->leadMatchingService->findBestMatches($lead);    
        return response()->json($matches);
    }
}
