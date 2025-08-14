from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from dotenv import load_dotenv
import os

app = FastAPI()
load_dotenv()
origins = os.getenv("ALLOWED_CORS_ORIGINS", "").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # Vue's dev server URL
    allow_credentials=True,
    allow_methods=["*"],  # GET, POST, PUT, DELETE...
    allow_headers=["*"],  # Authorization, Content-Type...
)

UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True) # make the uploads directory if it's not yet made

@app.post("/api/upload-image")
async def upload_image(image: UploadFile = File(...)): # image required
    file_location = f"{UPLOAD_FOLDER}/{uuid4()}_{image.filename}" # maybe use CDN
    file_content = await image.read()

    with open(file_location, "wb") as f: # open file location and write the image to it
        f.write(file_content)

    return "completed"