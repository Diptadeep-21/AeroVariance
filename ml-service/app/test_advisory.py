from app.services.advisory_service import advisory_service

categories = [
    "Good",
    "Satisfactory",
    "Moderate",
    "Poor",
    "Very Poor",
]

for c in categories:

    print("=" * 40)
    print(c)
    print("=" * 40)

    print(
        advisory_service.get_advisory(c)
    )

    print()