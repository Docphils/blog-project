<?php

namespace App\GraphQL\Mutations;

use GraphQL\Type\Definition\ResolveInfo;
use App\Actions\LighthouseGraphQLPassport\Events\UserRefreshedToken;
use Lcobucci\JWT\Configuration;
use Nuwave\Lighthouse\Support\Contracts\GraphQLContext;

/**
 * Class RefreshToken.
 */
class RefreshToken extends BaseAuthResolver
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
        $credentials = $this->buildCredentials($args, 'refresh_token');

        $response = $this->makeRequest($credentials);

        // let's get the user id from the new Access token so we can emit an event
        $userId = $this->parseToken($response['access_token']);

        $model = $this->makeAuthModelInstance();

        $user = $model->findOrFail($userId);

        event(new UserRefreshedToken($user));

        return $response;
    }

    /**
     * @param $accessToken
     *
     * @return false|mixed
     */
    public function parseToken($accessToken)
    {
        // since we are generating the token in an internal request, there
        // is no need to verify signature to extract the sub claim
        $config = Configuration::forUnsecuredSigner();

        $token = $config->parser()->parse((string) $accessToken);

        $claims = $token->claims();

        return $claims->get('sub');
    }
}
