from fastapi import APIRouter, HTTPException

from app.services.attribution_service import (
    attribution_service,
)

router = APIRouter(
    prefix="/attribution",
    tags=["Attribution"],
)


@router.get("/global")
def global_importance():

    return attribution_service.get_global_importance()


@router.get("/station/{station}")
def station_history(
    station: str,
):

    try:

        return attribution_service.get_station_history(
            station
        )

    except Exception as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )


@router.get("/station/{station}/latest")
def latest_prediction(
    station: str,
):

    try:

        return attribution_service.get_latest_for_station(
            station
        )

    except Exception as e:

        raise HTTPException(
            status_code=404,
            detail=str(e),
        )