<?php

namespace App\GraphQL\Mutations;

use App\Actions\LighthouseGraphQLPassport\Exceptions\ValidationException;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Auth\Events\Verified;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use App\GraphQL\Mutations\BaseAuthResolver;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

/**
 * Class VerifyEmail.
 */
class VerifyEmail extends BaseAuthResolver
{
    /**
     * @param $rootValue
     * @param array                                                    $args
     * @param \Nuwave\Lighthouse\Support\Contracts\GraphQLContext|null $context
     * @param \GraphQL\Type\Definition\ResolveInfo                     $resolveInfo
     *
     * @throws \Exception
     *
     * @return array
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
        $decodedToken = json_decode(base64_decode($args['token']));
        $expiration = decrypt($decodedToken->expiration);
        $email = decrypt($decodedToken->hash);
        if (Carbon::parse($expiration) < now()) {
            throw new ValidationException([
                'token' => __('The token is invalid'),
            ], 'Validation Error');
        }
        $model = $this->makeAuthModelInstance();

        try {
            $user = $model->where('email', $email)->firstOrFail();
            $user->markEmailAsVerified();
            event(new Verified($user));
            Auth::setUser($user);
            $tokens = $user->getTokens();
            $tokens['user'] = $user;

            return $tokens;
        } catch (ModelNotFoundException $e) {
            throw new ValidationException([
                'token' => __('The token is invalid'),
            ], 'Validation Error');
        }
    }
}
