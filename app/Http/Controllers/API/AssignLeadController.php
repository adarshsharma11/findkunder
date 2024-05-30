<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Lead;

class AssignLeadController extends Controller
{
    public function __construct()
    {

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
        $matches = $lead->findBestMatches();    
        return response()->json($matches);
    }
}
