from fastapi import FastAPI
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

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Welcome to the sandbox!"}