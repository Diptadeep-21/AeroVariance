from app.core.mongodb import db

from app.repositories.location_history_repository import (
    LocationHistoryRepository,
)

from app.repositories.model_repository import (
    model_repository,
)

from app.services.forecast_service import (
    forecast_service,
)


class DashboardService:

    def get_dashboard(self, location_filter: str | None = None):
        print(f"DEBUG: get_dashboard received location_filter={location_filter}", flush=True)

        if location_filter:
            tracked = [{"location": location_filter}]
        else:
            tracked = (
                LocationHistoryRepository
                .get_all_tracked_locations()
            )

        models = (
            model_repository.all_models()
        )

        total_history = db[
            "location_history"
        ].count_documents({})

        locations = []

        for place in tracked:

            location = place["location"]

            latest = (
                LocationHistoryRepository.latest(
                    location
                )
            )

            if not latest:
                locations.append({
                    "location": location,
                    "latest_reading": None,
                    "forecast": None,
                    "records": 0,
                    "model_available": False,
                    "last_trained": None,
                })
                continue

            model = (
                model_repository.get(
                    location
                )
            )

            forecast = (
                forecast_service.forecast(
                    location
                )
            )

            records = (
                LocationHistoryRepository.count(
                    location
                )
            )

            locations.append({

                "location": location,

                "latest_reading": latest,

                "forecast": forecast,

                "records": records,

                "model_available": (
                    model is not None
                ),

                "last_trained": (
                    model.get("trained_at")
                    if model
                    else None
                ),
            })

        return {

            "summary": {

                "tracked_locations": len(
                    tracked
                ),

                "history_records": total_history,

                "trained_models": len(
                    models
                ),
            },

            "locations": locations,
        }


dashboard_service = DashboardService()