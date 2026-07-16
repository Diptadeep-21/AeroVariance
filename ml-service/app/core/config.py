from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[2]

MODELS_DIR = ROOT_DIR / "models"

OUTPUTS_DIR = ROOT_DIR / "outputs"

SHAP_DIR = OUTPUTS_DIR / "shap"

REGRESSOR_MODEL = MODELS_DIR / "aqi_regressor.joblib"

CLASSIFIER_MODEL = MODELS_DIR / "aqi_classifier.joblib"

LABEL_ENCODER = MODELS_DIR / "category_label_encoder.joblib"

FEATURE_COLUMNS = MODELS_DIR / "feature_columns.joblib"

FEATURE_IMPORTANCE = SHAP_DIR / "feature_importance.json"

LOCAL_EXPLANATIONS = SHAP_DIR / "local_explanations.json"