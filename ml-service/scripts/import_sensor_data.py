import os
import sys

from pathlib import Path

import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient


ROOT_DIR = Path(__file__).resolve().parents[1]

load_dotenv(ROOT_DIR / ".env")

sys.path.append(str(ROOT_DIR))


client = MongoClient(
    os.getenv("MONGODB_URI")
)

db = client[
    os.getenv("DATABASE_NAME")
]

stations_collection = db["stations"]

sensor_collection = db["sensor_readings"]


CSV_PATH = (
    ROOT_DIR
    / "datasets"
    / "processed"
    / "test_predictions.csv"
)


df = pd.read_csv(CSV_PATH)


print(f"Loaded {len(df)} rows")