<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RecipeStoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'title' => 'required|string|min:10',
            'author' => 'string|min:4',
            'image' => 'string|url',
            'url' => 'string|url',
            'serving' => 'required|numeric',
            'ingredients' => 'required|json',
            'nutritions' => 'required|json',
            'directions' => 'required|json',
            'tags' => 'array',
            'tags.*' => 'string|distinct|min:3',
            'isMealPlan' => 'required|boolean',
            'isTracker' => 'required|boolean',
            'plan.meal_type' => 'required|numeric',
            'plan.serving' => 'required|numeric',
            'plan.date' => 'required|date',
        ];
    }

    public function messages()
    {
        return [
            'plan.meal_type.required' => 'Complete meal plan',
            'plan.serving.required' => 'Complete meal plan',
        ];
    }
}
