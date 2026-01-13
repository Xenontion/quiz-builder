import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Layout } from '@/components/Layout';

export default function Home(): React.ReactElement {
  return (
    <>
      <Head>
        <title>Quiz Builder - Home</title>
        <meta name="description" content="Create and manage quizzes easily" />
      </Head>

      <Layout>
        <div className="text-center py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Welcome to Quiz Builder
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Create interactive quizzes with multiple question types. Manage, share, and organize
            your quizzes all in one place.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/create"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition inline-block"
            >
              Create New Quiz
            </Link>
            <Link
              href="/quizzes"
              className="px-8 py-3 bg-gray-200 text-gray-900 rounded-lg font-semibold hover:bg-gray-300 transition inline-block"
            >
              View All Quizzes
            </Link>
          </div>

          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-3">📝</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Creation</h3>
              <p className="text-gray-600">Create quizzes with multiple question types quickly</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-3">📊</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manage Quizzes</h3>
              <p className="text-gray-600">View, edit, and delete your quizzes with ease</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-3">✨</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Multiple Types</h3>
              <p className="text-gray-600">
                Support for True/False, Short Text, and Multiple Choice questions
              </p>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
