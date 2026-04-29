from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from typing import List, Dict
from app.services.scanner_service import scanner_service
from app.services.backtest_service import backtest_service

app = FastAPI(title="ScanPro AI - Scanner Engine")

# Configure CORS for frontend and main API access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "ScanPro AI Scanner Engine is Online"}

@app.post("/scan")
async def execute_scan(payload: Dict):
    """
    Executes a real-time scan based on provided rules.
    Payload format: {"rules": [...]}
    """
    rules = payload.get("rules", [])
    results = await scanner_service.run_scan(rules)
    return {
        "status": "success",
        "count": len(results),
        "results": results
    }

@app.post("/backtest")
async def execute_backtest(payload: Dict):
    """
    Executes a historical backtest for a symbol.
    """
    symbol = payload.get("symbol", "RELIANCE")
    rules = payload.get("rules", [])
    results = await backtest_service.run_backtest(symbol, rules)
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8002)
