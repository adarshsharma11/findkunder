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
        $userId = $request->userId;
        if ($userId) {
            $reqUser = User::find($userId);
            if (!$reqUser) {
                return response()->json(['error' => 'User not found'], 404);
            }
            $contactPersons = ContactPerson::with(['location', 'services'])->where('user_id', $userId)->get();
            return response()->json($contactPersons);
        } else {
            if ($user->hasRole('admin')) {
                $contactPersons = ContactPerson::with(['location', 'services'])->get();
            } else {
                $contactPersons = $user->contact_person()->with(['location', 'services'])->get();
            }
            return response()->json($contactPersons);
        }
    }

    public function show($id)
    {
        $contactPerson = ContactPerson::with(['user', 'services'])->find($id);
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
            'services' => 'nullable|array',
            'services.*' => 'exists:categories,id',
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
        if ($user->hasRole('admin') && !$data['user_id']) {
            $data['user_id'] = $user->id;
            $contactPerson = ContactPerson::create($data);
        }
        else if ($user->hasRole('admin') && $data['user_id']) {
            $contactPerson = ContactPerson::create($data);
        } 
        else {
            $contactPerson = $user->contact_person()->create($data);
        }

        if (!empty($data['services'])) {
            $contactPerson->services()->sync($data['services']);
        }

        return response()->json($contactPerson, 201);
    }

    public function update(Request $request, $id)
    {
        $contactPerson = ContactPerson::find($id);
        if (!$contactPerson) {
            return response()->json(['error' => 'Contact person not found'], 404);
        }
        $oldImagePath = $contactPerson->image;

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:contact_person,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'services' => 'nullable|array',
            'services.*' => 'exists:categories,id',
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
        $contactPerson->load(['services']);
        return response()->json($contactPerson);
    }

    public function destroy($id)
    {
        $contactPerson = ContactPerson::find($id);
        if (!$contactPerson) {
            return response()->json(['message' => 'Contact person not found'], 404);
        }
        if ($contactPerson->customers()->exists()) {
            return response()->json(['message' => 'Cannot delete contact with associated profile', 'status' => false], 201);
        }
        $imagePath = $contactPerson->image;

        $contactPerson->delete();
        if ($imagePath && File::exists(public_path($imagePath))) {
            File::delete(public_path($imagePath));
        }
        return response()->json(['message' => 'Contact person deleted successfully', 'status' => true]);
    }
}
