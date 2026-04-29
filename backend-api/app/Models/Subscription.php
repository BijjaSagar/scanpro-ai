<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'plan_id',
    'status',
    'current_period_start',
    'current_period_end',
    'payment_provider',
    'payment_id',
])]
class Subscription extends Model
{
    use HasUuids;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
