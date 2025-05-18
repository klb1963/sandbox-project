# ✅ scraper.py — модуль для парсинга вакансий с сайтов компаний

import requests
from bs4 import BeautifulSoup
from typing import List
from datetime import date

# Тип для создания вакансии
from app.schemas.vacancy import VacancyCreate

# 🔧 Простейший шаблон парсинга вакансий с HTML-страницы
def parse_jobs_from_url(url: str, company_id: int) -> List[VacancyCreate]:
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"❌ Ошибка при получении {url}: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    vacancies = []

    # 🔍 Это нужно будет адаптировать под структуру каждой страницы
    job_elements = soup.select('div.job, li.job, .vacancy')  # CSS-селекторы

    for job in job_elements:
        title = job.find('h2') or job.find('a')
        location = job.find(class_='location') or job.find('span', string="Location")

        if not title:
            continue

        vacancy = VacancyCreate(
            title=title.get_text(strip=True),
            location=location.get_text(strip=True) if location else "",
            link=url,
            apply_link=url,  # 💡 если нет отдельной ссылки, ставим ту же
            published_at=date.today(),
            email="",  # если есть, вытащим позже
            remote="remote" in title.get_text(strip=True).lower(),
            source="website",
            description="",  # если доступна полная карточка — добавим
            trust_score=50,  # по умолчанию
            relevance_score=50,
            company_id=company_id
        )
        vacancies.append(vacancy)

    print(f"✅ {len(vacancies)} вакансий найдено на {url}")
    return vacancies
