<?php

use App\Http\Controllers\Api\AlertController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\MarketDataController;
use App\Http\Controllers\Api\ScreenerController;
use Illuminate\Support\Facades\Route;

// Public Routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::get('/scans/public', [ScreenerController::class, 'publicScans']);

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Screeners
    Route::apiResource('screeners', ScreenerController::class);

    // Alerts
    Route::apiResource('alerts', AlertController::class);

    // Community Hub
    Route::get('/community/feed', [CommunityPostController::class, 'index']);
    Route::post('/community/share', [CommunityPostController::class, 'store']);
    Route::post('/community/clone/{screener}', [CommunityPostController::class, 'cloneScreener']);
    Route::post('/community/post/{post}/like', [CommunityPostController::class, 'like']);

    // Subscriptions
    Route::get('/subscriptions', [SubscriptionController::class, 'index']);
    Route::post('/subscriptions', [SubscriptionController::class, 'subscribe']);

    // Brokerage & Orders
    Route::get('/brokers', [BrokerAccountController::class, 'index']);
    Route::post('/brokers/link', [BrokerAccountController::class, 'link']);
    Route::patch('/brokers/{account}/toggle', [BrokerAccountController::class, 'toggle']);
    Route::delete('/brokers/{account}', [BrokerAccountController::class, 'destroy']);
    
    // Orders
    Route::get('/orders', [OrderController::class, 'index']);
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/portfolio', [OrderController::class, 'portfolioSummary']);

    // Market Data
    Route::get('/market/top-gainers', [MarketDataController::class, 'topGainers']);
    Route::get('/market/top-losers', [MarketDataController::class, 'topLosers']);
    Route::get('/market/quote/{symbol}', [MarketDataController::class, 'quote']);
});
