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
            'categories' => 'nullable|array',
            'categories.*.name' => 'required|string',
            'categories.*.parent_id' => 'nullable|exists:categories,id',
        ]);

        $updatedCategories = [];
        if ($request->filled('name') && $request->input('name') !== $category->name) {
            $category->update(['name' => $request->input('name')]);
        }
        if ($request->input('categories')) {
        foreach ($request->input('categories') as $updatedCategory) {
            if (isset($updatedCategory['id'])) {
                // If ID is provided, update existing category
                $existingCategory = Category::findOrFail($updatedCategory['id']);
                $existingCategory->update(['name' => $updatedCategory['name']]);
                if (isset($updatedCategory['parent_id'])) {
                    $parentCategory = Category::find($updatedCategory['parent_id']);
                    if ($parentCategory) {
                        $existingCategory->parent_id = $parentCategory->id;
                        $existingCategory->save();
                    }
                }
                $updatedCategories[] = $existingCategory;
            } else {
                // If ID is not provided, create new category
                $newCategory = Category::create([
                    'name' => $updatedCategory['name'],
                    'parent_id' => $category->id,
                ]);
                $updatedCategories[] = $newCategory;
            }
        }

    }

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
