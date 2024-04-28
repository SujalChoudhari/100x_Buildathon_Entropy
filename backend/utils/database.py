from pymongo import MongoClient
from dotenv import load_dotenv
import os


class Database:
    def __init__(self, db_name):
        load_dotenv()
        connection_string = os.getenv("CONNECTION_STRING")
        self.client = MongoClient(connection_string)
        self.db = self.client[db_name]
        self.chats = self.db["chats"]
        self.endpoints = self.db["endpoints"]

    def insert_messages(self, messages):
        self.chats.insert_many(messages)

    def update_endpoint(self, endpoint):
        filter_query = {"endpoint": endpoint}
        update_operation = {"$inc": {"count": 1}}
        self.endpoints.update_one(filter_query, update_operation, upsert=True)

    def insert_call_chats(self, messages):
        self.chats.insert_one(messages)