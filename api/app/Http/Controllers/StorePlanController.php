<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\StorePlan;

class StorePlanController extends Controller
{
    public function index(Request $request)
    {
        $order = $request->sort ?? 'created_at';

        $plan = [];
        if ($request->isFree ) $plan [] = 'Free';
        if ($request->isPremium ) $plan [] = 'Premium';

        $plans = StorePlan::searchTitle($request->keyword)
            ->when($plan, function ($q) use ($plan) {
                $q->whereIn('plan', $plan);
            })
            ->MinMax($request, 'price', '>=', $request->price_min)
            ->MinMax($request, 'price', '<=', $request->price_max)
            ->MinMax($request, 'total_recipes', '>=', $request->total_recipe_min)
            ->MinMax($request, 'total_recipes', '<=', $request->total_recipe_max)
            ->MinMax($request, 'total_days', '>=', $request->total_days_min)
            ->MinMax($request, 'total_days', '<=', $request->total_days_max)
            ->orderBy($order)
            ->get();
        return $plans->toJson();
    }
}
