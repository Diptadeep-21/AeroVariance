from fastapi import APIRouter

from app.services.health_service import (
    health_service,
)

router = APIRouter(
    prefix="/health",
    tags=["Health"],
)


@router.get("")
def health():

    return health_service.status()