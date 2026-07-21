from datetime import datetime

from app.repositories.prediction_repository import (
    prediction_repository,
)
from app.core.station_mapper import normalize_station

class PredictionService:

    def save_prediction(
        self,
        station: str,
        city: str,
        forecast: dict,
        features: dict,
    ):

        document = {

            "station": station,
            "city": city,
            

            "timestamp": datetime.utcnow(),

            "predicted_aqi": forecast["predicted_aqi"],

            "category": forecast["category"],

            "confidence": forecast["confidence"],

            "features": features,

            "model_version": "1.0.0",
}

        prediction_repository.save(document)

        return prediction_repository.latest(station)


prediction_service = PredictionService()