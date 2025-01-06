<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;
use Spatie\Permission\Models\Role;
use App\Mail\WelcomeMail;

class AccountController extends Controller
{
    /**
     * Display a listing of users with customer count.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $users = User::withCount('customers')->role('user')->get();
        return response()->json($users);
    }

    /**
     * Store a newly created user in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    { 
        // Consider using a CreateUserRequest class for better validation
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|unique:users',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'telephone' => 'required|string|max:15',
            'company' => 'required|string|max:255',
            'cvr' => 'required|string|max:255',
            'role' => 'required|string|exists:roles,name',
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            if ($errors->has('email')) {
                $softDeletedUser = User::onlyTrashed()->where('email', $request->email)->first();
                if ($softDeletedUser) {
                    // Restore the soft-deleted user
                    $password = Str::random(12);
                    $softDeletedUser->restore();
                    $softDeletedUser->update([
                        'password' => bcrypt($password),
                    ]);
                    Mail::to($softDeletedUser->email)->send(new WelcomeMail($softDeletedUser, $password));
                    return response()->json(['message' => 'User account created successfully!', 'status' => true, 'user' => $softDeletedUser], 201);
                } else {
                    return response()->json(['status' => false, 'message' => 'Email address is already registered. Please use a different email.'], 201);
                }
            }
            return response()->json(['message' => 'Something went wrong!', 'status' => false], 201);
        }

        // Generate a strong, random temporary password
        $password = Str::random(12);
        $name = trim($request->first_name . ' ' . $request->last_name);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($password),
            'name' => $name,
            'telephone' => $request->telephone,
            'company' => $request->company,
            'cvr' => $request->cvr,
            'is_profile_completed' => 1,
        ]);
        $role = Role::where('name', 'user')->first();
        $user->assignRole($role);
        // Send welcome email with temporary password set link
        Mail::to($user->email)->send(new WelcomeMail($user, $password));
        return response()->json(['message' => 'User account created successfully!', 'status' => true, 'user' => $user], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show($id)
    {
        $user = User::withCount('customers')->findOrFail($id);
        return response()->json($user);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'User account deleted successfully']);
    }
}
