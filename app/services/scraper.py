import requests
from bs4 import BeautifulSoup

def scrape_careers_page(url: str):
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")
    # Здесь потом будет логика поиска вакансий на сайте
    return soup.title.string  # Пока возвращаем заголовок страницы