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
        Schema::create('event_stats', function (Blueprint $table) {
            $table->id();
            $table->text('event_name');
            $table->text('location');
            $table->date('event_date');
            $table->text('time');
            $table->date('registration_deadline');
            $table->text('target_participants')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_stats');
    }
};
