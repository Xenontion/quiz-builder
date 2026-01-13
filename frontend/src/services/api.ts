import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Question {
  id?: number;
  text: string;
  type: 'boolean' | 'input' | 'checkbox';
  options?: string[] | null;
}

export interface Quiz {
  id: number;
  title: string;
  createdAt: string;
  questions?: Question[];
  questionCount?: number;
}

export interface CreateQuizPayload {
  title: string;
  questions: Question[];
}

export const quizApi = {
  createQuiz: (data: CreateQuizPayload): Promise<import('axios').AxiosResponse<Quiz>> =>
    apiClient.post<Quiz>('/quizzes', data),
  getQuizzes: (): Promise<import('axios').AxiosResponse<Quiz[]>> =>
    apiClient.get<Quiz[]>('/quizzes'),
  getQuizById: (id: number): Promise<import('axios').AxiosResponse<Quiz>> =>
    apiClient.get<Quiz>(`/quizzes/${id}`),
  deleteQuiz: (id: number): Promise<import('axios').AxiosResponse<{ message: string; id: number }>> =>
    apiClient.delete(`/quizzes/${id}`),
};

export default apiClient;
