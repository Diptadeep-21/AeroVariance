from typing import List
from pydantic import BaseModel


class FeatureImpact(BaseModel):

    feature: str

    impact: float


class AttributionResponse(BaseModel):

    station: str

    timestamp: str

    actual_aqi: float

    predicted_aqi: float

    prediction_error: float

    prediction_correct: bool

    top_features: List[FeatureImpact]