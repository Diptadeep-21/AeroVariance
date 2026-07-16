from fastapi import APIRouter

from app.schemas.translation import (
    TranslationRequest,
)

from app.services.translation_service import (
    translate_strings,
)

router = APIRouter()

@router.post("/translate")
async def translate(
    request: TranslationRequest
):

    translated = translate_strings(
        request.language,
        request.strings,
    )

    return translated