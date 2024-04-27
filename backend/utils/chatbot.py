import os
import dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

from utils.database import Database


class ChatBot:
    def __init__(self, temperature=0, model_name="Llama3-8b-8192"):
        self.chat = ChatGroq(temperature=temperature, model_name=model_name)
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )
        self.prompt = ChatPromptTemplate.from_template(
            template="""You are a sales chatbot whose primary purpose is to try to increase the company sales using proposals provided to you.
            If the user has any query or needs help you are also going to solve that query based upon the information you have and try to pitch a sales proposal
            that has been provided to you. Your primary objective is to help the users and increase the company sales as much as possible.
            Always respons in 2-3 lines , don not respond any more than that.
            Chat history:
            {chat_history}
            User said: {text}.
            """
        )
        self.chain = LLMChain(llm=self.chat, prompt=self.prompt, memory=self.memory)
        self.db = Database("entropy")

    def invoke(self, text, document_data=""):
        inputs = {
            "text": text + "Here are related documents from company:" + document_data,
            "chat_history": self.memory,
        }
        ai_response = self.chain(inputs)
        return ai_response["text"]

    def get_sessions_by_user_id(self, user_id, limit=10):
        return self.db.get_sessions_by_user_id(user_id, limit)

    def append_session(self, session):
        self.db.append_session(session)


def main():
    dotenv.load_dotenv()
    # Create the bot
    bot = ChatBot()

    # Add memory context
    response1 = bot.invoke("I am Sujal")
    print("Bot response 1:", response1)

    response2 = bot.invoke("What's my name?")
    print("Bot response 2:", response2)


if __name__ == "__main__":
    main()
