# app/api/routes.py

from fastapi import APIRouter
from app.api.companies.router import router as companies_router
from app.api.vacancies.router import router as vacancies_router

router = APIRouter()
router.include_router(companies_router)
router.include_router(vacancies_router)