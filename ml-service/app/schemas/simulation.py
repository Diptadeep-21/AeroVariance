from pydantic import BaseModel


class SimulationRequest(BaseModel):

    station: str | None = None

    AQI_lag1: float
    AQI_lag3: float
    AQI_lag24: float

    pm25_lag1: float
    pm10_lag1: float

    no2_lag1: float
    co_lag1: float
    so2_lag1: float

    traffic_change: float = 0
    construction_change: float = 0
    industry_change: float = 0


class SimulationResponse(BaseModel):

    before: float

    after: float

    difference: float

    percent_change: float