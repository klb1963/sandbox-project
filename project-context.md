# 🧠 Project Context: Vacancy Collector

## 🏗️ Стек
- Backend: FastAPI + PostgreSQL
- Frontend: React + Vite
- Деплой: GitHub Actions + systemd + rsync
- Хостинг: Hetzner VPS → sandbox.leonidk.de

---
## 📋 Структура проекта
- `/app/` — FastAPI backend
- `/frontend/` — React frontend
- `.env.production` / `.env.local` — API URL конфигурация
- `.github/workflows/deploy.yml` — автоматический деплой
- `requirements.txt` — зависимости Python

---
## 📦 Модели
- `Company`: name, city, website, linkedin, email - необязательное поле
- `Category` - TBD
- `Vacancy` - TBD

---
## 📌 Текущий статус
- ✅ CRUD для компаний
- ✅ UI с actions(edit, delete) и отображением количества компаний
- ✅ Деплой на прод sandbox.leonidk.de работает стабильно
- ⏳ Следующий этап: парсинг вакансий с сайтов компаний

---
## 🗂️ Дальнейшие задачи
- [ ] Модель `Vacancy`
- [ ] Автоматический парсинг открытых вакансий с сайтов и LinkedIn
- [ ] Алгоритм расчета и имплементации индексов доверия, актуальности и пр. для вакансии
- [ ] Сохранение в Google Sheets / Airtable
- [ ] Telegram-публикации

---
## 🔗 Внешние инструменты
- Google Maps API (для сбора компаний)
- Telegram Bot API

⸻
