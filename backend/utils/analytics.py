# Filtering key data to send to the frontend
import uuid
from pymongo import MongoClient
import dotenv
dotenv.load_dotenv()
import os

analytics_summary = {
    "averagePos": {
        "chartSeries": {"name": "Sales", "data": [6, 15, 10, 17]},
        "chartCategories": ["Sep 20", "Sep 21", "Sep 22", "Sep 23"],
        "avgCount": "15.8",
        "avgPos": "+3.5%",
    },
    "analytics": {
        "chartSeries": [{"name": "Sales", "data": [6, 15, 10, 17, 20, 10, 15]}],
        "chartCategories": ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        "details": [
            {"title": "Users", "count": "12,060", "result": 12.5},
            {"title": "Sessions", "count": "30,000", "result": 5.56},
            {"title": "Bounce Rate", "count": "53%", "result": -1.5},
            {"title": "Session Duration", "count": "3m 10s", "result": -10.5},
        ],
    },
    "visitors": {
        "chartSeries": {
            "name": "Dribble",
            "data": [0, 0, 10, 30, 3, 1, 0, 13, 4],
        },
        "chartSeries2": {
            "name": "Linkedin",
            "data": [0, 0, 20, 10, 15, 60, 0, 0, 17],
        },
        "chartSeries3": {
            "name": "Twitter",
            "data": [2, 30, 15, 10, 34, 15, 0, 0, 10],
        },
        "chartCategories": ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
        "total": "3223",
        "inPercent": "+3.5%",
    },
    "sessionBrowser": [
        {
            "id": str(uuid.uuid4()),
            "icon": "Chrome",
            "title": "Google Chrome",
            "rate": 60,
            "visit": 3.19,
        },
        {
            "id": str(uuid.uuid4()),
            "icon": "Opera",
            "title": "Opera Browser",
            "rate": 10,
            "visit": -1.98,
        },
        {
            "id": str(uuid.uuid4()),
            "icon": "Yahoo",
            "title": "Yahoo Browser",
            "rate": 30,
            "visit": 2.23,
        },
    ],
    "sales": {
        "total": [1, 3, 5, 10, 10, 24, 37, 37, 38, 39, 40, 44, 70, 99],
        "perday": [10, 20, 30, 50, 0, 140, 70, 0, 10, 10, 10, 40, 300, 190],
        "percountry": [
            {"name": "India", "count": 60},
            {"name": "USA", "count": 30},
            {"name": "UK", "count": 10},
            {"name": "Germany", "count": 5},
            {"name": "France", "count": 3},
            {"name": "Spain", "count": 3},
            {"name": "Unknown", "count": 1},
        ],
        "number": "41,232",
        "smallNo": "+20.3%",
    },
    "users": [
        {
            "name": "Astol P",
            "status": "success",
            "country": "India",
            "dealValue": "10,000",
            "email": "astolp007@microsoft.com",
        },
        {
            "name": "Lisa M",
            "status": "success",
            "country": "USA",
            "dealValue": "25,000",
            "email": "lismaa@gmail.com",
        },
        {
            "name": "Jorge R",
            "country": "Brazil",
            "dealValue": "15,000",
            "status": "error",
            "email": "jorge492@microsoft.com",
        },
    ],
    "queries": [
        {
            "id": str(uuid.uuid4()),
            "keyword": "Admin Dashboard",
            "click": 1369,
            "value": 90,
        },
        {
            "id": str(uuid.uuid4()),
            "keyword": "Top Admin Dashboard",
            "click": 1003,
            "value": 80,
        },
        {
            "id": str(uuid.uuid4()),
            "keyword": "Admin Panel",
            "click": 1987,
            "value": 95,
        },
        {
            "id": str(uuid.uuid4()),
            "keyword": "Analytics Dashboard",
            "click": 1462,
            "value": 85,
        },
        {
            "id": str(uuid.uuid4()),
            "keyword": "Minimal Dashboard",
            "click": 986,
            "value": 75,
        },
    ],
}
 
# connection_string = os.getenv("CONNECTION_STRING")
# client = MongoClient(connection_string)
# db = client['entropy']
# collection = db['analytics_summary']
# collection.insert_one(analytics_summary)