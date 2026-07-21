import requests

from app.core.config import (
    OPENWEATHER_API_KEY,
)


class OpenWeatherClient:

    BASE_URL = (
        "https://api.openweathermap.org"
        "/data/2.5/air_pollution"
    )

    def get_air_quality(
        self,
        latitude: float,
        longitude: float,
    ):

        response = requests.get(

            self.BASE_URL,

            params={

                "lat": latitude,

                "lon": longitude,

                "appid": OPENWEATHER_API_KEY,

            },

            timeout=20,

        )

        response.raise_for_status()

        return response.json()


openweather_client = OpenWeatherClient()