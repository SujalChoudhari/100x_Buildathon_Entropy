import os
import dotenv
from langchain.prompts import ChatPromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain.globals import set_llm_cache
from langchain.cache import InMemoryCache

set_llm_cache(InMemoryCache())
from langchain.chains import LLMChain
from utils.markdown_to_html import markdown_to_html_file
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

def save_proposal(proposal_data):
    db=Database("entropy")
    db.save_proposal(proposal_data)
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
    You should add any other details that you think should be necessary.
    The generated proposal should be in markdown format.
    You should use headers ,emphasis,list, images and tables wherever they are required to make the proposal more readable.
    While you are listing products make sure they are tabulated and have proper headings.
    Ensure that the table is formulated properly with each row on a new line.
    Use proper heading sizes to make the proposal look pretty and readable.
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

if __name__ == "__main__":
    summary = summarize_pdf("input_documents/")
    texts = get_user_texts()
    chain = LLMChain(llm=chat, prompt=prompt)
    md = chain.run({"user_queries": texts, "existing_proposal": summary})
    save_proposal({"proposal": md})
    html = markdown_to_html_file(md)
    with open("all_documents/proposal.html", 'w', encoding='utf-8') as file:
        file.write(html)
