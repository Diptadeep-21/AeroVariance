from fastapi import APIRouter, HTTPException

from app.services.attribution_service import attribution_service

router = APIRouter(
    prefix="/attribution",
    tags=["Attribution"],
)


@router.get("/global")
def global_importance():
    return attribution_service.get_global_importance()


@router.get("/station/{station}")
def get_station_history(station: str):
    return attribution_service.get_station_history(station)


@router.get("/{index}")
def get_prediction(index: int):

    try:
        return attribution_service.get_by_index(index)

    except Exception as e:
        raise HTTPException(
            status_code=404,
            detail=str(e),
        )