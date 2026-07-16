"""
Station Service

Provides available monitoring stations.
"""

from pathlib import Path

import json


class StationService:

    def __init__(self):
        path = (
            Path(__file__).resolve().parents[2]
            / "outputs"
            / "shap"
            / "local_explanations.json"
        )

        with open(path, "r") as f:
            self.records = json.load(f)

        self.stations = sorted(
            {
                row["station"]
                for row in self.records
            }
        )

    def get_all(self):
        return self.stations


station_service = StationService()