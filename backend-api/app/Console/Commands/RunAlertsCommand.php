<?php

namespace App\Console\Commands;

use App\Models\Alert;
use App\Services\NotificationService;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Http;

class RunAlertsCommand extends Command
{
    protected $signature = 'app:run-alerts';
    protected $description = 'Polls the scanner engine and sends alerts to users';

    public function handle()
    {
        $this->info('Starting Alert Polling...');

        // In production, we would chunk this and run it every minute
        $alerts = Alert::where('is_active', true)->with(['user', 'screener'])->get();

        foreach ($alerts as $alert) {
            $this->info("Checking alert for user: {$alert->user->name} on scan: {$alert->screener->name}");

            try {
                // Call the Scanner Engine (Port 8002)
                $response = Http::post('http://localhost:8002/scan', [
                    'rules' => $alert->screener->rules_json
                ]);

                if ($response->successful()) {
                    $results = $response->json('results');
                    
                    if (!empty($results)) {
                        $this->sendNotifications($alert, $results);
                    }
                }
            } catch (\Exception $e) {
                $this->error("Failed to check alert {$alert->id}: " . $e->getMessage());
            }
        }

        $this->info('Alert Polling Completed.');
    }

    protected function sendNotifications($alert, $results)
    {
        $stockCount = count($results);
        $symbols = collect($results)->pluck('symbol')->take(5)->implode(', ');
        $message = "🚨 *ScanPro AI Alert* 🚨\n\nStrategy: *{$alert->screener->name}*\nMatched: *{$stockCount} stocks*\nTop picks: *{$symbols}*\n\nView details: [Dashboard](https://scanpro.ai/dashboard)";

        // Telegram
        if (in_array('telegram', $alert->channels)) {
            NotificationService::sendTelegram($alert->user->mobile, $message); // Assuming mobile stores chatId for demo
        }

        // WhatsApp
        if (in_array('whatsapp', $alert->channels)) {
            NotificationService::sendWhatsApp($alert->user->mobile, $message);
        }
    }
}
