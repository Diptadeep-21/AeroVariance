from pprint import pprint

from app.services.model_evaluation_service import (
    model_evaluation_service,
)


def main():

    pprint(
        model_evaluation_service.get_metrics()
    )


if __name__ == "__main__":
    main()