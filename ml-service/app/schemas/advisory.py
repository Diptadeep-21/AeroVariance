from pydantic import BaseModel


class AdvisoryResponse(BaseModel):
    risk: str
    color: str
    message: str
    mask: bool
    outdoor: str