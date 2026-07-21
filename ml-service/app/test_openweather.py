from app.clients.openweather_client import (
    openweather_client,
)

result = openweather_client.get_air_quality(

    latitude=28.6139,

    longitude=77.2090,

)

print(result)