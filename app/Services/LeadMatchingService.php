<?php

namespace App\Services;

use App\Models\Lead;
use App\Models\Customer;

class LeadMatchingService
{
    public function findBestMatches(Lead $lead)
    {
        $customers = Customer::with('person')->get();
        $matches = [];
        
        foreach ($customers as $customer) {
            $score = $lead->getMatchingScore($customer);
            $customerId = $customer->id;
            
            // If a match for this customer ID already exists
            if (isset($matches[$customerId])) {
                // Compare scores and keep the match with the higher score
                if ($score > $matches[$customerId]['score']) {
                    $matches[$customerId] = [
                        'customer' => $customer,
                        'score' => $score,
                    ];
                }
            } else {
                // Add the match for this customer ID
                $matches[$customerId] = [
                    'customer' => $customer,
                    'score' => $score,
                ];
            }
        }

        $groupedMatches = [
            'best' => [],
            'average' => [],
            'worse' => []
        ];

        foreach ($matches as $match) {
            if ($match['score'] == 15) {
                $groupedMatches['best'][] = $match;
            } elseif ($match['score'] >= 5 && $match['score'] <= 10) {
                $groupedMatches['average'][] = $match;
            } else {
                $groupedMatches['worse'][] = $match;
            }
        }

        return $groupedMatches;
    }
}
