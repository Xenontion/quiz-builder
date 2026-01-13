# Quiz Builder - Full Stack Quiz Creation Platform

A complete full-stack application for creating, managing, and viewing interactive quizzes with multiple question types.

## Features

- ✅ Create quizzes with multiple question types
- ✅ Support for Boolean (True/False), Input (Short Text), and Checkbox (Multiple Choice) questions
- ✅ Dashboard displaying all quizzes
- ✅ Quiz detail pages with read-only view
- ✅ Delete quizzes functionality
- ✅ Responsive design with Tailwind CSS
- ✅ Type-safe with TypeScript
- ✅ ESLint and Prettier configured

## Project Structure

```
quiz-builder/
├── backend/                 # Express.js + TypeScript + Prisma
│   ├── src/
│   │   ├── index.ts        # Main API server
│   │   └── seed.ts         # Database seed script
│   ├── prisma/
│   │   └── schema.prisma   # Database schema
│   ├── .env.example
│   └── package.json
├── frontend/               # Next.js + React + TypeScript
│   ├── src/
│   │   ├── pages/          # Next.js pages
│   │   ├── components/     # React components
│   │   ├── services/       # API client
│   │   ├── store/          # Zustand state management
│   │   └── styles/         # Global styles
│   ├── .env.example
│   └── package.json
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+ and npm
- Git

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from `.env.example`:
```bash
cp .env.example .env
```

The default `.env` uses SQLite at `file:./dev.db`

4. Set up the database:
```bash
npm run prisma:generate
npm run prisma:migrate
```

5. Seed sample data (optional):
```bash
npm run seed
```

6. Start the backend server:
```bash
npm run dev
```

The API will be running at `http://localhost:5000`

### Frontend Setup

1. In a new terminal, navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file from `.env.example`:
```bash
cp .env.example .env.local
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be running at `http://localhost:3000`

## API Endpoints

### Quizzes

- **POST** `/quizzes` - Create a new quiz
  ```json
  {
    "title": "My Quiz",
    "questions": [
      {
        "text": "Is JavaScript fun?",
        "type": "boolean"
      },
      {
        "text": "What is your name?",
        "type": "input"
      },
      {
        "text": "Select programming languages",
        "type": "checkbox",
        "options": ["Python", "JavaScript", "Go", "Rust"]
      }
    ]
  }
  ```

- **GET** `/quizzes` - Get all quizzes with question count
  ```json
  [
    {
      "id": 1,
      "title": "My Quiz",
      "questionCount": 3,
      "createdAt": "2026-01-13T10:00:00Z"
    }
  ]
  ```

- **GET** `/quizzes/:id` - Get a specific quiz with all questions
  ```json
  {
    "id": 1,
    "title": "My Quiz",
    "createdAt": "2026-01-13T10:00:00Z",
    "questions": [...]
  }
  ```

- **DELETE** `/quizzes/:id` - Delete a quiz
  ```json
  {
    "message": "Quiz deleted successfully",
    "id": 1
  }
  ```

## Frontend Pages

### Home Page (`/`)
Landing page with navigation to create and view quizzes.

### Create Quiz (`/create`)
Form to create a new quiz:
- Enter quiz title
- Dynamically add/remove questions
- Support for three question types with specific configurations
- Form validation with clear error messages

### Quiz List (`/quizzes`)
Display all quizzes with:
- Quiz title
- Number of questions
- View button to see full details
- Delete button with confirmation
- Delete animations and success messages

### Quiz Detail (`/quizzes/:id`)
Read-only quiz display:
- Quiz title and metadata
- All questions in a structured format
- Question types clearly labeled
- Options displayed for multiple choice questions

## Question Types

### Boolean (True/False)
Simple yes/no question type.

### Input (Short Text Answer)
Text input field for short answers.

### Checkbox (Multiple Choice)
Multiple choice with options. Users can select multiple correct answers.

## Code Quality

The project includes:
- **ESLint** - Code linting for consistent style
- **Prettier** - Code formatting
- **TypeScript** - Full type safety

### Backend Commands
```bash
npm run lint       # Check for linting errors
npm run lint:fix   # Fix linting errors
npm run format     # Format code with Prettier
```

### Frontend Commands
```bash
npm run lint       # Check for linting errors
npm run lint:fix   # Fix linting errors
npm run format     # Format code with Prettier
npm run type-check # Check TypeScript types
```

## Database

The project uses SQLite with Prisma ORM for database management.

### Database Schema

**Quiz Model**
- id (Int, Primary Key)
- title (String)
- createdAt (DateTime)
- updatedAt (DateTime)
- questions (Relation)

**Question Model**
- id (Int, Primary Key)
- quizId (Int, Foreign Key)
- text (String)
- type (String: 'boolean' | 'input' | 'checkbox')
- options (String, JSON stringified array for checkbox type)
- createdAt (DateTime)
- updatedAt (DateTime)

## Sample Quiz Data

The backend includes a seed script that creates two sample quizzes:

1. **General Knowledge Quiz**
   - True/False question
   - Input question
   - Multiple choice question

2. **JavaScript Basics**
   - True/False question
   - Input question
   - Multiple choice question

Run `npm run seed` in the backend directory to populate the database.

## Environment Variables

### Backend (.env)
```
DATABASE_URL="file:./dev.db"
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### Frontend (.env.local)
```
NEXT_PUBLIC_API_URL=http://localhost:5000
```

## Building for Production

### Backend
```bash
npm run build
npm start
```

### Frontend
```bash
npm run build
npm start
```

## Troubleshooting

### Backend won't start
- Ensure port 5000 is not in use
- Check that `.env` file exists and DATABASE_URL is correct
- Run `npm run prisma:migrate` to ensure database is initialized

### Frontend won't start
- Ensure port 3000 is not in use
- Check that `.env.local` file exists with correct `NEXT_PUBLIC_API_URL`
- Run `npm install` to ensure all dependencies are installed

### API connection errors
- Ensure backend is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in frontend `.env.local`
- Verify CORS settings in backend (`FRONTEND_URL` environment variable)

## License

MIT

## Author

Quiz Builder - 2026
