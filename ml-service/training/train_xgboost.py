"""
Train XGBoost Models

Trains:
1. AQI Regressor
2. AQI Category Classifier

Outputs:
- aqi_regressor.joblib
- aqi_classifier.joblib
- category_label_encoder.joblib
- feature_columns.joblib
- test_predictions.csv
"""

import logging

import joblib
import pandas as pd
import xgboost as xgb
import sklearn
from sklearn.preprocessing import LabelEncoder

from training.config import (
    FEATURE_FILE,
    REGRESSOR_MODEL,
    CLASSIFIER_MODEL,
    FEATURE_COLUMNS,
    LABEL_ENCODER,
    PROCESSED_DIR,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)




def load_dataset():
    """Load engineered features dataset."""

    logger.info("Loading engineered dataset...")

    df = pd.read_csv(FEATURE_FILE)

    df["datetimeLocal"] = pd.to_datetime(df["datetimeLocal"])

    df = df.sort_values("datetimeLocal").reset_index(drop=True)

    logger.info(f"Dataset Shape: {df.shape}")

    return df


def prepare_features(df):
    """Prepare feature columns."""

    feature_cols = [
        c
        for c in df.columns
        if (
            "_lag" in c
            or "_roll" in c
            or "_sin" in c
            or "_cos" in c
            or "station_" in c
            or c
            in [
                "hour",
                "dayofweek",
                "month",
                "is_weekend",
            ]
        )
    ]

    logger.info(f"Feature Count: {len(feature_cols)}")

    X = df[feature_cols]

    return X, feature_cols


def split_dataset(df, X):
    """
    Time-based train/test split.

    Uses first 80% timestamps for training.
    """

    cutoff = df["datetimeLocal"].quantile(0.80)

    train = df[df["datetimeLocal"] <= cutoff]

    test = df[df["datetimeLocal"] > cutoff]

    logger.info(f"Training Rows : {len(train)}")
    logger.info(f"Testing Rows  : {len(test)}")

    X_train = train[X.columns]
    X_test = test[X.columns]

    y_train_reg = train["AQI"]
    y_test_reg = test["AQI"]

    return (
        train,
        test,
        X_train,
        X_test,
        y_train_reg,
        y_test_reg,
    )


def train_regressor(X_train, y_train):
    """Train AQI regression model."""

    logger.info("Training AQI Regressor...")

    reg = xgb.XGBRegressor(
        n_estimators=300,
        max_depth=5,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
    )

    reg.fit(X_train, y_train)

    logger.info("AQI Regressor Complete")

    return reg


def train_classifier(train, X_train):
    """Train AQI category classifier."""

    logger.info("Training AQI Classifier...")

    encoder = LabelEncoder()

    y_train = encoder.fit_transform(train["AQI_category"])

    clf = xgb.XGBClassifier(
        n_estimators=300,
        max_depth=5,
        learning_rate=0.05,
        subsample=0.8,
        colsample_bytree=0.8,
        random_state=42,
        eval_metric="mlogloss",
    )

    clf.fit(X_train, y_train)

    logger.info("AQI Classifier Complete")

    logger.info(f"Categories: {list(encoder.classes_)}")

    return clf, encoder


def save_models(
    reg,
    clf,
    encoder,
    feature_cols,
):
    """Save trained models."""

    logger.info("Saving models...")

    joblib.dump(reg, REGRESSOR_MODEL)

    joblib.dump(clf, CLASSIFIER_MODEL)

    joblib.dump(encoder, LABEL_ENCODER)

    joblib.dump(feature_cols, FEATURE_COLUMNS)

    logger.info("Models Saved")


def save_predictions(
    reg,
    clf,
    encoder,
    test,
    X_test,
):
    """Save predictions for evaluation."""

    logger.info("Generating test predictions...")

    reg_pred = reg.predict(X_test)

    cls_pred = clf.predict(X_test)

    out = test[
        [
            "location_name",
            "datetimeLocal",
            "AQI",
            "AQI_category",
        ]
    ].copy()

    out["AQI_pred"] = reg_pred

    out["AQI_error"] = out["AQI"] - out["AQI_pred"]

    out["AQI_category_pred"] = encoder.inverse_transform(cls_pred)

    out["AQI_correct"] = (out["AQI_category"] == out["AQI_category_pred"])

    output_file = (
        PROCESSED_DIR / "test_predictions.csv"
    )

    out.to_csv(output_file, index=False)

    logger.info(f"Saved predictions to {output_file}")


def main():

    logger.info("=" * 60)

    logger.info("Training Pipeline")

    logger.info("=" * 60)

    df = load_dataset()

    X, feature_cols = prepare_features(df)

    (
        train,
        test,
        X_train,
        X_test,
        y_train_reg,
        y_test_reg,
    ) = split_dataset(df, X)

    reg = train_regressor(
        X_train,
        y_train_reg,
    )

    clf, encoder = train_classifier(
        train,
        X_train,
    )

    save_models(
        reg,
        clf,
        encoder,
        feature_cols,
    )

    save_predictions(
        reg,
        clf,
        encoder,
        test,
        X_test,
    )

    logger.info("Training Pipeline Complete")

import sklearn
import xgboost

logger.info(f"Scikit-Learn : {sklearn.__version__}")
logger.info(f"XGBoost      : {xgboost.__version__}")


if __name__ == "__main__":

    main()