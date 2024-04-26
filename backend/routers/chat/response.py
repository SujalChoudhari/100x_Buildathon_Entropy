from utils.chatbot import ChatBot

def respond(chatbot,message: str):

    human_msg,ai_msg =  chatbot.invoke(proposal="Sale on laptops",text=message)

    return ai_msg["content"]
