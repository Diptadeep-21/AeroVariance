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
    "",
    response_model=SimulationResponse,
)
@router.post(
    "/",
    response_model=SimulationResponse,
)
def simulate(
    request: SimulationRequest,
):

    try:

        return simulation_service.simulate(
            station=request.station,
            traffic_change=request.traffic_change,
            construction_change=request.construction_change,
            industry_change=request.industry_change,
        )

    except Exception as e:

        raise HTTPException(
            status_code=500,
            detail=str(e),
        )