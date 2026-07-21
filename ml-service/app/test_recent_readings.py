from app.repositories.sensor_repository import (
    sensor_repository,
)

docs = sensor_repository.get_recent_readings(

    "Delhi",

    limit=5,

)

for doc in docs:

    print(

        doc["timestamp"],

        doc["AQI"]

    )