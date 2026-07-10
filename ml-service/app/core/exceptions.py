class ModelNotLoadedError(Exception):
    """Raised when ML models are not loaded."""
    pass


class InvalidStationError(Exception):
    """Raised when an unknown station is provided."""
    pass


class InvalidFeatureError(Exception):
    """Raised when required features are missing."""
    pass