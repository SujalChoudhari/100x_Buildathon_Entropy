from utils.vectorbase import query_index
async def respond(chatbot, message: str):
    document_data = await query_index(message)
    print(document_data)
    ai_msg = chatbot.invoke(text=message,document_data=document_data[:400])
    return ai_msg
