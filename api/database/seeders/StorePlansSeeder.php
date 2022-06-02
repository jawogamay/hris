<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class StorePlansSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $plan = ['Free', 'Premium'];
        $idx = rand(0,1);
        $faker = Faker::create();

        DB::table('store_plans')->insert([
            'title' => $faker->sentence,
            'plan' =>  $plan[$idx],
            'price' => !$idx ? 0 : rand(1,1000),
            'total_recipes' => rand(1,100),
            'total_days' => rand(1,30),
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
