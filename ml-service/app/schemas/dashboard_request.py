from pydantic import BaseModel


class DashboardRequest(BaseModel):
    station: str