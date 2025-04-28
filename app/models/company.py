from sqlalchemy import Column, Integer, String
from app.database.db import Base

class Company(Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    city = Column(String)
    website = Column(String)
    email = Column(String)
    linkedin = Column(String)