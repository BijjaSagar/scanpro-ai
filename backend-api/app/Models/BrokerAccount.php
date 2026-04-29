<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'broker_name',
    'broker_user_id',
    'access_token',
    'refresh_token',
    'token_expiry',
    'is_active',
])]
class BrokerAccount extends Model
{
    use HasUuids;

    protected function casts(): array
    {
        return [
            'token_expiry' => 'datetime',
            'is_active' => 'boolean',
        ];
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
