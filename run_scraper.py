# run_scraper.py

import asyncio
from sqlalchemy.orm import Session
from app.database.db import SessionLocal
from app.models.company import Company
from app.api.vacancies.service import create_vacancy
from app.schemas.vacancy import VacancyCreate
from scraper import parse_jobs_from_url

def run_scraping():
    db: Session = SessionLocal()
    companies = db.query(Company).all()
    total = 0

    for company in companies:
        url = company.website
        company_id = company.id

        print(f"🌐 Обрабатываем сайт: {url} (id={company_id})")
        try:
            vacancies = parse_jobs_from_url(url, company_id)
            print(f"🔍 Найдено вакансий: {len(vacancies)}")

            for v in vacancies:
                create_vacancy(db, VacancyCreate(**v.dict()))
                total += 1
        except Exception as e:
            print(f"❌ Ошибка при обработке {url}: {e}")

    db.close()
    print(f"✅ Завершено. Добавлено вакансий: {total}")

if __name__ == "__main__":
    run_scraping()