from datetime import datetime
from typing import List

from app.core.mongodb import db
from app.schemas.location_history import LocationHistory


class LocationHistoryRepository:

    COLLECTION = "location_history"

    TRACKED_COLLECTION = "tracked_locations"

    @classmethod
    def save(
        cls,
        history: LocationHistory
    ):
        
        print("Repository save()")

        print(history.model_dump()) 

        db[cls.COLLECTION].insert_one(
            history.model_dump()
        )

        print("Inserted successfully")

    @classmethod
    def latest(
        cls,
        location: str,
    ):
        doc = db[cls.COLLECTION].find_one(
            {"location": location},
            sort=[("timestamp", -1)]
        )

        if doc:
            doc.pop("_id", None)

        return doc

    @classmethod
    def count(
        cls,
        location: str,
    ) -> int:

        return db[
            cls.COLLECTION
        ].count_documents(
            {
                "location": location
            }
        )

    @classmethod
    def history(
        cls,
        location: str,
        limit: int = 500,
    ) -> List[dict]:

        cursor = (
            db[cls.COLLECTION]
            .find({"location": location})
            .sort("timestamp", 1)
            .limit(limit)
        )

        rows = list(cursor)

        for row in rows:
            row.pop("_id", None)

        return rows

        print(f"History rows for {location}: {len(rows)}")

        return rows

    @classmethod
    def track_location(
        cls,
        location: str,
        latitude: float,
        longitude: float,
    ):

        db[
            cls.TRACKED_COLLECTION
        ].update_one(
            {
                "location": location
            },
            {
                "$setOnInsert": {
                    "location": location,
                    "latitude": latitude,
                    "longitude": longitude,
                    "created_at": datetime.utcnow()
                }
            },
            upsert=True
        )

    @classmethod
    def tracked_locations(
        cls,
    ):

        rows = list(
            db[cls.TRACKED_COLLECTION].find({})
        )

        for row in rows:
            row.pop("_id", None)

        return rows
    
    @classmethod
    def get_all_tracked_locations(cls):

        rows = list(
            db[
                cls.TRACKED_COLLECTION
            ].find({})
        )

        for row in rows:
            row.pop("_id", None)

        return rows