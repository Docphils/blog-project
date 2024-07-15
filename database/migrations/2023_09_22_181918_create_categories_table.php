<?php

use App\Models\Category;
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
        Schema::create('categories', function (Blueprint $table) {
            $table->uuid("id")->primary();
            $table->string('name');
            $table->enum('status', ['Published', 'Hidden'])->default('Hidden');
            $table->foreignIdFor(User::class, 'userId');
            $table->timestamps();
            $table->dateTime('deleted_at')->nullable();
            $table->unique(["name", "userId"]);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
