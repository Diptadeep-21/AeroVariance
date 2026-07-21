from pathlib import Path
import os

import pandas as pd
from dotenv import load_dotenv
from pymongo import MongoClient


# ET_AI_Hackathon/
PROJECT_DIR = Path(__file__).resolve().parents[2]

# ml-service/
ML_DIR = PROJECT_DIR / "ml-service"

load_dotenv(ML_DIR / ".env")

print("Project:", PROJECT_DIR)
print("ML:", ML_DIR)

client = MongoClient(
    os.getenv("MONGODB_URI")
)

db = client[
    os.getenv("DATABASE_NAME")
]

stations = db["stations"]


CSV_PATH = (
    PROJECT_DIR
    / "datasets"
    / "processed"
    / "features.csv"
)

print("CSV:", CSV_PATH)
print("Exists:", CSV_PATH.exists())

df = pd.read_csv(CSV_PATH)


unique_stations = (
    df["location_name"]
    .drop_duplicates()
    .sort_values()
)

stations.delete_many({})

documents = []

for station in unique_stations:

    documents.append(
        {
            "station": station,
            "active": True,
        }
    )

stations.insert_many(documents)

print(
    f"Inserted {len(documents)} stations."
)