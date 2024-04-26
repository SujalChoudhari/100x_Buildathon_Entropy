import base64
from fastapi import UploadFile
from typing import List


def upload_to_db(files: List[UploadFile]):
    base64pdfs = [base64.b64encode(file.file.read()).decode() for file in files]

    ...
