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

    def insert_messages(self, messages):
        self.chats.insert_many(messages)

