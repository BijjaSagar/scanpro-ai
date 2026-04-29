from typing import List, Dict
from app.data_fetchers.data_fetcher import DataFetcher
from app.indicators.indicator_service import IndicatorService

class ScannerService:
    def __init__(self):
        self.fetcher = DataFetcher()
        self.indicator_service = IndicatorService()

    async def run_scan(self, rules: List[Dict]) -> List[Dict]:
        """
        Runs a scan across a predefined list of stocks.
        """
        symbols = self.fetcher.get_top_stocks()
        matches = []

        for symbol in symbols:
            df = self.fetcher.get_ohlcv(symbol)
            if df is None or df.empty:
                continue

            # Add indicators to the dataframe
            df = self.indicator_service.add_indicators(df)
            
            if df.empty:
                continue

            # Add fundamentals for rule checking
            fundamentals = self.fetcher.get_fundamentals(symbol)
            last_row = df.iloc[-1].to_dict()
            combined_data = {**last_row, **fundamentals}
            
            # Check all rules
            all_passed = True
            for rule in rules:
                indicator = rule.get('indicator')
                operator = rule.get('operator')
                value = rule.get('value')
                
                # Check in combined data
                if not self.check_logic(combined_data, indicator, operator, value):
                    all_passed = False
                    break
            
            if all_passed:
                matches.append({
                    "symbol": symbol,
                    "price": round(df.iloc[-1]['Close'], 2),
                    "change": round(((df.iloc[-1]['Close'] - df.iloc[-2]['Close']) / df.iloc[-2]['Close']) * 100, 2),
                    "fundamentals": fundamentals,
                    "indicators": {
                        "RSI": round(df.iloc[-1].get('RSI', 0), 2),
                        "EMA_50": round(df.iloc[-1].get('EMA_50', 0), 2)
                    }
                })

        return matches

    def check_logic(self, data: Dict, indicator: str, operator: str, value: str) -> bool:
        """
        Helper to check logic against a dictionary of combined technical + fundamental data.
        """
        current_val = data.get(indicator)
        if current_val is None:
            return False

        try:
            target_val = float(value)
        except ValueError:
            target_val = data.get(value)
            if target_val is None:
                return False

        if operator == '>': return current_val > target_val
        if operator == '<': return current_val < target_val
        if operator == '>=': return current_val >= target_val
        if operator == '<=': return current_val <= target_val
        if operator == '=': return current_val == target_val
        
        return False

# Singleton instance
scanner_service = ScannerService()
