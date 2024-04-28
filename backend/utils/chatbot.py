import os
import dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory

from database import Database

class ChatBot:
    def __init__(self, temperature=0, model_name="Llama3-8b-8192"):
        self.chat = ChatGroq(temperature=temperature, model_name=model_name)
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )
        self.prompt = ChatPromptTemplate.from_template(
            template="""You are a sales assistant whose primary purpose is to try to increase the company sales using proposals provided to you.
            If the user has any query or needs help you are also going to solve that query based upon the information you have and try to pitch a sales proposal
            that has been provided to you. Your primary objective is to help the users and increase the company sales as much as possible.
            Always respons in 2-3 lines , don not respond any more than that.
            You are to behave as you are on a live call , so your responses should be natural and use words like hmmm, I understand, etc. to keep it natural when you dont understand anything.
            You cannot send emails or any other form of communication to the user.
            So you have to try your best to solve the query in the chat/call itself and make a sale for the company.
            Chat history:
            {chat_history}

            The following conatins the user text ,related documents and the current version of the proposal:
             {text}.
            """
        )
        self.chain = LLMChain(llm=self.chat, prompt=self.prompt, memory=self.memory)
        self.db = Database("entropy")
        

    def invoke(self, text, document_data=""):
        proposal=self.get_proposal()
        proposal_str = ' '.join(proposal) if isinstance(proposal, list) else proposal
        inputs = {
            "text": text + "Here are related documents from company:" + document_data+"Here is the current version of the proposal:"+proposal_str,
            "chat_history": self.memory,
        }

        ai_response = self.chain(inputs)

        # Store the AI's response in the session
        ai_response_dict = {"user": "AI", "message": ai_response["text"]}
        self.db.append_session(ai_response_dict)

        return ai_response["text"]

    def get_sessions_by_user_id(self, user_id, limit=10):
        return self.db.get_sessions_by_user_id(user_id, limit)
    
    def get_proposal(self):
        proposal= self.db.get_all_proposals()
        proposal_texts = [p['proposal'] for p in proposal]
        return proposal_texts

    def append_session(self, session):
        self.db.append_session(session)


def main():
    dotenv.load_dotenv()
    uri=os.getenv("CONNECTION_STRING")
    bot = ChatBot()
    response1 = bot.invoke("I want to buy a laptop")
    print("Bot response 1:", response1)
    response2 = bot.invoke("I am going to use it for gaming")
    print("Bot response 2:", response2)
    response3 = bot.invoke("Can u give me details about all options available?")
    print("Bot response 3:", response3)
    response4 = bot.invoke("I am getting a better deal from another company. So why should I chose you?")
    print("Bot response 4:", response4)


if __name__ == "__main__":
    main()
