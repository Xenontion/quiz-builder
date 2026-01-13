import { create } from 'zustand';

export interface Question {
  id?: string;
  text: string;
  type: 'boolean' | 'input' | 'checkbox';
  options?: string[];
}

interface QuizStore {
  title: string;
  questions: Question[];
  setTitle: (title: string) => void;
  addQuestion: (question: Question) => void;
  updateQuestion: (id: string, question: Question) => void;
  removeQuestion: (id: string) => void;
  reset: () => void;
}

export const useQuizStore = create<QuizStore>((set) => ({
  title: '',
  questions: [],
  setTitle: (title: string): void => set({ title }),
  addQuestion: (question: Question): void =>
    set((state) => ({
      questions: [...state.questions, { ...question, id: Math.random().toString() }],
    })),
  updateQuestion: (id: string, question: Question): void =>
    set((state) => ({
      questions: state.questions.map((q) => (q.id === id ? { ...question, id } : q)),
    })),
  removeQuestion: (id: string): void =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== id),
    })),
  reset: (): void => set({ title: '', questions: [] }),
}));
