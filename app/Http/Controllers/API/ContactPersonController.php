<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ContactPerson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Category;

class ContactPersonController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $userId = $request->input('userId');
        $locationId = $request->input('locationId');

        if ($locationId) {
            $contactPersons = ContactPerson::where('location_id', $locationId)
                ->with(['location', 'services', 'customerTypes'])
                ->get();
        } else if ($user->role === 'admin') {
            $contactPersons = ContactPerson::with(['location', 'services', 'customerTypes'])
                ->get();
        } else if ($userId) {
            $contactPersons = ContactPerson::where('user_id', $userId)
                ->with(['location', 'services', 'customerTypes'])
                ->get();
        } else {
            $contactPersons = ContactPerson::where('user_id', $user->id)
                ->with(['location', 'services', 'customerTypes'])
                ->get();
        }
        return response()->json($contactPersons);
    }

    public function show($id)
    {
        $contactPerson = ContactPerson::with(['user', 'services', 'customerTypes'])->find($id);
        if (!$contactPerson) {
            return response()->json(['error' => 'Contact person not found'], 404);
        }
        return response()->json($contactPerson);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:contact_person',
            'phone' => 'nullable|string|max:20',
            'location_id' => 'required|exists:company_locations,id',
            'services' => 'nullable|array',
            'services.*' => 'exists:categories,id',
            'customer_types' => 'nullable|array',
            'customer_types.*' => 'exists:customer_types,id',
            'linkedin' => 'nullable|string|max:255',
            'comment' => 'nullable|string',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $user = Auth::user();
        $data = $request->all();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = time().'.'.$image->extension();
            $image->move(public_path('assets/images/contact-person'), $image_name);
            $data['image'] = $image_name;
        }

        if ($user->hasRole('admin') && !isset($data['user_id'])) {
            $data['user_id'] = $user->id;
            $contactPerson = ContactPerson::create($data);
        }
        else if ($user->hasRole('admin') && isset($data['user_id'])) {
            $contactPerson = ContactPerson::create($data);
        }
        else {
            $contactPerson = $user->contact_person()->create($data);
        }

        if (!empty($data['services'])) {
            $contactPerson->services()->sync($data['services']);
        }
        if (!empty($data['customer_types'])) {
            $contactPerson->customerTypes()->sync($data['customer_types']);
        }

        return response()->json($contactPerson, 201);
    }

    public function update(Request $request, $id)
    {
        $contactPerson = ContactPerson::with(['user', 'services', 'customerTypes'])->find($id);
        if (!$contactPerson) {
            return response()->json(['error' => 'Contact person not found'], 404);
        }
        $oldImagePath = $contactPerson->image;

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:contact_person,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'location_id' => 'required|exists:company_locations,id',
            'services' => 'nullable|array',
            'services.*' => 'exists:categories,id',
            'customer_types' => 'nullable|array',
            'customer_types.*' => 'exists:customer_types,id',
            'linkedin' => 'nullable|string|max:255',
            'comment' => 'nullable|string',
            'image' => $request->hasFile('image') ? 'nullable|image|mimes:jpg,png,jpeg,gif,svg|max:2048' : 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        $data = $request->all();
        if ($request->hasFile('image')) {
            $image = $request->file('image');
            $image_name = time().'.'.$image->extension();
            $image->move(public_path('assets/images/contact-person'), $image_name);
            $data['image'] = $image_name;
            if ($oldImagePath && File::exists(public_path($oldImagePath))) {
                File::delete(public_path($oldImagePath));
            }
        }
        $contactPerson->update($data);
        if (!empty($data['services'])) {
            $contactPerson->services()->sync($data['services']);
        }
        if (!empty($data['customer_types'])) {
            $contactPerson->customerTypes()->sync($data['customer_types']);
        }
        $contactPerson->load(['services']);
        $contactPerson->load(['customerTypes']);
        return response()->json($contactPerson);
    }

    public function destroy($id)
    {
        try {
            // Check if user is authenticated
            if (!Auth::check()) {
                return response()->json([
                    'message' => 'Authentication required to perform this action',
                    'status' => false
                ], 401);
            }

            $user = Auth::user();
            $contactPerson = ContactPerson::find($id);

            // Check if contact exists
            if (!$contactPerson) {
                return response()->json([
                    'message' => 'Contact person not found',
                    'status' => false
                ], 404);
            }

            // Check permissions (non-admins can only delete their own contacts)
            if (!$user->hasRole('admin') && $contactPerson->user_id !== $user->id) {
                return response()->json([
                    'message' => 'You do not have permission to delete this contact',
                    'status' => false
                ], 403);
            }

            // Check for associated customers - business rule constraint
            if ($contactPerson->customers()->exists()) {
                return response()->json([
                    'message' => 'Cannot delete contact with associated profile',
                    'status' => false
                ], 422); // Using 422 Unprocessable Entity for business rule violations
            }

            $imagePath = $contactPerson->image;

            // Attempt to delete
            $contactPerson->delete();

            // Clean up image if it exists
            if ($imagePath && File::exists(public_path($imagePath))) {
                File::delete(public_path($imagePath));
            }

            return response()->json([
                'message' => 'Contact person deleted successfully',
                'status' => true
            ], 200);

        } catch (\Exception $e) {
            // Log the error for debugging
            \Log::error('Error deleting contact person: ' . $e->getMessage());

            // Return a server error response
            return response()->json([
                'message' => 'Server error occurred while deleting contact',
                'status' => false,
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }
}
