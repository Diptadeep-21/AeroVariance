from pathlib import Path
import json

import pandas as pd

from training.config import METRICS_DIR


class ModelEvaluationService:

    def get_metrics(self):

        with open(
            METRICS_DIR / "regression_metrics.json"
        ) as f:
            regression = json.load(f)

        with open(
            METRICS_DIR / "classification_metrics.json"
        ) as f:
            classification = json.load(f)

        importance = pd.read_csv(
            METRICS_DIR / "feature_importance.csv"
        )

        return {
            "regression": regression,
            "classification": classification,
            "top_features": (
                importance.head(10).to_dict("records")
            ),
        }


model_evaluation_service = (
    ModelEvaluationService()
)