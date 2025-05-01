# Genkit Workshop Guide

In this workshop, we're creating an AI research assitant, using RAG style to save our research papers and chat with them.

## 1. Creating a Firebase project
You need a Gmail account to follow the steps.
1. Go to the [Firebase console](https://console.firebase.google.com)
2. Click "Create a Firebase Project"
3. Follow the steps

## 2. Getting your Google Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/)
2. Click "Create API Key" then choose one of your projects, you should see the project you created earlier
3. Copy the key
4. Paste in your `.env` file

## 3. Run the starter project
1. Clone the project
2. Open it using your favorite editor
3. Run the command: `npm run start`

## 4. Create the first workflow
1. Checkout to the first step `git checkout 1/define-flow`
2. Check the new code at `src/index.ts`
3. Run the Genkit CLI (from the root of this project): `npm run genkit`