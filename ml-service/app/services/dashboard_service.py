from app.services.forecast_service import (
    forecast_service,
)

from app.services.advisory_service import (
    advisory_service,
)

from app.services.attribution_service import (
    attribution_service,
)


class DashboardService:

    def get_dashboard(
        self,
        station: str,
        payload: dict,
    ):

        forecast = forecast_service.predict(
            payload
        )

        advisory = advisory_service.get_advisory(
            forecast["category"]
        )

        prediction = attribution_service.get_by_index(
            0
        )

        return {

            "station": station,

            "forecast": forecast,

            "advisory": advisory,

            "latest_prediction": prediction,
        }


dashboard_service = DashboardService()