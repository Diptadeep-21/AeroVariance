from pydantic import BaseModel

from app.schemas.forecast import ForecastResponse
from app.schemas.advisory import AdvisoryResponse
from app.schemas.attribution import PredictionExplanation


class DashboardResponse(BaseModel):
    station: str

    forecast: ForecastResponse

    advisory: AdvisoryResponse

    latest_prediction: PredictionExplanation