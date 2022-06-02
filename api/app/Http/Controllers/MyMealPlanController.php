<?php

namespace App\Http\Controllers;

use App\Models\MyMealPlan;
use Illuminate\Http\Request;

class MyMealPlanController extends Controller
{
    public function index(Request $request)
    {
        $recipes = MyMealPlan::search($request->keyword)
            ->where('user_id', auth('sanctum')->user()->id)
            ->withCount('recipePlans')
            ->when($request, function ($query, $request){
                if (!$request->sort || $request->sort == "oldest") {
                    $query->orderBy('created_at', 'asc');
                } else if ($request->sort == "newest") {
                    $query->orderBy('created_at', 'desc');
                } else if ($request->sort == "title") {
                    $query->orderBy('title');
                }
            })
            ->get();

        return $recipes->toJson();
    }
}
