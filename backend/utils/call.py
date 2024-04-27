import requests
import dotenv
import os

dotenv.load_dotenv()

url = "https://api.vapi.ai/call/phone"

headers = {
    "Authorization": f"Bearer {os.getenv('VAPI_API_KEY')}",
    "Content-Type": "application/json"
}


def handle_call(phone_number, name):
    payload = {
    "assistantId": "84f7f221-5260-4133-881f-ebf169be0b2f",
    "customer": {"number": phone_number, "name": name},
    "phoneNumber": {
        "twilioAuthToken": os.getenv("TWILIO_AUTH_TOKEN"),
        "twilioAccountSid": os.getenv("TWILIO_ACCOUNT_SID"),
        "twilioPhoneNumber": os.getenv("TWILIO_PHONE_NUMBER"),
    }
}
    response = requests.request("POST", url, json=payload, headers=headers)
    print(response.text)
    # return "Will be called shortly!"

# handle_call("+918291025964", "Surabhi")