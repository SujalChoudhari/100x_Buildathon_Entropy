# routers/admin.py
from fastapi import APIRouter, Depends
from .analytics import get_analytics
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")
router = APIRouter(
    prefix="/admin",
    tags=["admin"],
    responses={404: {"description": "Not found"}},
    dependencies=[Depends(oauth2_scheme)],
)

@router.get("/")
async def check():
    return {"message": "Admin Endpoint"}

@router.get("/analytics")
async def analytics():
    return get_analytics()
