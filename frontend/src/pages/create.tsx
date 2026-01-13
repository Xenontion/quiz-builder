import React, { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { Layout } from '@/components/Layout';
import { QuestionInput } from '@/components/QuestionInput';
import { quizApi } from '@/services/api';
import { useQuizStore, Question as QuestionType } from '@/store/quizStore';

export default function CreateQuiz(): React.ReactElement {
  const router = useRouter();
  const { title, questions, setTitle, addQuestion, updateQuestion, removeQuestion, reset } =
    useQuizStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddQuestion = (): void => {
    addQuestion({
      text: '',
      type: 'input',
      options: undefined,
    });
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!title.trim()) {
      setError('Quiz title is required');
      return;
    }

    if (questions.length === 0) {
      setError('At least one question is required');
      return;
    }

    const invalidQuestion = questions.find((q) => !q.text.trim());
    if (invalidQuestion) {
      setError('All questions must have text');
      return;
    }

    if (questions.some((q) => q.type === 'checkbox' && (!q.options || q.options.length === 0))) {
      setError('Multiple choice questions must have at least one option');
      return;
    }

    setIsLoading(true);

    try {
      const payload = {
        title,
        questions: questions.map((q) => ({
          text: q.text,
          type: q.type,
          options: q.options,
        })),
      };

      await quizApi.createQuiz(payload);
      reset();
      router.push('/quizzes?success=Quiz created successfully');
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error: string } } };
      setError(error.response?.data?.error || 'Failed to create quiz');
      console.error('Error creating quiz:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Create Quiz - Quiz Builder</title>
        <meta name="description" content="Create a new quiz" />
      </Head>

      <Layout>
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Create New Quiz</h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div className="bg-white p-6 rounded-lg shadow">
              <label className="block text-sm font-medium text-gray-700 mb-2">Quiz Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter quiz title..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">Questions</h2>
              {questions.length > 0 ? (
                questions.map((question, _index) => (
                  <QuestionInput
                    key={question.id}
                    question={question}
                    onUpdate={(updated: QuestionType) =>
                      updateQuestion(question.id as string, updated)
                    }
                    onRemove={() => removeQuestion(question.id as string)}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-center py-8">No questions added yet</p>
              )}
            </div>

            <button
              type="button"
              onClick={handleAddQuestion}
              className="w-full px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition font-medium"
            >
              Add Question
            </button>

            <div className="flex gap-4">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
              >
                {isLoading ? 'Creating...' : 'Create Quiz'}
              </button>
              <button
                type="button"
                onClick={() => {
                  reset();
                  router.push('/quizzes');
                }}
                className="flex-1 px-6 py-3 bg-gray-300 text-gray-900 rounded-lg hover:bg-gray-400 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </Layout>
    </>
  );
}
