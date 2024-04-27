from pinecone import Pinecone
import os
from langchain.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.llms import OpenAI
from langchain_pinecone import PineconeVectorStore
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain.retrievers.multi_query import MultiQueryRetriever
from langchain_openai import ChatOpenAI
from langchain_groq.chat_models import ChatGroq
from dotenv import load_dotenv
import asyncio

# Load environment variables
load_dotenv()

# API keys for OpenAI and Pinecone
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
INDEX_NAME = "data"
DIRECTORY = "input_documents"
from langchain_cohere import CohereEmbeddings

os.environ["COHERE_API_KEY"] = os.getenv("COHERE_API_KEY")
# Set up Pinecone
pc = Pinecone(api_key=PINECONE_API_KEY)

# Embeddings and LLM setup
llm = ChatGroq(temperature=0, model_name="Llama3-8b-8192")
embeddings = CohereEmbeddings()
llm2 = ChatOpenAI(temperature=0)


# Class to handle PDF and Pinecone operations
class PDFProcessor:
    def __init__(self, index_name):
        self.index_name = index_name
        self.index = None

    def load_docs(self, directory):
        loader = PyPDFDirectoryLoader(directory)
        documents = loader.load()
        return documents

    def split_docs(self, documents, chunk_size=1000, chunk_overlap=180):
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size, chunk_overlap=chunk_overlap
        )
        docs = text_splitter.split_documents(documents)
        return docs

    def create_index(self, docs):
        self.index = PineconeVectorStore.from_documents(
            docs, index_name=self.index_name, embedding=embeddings
        )

    def load_existing_index(self):
        # if not Pinecone.index_exists(self.index_name):
        #     raise ValueError(f"Index {self.index_name} does not exist.")
        self.index = PineconeVectorStore.from_existing_index(
            self.index_name, embeddings
        )

    # def get_similar_docs(self, query, k=2):
    #     if self.index is None:
    #         raise ValueError("Index is not initialized.")
    #     return self.index.similarity_search(query, k=k)

    # def get_answer(self, query, chain):
    #     relevant_docs = self.get_similar_docs(query)
    #     response = chain.run(input_documents=relevant_docs, question=query)
    #     return response
    def retrieve(self, question):
        retriever_from_llm = MultiQueryRetriever.from_llm(
            retriever=self.index.as_retriever(), llm=llm
        )
        response = retriever_from_llm.invoke(question)
        return response


# Function to create the index and store it on Pinecone
async def ingest_dir():
    pdf = PDFProcessor(INDEX_NAME)
    documents = pdf.load_docs(DIRECTORY)
    # print(documents)
    docs = pdf.split_docs(documents)
    pdf.create_index(docs)
    print(pdf.index_name)
    return pdf.index_name


# Function to query the existing Pinecone index
async def query_index(question):
    pdf = PDFProcessor(INDEX_NAME)
    pdf.load_existing_index()
    # chain = load_qa_chain(llm, chain_type="stuff")
    # response = pdf.get_answer(question, chain)
    # print(response)
    # return response
    valid_content = ""
    response = pdf.retrieve(question)
    for doc in response:
        valid_content += "\n-----\n" + doc.page_content
    return valid_content


# async def main():
#     question = "OverHeating laptops"

#     answer = await query_index(question)
#     for doc in answer:
#         print(str(doc.metadata["page"]) + ":", doc.page_content[:300])


# # Call the main function within an event loop
# asyncio.run(main())
