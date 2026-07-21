from datetime import datetime

from app.core.mongodb import db


class ModelRepository:

    COLLECTION = "trained_models"

    @classmethod
    def save(
        cls,
        location,
        model_name,
        rows,
        metrics,
        feature_count,
    ):

        db[
            cls.COLLECTION
        ].update_one(

            {
                "location": location
            },

            {
                "$set": {

                    "location": location,

                    "model": model_name,

                    "trained_at": datetime.utcnow(),

                    "rows_used": rows,

                    "feature_count": feature_count,

                    "metrics": metrics,
                }
            },

            upsert=True,
        )

    @classmethod
    def get(
        cls,
        location,
    ):

        doc = db[
            cls.COLLECTION
        ].find_one(
            {
                "location": location
            }
        )

        if doc:
            doc.pop("_id", None)

        return doc

    @classmethod
    def all_models(
        cls,
    ):

        rows = list(
            db[
                cls.COLLECTION
            ].find({})
        )

        for row in rows:
            row.pop("_id", None)

        return rows


model_repository = ModelRepository()