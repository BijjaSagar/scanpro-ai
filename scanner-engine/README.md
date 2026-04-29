# ScanPro AI: Scanner Engine (Python)

The Scanner Engine is a high-performance Python microservice responsible for ingesting market data, computing technical indicators, and executing user-defined scan rules.

## Core Dependencies
*   **FastAPI:** API layer for the backend to request scan results.
*   **Pandas:** For data manipulation and vectorised calculations.
*   **TA-Lib:** Technical Analysis Library (C-wrapper) for indicators like RSI, MACD, etc.
*   **Pandas_TA:** Higher-level wrapper for Pandas.
*   **NumPy:** For high-speed mathematical operations.
*   **Redis:** For low-latency data retrieval of computed indicators.

## Architecture
1.  **Ingestor:** Connects to a data vendor (WebSocket) and pushes raw OHLCV to Redis.
2.  **Indicator Compute:** A worker that listens for new ticks, retrieves the last `N` bars from Redis, calculates technical indicators, and stores the results back in Redis.
3.  **Engine API:** Receives a `rules_json` from the Backend (Node/Laravel), converts it into a Pandas query (e.g., `df[(df['rsi'] > 60) & (df['close'] > df['ema_20'])]`), and returns the matching symbols.

## Directory Structure
```
scanner-engine/
├── app/
│   ├── api/          # FastAPI endpoints
│   ├── core/         # Engine logic & Pandas query builder
│   ├── indicators/   # TA-Lib wrappers
│   └── main.py       # Entry point
├── workers/
│   └── data_fetcher.py
├── requirements.txt
└── Dockerfile
```

## Setup (Dev)
1. Install TA-Lib (requires C library: `brew install ta-lib` on Mac).
2. `pip install -r requirements.txt`
3. `uvicorn app.main:app --reload`
