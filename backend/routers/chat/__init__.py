from fastapi.routing import APIRouter

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
    responses={404: {"description": "Not found"}},
)

@router.get("/")
async def check():
    return {"message": "Hello World"}


@router.get("/response")
async def response():
    # call the LLM to generate a response
    data = "hello world"
    return {"response": data}