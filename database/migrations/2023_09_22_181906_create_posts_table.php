<?php

use App\Models\Category;
use App\Models\SubCategory;
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
        Schema::create('posts', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string('subject')->unique();
            $table->enum('status', ['Published', 'Hidden'])->default('Published');
            $table->foreignIdFor(User::class, 'userId');
            $table->foreignIdFor(Category::class, 'categorieId')->nullable();
            $table->foreignIdFor(SubCategory::class, 'subcategorieId')->nullable();
            $table->longText('content');
            $table->longText('summary');
            $table->boolean('sponsored')->nullable();
            $table->dateTime('sponsored_expires_at')->nullable();
            $table->string('sponsored_duration')->nullable();
            $table->string('sponsored_type')->nullable();
            $table->string('sponsored_note')->nullable();
            $table->string('coverImage')->nullable();
            $table->timestamps();
            $table->dateTime('deleted_at')->nullable();
            $table->unique(['subject', 'userId']);
            $table->unique(["subject", "content"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('posts');
    }
};
