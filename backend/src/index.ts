import 'dotenv/config';
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();
const app: Express = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.json());

// Error handling middleware
app.use((err: unknown, _req: Request, res: Response, _next: NextFunction): void => {
  console.error(err);
  if (err instanceof z.ZodError) {
    res.status(400).json({ errors: err.errors });
    return;
  }
  res.status(500).json({ error: 'Internal server error' });
});

// Validation schemas
const CreateQuestionSchema = z.object({
  text: z.string().min(1, 'Question text is required'),
  type: z.enum(['boolean', 'input', 'checkbox']),
  options: z.array(z.string()).optional(),
});

const CreateQuizSchema = z.object({
  title: z.string().min(1, 'Quiz title is required'),
  questions: z.array(CreateQuestionSchema).min(1, 'At least one question is required'),
});

// Routes

// POST /quizzes - Create a new quiz
app.post('/quizzes', async (req: Request, res: Response) => {
  try {
    const body = CreateQuizSchema.parse(req.body);

    const quiz = await prisma.quiz.create({
      data: {
        title: body.title,
        questions: {
          create: body.questions.map((q) => ({
            text: q.text,
            type: q.type,
            options: q.options ? JSON.stringify(q.options) : null,
          })),
        },
      },
      include: {
        questions: true,
      },
    });

    res.status(201).json(quiz);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ errors: error.errors });
    }
    console.error(error);
    res.status(500).json({ error: 'Failed to create quiz' });
  }
});

// GET /quizzes - Get all quizzes with count of questions
app.get('/quizzes', async (_req: Request, res: Response) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      include: {
        _count: {
          select: { questions: true },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formattedQuizzes = quizzes.map(
      (quiz: (typeof quizzes)[number]) => ({
        id: quiz.id,
        title: quiz.title,
        questionCount: quiz._count.questions,
        createdAt: quiz.createdAt,
      })
    );

    res.json(formattedQuizzes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quizzes' });
  }
});

// GET /quizzes/:id - Get a specific quiz with all questions
app.get('/quizzes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quizId = parseInt(id, 10);

    if (isNaN(quizId)) {
      return res.status(400).json({ error: 'Invalid quiz ID' });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
      include: {
        questions: true,
      },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    // Parse options for questions
    const formattedQuiz = {
      ...quiz,
      questions: quiz.questions.map(
        (q: (typeof quiz.questions)[number]) => ({
          ...q,
          options: q.options ? JSON.parse(q.options) : null,
        })
      ),
    };

    res.json(formattedQuiz);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch quiz' });
  }
});

// DELETE /quizzes/:id - Delete a quiz
app.delete('/quizzes/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const quizId = parseInt(id, 10);

    if (isNaN(quizId)) {
      return res.status(400).json({ error: 'Invalid quiz ID' });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id: quizId },
    });

    if (!quiz) {
      return res.status(404).json({ error: 'Quiz not found' });
    }

    await prisma.quiz.delete({
      where: { id: quizId },
    });

    res.json({ message: 'Quiz deleted successfully', id: quizId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete quiz' });
  }
});

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok' });
});

// Start server
app.listen(PORT, () => {
  console.info(`Server running on http://localhost:${PORT}`);
});
