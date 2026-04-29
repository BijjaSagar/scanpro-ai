import yfinance as yf
import pandas as pd
from typing import Optional

class DataFetcher:
    @staticmethod
    def get_ohlcv(symbol: str, interval: str = '1d', period: str = '1y') -> Optional[pd.DataFrame]:
        """
        Fetches historical data for a given symbol from Yahoo Finance.
        Automatically appends .NS for Indian stocks if not present.
        """
        if not symbol.endswith('.NS') and not symbol.endswith('.BO'):
            symbol = f"{symbol}.NS"
            
        try:
            ticker = yf.Ticker(symbol)
            df = ticker.history(period=period, interval=interval)
            
            if df.empty:
                return None
                
            # Standardize column names
            df = df[['Open', 'High', 'Low', 'Close', 'Volume']]
            return df
        except Exception as e:
            print(f"Error fetching data for {symbol}: {e}")
            return None

    @staticmethod
    def get_top_stocks() -> list:
        """
        Returns a list of top NIFTY 50 symbols for scanning.
        """
        return [
            "RELIANCE", "TCS", "HDFCBANK", "ICICIBANK", "INFY", 
            "BHARTIARTL", "SBIN", "LICI", "ITC", "HINDUNILVR",
            "LT", "BAJFINANCE", "ADANIENT", "MARUTI", "SUNPHARMA"
        ]

    @staticmethod
    def get_fundamentals(symbol: str) -> Dict:
        """
        Fetches fundamental data for a given symbol.
        """
        if not symbol.endswith('.NS') and not symbol.endswith('.BO'):
            symbol = f"{symbol}.NS"
            
        try:
            ticker = yf.Ticker(symbol)
            info = ticker.info
            return {
                "PE": info.get("trailingPE"),
                "DividendYield": info.get("dividendYield"),
                "MarketCap": info.get("marketCap"),
                "QuarterlyGrowth": info.get("earningsQuarterlyGrowth"),
                "PB": info.get("priceToBook"),
                "ROE": info.get("returnOnEquity")
            }
        except Exception:
            return {}
