from dotenv import load_dotenv
from langchain_core.prompts import ChatPromptTemplate
from langchain_groq import ChatGroq
from langchain_core.prompts import (
    ChatPromptTemplate,
)
from langchain.memory import ConversationBufferMemory


class ChatBot:
    def __init__(self, temperature=0, model_name="Llama3-8b-8192"):
        load_dotenv()
        self.chat = ChatGroq(temperature=temperature, model_name=model_name)
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )
        self.prompt = ChatPromptTemplate.from_template(
            template="""You are a sales chatbot whose primary purpose is to try to increase the company sales using proposals provided to you.
            If the user has any query or needs help you are also going to solve that query based upon the information you have and try to pitch a sales proposal
            that has been provided to you. Your primary objective is to help the users and increase the company sales as much as possible.
            Always respons in 2-3 lines , don not respond any more than that.
            The proposal provided to you is {proposal}. 
            The human text is {text}.
            """,
        )
        self.chain = self.prompt | self.chat

    def invoke(self, proposal, text):
        human_message = {"type": "Human", "content": text}
        ai_response = self.chain.invoke({"proposal": proposal, "text": text})
        ai_message = {"type": "AI", "content": ai_response.content}
        return human_message, ai_message


def main():
    bot = ChatBot()
    human_message, ai_message = bot.invoke("Sale on laptops", "I want to buy a laptop")
    print(human_message, ai_message)


if __name__ == "__main__":
    main()
