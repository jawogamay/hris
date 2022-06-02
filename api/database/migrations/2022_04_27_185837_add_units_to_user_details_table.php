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
        Schema::table('user_details', function (Blueprint $table) {
            $table->string('height_unit')->after('height');
            $table->string('current_weight_unit')->after('current_weight');
            $table->string('goal_weight_unit')->after('goal_weight');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('user_details', function (Blueprint $table) {
            $table->dropColumn('height_unit');
            $table->dropColumn('current_weight_unit');
            $table->dropColumn('goal_weight_unit');
        });
    }
};
