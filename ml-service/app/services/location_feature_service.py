import pandas as pd


class LocationFeatureService:

    def create_features(
        self,
        df: pd.DataFrame,
    ):

        df = df.copy()

        df["aqi_lag1"] = df["aqi"].shift(1)
        df["aqi_lag2"] = df["aqi"].shift(2)
        df["aqi_lag3"] = df["aqi"].shift(3)

        df["aqi_roll3_mean"] = (
            df["aqi"].rolling(3).mean()
        )

        df["aqi_roll6_mean"] = (
            df["aqi"].rolling(6).mean()
        )

        df["aqi_roll6_std"] = (
            df["aqi"].rolling(6).std()
        )

        df["hour"] = df["timestamp"].dt.hour
        df["day"] = df["timestamp"].dt.day
        df["month"] = df["timestamp"].dt.month
        df["weekday"] = df["timestamp"].dt.weekday
        

        return df



location_feature_service = (
    LocationFeatureService()
)