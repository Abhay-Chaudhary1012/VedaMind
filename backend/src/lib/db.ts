import { MOCK_STUDENTS } from './mockApi';

export const memStore = {
  notes: new Map<string, any>(),
  quizzes: new Map<string, any>(),
  sessions: new Map<string, any>(),
  students: new Map<string, any>(Object.entries(MOCK_STUDENTS)),
};