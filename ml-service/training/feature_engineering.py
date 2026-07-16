"""
Feature Engineering Pipeline

Creates ML-ready features from the cleaned AQI dataset.
"""

import logging

import numpy as np
import pandas as pd

from config import PROCESSED_DIR


logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s"
)

logger = logging.getLogger(__name__)


INPUT_FILE = PROCESSED_DIR / "aqi_hourly_clean.csv"
OUTPUT_FILE = PROCESSED_DIR / "features.csv"

POLLUTANTS = [
    "co",
    "no2",
    "o3",
    "pm10",
    "pm25",
    "so2"
]


def load_dataset():

    logger.info("Loading dataset...")

    df = pd.read_csv(INPUT_FILE)

    df["datetimeLocal"] = pd.to_datetime(df["datetimeLocal"])

    df = (
        df.sort_values(
            ["location_name", "datetimeLocal"]
        )
        .reset_index(drop=True)
    )

    logger.info(f"Loaded {len(df)} rows")

    return df


def create_time_features(df):

    logger.info("Creating time features...")

    df["hour"] = df["datetimeLocal"].dt.hour

    df["dayofweek"] = df["datetimeLocal"].dt.dayofweek

    df["month"] = df["datetimeLocal"].dt.month

    df["is_weekend"] = (
        df["dayofweek"] >= 5
    ).astype(int)

    df["hour_sin"] = np.sin(
        2 * np.pi * df["hour"] / 24
    )

    df["hour_cos"] = np.cos(
        2 * np.pi * df["hour"] / 24
    )

    df["doy_sin"] = np.sin(
        2 * np.pi * df["dayofweek"] / 7
    )

    df["doy_cos"] = np.cos(
        2 * np.pi * df["dayofweek"] / 7
    )

    return df


def add_lag_features(group):

    group = (
        group.sort_values("datetimeLocal")
        .copy()
    )

    for col in POLLUTANTS + ["AQI"]:

        group[f"{col}_lag1"] = group[col].shift(1)

        group[f"{col}_lag3"] = group[col].shift(3)

        group[f"{col}_lag24"] = group[col].shift(24)

        group[f"{col}_roll6_mean"] = (
            group[col]
            .rolling(
                6,
                min_periods=3
            )
            .mean()
            .shift(1)
        )

    return group


def create_lag_features(df):

    logger.info("Creating lag features...")

    parts = []

    for _, group in df.groupby("location_name"):

        parts.append(
            add_lag_features(group)
        )

    df = (
        pd.concat(parts)
        .sort_values(
            ["location_name", "datetimeLocal"]
        )
        .reset_index(drop=True)
    )

    return df


def encode_stations(df):

    logger.info("Encoding station names...")

    station_dummies = pd.get_dummies(
        df["location_name"],
        prefix="station"
    ).astype(int)

    df = pd.concat(
        [df, station_dummies],
        axis=1
    )

    return df


def build_training_dataframe(df):

    logger.info("Preparing training dataset...")

    feature_columns = [

        c

        for c in df.columns

        if (
            "_lag" in c
            or "_roll" in c
            or "_sin" in c
            or "_cos" in c
            or "station_" in c
            or c in [
                "hour",
                "dayofweek",
                "month",
                "is_weekend",
            ]
        )

    ]

    df_model = (
        df
        .dropna(
            subset=feature_columns + ["AQI"]
        )
        .reset_index(drop=True)
    )

    logger.info(
        f"Generated {len(feature_columns)} features"
    )

    logger.info(
        f"Training rows: {len(df_model)}"
    )

    return df_model, feature_columns


def save_dataset(df):

    df.to_csv(
        OUTPUT_FILE,
        index=False
    )

    logger.info(
        f"Saved dataset to {OUTPUT_FILE}"
    )


def main():

    logger.info(
        "=" * 50
    )

    logger.info(
        "Feature Engineering Pipeline"
    )

    logger.info(
        "=" * 50
    )

    df = load_dataset()

    df = create_time_features(df)

    df = create_lag_features(df)

    df = encode_stations(df)

    df_model, feature_columns = (
        build_training_dataframe(df)
    )

    save_dataset(df_model)

    logger.info("Pipeline Complete")


if __name__ == "__main__":

    main()