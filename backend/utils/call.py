import requests
import dotenv
import os

dotenv.load_dotenv()

def handle_call(phone_number, name, system_prompt):
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

def latest_summary():
    url = "https://api.vapi.ai/call"
    headers = {"Authorization": f"Bearer {os.getenv('VAPI_API_KEY')}"}
    response = requests.get(url, headers=headers)
    
    if response.status_code == 200:
        res = response.json()
        print(res[0]["summary"])
        return res[0]["summary"]
    else:
        return "Error!"

# handle_call("+918291025964", "Surabhi", "system_prompt")