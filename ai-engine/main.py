from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.schemas import AIQueryRequest, AIQueryResponse
from app.services.screener_service import screener_service

app = FastAPI(title="ScanPro AI - Intelligence Engine")

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "ScanPro AI Intelligence Engine is Online"}

@app.post("/translate", response_model=AIQueryResponse)
async def translate_query(request: AIQueryRequest):
    """
    Translates a natural language query into structured scanner rules.
    """
    return await screener_service.translate_query(request)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
