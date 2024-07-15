<?php

use App\Models\Category;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\Hash;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        User::create([
            'firstName' => 'Super-User',
            'lastName' => 'Admin',
            'type' => 'Admin',
            'email' => 'superadmin@swifre.com',
            'password' => Hash::make('adminpassword'),
            'phone' => '2348109502584',
            'email_verified_at' => now()
        ]);

        $firstUser = User::first();
        $data = [
            [
                "name" => "news",
                "userId" => $firstUser->id,
                "status" => "Published"
            ],
            [
                "name" => "sports",
                "userId" => $firstUser->id,
                "status" => "Published"
            ],
            [
                "name" => "jobs",
                "userId" => $firstUser->id,
                "status" => "Published"
            ],
            [
                "name" => "education",
                "userId" => $firstUser->id,
                "status" => "Published"
            ],
            [
                "name" => "entertainment",
                "userId" => $firstUser->id,
                "status" => "Published"
            ],
            [
                "name" => "games",
                "userId" => $firstUser->id,
                "status" => "Published"
            ],
            [
                "name" => "tourism",
                "userId" => $firstUser->id,
                "status" => "Published"
            ]
        ];

        foreach ($data as $datas) {
            Category::create($datas);
        };
    }
};
