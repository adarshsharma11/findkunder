<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Cookie;

class AuthController extends Controller
{

    /**
 * Register a new user.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\JsonResponse
 */
    public function register(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:6',
        ]);
        // If validation fails, return an error response
        if ($validator->fails()) {
            $errors = $validator->errors();
            // Check if the email is the reason for the validation error
            if ($errors->has('email') && $errors->first('email') === 'The email has already been taken.') {
                return response()->json(['status' => false, 'message' => 'Email address is already registered. Please use a different email.'], 401);
            }
            // If it's not an email-related error, return the original validation error
            return response()->json(['status' => false, 'message' => 'Something went wrong!'], 401);
        }
        // Create a new user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        Auth::login($user);
        // Assign the "user" role to the new user
        $role = Role::where('name', 'user')->first();
        $user->assignRole($role);
        $expirationTime = now()->addDay();
        $token = $user->createToken('auth-token', ['*'], $expirationTime)->accessToken->token;
        $actualRoleName = $role->name;
        $user->loadCount('companies', 'contact_person', 'customers');
        // Return the user information and a success message
        return response()->json(['status' => true, 'user' => $user,  'accessToken' => $token,'expirationTime' => $expirationTime,
        'role' => $actualRoleName, 'message' => 'User registered successfully']);
    }

    /**
     * Attempt to authenticate the user with email and password.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(Request $request)
    {
        // Validate the request data
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // If validation fails, return an error response
        if ($validator->fails()) {
            return response()->json(['status' => false, 'message' => 'Validation error', 'errors' => $validator->errors()], 422);
        }

        // Attempt to authenticate the user
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            // Authentication successful
            $user = Auth::user();
            $expirationTime = now()->addDay();
            $user->loadCount('companies', 'contact_person', 'customers');
            $user->tokens()->delete();
            $token = $user->createToken('auth-token', ['*'],  $expirationTime)->accessToken->token;
            $role = $user->roles()->pluck('name')[0];
            return response()->json(['status' => true, 'user' => $user, 'accessToken' => $token, 'expirationTime' => $expirationTime, 'role' => $role]);
        } else {
            // Authentication failed
            return response()->json(['status' => false, 'message' => 'Invalid email or password'], 401);
        }
    }

    /**
     * Log the user out and invalidate the session.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function logoutUser(Request $request)
    {
       
        Auth::guard('web')->logout();
        // Invalidate the session\
        $request->user()->tokens()->delete();
        $request->session()->invalidate();

        // Regenerate the CSRF token
        $request->session()->regenerateToken();
        $cookie = Cookie::forget('XSRF-TOKEN');
        return response()->json([
            'status' => true,
            'message' => 'Logged out'
        ])->withCookie($cookie);
    }

    /**
     * Get the authenticated user information.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(Request $request)
    {
        // Return the authenticated user information
        $user = $request->user();
        $accessToken = $user->tokens->first();
        $role = $user->roles()->pluck('name')[0];
        $user->loadCount('companies', 'contact_person', 'customers');
        //print_r($accessToken->expire_at); die;

    if ($accessToken) {
        // Extract the token and its expiration time
        $token = $accessToken->token;
        $expirationTime = $accessToken->expires_at;
    } else {
        // Set default values if the token doesn't exist
        $token = null;
        $expirationTime = null;
    }

    // Return the user information along with the token and expiration time
    return response()->json([
        'status' => true,
        'user' => $user,
        'accessToken' => $token,
        'expirationTime' => $expirationTime,
        'role' => $role
    ]);
    }
}
