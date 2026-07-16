"""
Forecast Service

Uses trained ML models to predict AQI.
"""

import numpy as np

from app.core.logger import logger
from app.core.model_loader import loader
from app.core.preprocessor import preprocessor


class ForecastService:

    def predict(
        self,
        payload: dict,
    ):

        X = preprocessor.preprocess(payload)

        regressor = loader.regressor
        classifier = loader.classifier
        encoder = loader.encoder

        if regressor is None:
            raise RuntimeError(
                "Models not loaded."
            )

        predicted_aqi = float(
            regressor.predict(X)[0]
        )

        class_id = int(
            classifier.predict(X)[0]
        )

        category = encoder.inverse_transform(
            [class_id]
        )[0]

        confidence = float(
            np.max(
                classifier.predict_proba(X)
            )
        )

        return {

            "predicted_aqi": round(
                predicted_aqi,
                2,
            ),

            "category": category,

            "confidence": round(
                confidence,
                4,
            ),
        }


forecast_service = ForecastService()