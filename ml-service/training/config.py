from pathlib import Path

ROOT_DIR = Path(__file__).resolve().parents[1]

DATASET_DIR = ROOT_DIR.parent / "datasets"
PROCESSED_DIR = DATASET_DIR / "processed"

MODELS_DIR = ROOT_DIR / "models"

OUTPUT_DIR = ROOT_DIR / "outputs"
PLOTS_DIR = OUTPUT_DIR / "plots"
METRICS_DIR = OUTPUT_DIR / "metrics"

FEATURE_FILE = PROCESSED_DIR / "features.csv"

TEST_PREDICTIONS = PROCESSED_DIR / "test_predictions.csv"

REGRESSOR_MODEL = MODELS_DIR / "aqi_regressor.joblib"
CLASSIFIER_MODEL = MODELS_DIR / "aqi_classifier.joblib"
FEATURE_COLUMNS = MODELS_DIR / "feature_columns.joblib"
LABEL_ENCODER = MODELS_DIR / "category_label_encoder.joblib"

PLOTS_DIR.mkdir(parents=True, exist_ok=True)
METRICS_DIR.mkdir(parents=True, exist_ok=True)

SHAP_DIR = OUTPUT_DIR / "shap"

SHAP_DIR.mkdir(parents=True, exist_ok=True)

SHAP_VALUES = SHAP_DIR / "shap_values.joblib"
SHAP_EXPLANATION = SHAP_DIR / "shap_explanation.joblib"

SHAP_SUMMARY_PLOT = SHAP_DIR / "summary_plot.png"
SHAP_BAR_PLOT = SHAP_DIR / "bar_plot.png"
SHAP_WATERFALL_PLOT = SHAP_DIR / "waterfall_plot.png"

SHAP_DEPENDENCE_PM25 = SHAP_DIR / "dependence_pm25.png"
SHAP_DEPENDENCE_PM10 = SHAP_DIR / "dependence_pm10.png"
SHAP_DEPENDENCE_NO2 = SHAP_DIR / "dependence_no2.png"

FEATURE_IMPORTANCE_JSON = SHAP_DIR / "feature_importance.json"

LOCAL_EXPLANATIONS = SHAP_DIR / "local_explanations.json"

SHAP_WATERFALL_PLOT = SHAP_DIR / "waterfall_plot.png"