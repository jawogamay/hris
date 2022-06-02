<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use OntraportAPI\Ontraport;

class UserInfoJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;


    /**
     * The podcast instance.
     *
     * @var \App\Models\User
     */
    protected $payload;

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
        $client = new Ontraport(env('ONTRAPORT_ID'),env('ONTRAPORT_KEY'));
        $requestParams = array(
            "email" => $this->payload['email'],
            "f1968" => $this->payload['gender'] == 1 ? 136 : 135,
            "f1969" => $this->payload['height'],
            "f1971" => $this->payload['currentWeight'],
            "f1967" => $this->payload['age'],
            "f1884" => $this->payload['goalWeight'],
            "f1965" => $this->payload['activityLevel'],
            "f1885" => ($this->payload['weightGoalLevel'] == 'lose') ? 131 : (($this->payload['weightGoalLevel'] == 'maintain') ? 132 : 133),
        );
        $response = $client->contact()->create($requestParams);
        return $response;
    }
}
