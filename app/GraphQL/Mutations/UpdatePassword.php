<?php

namespace App\GraphQL\Mutations;

use App\Actions\LighthouseGraphQLPassport\Events\PasswordUpdated;
use App\Actions\LighthouseGraphQLPassport\Exceptions\ValidationException;
use GraphQL\Type\Definition\ResolveInfo;
use Illuminate\Support\Facades\Hash;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

/**
 * Class UpdatePassword.
 */
class UpdatePassword
{
    /**
     * @param $rootValue
     * @param array               $args
     * @param GraphQLContext|null $context
     * @param ResolveInfo         $resolveInfo
     *
     * @return array
     */
    public function resolve($rootValue, array $args, GraphQLContext $context = null, ResolveInfo $resolveInfo)
    {
        $user = $context->user();
        if (! Hash::check($args['old_password'], $user->password)) {
            throw new ValidationException([
                'password' => __('Current password is incorrect'),
            ], 'Validation Exception');
        }
        $user->password = Hash::make($args['password']);
        $user->save();
        event(new PasswordUpdated($user));

        return [
            'status'  => 'PASSWORD_UPDATED',
            'message' => __('Your password has been updated'),
        ];
    }
}
