<?php

namespace App\Actions\LighthouseGraphQLPassport;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\SocialProvider;
use Laravel\Socialite\Facades\Socialite;

/**
 * Trait HasSocialLogin.
 */
trait HasSocialLogin
{
    public function socialProviders()
    {
        return $this->hasMany(SocialProvider::class);
    }

    /**
     * @param Request $request
     *
     * @return mixed
     */
    public static function byOAuthToken(Request $request)
    {
        $userData = Socialite::driver($request->get('provider'))->userFromToken($request->get('token'));

        try {
            $user = static::whereHas('socialProviders', function ($query) use ($request, $userData) {
                $query->where('provider', Str::lower($request->get('provider')))->where('providerId', $userData->getId());
            })->firstOrFail();
        } catch (ModelNotFoundException $e) {
            $user = static::where('email', $userData->getEmail())->first();
            if (! $user) {
                $user = static::create([
                    'name' => $userData->getName(),
                    'email' => $userData->getEmail(),
                    'uuid' => Str::uuid(),
                    'password' => Hash::make(Str::random(16)),
                    'emailVerifiedAt' => now(),
                ]);
            }
            SocialProvider::create([
                'userId' => $user->id,
                'provider' => $request->get('provider'),
                'providerId' => $userData->getId(),
            ]);
        }
        Auth::setUser($user);

        return $user;
    }
}
