import os
from typing import List
from fastapi import UploadFile

def upload_to_db(file: UploadFile, destination_folder: str = "./all_documents"):
    # Ensure the folder exists
    if not os.path.exists(destination_folder):
        os.makedirs(destination_folder)

    # Save each file to the destination folder
    # Read file content
    content = file.file.read()

    # Get the original filename and create the full path
    file_path = os.path.join(destination_folder, file.filename)

    # Save the file content to the file system
    with open(file_path, "wb") as f:
        f.write(content)

    # Close the UploadFile's internal file to release resources
    file.file.close()

    return {"status": "success", "message": f"{file.filename} uploaded."}


import os
import shutil
from typing import List


def copy_files_if_exist(
    filenames: List[str], 
    source_folder: str = "./all_documents", 
    target_folder: str = "./input_documents"
):
    # Ensure the target folder exists
    if not os.path.exists(target_folder):
        os.makedirs(target_folder)
    else:
        # clear the target folder
        shutil.rmtree(target_folder)
        os.makedirs(target_folder)

    # Track the number of files copied
    copied_files = 0

    # Loop through the list of filenames
    for filename in filenames:
        source_path = os.path.join(source_folder, filename)
        target_path = os.path.join(target_folder, filename)

        # Check if the file exists in the source folder
        if os.path.exists(source_path):
            # Copy the file to the target folder
            shutil.copy(source_path, target_path)
            copied_files += 1  # Increment the counter for copied files

    # Return a summary of the operation
    return {
        "status": "success",
        "message": f"{copied_files} file(s) copied.",
        "missing_files": [filename for filename in filenames if not os.path.exists(os.path.join(source_folder, filename))]
    }


def get_list_of_all_docs() -> List[str]:
    # Get a list of all files in the source folder
    files = os.listdir("./all_documents")
    # Return the list of filenames
    return files

def get_list_of_selected_docs() -> List[str]:
    # Get a list of all files in the source folder
    files = os.listdir("./input_documents")
    # Return the list of filenames
    return files
