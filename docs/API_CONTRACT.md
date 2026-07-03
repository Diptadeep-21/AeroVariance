# API_CONTRACT.md

# AeroVariance API Contract

This document defines the communication between:

Frontend (Next.js)

↓

FastAPI

↓

ML Service

Any change to an endpoint MUST be reflected here first.

---

# Base URL

Development

```
http://localhost:8000
```

Production

```
https://api.vayudrishti.com
```

---

# Response Format

Every endpoint returns

```json
{
    "success": true,
    "message": "",
    "data": {}
}
```

Every error returns

```json
{
    "success": false,
    "message": "Reason",
    "error": {}
}
```

---

# 1. Health Check

GET

```
/
```

Response

```json
{
    "success": true,
    "message": "Server Running"
}
```

---

# 2. Live AQI

GET

```
/aqi
```

Response

```json
{
  "success": true,
  "data": [
    {
      "station_id": "BG001",
      "station_name": "Ballygunge",
      "city": "Kolkata",
      "ward": "67",
      "latitude": 22.5204,
      "longitude": 88.3697,
      "timestamp": "2026-07-04T09:00:00Z",
      "aqi": 182,
      "pm25": 89,
      "pm10": 142,
      "no2": 41,
      "so2": 12,
      "category": "Poor"
    }
  ]
}
```

---

# 3. Forecast

GET

```
/forecast
```

Query

```
station_id

hours=24
```

Example

```
/forecast?station_id=BG001&hours=24
```

Response

```json
{
    "success": true,
    "data": {
        "station_id":"BG001",
        "forecast_time":"2026-07-05T09:00:00",
        "predicted_aqi":213,
        "category":"Very Poor",
        "confidence":0.92
    }
}
```

---

# 4. Attribution

GET

```
/attribution
```

Query

```
station_id
```

Response

```json
{
  "success": true,
  "data": {
    "traffic":35,
    "industry":26,
    "construction":24,
    "weather":15,
    "confidence":0.91
  }
}
```

Percentages always total

```
100%
```

---

# 5. Simulation

POST

```
/simulation
```

Request

```json
{
    "station_id":"BG001",
    "traffic_reduction":20,
    "industry_reduction":15,
    "construction_reduction":10
}
```

Response

```json
{
    "success":true,
    "data":{
        "before_aqi":312,
        "after_aqi":276,
        "improvement":36
    }
}
```

---

# 6. Citizen Advisory

GET

```
/advisories
```

Query

```
language=en

station_id=BG001
```

Response

```json
{
    "success":true,
    "data":{
        "risk":"High",
        "language":"en",
        "advisory":"Avoid outdoor exercise. Wear N95 masks."
    }
}
```

---

# 7. SHAP Explainability

GET

```
/explain
```

Query

```
station_id
```

Response

```json
{
    "success":true,
    "data":[
        {
            "feature":"Traffic",
            "importance":0.39
        },
        {
            "feature":"Humidity",
            "importance":0.21
        },
        {
            "feature":"Temperature",
            "importance":0.14
        }
    ]
}
```

---

# Status Codes

200

Successful

201

Created

400

Bad Request

404

Not Found

500

Internal Server Error

---

# Rules

✓ Never change response keys

✓ Never change endpoint names

✓ Never return null arrays

✓ Always return success boolean

✓ Use ISO timestamps

✓ AQI is integer

✓ Coordinates are float

✓ Percentages total 100%
