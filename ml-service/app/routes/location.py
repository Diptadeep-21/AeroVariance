from fastapi import APIRouter

from app.services.location_service import (
    location_service,
)

router = APIRouter(
    prefix="/location",
    tags=["Location"],
)


@router.get("")
def search(location: str):

    return location_service.get_live_reading(
        location
    )


@router.get("/history")
def history(
    location: str,
    limit: int = 100,
):

    return location_service.get_history(
        location,
        limit,
    )