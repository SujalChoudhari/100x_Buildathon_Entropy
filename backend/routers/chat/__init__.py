from fastapi import Depends, Request
from fastapi.routing import APIRouter
from utils.chatbot import ChatBot
from utils.database import Database

from .response import respond

router = APIRouter(
    prefix="/chat",
    tags=["chat"],
    responses={404: {"description": "Not found"}},
)

chatbots = {}  


def get_chatbot(request: Request):
    # Retrieve or create a ChatBot for the current session
    session_id = request.session.get("session_id")

    if session_id not in chatbots:
        chatbots[session_id] = ChatBot()

    return chatbots[session_id]

@router.get("/")
async def check():
    return {"message": "Hello World"}


@router.post("/response")
async def response(query: str, chatbot=Depends(get_chatbot)):
    db = Database("entropy")
    await db.update_endpoint("/chat/response")
    print(query)
    query = query.strip()
    return {"response": await respond(chatbot,query)}


@router.get("/close_session")
async def close_session(request: Request):
    session_id = request.session.get("session_id")
    if session_id in chatbots:
        del chatbots[session_id]

    #append your code here

    return {"message": "Session closed"}