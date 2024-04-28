import requests
import dotenv
import os
from database import Database

dotenv.load_dotenv()

async def handle_call(phone_number, name, system_prompt):
    payload = {"assistant": {
        "transcriber": {"provider": "deepgram"},
        "model": {
            "provider": "openai",
            "model": "gpt-3.5-turbo",
            "messages": [
                {
                    "role": "assistant",
                    "content": system_prompt
                }
            ]
        },
        "voice": {
            "provider": "azure",
            "voiceId": "emma"
        },
        "firstMessage": "Hello, this is Cleo from Entropy. How can I assist you today?",
        "endCallFunctionEnabled": True,
        "endCallMessage": "Happy to help! Goodbye!"
    },
    "customer": {"number": phone_number, "name": name},
        "phoneNumber": {
        "twilioAuthToken": os.getenv("TWILIO_AUTH_TOKEN"),
        "twilioAccountSid": os.getenv("TWILIO_ACCOUNT_SID"),
        "twilioPhoneNumber": os.getenv("TWILIO_PHONE_NUMBER"),
         }
    }

    url = "https://api.vapi.ai/call/phone"
    headers = {
    "Authorization": f"Bearer {os.getenv('VAPI_API_KEY')}",
    "Content-Type": "application/json"
    }

    response = requests.request("POST", url, json=payload, headers=headers)
    print(response.text)
    # return "Will be called shortly!"

async def user_messages_latest():
    url = "https://api.vapi.ai/call"
    headers = {"Authorization": f"Bearer {os.getenv('VAPI_API_KEY')}"}
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        res = response.json()
        user_msg = []
        for message in res[0]["messages"]:
            if message["role"] == "user":
                user_msg.append(message["message"])
        return user_msg
    else:
        return "Error!"

async def insert_user_message_db():
    db = Database("entropy")
    user_msg = await user_messages_latest()
    arr = []
    for msg in user_msg:
        arr.append({"user": "human", "message": msg})
    print(arr)
    db.insert_call_chats({"sessions": arr})