<?php

namespace App\Services;

use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class NotificationService
{
    /**
     * Sends a notification to Telegram.
     */
    public static function sendTelegram($chatId, $message)
    {
        $botToken = env('TELEGRAM_BOT_TOKEN');
        
        if (!$botToken) {
            Log::warning("Telegram Bot Token not configured.");
            return;
        }

        try {
            Http::post("https://api.telegram.org/bot{$botToken}/sendMessage", [
                'chat_id' => $chatId,
                'text' => $message,
                'parse_mode' => 'Markdown'
            ]);
        } catch (\Exception $e) {
            Log::error("Telegram notification failed: " . $e->getMessage());
        }
    }

    /**
     * Sends a notification to WhatsApp (via a service like Twilio or a mock for now).
     */
    public static function sendWhatsApp($phone, $message)
    {
        // For production, integrate with Twilio or Meta WhatsApp API
        Log::info("WhatsApp Alert to {$phone}: {$message}");
    }
}
