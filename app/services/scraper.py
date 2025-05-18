# ✅ scraper.py — модуль для парсинга вакансий с сайтов компаний

import requests
from bs4 import BeautifulSoup
from app.schemas.vacancy import VacancyCreate

def parse_jobs_from_url(url: str, company_id: int) -> list[VacancyCreate]:
    try:
        response = requests.get(url, timeout=10)
        response.raise_for_status()
    except Exception as e:
        print(f"❌ Ошибка при получении {url}: {e}")
        return []

    soup = BeautifulSoup(response.text, 'html.parser')
    vacancies = []

    # Поиск заголовков вакансий
    headings = soup.find_all(['h3', 'h4'])
    for heading in headings:
        title = heading.get_text(strip=True)
        if not title:
            continue

        # Поиск описания вакансии
        description_parts = []
        for sibling in heading.find_next_siblings():
            if sibling.name in ['h3', 'h4']:
                break
            description_parts.append(sibling.get_text(strip=True))
        description = '\n'.join(description_parts).strip()

        # Поиск ссылки на вакансию
        link_tag = heading.find_next('a', string=lambda text: text and 'Jetzt bewerben' in text)
        link = link_tag['href'] if link_tag and link_tag.has_attr('href') else url

        vacancy = VacancyCreate(
            title=title,
            location='Augsburg, DE',
            link=link,
            apply_link=link,
            published_at=None,
            email='info@smc-it.de',
            remote=False,
            source=url,
            description=description,
            trust_score=70,
            relevance_score=60,
            company_id=company_id,
        )
        vacancies.append(vacancy)

    return vacancies