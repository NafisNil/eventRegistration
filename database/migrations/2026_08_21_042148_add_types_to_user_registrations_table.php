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
        Schema::table('user_registrations', function (Blueprint $table) {
            //
            $table->foreignId('participation_type_id')->nullable()->constrained('participant_types')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_registrations', function (Blueprint $table) {
            //
            $table->dropForeign(['participation_type_id']);
            $table->dropColumn('participation_type_id');
        });
    }
};
