from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.api.routes import router
import os  # Нужно для определения пути к index.html

# Создаём приложение FastAPI
app = FastAPI(
    title="Sandbox Project API",
    description="API для сбора вакансий и публикации в Telegram",
    version="0.1.0",
    contact={
        "name": "LeonidK",
        "url": "https://sandbox.leonidk.de",
        "email": "sailorleon@gmail.com",
    },
)

# Регистрируем API-роуты под префиксом /api
app.include_router(router, prefix="/api")

# Указываем путь к production-бандлу фронтенда
frontend_path = os.path.join(os.path.dirname(__file__), "../frontend/dist")

# Монтируем фронтенд как статические файлы на корневой маршрут /
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")

# Настройки CORS, чтобы разрешить доступ с локального фронта (если нужно)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)