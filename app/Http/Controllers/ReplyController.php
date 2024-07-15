<?php

namespace App\Http\Controllers;

use App\Models\Reply;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreReplyRequest;
use App\Http\Requests\UpdateReplyRequest;
use Inertia\Inertia;

class ReplyController extends Controller
{

       /**
     * The model of the specified controller
     */
    protected $model;

    protected $template;

    
    public function __construct($model = Reply::class){
    
        $this->model = $model;

        $this->template = "Reply";

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
    public function store(StoreReplyRequest $request)
    {
        //
        return $this->baseStore($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        $message = $request->session()->get('message');
        $data = forward_static_call([$this->model, "where"], ["id" => $id])->with(['user', 'comment', 'comment.user', 'comment.replies', 'comment.replies.user', 'post', 'post.user', 'post.comments',  'post.comments.user', 'post.comments.replies', 'post.comments.replies.user', 'post.category', 'post.category.subcategorys','post.subcategory', 'post.subcategory.posts'])->first();
        return $request->wantsJson() ? ["page_data" => $data] : Inertia::render($this->template . "/Read", ["page_data" => $data, "message" => $message]);
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
    public function update(UpdateReplyRequest $request, $id)
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
