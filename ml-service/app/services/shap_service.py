from datetime import datetime

from app.core.model_loader import loader
from app.core.preprocessor import preprocessor

from app.repositories.sensor_repository import (
    sensor_repository,
)

from app.repositories.shap_repository import (
    shap_repository,
)

from app.utils.mongo import serialize


class ShapService:

    def generate_station(
        self,
        station,
        features,
        forecast,
    ):

        print("STEP 1 - Entered generate_station")

        X = preprocessor.preprocess(features)

        print("STEP 2 - Preprocessing completed")

        print(X.dtypes)

        print("Object columns:",
          X.select_dtypes(include=["object"]).columns.tolist())

        print("STEP 3 - Calling SHAP explainer")

        exp = loader.explainer(X)

        print("STEP 4 - SHAP completed")

        vals = exp.values[0]

        impacts = []

        for i, feature in enumerate(
            loader.feature_columns
        ):

            impacts.append(

                {

                    "feature": feature,

                    "impact": round(
                        float(vals[i]),
                        3,
                    ),
                }

            )

        impacts.sort(

            key=lambda x: abs(
                x["impact"]
            ),

            reverse=True,
        )

        if "WBPCB" in station:
            latest = sensor_repository.latest(station)
        else:
            latest = sensor_repository.get_latest_live(station)

        actual = None
        err = None
        correct = None

        if latest:

            actual = latest.get("aqi") if latest.get("aqi") is not None else latest.get("AQI")

            if actual is not None:
                err = round(
                    abs(
                        forecast["predicted_aqi"]
                        - actual
                    ),
                    2,
                )
                correct = err <= 10

        doc = {

            "station": station,

            "timestamp": datetime.utcnow(),

            "actual_aqi": actual,

            "predicted_aqi":
                forecast["predicted_aqi"],

            "prediction_error": err,

            "prediction_correct": correct,

            "top_features": impacts[:5],
        }

        latest = shap_repository.get_latest(station)

        if latest and latest["predicted_aqi"] == forecast["predicted_aqi"]:
            return serialize(latest)

        shap_repository.save(doc)

        return serialize(doc)


shap_service = ShapService()