"""
Attribution Service

Provides SHAP-based explanations
from MongoDB.
"""

from app.repositories.shap_repository import (
    shap_repository,
)

from app.core.model_loader import loader

from app.core.station_mapper import normalize_station


class AttributionService:

    def get_latest_for_station(
    self,
    station: str,
    ):

        explanation = (
        shap_repository.get_latest(station)
        )

        if explanation is None:
            return None

        explanation.pop("_id", None)

        return explanation

    def get_station_history(
    self,
    station: str,
    ):

        history = (
            shap_repository.get_history(station)
        )

        for item in history:
            item.pop("_id", None)

        return history

    def get_global_importance(self):
        """
        Returns the global feature importance
        learned by the trained model.
        """

        return loader.feature_importance


attribution_service = AttributionService()