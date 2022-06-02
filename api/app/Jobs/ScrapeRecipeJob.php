<?php

namespace App\Jobs;

use Goutte\Client;
use RecipeScraper;
use App\Models\ScrapedRecipe;
use Illuminate\Bus\Queueable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Throwable;

class ScrapeRecipeJob implements ShouldQueue
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
        $scraper = RecipeScraper\Factory::make();
        $client = new Client();
        $crawler = $client->request('GET', $this->payload['url']);
        if ($scraper->supports($crawler)) {
            $recipe = $scraper->scrape($crawler);
            ScrapedRecipe::whereId($this->payload['id'])->update([
                'recipe' => $recipe,
                'error' => null,
                'is_job_done' => true
            ]);
        } else {
            throw new \Exception('URL currently not supported.');
        }
    }

    /**
     * Handle a job failure.
     *
     * @param  \Throwable  $exception
     * @return void
     */
    public function failed(Throwable $exception)
    {
        ScrapedRecipe::whereId($this->payload['id'])->update([
            'error' =>  $exception->getMessage(),
            'is_job_done' => true
        ]);
    }
}