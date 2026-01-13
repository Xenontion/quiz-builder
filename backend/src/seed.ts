import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main(): Promise<void> {
  console.info('Seeding database...');

  // Clear existing data
  await prisma.question.deleteMany();
  await prisma.quiz.deleteMany();

  // Create sample quizzes
  const quiz1 = await prisma.quiz.create({
    data: {
      title: 'General Knowledge Quiz',
      questions: {
        create: [
          {
            text: 'Is the Earth flat?',
            type: 'boolean',
          },
          {
            text: 'What is the capital of France?',
            type: 'input',
          },
          {
            text: 'Which of the following are programming languages? (Select all that apply)',
            type: 'checkbox',
            options: JSON.stringify(['JavaScript', 'Python', 'Java', 'HTML', 'CSS']),
          },
        ],
      },
    },
    include: {
      questions: true,
    },
  });

  const quiz2 = await prisma.quiz.create({
    data: {
      title: 'JavaScript Basics',
      questions: {
        create: [
          {
            text: 'Is JavaScript a dynamically typed language?',
            type: 'boolean',
          },
          {
            text: 'What does JSON stand for?',
            type: 'input',
          },
          {
            text: 'Which are valid JavaScript data types? (Select all that apply)',
            type: 'checkbox',
            options: JSON.stringify(['String', 'Number', 'Boolean', 'Undefined', 'Symbol', 'Void']),
          },
        ],
      },
    },
    include: {
      questions: true,
    },
  });

  console.info('Seeded quizzes:');
  console.info(`- ${quiz1.title} (${quiz1.questions.length} questions)`);
  console.info(`- ${quiz2.title} (${quiz2.questions.length} questions)`);
}

main()
  .catch((error) => {
    console.error('Error seeding database:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
