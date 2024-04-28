from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from starlette.middleware.sessions import SessionMiddleware
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from pydantic import BaseModel, EmailStr
from datetime import timedelta
from jose import jwt, JWTError
import uvicorn
import bcrypt
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

# Custom imports
from utils.database import Database
from utils.auth import (
    ALGORITHM,
    SECRET_KEY,
    authenticate_user,
    create_access_token,
    oauth2_scheme,
    get_user,
    users_db,
)
from routers.chat import router as chat_router
from routers.admin import router as admin_router

desc = """
CLEO is a revolutionary tool designed to streamline the sales process by gathering customer data and generating tailored sales proposals efficiently.
Combining advanced language models and speech recognition technology, it enables seamless interaction via voice or text inputs, making it ideal for live conversations and phone calls.
The assistant engages users interactively, extracting essential details from documents provided by customers and performing information gap analysis to ensure proposal completeness.
By automating tedious tasks and improving data accuracy, it empowers sales teams to focus on building strong customer relationships and closing deals effectively.
## Overview:
In response to the challenges faced by sales teams in gathering comprehensive customer data and generating tailored sales proposals efficiently, we propose the development of an AI- powered Sales Assistant. This assistant leverages advanced language models (LLMs) and speech recognition technologies to streamline the sales process, enhance customer engagements, and improve the accuracy and effectiveness of sales proposals.
## Key Features:
- **Voice Activation**: The AI Sales Assistant supports both voice and text inputs, enabling seamless interaction during live conversations such as meetings and phone calls. This feature ensures accessibility and ease of use for sales representatives, allowing them to gather information and generate proposals in real-time.
- **Interactive Engagement**: Through intelligent questioning, the AI assistant engages with users to gather relevant customer data necessary for creating tailored sales proposals. By dynamically adapting its queries based on the context of the conversation, the assistant ensures that no critical details are overlooked.
- **Document Analysis**: The AI Sales Assistant possesses the capability to analyze documents provided by customers, such as PDF files, to extract essential information required for drafting sales proposals. This feature eliminates manual data entry tasks and accelerates the proposal generation process by automatically capturing pertinent details.
- **Information Gap Analysis**: To further enhance the accuracy and completeness of sales proposals, the assistant performs information gap analysis. By identifying any missing details or inconsistencies in the gathered data, the assistant prompts users to provide additional information necessary for completing the proposal accurately.
"""


openapi_tags = [
    {
        "name": "general",
        "description": """
# General API Endpoints

These endpoints cover user authentication, user registration, and basic interactions. Here's an overview of each endpoint's functionality:

## `POST /token`
This endpoint is used for user login. It validates the provided username and password using OAuth2, then returns a Bearer token for further authentication.

- **Request Parameters:** 
  - OAuth2PasswordRequestForm containing:
    - `username` (str): The username for login.
    - `password` (str): The password for login.
- **Response:** A JSON object with an `access_token` and `token_type`.
- **Error Handling:** If the login fails, it raises an HTTP 401 error with a "Bearer" authentication challenge.

## `POST /register`
This endpoint is used to register new users. It creates a new user with a hashed password and stores it in the database.

- **Request Parameters:** 
  - `UserRegister` model containing:
    - `username` (str): The desired username.
    - `email` (EmailStr): The user's email address.
    - `password` (str): The plain text password (will be hashed).
- **Response:** A JSON object indicating successful registration, with the username and email of the new user.
- **Error Handling:** If the username is already taken, it raises an HTTP 400 error.

## `GET /me`
This endpoint retrieves the current logged-in user's details based on the provided Bearer token.

- **Authorization:** Requires a Bearer token (provided via `oauth2_scheme`).
- **Response:** A JSON object with the user's details.
- **Error Handling:** If the token is invalid or the user cannot be found, it raises an HTTP 401 error.

## `GET /secure-route`
A secure endpoint that requires authentication. It returns a personalized greeting for the logged-in user.

- **Authorization:** Requires a Bearer token for authentication.
- **Response:** A JSON object with a personalized greeting, referencing the current user's username.

## `GET /`
A simple root endpoint that returns a basic greeting message.

- **Response:** A JSON object with a `"message"` key and the value `"Hello World"`.

    """,
    },
    {
        "name": "admin",
        "description": """
# Admin API Endpoints

This API is intended for administrative tasks related to managing documents, generating proposals, sending emails, and other operations. The following endpoints are available:

## `GET /admin/`
A simple health check for the `admin` router. It returns a basic message to indicate that the router is operational.

- **Response:** A JSON object with a `"message"` key and the value `"Admin Endpoint"`.

## `GET /admin/analytics`
Returns analytics data for administrative purposes. Requires admin-level authorization.

- **Authorization:** Requires admin privileges (`is_admin` dependency).
- **Response:** A JSON object containing analytics data.

## `POST /admin/upload_pdf`
Uploads a PDF file to the server. The PDF is processed and stored for later use. Requires admin authorization.

- **Authorization:** Requires admin privileges.
- **Request Parameters:** 
  - `pdf_file` (UploadFile): The PDF file to upload.
- **Response:** A JSON object with details of the upload status.

## `POST /admin/update_selected_docs`
Updates the list of selected documents. This endpoint checks whether the specified files exist before updating the list.

- **Authorization:** Requires admin privileges.
- **Request Parameters:** 
  - `filenames` (List[str]): List of document filenames to update.
- **Response:** A simple success message if the operation was successful.

## `GET /admin/ingest`
Ingests PDFs into the system for further processing. Requires admin authorization.

- **Authorization:** Requires admin privileges.
- **Response:** A JSON object with a `"message"` key and a status update.

## `GET /admin/generate_proposal`
Generates a proposal from previously uploaded documents. Requires admin authorization.

- **Authorization:** Requires admin privileges.
- **Response:** A JSON object with the generated proposal details.

## `GET /admin/get_selected_docs`
Returns the list of selected documents currently stored in the system. Requires admin authorization.

- **Authorization:** Requires admin privileges.
- **Response:** A JSON object with the list of selected document names.

## `GET /admin/get_all_docs`
Returns a list of all available documents in the system. Requires admin authorization.

- **Authorization:** Requires admin privileges.
- **Response:** A JSON object with the list of all document names.

## `POST /admin/send_bulk_email`
Sends bulk emails to a list of recipients using a specified template. Requires admin authorization.

- **Authorization:** Requires admin privileges.
- **Request Parameters:** 
  - `template` (str): The email template to use.
  - `email_list` (List[str]): List of email addresses to send to.
- **Response:** A JSON object with the result of the email operation.

## `POST /admin/call`
Initiates a call to a specified mobile number with a given template. Requires admin authorization.

- **Authorization:** Requires admin privileges.
- **Request Parameters:** 
  - `CallRequest` model containing:
    - `mobile` (str): The mobile number to call.
    - `template` (str): The template for the call.
- **Response:** A JSON object with the result of the call.

## `GET /admin/get_last_summary`
Returns the latest summary generated by the system. Requires admin authorization.

- **Authorization:** Requires admin privileges.
- **Response:** A JSON object with the most recent summary.

## `GET /admin/get_html_from_file`
Retrieves HTML content from a specified file. Requires admin authorization.

- **Authorization:** Requires admin privileges.
- **Request Parameters:** 
  - `file_name` (str): The name of the file to retrieve.
- **Response:** The content of the specified file, returned as HTML. Raises a 404 error if the file is not found.


    """,
    },
    {
        "name": "chat",
        "description": """

# Chat API Endpoints

This API allows for interaction with a chatbot and manages chat sessions. The following endpoints are available:

## `GET /chat/`
This endpoint is a simple health check for the `chat` router. It returns a "Hello World" message to indicate that the router is operational.

- **Response:** A JSON object with a `"message"` key and the value `"Hello World"`.

## `POST /chat/response`
This endpoint takes a text query and returns a response from the chatbot. The chatbot instance is tied to the session, allowing for context-aware interactions.

- **Request Parameters:**
  - `query` (str): The text query to send to the chatbot.
- **Response:** A JSON object with a `"response"` key containing the chatbot's response to the query.

## `GET /chat/close_session`
This endpoint closes the current chat session, removing the associated chatbot instance. It is useful for cleaning up session-related data when no longer needed.

- **Response:** A JSON object with a `"message"` key and the value `"Session closed"`.

""",
    },
]
app = FastAPI(
    title="CLEO API",
    description=desc,
    openapi_tags=openapi_tags,
    version="1.0.0",
    contact={
        "name": "Team Entropy",
        "url": "https://github.com/SujalChoudhari/100x_Buildathon_Entropy",
    },
)

