"""
Loads all ML assets once during application startup.
"""

import json
import joblib
import shap

from app.core.config import (
    REGRESSOR_MODEL,
    CLASSIFIER_MODEL,
    LABEL_ENCODER,
    FEATURE_COLUMNS,
    FEATURE_IMPORTANCE,
)

from app.core.logger import logger


class ModelLoader:

    def __init__(self):

        self.regressor = None
        self.classifier = None
        self.encoder = None

        self.feature_columns = None

        self.feature_importance = None
        self.explainer = None

    def load(self):

        logger.info("Loading ML assets...")

        self.regressor = joblib.load(
            REGRESSOR_MODEL
        )

        self.classifier = joblib.load(
            CLASSIFIER_MODEL
        )

        self.encoder = joblib.load(
            LABEL_ENCODER
        )

        self.feature_columns = joblib.load(
            FEATURE_COLUMNS
        )

        self.explainer = shap.TreeExplainer(
            self.regressor
        )

        logger.info(
            "SHAP TreeExplainer loaded."
        )

        with open(
            FEATURE_IMPORTANCE
        ) as f:

            self.feature_importance = json.load(
                f
            )

        logger.info(
            "ML assets loaded successfully."
        )


loader = ModelLoader()