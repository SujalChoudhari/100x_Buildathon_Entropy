import os
import dotenv
import requests
from langchain.prompts import ChatPromptTemplate
from langchain_groq.chat_models import ChatGroq
from langchain.globals import set_llm_cache
from langchain.cache import InMemoryCache
import pypandoc

set_llm_cache(InMemoryCache())
from langchain.chains import LLMChain
from utils.markdown_to_html import markdown_to_html_file
from utils.database import Database

dotenv.load_dotenv()
from langchain.chains.summarize import load_summarize_chain
from langchain.document_loaders import PyPDFLoader, PyPDFDirectoryLoader

os.environ["LANGCHAIN_TRACING_V2"] = "true"
os.environ["LANGCHAIN_API_KEY"] = os.getenv("LANGCHAIN_API_KEY")
chat = ChatGroq(temperature=0, model_name="Llama3-8b-8192")


def generate_proposal():
    files = os.listdir("./input_documents")
    if len(files) == 0:
        print("No files found in input_documents folder.")
        return {"message": "No files found in input_documents folder."}

    # Get the user's texts
    texts = get_user_texts()

    # Get the summary of the existing proposal
    summary = summarize_pdf("input_documents/")

    # Create a new LLMChain
    chain = LLMChain(llm=chat, prompt=prompt)

    # Generate the proposal
    md = chain.run({"user_queries": texts, "existing_proposal": summary})

    # Save the proposal
    save_proposal({"proposal": md})

    # Convert the proposal to HTML
    html = markdown_to_html_file(md)

    # # Save the proposal as a Markdown file
    # with open("all_documents/proposal.md", 'w', encoding='utf-8') as file:
    #     file.write(md)

    # Save the proposal as an HTML file
    with open("all_documents/proposal.html", "w", encoding="utf-8") as file:
        file.write(html)

    # Convert the proposal to PDF
    response = requests.post("https://md-to-pdf.fly.dev", data={"markdown": md})
    if response.status_code == 200:
        # Save the PDF
        with open("all_documents/proposal.pdf", "wb") as f:
            f.write(response.content)
    else:
        print(f"Conversion to pdf failed with status code {response.status_code}")

    return {"message": "Proposal generated successfully."}


def summarize_pdf(path):
    loader = PyPDFDirectoryLoader(path)
    docs = loader.load_and_split()
    chain = load_summarize_chain(chat, chain_type="refine")
    summary = chain.run(docs)
    return summary


def get_user_texts():
    db = Database("entropy")
    return db.get_texts_by_user_id("human")


def save_proposal(proposal_data):
    db = Database("entropy")
    db.save_proposal(proposal_data)


prompt = ChatPromptTemplate.from_template(
    template="""You work as the head of sales for a corporation. Your major goal is to enhance corporate revenue by creating
New sales proposals. Use the greatest sales strategies you know to boost sales.
You must develop new sales proposals based on user inquiries and existing proposals.
The proposal should include at least the following (one page per topic, verbosely):
1) Information about the firm
2) Clients
3) Our Solution
4) Benefits of Us
5) Pricing
6) Timeline(optional)
7) The next steps should include contact information and other relevant information.
You should include any other details that you believe are necessary.
The proposal should be in Markdown format.
To make the proposal more understandable, include headers, emphasis, lists, and tables wherever they are necessary.
While listing items, ensure they are tabulated and have appropriate titles.
Ensure that the table is properly formatted, with each row on a separate line.
Use the correct header sizes to make the proposal visually appealing and readable.
The following are the user's queries:
Only create according to these if you believe they are relevant.
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
    generate_proposal()
