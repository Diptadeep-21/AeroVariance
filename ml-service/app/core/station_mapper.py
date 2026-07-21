"""
Maps monitoring stations to
their corresponding city.
"""

STATION_CITY_MAP = {
    # Kolkata
    "Ballygunge, Kolkata - WBPCB": "Kolkata",
    "Bidhannagar, Kolkata - WBPCB": "Kolkata",
    "Victoria, Kolkata - WBPCB": "Kolkata",
    "Rabindra Sarobar, Kolkata - WBPCB": "Kolkata",
    "Fort William, Kolkata - WBPCB": "Kolkata",
    "Jadavpur, Kolkata - WBPCB": "Kolkata",

    # Direct city names
    "Delhi": "Delhi",
    "Mumbai": "Mumbai",
    "Kolkata": "Kolkata",
    "Chennai": "Chennai",
    "Hyderabad": "Hyderabad",
    "Bengaluru": "Bengaluru",
}


def normalize_station(station: str) -> str:
    return STATION_CITY_MAP.get(station, station)