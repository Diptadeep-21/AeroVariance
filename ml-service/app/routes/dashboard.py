from fastapi import APIRouter

from app.services.dashboard_service import (
    dashboard_service,
)

from app.schemas.dashboard import (
    DashboardResponse,
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"],
)


@router.post(
    "/",
    response_model=DashboardResponse,
)
def dashboard(payload: dict):

    station = payload.get("station", "")

    return dashboard_service.get_dashboard(
        station,
        payload,
    )