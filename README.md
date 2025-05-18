# Sandbox Project

Учебная песочница на FastAPI.

## Структура каталогов проекта

- `/app/main.py` — запуск сервера
- `/app/api/routes.py` — эндпоинты API
- `/app/services/` — вспомогательные сервисы (парсеры)
- `/app/models/` — модели базы данных
- `/app/database/` — подключение к базе данных
- `/app/bot/` — Telegram-бот для отправки вакансий

⸻
🚀 Команды для запуска и деплоя проекта

✅ 1. Запуск бэкенда локально (FastAPI)

cd sandbox-project
source venv/bin/activate
uvicorn app.main:app --reload

⸻
✅ 2. Запуск фронтенда для разработки (Vite)

cd frontend
npm run dev

При необходимости, убедись что .env.local содержит:

VITE_API_URL=http://127.0.0.1:8000/api

⸻
✅ 3. Сборка фронтенда для продакшена

cd frontend
npm run build -- --mode production

Убедись, что в frontend/.env.production:

VITE_API_URL=https://sandbox.leonidk.de/api

⸻
✅ 4. Деплой проекта на VPS через GitHub Actions
	1.	Сохраняем изменения:

git add .
git commit -m "Описание изменений"

	2.	Отправляем на GitHub:

git push origin main

	3.	После пуша:
	•	автоматически запускается GitHub Actions
	•	выполняется сборка фронта (vite build --mode production)
	•	фронт загружается на VPS
	•	FastAPI перезапускается (sudo systemctl restart sandbox.service)

📍 Мониторинг: перейти во вкладку Actions на GitHub → выбрать workflow Deploy to Sandbox Server и следить за прогрессом.

⸻
✅ 5. Перезапуск бэкенда на VPS

ssh leonidk@94.130.75.230
cd /home/leonidk/sandbox-project
source venv/bin/activate
sudo systemctl restart sandbox.service

⸻
✅ 6. Просмотр логов на сервере
sudo journalctl -u sandbox.service -f

⸻
✅ 7. GitHub Actions — автодеплой

При пуше в main сработает .github/workflows/deploy.yml:
	•	сборка фронта
	•	деплой на VPS
	•	миграция БД (если нужно)
	•	перезапуск FastAPI

⸻

