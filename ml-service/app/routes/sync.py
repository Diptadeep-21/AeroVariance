from fastapi import APIRouter

from app.services.city_sync_service import (
    city_sync_service,
)

router = APIRouter(
    prefix="/sync",
    tags=["Sync"],
)


@router.post("")
def sync():

    return city_sync_service.sync_all()