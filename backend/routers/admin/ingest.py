from langchain.document_loaders import PyPDFDirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.llms import OpenAI
from langchain.embeddings.sentence_transformer import SentenceTransformerEmbeddings
from langchain.chains.question_answering import load_qa_chain
from langchain_pinecone import PineconeVectorStore

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

HUGGINGFACEHUB_API_TOKEN = os.getenv("HUGGING_FACE_API_TOKEN")

os.environ["OPENAI_API_KEY"] = os.getenv("OPENAI_API_KEY")
os.environ["PINECONE_API_KEY"] = os.getenv("PINECONE_API_KEY")

llm = OpenAI(openai_api_key=os.getenv("OPENAI_API_KEY"))
embeddings = SentenceTransformerEmbeddings(model_name="all-MiniLM-L6-v2")


class PDF:
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

    def create_index(self, docs, embeddings):
        index = PineconeVectorStore.from_documents(
            docs, index_name="data", embedding=embeddings
        )
        return index

    def get_similiar_docs(self, query, index, k=2):
        similar_docs = index.similarity_search(query, k=k)
        return similar_docs

    def get_answer(self, query, chain, index):
        relevant_docs = self.get_similiar_docs(query, index)
        response = chain.run(input_documents=relevant_docs, question=query)
        return response


async def ingest(currentUser: dict):
    directory = "Docs/"
    pdf = PDF()
    documents = pdf.load_docs(directory)
    docs = pdf.split_docs(documents)
    index = pdf.create_index(docs, embeddings)
    chain = load_qa_chain(llm, chain_type="stuff")
    ans = pdf.get_answer("My laptop is overheating. What do I do?", chain, index)
    print(ans)
    pass
