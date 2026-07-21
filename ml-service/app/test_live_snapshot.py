from app.services.snapshot_service import (
    snapshot_service,
)

snapshot = snapshot_service.build_snapshot(
    "Delhi"
)

print(snapshot)