from app.core.config import (
    SYNC_INTERVAL_MINUTES,
)

from app.core.cities import CITIES


class ConfigService:

    def get_config(self):

        return {

            "version": "1.0.0",

            "scheduler": {
                "interval_minutes": SYNC_INTERVAL_MINUTES,
            },

            "stations": list(CITIES.keys()),

            "supported_languages": [
                "en",
                "hi",
                "bn",
                "ta",
                "te",
            ],

            "model": {
                "type": "Random Forest",
                "prediction": "AQI",
            },
        }


config_service = ConfigService()