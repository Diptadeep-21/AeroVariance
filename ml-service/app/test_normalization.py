from app.clients.openweather_client import (
    openweather_client,
)

from app.services.normalization_service import (
    normalization_service,
)

response = openweather_client.get_air_quality(

    latitude=28.6139,

    longitude=77.2090,

)

normalized = (
    normalization_service.normalize_openweather(

        station="Delhi",

        latitude=28.6139,

        longitude=77.2090,

        response=response,

    )
)

print(normalized)