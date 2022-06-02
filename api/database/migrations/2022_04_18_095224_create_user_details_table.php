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
        Schema::create('user_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')
                ->onUpdate('cascade')
                ->onDelete('cascade')
                ->nullable();
            $table->string('username')->nullable();
            $table->boolean('mfp_help');
            $table->string('weight_goal_level');
            $table->integer('activity_level');
            $table->integer('age');
            $table->integer('gender');
            $table->double('height');
            $table->double('current_weight');
            $table->double('goal_weight');
            $table->boolean('nine_to_ten_mode');
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
        Schema::dropIfExists('user_details');
    }
};
