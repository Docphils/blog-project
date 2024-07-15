<?php

namespace App\Actions\Traits;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;

trait HasOwner
{

    protected static function bootHasOwner()
    {
        static::creating(function (self $model) {
            $model->userId = Auth::id() ?? $model->userId;
            if ((class_basename($model)  === "Post" or class_basename($model)  === "Category" or class_basename($model)  === "SubCategory") and Auth::check() and Auth::user()->type === "Commenter") {
                $exception = new ModelNotFoundException("unauthorized");
                $exception->setModel(self::class, $model->id);
                throw $exception;
            }
        });

        static::updating(function (self $model) {
            if ((class_basename($model)  === "Post" or class_basename($model)  === "Comment" or class_basename($model)  === "Category" or class_basename($model)  === "SubCategory" or class_basename($model)  === "Reply" or class_basename($model)  === "Rating" or class_basename($model)  === "Role" or class_basename($model)  === "Permission" or class_basename($model)  === "User") and (static::find($model->id)->userId !== Auth::id() or Auth::user()->type !== "Admin" or !Auth::user()->givePermissionTo("update_" . class_basename($model)))) {
                $exception = new ModelNotFoundException("unauthorized");
                $exception->setModel(self::class, $model->id);
                throw $exception;
            }
        });

        static::deleting(function (self $model) {
            if ((class_basename($model)  === "Post" or class_basename($model)  === "Comment" or class_basename($model)  === "Category" or class_basename($model)  === "SubCategory" or class_basename($model)  === "Reply" or class_basename($model)  === "Rating" or class_basename($model)  === "Role" or class_basename($model)  === "Permission" or class_basename($model)  === "User") and (static::find($model->id)->userId !== Auth::id() or Auth::user()->type !== "Admin" or !Auth::user()->givePermissionTo("delete_" . class_basename($model)))) {
                $exception = new ModelNotFoundException();
                $exception->setModel(self::class, $model->id);
                throw $exception;
            }
        });
    }
}
