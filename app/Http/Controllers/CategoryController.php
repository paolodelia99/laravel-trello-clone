<?php

namespace App\Http\Controllers;

use App\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Gets all the categories.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json(Category::all()->toArray());
    }

    /**
     * Get all the task of a category
     *
     * @param Category $category
     * @return \Illuminate\Http\JsonResponse
     */
    public function tasks(Category $category)
    {
        return response()->json($category->tasks()->orderBy('order')->get());
    }

    /**
     * Store a newly created category in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $category = Category::create($request->only('name'));

        return response()->json([
            'status' => (bool) $category,
            'message'=> $category ? 'Category Created' : 'Error Creating Category'
        ]);
    }

    /**
     * Display the specified category.
     *
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function show(Category $category)
    {
        return response()->json($category);
    }

    /**
     * Update the specified category in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Category  $category
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Category $category)
    {
        $status = $category->update($request->only('name'));

        return response()->json([
            'status' => $status,
            'message' => $status ? 'Category Updated!' : 'Error Updating Category'
        ]);
    }

    /**
     * Remove the specified category from database.
     *
     * @param \App\Category $category
     * @return \Illuminate\Http\Response
     * @throws \Exception
     */
    public function destroy(Category $category)
    {
        $status  = $category->delete();

        return response()->json([
            'status' => $status,
            'message' => $status ? 'Category Deleted' : 'Error Deleting Category'
        ]);
    }
}
