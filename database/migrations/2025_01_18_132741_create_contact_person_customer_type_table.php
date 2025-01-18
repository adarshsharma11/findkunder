<?php

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
        Schema::create('contact_person_customer_type', function (Blueprint $table) {
            $table->id();
            $table->foreignId('contact_person_id')->constrained('contact_person')->onDelete('cascade');
            $table->foreignId('customer_type_id')->constrained('customer_types')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contact_person_customer_type');
    }
};
