from datetime import datetime

from app.core.mongodb import db


class ForecastRepository:

    def __init__(self):

        self.collection = db["forecast_predictions"]

    def save_prediction(
        self,
        station: str,
        forecast: dict,
    ):

        doc = {

            "station": station,

            "timestamp": datetime.utcnow(),

            **forecast,
        }

        self.collection.insert_one(doc)

    def get_latest(
        self,
        station: str,
    ):

        return self.collection.find_one(

            {
                "station": station,
            },

            sort=[("timestamp", -1)],

        )


forecast_repository = ForecastRepository()