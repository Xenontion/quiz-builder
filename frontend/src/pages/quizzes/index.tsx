import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { quizApi, Quiz } from '@/services/api';
import { useRouter } from 'next/router';

export default function Quizzes(): React.ReactElement {
  const router = useRouter();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchQuizzes();

    // Show success message from query params
    if (router.query.success) {
      setSuccess(router.query.success as string);
      setTimeout(() => setSuccess(null), 3000);
    }
  }, [router.query.success]);

  const fetchQuizzes = async (): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await quizApi.getQuizzes();
      setQuizzes(response.data);
    } catch (err: unknown) {
      setError('Failed to fetch quizzes');
      console.error('Error fetching quizzes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteQuiz = async (id: number): Promise<void> => {
    if (!confirm('Are you sure you want to delete this quiz?')) {
      return;
    }

    try {
      await quizApi.deleteQuiz(id);
      setQuizzes(quizzes.filter((q) => q.id !== id));
      setSuccess('Quiz deleted successfully');
      setTimeout(() => setSuccess(null), 3000);
    } catch (err: unknown) {
      setError('Failed to delete quiz');
      console.error('Error deleting quiz:', err);
    }
  };

  return (
    <>
      <Head>
        <title>All Quizzes - Quiz Builder</title>
        <meta name="description" content="View all quizzes" />
      </Head>

      <Layout>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-8">All Quizzes</h1>

          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">
              {success}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
              {error}
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-gray-600">Loading quizzes...</p>
            </div>
          ) : quizzes.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg">
              <p className="text-gray-600 mb-4">No quizzes found</p>
              <Link
                href="/create"
                className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Create First Quiz
              </Link>
            </div>
          ) : (
            <div className="grid gap-6">
              {quizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition border border-gray-200 flex items-center justify-between group"
                >
                  <Link href={`/quizzes/${quiz.id}`} className="flex-1 cursor-pointer">
                    <h2 className="text-xl font-semibold text-blue-600 group-hover:text-blue-700 transition">
                      {quiz.title}
                    </h2>
                    <p className="text-gray-600 mt-1">
                      {quiz.questionCount} question{quiz.questionCount !== 1 ? 's' : ''}
                    </p>
                  </Link>

                  <div className="flex gap-3">
                    <Link
                      href={`/quizzes/${quiz.id}`}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                      View
                    </Link>
                    <button
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
}
