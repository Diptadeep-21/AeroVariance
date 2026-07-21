from datetime import datetime
from typing import Optional

from pydantic import BaseModel


class DashboardRequest(BaseModel):
    station: str


class LatestReading(BaseModel):
    timestamp: datetime

    aqi: float

    pm25: float

    pm10: Optional[float] = None

    co: Optional[float] = None

    no2: Optional[float] = None

    so2: Optional[float] = None

    o3: Optional[float] = None


class DashboardResponse(BaseModel):

    station: str

    latest_reading: LatestReading

    forecast: dict

    advisory: dict

    latest_prediction: Optional[dict] = None