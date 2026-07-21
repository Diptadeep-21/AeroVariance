import math
from statistics import mean
#from turtle import pos

#from attr import field

from app.repositories.sensor_repository import (
    sensor_repository,
)


class FeatureEngineeringService:

    def build_features(
        self,
        station: str,
        idx=0,
    ):
        
        if "WBPCB" in station:
            print("Using historical WBPCB dataset")
            readings = sensor_repository.get_recent_readings(
            station,
            limit=24,
            )
        else:
            print("Using live dataset")
            readings = sensor_repository.get_recent_live(
            station,
            limit=24,
            )

        print("Readings found:", len(readings))

        print("\n========== SENSOR HISTORY ==========")

        for i, r in enumerate(readings[:6]):

            t = (
            r.get("timestamp")
            or r.get("datetimeLocal")
            or r.get("datetimeUtc")
            )

            print(
            f"{i}:",
            t,
            "AQI =", r.get("AQI"),
            "PM2.5 =", r.get("pm25"),
            "PM10 =", r.get("pm10"),
            )

        print("====================================\n")

        if not readings:
            raise ValueError(
                f"No readings found for '{station}'."
            )

        if idx >= len(readings):
            raise ValueError("History index out of range.")

        latest = readings[idx]

        ts = (
            latest.get("timestamp")
            or latest.get("datetimeLocal")
            or latest.get("datetimeUtc")
        )

        if ts is None:
            raise ValueError("Latest reading has no timestamp.")

        if isinstance(ts, str):
            from datetime import datetime
            ts = datetime.fromisoformat(ts.replace("Z", ""))

        hour = ts.hour
        dow = ts.weekday()
        month = ts.month

        def lag(field, off):

            pos = idx + off

            if pos < len(readings):

                val = readings[pos].get(field)

                if val is not None:
                    return val

            return latest.get(field)

        def roll6(field):
            end = min(idx + 7, len(readings))

            vals = []

            for i in range(idx + 1, end):
                v = readings[i].get(field)

            if v is not None:
                print(field, v, type(v))
                vals.append(v)

                if len(vals) < 3:
                    return None

            return round(mean(vals), 2)
        

        SUPPORTED_STATIONS = [
            "Ballygunge, Kolkata - WBPCB",
            "Bidhannagar, Kolkata - WBPCB",
            "Fort William, Kolkata - WBPCB",
            "Jadavpur, Kolkata - WBPCB",
            "Rabindra Sarobar, Kolkata - WBPCB",
            "Victoria, Kolkata - WBPCB",
            "Delhi",]

        station_features = {
        f"station_{s}": 0
        for s in SUPPORTED_STATIONS
        }

        if station in SUPPORTED_STATIONS:
            station_features[f"station_{station}"] = 1

        return {

            # Station
            "station": station,

            # AQI
            "AQI_lag1": lag("AQI", 1),
            "AQI_lag3": lag("AQI", 3),
            "AQI_lag24": lag("AQI", 23),
            "AQI_roll6_mean": roll6("AQI"),
             **station_features,

            # PM2.5
            "pm25_lag1": lag("pm25", 1),
            "pm25_lag3": lag("pm25", 3),
            "pm25_lag24": lag("pm25", 23),
            "pm25_roll6_mean": roll6("pm25"),

            # PM10
            "pm10_lag1": lag("pm10", 1),
            "pm10_lag3": lag("pm10", 3),
            "pm10_lag24": lag("pm10", 23),
            "pm10_roll6_mean": roll6("pm10"),

            # CO
            "co_lag1": lag("co", 1),
            "co_lag3": lag("co", 3),
            "co_lag24": lag("co", 23),
            "co_roll6_mean": roll6("co"),

            # NO2
            "no2_lag1": lag("no2", 1),
            "no2_lag3": lag("no2", 3),
            "no2_lag24": lag("no2", 23),
            "no2_roll6_mean": roll6("no2"),

            # O3
            "o3_lag1": lag("o3", 1),
            "o3_lag3": lag("o3", 3),
            "o3_lag24": lag("o3", 23),
            "o3_roll6_mean": roll6("o3"),

            # SO2
            "so2_lag1": lag("so2", 1),
            "so2_lag3": lag("so2", 3),
            "so2_lag24": lag("so2", 23),
            "so2_roll6_mean": roll6("so2"),

            # Time
            "hour": hour,
            "dayofweek": dow,
            "month": month,
            "is_weekend": int(dow >= 5),

            "hour_sin": math.sin(
                2 * math.pi * hour / 24
            ),

            "hour_cos": math.cos(
                2 * math.pi * hour / 24
            ),

            "doy_sin": math.sin(
                2 * math.pi * dow / 7
            ),

            "doy_cos": math.cos(
                2 * math.pi * dow / 7
            ),
        }


feature_engineering_service = (
    FeatureEngineeringService()
)