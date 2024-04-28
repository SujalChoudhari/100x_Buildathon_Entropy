from dotenv import load_dotenv
import os
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain.chains import LLMChain

from langchain_core.prompts import (
    ChatPromptTemplate,
)
from langchain.memory import ConversationBufferMemory
from pymongo import MongoClient
from langchain.memory import ConversationBufferWindowMemory
class ChatBot:
    def __init__(self, temperature=0, model_name="Llama3-8b-8192"):
        self.chat = ChatGroq(temperature=temperature, model_name=model_name)
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)
        self.prompt = ChatPromptTemplate.from_template(
            template="""You are a sales chatbot whose primary purpose is to try to increase the company sales using proposals provided to you.
            If the user has any query or needs help you are also going to solve that query based upon the information you have and try to pitch a sales proposal
            that has been provided to you. Your primary objective is to help the users and increase the company sales as much as possible.
            Always respond in 2-3 lines , do not respond any more than that.
            The proposal provided to you is {proposal}. 
            The human text is {text}.
            """,
        )
        self.chain = self.prompt | self.chat

    def invoke(self, proposal, text):
        human_message = {'type': 'Human', 'content': text}
        ai_response = self.chain.invoke({"proposal": proposal, "text": text})
        ai_message = {'type': 'AI', 'content': ai_response.content}
        return human_message, ai_message

class Database:
    def __init__(self, uri, db_name):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.chats = self.db['chats']

    def insert_messages(self, messages):
        self.chats.insert_many(messages)

def main():
    load_dotenv()
    connection_string= os.getenv('CONNECTION_STRING')
    bot = ChatBot()
    human_message, ai_message = bot.invoke("Sale on laptops", "I want to buy a laptop")

    db = Database(connection_string, 'entropy')
    db.insert_messages([human_message, ai_message])

if __name__ == "__main__":
    main()