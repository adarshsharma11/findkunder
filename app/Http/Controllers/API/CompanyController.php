<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use App\Models\Company;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CompanyController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $userId = $request->userId;
        if ($userId) {
            $user = User::find($userId);
            if (!$user) {
                return response()->json(['error' => 'User not found'], 404);
            }
            $companies = $user->companies;
        } else {
            if ($user->hasRole('admin')) {
                $companies = Company::all();
            } else {
                $companies = $user->companies;
            }
        }
    
        return response()->json($companies);
    }

    public function show($id)
    {
        $company = Company::with('user')->find($id);
        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }
        return response()->json($company);
    }

    public function store(Request $request)
    {
        $validator =  Validator::make($request->all(),[
            'company_name' => 'required|string|max:255',
            'cvr' => 'required|string|max:20',
            'street' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $user = Auth::user();
        $data = $request->all();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = time().'.'.$image->extension();  
            $image->move(public_path('assets/images/company-logo'), $image_name);
            $data['image'] = $image_name;
        }
        if ($user->hasRole('admin') && !$data['user_id']) {
            $data['user_id'] = $user->id;
            $company = Company::create($data);
        } else if ($user->hasRole('admin') && $data['user_id']) {
            $company = Company::create($data);
        } 
        else {
            $company = $user->companies()->create($data);
        }
        return response()->json($company, 201);
    }

    public function update(Request $request, $id)
    {
        $user = Auth::user();
        if ($user->hasRole('admin')) {
            $company = Company::find($id);
        } else {
            $company = $user->companies()->find($id);
        }
        if (!$company) {
            return response()->json(['error' => 'Company not found'], 404);
        }
        $oldImagePath = $company->image;
        $validator =  Validator::make($request->all(),[
            'company_name' => 'required|string|max:255',
            'cvr' => 'required|string|max:20',
            'street' => 'nullable|string|max:255',
            'postal_code' => 'nullable|string|max:20',
            'city' => 'nullable|string|max:255',
            'location' => 'nullable|string|max:255',
            'website' => 'nullable|string|max:255',
            'linkedin' => 'nullable|string|max:255',
            'facebook' => 'nullable|string|max:255',
            'image' => $request->hasFile('image') ? 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048' : 'nullable|string',
        ]);
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }
        $data = $request->all();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = time().'.'.$image->extension();  
            $image->move(public_path('assets/images/company-logo'), $image_name);
            $data['image'] = $image_name;
            if ($oldImagePath && File::exists(public_path($oldImagePath))) {
                File::delete(public_path($oldImagePath));
            }
        }
        $company->update($data);
        return response()->json($company);
    }

    public function destroy($id)
    {
        $company = Company::find($id);
        if (!$company) {
            return response()->json(['message' => 'Company not found'], 404);
        }
        if ($company->customers()->exists()) {
            return response()->json(['message' => 'Cannot delete company with associated customers'], 201);
        }
        $imagePath = $company->image;
        $company->delete();
        if ($imagePath && File::exists(public_path($imagePath))) {
            File::delete(public_path($imagePath));
        }
        return response()->json(['message' => 'Company deleted successfully']);
    }
}
