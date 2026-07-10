from fastapi import APIRouter, HTTPException

from app.schemas.forecast import (
    ForecastRequest,
    ForecastResponse,
)

from app.services.forecast_service import (
    forecast_service,
)

router = APIRouter(
    prefix="/forecast",
    tags=["Forecast"],
)


@router.post(
    "/",
    response_model=ForecastResponse,
)
def predict_forecast(
    request: ForecastRequest,
):

    try:

        result = forecast_service.predict(
            request.model_dump()
        )

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )