import dotenv
dotenv.load_dotenv()
import os,json
from utils.analytics import analytics_summary
connection=os.getenv("CONNECTION_STRING")
from pymongo import MongoClient

def get_analytics():
    # Create a client
    client = MongoClient(connection)

    # Connect to your database
    db = client['entropy']

    # Select your collection
    collection = db['analytics_summary']

    # Fetch all documents from the collection
    documents = collection.find()

    # Convert the documents to a list and return it
    return analytics_summary

# print(get_analytics())