from app.services.location_training_service import (
    location_training_service,
)

print(
    location_training_service.train(
        "Chennai"
    )
)