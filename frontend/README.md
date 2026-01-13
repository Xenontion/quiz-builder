# Frontend - Quiz Builder React App

Next.js + React + TypeScript frontend for the Quiz Builder platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env.local` file:
```bash
cp .env.example .env.local
```

3. Start the development server:
```bash
npm run dev
```

The app will be running at `http://localhost:3000`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors
- `npm run format` - Format code with Prettier
- `npm run type-check` - Check TypeScript types

## Pages

- `/` - Home page
- `/create` - Create a new quiz
- `/quizzes` - View all quizzes
- `/quizzes/:id` - View quiz details

## Components

- `Layout` - Main layout wrapper with navigation
- `QuestionInput` - Form component for adding questions
- `QuestionDisplay` - Component for displaying questions in read-only mode

## State Management

Uses Zustand for quiz creation form state management in `/src/store/quizStore.ts`

## API Integration

API client in `/src/services/api.ts` handles all backend communication with proper TypeScript types.

## Styling

Tailwind CSS with custom global styles in `/src/styles/globals.css`
