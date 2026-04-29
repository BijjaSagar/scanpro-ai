from pydantic import BaseModel, Field
from typing import List, Optional

class ScannerRule(BaseModel):
    id: str
    timeframe: str = Field(..., description="e.g. 1m, 5m, 15m, 1h, Daily, Weekly")
    indicator: str = Field(..., description="e.g. RSI, EMA, Close, Volume, MACD")
    operator: str = Field(..., description="e.g. >, <, >=, <=, crosses_above, crosses_below")
    value: str = Field(..., description="A numeric value or another indicator name")

class AIQueryRequest(BaseModel):
    query: str = Field(..., example="Find stocks with RSI above 70 on daily chart")

class AIQueryResponse(BaseModel):
    rules: List[ScannerRule]
    explanation: str = Field(..., description="A human-readable explanation of why these rules were chosen")
    confidence: float = Field(..., description="Confidence score of the translation (0.0 to 1.0)")
