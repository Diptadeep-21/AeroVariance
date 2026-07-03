# 🌍 AeroVariance - Project Execution Guide

> AI-Powered Urban Air Quality Intelligence Platform
>
> Team:
> - 👨‍💻 Developer 1 → Full Stack (Next.js + FastAPI + Integration)
> - 🤖 Developer 2 → Machine Learning

---

# Project Workflow

```
External APIs
        │
        ▼
Backend (Data Layer)
        │
        ▼
ML Service (Intelligence)
        │
        ▼
Frontend (Visualization)
```

---

# Development Workflow

```
PHASE 0
Environment Setup
        ↓
PHASE 1
Data Layer
        ↓
PHASE 2
ML Layer
        ↓
PHASE 3
Backend APIs
        ↓
PHASE 4
Frontend Integration
        ↓
PHASE 5
Dashboard
        ↓
PHASE 6
Maps
        ↓
PHASE 7
Forecast
        ↓
PHASE 8
Attribution
        ↓
PHASE 9
Intervention Engine
        ↓
PHASE 10
Citizen Advisories
        ↓
PHASE 11
Deployment
```

---

# PHASE 0 — Environment Setup

## 👨‍💻 Full Stack Developer

### Setup Frontend

```bash
cd frontend

npm install
```

Install packages

```bash
npm install axios maplibre-gl recharts zustand swr lucide-react clsx tailwind-merge
```

> Using MapLibre + MapTiler instead of Mapbox.

---

Create

```
frontend/.env.local
```

```env
NEXT_PUBLIC_MAPTILER_API_KEY=

MONGODB_URI=

FASTAPI_URL=http://localhost:8000
```

---

Run frontend

```bash
npm run dev
```

Should run at

```
http://localhost:3000
```

---

## 🤖 ML Developer

Inside

```
ml-service/
```

Create virtual environment

```bash
python -m venv venv
```

Windows

```bash
venv\Scripts\activate
```

Linux / Mac

```bash
source venv/bin/activate
```

---

Install dependencies

```bash
pip install -r requirements.txt
```

If requirements.txt doesn't exist

```bash
pip install fastapi uvicorn pandas numpy scikit-learn xgboost prophet shap joblib python-dotenv
```

Freeze packages

```bash
pip freeze > requirements.txt
```

---

Create

```
ml-service/.env
```

```env
MODEL_PATH=models/

DATASET_PATH=../datasets/
```

---

Run FastAPI

```bash
uvicorn main:app --reload --port 8000
```

Verify

```
http://localhost:8000/docs
```

---

# ✅ Definition of Done

- Next.js running on localhost:3000
- FastAPI running on localhost:8000
- MongoDB Atlas connected
- Git repository initialized

---

# PHASE 1 — Data Layer

## 👨‍💻 Full Stack

No frontend work.

Help only if dataset issues arise.

---

## 🤖 ML Developer

Inspect

```
datasets/processed/cpcb_historical_clean.csv
```

Columns should be

```
station

timestamp

aqi

pm25

pm10

no2

so2
```

---

### Standardize column names

Always use

```
station

timestamp

aqi

pm25

pm10

no2

so2
```

Never

```
PM 2.5

PM25

PM_2_5

AQI Value
```

---

Convert timestamps

```python
pd.to_datetime()
```

---

Sort

```
station

↓

timestamp
```

---

Save final dataset

```
datasets/processed/final_dataset.csv
```

---

### Validate

- No duplicate rows
- Numeric columns are numeric
- Missing values handled
- Timestamp sorted
- One consistent schema

---

# ✅ Definition of Done

One production-ready dataset.

```
datasets/processed/final_dataset.csv
```

---

# PHASE 2 — Feature Engineering

## 🤖 ML Developer

Input

```
final_dataset.csv
```

Output

```
processed/features.csv
```

Create features

- AQI lag 1
- AQI lag 3
- AQI lag 24
- Rolling Mean (6h)
- Rolling Mean (24h)
- Hour
- Day
- Month
- Temperature
- Humidity
- Wind Speed
- Wind Direction

---

# Definition of Done

```
processed/features.csv
```

ready for ML.

---

# PHASE 3 — Model Training

Train

## 1.

Prophet

Baseline model

---

## 2.

XGBoost

Primary forecasting model

---

Evaluate

Generate

- RMSE
- MAE
- R²

---

Save

