"""
Citizen Advisory Service

Generates health advisories based on AQI.
"""

from typing import Dict


class AdvisoryService:

    def __init__(self):

        self.rules = {

            "Good": {
                "risk": "Low",
                "color": "#22c55e",
                "message": "Air quality is satisfactory.",
                "mask": False,
                "outdoor": "Safe",
            },

            "Satisfactory": {
                "risk": "Low",
                "color": "#84cc16",
                "message": "Acceptable air quality. Sensitive individuals should stay aware.",
                "mask": False,
                "outdoor": "Safe",
            },

            "Moderate": {
                "risk": "Medium",
                "color": "#facc15",
                "message": "Reduce prolonged outdoor activities.",
                "mask": False,
                "outdoor": "Limited",
            },

            "Poor": {
                "risk": "High",
                "color": "#f97316",
                "message": "Wear an N95 mask outdoors and avoid heavy exercise.",
                "mask": True,
                "outdoor": "Avoid",
            },

            "Very Poor": {
                "risk": "Very High",
                "color": "#dc2626",
                "message": "Stay indoors if possible. High health risk.",
                "mask": True,
                "outdoor": "Avoid",
            },
        }

    def get_advisory(
        self,
        category: str,
    ) -> Dict:

        return self.rules.get(
            category,
            {
                "risk": "Unknown",
                "color": "#6b7280",
                "message": "No advisory available.",
                "mask": False,
                "outdoor": "Unknown",
            },
        )


advisory_service = AdvisoryService()