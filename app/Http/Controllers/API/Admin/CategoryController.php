<?php

namespace App\Http\Controllers\API\Admin;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
     /**
     * Display a listing of the categories with their subcategories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Fetch categories with their subcategories where parent_id is null
        $categories = Category::with('subcategories')->whereNull('parent_id')->get();

        return response()->json($categories);
    }

    /**
     * Store a newly created category in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string',
            'parent_id' => 'nullable|exists:categories,id',
        ]);

        // Create a new category with the provided data
        $category = Category::create($request->all());

        return response()->json(['category' => $category], 201);
    }

    /**
     * Display the specified category with its subcategories.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(Category $category)
    {
        // Load subcategories for the specified category
        $category->load('subcategories');

        return response()->json($category);
    }

    /**
     * Update the specified category in the database.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(Request $request, Category $category)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string',
            'parent_id' => 'nullable|exists:categories,id',
            'subcategories' => 'array',
        ]);
    
        // Ensure that the provided parent_id is not the same as the category's id
        if ($request->has('parent_id') && $request->input('parent_id') == $category->id) {
            return response()->json(['error' => 'Cannot set parent category to itself'], 422);
        }
    
        // Update the category name
        $category->update(['name' => $request->input('name')]);
    
        // If a new parent_id is provided, update the parent relationship
        if ($request->has('parent_id')) {
            $parentCategory = Category::find($request->input('parent_id'));
            if ($parentCategory) {
                $category->parent_id = $parentCategory->id;
                $category->save();
            }
        }
        if ($request->has('subcategories')) {
            $newSubcategories = $request->input('subcategories');
            $currentSubcategories = $category->subcategories;
            // Update subcategories
            foreach ($currentSubcategories as $currentSubcategory) {
                // If the current subcategory is not in the new list, set its parent_id to null
                if (!in_array($currentSubcategory->id, $newSubcategories)) {
                    $currentSubcategory->update(['parent_id' => null]);
                }
            }
        }
        // Load subcategories for the updated category
        $category->load('subcategories');
        return response()->json($category);
    }

    /**
     * Remove the specified category from the database.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(Category $category)
    {
        // Delete the specified category
        $category->subcategories()->delete();
        $category->delete();

        return response()->json(['message' => 'Category deleted successfully']);
    }
}
