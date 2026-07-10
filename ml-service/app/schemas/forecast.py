from pydantic import BaseModel
from typing import Optional


class ForecastRequest(BaseModel):

    station: Optional[str] = None

    AQI_lag1: float

    AQI_lag3: float

    AQI_lag24: float

    pm25_lag1: float

    pm10_lag1: float

    hour: int = 12

    dayofweek: int = 0

    month: int = 1


class ForecastResponse(BaseModel):

    predicted_aqi: float

    category: str

    confidence: float