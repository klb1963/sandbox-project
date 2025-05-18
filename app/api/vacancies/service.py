# ✅ app/api/vacancies/service.py

from sqlalchemy.orm import Session
from app.models.vacancy import Vacancy
from app.schemas.vacancy import VacancyCreate
from fastapi.encoders import jsonable_encoder

def create_vacancy(db: Session, vacancy_data: VacancyCreate) -> Vacancy:
    # ✅ Конвертируем Pydantic-модель в чистый словарь с примитивами
    data = jsonable_encoder(vacancy_data)
    vacancy = Vacancy(**data)
    db.add(vacancy)
    db.commit()
    db.refresh(vacancy)
    return vacancy

def get_vacancies(db: Session):
    return db.query(Vacancy).all()

def get_vacancy(db: Session, vacancy_id: int):
    return db.query(Vacancy).filter(Vacancy.id == vacancy_id).first()

def delete_vacancy(db: Session, vacancy_id: int):
    vacancy = get_vacancy(db, vacancy_id)
    if vacancy:
        db.delete(vacancy)
        db.commit()
    return vacancy