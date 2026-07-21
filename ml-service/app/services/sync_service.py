from app.clients.openweather_client import (
    openweather_client,
)

from app.services.normalization_service import (
    normalization_service,
)

from app.repositories.sensor_repository import (
    sensor_repository,
)
from app.services.prediction_pipeline_service import (
    prediction_pipeline_service,
)
from app.core.logger import logger

class SyncService:

    def sync_station(
        self,
        station: str,
        latitude: float,
        longitude: float,
    ):

        response = openweather_client.get_air_quality(
            latitude,
            longitude,
        )

        document = normalization_service.normalize_openweather(
            station=station,
            latitude=latitude,
            longitude=longitude,
            response=response,
        )

        existing = sensor_repository.exists_latest(
            station,
            document["timestamp"],
        )

        if existing:
            return {
                "station": station,
                "status": "skipped",
                "reason": "Reading already exists",
            }

        sensor_repository.insert(document)

        # Generate prediction, SHAP explanation and evaluation
        try:
            prediction_pipeline_service.predict_station(
                station,
                save=True,
            )
        except Exception as e:
            logger.exception(
                f"Prediction pipeline failed for {station}: {e}"
            )

        return {
            "station": station,
            "status": "success",
            "reading": document,
        }


sync_service = SyncService()