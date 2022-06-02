<?php

namespace Database\Seeders;

use App\Models\MyMealPlan;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MyMealPlanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i=0; $i < 10; $i++) { 
            DB::table('my_meal_plans')->insert([
                'title' => 'Seeded Food',
                'user_id' => 1,
                'serving' => rand(1, 10),
                'date' => now(),
                'created_at' => now()
            ]);
        }
    }
}
