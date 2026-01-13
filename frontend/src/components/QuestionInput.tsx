import React from 'react';
import { Question as QuestionType } from '@/store/quizStore';

interface QuestionInputProps {
  question: QuestionType;
  onUpdate: (question: QuestionType) => void;
  onRemove: () => void;
}

export const QuestionInput: React.FC<QuestionInputProps> = ({ question, onUpdate, onRemove }) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    onUpdate({ ...question, text: e.target.value });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const newType = e.target.value as 'boolean' | 'input' | 'checkbox';
    onUpdate({ ...question, type: newType, options: newType === 'checkbox' ? [] : undefined });
  };

  const handleOptionChange = (index: number, value: string): void => {
    const newOptions = [...(question.options || [])];
    newOptions[index] = value;
    onUpdate({ ...question, options: newOptions });
  };

  const handleAddOption = (): void => {
    const newOptions = [...(question.options || []), ''];
    onUpdate({ ...question, options: newOptions });
  };

  const handleRemoveOption = (index: number): void => {
    const newOptions = (question.options || []).filter((_, i) => i !== index);
    onUpdate({ ...question, options: newOptions });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow border border-gray-200 space-y-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question Text</label>
            <textarea
              value={question.text}
              onChange={handleTextChange}
              placeholder="Enter question text..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Question Type</label>
            <select
              value={question.type}
              onChange={handleTypeChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="boolean">True/False</option>
              <option value="input">Short Text Answer</option>
              <option value="checkbox">Multiple Choice</option>
            </select>
          </div>

          {question.type === 'checkbox' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Options</label>
              <div className="space-y-2">
                {(question.options || []).map((option, index) => (
                  <div key={index} className="flex gap-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(index, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={handleAddOption}
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Add Option
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={onRemove}
          className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition whitespace-nowrap"
        >
          Remove Question
        </button>
      </div>
    </div>
  );
};
