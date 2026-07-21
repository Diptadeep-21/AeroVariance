# AERIS AI — AI-Powered Urban Air Quality Intelligence Platform

> **Smart Cities / Environmental Intelligence / Geospatial Analytics / Public Health**

AERIS AI is an end-to-end environmental intelligence platform designed to move city administrations from reactive AQI advisories to **proactive, evidence-based urban air quality interventions**. It fuses real-time CPCB station readings, weather forecasts, satellite thermal/fire anomalies, and geospatial emission layers to deliver ward-level AQI predictions, source attribution, what-if policy simulations, and multi-lingual citizen health advisories.

---

## 🌟 Key Features & Workflow Alignment

1. **Geospatial Pollution Source Attribution Engine**
   - Analyzes spatio-temporal AQI patterns against traffic density, industrial stacks, and satellite thermal anomalies to attribute pollution by source category (Vehicular, Industrial, Construction, Biomass) with statistical confidence scores.

2. **Hyperlocal Predictive AQI Forecasting Agent**
   - Integrated machine learning pipeline (XGBoost / Random Forest) providing 24h/48h/72h ward-level AQI forecasts based on atmospheric dispersion and weather conditions.

3. **Enforcement Intelligence & What-If Policy Simulator**
   - Interactive policy simulator allowing city officials to modify traffic density, construction permits, or industrial output and visualize immediate predicted AQI impact.

4. **Multi-City Comparative Intelligence Dashboard**
   - Cross-metropolitan analytics layer comparing air quality trends, active interventions, and compliance metrics across Indian Tier-1 and Tier-2 urban centers (Delhi, Mumbai, Kolkata, Bengaluru, Chennai).

5. **Citizen Health Risk Advisory System (Multi-lingual)**
   - Generates ward-level health risk guidance tailored to vulnerable populations (children, elderly, outdoor workers) with regional language translations (English, Hindi, Bengali, Tamil, Kannada).

---

## 🏗️ Architecture Overview

```
[ Data Ingestion Layer ] -> [ MongoDB Atlas ] -> [ FastAPI ML Service ] -> [ Next.js API Gateway ] -> [ Next.js Web App ]
  (CPCB, OpenWeather,         (Readings,            (Forecasting,             (REST Gateway Routes)     (Dashboard, Maps,
   Satellite FIRMS)            Weather, Models)      Attribution, SHAP)                                   Simulator, Advisories)
```

- **Frontend**: Next.js 16 (React 19, Turbopack, Tailwind CSS, MapLibre GL / Mapbox, Recharts, Zustand)
- **ML Service**: FastAPI, Python 3.11, Scikit-Learn, XGBoost, SHAP, PyMongo, Groq LLM API
- **Database**: MongoDB Atlas

---

## 🚀 Deployment & Running Instructions

### Option 1: Quick Start with Docker Compose (Recommended for Deployment)

Build and run both the Next.js Frontend and FastAPI ML Service in unified containers:

```bash
docker compose up --build
```

- **Web Application**: `http://localhost:3000`
- **FastAPI ML API & Docs**: `http://localhost:8000/docs`

---

### Option 2: Running Locally (Development Mode)

#### 1. Start FastAPI ML Backend
```bash
cd ml-service
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

#### 2. Start Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit `http://localhost:3000` to access the full dashboard.

---

## 🧪 Testing & Verification

- **Production Build Test**:
  ```bash
  cd frontend
  npm run build
  ```
- **API Health Check**:
  `GET http://localhost:8000/` or `GET http://localhost:8000/api/v1/dashboard`
- **Integration Test Page**:
  Visit `http://localhost:3000/test` to trigger manual FastAPI endpoint diagnostics.

---

## 🛡️ License & Hackathon Context
Built for the ET AI Hackathon — Smart Cities & Environmental Intelligence Category.
