from fastapi import Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError


async def validation_exception_handler(
    request: Request,
    exc: RequestValidationError,
):

    return JSONResponse(

        status_code=422,

        content={

            "success": False,

            "error": {

                "type": "ValidationError",

                "message": "Invalid request",

                "details": exc.errors(),
            },
        },
    )


async def generic_exception_handler(
    request: Request,
    exc: Exception,
):

    return JSONResponse(

        status_code=500,

        content={

            "success": False,

            "error": {

                "type": type(exc).__name__,

                "message": str(exc),
            },
        },
    )