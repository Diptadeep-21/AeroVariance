from typing import Optional

import pandas as pd

from app.repositories.location_history_repository import (
    LocationHistoryRepository,
)


class LocationDatasetService:

    def build_dataset(
        self,
        location: str,
        limit: int = 1000,
    ) -> Optional[pd.DataFrame]:

        rows = LocationHistoryRepository.history(
            location,
            limit,
        )

        if not rows:
            return None

        df = pd.DataFrame(rows)

        if "_id" in df.columns:
            df = df.drop(columns="_id")

        df["timestamp"] = pd.to_datetime(
            df["timestamp"]
        )

        df = df.sort_values(
            "timestamp"
        ).reset_index(drop=True)

        return df


location_dataset_service = (
    LocationDatasetService()
)