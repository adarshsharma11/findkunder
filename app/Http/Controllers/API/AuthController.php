<?php

namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Spatie\Permission\Models\Role;
use Illuminate\Support\Facades\Cookie;
use App\Rules\PasswordCheck;
use App\Mail\PasswordResetMail;
use Illuminate\Support\Facades\Mail;

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

    /**
 * Update the authenticated user details.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\JsonResponse
 */
public function update(Request $request)
{
    // Validate the request data
    $validator = Validator::make($request->all(), [
        'name' => 'nullable|string',
        'email' => 'nullable|email|unique:users,email,' . auth()->id(),
        'password' => 'nullable|min:6',
        'old_password' => ['nullable', 'min:6', new PasswordCheck],
    ]);
    // If validation fails, return an error response
    if ($validator->fails()) {
        return response()->json(['status' => false, 'message' => 'Validation error', 'errors' => $validator->errors()->first()], 422);
    }
    // Get the authenticated user
    $user = $request->user();
    // Update user details
    $user->update([
        'name' => $request->name ? $request->name : $user->name,
        'email' => $request->email ? $request->email : $user->email,
        'password' => $request->password ? bcrypt($request->password) : $user->password,
    ]);
    // Load updated counts
    $user->loadCount('companies', 'contact_person', 'customers');
    // Return the updated user information
    return response()->json([
        'status' => true,
        'user' => $user,
        'message' => 'User details updated successfully',
    ]);
}

/**
 * Initiate the password reset process.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\JsonResponse
 */
public function forgotPassword(Request $request)
{
    // Validate the request data
    $validator = Validator::make($request->all(), [
        'email' => 'required|email|exists:users,email',
    ]);

    // If validation fails, return an error response
    if ($validator->fails()) {
        return response()->json(['status' => false, 'message' => 'Validation error', 'errors' => $validator->errors()], 422);
    }
    // Generate a unique token for password reset
    $token = Str::random(60);
    // Update the user's token in the database
    User::where('email', $request->email)->update(['remember_token' => $token]);
    $user = User::where('email', $request->email)->first();
    $resetLink = url("/reset-password/{$token}");
    $expirationTime = now()->addHours(24); // Set your desired expiration time
    // Send an email to the user with a link to reset their password
    try {
        Mail::to($user->email)->send(new PasswordResetMail(
            $resetLink,
            $expirationTime->format('Y-m-d H:i:s'), // Format the expiration time as needed
            config('mail.support_email'),
            $user->name
        ));
    } catch (\Exception $e) {
        return response()->json(['status' => false, 'message' => 'Error sending password reset email'], 500);
    }
    // Send an email to the user with a link to reset their password
    // (You need to implement this part based on your email provider)
    return response()->json(['status' => true, 'message' => 'Password reset link sent to your email']);
}

/**
 * Reset the user's password.
 *
 * @param  \Illuminate\Http\Request  $request
 * @return \Illuminate\Http\JsonResponse
 */
public function resetPassword(Request $request)
{
    // Validate the request data
    $validator = Validator::make($request->all(), [
        'token' => 'required|string|exists:users,remember_token',
        'password' => 'required|string|min:6',
    ]);

    // If validation fails, return an error response
    if ($validator->fails()) {
        return response()->json(['status' => false, 'message' => 'Validation error', 'errors' => $validator->errors()], 422);
    }

    // Find the user by the password reset token
    $user = User::where('remember_token', $request->token)->first();

    // If the user is not found, return an error response
    if (!$user) {
        return response()->json(['status' => false, 'message' => 'Invalid or expired token'], 422);
    }

    // Update the user's password
    $user->update([
        'password' => bcrypt($request->password),
        'remember_token' => null, // Clear the password reset token after successful reset
    ]);

    // Return a success response
    return response()->json(['status' => true, 'message' => 'Password reset successfully']);
}

}
