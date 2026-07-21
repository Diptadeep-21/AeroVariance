from app.core.model_loader import loader

from app.services.dashboard_service import (
    dashboard_service,
)

loader.load()

data = dashboard_service.get_dashboard(
    "Delhi"
)

print(data)