from app.services.location_dataset_service import (
    location_dataset_service,
)

from app.services.location_feature_service import (
    location_feature_service,
)

df = location_dataset_service.build_dataset(
    "Chennai"
)

df = location_feature_service.create_features(
    df
)

print(df.head())