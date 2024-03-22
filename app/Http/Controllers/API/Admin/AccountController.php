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
        ]);

        if ($validator->fails()) {
            $errors = $validator->errors();
            if ($errors->has('email')) {
                return response()->json(['message' => $errors->first('email'), 'status' => false], 201);
            }
            return response()->json(['message' => 'Something went wrong!', 'status' => false], 201);
        }

        // Generate a strong, random temporary password
        $password = Str::random(12);

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($password),
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
