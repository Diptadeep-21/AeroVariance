from sklearn import pipeline

from app.repositories.sensor_repository import (
    sensor_repository,
)

from app.repositories.prediction_repository import (
    prediction_repository,
)

from app.services.attribution_service import (
    attribution_service,
)

from app.services.advisory_service import (
    advisory_service,
)

from app.services.prediction_pipeline_service import (
    prediction_pipeline_service,
)

from app.core.station_mapper import (
    normalize_station,
)

import json
from app.utils.mongo import serialize

from app.repositories.evaluation_repository import (
    evaluation_repository,
)


class StationDashboardService:

    def get_dashboard(
        self,
        station: str,
    ):

        city = normalize_station(station)

        # Trigger live sync for the station to get fresh real-time AQI and weather data!
        try:
            from app.core.cities import CITIES
            from app.services.sync_service import sync_service

            coords = CITIES.get(city) or CITIES.get(station)
            if coords:
                sync_service.sync_station(
                    station=station,
                    latitude=coords["latitude"],
                    longitude=coords["longitude"],
                )
        except Exception as sync_err:
            print(f"Station live sync notice: {sync_err}")

        # Latest reading after live sync
        latest = sensor_repository.latest(station)

        try:

            print(f"\nRunning prediction pipeline for {station}")

            if (
                evaluation_repository.count(station)
                < 24
            ):
                prediction_pipeline_service.generate_history(
                station
                )

            pipeline = prediction_pipeline_service.predict_station(
            station,
            save=True,
            )

            forecast = pipeline["prediction"]

            latest_prediction = (
            pipeline["explanation"]
            if pipeline["explanation"] is not None
            else pipeline["prediction"]
            )

        except Exception as e:

            print(f"Prediction pipeline failed: {e}")

            forecast = prediction_repository.latest(station)

            latest_prediction = attribution_service.get_latest_for_station(
            station
            )

        advisory = None

        if forecast and forecast.get("category"):

            advisory = advisory_service.get_advisory(
                forecast["category"]
            )

        parts = {
            "latest_reading": latest,
            "forecast": forecast,
            "latest_prediction": latest_prediction,
            "advisory": advisory,
        }

        for name, value in parts.items():
            try:
                json.dumps(value, allow_nan=False)
                print(f"{name}: OK")
            except Exception as e:
                print(f"{name}: FAILED -> {e}")

            print(value)

        return {
            "station": station,
            "latest_reading": latest,
            "forecast": forecast,
            "latest_prediction": latest_prediction,
            "advisory": advisory,
        }


station_dashboard_service = StationDashboardService()