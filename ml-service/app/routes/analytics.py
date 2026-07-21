from fastapi import APIRouter

from app.repositories.sensor_repository import (
    sensor_repository,
)

from app.repositories.prediction_repository import (
    prediction_repository,
)

from app.repositories.evaluation_repository import (
    evaluation_repository,
)

from app.services.model_evaluation_service import (
    model_evaluation_service,
)

from app.utils.mongo import serialize

from app.core.station_mapper import normalize_station


router = APIRouter(
    prefix="/analytics",
    tags=["Analytics"],
)


@router.get("/model")
def model_metrics():

    return model_evaluation_service.get_metrics()


@router.get("/{station}")
def analytics(station: str):

    city = normalize_station(station)

    is_wbpcb = station != city

    if is_wbpcb:

        readings = sensor_repository.get_recent_readings(
            station,
            limit=24,
        )

        predictions = prediction_repository.history(
            station,
            limit=24,
        )

        evaluations = evaluation_repository.history(
            station,
            limit=24,
        )

    else:

        readings = sensor_repository.get_recent_live(
            city,
            limit=24,
        )

        predictions = prediction_repository.history(
            city,
            limit=24,
        )

        evaluations = evaluation_repository.history(
            city,
            limit=24,
        )

    return {
        "station": station,
        "city": city,
        "sensor_readings": serialize(readings),
        "predictions": serialize(predictions),
        "evaluations": serialize(evaluations),
    }