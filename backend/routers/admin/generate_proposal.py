import os
import dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain.chains import LLMChain

from utils.database import Database
dotenv.load_dotenv()
from langchain.chains.summarize import load_summarize_chain
from langchain.document_loaders import PyPDFLoader,PyPDFDirectoryLoader
os.environ["LANGCHAIN_TRACING_V2"]="true"
os.environ["LANGCHAIN_API_KEY"]=os.getenv("LANGCHAIN_API_KEY")
chat = ChatGroq(temperature=0, model_name="Llama3-8b-8192")
def generate_proposal(current_user: dict):
    pass
def summarize_pdf(path):
    loader = PyPDFDirectoryLoader(path)
    docs = loader.load_and_split()
    chain = load_summarize_chain(chat, chain_type="refine")
    summary = chain.run(docs)   
    return summary

def get_user_texts():
    db=Database("entropy")
    return db.get_texts_by_user_id("human")
print(get_user_texts())
prompt=ChatPromptTemplate.from_template(
    template="""You are working at a company as head of sales . Your primary purose is to try to increase the company sales by generating 
    new sales proposals.Use best sales techniques that you know to increase the sales.
    You need to generate new sales proposals based on the user queries , existing proposal.
    The proposal should contain the following at minimum:
    1) Details about the Company
    2)Clients
    3) Our Solution
    4)Benefits of us 
    5)Pricing 
    6)Timeline(optional)
    7)Next steps(should contain contact details and other necessary information)

    The generated proposal should be in markdown format.
    The following is the user queries :
    Only generate according to these if you find them relevant.
    ---------------------------
        {user_queries}.
    -----------------------------
    This is the summary of the existing proposal:
    ---------------------------------
        {existing_proposal}.
    ---------------------------------


    """
)
summary=summarize_pdf("all_documents/")
texts=get_user_texts()
chain=LLMChain(llm=chat,prompt=prompt)
print(chain.run({"user_queries":texts,"existing_proposal":summary}))