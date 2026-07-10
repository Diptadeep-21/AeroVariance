"""
Feature Preprocessor

Converts API payload into model-ready DataFrame.
"""

from typing import Dict

import pandas as pd

from app.core.model_loader import loader


class FeaturePreprocessor:

    def preprocess(
        self,
        payload: Dict,
    ) -> pd.DataFrame:

        feature_columns = loader.feature_columns

        if feature_columns is None:
            raise RuntimeError(
                "Models are not loaded. Call loader.load() first."
            )

        row = {}

        # Initialize all features
        for feature in feature_columns:
            row[feature] = 0

        # Copy incoming values
        for key, value in payload.items():
            if key in row:
                row[key] = value

        # One-hot station encoding
        station = payload.get("station")

        if station:

            for feature in feature_columns:
                if feature.startswith("station_"):
                    row[feature] = 0

            station_col = f"station_{station}"

            if station_col in row:
                row[station_col] = 1

        df = pd.DataFrame([row])

        return df[feature_columns]


preprocessor = FeaturePreprocessor()