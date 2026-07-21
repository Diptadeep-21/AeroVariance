from pymongo import MongoClient
from dotenv import load_dotenv

import os

load_dotenv()

client = MongoClient(
    os.getenv("MONGODB_URI")
)

db = client[
    os.getenv("DATABASE_NAME", "aerovariance")
]

# Ensure indexes for database query performance optimization
try:
    db["location_history"].create_index([("location", 1), ("timestamp", 1)])
    db["sensor_readings"].create_index([("station", 1), ("timestamp", 1)])
except Exception as e:
    pass