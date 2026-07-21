from app.services.feature_engineering_service import (
    feature_engineering_service,
)


class SnapshotService:

    def build_snapshot(
        self,
        station: str,
    ):

        features = (
            feature_engineering_service.build_features(
                station
            )
        )

        features["station"] = station

        return features


snapshot_service = SnapshotService()