

from pymongo import DESCENDING

from app.core.mongodb import db

from app.utils.mongo import serialize

from app.repositories.sensor_repository import (
    sensor_repository,
)



class StationRepository:

    def __init__(self):

        self.collection = db["stations"]

    def get_all(self):

        cities = sensor_repository.get_live_stations()

        return [
            {
                "station": city,
                "active": True,
            }
            for city in sorted(cities)
        ]
    
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
    
    def exists(
    self,
    station: str,
    ):

        return self.collection.find_one(
            {
                "station": {
                    "$regex": f"^{station}$",
                    "$options": "i",
                }
            }
        ) is not None


    def find_by_name(
    self,
    station: str,
    ):

        doc = self.collection.find_one(
            {
                "station": {
                    "$regex": f"^{station}$",
                    "$options": "i",
                }
            }
        )

        if doc:
            return serialize(doc)

        aliases = {
            "New Delhi": "Delhi",
            "Bengaluru": "Bangalore",
            "Bombay": "Mumbai",
        }   

        alias = aliases.get(station)

        if alias:

            doc = self.collection.find_one(
                {
                    "station": {
                        "$regex": f"^{alias}$",
                        "$options": "i",
                    }
                }
            )

        if doc:
            return serialize(doc)

        return None


    def find_by_city(
    self,
    city: str,
    ):

        return list(
            self.collection.find(
                {
                    "city": {
                        "$regex": f"^{city}$",
                        "$options": "i",
                    }
                }                                                                                                                                                                                                                                                                                                                                                                                                                                           
            )
        )

station_repository = StationRepository()