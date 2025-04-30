from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.db import get_db
from app.api.companies import service
from app.api.companies.schemas import CompanyCreate, CompanyUpdate, CompanyOut
from typing import List

router = APIRouter(
    prefix="/companies",
    tags=["companies"]
)

@router.get("/", response_model=List[CompanyOut])
def read_companies(db: Session = Depends(get_db)):
    return service.get_companies(db)

@router.post("/", response_model=CompanyOut)
def create_company(company: CompanyCreate, db: Session = Depends(get_db)):
    return service.create_company(db, company)

@router.get("/{company_id}", response_model=CompanyOut)
def read_company(company_id: int, db: Session = Depends(get_db)):
    company = service.get_company(db, company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Компания не найдена")
    return company

@router.put("/{company_id}", response_model=CompanyOut)
def update_company(company_id: int, company_update: CompanyUpdate, db: Session = Depends(get_db)):
    company = service.update_company(db, company_id, company_update)
    if not company:
        raise HTTPException(status_code=404, detail="Компания не найдена")
    return company

@router.delete("/{company_id}")
def delete_company(company_id: int, db: Session = Depends(get_db)):
    company = service.delete_company(db, company_id)
    if not company:
        raise HTTPException(status_code=404, detail="Компания не найдена")
    return {"detail": "Компания удалена"}