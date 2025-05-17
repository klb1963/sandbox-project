from fastapi.staticfiles import StaticFiles
import os
import logging
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router


# Настройка логгера
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Подключаем фронтенд в проде
frontend_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "../frontend/dist"))

# ✅ Печатаем лог
logger.info("✅ Static frontend path found: %s", frontend_path)
logger.info("✅ index.html exists: %s", os.path.exists(os.path.join(frontend_path, "index.html")))

app = FastAPI(
    title="Sandbox Project API",
    redirect_slashes=True,  # 🔄 включаем глобально
    description="API для сбора вакансий и публикации в Telegram",
    version="0.1.0",
    docs_url="/docs",              # ✅ Swagger UI
    redoc_url="/redoc",            # ✅ ReDoc
    openapi_url="/openapi.json",   # ✅ OpenAPI spec
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
    allow_origins=[
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "http://localhost:5173",
        "https://sandbox.leonidk.de"
        ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Монтируем статику
app.mount("/", StaticFiles(directory=frontend_path, html=True), name="frontend")