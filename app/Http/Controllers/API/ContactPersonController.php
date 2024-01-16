<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\ContactPerson;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ContactPersonController extends Controller
{
    public function index()
    {
        $contactPersons = ContactPerson::all();
        return response()->json($contactPersons);
    }

    public function show($id)
    {
        $contactPerson = ContactPerson::find($id);
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
            'linkedin' => 'nullable|string|max:255',
            'comment' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $contactPerson = ContactPerson::create($request->all());
        return response()->json($contactPerson, 201);
    }

    public function update(Request $request, $id)
    {
        $contactPerson = ContactPerson::find($id);
        if (!$contactPerson) {
            return response()->json(['error' => 'Contact person not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|email|unique:contact_person,email,' . $id,
            'phone' => 'nullable|string|max:20',
            'linkedin' => 'nullable|string|max:255',
            'comment' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $contactPerson->update($request->all());
        return response()->json($contactPerson);
    }

    public function destroy($id)
    {
        $contactPerson = ContactPerson::find($id);
        if (!$contactPerson) {
            return response()->json(['message' => 'Contact person not found'], 404);
        }
        if ($contactPerson->customers()->exists()) {
            return response()->json(['message' => 'Cannot delete contact with associated customers'], 201);
        }

        $contactPerson->delete();
        return response()->json(['message' => 'Contact person deleted successfully']);
    }
}
