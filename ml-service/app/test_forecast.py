from app.core.model_loader import loader
from app.services.forecast_service import forecast_service

loader.load()

forecast_service = forecast_service.__class__()

sample = {}

for feature in loader.feature_columns:
    sample[feature] = 0

sample["AQI_lag1"] = 180
sample["AQI_lag3"] = 175
sample["AQI_lag24"] = 160
sample["pm25_lag1"] = 90
sample["pm10_lag1"] = 130

result = forecast_service.predict(sample)

print(result)
