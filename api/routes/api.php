<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DebugController;
use App\Http\Controllers\EdamamController;
use App\Http\Controllers\ScraperController;
use App\Http\Controllers\StorePlanController;
use App\Http\Controllers\MyMealPlanController;
use App\Http\Controllers\UserDetailController;
use App\Http\Controllers\PasswordResetController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

//Public routes
Route::get('/sample', [DebugController::class, 'index']);


Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::controller(PasswordResetController::class)->group(function() {
    Route::post('/reset-password', 'resetPassword');
    Route::post('/reset-password-email', 'resetPasswordEmail');
});

Route::namespace('Auth')->controller(SocialAuthController::class)->group(function(){
    Route::post('oauth/{provider}/register', 'register');
    Route::post('oauth/{provider}/login', 'login');
});


//Protected routes
Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::controller(UserDetailController::class)->group(function(){
        Route::post('/onboarding','store');
        Route::post('/username','addUserName');
        Route::get('/userdetail','show');
        Route::post('/calorie-goal', 'addCalorieGoal');
    });
    Route::controller(AuthController::class)->group(function() {
        Route::post('/logout','logout');
        Route::get('/check-login','checkLogin');
    });
    Route::controller(RecipeController::class)
        ->prefix('recipes')->group(function () {
            Route::get('/', 'index');
            Route::post('/', 'store');
            Route::get('/{id}', 'show');
            Route::get('/related/{id}','getRelatedRecipe');
    });
    Route::controller(UserController::class)
        ->prefix('users')->group(function () {
        Route::get('/profile','profile');
    });
    Route::controller(StorePlanController::class)
        ->prefix('store')->group(function () {
        Route::get('/','index');
    });
    Route::controller(ScraperController::class)
        ->prefix('scraper')->group(function () {
            Route::get('/','index');
            Route::get('/show/{id}','show');
            Route::get('/match-ingredient','matchIngredient');
    });
    Route::controller(MyMealPlanController::class)
        ->prefix('my-meal-plan')->group(function() {
            Route::get('/', 'index');
        }
    );
    Route::get('/analysis/nutrition-data', [EdamamController::class, 'index']);
});

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([], function () {
    Route::prefix('recipes')->group(function () {
        Route::get('/', 'RecipeController@index');
        Route::post('/import-json', 'RecipeController@importJson');
    });
});