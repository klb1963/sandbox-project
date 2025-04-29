from sqlalchemy import Column, Integer, String, Float
from app.database.db import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    city = Column(String)
    website = Column(String)
    email = Column(String)
    linkedin = Column(String)
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)