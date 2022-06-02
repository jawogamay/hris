<?php

namespace App\Http\Controllers;

use Goutte\Client;
use RecipeScraper;
use Illuminate\Http\Request;
use App\Jobs\ScrapeRecipeJob;
use App\Jobs\EdamamJob;
use App\Models\ScrapedRecipe;

class ScraperController extends Controller
{
    
    public function show($id)
    {
        return ScrapedRecipe::find($id);
    }

    public function index(Request $request)
    {
        $scrapedRecipe = ScrapedRecipe::create();
        $job['id'] = $scrapedRecipe->id;
        $job['url'] = $request->url;

        ScrapeRecipeJob::dispatch($job);

        return response($scrapedRecipe->id, 200);
    }

    public function matchIngredient(Request $request)
    {
        if ($request->id) {
            ScrapedRecipe::whereId($request->id)->update([
                'is_job_done' => false
            ]);
        } else {
            $scrapedRecipe = ScrapedRecipe::create();
            $request['id'] = $scrapedRecipe->id;
        }

        EdamamJob::dispatch($request->all());
        return response(['id' => $request->id ?? $scrapedRecipe->id] , 200);
    }
}