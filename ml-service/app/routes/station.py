from fastapi import APIRouter

from app.services.station_service import (
    station_service,
)

router = APIRouter(
    prefix="/stations",
    tags=["Stations"],
)


@router.get("")
def get_stations():

    return station_service.get_all()