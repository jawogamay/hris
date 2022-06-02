<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyMealPlan extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public function recipePlans()
    {
        return $this->hasMany(RecipePlan::class, 'my_meal_plan_id', 'id');
    }
    
    public function scopeSearch($query, $search)
    {
        return $query->orWhere('title', 'LIKE', "%$search%");
    }
}
