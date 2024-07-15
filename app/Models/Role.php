<?php

namespace App\Models;

use App\Actions\Traits\NotificationTrait;
use App\Models\User;
use App\Models\Permission;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Spatie\Permission\Models\Role as SpatieRole;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Concerns\HasUuids;

class Role extends SpatieRole
{
    use HasFactory, HasUuids, NotificationTrait;

    public function searchdate(Builder $query, $date): Builder
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

    public static function search(Builder $query, $data): Builder
    {
        return $query->Where(
            function ($query) use ($data) {
                $query->where('name', "LIKE", "%" . $data . "%")
                    ->orWhere('guard_name', "LIKE", "%" . $data . "%")
                    ->orWhere('description', "LIKE", "%" . $data . "%");
            }
        );
    }

    public function permissionList(): BelongsToMany
    {
        return $this->belongsToMany(Permission::class, "role_has_permissions", "role_id", "permission_id", "id", "id");
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, "model_has_roles", "role_id", "model_id", "id", "id");
    }
}
