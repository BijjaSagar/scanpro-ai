# ScanPro AI: UI/UX Guidelines & Design System

## 1. Design Philosophy
*   **Modern & Dark-First:** High-contrast dark mode with vibrant accent colors (Electric Blue, Emerald Green for gains, Ruby Red for losses).
*   **Data Density with Clarity:** Trading platforms need lots of data, but it should be organized using whitespace and clear typography.
*   **Micro-interactions:** Smooth transitions between scanner results, hover states on charts, and satisfying alert animations.

---

## 2. Color Palette
*   **Background (Surface):** `#0F172A` (Deep Slate)
*   **Primary Accent:** `#3B82F6` (Electric Blue)
*   **Success (Gains):** `#10B981` (Emerald)
*   **Danger (Losses):** `#EF4444` (Ruby)
*   **Text (Primary):** `#F8FAFC`
*   **Text (Secondary):** `#94A3B8`

---

## 3. Key Pages & Layouts

### A. The Dashboard (Home)
*   **Top Bar:** Global Search (Stocks/Screeners), Notifications, Profile.
*   **Sidebar:** Dashboard, Screener, Alerts, Backtest, Portfolio, Community, Learning.
*   **Main Grid:**
    *   **Live Market Widget:** Nifty/BankNifty mini-charts.
    *   **AI Picks of the Day:** 3 cards with AI-justified stock ideas.
    *   **Trending Scans:** List of most used public screeners.
    *   **Watchlist Performance:** Quick view of user's favorite stocks.

### B. The Screener Builder (The Heart)
*   **Split View:**
    *   **Left (Builder):** Drag-and-drop blocks like `[ RSI ] [ > ] [ 60 ]`.
    *   **Right (Results):** Real-time filtered table with sparklines.
*   **AI Input:** A prominent text area at the top: *"What are you looking for today? (e.g., Stocks near 52-week high with RSI breakout)"*

### C. Charts Module
*   **Full-screen Canvas:** TradingView-style interface.
*   **Floating Toolbar:** Indicators, Drawings, Timeframes.
*   **Overlay Labels:** When an alert is triggered, a label appears on the chart at the exact price point.

---

## 4. Components (Shadcn UI Based)
*   **DataTable:** Sortable, searchable, with sticky headers and pagination.
*   **Command Palette:** `Cmd+K` to jump to any stock or scanner instantly.
*   **Stat Cards:** Large numbers with percentage change indicators and mini-trendlines.
*   **Toast Notifications:** For real-time alerts while the user is browsing.

---

## 5. Mobile (Flutter) Specifics
*   **Bottom Navigation:** Easy access to Home, Scanner, Charts, and Portfolio.
*   **Native Widgets:** Use Cuperinto/Material with custom styling to feel "premium native."
*   **Haptic Feedback:** On scan completion and alert triggers.
