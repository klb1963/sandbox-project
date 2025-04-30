from pydantic import BaseModel
from typing import Optional

class CompanyCreate(BaseModel):
    name: str
    city: str
    website: Optional[str] = None
    email: Optional[str] = None
    linkedin: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None

class CompanyUpdate(CompanyCreate):
    pass

class CompanyOut(CompanyCreate):
    id: int

    class Config:
        orm_mode = True