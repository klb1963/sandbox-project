# Sandbox Project

Учебная песочница на FastAPI.

## Структура проекта

- `/app/main.py` — запуск сервера
- `/app/api/routes.py` — эндпоинты API
- `/app/services/` — вспомогательные сервисы (парсеры)
- `/app/models/` — модели базы данных
- `/app/database/` — подключение к базе данных
- `/app/bot/` — Telegram-бот для отправки вакансий

## Запуск проекта

```bash
uvicorn app.main:app --reload

Тестовый пуш