from app.services.sync_service import (
    sync_service,
)

doc = sync_service.sync_station(

    station="Delhi",

    latitude=28.6139,

    longitude=77.2090,

)

print(doc)