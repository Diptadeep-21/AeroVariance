from fastapi import APIRouter, HTTPException, Query

from app.services.forecast_service import (
    forecast_service,
)

router = APIRouter(
    prefix="/forecast",
    tags=["Forecast"],
)


@router.get("")
def get_forecast(
    location: str = Query(
        ...,
        description="Location name",
        example="Chennai",
    ),
):

    result = forecast_service.forecast(
        location
    )

    if result is None:

        raise HTTPException(
            status_code=404,
            detail=(
                f"No trained model available for '{location}'."
            ),
        )

    return result