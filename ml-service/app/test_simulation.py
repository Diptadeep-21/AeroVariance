from app.core.model_loader import loader

from app.services.simulation_service import simulation_service

loader.load()

sample = {}

for feature in loader.feature_columns:

    sample[feature] = 0

sample["AQI_lag1"] = 180
sample["AQI_lag3"] = 170
sample["AQI_lag24"] = 165

sample["pm25_lag1"] = 100
sample["pm25_lag3"] = 95

sample["pm10_lag1"] = 140
sample["pm10_lag3"] = 130

sample["no2_lag1"] = 45
sample["no2_lag3"] = 40

sample["co_lag1"] = 1700

result = simulation_service.simulate(
    payload=sample,

    traffic_change=-20,

    construction_change=-30,

    industry_change=-10,
)

print(result)