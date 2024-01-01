<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Spatie\Permission\Models\Role;

class AuthController extends Controller
{
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
    public function logout(Request $request)
    {
        // Log the user out
        auth('web')->logout();

        // Invalidate the session
        $request->session()->invalidate();

        // Regenerate the CSRF token
        $request->session()->regenerateToken();

        return response()->json(['status' => true, 'message' => 'Logged out']);
    }

    /**
     * Get the authenticated user information.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        // Return the authenticated user information
        $user = Auth::user();
        $accessToken = $user->tokens->first();
        $role = $user->roles()->pluck('name')[0];
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
