<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__ . '/../routes/web.php',
        api: __DIR__ . '/../routes/api.php',
        commands: __DIR__ . '/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\EncryptCookies::class,
            \Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse::class,
            \Illuminate\Session\Middleware\StartSession::class,
            \Illuminate\View\Middleware\ShareErrorsFromSession::class,
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
            \App\Http\Middleware\HandleInertiaRequests::class,
            \Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets::class,
        ]);

        $middleware->use([
            // \Illuminate\Http\Middleware\TrustHosts::class,
            // \App\Http\Middleware\TrustProxies::class,
            // \Illuminate\Http\Middleware\TrustProxies::class,
            // \Illuminate\Http\Middleware\HandleCors::class,
            // \App\Http\Middleware\PreventRequestsDuringMaintenance::class,
            // \Illuminate\Foundation\Http\Middleware\PreventRequestsDuringMaintenance::class,
            // \Illuminate\Http\Middleware\ValidatePostSize::class,
            // \Illuminate\Foundation\Http\Middleware\TrimStrings::class,
            // \Illuminate\Foundation\Http\Middleware\ConvertEmptyStringsToNull::class,
            // \App\Http\Middleware\Cors::class
        ]);
        //
        $middleware->group('web', []);

        $middleware->group('api', [
            // \Laravel\Sanctum\Http\Middleware\EnsureFrontendRequestsAreStateful::class,
            \Illuminate\Routing\Middleware\ThrottleRequests::class . ':api',
            \Illuminate\Routing\Middleware\SubstituteBindings::class,
        ]);

        $middleware->alias([
            // 'auth' => \App\Http\Middleware\Authenticate::class,
            // 'auth.basic' => \Illuminate\Auth\Middleware\AuthenticateWithBasicAuth::class,
            // 'auth.session' => \Illuminate\Session\Middleware\AuthenticateSession::class,
            // 'cache.headers' => \Illuminate\Http\Middleware\SetCacheHeaders::class,
            // 'can' => \Illuminate\Auth\Middleware\Authorize::class,
            // 'guest' => \App\Http\Middleware\RedirectIfAuthenticated::class,
            // 'password.confirm' => \Illuminate\Auth\Middleware\RequirePassword::class,
            // 'precognitive' => \Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests::class,
            // 'signed' => \App\Http\Middleware\ValidateSignature::class,
            // 'throttle' => \Illuminate\Routing\Middleware\ThrottleRequests::class,
            // 'verified' => \Illuminate\Auth\Middleware\EnsureEmailIsVerified::class,
            // 'isAdmin' => \App\Http\Middleware\IsAdmin::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions) {
        //
    })->create();
