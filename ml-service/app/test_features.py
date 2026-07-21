from app.services.feature_engineering_service import (
    feature_engineering_service,
)

features = (
    feature_engineering_service.build_features(
        "Delhi"
    )
)

for k, v in features.items():
    print(f"{k}: {v}")