<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'broker_account_id',
    'symbol',
    'order_type',
    'quantity',
    'price',
    'status',
    'broker_order_id',
])]
class Order extends Model
{
    use HasUuids;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function brokerAccount()
    {
        return $this->belongsTo(BrokerAccount::class);
    }
}
