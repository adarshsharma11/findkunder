<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Customer;
use App\Models\User;

class AssignLeadController extends Controller
{
    /**
     * Get user profiles based on location ID.
     *
     * @param  int  $locationId
     * @return \Illuminate\Http\JsonResponse
     */
    public function getUsersByLocation(Request $request)
    {
        $locationId = $request->input("locationId");
        $customers = Customer::whereHas('customerLocations', function ($query) use ($locationId) {
            $query->where('customer_locations.id', $locationId);
        })->get();
        
        // Extract user profiles from customers
        $uniqueUserIds = $customers->pluck('user')->flatten()->reject(function ($user) {
            return $user->hasRole('admin');
        })->pluck('id')->unique();

        // Retrieve the user profiles based on unique IDs
        $userProfiles = User::whereIn('id', $uniqueUserIds)->get();
    
        return response()->json($userProfiles);
    }
}
