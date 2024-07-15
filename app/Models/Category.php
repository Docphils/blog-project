<?php

namespace App\Models;

use App\Models\User;
use App\Models\File;
use App\Models\SubCategory;
use App\Models\Post;
use App\Actions\Traits\HasOwner;
use App\Actions\Traits\NotificationTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, HasUuids, SoftDeletes, HasOwner, NotificationTrait;

     /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'status',
        'userId',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
    ];

    
    public static function searchdate(\Illuminate\Database\Eloquent\Builder $query, $date): \Illuminate\Database\Eloquent\Builder
    {
        return $query->Where(
            function ($query) use ($date) {
                $query->where('created_at', ">=", $date . "00:00:00")->where('created_at', "<=", $date . "24:00:00");
            }
        )
            ->orWhere(
                function ($query) use ($date) {
                    $query->where('updated_at', ">=", $date . "00:00:00")->where('updated_at', "<=", $date . "24:00:00");
                }
            );
    }

    public static function search(\Illuminate\Database\Eloquent\Builder $query, $data): \Illuminate\Database\Eloquent\Builder
    {
        return $query->Where(
            function ($query) use ($data) {
                $query->where('name', "LIKE", "%" . $data . "%");
            }
        );
    }

    public function user():BelongsTo{
        return $this->belongsTo(User::class, "userId", "id");
    }

    public function subcategorys():HasMany{
        return $this->hasMany(SubCategory::class, "categorieId", "id");
    }

    public function posts():HasMany{
        return $this->hasMany(Post::class, "categorieId", "id");
    }

    public function files():HasMany{
        return $this->hasMany(File::class, "categorieId", "id");
    }
}
