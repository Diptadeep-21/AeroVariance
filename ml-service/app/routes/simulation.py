from fastapi import APIRouter, HTTPException

from app.schemas.simulation import (
    SimulationRequest,
    SimulationResponse,
)

from app.services.simulation_service import (
    simulation_service,
)

router = APIRouter(
    prefix="/simulation",
    tags=["Simulation"],
)


@router.post(
    "/",
    response_model=SimulationResponse,
)
def simulate(
    request: SimulationRequest,
):

    try:

        payload = request.model_dump()

        result = simulation_service.simulate(
            payload=payload,
            traffic_change=payload["traffic_change"],
            construction_change=payload["construction_change"],
            industry_change=payload["industry_change"],
        )

        return result

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )