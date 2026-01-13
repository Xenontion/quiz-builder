## 🚀 Quick Start Guide - Quiz Builder

### Prerequisites
- Node.js 18+ and npm installed
- Git (optional, for version control)

### Fastest Setup (Windows)

1. **Run the setup script:**
   ```bash
   setup.bat
   ```

2. **Start Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```
   ✅ Backend running at `http://localhost:5000`

3. **Start Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```
   ✅ Frontend running at `http://localhost:3000`

4. **Open browser:**
   ```
   http://localhost:3000
   ```

---

### Fastest Setup (macOS/Linux)

1. **Run the setup script:**
   ```bash
   chmod +x setup.sh
   ./setup.sh
   ```

2. **Start Backend (Terminal 1):**
   ```bash
   cd backend
   npm run dev
   ```

3. **Start Frontend (Terminal 2):**
   ```bash
   cd frontend
   npm run dev
   ```

4. **Open browser:**
   ```
   http://localhost:3000
   ```

---

### Manual Setup

#### Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Setup database
npm run prisma:generate
npm run prisma:migrate

# Optional: Seed sample data
npm run seed

# Start server
npm run dev
```

#### Frontend Setup (New Terminal)

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

---

## ✨ Features

1. **Create Quizzes** - Navigate to `/create` to build interactive quizzes
2. **View All Quizzes** - Go to `/quizzes` to see all created quizzes
3. **Quiz Details** - Click on any quiz to view full details
4. **Delete Quizzes** - Remove quizzes you no longer need
5. **Multiple Question Types:**
   - ✅ True/False
   - ✅ Short Text Answer
   - ✅ Multiple Choice

---

## 🧪 Sample Data

Sample quizzes are automatically seeded during setup:
1. **General Knowledge Quiz** (3 questions)
2. **JavaScript Basics** (3 questions)

View them on the `/quizzes` page.

---

## 📋 Project Structure

```
quiz-builder/
├── backend/
│   ├── src/
│   │   ├── index.ts    (API endpoints)
│   │   └── seed.ts     (Sample data)
│   └── prisma/
│       └── schema.prisma (Database schema)
│
├── frontend/
│   ├── src/
│   │   ├── pages/       (Next.js pages)
│   │   ├── components/  (React components)
│   │   ├── services/    (API client)
│   │   └── store/       (Zustand state)
│
└── README.md (Full documentation)
```

---

## 🛠️ Useful Commands

### Backend

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Check code quality
npm run format     # Format code with Prettier
npm run seed       # Populate database with samples
```

### Frontend

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run lint       # Check code quality
npm run format     # Format code with Prettier
npm run type-check # Check TypeScript types
```

---

## 🐛 Troubleshooting

**Backend won't start?**
- Check port 5000 is not in use
- Delete `dev.db` and run `npm run prisma:migrate` again

**Can't connect to backend from frontend?**
- Ensure `NEXT_PUBLIC_API_URL=http://localhost:5000` in `frontend/.env.local`
- Restart the frontend development server

**Database errors?**
- Run `npm run prisma:migrate` in backend
- Or delete `dev.db` and run `npm run prisma:migrate` to start fresh

---

## 📚 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/quizzes` | Create a new quiz |
| GET | `/quizzes` | Get all quizzes |
| GET | `/quizzes/:id` | Get quiz details |
| DELETE | `/quizzes/:id` | Delete a quiz |
| GET | `/health` | Health check |

---

## 🎨 Technology Stack

**Backend:**
- Express.js - Web framework
- TypeScript - Type safety
- Prisma - ORM
- SQLite - Database
- ESLint & Prettier - Code quality

**Frontend:**
- Next.js - React framework
- React - UI library
- TypeScript - Type safety
- Tailwind CSS - Styling
- Zustand - State management
- Axios - HTTP client
- ESLint & Prettier - Code quality

---

Enjoy building quizzes! 🎉
