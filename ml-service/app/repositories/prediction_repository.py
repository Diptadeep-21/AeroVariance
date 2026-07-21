from pymongo import DESCENDING

from app.core.mongodb import db

from app.utils.mongo import serialize


class PredictionRepository:

    def __init__(self):

        self.collection = db["predictions"]

    def save(self, document):

        self.collection.insert_one(document)

    def latest(
        self,
        station: str,
    ):

        return self.collection.find_one(

            {
                "station": station,
            },

            sort=[
                (
                    "timestamp",
                    DESCENDING,
                )
            ],
        )

    def history(
        self,
        station: str,
        limit: int = 100,
    ):

        return list(

            self.collection.find(

                {
                    "station": station,
                }

            ).sort(

                "timestamp",

                DESCENDING,

            ).limit(limit)

        )
    def latest(self, station):

        doc = self.collection.find_one(
            {"station": station},
            sort=[("timestamp", DESCENDING)]
        )

        return serialize(doc)

    def history(self, station, limit=100):

        docs = list(
            self.collection.find(
                {"station": station}
            ).sort(
                "timestamp",
                DESCENDING
            ).limit(limit)
        )

        return serialize(docs)

    def history_by_feature_station(
    self,
    station,
    limit=100,
    ):

        docs = list(

            self.collection.find(

                {
                    "features.station": station
                }

            ).sort(

                "timestamp",
                DESCENDING,

            ).limit(limit)

        )

        return serialize(docs)

prediction_repository = PredictionRepository()