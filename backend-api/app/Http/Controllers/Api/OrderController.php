<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BrokerAccount;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class OrderController extends Controller
{
    /**
     * Places a real order via the connected broker.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'broker_account_id' => 'required|exists:broker_accounts,id',
            'symbol' => 'required|string',
            'order_type' => 'required|in:BUY,SELL',
            'quantity' => 'required|integer|min:1',
            'price_type' => 'required|in:MARKET,LIMIT',
            'price' => 'required_if:price_type,LIMIT|numeric',
        ]);

        $brokerAccount = BrokerAccount::findOrFail($validated['broker_account_id']);
        
        // Ensure the account belongs to the user
        if ($brokerAccount->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Logic for specific brokers (Zerodha/Upstox/etc)
        // This is a mock implementation of the actual API call
        $orderId = "ORD-" . strtoupper(bin2hex(random_bytes(4)));
        
        $order = Order::create([
            'user_id' => $request->user()->id,
            'broker_account_id' => $brokerAccount->id,
            'symbol' => $validated['symbol'],
            'order_type' => $validated['order_type'],
            'quantity' => $validated['quantity'],
            'price' => $validated['price'] ?? 0,
            'status' => 'PENDING',
            'broker_order_id' => $orderId
        ]);

        // Trigger the actual Broker API (Mocked for now)
        $this->executeBrokerOrder($brokerAccount, $order);

        return response()->json([
            'message' => 'Order placed successfully',
            'order' => $order
        ]);
    }

    private function executeBrokerOrder($account, $order)
    {
        // For Zerodha Kite:
        // Http::withHeaders(['X-Kite-Version' => '3', 'Authorization' => "token {$account->api_key}:{$account->access_token}"])
        //     ->post('https://api.kite.trade/orders/regular', [...]);

        Log::info("Executing {$order->order_type} for {$order->symbol} via {$account->broker_name}");
        
        // Simulate execution
        $order->update(['status' => 'COMPLETE']);
    }

    public function portfolioSummary(Request $request)
    {
        $orders = $request->user()->orders()->where('status', 'COMPLETE')->get();
        
        $holdings = $orders->groupBy('symbol')->map(function ($symbolOrders) {
            $buyQty = $symbolOrders->where('order_type', 'BUY')->sum('quantity');
            $sellQty = $symbolOrders->where('order_type', 'SELL')->sum('quantity');
            $currentQty = $buyQty - $sellQty;
            
            $totalBuyValue = $symbolOrders->where('order_type', 'BUY')->sum(function($o) { return $o->quantity * $o->price; });
            $avgBuyPrice = $buyQty > 0 ? $totalBuyValue / $buyQty : 0;

            return [
                'symbol' => $symbolOrders->first()->symbol,
                'quantity' => $currentQty,
                'avg_price' => round($avgBuyPrice, 2),
                'total_investment' => round($totalBuyValue, 2),
            ];
        })->values();

        return response()->json([
            'holdings' => $holdings,
            'total_realized_pnl' => 12500.50, // Mocked for demo
            'total_invested' => $holdings->sum('total_investment')
        ]);
    }

    public function index(Request $request)
    {
        return response()->json($request->user()->orders()->latest()->paginate(20));
    }
}
