import React from 'react';
import { Question as QuestionType } from '@/services/api';

interface QuestionDisplayProps {
  question: QuestionType;
  index: number;
}

export const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question, index }) => {
  const getQuestionTypeLabel = (type: string): string => {
    const labels: Record<string, string> = {
      boolean: 'True/False',
      input: 'Short Text Answer',
      checkbox: 'Multiple Choice',
    };
    return labels[type] || type;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 bg-blue-100 text-blue-700 w-8 h-8 rounded-full flex items-center justify-center font-semibold">
          {index}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{question.text}</h3>
          <p className="text-sm text-gray-500 mt-1">Type: {getQuestionTypeLabel(question.type)}</p>

          {question.type === 'checkbox' && question.options && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-700 mb-2">Options:</p>
              <ul className="space-y-1">
                {question.options.map((option, idx) => (
                  <li key={idx} className="text-sm text-gray-600">
                    • {option}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
