from utils.call import handle_call, latest_summary

def call(phone_number, name, system_prompt):
    handle_call(phone_number, name, system_prompt)


def get_latest_summary():
    return latest_summary()