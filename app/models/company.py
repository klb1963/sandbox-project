# ✅ app/models/company.py

from sqlalchemy import Column, Integer, String, Float
from sqlalchemy.orm import relationship
from app.database.db import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    city = Column(String)
    website = Column(String)
    linkedin = Column(String)
    email = Column(String)
    vacancies = relationship("Vacancy", back_populates="company", cascade="all, delete")