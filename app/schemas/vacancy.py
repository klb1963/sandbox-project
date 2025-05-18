# ✅ app/schemas/vacancy.py

from pydantic import BaseModel, HttpUrl, EmailStr, Field
from typing import Optional
from datetime import date

class VacancyBase(BaseModel):
    title: str
    location: Optional[str] = None
    link: HttpUrl
    apply_link: Optional[HttpUrl] = None
    published_at: Optional[date] = None
    email: Optional[EmailStr] = None
    remote: bool = False
    source: Optional[str] = None
    description: Optional[str] = None
    trust_score: Optional[int] = Field(default=None, ge=0, le=100)
    relevance_score: Optional[int] = Field(default=None, ge=0, le=100)

class VacancyCreate(VacancyBase):
    company_id: int

class VacancyOut(VacancyBase):
    id: int
    company_id: int

    class Config:
        from_attributes = True