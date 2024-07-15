<?php

namespace App\GraphQL\Mutations\RolesAndPermissions;

use App\Models\User;

final class AssignRolesToUser
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */
    public function __invoke($_, array $args)
    {
        $user = User::find($args['user_id']);
        $roles = $args['roles'];
        foreach($roles as $role){
            $user->assignRole($role['name']);
        }

        return $user;
    }
}
