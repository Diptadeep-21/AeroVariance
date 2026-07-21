from fastapi import APIRouter, HTTPException

from app.repositories.model_repository import (
    model_repository,
)

from app.repositories.location_history_repository import (
    LocationHistoryRepository,
)

from app.services.location_training_service import (
    location_training_service,
)

router = APIRouter(
    prefix="/models",
    tags=["Models"],
)


@router.get("")
def get_models():

    return {
        "count": len(
            model_repository.all_models()
        ),
        "models": model_repository.all_models(),
    }


@router.get("/{location}")
def get_model(
    location: str,
):

    model = model_repository.get(
        location
    )

    if model is None:

        raise HTTPException(
            status_code=404,
            detail="Model not found.",
        )

    return model


@router.post("/train/{location}")
def train_location(
    location: str,
):

    result = (
        location_training_service.train(
            location
        )
    )

    return result


@router.post("/train-all")
def train_all():

    locations = (
        LocationHistoryRepository
        .get_all_tracked_locations()
    )

    results = []

    for place in locations:

        try:

            result = (
                location_training_service.train(
                    place["location"]
                )
            )

            results.append(
                {
                    "location": place["location"],
                    "result": result,
                }
            )

        except Exception as e:

            results.append(
                {
                    "location": place["location"],
                    "error": str(e),
                }
            )

    return {
        "count": len(results),
        "results": results,
    }