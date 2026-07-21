from pathlib import Path
import os

import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient


# -------------------------
# Paths
# -------------------------

PROJECT_DIR = Path(__file__).resolve().parents[2]

ML_DIR = PROJECT_DIR / "ml-service"

load_dotenv(ML_DIR / ".env")


# -------------------------
# MongoDB
# -------------------------

client = MongoClient(
    os.getenv("MONGODB_URI")
)

db = client[
    os.getenv("DATABASE_NAME")
]

collection = db["sensor_readings"]


# -------------------------
# Load Dataset
# -------------------------

CSV_PATH = (
    PROJECT_DIR
    / "datasets"
    / "processed"
    / "features.csv"
)

df = pd.read_csv(CSV_PATH)

print(f"Loaded {len(df)} rows")


# -------------------------
# Datetime
# -------------------------

df["datetimeLocal"] = pd.to_datetime(
    df["datetimeLocal"]
)


# -------------------------
# Clear Collection
# -------------------------

collection.delete_many({})


# -------------------------
# Insert
# -------------------------

records = df.to_dict(
    orient="records"
)

collection.insert_many(records)

print(
    f"Inserted {len(records)} sensor readings."
)