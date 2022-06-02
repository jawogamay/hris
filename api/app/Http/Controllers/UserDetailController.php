<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\UserDetail;

class UserDetailController extends Controller
{

    public function show(Request $request) {    
        $userDetail = UserDetail::firstWhere('user_id', auth('sanctum')->user()->id);
        
        return response($userDetail);
        
    }

    public function store(Request $request) {
        $data = $request->all();
        $userDetails = UserDetail::create([
            'mfp_help' => $data['mfpHelp'],
            'weight_goal_level' => $data['weightGoalLevel'],
            'activity_level' => $data['activityLevel'],
            'age' => (int)$data['age'],
            'gender' => $data['gender'],
            'height' => $data['height'],
            'height_unit' => $data['heightUnit'],
            'current_weight' => $data['currentWeight'],
            'current_weight_unit' => $data['currentWeightUnit'],
            'goal_weight_unit' => $data['goalWeightUnit'],
            'goal_weight' => $data['goalWeight'],
            'nine_to_ten_mode' => $data['nineToTenMode'],
            'user_id' => auth('sanctum')->user()->id,
        ]);

        return response($userDetails,200);
    }

    public function addUserName(Request $request) {
        $fields = $request->validate([
            'username' => 'required|string|unique:user_details,username',
        ]);
        $userDetail = UserDetail::firstWhere('user_id', auth('sanctum')->user()->id);
        $userDetail && $userDetail->update([
            'user_id' => auth('sanctum')->user()->id,
            'username' => $fields['username']
        ]);

        return response($userDetail);
    }
    
    public function addCalorieGoal(Request $request) {
        $data = $request->all();
        $userDetail = UserDetail::firstWhere('user_id', auth('sanctum')->user()->id);
        $userDetail && $userDetail->update([
            'calorie_goal' => $data['calorieGoal']
        ]);

        return response($userDetail);
    }
}
