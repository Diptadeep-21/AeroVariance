from app.core.cities import CITIES

from app.services.sync_service import (
    sync_service,
)


class CitySyncService:

    def sync_all(self):

        results = []

        for station, coord in CITIES.items():

            try:

                res = sync_service.sync_station(
                    station=station,
                    latitude=coord["latitude"],
                    longitude=coord["longitude"],
                )

                if res["status"] == "skipped":
                    results.append(res)
                    continue

                results.append({
                    "station": station,
                    "status": "success",
                    "aqi": res["reading"]["AQI"],
                })

            except Exception as e:

                results.append({
                    "station": station,
                    "status": "failed",
                    "error": str(e),
                })

        return results


city_sync_service = CitySyncService()