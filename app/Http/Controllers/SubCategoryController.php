<?php

namespace App\Http\Controllers;

use App\Http\Meta;
use App\Models\SubCategory;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSubCategoryRequest;
use App\Http\Requests\UpdateSubCategoryRequest;
use Inertia\Inertia;

class SubCategoryController extends Controller
{

       /**
     * The model of the specified controller
     */
    protected $model;

    protected $template;

    
    public function __construct($model = SubCategory::class){
    
        $this->model = $model;

        $this->template = "SubCategory";

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
    public function store(StoreSubCategoryRequest $request)
    {
        //
        return $this->baseStore($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        //
        
            $subCategory = SubCategory::where("id", "=", $id)->with(["posts", "category"])->first();
            Meta::cleanup();
            Meta::addMeta('author', config('app.name'));
            Meta::addMeta('title', $subCategory->name);
            Meta::addMeta('description', $subCategory->name);
            Meta::addMeta('og:title', $subCategory->name);
            Meta::addMeta('og:description', $subCategory->name);
            Meta::addMeta('og:url',  route($request->route()->getName(), ["id" => $id]));
            return $request->wantsJson()
                ? ["page_data" => $subCategory, "type" => "subcategory"]
                : Inertia::render($this->template . "/Read", ["page_data" => $subCategory, "type" => "subcategory"]);
        
    }

    public function subCategoryByCatId(Request $request, $id) 
    {
        $subCategory = SubCategory::where("categorieId", "=", $id)->get();
        return $request->wantsJson()
        ? ["page_data" => $subCategory, "type" => "subcategory"]
        : Inertia::render($this->template . "/Index", ["page_data" => $subCategory, "type" => "subcategory"]);

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
    public function update(UpdateSubCategoryRequest $request, $id)
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
