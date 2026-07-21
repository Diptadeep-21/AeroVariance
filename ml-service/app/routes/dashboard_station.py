from fastapi import APIRouter, Query

from app.services.station_dashboard_service import (
    station_dashboard_service,
)

router = APIRouter(
    prefix="/dashboard/station",
    tags=["Station Dashboard"],
)


@router.get("")
def dashboard(
    station: str = Query(...)
):
    return station_dashboard_service.get_dashboard(
        station
    )