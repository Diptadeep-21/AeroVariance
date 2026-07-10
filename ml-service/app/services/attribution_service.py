"""
Attribution Service

Returns SHAP-based explanations.
"""

from app.core.model_loader import loader
from app.core.logger import logger


class AttributionService:

    def get_by_index(
        self,
        index: int,
    ):

        explanations = loader.local_explanations

        if explanations is None:
            raise RuntimeError(
                "Local explanations are not loaded."
            )

        if index < 0 or index >= len(explanations):
            raise IndexError(
                f"Index {index} out of range."
            )

        return explanations[index]

    def get_station_history(
        self,
        station: str,
    ):

        explanations = loader.local_explanations

        result = [
            item
            for item in explanations
            if item["station"] == station
        ]

        return result

    def get_global_importance(self):

        return loader.feature_importance


attribution_service = AttributionService()