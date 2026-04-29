import pandas as pd
from typing import List, Dict, Optional
from app.data_fetchers.data_fetcher import DataFetcher
from app.indicators.indicator_service import IndicatorService

class BacktestService:
    def __init__(self):
        self.fetcher = DataFetcher()
        self.indicator_service = IndicatorService()

    async def run_backtest(self, symbol: str, rules: List[Dict], target_pct: float = 5.0, stop_loss_pct: float = 2.0) -> Dict:
        """
        Runs a historical backtest for a single symbol over 1 year of data.
        """
        df = self.fetcher.get_ohlcv(symbol, period='1y')
        if df is None or df.empty:
            return {"error": "No data found"}

        # Add indicators
        df = self.indicator_service.add_indicators(df)
        
        trades = []
        in_trade = False
        entry_price = 0
        entry_date = None
        
        # Iterate through the rows (skipping the first few for indicators)
        for i in range(200, len(df)):
            current_df = df.iloc[:i+1]
            
            if not in_trade:
                # Check for Entry Signal
                all_passed = True
                for rule in rules:
                    if not self.indicator_service.check_condition(current_df, rule['indicator'], rule['operator'], rule['value']):
                        all_passed = False
                        break
                
                if all_passed:
                    in_trade = True
                    entry_price = df.iloc[i]['Close']
                    entry_date = df.index[i]
            else:
                # Check for Exit Signal (Target or SL)
                current_price = df.iloc[i]['Close']
                pnl_pct = ((current_price - entry_price) / entry_price) * 100
                
                if pnl_pct >= target_pct or pnl_pct <= -stop_loss_pct:
                    trades.append({
                        "entry_date": str(entry_date),
                        "exit_date": str(df.index[i]),
                        "entry_price": round(entry_price, 2),
                        "exit_price": round(current_price, 2),
                        "pnl_pct": round(pnl_pct, 2),
                        "result": "Profit" if pnl_pct > 0 else "Loss"
                    })
                    in_trade = False

        if not trades:
            return {"symbol": symbol, "message": "No trades triggered", "total_pnl": 0}

        total_pnl = sum(t['pnl_pct'] for t in trades)
        win_rate = (len([t for t in trades if t['pnl_pct'] > 0]) / len(trades)) * 100

        return {
            "symbol": symbol,
            "total_trades": len(trades),
            "win_rate": round(win_rate, 2),
            "total_pnl": round(total_pnl, 2),
            "trades": trades
        }

# Singleton instance
backtest_service = BacktestService()
