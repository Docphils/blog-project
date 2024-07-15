<?php

namespace App\Http\Requests;

use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Intervention\Image\Facades\Image;

class StoreUserRequest extends FormRequest
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
        if (!filter_var($this->avatar, FILTER_VALIDATE_URL) === false) {
            $validationavatar = 'url';
        } else {
            $validationavatar = 'file';
        }
        return [
            'firstName' => ['string', 'max:255'],
            'lastName' => ['string', 'max:255'],
            'avatar' => ['nullable',  $validationavatar],
            'phone' => ['nullable', 'string', 'max:255'],
            'password' => ['required', 'string'],
            'content' => ['nullable', 'string'],
            'status' => ['nullable', Rule::in(['Published', 'Hidden'])],
            'email' => ['email', 'max:255', Rule::unique(User::class)->ignore($this->user()->id)],
        ];
    }

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
        if ($this->has('avatar')) {
            $avatar = $this->file('avatar');
            $imagepath = $this->imgResizeandpath($avatar);

            $data = array_merge($data, [
                'avatar' => $imagepath,
            ]);
            return $data;
        } else {
            return $data;
        }
    }
}
