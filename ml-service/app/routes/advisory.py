from fastapi import APIRouter

from app.services.advisory_service import (
    advisory_service,
)

router = APIRouter(
    prefix="/advisory",
    tags=["Advisory"],
)


@router.get("/{category}")
def advisory(
    category: str,
):

    return advisory_service.get_advisory(
        category
    )