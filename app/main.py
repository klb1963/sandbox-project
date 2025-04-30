import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routes import router

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

# Подключаем API роуты с префиксом /api
app.include_router(router, prefix="/api")

# Разрешаем CORS для локального dev-фронтенда (если используешь Vite)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Подключаем фронтенд в проде
frontend_path = "/home/leonidk/sandbox-project/frontend/dist"
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")