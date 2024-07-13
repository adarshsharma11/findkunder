<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Company;
use App\Models\ContactPerson;
use App\Models\Customer;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AddProfileController extends Controller
{
    public function submitProfile(Request $request)
    {
        $data = $request->validate([
            'accountEmail' => 'required|email|max:255',
            'password' => 'required|min:6',
            'company_name' => 'required|string|min:2|max:255',
            'cvr' => 'required|string|max:20',
            'street' => 'required|string|max:255',
            'postal_code' => 'required|string|max:20',
            'city' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'website' => 'nullable|url',
            'linkedin' => 'nullable|url|regex:/^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/',
            'facebook' => 'nullable|url|regex:/^(https?:\/\/)?(www\.)?facebook\.com\/.*$/',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'title' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|regex:/^\d{8}$/',
            'comment' => 'nullable|string|max:255'
        ]);

        // Check if the user already exists
        $user = User::where('email', $data['accountEmail'])->first();
        $isNewUser = false;

        if (!$user) {
            // Create new user
            $user = User::create([
                'email' => $data['accountEmail'],
                'password' => Hash::make($data['password']),
            ]);
            $isNewUser = true; 
            $role = Role::where('name', 'user')->first();
            $user->assignRole($role); 
        } else {
            // If user exists, check if the password matches
            if (!Hash::check($data['password'], $user->password)) {
                return response()->json(['error' => 'Invalid credentials'], 401);
            }
        }

        // Create or update the company
        $company = Company::updateOrCreate(
            ['user_id' => $user->id],
            [
                'company_name' => $data['company_name'],
                'cvr' => $data['cvr'],
                'street' => $data['street'],
                'postal_code' => $data['postal_code'],
                'city' => $data['city'],
                'location' => $data['location'],
                'website' => $data['website'],
                'linkedin' => $data['linkedin'],
                'facebook' => $data['facebook'],
            ]
        );

        // Create or update the contact person
        $contactPerson = ContactPerson::updateOrCreate(
            ['user_id' => $user->id],
            [
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'title' => $data['title'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'linkedin' => $data['linkedin'],
                'comment' => $data['comment'],
            ]
        );

        // Create a new customer record
        $customer = Customer::create([
            'company_id' => $company->id,
            'person_id' => $contactPerson->id,
            'user_id' => $user->id,
            'status' => '0',
        ]);

        Auth::login($user);
        // Assign the "user" role to the new user
        $role = $user->roles()->pluck('name')[0];
        $expirationTime = now()->addDay();
        $token = $user->createToken('auth-token', ['*'], $expirationTime)->accessToken->token;
        $user->loadCount('companies', 'contact_person', 'customers');
        $successMessage = $isNewUser ? 'Profile created successfully' : 'Locations & contact added suscessfully! You can now create a new profile';
        // Return the user information and a success message
        return response()->json(['status' => true, 'user' => $user,  'accessToken' => $token,'expirationTime' => $expirationTime,
        'role' => $role, 'message' => $successMessage]);
    }
}
