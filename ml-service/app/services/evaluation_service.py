from datetime import datetime

from app.repositories.sensor_repository import (
    sensor_repository,
)
from app.repositories.prediction_repository import (
    prediction_repository,
)
from app.repositories.evaluation_repository import (
    evaluation_repository,
)
from app.core.station_mapper import normalize_station
from app.utils.mongo import serialize


class EvaluationService:

    def evaluate_station(
        self,
        station: str,
    ):

        city = normalize_station(station)

        pred = prediction_repository.latest(station)

        if station != city:
            actual = sensor_repository.get_latest_reading(station)
        else:
            actual = sensor_repository.get_latest_live(city)

        if pred is None or actual is None:
            return None

        observed = actual.get("AQI")
        if observed is None:
            observed = actual.get("aqi")

        predicted = pred["predicted_aqi"]

        latest = evaluation_repository.latest(station)

        if latest:

            latest_pred = round(float(latest["predicted_aqi"]), 2)
            latest_actual = round(float(latest["actual_aqi"]), 2)

            current_pred = round(float(predicted), 2)
            current_actual = round(float(observed), 2)

            if (
                latest_pred == current_pred
                and latest_actual == current_actual
            ):
                return serialize(latest)

        doc = {
            "station": station,
            "timestamp": datetime.utcnow(),
            "predicted_aqi": predicted,
            "actual_aqi": observed,
            "absolute_error": round(
                abs(predicted - observed),
                2,
            ),
        }

        evaluation_repository.save(doc)

        return serialize(doc)

    # ---------------- NEW ---------------- #

    def save_history(
        self,
        station: str,
        city: str,
        reading: dict,
        forecast: dict,
    ):

        ts = (
            reading.get("timestamp")
            or reading.get("datetimeLocal")
            or reading.get("datetimeUtc")
        )

        # Don't insert duplicate history
        if evaluation_repository.exists(
            station,
            ts,
        ):
            return

        actual = reading.get("AQI")
        if actual is None:
            actual = reading.get("aqi")

        if actual is None:
            return

        doc = {

            "station": station,

            "timestamp": ts,

            "predicted_aqi": forecast["predicted_aqi"],

            "actual_aqi": actual,

            "absolute_error": round(
                abs(
                    forecast["predicted_aqi"]
                    - actual
                ),
                2,
            ),
        }

        evaluation_repository.save(doc)


evaluation_service = EvaluationService()