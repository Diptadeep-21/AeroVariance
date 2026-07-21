from pathlib import Path
import json

from app.core.mongodb import db

ML_ROOT = Path(__file__).resolve().parents[1]

JSON_PATH = (
    ML_ROOT
    / "outputs"
    / "shap"
    / "local_explanations.json"
)

print("ML Root:", ML_ROOT)
print("JSON:", JSON_PATH)
print("Exists:", JSON_PATH.exists())

with open(JSON_PATH, "r") as f:
    records = json.load(f)

collection = db["shap_explanations"]

collection.delete_many({})

collection.insert_many(records)

print(f"Inserted {len(records)} SHAP explanations.")