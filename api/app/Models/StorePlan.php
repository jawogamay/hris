<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StorePlan extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function scopeSearchTitle($query, $search)
    {
        return $query->orWhere('title', 'LIKE', "%$search%");
    }

    public function scopeMinMax($query, $request, $column, $operator, $value )
    {
        return $query->when($value, function ($q) use ($column, $operator, $value) {
            return $q->where($column, $operator, $value);
        });
    }
}
