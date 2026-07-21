from app.repositories.station_repository import (
    station_repository,
)


class StationService:

    def get_all(self):

        return station_repository.get_all()


station_service = StationService()