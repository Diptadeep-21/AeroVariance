from pydantic import BaseModel


class LocationRequest(BaseModel):
    location: str