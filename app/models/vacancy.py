# ✅ app/models/vacancy.py

from sqlalchemy import Column, Integer, String, Boolean, Date, ForeignKey
from sqlalchemy.orm import relationship
from app.database.db import Base

class Vacancy(Base):
    __tablename__ = "vacancies"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    location = Column(String, nullable=True)
    link = Column(String, nullable=False)
    apply_link = Column(String, nullable=True)
    published_at = Column(Date, nullable=True)
    email = Column(String, nullable=True)
    remote = Column(Boolean, default=False)
    source = Column(String, nullable=True)
    description = Column(String, nullable=True)
    trust_score = Column(Integer, nullable=True)
    relevance_score = Column(Integer, nullable=True)

    company_id = Column(Integer, ForeignKey("companies.id"), nullable=False)
    company = relationship("Company", back_populates="vacancies")
