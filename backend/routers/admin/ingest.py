from utils.vectorbase import ingest_dir


async def ingest(current_user):
    await ingest_dir()
    return {"message": "Ingested"}