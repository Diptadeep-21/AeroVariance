"""
SHAP Explainability Pipeline

Step 1:
- Load trained model
- Load feature dataset
- Create SHAP TreeExplainer

(No SHAP values generated yet.)
"""

import logging

import joblib
import pandas as pd
import shap
import matplotlib.pyplot as plt
import numpy as np

from training.config import (
    FEATURE_FILE,
    FEATURE_COLUMNS,
    REGRESSOR_MODEL,
    SHAP_VALUES,
    SHAP_SUMMARY_PLOT,
    SHAP_BAR_PLOT,
    SHAP_WATERFALL_PLOT,
    LOCAL_EXPLANATIONS,
    TEST_PREDICTIONS,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)


def load_model():
    """Load trained XGBoost regressor."""

    logger.info("Loading trained model...")

    model = joblib.load(REGRESSOR_MODEL)

    logger.info("Model loaded successfully.")

    return model


def load_dataset():
    """Load engineered features and create the same test split used during training."""

    logger.info("Loading feature dataset...")

    features_df = pd.read_csv(FEATURE_FILE)
    predictions_df = pd.read_csv(TEST_PREDICTIONS)

    features_df["datetimeLocal"] = pd.to_datetime(
        features_df["datetimeLocal"]
    )

    features_df = (
        features_df
        .sort_values("datetimeLocal")
        .reset_index(drop=True)
    )

    feature_columns = joblib.load(FEATURE_COLUMNS)

    cutoff = features_df["datetimeLocal"].quantile(0.80)

    test_df = (
        features_df[
            features_df["datetimeLocal"] > cutoff
        ]
        .copy()
        .reset_index(drop=True)
    )

    X_test = test_df[feature_columns]

    logger.info(f"Test Samples : {len(test_df)}")
    logger.info(f"Feature Count : {len(feature_columns)}")

    return (
        test_df,
        predictions_df,
        X_test,
        feature_columns,
    )


def create_explainer(model):
    """Create SHAP TreeExplainer."""

    logger.info("Creating SHAP TreeExplainer...")

    explainer = shap.TreeExplainer(model)

    logger.info("TreeExplainer created successfully.")

    return explainer

def generate_shap_values(explainer, X):
    """Generate SHAP values."""

    logger.info("Generating SHAP values...")

    shap_values = explainer(X)

    logger.info("SHAP values generated successfully.")

    return shap_values

def save_shap_values(shap_values):
    """Save SHAP values."""

    logger.info("Saving SHAP values...")

    joblib.dump(shap_values, SHAP_VALUES)

    logger.info(f"Saved to {SHAP_VALUES}")

def generate_summary_plot(
    shap_values,
    X,
):
    """Generate SHAP summary plot."""

    logger.info("Generating summary plot...")

    plt.figure(figsize=(12,8))

    shap.summary_plot(
        shap_values,
        X,
        show=False,
    )

    plt.tight_layout()

    plt.savefig(
        SHAP_SUMMARY_PLOT,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    logger.info(f"Saved: {SHAP_SUMMARY_PLOT}")

def generate_bar_plot(
    shap_values,
    X,
):
    """Generate SHAP bar plot."""

    logger.info("Generating bar plot...")

    plt.figure(figsize=(10,8))

    shap.plots.bar(
        shap_values,
        show=False,
        max_display=20,
    )

    plt.tight_layout()

    plt.savefig(
        SHAP_BAR_PLOT,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    logger.info(f"Saved: {SHAP_BAR_PLOT}")



def generate_waterfall_plot(
    shap_values,
    sample_index=0,
):
    """Generate SHAP waterfall plot for one prediction."""

    sample_index = max(
        0,
        min(sample_index, len(shap_values.values) - 1)
    )

    logger.info("Generating waterfall plot...")

    plt.figure(figsize=(10, 8))

    shap.plots.waterfall(
        shap_values[sample_index],
        max_display=10,
        show=False,
    )

    plt.tight_layout()

    plt.savefig(
        SHAP_WATERFALL_PLOT,
        dpi=300,
        bbox_inches="tight",
    )

    plt.close()

    logger.info(
        f"Saved: {SHAP_WATERFALL_PLOT}"
    )

def generate_local_explanations(
    predictions_df,
    shap_values,
    feature_columns,
):
    """
    Create explainable JSON for every prediction.
    """

    logger.info(
        "Generating local explanations..."
    )

    explanations = []

    values = shap_values.values

    rows = len(predictions_df)

    for i in range(rows):

        impacts = []

        for j, feature in enumerate(feature_columns):

            impacts.append(
                {
                    "feature": feature,
                    "impact": round(
                        float(values[i][j]),
                        3,
                    ),
                }
            )

        impacts = sorted(
            impacts,
            key=lambda x: abs(x["impact"]),
            reverse=True,
        )[:5]

        explanations.append(
            {
                "station": predictions_df.iloc[i]["location_name"],
                "timestamp": str(predictions_df.iloc[i]["datetimeLocal"]),
                "actual_aqi": round(float(predictions_df.iloc[i]["AQI"]),2,),
                "predicted_aqi": round(float(predictions_df.iloc[i]["AQI_pred"]),2,),
                "prediction_error": round(float(predictions_df.iloc[i]["AQI_error"]),2,),

                "prediction_correct": bool(predictions_df.iloc[i]["AQI_correct"]),
                "top_features": impacts,
            }
        )

    return explanations

def save_local_explanations(
    explanations,
):
    """Save JSON explanations."""

    logger.info(
        "Saving local explanations..."
    )

    with open(
        LOCAL_EXPLANATIONS,
        "w",
    ) as f:

        import json

        json.dump(
            explanations,
            f,
            indent=4,
        )

    logger.info(
        f"Saved: {LOCAL_EXPLANATIONS}"
    )


def main():

    logger.info("=" * 60)
    logger.info("SHAP Explainability Pipeline")
    logger.info("=" * 60)

    model = load_model()

    test_df, predictions_df, X_test, feature_columns = load_dataset()

    assert len(predictions_df) == len(X_test), (
        f"Mismatch detected! "
        f"Predictions={len(predictions_df)} "
        f"X_test={len(X_test)}"
    )

    explainer = create_explainer(model)

    shap_values = generate_shap_values(
        explainer,
        X_test,
    )

    save_shap_values(
        shap_values,
    )

    generate_summary_plot(
        shap_values,
        X_test,
    )

    generate_bar_plot(
        shap_values,
        X_test,
    )

    generate_waterfall_plot(
    shap_values
    )

    local = generate_local_explanations(
        predictions_df,
        shap_values,
        feature_columns,
    )

    save_local_explanations(
        local
    )

    logger.info("=" * 60)
    logger.info("Step 2 Complete")
    logger.info("SHAP values saved successfully.")
    logger.info("=" * 60)


if __name__ == "__main__":
    main()