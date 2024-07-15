<?php

namespace App\Http\Requests;

use App\Models\Rating;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;
use Throwable;


class StoreCommentRequest extends FormRequest
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
        return [
            'content' => ['required', 'string'],
            'rating' => ['nullable', 'numeric'],
            'status' => ['nullable', Rule::in(['Published','Hidden'])],
            'userId' => ['nullable', 'uuid'],
            'postId' => ['required', 'uuid'],
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

    public function validated($key = null, $default = null): array
    {
        $data = parent::validated();
        if ($this->has('ratings')) {
            try {
                if (!Rating::where("userId", "=", $data['userId'])->where("postId", "=", $data['postId'])->exists()) {
                    Rating::Create([
                        'postId' => $data['postId'],
                        'userId' => $data['userId'],
                        'rating' => $data['ratings']
                    ]);
                } else {
                    Rating::where("userId", "=", $data['userId'])->where("postId", "=", $data['postId'])->update([
                        'postId' => $data['postId'],
                        'userId' => $data['userId'],
                        'rating' => $data['ratings']
                    ]);
                }
            } catch (Throwable $th) {
            }
        }

        return $data;
    }
}
