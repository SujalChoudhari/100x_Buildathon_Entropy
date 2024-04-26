import os
import dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain.chains import LLMChain
from langchain.memory import ConversationBufferMemory


class ChatBot:
    def __init__(self, temperature=0, model_name="Llama3-8b-8192"):
        # Initialize the chat model and memory
        self.chat = ChatGroq(temperature=temperature, model_name=model_name)
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )
        # Define the prompt template with memory
        self.prompt = ChatPromptTemplate.from_template(
            template=(
                "You are a sales chatbot whose primary purpose is to increase company sales using proposals provided to you. "
                "If the user has any query or needs help, you will address that and try to pitch a relevant proposal based on the information you have. "
                "Always respond in 2-3 lines; do not respond more than that. "
                "{chat_history} "
                "User said: {text}."
            )
            # The proposal provided to you is {proposal}.
        )
        # Combine memory with the LLMChain
        self.chain = LLMChain(llm=self.chat, prompt=self.prompt, memory=self.memory)

    def invoke(self, text, document_data):
        # Create input for the chain, including memory context and document data
        inputs = {
            "text": text + "\nRelated Data:\n" + document_data,
            "chat_history": self.memory,
        }
        # Get the AI response
        ai_response = self.chain(inputs)
        return ai_response["text"]


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
