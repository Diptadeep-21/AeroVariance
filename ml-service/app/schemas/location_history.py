from pydantic import BaseModel
from datetime import datetime


class LocationHistory(BaseModel):
    location: str

    latitude: float

    longitude: float

    timestamp: datetime

    provider: str

    aqi: float

    category: str

    pm25: float

    pm10: float

    co: float

    no2: float

    so2: float

    o3: float