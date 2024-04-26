# utils/auth.py
from datetime import datetime, timedelta
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import JWTError, jwt
from passlib.context import CryptContext
from typing import Optional

# JWT and OAuth2 configurations
SECRET_KEY = "mysecretkey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 69

USER_TYPE_USER = "user"
USER_TYPE_TEAM = "team"
USER_TYPE_ADMIN = "admin"

# Password hashing context
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


# User database (mock)
users_db = {
    "user@example.com": {
        "username": "user",
        "email": "user@example.com",
        "hashed_password": pwd_context.hash("pass"),
        "disabled": False,
        "type": USER_TYPE_USER,
    },
    "admin@example.com": {
        "username": "admin",
        "email": "admin@example.com",
        "hashed_password": pwd_context.hash("pass"),
        "disabled": False,
        "type": USER_TYPE_ADMIN,
    },
    "team@example.com": {
        "username": "team",
        "email": "team@example.com",
        "hashed_password": pwd_context.hash("pass"),
        "disabled": False,
        "type": USER_TYPE_TEAM,
    },
}


# Utility functions
def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db, username: str):
    return db.get(username, None)


def authenticate_user(username: str, password: str):
    user = get_user(users_db, username)
    if not user or not verify_password(password, user["hashed_password"]):
        return None
    return user


def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
        to_encode.update({"exp": expire})
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


def get_current_user(token: str = Depends(oauth2_scheme)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
        token_data = {"username": username}
    except JWTError:
        raise credentials_exception
    user = get_user(users_db, username=token_data["username"])
    if user is None:
        raise credentials_exception
    return user


def is_admin(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        print(payload.get("sub"))
        user = get_user(users_db, payload.get("sub"))
        if user["type"] == USER_TYPE_ADMIN:
            return True
        else:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Unauthorized, Required Admin Permissions",
                headers={"WWW-Authenticate": "Bearer"},
            )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
