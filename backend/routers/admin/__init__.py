# routers/admin.py
from fastapi import APIRouter, Depends, HTTPException, status
from .analytics import get_analytics
from utils.auth import oauth2_scheme, is_admin
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
async def analytics(is_admin: str = Depends(is_admin)):
    if is_admin:
        return get_analytics()
    else:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Unauthorized, Required Admin Permissions",
            headers={"WWW-Authenticate": "Bearer"},
        )
