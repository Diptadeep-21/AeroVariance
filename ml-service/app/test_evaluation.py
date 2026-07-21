from app.services.evaluation_service import (
    evaluation_service,
)

print(
    evaluation_service.evaluate_station(
        "Delhi"
    )
)