"""
Simulation Service

Provides what-if AQI simulations.
"""

from copy import deepcopy

from app.services.forecast_service import forecast_service


class SimulationService:

    def __init__(self):

        self.feature_mapping = {

            "traffic_change": [
                "no2_lag1",
                "no2_lag3",
                "co_lag1",
                "co_lag3",
            ],

            "construction_change": [
                "pm10_lag1",
                "pm10_lag3",
                "pm25_lag1",
                "pm25_lag3",
            ],

            "industry_change": [
                "so2_lag1",
                "so2_lag3",
                "co_lag1",
            ],
        }

    def apply_changes(
        self,
        payload: dict,
        traffic_change: float,
        construction_change: float,
        industry_change: float,
    ):

        features = deepcopy(payload)

        changes = {

            "traffic_change": traffic_change,

            "construction_change": construction_change,

            "industry_change": industry_change,
        }

        for intervention, percent in changes.items():

            affected = self.feature_mapping.get(
                intervention,
                [],
            )

            factor = 1 + (percent / 100)

            for feature in affected:

                if feature in features:

                    features[feature] *= factor

        return features

    def simulate(
        self,
        payload: dict,
        traffic_change: float = 0,
        construction_change: float = 0,
        industry_change: float = 0,
    ):

        before = forecast_service.predict(payload)

        modified = self.apply_changes(
            payload,
            traffic_change,
            construction_change,
            industry_change,
        )

        after = forecast_service.predict(modified)

        difference = round(
            after["predicted_aqi"] -
            before["predicted_aqi"],
            2,
        )

        percent_change = round(
            difference /
            before["predicted_aqi"] *
            100,
            2,
        )

        return {

            "before": before["predicted_aqi"],

            "after": after["predicted_aqi"],

            "difference": difference,

            "percent_change": percent_change,
        }


simulation_service = SimulationService()