from datetime import datetime, timedelta

from app.core.mongodb import db


class MetricsService:

    def summary(self):

        now = datetime.utcnow()
        last_day = now - timedelta(days=1)

        sensor_records = db.sensor_readings.count_documents({})

        predictions = db.predictions.count_documents({})

        evaluations = db.evaluations.count_documents({})

        stations = db.stations.count_documents({})

        latest = db.sensor_readings.find_one(
            sort=[("timestamp", -1)]
        )

        last_sync = None

        if latest:
            last_sync = latest["timestamp"]

        records_today = db.sensor_readings.count_documents(
            {
                "timestamp": {
                    "$gte": last_day
                }
            }
        )

        avg_error = None

        pipeline = [
            {
                "$group": {
                    "_id": None,
                    "avg": {
                        "$avg": "$absolute_error"
                    }
                }
            }
        ]

        result = list(
            db.evaluations.aggregate(
                pipeline
            )
        )

        if result:
            avg_error = round(
                result[0]["avg"],
                2,
            )

        return {

            "stations": stations,

            "sensor_records": sensor_records,

            "records_last_24h": records_today,

            "predictions": predictions,

            "evaluations": evaluations,

            "average_error": avg_error,

            "last_sync": last_sync,

            "model_version": "1.0.0",
        }


metrics_service = MetricsService()