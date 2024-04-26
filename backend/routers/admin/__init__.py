# routers/admin.py
import base64
from fastapi import APIRouter, Depends, UploadFile
from utils.auth import oauth2_scheme, is_admin, get_current_user
from typing import List

from .analytics import get_analytics
from .upload import upload_to_db
from .ingest import ingest

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
async def analytics(_: str = Depends(is_admin)):
    return get_analytics()


@router.post("/upload_pdf")
async def upload_pdf(pdf_files: List[UploadFile], _: str = Depends(is_admin)):
    return upload_to_db(pdf_files)


# ingest the pdfs
@router.post("/ingest")
async def ingest_pdfs(
    current_user: dict = Depends(get_current_user), _: str = Depends(is_admin)
):
    await ingest(current_user)
    return {"message": "Ingested", "status": "Done"}


@router.get("/generate_proposal")
async def generate_proposal(
    current_user: dict = Depends(get_current_user), _: str = Depends(is_admin)
):
    generate_proposal(current_user)
    pass
