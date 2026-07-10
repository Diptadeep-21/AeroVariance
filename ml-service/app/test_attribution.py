from app.core.model_loader import loader
from app.services.attribution_service import attribution_service

loader.load()

print("=" * 50)
print("First Prediction")
print("=" * 50)

print(
    attribution_service.get_by_index(0)
)

print("\n")

print("=" * 50)
print("Feature Importance")
print("=" * 50)

print(
    attribution_service.get_global_importance()[:5]
)

print("\n")

print("=" * 50)
print("Ballygunge History")
print("=" * 50)

history = attribution_service.get_station_history(
    "Ballygunge, Kolkata - WBPCB"
)

print(f"Records : {len(history)}")

print(history[0])