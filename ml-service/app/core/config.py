from pathlib import Path

from dotenv import load_dotenv
import os

load_dotenv()

OPENWEATHER_API_KEY = os.getenv(
    "OPENWEATHER_API_KEY"
)

ROOT_DIR = Path(__file__).resolve().parents[2]

MODELS_DIR = ROOT_DIR / "models"

OUTPUTS_DIR = ROOT_DIR / "outputs"

SHAP_DIR = OUTPUTS_DIR / "shap"

REGRESSOR_MODEL = MODELS_DIR / "aqi_regressor.joblib"

CLASSIFIER_MODEL = MODELS_DIR / "aqi_classifier.joblib"

LABEL_ENCODER = MODELS_DIR / "category_label_encoder.joblib"

FEATURE_COLUMNS = MODELS_DIR / "feature_columns.joblib"

FEATURE_IMPORTANCE = SHAP_DIR / "feature_importance.json"

SYNC_INTERVAL_MINUTES = 15

OPENWEATHER_BASE_URL = "https://api.openweathermap.org"

#LOCAL_EXPLANATIONS = SHAP_DIR / "local_explanations.json"