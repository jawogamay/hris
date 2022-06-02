<?php

namespace App\Jobs;

use App\Models\ScrapedRecipe;
use Illuminate\Bus\Queueable;
use Illuminate\Support\Facades\Http;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Throwable;

class EdamamJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $payload;
    public $timeout = 0;
    public $tries = 3;
    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct($payload)
    {
        $this->payload = $payload;
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        $nutritions = [];
        foreach ($this->payload['ingrs'] as $ingr) {
            $totalNutrients = Http::get('https://api.edamam.com/api/nutrition-data',[
                'app_id' => env('EDAMAM_ID'),
                'app_key' => env('EDAMAM_KEY'),
                'nutrition-type' => 'logging',
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

        ScrapedRecipe::whereId($this->payload['id'])->update([
            'nutritions' => $nutritions,
            'error' => null,
            'is_job_done' => true
        ]);
    }

    public function failed(Throwable $exception)
    {
        ScrapedRecipe::whereId($this->payload['id'])->update([
            'error' => $exception->getMessage(),
            'is_job_done' => true
        ]);
    }
}
