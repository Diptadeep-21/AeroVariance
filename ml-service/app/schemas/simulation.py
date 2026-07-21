from pydantic import BaseModel


class SimulationRequest(BaseModel):

    station: str

    traffic_change: float = 0

    construction_change: float = 0

    industry_change: float = 0


class SimulationResponse(BaseModel):

    before: float

    after: float

    difference: float

    percent_change: float