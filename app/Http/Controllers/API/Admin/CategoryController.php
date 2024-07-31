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
            'subcategories' => 'nullable|array',
            'subcategories.*.name' => 'required|string',
            'question' => 'nullable|string',
        ]);

        // Create a new category with the provided data
        $category = Category::create(['name' => $request->name, 'question' => $request->question]);

        // Create subcategories if provided
        if ($request->has('subcategories')) {
            foreach ($request->subcategories as $subcategory) {
                $category->subcategories()->create(['name' => $subcategory['name']]);
            }
        }

        // Reload the category with its subcategories
        $category->load('subcategories');

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
            'subcategories' => 'nullable|array',
            'subcategories.*.id' => 'nullable',
            'subcategories.*.name' => 'required|string',
            'subcategories.*.order' => 'nullable|integer',
            'question' => 'nullable|string',
        ]);

        // Update the main category's name
        if ($request->filled('name') && $request->input('name') !== $category->name) {
            $category->update(['name' => $request->input('name')]);
        }

        if ($request->filled('question')) {
            $category->update(['question' => $request->input('question')]);
        }

        // Get current subcategory IDs
        $currentSubcategoryIds = $category->subcategories->pluck('id')->toArray();

        // Prepare a list of new and updated subcategories
        $newSubcategories = [];
        $updatedSubcategories = [];
        if ($request->input('subcategories')) {
            foreach ($request->input('subcategories') as $subcategoryData) {
                if (isset($subcategoryData['id'])) {
                    // Check if ID is valid (either numeric or UUID)
                    $subcategory = $subcategoryData['id'] ? Category::find($subcategoryData['id']) : null;

                    if ($subcategory) {
                        // Update existing subcategory
                        $subcategory->update([
                            'name' => $subcategoryData['name'],
                            'order' => $subcategoryData['order']
                        ]);
                        $updatedSubcategories[] = $subcategory->id;
                    } else {
                        // Create new subcategory with null ID (or adjust for UUID logic if needed)
                        $newSubcategories[] = [
                            'name' => $subcategoryData['name'],
                            'parent_id' => $category->id,
                            'order' => $subcategoryData['order']
                        ];
                    }
                } else {
                    // Create new subcategory with null ID (or adjust for UUID logic if needed)
                    $newSubcategories[] = [
                        'name' => $subcategoryData['name'],
                        'parent_id' => $category->id,
                        'order' => $subcategoryData['order']
                    ];
                }
            }
        }

        // Delete subcategories that are not in the updated list
        $subcategoriesToDelete = array_diff($currentSubcategoryIds, $updatedSubcategories);
        Category::destroy($subcategoriesToDelete);

        // Create new subcategories
        if (!empty($newSubcategories)) {
            $category->subcategories()->createMany($newSubcategories);
        }

        // Reload the category with its subcategories
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
