from datetime import datetime

from app.clients.openweather_client import openweather_client

from app.repositories.location_history_repository import (
    LocationHistoryRepository,
)

from app.schemas.location_history import (
    LocationHistory,
)

from app.services.normalization_service import (
    normalization_service,
)


class LocationSyncService:

    def sync_all(self):

        locations = (
            LocationHistoryRepository.get_all_tracked_locations()
        )

        print(f"Syncing {len(locations)} tracked locations...")

        for place in locations:

            try:

                response = openweather_client.get_air_quality(
                    place["latitude"],
                    place["longitude"],
                )

                reading = normalization_service.normalize_openweather(
                    station=place["location"],
                    latitude=place["latitude"],
                    longitude=place["longitude"],
                    response=response,
                )

                history = LocationHistory(
                    location=place["location"],
                    latitude=place["latitude"],
                    longitude=place["longitude"],
                    timestamp=reading["timestamp"],
                    provider="OpenWeather",
                    aqi=reading["AQI"],
                    category=reading["category"],
                    pm25=reading["pm25"],
                    pm10=reading["pm10"],
                    co=reading["co"],
                    no2=reading["no2"],
                    so2=reading["so2"],
                    o3=reading["o3"],
                )

                LocationHistoryRepository.save(
                    history
                )

                print(f"Updated {place['location']}")

            except Exception as e:

                print(
                    f"Failed to sync {place['location']}: {e}"
                )


location_sync_service = LocationSyncService()