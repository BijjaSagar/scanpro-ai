<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'name',
    'symbols',
])]
class Watchlist extends Model
{
    use HasUuids;

    protected function casts(): array
    {
        return [
            'symbols' => 'array',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
