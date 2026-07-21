from app.core.logger import logger

from app.repositories.location_history_repository import (
    LocationHistoryRepository,
)

from app.services.location_training_service import (
    location_training_service,
)


class ModelSyncService:

    def train_all(self):

        locations = (
            LocationHistoryRepository
            .get_all_tracked_locations()
        )

        results = []

        if not locations:

            logger.info("No tracked locations found.")

            return {
                "success": True,
                "count": 0,
                "results": [],
            }

        for place in locations:

            location = place["location"]

            try:

                logger.info(
                    f"Training model for {location}"
                )

                result = (
                    location_training_service.train(
                        location
                    )
                )

                results.append(
                    {
                        "location": location,
                        "result": result,
                    }
                )

            except Exception as e:

                logger.exception(
                    f"Training failed for {location}"
                )

                results.append(
                    {
                        "location": location,
                        "success": False,
                        "error": str(e),
                    }
                )

        return {
            "success": True,
            "count": len(results),
            "results": results,
        }


model_sync_service = (
    ModelSyncService()
)