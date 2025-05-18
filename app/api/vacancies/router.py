#✅ app/api/vacancies/router.py

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from app.database.db import get_db
from app.schemas.vacancy import VacancyCreate, VacancyOut
from app.api.vacancies import service

router = APIRouter(
    prefix="/vacancies",
    tags=["vacancies"]
)

@router.post("/", response_model=VacancyOut)
def create_vacancy(vacancy: VacancyCreate, db: Session = Depends(get_db)):
    return service.create_vacancy(db, vacancy)

@router.get("/", response_model=List[VacancyOut])
def read_all_vacancies(db: Session = Depends(get_db)):
    return service.get_vacancies(db)

@router.get("/{vacancy_id}", response_model=VacancyOut)
def read_vacancy(vacancy_id: int, db: Session = Depends(get_db)):
    db_vacancy = service.get_vacancy(db, vacancy_id)
    if not db_vacancy:
        raise HTTPException(status_code=404, detail="Vacancy not found")
    return db_vacancy

@router.delete("/{vacancy_id}", response_model=VacancyOut)
def delete_vacancy(vacancy_id: int, db: Session = Depends(get_db)):
    db_vacancy = service.delete_vacancy(db, vacancy_id)
    if not db_vacancy:
        raise HTTPException(status_code=404, detail="Vacancy not found")
    return db_vacancy