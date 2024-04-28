
from utils.vectorbase import query_index
async def respond(chatbot, message: str):
    # document_data = await query_index(message)
    # print(document_data)
    ai_msg = chatbot.invoke(text=message)
    print(ai_msg)
    return ai_msg
