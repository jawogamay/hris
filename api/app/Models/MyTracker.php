<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MyTracker extends Model
{
    use HasFactory;

    protected $guarded = [];
    
    public function recipe()
    {
        return $this->belongsTo(Recipe::class);
    }
}