app.add_middleware(SessionMiddleware, secret_key="some_secret_key")
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://cleo.sujal.xyz",
        "https://cleo-entropy.vercel.app",
        "http://localhost:3000",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(chat_router)
app.include_router(admin_router)


@app.post("/token", tags=["general"])
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
    """
    Obtain a Bearer token for login.

    Use the OAuth2 authentication scheme to validate the username and password.
    Returns an access token to be used for further authentication.
    """
    db = Database("entropy")
    await db.update_endpoint("/token")
    user = authenticate_user(form_data.username, form_data.password)

    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    access_token_expires = timedelta(minutes=360)
    access_token = create_access_token(
        data={"sub": user["email"]}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


class UserRegister(BaseModel):
    username: str
    email: EmailStr
    password: str  # Plain text password (will be hashed before storing)


@app.post("/register", status_code=status.HTTP_201_CREATED, tags=["general"])
async def register_user(user: UserRegister):
    """
    Register a new user.

    Expects a `UserRegister` model containing a username, email, and password.
    The password is hashed before storing in the database. If the username is
    already taken, an HTTP 400 error is raised.
    """
    db = Database("entropy")
    await db.update_endpoint("/register")

    if user.username in users_db:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken",
        )

    # Hash the password
    hashed_password = bcrypt.hashpw(user.password.encode("utf-8"), bcrypt.gensalt())

    # Store the new user in the database
    users_db[user.username] = {
        "username": user.username,
        "email": user.email,
        "hashed_password": hashed_password,
    }

    return {
        "message": "User registered successfully",
        "username": user.username,
        "email": user.email,
    }


@app.get("/me",tags=["general"])
async def read_users_me(token: str = Depends(oauth2_scheme)):
    """
    Retrieve the current logged-in user based on the provided token.

    Requires a Bearer token for authentication. If the token is invalid or the user
    cannot be found, an HTTP 401 error is raised.
    """
    db = Database("entropy")
    await db.update_endpoint("/me")

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")

        if not username:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        user = get_user(users_db, username)

        if user is None:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Could not validate credentials",
                headers={"WWW-Authenticate": "Bearer"},
            )

        return user

    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )


@app.get("/secure-route", tags=["general"])
async def secure_endpoint(current_user: dict = Depends(read_users_me)):
    """
    A secure endpoint that requires authentication.

    Returns a personalized greeting for the logged-in user.
    """
    db = Database("entropy")
    await db.update_endpoint("/secure-route")

    return {"message": f"Hello, {current_user['username']}!"}


@app.get("/", tags=["general"])
async def root():
    """
    A simple root endpoint that returns a greeting message.
    """
    return {"message": "Hello World"}

asyncio.run(cb.invoke("Hello", ""))

# Run the server
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
