<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;

class StorePostRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Prepare the data for validation.
     *
     * @return void
     */
    protected function prepareForValidation()
    {

        $this->merge([
            'userId' => Auth::id(),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        if (!filter_var($this->coverImage, FILTER_VALIDATE_URL) === false) {
            $validationcoverImage = 'url';
        } else {
            $validationcoverImage = 'file';
        }
        return [
            'subject' => ['required', 'string', 'unique:App\Models\Post,subject'],
            'status' => ['nullable', Rule::in(['Published', 'Hidden'])],
            'userId' => ['uuid'],
            'coverImage' => ['required',  $validationcoverImage],
            'subcategorieId' => ['nullable', 'uuid'],
            'sponsored' => ['nullable', 'boolean'],
            'sponsored_duration' => ['nullable', 'string'],
            'sponsored_expires_at' => ['nullable', 'string'],
            'sponsored_type' => ['nullable', 'string'],
            'sponsored_note' => ['nullable', 'string'],
            'categorieId' => ['required', 'uuid'],
            'content' => ['required', 'string'],
            'summary' => ['required', 'string'],
        ];
    }

    /**
     * Get the error messages for the defined validation rules.
     *
     * @return array
     */
    public function messages()
    {
        return [
            'required' => 'The :attribute field is required.',
            'same' => 'The :attribute and :other must match.',
            'size' => 'The :attribute must be exactly :size.',
            'string' => 'The :attribute must be Alpha Numeric',
            'integer' => 'The :attribute must be a Numbers',
            'numeric' => 'The :attribute must be a Number',
            'between' => 'The :attribute value :input is not between :min - :max.',
            'in' => 'The :attribute must be one of the following types: :values',
        ];
    }

    public function imgResizeandpath($x)
    {
        if (empty($x)) {
            return $x;
        };

        if (filter_var($x, FILTER_VALIDATE_URL) or (str_contains($x, config('app.asset_url')))) {
            return $x;
        } else {
            $imagename = $x->hashName();
            $img = Image::make($x->path());
            $img->resize(600, 600, function ($const) {
                $const->aspectRatio();
                $const->upsize();
            })->save(public_path('/thumbnails') . '/' . $imagename, 50, "webp");
            $path = $x->storeAs("images", $imagename, "public");
            $imagepath = config('app.asset_url') . "/" . str_replace("images", "thumbnails", $path);
            return $imagepath;
        }
    }

    public function validated($key = null, $default = null): array
    {
        $data = parent::validated();
        if ($this->has('coverImage')) {
            $coverImage = $this->file('coverImage');
            $imagepath = $this->imgResizeandpath($coverImage);

            $data = [
                ...$data,
                'coverImage' => $imagepath,
            ];
        }

        return $data;
    }
}
