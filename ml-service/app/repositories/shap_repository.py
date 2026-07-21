from pymongo import DESCENDING

from app.core.mongodb import db

from app.utils.mongo import serialize


class ShapRepository:

    def __init__(self):
        self.collection = db["shap_explanations"]

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

    def get_history(
        self,
        station: str,
    ):
        return list(
            self.collection.find(
                {
                    "station": station,
                }
            ).sort(
                "timestamp",
                -1,
            )
        )

    def get_by_index(
        self,
        station: str,
        index: int,
    ):
        docs = list(
            self.collection.find(
                {
                    "station": station,
                }
            ).sort(
                "timestamp",
                -1,
            )
        )

        if index >= len(docs):
            return None

        return docs[index]
    
    def latest(self, station):

        doc = self.collection.find_one(
        {"station": station},
        sort=[("timestamp", DESCENDING)],
    )

        return serialize(doc)
    
    def history(self, station, limit=100):

        docs = list(

        self.collection.find(
            {"station": station}
        ).sort(
            "timestamp",
            DESCENDING,
        ).limit(limit)

    )

        return serialize(docs)
    
    def save(
        self,
        doc,
    ):

        self.collection.insert_one(
            doc
        )


shap_repository = ShapRepository()