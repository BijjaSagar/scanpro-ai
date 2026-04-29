# ScanPro AI: Product Requirements & Technical Specification

**Project Name:** ScanPro AI  
**Subtitle:** AI-Powered Stock Screening & Trading Intelligence Platform  
**Vision:** Build the definitive "All-in-One" terminal for modern traders, combining the scanning power of Chartink, the visualization of TradingView, and the intelligence of Generative AI.

---

## 1. Product Overview & Core Value Proposition

ScanPro AI is designed to disrupt the stock scanning market by lowering the barrier to entry for complex strategy building. While Chartink relies on a specific syntax, ScanPro AI uses **Natural Language Processing (NLP)** and **Drag-and-Drop** logic to make advanced screening accessible to everyone.

### Key USPs (Unique Selling Propositions):
*   **AI Screener Assistant:** Type "Find breakout stocks with high volume and low debt" and get an instant scan.
*   **Broker Integration:** One-click execution or full automation via Zerodha, Upstox, etc.
*   **Backtesting for All:** Historical validation of any scan condition with a single click.
*   **Social Alpha:** A marketplace for verified strategies and community-driven insights.

---

## 2. Core Modules & Feature Breakdown

### A. Advanced Stock Screener Engine (The Core)
*   **The "Legacy" Mode:** Support for formula-based scanning (Chartink syntax compatibility).
*   **The "Pro" Builder:** A visual block-based builder (No-code).
*   **Multi-Timeframe Scanning:** Scan across 1m, 5m, 15m, Hourly, Daily, Weekly, and Monthly in a single query.
*   **Technical + Fundamental:** Combine RSI/MACD with PE/ROE/Debt-to-Equity.

### B. AI Assistant (The USP)
*   **NLP to Query:** Uses LLM (GPT-4o / Claude 3.5 Sonnet) to translate English to SQL/JSON scan rules.
*   **Strategy Explainability:** AI summarizes *why* a stock was picked based on technical patterns.
*   **Risk Engine:** AI-driven warnings if a strategy has poor risk-reward or high drawdown.

### C. Real-Time Alerts & Webhooks
*   **Omnichannel Notifications:** WhatsApp, Telegram, Mobile Push, Email.
*   **Webhook Support:** Integration with TradingView alerts or external custom bots.
*   **Actionable Alerts:** Alerts include a "Trade Now" button that opens the broker order window.

### D. Charts & Visualization
*   **TradingView Integration:** Lightweight Charts or Advanced Charting Library.
*   **Pattern Overlays:** Automated detection of Triangles, Head & Shoulders, Flag patterns.
*   **Custom Indicators:** Ability to write custom Pine-script-like indicators.

### E. Broker & Portfolio
*   **Multi-Broker Support:** Kite Connect (Zerodha), Upstox API, Angel One (SmartAPI).
*   **Auto-Trading:** Webhook-triggered automated order placement with SL/TP logic.
*   **Unified Portfolio:** Track holdings across multiple brokers in one dashboard.

---

## 3. Technical Architecture

### **High-Level Stack**
*   **Frontend (Web):** Next.js 14/15 (App Router), Tailwind CSS, Framer Motion (Premium UI).
*   **Mobile App:** Flutter (Universal for iOS & Android).
*   **Backend API:** Node.js (NestJS) or Laravel (depending on team preference). *Node.js is recommended for real-time performance.*
*   **Scanner Engine:** Python (FastAPI + Pandas + TA-Lib + NumPy).
*   **Database:** 
    *   **PostgreSQL:** Primary relational data (Users, Screeners, Portfolios).
    *   **TimescaleDB:** High-performance OHLCV (price) data storage.
    *   **Redis:** Real-time caching, Rate limiting, and Socket.IO session management.
*   **Real-Time Data:** WebSockets (Socket.IO) for live price ticks and alert delivery.
*   **Cloud:** AWS (EC2 for engine, RDS for DB, S3 for logs).

### **Data Flow Architecture**
1.  **Market Feed Ingestor:** Python service connects to data vendors (NSE/BSE) via WebSockets.
2.  **Streaming Engine:** Pushes raw ticks to Redis and computes technical indicators (RSI, EMA, etc.) on the fly.
3.  **Scanner Worker:** Periodically (or on every tick) runs active user screeners against the computed data.
4.  **Notification Hub:** Dispatches alerts to the appropriate channel if conditions are met.

---

## 4. Database Schema (Draft)

### `users`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `email` | String | Unique |
| `mobile` | String | For OTP Login |
| `password_hash` | String | Hashed password |
| `tier` | Enum | Free, Pro, Elite, Business |

### `screeners`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `user_id` | UUID | Owner |
| `name` | String | Title of scan |
| `rules_json` | JSONB | Logic blocks for the scanner |
| `formula` | Text | Raw string formula for advanced users |
| `is_public` | Boolean | For Community Marketplace |

### `alerts`
| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | UUID | Primary Key |
| `screener_id` | UUID | Linked scanner |
| `channels` | Array | [Telegram, WhatsApp, Webhook] |
| `last_triggered`| Timestamp | Throttling control |

---

## 5. Development Roadmap (Phased)

### **Phase 1: Foundation (30 Days)**
*   User Auth (Google/Mobile OTP).
*   Market Data Ingestor (Daily/End-of-Day).
*   Basic Table-based Screener.
*   Watchlist Management.

### **Phase 2: Real-time & Charts (30 Days)**
*   Live WebSocket integration for Nifty/BankNifty.
*   TradingView Charting integration.
*   Telegram/Email Alert system.
*   Subscription Payment Gateway (Razorpay/Stripe).

### **Phase 3: AI & Advanced Engine (45 Days)**
*   AI Chat Assistant (Query to Scanner).
*   Backtesting Engine (Historical simulation).
*   Multi-timeframe scanning logic.
*   Flutter Mobile App (Beta).

### **Phase 4: Automation & Social (30 Days)**
*   Broker API Integrations (Zerodha/Upstox).
*   Strategy Marketplace.
*   Portfolio Analytics.
*   White-label API for Business users.

---

## 6. Premium Monetization (India Focus)

| Plan | Price (Monthly) | Key Features |
| :--- | :--- | :--- |
| **Free** | ₹0 | Delayed data, 5 scans, Basic filters |
| **Pro** | ₹499 | Real-time data, Unlimited scans, AI Assistant (Limited) |
| **Elite** | ₹999 | Backtesting, Full AI, 50 Alerts, Broker Auth |
| **Business**| ₹2499 | Webhooks, API Access, White-label exports |

---

## 7. Next Steps for Developers
1.  **Backend:** Initialize Node.js/NestJS with Prisma/PostgreSQL.
2.  **Engine:** Set up Python FastAPI and connect to a test market data feed (e.g., Yahoo Finance for dev, Shoonya/Interactive Brokers for production).
3.  **Frontend:** Scaffold Next.js project with Tailwind and Shadcn UI.
4.  **AI:** Set up OpenAI/Anthropic API integration for the Natural Language query parser.

---

**ScanPro AI - Let's build the future of trading.**
