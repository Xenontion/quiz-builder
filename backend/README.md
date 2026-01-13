# Backend - Quiz Builder API

Express.js API for the Quiz Builder platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file:
```bash
cp .env.example .env
```

3. Set up database (SQLite):
```bash
npm run prisma:generate
npm run prisma:migrate
```

4. Seed sample data:
```bash
npm run seed
```

## Running

Development mode:
```bash
npm run dev
```

Production build:
```bash
npm run build
npm start
```

## Linting & Formatting

```bash
npm run lint
npm run lint:fix
npm run format
```

## API Endpoints

- `POST /quizzes` - Create a new quiz
- `GET /quizzes` - Get all quizzes
- `GET /quizzes/:id` - Get a specific quiz
- `DELETE /quizzes/:id` - Delete a quiz
- `GET /health` - Health check
