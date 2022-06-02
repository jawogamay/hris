<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('recipe_tags');
        Schema::dropIfExists('recipes');

        Schema::create('recipes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->constrained()
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->string('title');
            $table->string('author')->nullable();
            $table->string('image', 500)->nullable();
            $table->string('url', 500)->nullable();
            $table->unsignedInteger('serving');
            $table->jsonb('ingredients');
            $table->jsonb('nutritions');
            $table->jsonb('directions');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('recipes');
    }
};
