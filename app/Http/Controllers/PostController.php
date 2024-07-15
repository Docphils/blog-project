<?php

namespace App\Http\Controllers;


use App\Models\Post;
use App\Http\Controllers\Controller;
use App\Http\Meta;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Http\Request;
use Inertia\Inertia;


class PostController extends Controller
{
    /**
     * The model of the specified controller
     */
    protected $model;

    protected $template;


    public function __construct($model = Post::class)
    {

        $this->model = $model;

        $this->template = "Post";
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
    public function store(StorePostRequest $request)
    {
        //
        // return $this->baseStore($request);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, $id)
    {
        //
        $message = $request->session()->get('message');
        $data = forward_static_call([$this->model, "where"], ["id" => $id])->with(['category', 'category.subcategorys', 'subcategory', 'subcategory.posts', 'comments', 'comments.user', 'comments.user.ratings' => function ($query) use ($id) {
            $query->where("postId", "=", $id);
        }, 'comments.replies', 'comments.replies.user', 'user', 'ratings'])->first();
        // seo optimization
        if (isset($data['summary'])) {
            try {

                Meta::cleanup();
                Meta::addMeta('author', $data->user->firstName . " " . $data->user->lastName);
                Meta::addMeta('title', $data->subject);
                Meta::addMeta('description', $data->summary);
                Meta::addMeta('og:title', $data->subject);
                Meta::addMeta('og:description', $data->summary);
                Meta::addMeta('og:url', route("post.show", ["id" => $data->id]));
                Meta::addMeta('og:image', $data->coverImage);
                Meta::addMeta('canonical', str_replace('www.', '', route("post.show", ["id" => $data->id])));
                $errorMessage = "";
            } catch (\Throwable $e) {
                $errorMessage = "Error fetching data: " . $e->getMessage();
                Meta::cleanup();
                Meta::addMeta('author', $data->user->firstName . " " . $data->user->lastName);
                Meta::addMeta('title', $data->subject);
                Meta::addMeta('og:title', $data->subject);
                Meta::addMeta('og:url', route("post.show", ["id" => $data->id]));
                Meta::addMeta('og:image', $data->coverImage);
                Meta::addMeta('canonical', route("post.show", ["id" => $data->id]));
            }
        }

        return $request->wantsJson() ? ["page_data" => $data, "message" => $message, 'error' => $errorMessage] : Inertia::render($this->template . "/Read", ["page_data" => $data, "message" => $message,  'error' => $errorMessage]);
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
    public function update(UpdatePostRequest $request, $id)
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
