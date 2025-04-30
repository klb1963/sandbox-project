from fastapi.staticfiles import StaticFiles
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

# Подключаем фронтенд в проде
frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend/dist"))
if not os.path.exists(frontend_path):
    raise RuntimeError(f"❌ Static frontend path not found: {frontend_path}")
else:
    print(f"✅ Static frontend path found: {frontend_path}")

index_file = os.path.join(frontend_path, "index.html")
if not os.path.isfile(index_file):
    raise RuntimeError(f"❌ index.html not found at: {index_file}")
else:
    print(f"✅ index.html exists at: {index_file}")   

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

# Монтируем статику
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")