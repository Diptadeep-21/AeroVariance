from pathlib import Path

import joblib
import pandas as pd

from app.core.logger import logger
from app.core.station_mapper import normalize_station

from app.services.location_dataset_service import (
    location_dataset_service,
)

from app.services.location_feature_service import (
    location_feature_service,
)


class ForecastService:

    MODEL_DIR = Path("models")

    def predict(self, features):

        model = joblib.load(
            self.MODEL_DIR / "aqi_regressor.joblib"
        )

        feature_cols = joblib.load(
            self.MODEL_DIR / "feature_columns.joblib"
        )

        row = {}

        for col in feature_cols:
            val = features.get(col, 0)
            try:
                row[col] = 0.0 if (val is None or pd.isna(val)) else float(val)
            except Exception:
                row[col] = 0.0

        X = pd.DataFrame([row]).astype(float)

        pred = float(model.predict(X)[0])

        if pred <= 50:
            cat = "Good"
        elif pred <= 100:
            cat = "Moderate"
        elif pred <= 150:
            cat = "Unhealthy for Sensitive Groups"
        elif pred <= 200:
            cat = "Unhealthy"
        elif pred <= 300:
            cat = "Very Unhealthy"
        else:
            cat = "Hazardous"

        return {
            "predicted_aqi": round(pred, 2),
            "category": cat,
            "confidence": 0.95,
        }

    def forecast(
        self,
        location: str,
    ):
        """
        Existing endpoint.
        Leave unchanged.
        """

        model_path = (
            self.MODEL_DIR /
            f"{location.lower()}_regressor.joblib"
        )

        feature_path = (
            self.MODEL_DIR /
            f"{location.lower()}_features.joblib"
        )

        is_global_fallback = False
        if not model_path.exists():
            logger.info(
                f"No dedicated model found for {location}. Using global regressor fallback."
            )
            model_path = self.MODEL_DIR / "aqi_regressor.joblib"
            feature_path = self.MODEL_DIR / "feature_columns.joblib"
            if not model_path.exists():
                return None
            is_global_fallback = True

        model = joblib.load(model_path)

        feature_cols = joblib.load(feature_path)

        df = (
            location_dataset_service
            .build_dataset(location)
        )

        if df is None or df.empty:
            return None

        df = (
            location_feature_service
            .create_features(df)
        )

        df_clean = df.dropna().reset_index(drop=True)

        if df_clean.empty:
            # If not enough history to dropna, fallback to ffill/bfill to get a valid prediction row
            df_clean = df.ffill().bfill().fillna(0.0).reset_index(drop=True)
            if df_clean.empty:
                return None

        latest = df_clean.iloc[-1]

        row = {}
        for col in feature_cols:
            val = latest.get(col, 0.0)
            try:
                row[col] = 0.0 if (val is None or pd.isna(val)) else float(val)
            except Exception:
                row[col] = 0.0

        X = pd.DataFrame([row]).astype(float)

        pred = float(
            model.predict(X)[0]
        )

        return {
            "location": location,
            "predicted_aqi": round(pred, 2),
            "based_on_records": len(df),
            "model_available": True,
        }


forecast_service = ForecastService()