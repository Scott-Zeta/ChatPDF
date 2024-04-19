# ChatPDF

## PostScript

As the services I use in the app are becoming greedy and cutting free/Pay as You Go features, I am unsure which day the app will cease to function due to a critical service not being supported. The app was developed when ChatGPT was still "young", and with the File Reading feature now embedded within ChatGPT, this app's lifespan is nearing its end. Thus, there will be no further updates.

## Overview and Business Case

ChatPDF leverages AI to enable efficient browsing and extraction of information from lengthy PDF documents through interactive chatting. This application is designed to address scenarios like that of my landlord needing to comprehend a complex 80-page document regarding local demolition plans. Typically, such documents contain vast amounts of extraneous information, making manual review time-consuming and tedious. ChatPDF simplifies this process, focusing only on the pertinent details the user requires.

<img src="screenshots/1701070287733.jpeg" width="500">

## Technologies Used

- **Programming Language**: TypeScript
- **Framework**: Next.js, Tailwind CSS
- **Database**: NeonDB, Pinecone
- **Authentication**: Clerk
- **Cloud Service**: AWS S3
- **Third-Party API**: OpenAI GPT-3.5 Turbo, OpenAI Ada v2
- **Subscription**: Stripe
- **Other Library**: Langchain

## Features and Workflow

1. **Efficient Landing Page**: Implements server-side rendering for a clean and simple landing page that enhances user experience and SEO.
   <img src="screenshots/Screenshot 2024-04-17 at 12.58.37.png" width="400">
2. **User-Friendly UI**: Interactive components are designed to be intuitive for all users.
   <img src="screenshots/Screenshot 2024-04-17 at 12.59.44.png" width="400">
   <img src="screenshots/Screenshot 2024-04-17 at 13.00.50.png" width="400">
3. **Secure Document Storage**: Documents uploaded by users are stored securely in AWS S3 Buckets for processing and online access.
4. **Text Extraction and Analysis**: Langchain extracts text from documents, segmenting them into manageable chunks for easier processing.
5. **Data Vectorisation**: Text chunks are converted into vector data using OpenAI Ada, which are then stored in Pinecone DB for quick retrieval.
6. **Intelligent Query Handling**: When users pose questions, the application embeds these into vectors and retrieves the most relevant text chunks from Pinecone DB by measuring vector distances.
   <img src="screenshots/Screenshot 2024-04-19 at 16.07.34.png" width="400">
7. **Accurate Response Generation**: The AI agent provides responses based on the relevant information extracted from the document chunks. It is programmed to refrain from answering if the document contains no relevant information.
8. **Data Privacy**: On user request to delete a conversation, corresponding data across AWS S3, Pinecone, and NeonDB are erased to ensure privacy.
   <img src="screenshots/Screenshot 2024-04-17 at 13.01.34.png" width="400">
9. **Resource Management**: Limits are set to prevent API abuse and manage resources effectively—users can hold up to three documents and send a maximum of 24 messages in 24 hours.
   <img src="screenshots/Screenshot 2024-04-17 at 13.06.08.png" width="400">
10. **Subscription System**: Includes a subscription system for commercial use, currently in Test Mode to allow for demonstration without real transactions.
    <img src="screenshots/Screenshot 2024-04-19 at 15.54.40.png" width="400">

## Usage

1. Visit the deployed URL: [chatpdf-sable.vercel.app](https://chatpdf-sable.vercel.app)
2. Read the statement, and create an account.
3. You can drag or select a PDF file into the upload drop zone. Once uploaded and processed, you will be redirected to the dialogues page with an opening chat session titled with your document's name.
4. Start asking the AI questions about the document. The AI will respond based on the content provided in the document.
