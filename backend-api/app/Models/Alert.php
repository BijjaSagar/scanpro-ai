<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'screener_id',
    'name',
    'channels',
    'webhook_url',
    'is_active',
    'last_triggered_at',
])]
class Alert extends Model
{
    use HasUuids;

    protected function casts(): array
    {
        return [
            'channels' => 'array',
            'is_active' => 'boolean',
            'last_triggered_at' => 'datetime',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function screener()
    {
        return $this->belongsTo(Screener::class);
    }
}
