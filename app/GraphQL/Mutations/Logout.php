<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Auth;
use App\Actions\LighthouseGraphQLPassport\Events\UserLoggedOut;
use App\Actions\LighthouseGraphQLPassport\Exceptions\AuthenticationException;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

class Logout extends BaseAuthResolver
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
        if (! Auth::guard('api')->check()) {
            throw new AuthenticationException('Not Authenticated', 'Not Authenticated');
        }
        $user = Auth::guard('api')->user();
        // revoke user's token
        Auth::guard('api')->user()->token()->revoke();

        event(new UserLoggedOut($user));

        return [
            'status'  => 'TOKEN_REVOKED',
            'message' => __('Your session has been terminated'),
        ];
    }
}
