<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use App\Jobs\UserInfoJob;

class AuthController extends Controller
{
    public function register(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|min:10'
        ]);

        $user = User::create([
            'email' => $fields['email'],
            'password' => bcrypt($fields['password'])
        ]);

        if ($user) {
            UserInfoJob::dispatch($request->all());
        }

        $token = $user->createToken('app_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token,
        ];
        
        return response($response, 201);
    }

    public function login(Request $request) {
        $fields = $request->validate([
            'email' => 'required|string',
            'password' => 'required|string|min:10'
        ]);
        
        $user = User::firstWhere('email', $fields['email']);
        
        if (!$user) {
            return response([
                'message' => "You haven't created an account yet"
            ],401);
        } 
        if (!Hash::check($fields['password'], $user->password)) {
            return response([
                'message' => "Your password is incorrect"
            ],401);
        }

        $token = $user->createToken('app_token')->plainTextToken;

        $response = [
            'user' => $user,
            'token' => $token
        ];
        
        return response($response, 201);
    }

    public function checkLogin() {
        $auth = auth()->check();
        $response = [
            'isloggedIn' => $auth
        ];
        return response($response,201);
    }
    public function logout(Request $request) {
        auth()->user()->tokens()->delete();
        return [
            'message' => 'User Logged Out'
        ];
    }
}
