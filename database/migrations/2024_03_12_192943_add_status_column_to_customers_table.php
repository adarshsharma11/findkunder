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
        Schema::table('customers', function (Blueprint $table) {
            $table->enum('status', [0, 1, 2, 3])->default(0)->after('user_id')
                ->comment('The status of the customer type (0: No priority, 1: Low, 2: Medium, 3: High)');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn('status');
        });
    }
};
