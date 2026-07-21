"""
Simulation Service

Provides what-if AQI simulations.
"""

from copy import deepcopy

from app.services.forecast_service import forecast_service

from app.services.snapshot_service import (
    snapshot_service,
)


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
        station: str,
        traffic_change: float = 0,
        construction_change: float = 0,
        industry_change: float = 0,
    ):
        from app.repositories.location_history_repository import LocationHistoryRepository

        # Fallback for custom searched locations
        if "WBPCB" not in station:
            latest = LocationHistoryRepository.latest(station)
            if latest:
                snapshot = {
                    "AQI_lag1": float(latest.get("aqi", 60.0)),
                    "AQI_lag3": float(latest.get("aqi", 60.0)),
                    "AQI_lag24": float(latest.get("aqi", 60.0)),
                    "pm25_lag1": float(latest.get("pm25", 20.0)),
                    "pm10_lag1": float(latest.get("pm10", 40.0)),
                    "co_lag1": float(latest.get("co", 300.0)),
                    "no2_lag1": float(latest.get("no2", 15.0)),
                    "so2_lag1": float(latest.get("so2", 5.0)),
                    "o3_lag1": float(latest.get("o3", 25.0)),
                }
            else:
                snapshot = {
                    "AQI_lag1": 60.0, "AQI_lag3": 60.0, "AQI_lag24": 60.0,
                    "pm25_lag1": 20.0, "pm10_lag1": 40.0, "co_lag1": 300.0,
                    "no2_lag1": 15.0, "so2_lag1": 5.0, "o3_lag1": 25.0
                }
        else:
            snapshot = snapshot_service.build_snapshot(
                station
            )

        before = forecast_service.predict(
        snapshot
        )

        modified = self.apply_changes(
        snapshot,
        traffic_change,
        construction_change,
        industry_change,
        )

        after = forecast_service.predict(
        modified
        )

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

        "before":
            before["predicted_aqi"],

        "after":
            after["predicted_aqi"],

        "difference":
            difference,

        "percent_change":
            percent_change,
        }


simulation_service = SimulationService()