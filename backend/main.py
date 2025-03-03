from pymongo import MongoClient
from fastapi import FastAPI
from bson.json_util import dumps

app = FastAPI()

MONGO_URI = "mongodb://mongo:27017"
MONGO_DATABASE = "scraped_data"  
MONGO_COLLECTION = "carspider"   

client = MongoClient(MONGO_URI)
db = client[MONGO_DATABASE]
collection = db[MONGO_COLLECTION]

@app.get("/cars")
def get_cars():
    cars = list(collection.find({}, {"_id": 0}))  
    return {"count": len(cars), "cars": cars}
