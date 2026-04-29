<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Model;

#[Fillable([
    'user_id',
    'screener_id',
    'title',
    'content',
    'like_count',
])]
class CommunityPost extends Model
{
    use HasUuids;

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function screener()
    {
        return $this->belongsTo(Screener::class);
    }
}
