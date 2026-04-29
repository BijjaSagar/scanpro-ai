<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\BrokerAccount;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Crypt;

class BrokerAccountController extends Controller
{
    public function index(Request $request)
    {
        return response()->json($request->user()->brokerAccounts);
    }

    public function link(Request $request)
    {
        $validated = $request->validate([
            'broker_name' => 'required|string|in:Zerodha,Upstox,AngelOne,Fyers',
            'client_id' => 'required|string',
            'api_key' => 'required|string',
            'api_secret' => 'required|string',
        ]);

        $account = $request->user()->brokerAccounts()->updateOrCreate(
            ['broker_name' => $validated['broker_name'], 'client_id' => $validated['client_id']],
            [
                'api_key' => $validated['api_key'],
                'api_secret' => Crypt::encryptString($validated['api_secret']),
                'is_active' => true
            ]
        );

        return response()->json([
            'message' => "Successfully linked {$validated['broker_name']} account",
            'account' => $account
        ]);
    }

    public function toggle(BrokerAccount $account)
    {
        $this->authorize('update', $account);
        $account->update(['is_active' => !$account->is_active]);

        return response()->json(['status' => $account->is_active ? 'Enabled' : 'Disabled']);
    }

    public function destroy(BrokerAccount $account)
    {
        $this->authorize('delete', $account);
        $account->delete();

        return response()->json(null, 204);
    }
}
