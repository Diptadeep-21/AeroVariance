from app.services.feature_engineering_service import (
    feature_engineering_service,
)
from app.services.forecast_service import (
    forecast_service,
)
from app.services.prediction_service import (
    prediction_service,
)
from app.services.evaluation_service import (
    evaluation_service,
)
from app.core.station_mapper import (
    normalize_station,
)
from app.services.shap_service import (
    shap_service,
)
from app.repositories.sensor_repository import (
    sensor_repository)


class PredictionPipelineService:

    def predict_station(
        self,
        station: str,
        save: bool = True,
    ):

        city = normalize_station(station)

        # Build features from the actual WBPCB station
        features = feature_engineering_service.build_features(
            station
        )

        print("\n========== FEATURE DEBUG ==========")
        print("Station:", city)

        for k in [
        "AQI_lag1",
        "AQI_lag3",
        "AQI_lag24",
        "AQI_roll6_mean",
        "pm25_lag1",
        "pm10_lag1",
        ]:
            print(f"{k}: {features.get(k)}")

        print("===================================\n")

        forecast = forecast_service.predict(
        features
        )

        print("Predicted AQI:", forecast["predicted_aqi"])
        print("Category:", forecast["category"])
        print("-----------------------------------")

        prediction = None
        evaluation = None
        explanation = None

        if save:

            prediction = prediction_service.save_prediction(
                station,
                city,
                forecast,
                features,
            )

            try:
                print("Calling SHAP service...")

                explanation = shap_service.generate_station(
                    station,
                    features,
                    forecast,
                )

                print("SHAP result:", explanation)

            except Exception as e:
                import traceback

                print("========== SHAP EXCEPTION ==========")
                traceback.print_exc()

                explanation = None

            print("Calling evaluation service...")

            evaluation = (
                evaluation_service.evaluate_station(
                    station
                )
            )

            print("Evaluation result:", evaluation)

        return {

            "features": features,

            "forecast": forecast,

            "prediction": prediction,

            "evaluation": evaluation,

            "explanation": explanation,
        }
    
    
    def generate_history(
    self,
    station,
    ):

        city = normalize_station(station)

        if "WBPCB" in station:
            readings = sensor_repository.get_recent_readings(
                station,
                limit=24,
            )
        else:
            readings = sensor_repository.get_recent_live(
                station,
                limit=24,
        )

        for i in range(len(readings)):

            features = feature_engineering_service.build_features(
            station,
            idx=i,
            )

            forecast = forecast_service.predict(
            features
            )   

            evaluation_service.save_history(
            station,
            city,
            readings[i],
            forecast,
            )

prediction_pipeline_service = (
    PredictionPipelineService()
)