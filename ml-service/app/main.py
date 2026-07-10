from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.logger import logger
from app.core.model_loader import loader

from app.routes.forecast import router as forecast_router
from app.routes.attribution import router as attribution_router
from app.routes.simulation import router as simulation_router
from app.routes.advisory import router as advisory_router

app = FastAPI(
    title="Urban Air Quality Intelligence API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # tighten this for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup():

    logger.info("Loading ML assets...")

    loader.load()

    logger.info("API Ready.")


@app.get("/")
def root():

    return {
        "message": "Urban Air Quality Intelligence API",
        "status": "running",
    }


app.include_router(forecast_router)
app.include_router(attribution_router)
app.include_router(simulation_router)
app.include_router(advisory_router)