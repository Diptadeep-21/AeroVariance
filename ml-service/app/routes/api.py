from fastapi import APIRouter

from app.routes.forecast import router as forecast_router
from app.routes.attribution import router as attribution_router
from app.routes.simulation import router as simulation_router
from app.routes.advisory import router as advisory_router
from app.routes.station import router as station_router
from app.routes.dashboard import router as dashboard_router
from app.routes.translation import router as translation_router
from app.routes.sync import router as sync_router
from app.routes.analytics import router as analytics_router
from app.routes.health import router as health_router
from app.routes.metrics import router as metrics_router
from app.routes.config import router as config_router
from app.routes.location import router as location_router
from app.routes.model import (
    router as model_router,
)


api_router = APIRouter()

api_router.include_router(forecast_router)
api_router.include_router(attribution_router)
api_router.include_router(simulation_router)
api_router.include_router(advisory_router)
api_router.include_router(station_router)
api_router.include_router(dashboard_router)
api_router.include_router(translation_router)
api_router.include_router(sync_router)
api_router.include_router(analytics_router)
api_router.include_router(health_router)
api_router.include_router(metrics_router)
api_router.include_router(config_router)
api_router.include_router(location_router)
api_router.include_router(
    model_router,
    prefix="/api/v1",
)