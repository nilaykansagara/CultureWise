# CultureWise

An AI-powered HR tool that generates tailored interview questions based on company culture and job requirements.

## Features

- Upload or input company culture (PDF/text)
- Upload or input job requirements (PDF/text)
- Generate 50 categorized interview questions
- Real-time processing status updates
- Clean, responsive UI with sky blue theme

## Project Structure

```
culturewise/
├── frontend/          # React + Vite + TypeScript + Tailwind
└── backend/           # Node.js + Express + TypeScript
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file:
   ```
   PORT=3000
   NODE_ENV=development
   ```

4. Start development server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start development server:
   ```bash
   npm run dev
   ```

## Development

- Backend runs on: http://localhost:3000
- Frontend runs on: http://localhost:5173

## Tech Stack

- Frontend: Vite + React + TypeScript + Tailwind CSS
- Backend: Node.js + Express + TypeScript
- Theme: Sky blue shades (#cceeff, #66ccff, white) 