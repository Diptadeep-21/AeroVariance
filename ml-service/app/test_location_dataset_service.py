from app.services.location_dataset_service import (
    location_dataset_service,
)

df = location_dataset_service.build_dataset(
    "Chennai"
)

print(df.head())
print(df.columns)
print(df.shape)