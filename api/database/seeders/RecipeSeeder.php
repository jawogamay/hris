<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

use File;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class RecipeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        $ingredients = File::get("database/data/ingredients.json");
        $directions = File::get("database/data/directions.json");
        $nutritions = File::get("database/data/nutritions.json");

        $recipe = DB::table('recipes')->insertGetId([
            'user_id' => 1,
            'title' => $faker->sentence,
            'author' => $faker->word,
            'image' => 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505',
            'serving' => rand(1,10),
            'ingredients' => $ingredients,
            'nutritions' => $nutritions,
            'directions' => $directions,
            'created_at' => now(),
            'updated_at' => now(),
            'is_ninety_ten' => 0
        ]);

        foreach (range(0, rand(1,5)) as $arr) {
            DB::table('recipe_tags')->insert([
                'recipe_id' => $recipe,
                'label' =>  $faker->word,
            ]);
        }
    }
}