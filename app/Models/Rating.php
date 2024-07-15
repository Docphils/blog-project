<?php

namespace App\Models;

use App\Models\User;
use App\Models\Post;
use App\Actions\Traits\HasOwner;
use App\Actions\Traits\NotificationTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class Rating extends Model
{
    use HasFactory, HasUuids, SoftDeletes, NotificationTrait, HasOwner;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'rating',
        'status',
        'postId',
        'userId'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
    ];

    public function user():BelongsTo{
        return $this->belongsTo(User::class, "userId", "id");
    }

    public function post():BelongsTo{
        return $this->belongsTo(Post::class, "postId", "id");
    }
}
