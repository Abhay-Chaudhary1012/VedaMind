import axios from 'axios';
import type { Level, Difficulty } from './types';

const BASE = '/api';

function getHeaders(token?: string | null) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export const api = {
  login: (name: string) =>
    axios.post(`${BASE}/auth/login`, { name }).then(r => r.data),

  generateNotes: (studentId: string, topic: string, level: Level, token: string) =>
    axios.post(`${BASE}/topics/generate`, { studentId, topic, level }, { headers: getHeaders(token) }).then(r => r.data),

  generateQuiz: (studentId: string, topic: string, difficulty: Difficulty, token: string) =>
    axios.post(`${BASE}/quizzes/generate`, { studentId, topic, difficulty }, { headers: getHeaders(token) }).then(r => r.data),

  submitQuiz: (
    studentId: string,
    quizId: string,
    answers: { questionId: string; answer: string }[],
    timings: { questionId: string; timeSeconds: number }[],
    token: string
  ) =>
    axios.post(`${BASE}/quizzes/submit`, { studentId, quizId, answers, timings }, { headers: getHeaders(token) }).then(r => r.data),

  getDashboard: (studentId: string, token: string) =>
    axios.get(`${BASE}/dashboard/${studentId}`, { headers: getHeaders(token) }).then(r => r.data),
};
