from fastapi import APIRouter

router = APIRouter()

@router.get("/status")
async def status():
    return {"status": "Service is running"}