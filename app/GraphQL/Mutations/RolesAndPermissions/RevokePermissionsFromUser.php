<?php

namespace App\GraphQL\Mutations\RolesAndPermissions;
use App\Models\User;

final class RevokePermissionsFromUser
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $user = User::find($args['user_id']);
        $permissions = $args['permissions'];
        foreach($permissions as $permission){
            $user->revokePermissionTo($permission['name']);
        }

        return $user;
    }
}
