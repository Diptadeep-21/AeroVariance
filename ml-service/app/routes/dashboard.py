from typing import Literal

from fastapi import APIRouter, Query

from app.services.station_dashboard_service import (
    station_dashboard_service,
)

from app.services.location_dashboard_service import (
    dashboard_service as location_dashboard_service,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.get("")
def dashboard(
    mode: Literal["station", "location"] = Query("station"),
    station: str | None = Query(None),
    location: str | None = Query(None),
):
    if mode == "station":
        selected_station = station or "Rabindra Sarobar, Kolkata - WBPCB"
        return station_dashboard_service.get_dashboard(selected_station)

    return location_dashboard_service.get_dashboard(location)