<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'name',
    'description',
    'rules_json',
    'formula',
    'is_public',
    'view_count',
])]
class Screener extends Model
{
    use HasUuids;

    protected function casts(): array
    {
        return [
            'rules_json' => 'array',
            'is_public' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function alerts()
    {
        return $this->hasMany(Alert::class);
    }
}
