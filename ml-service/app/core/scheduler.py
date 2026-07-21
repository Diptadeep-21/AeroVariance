from apscheduler.schedulers.background import (
    BackgroundScheduler,
)

from app.core.logger import logger
from app.services.location_sync_service import (
    location_sync_service,
)
from app.services.model_sync_service import (
    model_sync_service,
)

scheduler = BackgroundScheduler()


def start_scheduler():

    if scheduler.running:
        return

    scheduler.add_job(
        location_sync_service.sync_all,
        trigger="interval",
        hours=1,
        id="location_sync",
        replace_existing=True,
    )

    scheduler.add_job(
        model_sync_service.train_all,
        trigger="interval",
        hours=24,
        id="model_training",
        replace_existing=True,
    )

    scheduler.start()

    logger.info("Scheduler started successfully.")