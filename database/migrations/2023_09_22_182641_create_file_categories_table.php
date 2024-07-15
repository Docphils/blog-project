<?php

use App\Models\Category;
use App\Models\File;
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
        Schema::create('file_categories', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->foreignIdFor(Category::class,'categorieId')->nullable();
            $table->foreignIdFor(File::class,'fileId')->nullable();
            $table->timestamps();
            $table->dateTime('deleted_at')->nullable();
            $table->unique(["categorieId", "fileId"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('file_categories');
    }
};
