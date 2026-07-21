from pymongo import DESCENDING
import math

from app.core.mongodb import db
from app.utils.mongo import serialize


class SensorRepository:

    def __init__(self):
        self.collection = db["sensor_readings"]

    def _clean(self, value):
        if isinstance(value, float):
            if math.isnan(value) or math.isinf(value):
                return None
        return value

    # ==========================
    # Historical Dataset Methods
    # ==========================

    def get_latest_reading(self, station: str):
        return self.collection.find_one(
            {"location_name": station},
            sort=[("datetimeLocal", DESCENDING)],
        )

    def get_recent_readings(self, station: str, limit: int = 24):
        return list(
            self.collection.find(
                {"location_name": station}
            ).sort(
                "datetimeLocal",
                DESCENDING,
            ).limit(limit)
        )

    def get_all_stations(self):
        return self.collection.distinct("location_name")

    # =====================
    # Live OpenWeather Data
    # =====================

    def get_latest_live(self, station: str):
        return self.collection.find_one(
            {"station": station},
            sort=[("timestamp", DESCENDING)],
        )

    def get_recent_live(self, station: str, limit: int = 24):
        return list(
            self.collection.find(
                {"station": station}
            ).sort(
                "timestamp",
                DESCENDING,
            ).limit(limit)
        )

    def get_live_stations(self):
        return self.collection.distinct("station")

    # =====================
    # Dashboard Methods
    # =====================

    def latest(self, station):

        doc = self.collection.find_one(
            {"location_name": station},
            sort=[("datetimeLocal", DESCENDING)],
        )

        if not doc:
            return None

        doc = serialize(doc)

        return {
            "station": doc["location_name"],
            "timestamp": doc["datetimeLocal"],
            "aqi": self._clean(doc.get("AQI")),
            "category": doc.get("AQI_category"),
            "pm25": self._clean(doc.get("pm25")),
            "pm10": self._clean(doc.get("pm10")),
            "co": self._clean(doc.get("co")),
            "no2": self._clean(doc.get("no2")),
            "so2": self._clean(doc.get("so2")),
            "o3": self._clean(doc.get("o3")),
        }

    def history(self, station, limit=100):

        docs = list(
            self.collection.find(
                {"location_name": station}
        )
        .sort("datetimeLocal", DESCENDING)
        .limit(limit)
    )

        docs.reverse()

        return serialize(docs)


    def exists_latest(self, station, timestamp):

        return self.collection.find_one(
            {
                "station": station,
                "timestamp": timestamp,
            }
        )

    def insert(self, document):
        self.collection.insert_one(document)


sensor_repository = SensorRepository()