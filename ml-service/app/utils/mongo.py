from bson import ObjectId
from datetime import datetime
import math


def serialize(obj):

    if isinstance(obj, list):
        return [serialize(x) for x in obj]

    if isinstance(obj, dict):

        out = {}

        for k, v in obj.items():

            if isinstance(v, ObjectId):
                out[k] = str(v)

            elif isinstance(v, datetime):
                out[k] = v.isoformat()

            elif isinstance(v, float) and math.isnan(v):
                out[k] = None

            elif isinstance(v, dict):
                out[k] = serialize(v)

            elif isinstance(v, list):
                out[k] = serialize(v)

            else:
                out[k] = v

        return out

    return obj