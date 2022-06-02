<?php

namespace Database\Seeders;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class RecipePlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i < 10; $i++) { 
            DB::table('recipe_plans')->insert([
                'recipe_id' => 1,
                'my_meal_plan_id' => 1,
                'meal_type' => rand(1, 5),
                'created_at' => now()
            ]);
        }
    }
}
