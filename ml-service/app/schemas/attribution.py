from pydantic import BaseModel


class FeatureImpact(BaseModel):
    feature: str
    impact: float


class PredictionExplanation(BaseModel):
    station: str
    timestamp: str

    actual_aqi: float
    predicted_aqi: float
    prediction_error: float

    prediction_correct: bool

    top_features: list[FeatureImpact]


class FeatureImportance(BaseModel):
    feature: str
    importance: float