<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateCustomersTableReplaceCompanyWithLocation extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('customers', function (Blueprint $table) {
            // Drop the foreign key constraint if it exists
            if (Schema::hasColumn('customers', 'company_id')) {
                $table->dropForeign(['company_id']);
            }
            
            // Drop the company_id column if it exists
            if (Schema::hasColumn('customers', 'company_id')) {
                $table->dropColumn('company_id');
            }
            
            // Add the location_id column if it does not already exist
            if (!Schema::hasColumn('customers', 'location_id')) {
                $table->unsignedBigInteger('location_id')->nullable()->after('id');
            }
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('customers', function (Blueprint $table) {
            // Add the company_id column back if it does not exist
            if (!Schema::hasColumn('customers', 'company_id')) {
                $table->unsignedBigInteger('company_id')->nullable()->after('id');
                $table->foreign('company_id')->references('id')->on('companies');
            }
            
            // Drop the location_id column if it exists
            if (Schema::hasColumn('customers', 'location_id')) {
                $table->dropColumn('location_id');
            }
        });
    }
}
