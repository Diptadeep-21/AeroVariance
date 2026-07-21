from app.services.city_sync_service import (
    city_sync_service,
)

data = city_sync_service.sync_all()

for row in data:

    print(row)