# 100x_Buildathon_Entropy
Randomness

# CLEO - AI-Powered Sales Assistant

CLEO is a revolutionary tool designed to streamline the sales process by gathering customer data and generating tailored sales proposals efficiently. Combining advanced language models and speech recognition technology, it enables seamless interaction via voice or text inputs, making it ideal for live conversations and phone calls. The assistant engages users interactively, extracting essential details from documents provided by customers and performing information gap analysis to ensure proposal completeness. By automating tedious tasks and improving data accuracy, it empowers sales teams to focus on building strong customer relationships and closing deals effectively.

## Table of Contents
- [Overview and Architecture](#overview-and-architechture)
- [Installation](#installation)
- [Setup](#setup)
- [Usage](#usage)
- [API Documentation](#api-documentation)
- [Tech Stack](#tech-stack)

## Overview and Architecture

1. **Overview:**

   In response to the challenges faced by sales teams in gathering comprehensive customer data and generating tailored sales proposals efficiently, we propose the development of an AI-      powered Sales Assistant. This assistant leverages advanced language models (LLMs) and speech recognition technologies to streamline the sales process, enhance customer engagements,       and improve the accuracy and effectiveness of sales proposals.

   **Key Features:**

   - Voice Activation: The AI Sales Assistant supports both voice and text inputs, enabling seamless interaction during live conversations such as meetings and phone calls.
   - Interactive Engagement: Through intelligent questioning, the AI assistant engages with users to gather relevant customer data necessary for creating tailored sales proposals. By          dynamically adapting its queries based on the context of the conversation, the assistant ensures that no critical details are overlooked.
   - Document Analysis: The AI Sales Assistant possesses the capability to analyze documents provided by customers, such as PDF files, to extract essential information required for             drafting sales proposals. This feature eliminates manual data entry tasks and accelerates the proposal generation process by automatically capturing pertinent details.
   - Information Gap Analysis: To further enhance the accuracy and completeness of sales proposals, the assistant performs information gap analysis. By identifying any missing details         or  inconsistencies in the gathered data, the assistant prompts users to provide additional information necessary for completing the proposal accurately.
   - AI Voice Call: The AI Sales Assistant also offers an AI Voice Call feature, enabling communication between the assistant and the customer. With AI Voice Call, the AI Sales                Assistant proficiently pitches products and addresses customer queries with precision. Call summary, transcript and audio-recording is also accesible which is further stored and          used by the assistant. This streamlined process ensures efficient communication and empowers sales representatives to engage with customers effectively, fostering meaningful             interactions and driving sales growth.
   - Bulk Email Forwarding: Admin can send emails to multiple recipients with just a few clicks, streamlining communication and saving valuable time. Customers are informed about the          latest products and offerings of the company.
   - Context Aware Retrieval Chatbot: The chatbot has the capability that dynamically adapts responses based on the context of the conversation, ensuring relevant and accurate                 information delivery. It leverages retrieval augmented generation to retrieve pertinent data of the user as well as the company data, enhancing user engagement and satisfaction          while streamlining interactions.
   - Sales Proposal Generation: The AI Sales Assistant generates effective sales proposals based on previous chats, analytics and company documents. The proposal can be viewed in HTML          form on dashboard as well as pdf form to be downloaded by the company.
   - Analytics: The admin can view all the analytics of the companies customers and interaction.
2. **Architechture:**

   Architechture Diagram
![WhatsApp Image 2024-04-28 at 10 49 01 PM](https://github.com/SujalChoudhari/100x_Buildathon_Entropy/assets/128281067/dce4d192-fb6a-4c67-b4a2-6821a36757c7)

| Component            | Functionality                                                                        |
|----------------------|--------------------------------------------------------------------------------------|
| Admin Interface      | - Uploads embeddings to the database.                                                |
|                      | - Fetches and stores data.                                                            |
| Call Interface       | - Sends queries to the system.                                                        |
|                      | - Receives and processes responses.                                                   |
| Web UI Interface     | - Sends queries to the system.                                                        |
|                      | - Receives and processes responses.                                                   |
|                      | - Handles sales and analytics.                                                        |
| Embeddings           | - Stored in the database.                                                             |
| Fetch Data           | - Retrieves data from the database.                                                   |
|                      | - Parses data into text.                                                              |
| Use LLM for Answers  | - Utilizes a Large Language Model to generate answers.                                 |
| Real Time            | - System handles real-time interactions.                                               |
|                      | - Generates responses in real-time.                                                    |
| Call Based Interaction | - System handles interactions initiated through calls.                                 |
|                        | - Generates responses based on calls.                                                  |
| UI Based Interaction   | - System handles interactions initiated through the user interface.                    |
|                        | - Configures LLM settings.                                                             |
|                        | - Fetches appropriate responses.                                                       |
| End                    | - Indicates the end of the process.                                                    |


## Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/SujalChoudhari/100x_Buildathon_Entropy.git
   
2. **Install dependancies for the frontend:**

   ```sh
   cd frontend
   
   npm install
3. **Install dependancies for the backend:**

      ```sh
   cd backend

   pip install -r requirements.txt

## Setup

1. **Run the frontend:**
   
   - After installation navigate to the frontend directory.
   - Run the following command to start the frontend:

    ```sh
    npm run dev
    ```
    Open your web browser and go to http://localhost:3000 to access the application
2. **Run the backend:**
   
   - After installation navigate to the backend directory.
   - Locate the `.env.example` file.
   - Rename `.env.example` to `.env`.
   - Open the `.env` file in a text editor and fill in the required values for the environment variables.
   - Run the following command to start the backend:

    ```sh
    python main.py
## Usage

## Test Users:
### Normal User
- username: user
- email: user@example.com
- password: pass

### Admin
- username: admin
- email: admin@example.com
- hashed_password: pass

### Sales Team
- username: team
- email: team@example.com
- password: pass

## Demo:
- Video link - https://youtu.be/k3JLvRpqUhI
- Call Audio (Recorded) 


https://github.com/SujalChoudhari/100x_Buildathon_Entropy/assets/85174767/d1cbf54e-7aef-4fd7-9001-93f5903e25e9


- Images

![img](https://github.com/SujalChoudhari/100x_Buildathon_Entropy/blob/dev/resources/Screenshot%202024-04-28%20223345.png?raw=true)
![img](https://github.com/SujalChoudhari/100x_Buildathon_Entropy/blob/dev/resources/Screenshot%202024-04-28%20223410.png?raw=true)
![img](https://github.com/SujalChoudhari/100x_Buildathon_Entropy/blob/dev/resources/Screenshot%202024-04-28%20223637.png?raw=true)
![img](https://github.com/SujalChoudhari/100x_Buildathon_Entropy/blob/dev/resources/Screenshot%202024-04-28%20223842.png?raw=true)
![img](https://github.com/SujalChoudhari/100x_Buildathon_Entropy/blob/dev/resources/Screenshot%202024-04-28%20223859.png?raw=true)
![img](https://github.com/SujalChoudhari/100x_Buildathon_Entropy/blob/dev/resources/Screenshot%202024-04-28%20223918.png?raw=true)


## API Documentation

- Link: https://one00x-buildathon-entropy.onrender.com/docs

## Tech Stack
![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![Markdown](https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![Render](https://img.shields.io/badge/Render-%46E3B7.svg?style=for-the-badge&logo=render&logoColor=white) ![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white) ![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white) ![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white) ![FastAPI](https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi)![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) 
### Additional :
- Langchain
- Pinecone 
- Llama-3
## Demonstration Video
- Video link - https://youtu.be/k3JLvRpqUhI
