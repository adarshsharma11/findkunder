<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\CompanyLocation;
use App\Models\Company;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CompanyLocationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $user = Auth::user();
        $userId = $request->input('userId');
        $companyId = $request->input('companyId');
        if ($companyId) {
            $locations = CompanyLocation::where('company_id', $companyId)
                ->with('company')
                ->withCount('contactPersons')
                ->get();
        } else if ($user->role === 'admin') {
            $locations = CompanyLocation::with('company')
                ->withCount('contactPersons')
                ->get();
        } else {
            $userId = $request->input('userId');
            $companies = Company::where('user_id', $userId)->pluck('id');
            $locations = CompanyLocation::whereIn('company_id', $companies)
                ->with('company')
                ->withCount('contactPersons')
                ->get();
        }
        return response()->json($locations);
    }    
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'company_id' => 'required|exists:companies,id',
            'street' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:10',
            'city' => 'nullable|string|max:100',
        ]);

        $location = CompanyLocation::create($request->all());
        return response()->json($location, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(CompanyLocation $companyLocation)
    {
        return response()->json($companyLocation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CompanyLocation $companyLocation)
    {
        $request->validate([
            'company_id' => 'required|exists:companies,id',
            'street' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:10',
            'city' => 'nullable|string|max:100',
        ]);

        $companyLocation->update($request->all());
        return response()->json($companyLocation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CompanyLocation $companyLocation)
    {
        $companyLocation->delete();
        return response()->json(['message' => 'Location deleted successfully']);
    }
}
