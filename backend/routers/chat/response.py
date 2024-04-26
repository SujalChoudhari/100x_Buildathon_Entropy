
def respond(chatbot, message: str):

    ai_msg = chatbot.invoke(text=message)

    return ai_msg
