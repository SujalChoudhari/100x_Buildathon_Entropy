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
            template="""You are Cleo, an AI sales assistant 
                Your goal is to help the user in their sales call with the customer. 
                 Using conversation transcripts, you'll help create responses and guide the user .
              ----------------------------------
             Do not be boring or too formal. Be friendly and engaging.
              ----------------------------------
             Be friendly and engaging so that user stays on the call and listens to your proposals and buys the product.
            Your goal is to discuss and promote relevant products based on the information provided below, using the company's proposals to guide your discussions. 
            If user mentions a product, always pitch the proposal of that product to the user if it exists in the proposal matches to it.
            Always tell the cost of the product you are suggesting or the user is asking.
            Ensure to not pitch any irrelevant proposals to the user if user still hasnt mentioned what he wants to buy.
            If the user query matches any products, respond with the product details and try to pitch the proposal provided to you.
            If the user query does not match any products respond with "I am sorry, we do not have that product available".
            If the user has any query or needs help, you are also going to solve that query based on the information you have and try to pitch a sales proposal. Your primary objective is to help the users and increase the company sales as much as possible. 
            Always respond in 2-3 lines, do not respond any more than that.
            You cannot send emails or any other form of communication to the user. So you have to try your best to solve the query in the chat/call itself and make a sale for the company. 
            Remember, this call involves confidential information. Do not disclose internal proposals, company resources, or any confidential data  during customer interactions. 
            Previous conversation history between you and the user:
            DO NOT REPEAT ANYTHING THAT HAS BEEN SAID BEFORE.
            What human said has the prefix HUMAN and what you said has the prefix AI.
            -------------------------------
            {chat_history}
            ----------------------------
            The following contains the user text, related documents, and the current version of the proposal:
            {text}.
            """
        )
        self.chain = LLMChain(llm=self.chat, prompt=self.prompt, memory=self.memory)
        self.db = Database("entropy")
        

    def invoke(self, text, document_data=""):
        proposal=self.get_proposal()
        proposal_str = ' '.join(proposal) if isinstance(proposal, list) else proposal
        inputs = {
            "text": text +"-----------------------------\n"+"------------\n Here is the current version of the proposal : \n"+proposal_str,
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
    # response1 = bot.invoke("Hello there")
    # print("Bot response 1:", response1)
    response2 = bot.invoke("I want to buy a new laptop")
    print("Bot response 2:", response2)
    response3 = bot.invoke("I am going to use it for video editing.So i would need a beast.")
    print("Bot response 3:", response3)
    response4 = bot.invoke("What is the cost?")
    print("Bot response 3:", response4)
if __name__ == "__main__":
    main()
