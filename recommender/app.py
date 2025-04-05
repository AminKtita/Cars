from asyncio.log import logger
from fastapi import FastAPI, HTTPException
import uvicorn
from car_recommender import CarRecommender
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
recommender = None

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Frontend origin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    global recommender
    try:
        # Initialize with MongoDB URI
        recommender = CarRecommender("mongodb://mongo:27017/scraped_data")
        logger.info("Recommendation system ready")
    except Exception as e:
        logger.critical(f"Startup failed: {str(e)}")
        raise RuntimeError(f"Initialization error: {str(e)}")

@app.get("/recommend/{user_id}")
async def get_recommendations(user_id: str):
    try:
        if not recommender:
            raise HTTPException(status_code=500, detail="System not initialized")
            
        return {
            "user_id": user_id,
            "recommended_cars": recommender.recommend(user_id)
        }
    except Exception as e:
        logger.error(f"Recommendation failed: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000, log_level="info")