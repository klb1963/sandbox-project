Обновлённый project-context.md с учётом новых результатов:

⸻

🧠 Project Context: Vacancy Collector

🏗️ Стек
	•	Backend: FastAPI + PostgreSQL
	•	Frontend: React + Vite
	•	Деплой: GitHub Actions + systemd + rsync
	•	Хостинг: Hetzner VPS → https://sandbox.leonidk.de
	•	Парсинг: BeautifulSoup (установлен), Jupyter Notebook (для отладки)

⸻

📋 Структура проекта
	•	/app/ — FastAPI backend
	•	/frontend/ — React frontend
	•	/notebooks/ — эксперименты с парсингом в Jupyter
	•	.env.production / .env.local — API URL конфигурация
	•	.github/workflows/deploy.yml — автоматический деплой
	•	requirements.txt — зависимости Python

⸻

📦 Модели
	•	Company: name, city, website, linkedin, email — email необязателен
	•	Category — TBD
	•	Vacancy: title, description, company_id, published_at, url

⸻

📌 Текущий статус
	•	✅ CRUD для компаний
	•	✅ UI с actions (edit/delete) и отображением количества компаний
	•	✅ Деплой на прод работает стабильно
	•	✅ Настроен парсинг данных из HTML-страниц (тест на smc-it.de)
	•	✅ Установлены requests, beautifulsoup4, selenium, jupyter
	•	✅ Создан и сохранён первый Jupyter Notebook с успешным извлечением вакансий
	•	⏳ Следующий шаг: интеграция результатов парсинга в FastAPI + запись в базу данных

⸻

🗂️ Дальнейшие задачи
	•	Завершить модель Vacancy
	•	Интеграция парсера в parse_jobs_from_url(url, company_id)
	•	Автоматический сбор открытых вакансий с сайтов и LinkedIn
	•	Алгоритм расчёта индексов доверия, актуальности и пр. для вакансий
	•	Сохранение в Google Sheets / Airtable
	•	Telegram-публикации новых вакансий

⸻

🔗 Внешние инструменты
	•	Google Maps API (для сбора компаний)
	•	Telegram Bot API
	•	Selenium (для динамических сайтов)

⸻

