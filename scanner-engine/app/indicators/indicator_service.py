import pandas as pd
import pandas_ta as ta

class IndicatorService:
    @staticmethod
    def add_indicators(df: pd.DataFrame) -> pd.DataFrame:
        """
        Calculates common indicators for a given OHLCV dataframe.
        """
        # Ensure we have enough data
        if len(df) < 200:
            return df

        # RSI
        df['RSI'] = ta.rsi(df['Close'], length=14)

        # EMAs
        df['EMA_20'] = ta.ema(df['Close'], length=20)
        df['EMA_50'] = ta.ema(df['Close'], length=50)
        df['EMA_200'] = ta.ema(df['Close'], length=200)

        # MACD
        macd = ta.macd(df['Close'])
        if macd is not None:
            df = pd.concat([df, macd], axis=1)

        # Bollinger Bands
        bbands = ta.bbands(df['Close'], length=20, std=2)
        if bbands is not None:
            df = pd.concat([df, bbands], axis=1)

        return df

    @staticmethod
    def check_condition(df: pd.DataFrame, indicator: str, operator: str, value: str) -> bool:
        """
        Checks if the latest row in the dataframe matches the condition.
        """
        last_row = df.iloc[-1]
        prev_row = df.iloc[-2]

        current_val = last_row.get(indicator)
        if current_val is None:
            return False

        # Handle numeric vs indicator values
        try:
            target_val = float(value)
        except ValueError:
            target_val = last_row.get(value)
            if target_val is None:
                return False

        if operator == '>':
            return current_val > target_val
        elif operator == '<':
            return current_val < target_val
        elif operator == '>=':
            return current_val >= target_val
        elif operator == '<=':
            return current_val <= target_val
        elif operator == '=':
            return current_val == target_val
        elif operator == 'crosses_above':
            prev_val = prev_row.get(indicator)
            prev_target = prev_row.get(value) if isinstance(value, str) and not value.replace('.','',1).isdigit() else float(value)
            return prev_val <= prev_target and current_val > target_val
        elif operator == 'crosses_below':
            prev_val = prev_row.get(indicator)
            prev_target = prev_row.get(value) if isinstance(value, str) and not value.replace('.','',1).isdigit() else float(value)
            return prev_val >= prev_target and current_val < target_val

        return False
