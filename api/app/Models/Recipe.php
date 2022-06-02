<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Recipe extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeSearch($query, $search)
    {
        return $query->orWhere('title', 'LIKE', "%$search%");
    }
    
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    
    public function recipeTags()
    {
        return $this->hasMany(RecipeTag::class);
    }
    
    public function recipePlans()
    {
        return $this->hasMany(RecipePlan::class);
    }
    
    public function myTracker()
    {
        return $this->hasone(RecipeTag::class);
    }
}
