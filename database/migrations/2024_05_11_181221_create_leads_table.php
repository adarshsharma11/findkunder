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
        Schema::create('leads', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('contact_name');
            $table->string('contact_email');
            $table->string('contact_phone');
            $table->string('cvr_number')->nullable();
            $table->string('do_not_contact')->nullable();
            $table->string('physical_attendance_required')->default('No');
            $table->string('physical_attendance_details')->nullable();
            $table->string('specific_preferences')->nullable();
            $table->string('street');
            $table->string('city');
            $table->string('postal_code');
            $table->foreignId('customer_type_id')->constrained('customer_types');
            $table->foreignId('location_id')->constrained('customer_locations');
            $table->timestamps();
        });

        Schema::create('category_lead', function (Blueprint $table) {
            $table->id();
            $table->foreignId('category_id')->constrained('categories');
            $table->foreignId('lead_id')->constrained('leads');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('category_lead');
        Schema::dropIfExists('leads');
    }
};
