<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    //
    public function profile() {
        $user = User::with('userDetail')->findOrFail(auth()->user()->id);
        return $user;
    }
}
