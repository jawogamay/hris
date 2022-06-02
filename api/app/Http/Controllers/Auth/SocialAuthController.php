<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Response;
use App\Http\Controllers\Controller;
use App\Http\Requests\SocialRegisterRequest;
use Illuminate\Http\Request;
use Socialite;
use App\Jobs\UserInfoJob;

class SocialAuthController extends Controller
{
    public function register(SocialRegisterRequest $request, $provider)
    {
        $user = User::create([
            'email' => $request->email,
            'provider' => $provider,
            'provider_id' => $request->googleId
        ]);
        if ($user) {
            UserInfoJob::dispatch($request->onBoardingData);
        }
        return response($this->generateResponse($user), Response::HTTP_CREATED);
    }

    public function login(Request $request, $provider)
    {
        $user = User::where('email', $request->email)
            ->where('provider_id', $request->googleId)
            ->firstOrFail();
        
        return response($this->generateResponse($user), Response::HTTP_OK);
    }

    private function generateResponse($user)
    {
        return [
            'user' => $user,
            'token' => $user->createToken('app_token')->plainTextToken
        ];
    }
}
