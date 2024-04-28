from dotenv import load_dotenv
import bcrypt
from pydantic import BaseModel, EmailStr
from utils.database import Database
from routers.admin.generate_proposal import summarize_pdf
load_dotenv()

from fastapi import FastAPI, Depends, HTTPException, status
from starlette.middleware.sessions import SessionMiddleware
from fastapi.middleware.cors import CORSMiddleware

from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from datetime import timedelta
from jose import jwt, JWTError
import uvicorn
from utils.auth import (
    ALGORITHM,
    SECRET_KEY,
    authenticate_user,
    create_access_token,
    oauth2_scheme,
    get_user,
    users_db,
)

app = FastAPI()
app.add_middleware(SessionMiddleware, secret_key="some_secret_key")
app.add_middleware(
    CORSMiddleware, allow_origins=["*"], allow_methods=["*"], allow_headers=["*"]
)

# Routers
from routers.chat import router as chat_router
from routers.admin import router as admin_router

# Include Routers
app.include_router(chat_router)
app.include_router(admin_router)


# Token endpoint for login
@app.post("/token")
async def login(form_data: OAuth2PasswordRequestForm = Depends()):
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

# Endpoint for user registration
@app.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(user: UserRegister):
    # Check if the username already exists
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


# Endpoint to get the current user based on the token
@app.get("/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
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


# Endpoint to check user type
@app.get("/secure-route")
async def secure_endpoint(current_user: dict = Depends(read_users_me)):
    db = Database("entropy")
    await db.update_endpoint("/secure-route")
    return {"message": f"Hello, {current_user['username']}!"}


@app.get("/")
async def root():
    return {"message": "Hello World"}


# Run the server
if __name__ == "__main__":
    uvicorn.run("main:app", host="127.0.0.1", port=8000, reload=True)
