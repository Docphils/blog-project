<?php

use App\Models\Comment;
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
        Schema::create('replies', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string('content');
            $table->enum('status',['Published','Hidden'])->default('Published');
            $table->foreignIdFor(User::class,'userId');
            $table->foreignIdFor(Comment::class,'commentId');
            $table->timestamps();
            $table->dateTime('deleted_at')->nullable();
            $table->unique(["content", "userId","commentId"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('replies');
    }
};
