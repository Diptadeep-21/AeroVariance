import requests

from app.core.config import (
    OPENWEATHER_API_KEY,
    OPENWEATHER_BASE_URL,
)


class GeocodingClient:

    def __init__(self):
        self.base_url = OPENWEATHER_BASE_URL
        self.api_key = OPENWEATHER_API_KEY

    def search(
        self,
        query: str,
        limit: int = 5,
        country: str = "IN",
    ):

        response = requests.get(
            f"{self.base_url}/geo/1.0/direct",
            params={
                "q": query,
                "limit": limit,
                "appid": self.api_key,
            },
            timeout=15,
        )

        response.raise_for_status()

        places = response.json()

        if not places:
            return []

        q = query.strip().lower()

        # 1. Exact name + preferred country
        for place in places:
            if (
                place.get("country") == country
                and place.get("name", "").lower() == q
            ):
                return [place]

        # 2. Preferred country
        indian = [
            p for p in places
            if p.get("country") == country
        ]

        if indian:
            return indian

        # 3. Exact name anywhere
        exact = [
            p for p in places
            if p.get("name", "").lower() == q
        ]

        if exact:
            return exact

        # 4. Fallback
        return places

    def reverse(
        self,
        lat: float,
        lon: float,
    ):

        response = requests.get(
            f"{self.base_url}/geo/1.0/reverse",
            params={
                "lat": lat,
                "lon": lon,
                "limit": 1,
                "appid": self.api_key,
            },
            timeout=15,
        )

        response.raise_for_status()

        result = response.json()

        return result[0] if result else None


geocoding_client = GeocodingClient()