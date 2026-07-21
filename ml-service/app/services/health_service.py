from app.core.mongodb import db
from app.core.model_loader import loader
from app.core.scheduler import scheduler
from training.config import METRICS_DIR


class HealthService:

    def status(self):

        metrics_ready = (
            METRICS_DIR / "regression_metrics.json"
        ).exists()

        classification_ready = (
            METRICS_DIR / "classification_metrics.json"
        ).exists()

        importance_ready = (
            METRICS_DIR / "feature_importance.csv"
        ).exists()

        try:
            db.command("ping")
            db_ok = True
        except Exception:
            db_ok = False

        return {

            "status": "healthy" if db_ok else "unhealthy",

            "database": db_ok,

            "model_loaded": (
                loader.regressor is not None
                and loader.classifier is not None
                and loader.encoder is not None
            ),

            "scheduler_running": scheduler.state == 1,

            "collections": {

                "stations":
                    db["stations"].count_documents({}),

                "sensor_readings":
                    db["sensor_readings"].count_documents({}),

                "predictions":
                    db["predictions"].count_documents({}),

                "evaluations":
                    db["evaluations"].count_documents({}),

                "shap":
                    db["shap_values"].count_documents({}),

                "evaluation": {
                    "regression_metrics": metrics_ready,
                    "classification_metrics": classification_ready,
                    "feature_importance": importance_ready,
                },
            },
        }


health_service = HealthService()