import json
import os
from openai import OpenAI
from app.api.schemas import AIQueryRequest, AIQueryResponse
from app.core.prompt_templates import SYSTEM_PROMPT

class ScreenerService:
    def __init__(self):
        # In production, use environment variables for API keys
        self.client = OpenAI(api_key=os.getenv("OPENAI_API_KEY", "your-api-key"))

    async def translate_query(self, request: AIQueryRequest) -> AIQueryResponse:
        try:
            response = self.client.chat.completions.create(
                model="gpt-4o",
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user", "content": request.query}
                ],
                response_format={ "type": "json_object" }
            )
            
            data = json.loads(response.choices[0].message.content)
            return AIQueryResponse(**data)
        except Exception as e:
            # Fallback for demo purposes if API key is missing
            return AIQueryResponse(
                rules=[{"id": "demo-1", "timeframe": "Daily", "indicator": "RSI", "operator": ">", "value": "70"}],
                explanation=f"Demo: Successfully parsed '{request.query}'. (Note: LLM API call failed: {str(e)})",
                confidence=0.5
            )

# Singleton instance
screener_service = ScreenerService()
