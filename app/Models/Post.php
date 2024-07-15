<?php

namespace App\Models;

use App\Jobs\SiteMapGenrator;
use App\Models\User;
use App\Models\Comment;
use App\Models\SubCategory;
use App\Models\Category;
use App\Actions\Traits\HasOwner;
use App\Actions\Traits\NotificationTrait;
use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;
use Spatie\Sitemap\Contracts\Sitemapable;
use Spatie\Sitemap\Tags\Url;

class Post extends Model implements Sitemapable
{
    use HasFactory, HasUuids, SoftDeletes, NotificationTrait, HasOwner;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'subject',
        'content',
        'status',
        'coverImage',
        'sponsored',
        'sponsored_expires_at',
        'sponsored_duration',
        'sponsored_type',
        'sponsored_note',
        'userId',
        'categorieId',
        'subcategorieId'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [];

    public function toSitemapTag(): Url | string | array
    {
        return Url::create(route('post.show', ["id" => $this->id]))
            ->setLastModificationDate(Carbon::create($this->updated_at))
            ->setChangeFrequency(Url::CHANGE_FREQUENCY_YEARLY)
            ->setPriority(0.1);
    }

    public function searchdate(\Illuminate\Database\Eloquent\Builder $query, $date): \Illuminate\Database\Eloquent\Builder
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
                $query->where('subject', "LIKE", "%" . $data . "%")
                    ->orwhere('content', "LIKE", "%" . $data . "%");
            }
        );
    }


    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, "userId", "id");
    }

    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class, "categorieId", "id");
    }

    public function subcategory(): BelongsTo
    {
        return $this->belongsTo(SubCategory::class, "subcategorieId", "id");
    }

    public function ratings(): HasMany
    {
        return $this->hasMany(Rating::class, "postId", "id");
    }

    public function comments(): HasMany
    {
        return $this->hasMany(Comment::class, "postId", "id");
    }

    protected static function boot()
    {
        parent::boot();

        static::updated(function ($model) {
            SiteMapGenrator::dispatchAfterResponse();
        });

        static::created(function ($model) {
            SiteMapGenrator::dispatchAfterResponse();
        });

        static::deleted(function ($model) {
            SiteMapGenrator::dispatchAfterResponse();
        });
    }
}
