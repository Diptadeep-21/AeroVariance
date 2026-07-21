"""
Model Evaluation Pipeline

Evaluates saved predictions generated during training.
"""

import json
import logging

import joblib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import xgboost as xgb

from sklearn.metrics import (
    accuracy_score,
    classification_report,
    confusion_matrix,
    mean_absolute_error,
    mean_squared_error,
    r2_score,
    ConfusionMatrixDisplay,
)

from training.config import (
    PROCESSED_DIR,
    PLOTS_DIR,
    METRICS_DIR,
    REGRESSOR_MODEL,
)

from sklearn.metrics import mean_absolute_percentage_error

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)


def load_predictions():

    logger.info("Loading predictions...")

    df = pd.read_csv(
        PROCESSED_DIR / "test_predictions.csv"
    )

    logger.info(f"Rows : {len(df)}")

    return df


def evaluate_regression(df):

    logger.info("Evaluating regression...")

    rmse = np.sqrt(
        mean_squared_error(
            df["AQI"],
            df["AQI_pred"]
        )
    )

    mae = mean_absolute_error(
        df["AQI"],
        df["AQI_pred"]
    )

    mape = mean_absolute_percentage_error(
        df["AQI"],
        df["AQI_pred"],
    )

    r2 = r2_score(
        df["AQI"],
        df["AQI_pred"]
    )

    metrics = {
        "RMSE": round(float(rmse),4),
        "MAE": round(float(mae),4),
        "MAPE": round(float(mape),4),
        "R2": round(float(r2),4)
    }

    logger.info(metrics)

    with open(
        METRICS_DIR / "regression_metrics.json",
        "w"
    ) as f:

        json.dump(
            metrics,
            f,
            indent=4
        )

    plt.figure(figsize=(8,6))

    plt.scatter(
        df["AQI"],
        df["AQI_pred"],
        alpha=0.5
    )

    plt.xlabel("Actual AQI")

    plt.ylabel("Predicted AQI")

    plt.title("Actual vs Predicted AQI")

    plt.tight_layout()

    plt.savefig(
        PLOTS_DIR / "actual_vs_predicted.png",
        dpi=300
    )

    plt.close()

    plt.figure(figsize=(8,6))

    plt.scatter(
        df["AQI_pred"],
        df["AQI_error"],
        alpha=0.5
    )

    plt.axhline(
        0,
        color="red",
        linestyle="--"
    )

    plt.xlabel("Predicted AQI")

    plt.ylabel("Residual")

    plt.title("Residual Plot")

    plt.tight_layout()

    plt.savefig(
        PLOTS_DIR / "residuals.png",
        dpi=300
    )

    plt.close()


def evaluate_classifier(df):

    logger.info("Evaluating classifier...")

    accuracy = accuracy_score(
        df["AQI_category"],
        df["AQI_category_pred"]
    )

    logger.info(
        f"Classification Accuracy : {accuracy:.4f}"
    )

    report = classification_report(
        df["AQI_category"],
        df["AQI_category_pred"],
        zero_division=0
    )

    with open(
        METRICS_DIR / "classification_report.txt",
        "w"
    ) as f:

        f.write(report)

    metrics = {
        "accuracy": round(float(accuracy),4)
    }

    with open(
        METRICS_DIR / "classification_metrics.json",
        "w"
    ) as f:

        json.dump(
            metrics,
            f,
            indent=4
        )

    cm = confusion_matrix(
        df["AQI_category"],
        df["AQI_category_pred"]
    )

    disp = ConfusionMatrixDisplay(
        confusion_matrix=cm
    )

    fig, ax = plt.subplots(figsize=(7,6))

    disp.plot(ax=ax)

    plt.tight_layout()

    plt.savefig(
        PLOTS_DIR / "confusion_matrix.png",
        dpi=300
    )

    plt.close()


def plot_feature_importance():

    logger.info("Saving Feature Importance...")

    regressor = joblib.load(
        REGRESSOR_MODEL
    )

    booster = regressor.get_booster()

    scores = booster.get_score(
        importance_type="gain"
    )

    df = (
        pd.DataFrame(
            scores.items(),
            columns=[
                "feature",
                "importance",
            ],
        )
        .sort_values(
            "importance",
            ascending=False,
        )
    )

    df.to_csv(
        METRICS_DIR / "feature_importance.csv",
        index=False,
    )

    fig, ax = plt.subplots(
        figsize=(12, 10)
    )

    xgb.plot_importance(
        regressor,
        max_num_features=20,
        ax=ax,
    )

    plt.tight_layout()

    plt.savefig(
        PLOTS_DIR / "feature_importance.png",
        dpi=300,
    )

    plt.close()


def main():

    logger.info("="*60)

    logger.info("Evaluation Pipeline")

    logger.info("="*60)

    df = load_predictions()

    evaluate_regression(df)

    evaluate_classifier(df)

    plot_feature_importance()

    logger.info("Evaluation Complete")


if __name__ == "__main__":

    main()

import json

with open(
    METRICS_DIR / "regression_metrics.json"
) as f:
    regression = json.load(f)

with open(
    METRICS_DIR / "classification_metrics.json"
) as f:
    classification = json.load(f)

with open(
    METRICS_DIR / "evaluation.json",
    "w",
) as f:

    json.dump(
        {
            "regression": regression,
            "classification": classification,
        },
        f,
        indent=4,
    )