# Filtering key data to send to the frontend
import uuid


analytics_summary = {
    "averagePos": {
        "chartSeries": {"name": "Sales", "data": [6, 15, 10, 17]},
        "chartCategories": ["Sep 20", "Sep 21", "Sep 22", "Sep 23"],
        "avgCount": "5.8",
        "avgPos": "+2.5%",
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
        "chartSeries": {"name": "Visitors", "data": [6, 15, 10, 17, 20, 10, 15]},
        "chartCategories": ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"],
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
        "perday": [1, 2, 3, 5, 0, 14, 7, 0, 1, 1, 1, 4, 30, 19],
        "percountry": {
            "India": 60,
            "USA": 30,
            "UK": 10,
            "Germany": 5,
            "France": 3,
            "Spain": 3,
            "Unknown": 1,
        },
    },
    "users": [
        {
            "name": "Astol P",
            "status": "success",
            "country": "India",
            "dealValue": "10,000",
        },
        {
            "name": "Lisa M",
            "status": "success",
            "country": "USA",
            "dealValue": "25,000",
        },
        {
            "name": "Jorge R",
            "country": "Brazil",
            "dealValue": "15,000",
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
