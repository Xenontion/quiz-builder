import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { QuestionDisplay } from '@/components/QuestionDisplay';
import { quizApi, Quiz } from '@/services/api';

export default function QuizDetail(): React.ReactElement {
  const router = useRouter();
  const { id } = router.query;
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchQuiz(parseInt(id as string, 10));
    }
  }, [id]);

  const fetchQuiz = async (quizId: number): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await quizApi.getQuizById(quizId);
      setQuiz(response.data);
    } catch (err: unknown) {
      setError('Failed to fetch quiz');
      console.error('Error fetching quiz:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="text-center py-12">
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </Layout>
    );
  }

  if (error || !quiz) {
    return (
      <Layout>
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error || 'Quiz not found'}
          </div>
          <Link href="/quizzes" className="text-blue-600 hover:text-blue-700">
            ← Back to Quizzes
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <>
      <Head>
        <title>{quiz.title} - Quiz Builder</title>
        <meta name="description" content={`Quiz: ${quiz.title}`} />
      </Head>

      <Layout>
        <div className="max-w-4xl mx-auto">
          <Link href="/quizzes" className="text-blue-600 hover:text-blue-700 mb-6 inline-block">
            ← Back to Quizzes
          </Link>

          <div className="bg-white p-8 rounded-lg shadow mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{quiz.title}</h1>
            <p className="text-gray-600">
              {quiz.questions?.length || 0} question{quiz.questions?.length !== 1 ? 's' : ''}
            </p>
          </div>

          {quiz.questions && quiz.questions.length > 0 ? (
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold text-gray-900">Questions</h2>
              {quiz.questions.map((question, index) => (
                <QuestionDisplay key={question.id} question={question} index={index + 1} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow text-center">
              <p className="text-gray-600">No questions in this quiz</p>
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
