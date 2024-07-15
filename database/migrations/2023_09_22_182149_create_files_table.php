<?php

use App\Models\Category;
use App\Models\User;
use App\Models\SubCategory;
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
        Schema::create('files', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string('fileName');
            $table->string('fileType');
            $table->enum('status',['Published','Hidden'])->default('Published');
            $table->foreignIdFor(User::class,'userId');
            $table->foreignIdFor(Category::class,'categorieId')->nullable();
            $table->foreignIdFor(SubCategory::class,'subcategorieId')->nullable();
            $table->string('source');
            $table->timestamps();
            $table->dateTime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('files');
    }
};
