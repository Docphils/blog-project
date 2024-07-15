<?php

use App\Models\File;
use App\Models\Post;
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
        Schema::create('file_posts', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignIdFor(Post::class,'postId')->nullable();
            $table->foreignIdFor(File::class,'fileId')->nullable();
            $table->timestamps();
            $table->dateTime('deleted_at')->nullable();
            $table->unique(["postId", "fileId"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_posts');
    }
};
