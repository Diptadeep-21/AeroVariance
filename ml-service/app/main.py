from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.logger import logger
from app.core.model_loader import loader
from app.core.scheduler import scheduler

# from app.routes.forecast import (
#     router as forecast_router,
# )
from app.routes.attribution import (
    router as attribution_router,
)
from app.routes.simulation import (
    router as simulation_router,
)
from app.routes.advisory import (
    router as advisory_router,
)
# from app.routes.station import (
#     router as station_router,
# )
from app.routes.dashboard import (
    router as dashboard_router,
)
from app.routes.translation import (
    router as translation_router,
)
from app.routes.sync import (
    router as sync_router,
)
from app.services.city_sync_service import (
    city_sync_service,
)
from app.routes.analytics import (
    router as analytics_router,
)
from app.routes.health import (
    router as health_router,
)
from app.routes.metrics import (
    router as metrics_router,
)
from app.routes.config import (
    router as config_router,
)
from fastapi.exceptions import (
    RequestValidationError,
)
from app.routes.api import api_router
from app.core.api import API_PREFIX
from app.core.middleware import (
    RequestLoggingMiddleware,
)
from app.core.scheduler import (
    start_scheduler,
)


from app.core.exception_handlers import (

    validation_exception_handler,

    generic_exception_handler,

)


app = FastAPI(
    title="Urban Air Quality Intelligence API",
    version="1.0.0",
)


app.add_exception_handler(
    RequestValidationError,
    validation_exception_handler,
)

app.add_exception_handler(
    Exception,
    generic_exception_handler,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://aero-variance.vercel.app",
        "https://www.aero-variance.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.add_middleware(
    RequestLoggingMiddleware,
)


@app.on_event("startup")
def startup():

    logger.info("Loading ML assets...")
    loader.load()

    logger.info("Running initial city sync...")
    city_sync_service.sync_all()

    logger.info("Starting scheduler...")
    scheduler.start()

    logger.info("API Ready.")


@app.on_event("shutdown")
def shutdown():

    logger.info("Stopping scheduler...")

    scheduler.shutdown()

    logger.info("API stopped.")


@app.get("/")
def root():

    return {
        "service": "Urban Air Quality Intelligence API",
        "version": "1.0.0",
        "docs": "/docs",
        "api": "/api/v1",
        "status": "running",
    }


app.include_router(
    api_router,
    prefix=API_PREFIX,
)