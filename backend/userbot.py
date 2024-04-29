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
            Always respons in 2-3 lines , don not respond any more than that.
            {chat_history}
            The proposal provided to you is {proposal}. 
            
            The human text is {text}.
            """,
        )
        self.chain = self.prompt| self.chat

    def invoke(self, proposal, text, user_id,memory):
        human_message = {'user': user_id, 'message': text}
        ai_response = self.chain.invoke({"proposal": proposal, "text": text, "chat_history": memory})
        print(self.memory.chat_memory)
        ai_message = {'user': 'AI', 'message': ai_response.content}
        return [human_message, ai_message]

class Database:
    def __init__(self, uri, db_name):
        self.client = MongoClient(uri)
        self.db = self.client[db_name]
        self.chats = self.db['chats']

    def get_sessions_by_user_id(self, user_id, limit=10):
        # Get the existing document
        doc = self.chats.find_one()

        # Filter the sessions by user ID
        sessions = doc.get('sessions', [])
        user_sessions = [session for session in sessions if session['session'][0]['user'] == user_id]

        # Return only the last 'limit' sessions
        return user_sessions[-limit:]
    def append_session(self, session):
        # If there's no document, create one with an empty list
        if self.chats.count_documents({}) == 0:
            self.chats.insert_one({'sessions': []})

        # Get the existing document
        doc = self.chats.find_one()

        # Append the new session to the list of sessions
        sessions = doc.get('sessions', [])
        sessions.append(session)

        # Update the document
        self.chats.update_one({}, {'$set': {'sessions': sessions}})

def main():
    load_dotenv()
    connection_string= os.getenv('CONNECTION_STRING')
    bot = ChatBot()
    user_id = "siro"  # replace with actual user ID
    
    
    db = Database(connection_string, 'entropy')
    user_sessions = db.get_sessions_by_user_id(user_id)
    print(user_sessions)
    session = bot.invoke("Sale on laptops", "What is my name?", user_id, user_sessions)
    db.append_session({'session': session})
    print("--------------")
    print(session)

if __name__ == "__main__":
    main()
