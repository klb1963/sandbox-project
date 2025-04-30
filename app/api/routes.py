# app/api/routes.py

from fastapi import APIRouter
from app.api.companies.router import router as companies_router

router = APIRouter()
router.include_router(companies_router)  # OK