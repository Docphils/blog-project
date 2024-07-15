<?php

namespace App\Http\Controllers;

use App\Http\Meta;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;


class Controller extends BaseController
{
    use AuthorizesRequests, ValidatesRequests;

    protected $model;

    protected $template;

    public function baseIndex(Request $request)
    {
        try {
            $query = forward_static_call([$this->model, 'where'], ["status" => "Published"])
                ->orderByDesc('updated_at')
                ->paginate(50);
            Meta::cleanup();
            Meta::addMeta('author', config('app.name'));
            Meta::addMeta('title', "list of " . $this->model);
            Meta::addMeta('description', "A list of " . $this->model . " available at " . config('app.name'));
            Meta::addMeta('og:title', "list of " . $this->model);
            Meta::addMeta('og:description', "A list of " . $this->model . " available at " . config('app.name'));
            Meta::addMeta('og:url',  route($request->route()->getName()));
            if ($request->wantsJson()) {
                return ['page_data' => $query];
            } else {
                $message = $request->session()->get('message');
                return Inertia::render("{$this->template}/Index", ['page_data' => $query])->with('message', $message);
            }
        } catch (\Exception $e) {
            $errorMessage = "Error fetching data: " . $e->getMessage();

            if ($request->wantsJson()) {
                return ['error' => $errorMessage];
            } else {
                return redirect()->back()->with("error", $errorMessage);
            }
        }
    }

    public function baseByUser(Request $request)
    {
        try {
            $query = forward_static_call([$this->model, 'where'], ["userId" => Auth::id()])
                ->orderByDesc('updated_at')
                ->paginate(50);

            if ($request->wantsJson()) {
                return ['page_data' => $query];
            } else {
                return Inertia::render("{$this->template}/Index", ['page_data' => $query]);
            }
        } catch (\Exception $e) {
            $errorMessage = "Error fetching data: " . $e->getMessage();

            if ($request->wantsJson()) {
                return ['error' => $errorMessage];
            } else {
                return redirect()->back()->with("error", $errorMessage);
            }
        }
    }

    public function baseSearch(Request $request, $data = null)
    {
        $query = forward_static_call([$this->model, 'query']);

        if ($data) {
            $query = (new $this->model)->search($query, $data);
        }

        $data = $query->orderByDesc('updated_at')->paginate(50);

        if ($request->wantsJson()) {
            return ['page_data' => $data];
        } else {
            return Inertia::render("{$this->template}/Search", ['page_data' => $data]);
        }
    }


    public function baseSearchDate(Request $request, $date = null)
    {
        $query = forward_static_call([$this->model, 'query']);

        if ($date) {
            $query = (new $this->model)->searchdate($query, $date);
        }

        $data = $query->orderByDesc('updated_at')->paginate(50);

        if ($request->wantsJson()) {
            return ['page_data' => $data];
        } else {
            return Inertia::render("{$this->template}/Search", ['page_data' => $data]);
        }
    }



    public function baseCreate(Request $request)
    {
        $message = $request->session()->get('message');

        if ($request->wantsJson()) {
            return ['message' => $message];
        }

        return Inertia::render("{$this->template}/Create");
    }



    /**
     * Store a newly created resource in storage.
     *
     * @param  Formrequest  $storeRequest
     * 
     */
    public function baseStore(FormRequest $storeRequest)
    {
        // Check if the request wants a JSON response.
        $wantsJson = $storeRequest->wantsJson();
        $validated = $this->stripEmptyCustom($storeRequest->validated());

        // Create the model instance
        $data = forward_static_call([$this->model, 'create'], $validated);
        $message = "Entry has been saved.";

        if ($wantsJson) {
            return response()->json(['page_data' => $data, 'message' => $message], 201);
        } else {
            return redirect()->back()->with("message", $message);
        }
    }

    public function baseShow(Request $request, $id)
    {

        $message = $request->session()->get('message');
        try {
            $data = forward_static_call([$this->model, "find"], $id);
            if (!$data) {
                throw new \Exception("Resource not found.");
            }

            if ($request->wantsJson()) {
                return ["page_data" => $data];
            } else {
                return Inertia::render("{$this->template}/Read", ["page_data" => $data, "message" => $message]);
            }
        } catch (\Exception $e) {
            $errorMessage = $e->getMessage();

            if ($request->wantsJson()) {
                return ["error" => $errorMessage];
            } else {
                return redirect()->back()->with("error", $errorMessage);
            }
        }
    }

    /**
     * Show the form for editing the specified resource.
     * @param  \Illuminate\Foundation\Http\FormRequest $request;
     * 
     */
    public function baseEdit(Request $request, $id)
    {
        $message = $request->session()->get('message');
        try {
            $data = forward_static_call([$this->model, 'find'], $id);
            if (!$data) {
                throw new \Exception("Resource not found.");
            }

            return $request->wantsJson()
                ? ['page_data' => $data, 'message' => $message]
                : Inertia::render("{$this->template}/Edit", ['page_data' => $data, 'message' => $message]);
        } catch (\Exception $e) {
            $errorMessage = $e->getMessage();

            if ($request->wantsJson()) {
                return ['error' => $errorMessage];
            }
            return redirect()->back()->with("error", $errorMessage);
        }
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Foundation\Http\FormRequest $request;
     *
     * 
     */

    public function baseUpdate(FormRequest $updateRequest, $id)
    {
        $message = $updateRequest->session()->get('message');
        $validated = $this->stripEmptyCustom($updateRequest->validated());

        // Find the model instance
        $modelInstance = forward_static_call([$this->model, 'findOrFail'], $id);

        // Update the model instance
        $modelInstance->update($validated);
        $message = "Entry has been updated";

        if ($updateRequest->wantsJson()) {
            return response()->json(["page_data" => $modelInstance, "message" => $message], 200);
        }

        return redirect()->back()->with("message", $message);
    }

    public function stripEmptyCustom($data)
    {
        foreach ($data as $key => $value) {
            if (is_array($data[$key])) {
                $data[$key] = $this->stripEmptyCustom($data[$key]);
            }

            if (empty($value)) {
                unset($data[$key]);
            }
        }

        return $data;
    }
    /**
     * Remove the specified resource from storage.
     *
     * @param  \Illuminate\Foundation\Http\FormRequest $request;
     * 
     */
    public function baseDestroy(Request $request, $id)
    {
        $model = forward_static_call([$this->model, 'find'], $id);

        if (!$model) {
            $message = "Item not found";
        } else {
            $message = "Item has been deleted";
            $model->delete();
        }

        if ($request->wantsJson()) {
            return ["message" => $message];
        }

        return redirect()->back()->with("message", $message);
    }


    /**
     * Genrates error reports
     *
     * @param  \Request $request
     */
    public function error(Request $request)
    {
        $message = "There was an error, please call customer care";

        if ($request->wantsJson()) {
            return ["message" => $message];
        }

        return redirect()->back()->with("message", $message);
    }

    public function search(Request $request, $data = null)
    {
        return $this->baseSearch($request, $data);
    }

    public function searchdate(Request $request, $data = null)
    {
        return $this->baseSearchDate($request, $data);
    }
}
