from pymongo import DESCENDING

from app.core.mongodb import db


class EvaluationRepository:

    def __init__(self):
        self.collection = db["evaluations"]

    def save(self, doc):
        self.collection.insert_one(doc)

    def latest(self, station):
        return self.collection.find_one(
            {"station": station},
            sort=[("timestamp", DESCENDING)],
        )

    def history(self, station, limit=100):
        return list(
            self.collection.find(
                {"station": station}
            ).sort(
                "timestamp",
                DESCENDING,
            ).limit(limit)
        )
    
    def exists(self, station, timestamp):

        return self.collection.find_one({
        "station": station,
        "timestamp": timestamp,
        })


    def count(self, station):

        return self.collection.count_documents({
        "station": station,
        })


evaluation_repository = EvaluationRepository()