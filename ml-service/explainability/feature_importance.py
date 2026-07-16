"""
Feature Importance Generator

Converts SHAP values into ranked feature importance.
"""

import json
import logging

import joblib
import numpy as np
import pandas as pd

from training.config import (
    FEATURE_COLUMNS,
    SHAP_VALUES,
    FEATURE_IMPORTANCE_JSON,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)


def load_assets():

    logger.info("Loading SHAP values...")

    shap_values = joblib.load(
        SHAP_VALUES
    )

    feature_columns = joblib.load(
        FEATURE_COLUMNS
    )

    return shap_values, feature_columns


def compute_importance(
    shap_values,
    feature_columns,
):

    logger.info(
        "Computing feature importance..."
    )

    importance = np.abs(
        shap_values.values
    ).mean(axis=0)

    df = pd.DataFrame(
        {
            "feature": feature_columns,
            "importance": importance,
        }
    )

    df = df.sort_values(
        "importance",
        ascending=False,
    )

    return df


def save_json(df):

    logger.info(
        "Saving feature importance..."
    )

    df.to_json(
        FEATURE_IMPORTANCE_JSON,
        orient="records",
        indent=4,
    )

    logger.info(
        f"Saved to {FEATURE_IMPORTANCE_JSON}"
    )


def main():

    logger.info("=" * 60)

    logger.info(
        "Feature Importance Pipeline"
    )

    logger.info("=" * 60)

    shap_values, feature_columns = load_assets()

    df = compute_importance(
        shap_values,
        feature_columns,
    )

    save_json(df)

    logger.info("=" * 60)

    logger.info("Completed")

    logger.info("=" * 60)


if __name__ == "__main__":
    main()