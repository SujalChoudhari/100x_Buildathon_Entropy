from pinecone import Pinecone
import os
from langchain.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain.llms import OpenAI
from langchain.chains.question_answering import load_qa_chain
from langchain_pinecone import PineconeVectorStore
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API keys for OpenAI and Pinecone
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
DIRECTORY = "./input_documents"
INDEX_NAME = "data"
# Set up Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)


# Embeddings and LLM setup
llm = OpenAI(openai_api_key=OPENAI_API_KEY)
embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")

# Class to handle PDF and Pinecone operations
class PDFProcessor:
    def __init__(self, index_name):
        self.index_name = index_name
        self.index = None

    def load_docs(self, directory):
        loader = PyPDFDirectoryLoader(directory)
        documents = loader.load()
        return documents

    def split_docs(self, documents, chunk_size=1000, chunk_overlap=20):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size, chunk_overlap=chunk_overlap
        )
        docs = text_splitter.split_documents(documents)
        return docs

    def create_index(self, docs):
        self.index = PineconeVectorStore.from_documents(
            docs,
            index_name=INDEX_NAME,
            embedding=embeddings
        )

    def load_existing_index(self):
        # if not Pinecone.index_exists(self.index_name):
        #     raise ValueError(f"Index {self.index_name} does not exist.")
        self.index = PineconeVectorStore.from_existing_index(
            self.index_name, embeddings
        )

    def get_similar_docs(self, query, k=2):
        if self.index is None:
            raise ValueError("Index is not initialized.")
        return self.index.similarity_search(query, k=k)

    def get_answer(self, query, chain):
        relevant_docs = self.get_similar_docs(query)
        response = chain.run(input_documents=relevant_docs, question=query)
        return response

# Function to create the index and store it on Pinecone
async def ingest_dir():
    pdf = PDFProcessor(INDEX_NAME)
    documents = pdf.load_docs(DIRECTORY)
    docs = pdf.split_docs(documents)
    pdf.create_index(docs)
    print(pdf.index_name)
    return pdf.index_name

# Function to query the existing Pinecone index
async def query_index(question):
    pdf = PDFProcessor(INDEX_NAME)
    pdf.load_existing_index()
    chain = load_qa_chain(llm, chain_type="stuff")
    response = pdf.get_answer(question, chain)
    return response