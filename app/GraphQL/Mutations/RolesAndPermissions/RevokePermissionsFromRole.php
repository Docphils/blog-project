<?php

namespace App\GraphQL\Mutations\RolesAndPermissions;

use App\Models\Role;

final class RevokePermissionsFromRole
{
    /**
     * @param  null  $_
     * @param  array{}  $args
     */

     public function __invoke($_, array $args)
     {
         $role = Role::find($args['role_id']);
         $permissions = $args['permissions'];
         foreach($permissions as $permission){
             $role->revokePermissionTo($permission['name']);
         }

         return $role;
     }
}
