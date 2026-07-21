from fastapi import APIRouter

from app.services.config_service import (
    config_service,
)

router = APIRouter(
    prefix="/config",
    tags=["Configuration"],
)


@router.get("")
def config():

    return config_service.get_config()