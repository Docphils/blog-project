<?php

use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ratings', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->double("rating");
            $table->enum('status',['Published','Hidden'])->default('Published');
            $table->foreignIdFor(User::class,'userId');
            $table->foreignIdFor(Post::class,'postId');
            $table->timestamps();
            $table->dateTime('deleted_at')->nullable();
            $table->unique(["postId", "userId"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ratings');
    }
};
