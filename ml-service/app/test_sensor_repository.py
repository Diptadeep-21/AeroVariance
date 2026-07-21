from app.repositories.sensor_repository import sensor_repository


doc = sensor_repository.get_latest_reading(
    "Ballygunge, Kolkata - WBPCB"
)

print(doc["AQI"])
print(doc["datetimeLocal"])