```
ml-service/models/

xgboost.pkl

prophet.pkl

scaler.pkl
```

---

# Definition of Done

Prediction working.

---

# PHASE 4 — Explainability

Use

```
SHAP
```

Input

Prediction

Output

```
Traffic

Industry

Construction

Weather
```

Example

```
Traffic 38%

Industry 27%

Construction 19%

Weather 16%
```

This powers

```
Source Attribution
```

---

# Definition of Done

SHAP explanation generated.

---

# PHASE 5 — Simulation Engine

Create endpoint

```
POST

/simulation
```

Input

```json
{
    "traffic":-20,
    "industry":0
}
```

Output

```json
{
    "aqi_before":312,
    "aqi_after":281
}
```

---

# Definition of Done

Simulation working.

---

# PHASE 6 — FastAPI APIs

Create

```
GET /forecast

GET /attribution

POST /simulation

GET /advisories
```

Test

```
localhost:8000/docs
```

Frontend should NOT begin until Swagger works.

---

# PHASE 7 — Frontend Foundation

## 👨‍💻 Full Stack

Build

```
Sidebar

Navbar

Page Header
```

Create

```
Dashboard

Forecast

Map

Interventions

Advisories
```

Only layout.

No backend integration.

---

# PHASE 8 — Maps

Using

MapLibre

+

MapTiler

Render

```
Kolkata

↓

Ward GeoJSON

↓

AQI Stations

↓

Heatmap
```

---

# Definition of Done

Interactive map working.

---

# PHASE 9 — Forecast

Connect

```
Forecast API
```

Display

- Cards
- Charts
- Forecast Map

---

# PHASE 10 — Source Attribution

Connect SHAP output

Display

- Pie Chart
- Ward Popup
- Source Breakdown

---

# PHASE 11 — Intervention Engine

Connect

```
Simulation API
```

Build

```
Sliders

↓

Prediction

↓

LLM Recommendation
```

---

# PHASE 12 — Citizen Advisories

Display

- Risk Cards
- Health Advisories
- Ward Alerts
- Language Selector

Languages

- English
- Bengali
- Hindi
- Tamil

---

# PHASE 13 — Testing

Test

- Every API
- Every page
- Every chart
- Every endpoint
- Mobile responsiveness

---

# PHASE 14 — Deployment

Frontend

```
Vercel
```

ML Service

```
Railway
```

Database

```
MongoDB Atlas
```

---

# Team Responsibility Matrix

| Module | Owner |
|----------|------|
| Next.js | 👨‍💻 Full Stack |
| Dashboard UI | 👨‍💻 Full Stack |
| Maps | 👨‍💻 Full Stack |
| FastAPI APIs | 👨‍💻 Full Stack |
| MongoDB | 👨‍💻 Full Stack |
| Dataset Cleaning | 🤖 ML |
| Feature Engineering | 🤖 ML |
| XGBoost | 🤖 ML |
| Prophet | 🤖 ML |
| SHAP | 🤖 ML |
| Simulation Model | 🤖 ML |
| Model Evaluation | 🤖 ML |
| Integration | 👨‍💻 + 🤖 |

---

# Daily Timeline

| Day | Full Stack | ML |
|------|------------|----|
| 1 | Environment + Project Setup | Environment + Dataset Validation |
| 2 | API Scaffold | Feature Engineering |
| 3 | FastAPI Integration | Train Prophet + XGBoost |
| 4 | API Testing | SHAP + Evaluation |
| 5 | Dashboard Layout | Simulation Model |
| 6 | Map Integration | API Integration |
| 7 | Live AQI Map | Support Integration |
| 8 | Forecast UI | Forecast Endpoint |
| 9 | Attribution UI | Attribution Endpoint |
| 10 | Intervention UI | Simulation Endpoint |
| 11 | Citizen Advisory UI | LLM Advisory |
| 12 | Full Integration | Full Integration |
| 13 | Testing & Bug Fixes | Testing & Bug Fixes |
| 14 | Deployment + Demo | Deployment + Demo |

---

# Golden Rule 🚀

Never start the next phase until the current phase's **Definition of Done** is completed.

Build the project **layer by layer**:

```
Data
    ↓
Model
    ↓
API
    ↓
Frontend
    ↓
Visualization
    ↓
Intelligence
```

This approach minimizes integration issues and allows both team members to work independently while converging through well-defined APIs.