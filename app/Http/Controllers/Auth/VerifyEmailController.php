<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Verified;
// use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VerifyEmailController extends Controller
{
    /**
     * Mark the authenticated user's email address as verified.
     */
    public function __invoke(Request $request, $id, $hash): RedirectResponse
    {
        if (User::where("id", (string) $id)->exists()) {

            $user = User::find((string) $id);
            if ($user->hasVerifiedEmail()) {
                return redirect()->intended(route('dashboard', absolute: false) . '?verified=1');
            }

            if (sha1($user->email) === (string) $hash) {
                $user->markEmailAsVerified();
                event(new Verified($request->user()));
            }

            return redirect()->intended(route('dashboard', absolute: false) . '?verified=1');
        }
        return redirect(route("register"));
    }
}
