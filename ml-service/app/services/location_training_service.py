import json
from pathlib import Path

import joblib
import xgboost as xgb
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)

from app.services.location_dataset_service import (
    location_dataset_service,
)

from app.services.location_feature_service import (
    location_feature_service,
)

from app.repositories.model_repository import (
    model_repository,
)


class LocationTrainingService:

    MIN_ROWS = 50

    MODEL_DIR = Path("models")

    def __init__(self):

        self.MODEL_DIR.mkdir(
            exist_ok=True
        )

    def train(
        self,
        location: str,
    ):

        df = (
            location_dataset_service
            .build_dataset(location)
        )

        if df is None or df.empty:

            return {
                "success": False,
                "message": "No history found."
            }

        df = (
            location_feature_service
            .create_features(df)
        )

        df = (
            df
            .dropna()
            .reset_index(drop=True)
        )

        if len(df) < self.MIN_ROWS:

            return {
                "success": False,
                "message": (
                    f"Need at least "
                    f"{self.MIN_ROWS} observations."
                ),
                "current_rows": len(df),
            }

        feature_cols = [

            "aqi_lag1",
            "aqi_lag2",
            "aqi_lag3",

            "aqi_roll3_mean",
            "aqi_roll6_mean",
            "aqi_roll6_std",

            "hour",
            "day",
            "month",
            "weekday",
        ]

        cutoff = (
            df["timestamp"]
            .quantile(0.80)
        )

        train = df[
            df["timestamp"] <= cutoff
        ]

        test = df[
            df["timestamp"] > cutoff
        ]

        X_train = train[
            feature_cols
        ]

        X_test = test[
            feature_cols
        ]

        y_train = train["aqi"]

        y_test = test["aqi"]

        model = xgb.XGBRegressor(

            n_estimators=300,

            max_depth=5,

            learning_rate=0.05,

            subsample=0.8,

            colsample_bytree=0.8,

            random_state=42,
        )

        model.fit(
            X_train,
            y_train,
        )

        pred = model.predict(
            X_test
        )

        metrics = {

            "mae": float(
                mean_absolute_error(
                    y_test,
                    pred,
                )
            ),

            "rmse": float(
                mean_squared_error(
                    y_test,
                    pred,
                    squared=False,
                )
            ),

            "r2": float(
                r2_score(
                    y_test,
                    pred,
                )
            ),
        }

        model_path = (
            self.MODEL_DIR /
            f"{location.lower()}_regressor.joblib"
        )

        feature_path = (
            self.MODEL_DIR /
            f"{location.lower()}_features.joblib"
        )

        metric_path = (
            self.MODEL_DIR /
            f"{location.lower()}_metrics.json"
        )

        joblib.dump(
            model,
            model_path,
        )

        joblib.dump(
            feature_cols,
            feature_path,
        )


        model_repository.save(

        location=location,

        model_name=f"{location.lower()}_regressor.joblib",

        rows=len(df),

        metrics=metrics,

        feature_count=len(feature_cols),
)

        with open(
            metric_path,
            "w",
        ) as f:

            json.dump(
                metrics,
                f,
                indent=4,
            )

        return {

            "success": True,

            "location": location,

            "rows": len(df),

            "model": str(model_path),

            "metrics": metrics,
        }


location_training_service = (
    LocationTrainingService()
)