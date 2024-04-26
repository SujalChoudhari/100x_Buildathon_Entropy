from fastapi import FastAPI
import uvicorn
app = FastAPI()

from routers.chat import router as chat_router

@app.get("/")
async def root():
    return {"message": "Hello World"}


# routers

app.include_router(chat_router)

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000,reload=True)