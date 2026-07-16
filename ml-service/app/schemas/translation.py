from pydantic import BaseModel

class TranslationRequest(BaseModel):
    language: str
    strings: dict