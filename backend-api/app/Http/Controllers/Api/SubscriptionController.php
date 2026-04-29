<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Subscription;
use Illuminate\Http\Request;

class SubscriptionController extends Controller
{
    public function index(Request $request)
    {
        return response()->json($request->user()->subscriptions()->latest()->get());
    }

    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'tier' => 'required|in:PRO,ELITE',
            'duration_months' => 'required|integer|in:1,12',
        ]);

        // Mock payment logic
        $amount = $validated['tier'] === 'PRO' ? 999 : 2499;
        if ($validated['duration_months'] === 12) $amount *= 10; // 2 months free

        $subscription = $request->user()->subscriptions()->create([
            'tier' => $validated['tier'],
            'starts_at' => now(),
            'ends_at' => now()->addMonths($validated['duration_months']),
            'status' => 'ACTIVE',
            'amount' => $amount
        ]);

        // Update user tier
        $request->user()->update(['tier' => $validated['tier']]);

        return response()->json([
            'message' => "Welcome to {$validated['tier']} tier!",
            'subscription' => $subscription
        ]);
    }
}
