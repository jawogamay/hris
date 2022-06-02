<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class EdamamController extends Controller
{
    public function index(Request $request)
    {
        foreach ($request->ingrs as $ingr) {
            $totalNutrients = Http::get('https://api.edamam.com/api/nutrition-data',[
                'app_id' => env('EDAMAM_ID'),
                'app_key' => env('EDAMAM_KEY'),
                'nutrition' => 'logging',
                'ingr' => $ingr
            ])['totalNutrients'];
            
            if ($totalNutrients) {
                $nutrition['ingr'] = $ingr;
                $nutrition['calories'] = $totalNutrients['ENERC_KCAL']['quantity'];
                $nutrition['fat'] = $totalNutrients['FAT']['quantity'];
                $nutrition['carbs'] = $totalNutrients['CHOCDF']['quantity'];
                $nutrition['cholesterol'] = $totalNutrients['CHOLE']['quantity'];
                $nutrition['sodium'] = $totalNutrients['NA']['quantity'];
                $nutritions['match'][] = $nutrition;
            } else {
                $nutrition['ingr'] = $ingr;
                $nutritions['unmatch'][] = $nutrition;
            }
        }

        return $nutritions;
    }
}