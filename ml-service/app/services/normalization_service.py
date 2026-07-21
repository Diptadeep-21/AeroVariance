from datetime import datetime


class NormalizationService:
    """
    Converts external provider responses
    into the application's internal schema.
    """

    def calculate_cpcb_aqi(self, pm25, pm10, no2, so2, o3, co_ug):
        def get_pm25_sub(v):
            if v is None: return 0
            if v <= 30: return v * 50 / 30
            if v <= 60: return 50 + (v - 30) * 50 / 30
            if v <= 90: return 100 + (v - 60) * 100 / 30
            if v <= 120: return 200 + (v - 90) * 100 / 30
            if v <= 250: return 300 + (v - 120) * 100 / 130
            return min(500, 400 + (v - 250) * 100 / 100)

        def get_pm10_sub(v):
            if v is None: return 0
            if v <= 50: return v
            if v <= 100: return v
            if v <= 250: return 100 + (v - 100) * 100 / 150
            if v <= 350: return 200 + (v - 250) * 100 / 100
            if v <= 430: return 300 + (v - 350) * 100 / 80
            return min(500, 400 + (v - 430) * 100 / 70)

        def get_no2_sub(v):
            if v is None: return 0
            if v <= 40: return v * 50 / 40
            if v <= 80: return 50 + (v - 40) * 50 / 40
            if v <= 180: return 100 + (v - 80) * 100 / 100
            if v <= 280: return 200 + (v - 180) * 100 / 100
            if v <= 400: return 300 + (v - 280) * 100 / 120
            return min(500, 400 + (v - 400) * 100 / 100)

        def get_so2_sub(v):
            if v is None: return 0
            if v <= 40: return v * 50 / 40
            if v <= 80: return 50 + (v - 40) * 50 / 40
            if v <= 380: return 100 + (v - 80) * 100 / 300
            if v <= 800: return 200 + (v - 380) * 100 / 420
            if v <= 1600: return 300 + (v - 800) * 100 / 800
            return min(500, 400 + (v - 1600) * 100 / 100)

        def get_o3_sub(v):
            if v is None: return 0
            if v <= 50: return v
            if v <= 100: return v
            if v <= 168: return 100 + (v - 100) * 100 / 68
            if v <= 208: return 200 + (v - 168) * 100 / 40
            if v <= 748: return 300 + (v - 208) * 100 / 540
            return min(500, 400 + (v - 748) * 100 / 100)

        def get_co_sub(v_ug):
            if v_ug is None: return 0
            v = v_ug / 1000.0 # Convert ug/m3 to mg/m3
            if v <= 1.0: return v * 50
            if v <= 2.0: return 50 + (v - 1.0) * 50
            if v <= 10.0: return 100 + (v - 2.0) * 100 / 8
            if v <= 17.0: return 200 + (v - 10.0) * 100 / 7
            if v <= 34.0: return 300 + (v - 17.0) * 100 / 17
            return min(500, 400 + (v - 34) * 100 / 100)

        sub_indices = [
            get_pm25_sub(pm25),
            get_pm10_sub(pm10),
            get_no2_sub(no2),
            get_so2_sub(so2),
            get_o3_sub(o3),
            get_co_sub(co_ug)
        ]
        
        valid = [s for s in sub_indices if s is not None and s > 0]
        return int(max(valid)) if valid else 0

    def get_category(
        self,
        aqi: int,
    ) -> str:
        if aqi <= 50:
            return "Good"
        elif aqi <= 100:
            return "Satisfactory"
        elif aqi <= 200:
            return "Moderate"
        elif aqi <= 300:
            return "Poor"
        elif aqi <= 400:
            return "Very Poor"
        else:
            return "Severe"

    def normalize_openweather(
        self,
        station: str,
        latitude: float,
        longitude: float,
        response: dict,
    ):
        latest = response["list"][0]
        components = latest["components"]

        pm25 = components.get("pm2_5")
        pm10 = components.get("pm10")
        co = components.get("co")
        no2 = components.get("no2")
        so2 = components.get("so2")
        o3 = components.get("o3")

        # Calculate CPCB AQI from OpenWeather pollutant concentrations
        aqi = self.calculate_cpcb_aqi(pm25, pm10, no2, so2, o3, co)

        return {
            "station": station,
            "latitude": latitude,
            "longitude": longitude,
            "timestamp": datetime.fromtimestamp(
                latest["dt"]
            ),
            "provider": "OpenWeather",
            "AQI": aqi,
            "category": self.get_category(aqi),
            "pm25": pm25,
            "pm10": pm10,
            "co": co,
            "no2": no2,
            "so2": so2,
            "o3": o3,
        }


normalization_service = (
    NormalizationService()
)