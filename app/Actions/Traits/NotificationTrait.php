<?php

namespace App\Actions\Traits;

use App\Models\Notification;
use Illuminate\Support\Facades\Auth;

trait NotificationTrait
{
    public static function bootNotificationTrait()
    {
        static::created(function (self $model) {
            $notification = new Notification;
            if (Auth::check()) {
                $notification->userId = Auth::id();
            }
            $notification->event = "create";
            $notification->modelClass = class_basename($model::class);
            $notification->modelId = $model->id;
            $notification->save();
        });

        static::saved(function (self $model) {
            $notification = new Notification;
            if (Auth::check()) {
                $notification->userId = Auth::id();
            }
            $notification->event = "update";
            $notification->modelClass = class_basename($model::class);
            $notification->modelId = $model->id;
            $notification->save();
        });

        static::deleted(function (self $model) {
            $notification = new Notification;
            if (Auth::check()) {
                $notification->userId = Auth::id();
            }
            $notification->event = "delete";
            $notification->modelClass = class_basename($model::class);
            $notification->modelId = $model->id;
            $notification->save();
        });
    }
}
