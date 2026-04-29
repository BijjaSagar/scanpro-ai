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
        Schema::create('orders', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->uuid('broker_account_id');
            $table->string('symbol');
            $table->string('order_type'); // buy, sell
            $table->integer('quantity');
            $table->decimal('price', 18, 2)->nullable();
            $table->string('status'); // pending, filled, cancelled, rejected
            $table->string('broker_order_id')->nullable();
            $table->timestamps();

            $table->foreign('broker_account_id')->references('id')->on('broker_accounts')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
