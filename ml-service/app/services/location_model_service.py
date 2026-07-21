from pathlib import Path

import joblib
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import (
    mean_absolute_error,
    mean_squared_error,
    r2_score,
)


class LocationModelService:

    MODEL_DIR = Path("models")

    def __init__(self):

        self.MODEL_DIR.mkdir(
            exist_ok=True
        )

    def train(
        self,
        x_train,
        y_train,
    ):

        model = RandomForestRegressor(
            n_estimators=200,
            random_state=42,
        )

        model.fit(
            x_train,
            y_train,
        )

        return model

    def evaluate(
        self,
        model,
        x_test,
        y_test,
    ):

        pred = model.predict(
            x_test
        )

        return {
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

    def save(
        self,
        location,
        model,
    ):

        path = (
            self.MODEL_DIR /
            f"{location.lower()}.joblib"
        )

        joblib.dump(
            model,
            path,
        )

        return str(path)

    def load(
        self,
        location,
    ):

        path = (
            self.MODEL_DIR /
            f"{location.lower()}.joblib"
        )

        if not path.exists():

            return None

        return joblib.load(path)


location_model_service = (
    LocationModelService()
)