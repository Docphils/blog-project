<?php

namespace App\Http\Controllers;

use App\Http\Meta;
use App\Models\Category;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
       /**
     * The model of the specified controller
     */
    protected $model;

    protected $template;

    
    public function __construct($model = Category::class){
    
        $this->model = $model;

        $this->template = "Category";

    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        //
        return $this->baseIndex($request);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        //
        return $this->baseCreate($request);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        //
        return $this->baseStore($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $Category = Category::where("id", "=", $id)->with(["subcategorys", "posts"])->first();
        Meta::cleanup();
        Meta::addMeta('author', config('app.name'));
        Meta::addMeta('title', $Category->name);
        Meta::addMeta('description', $Category->name);
        Meta::addMeta('og:title', $Category->name);
        Meta::addMeta('og:description', $Category->name);
        Meta::addMeta('og:url',  route($request->route()->getName(), ["id" => $id]));
        return $request->wantsJson()
            ? ["page_data" => $Category, "posts" => [...$Category->posts], "type" => "category"]
            : Inertia::render($this->template . "/Read", ["page_data" => $Category, "posts" => [...$Category->posts], "type" => "category"]);
   
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Request $request, $id)
    {
        //
        return $this->baseEdit($request, $id);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, $id)
    {
        //
        return $this->baseUpdate($request, $id);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, $id)
    {
        //
        return $this->baseDestroy($request, $id);
    }

    public function me(Request $request)
    {
        return $this->baseByUser($request);
    }
}
