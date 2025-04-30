from fastapi import FastAPI
from app.api.routes import router
from fastapi.middleware.cors import CORSMiddleware

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

app.include_router(router, prefix="/api") 

@app.get("/")
async def root():
    return {"message": "Sandbox updated AGAIN!"}

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)