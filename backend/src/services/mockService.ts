import { mockGenerateNote, mockGenerateQuiz, mockEvaluateAnswer, mockCareerHint } from '../lib/mockApi';

export function generateNotes(topic: string, level: string, profile: any) {
  return mockGenerateNote(topic, level);
}

export function generateQuiz(topic: string, difficulty: string, profile: any) {
  return mockGenerateQuiz(topic, difficulty);
}

export function evaluateAnswer(question: string, studentAnswer: string, correctAnswer: string) {
  return mockEvaluateAnswer(question, studentAnswer, correctAnswer);
}

export function careerHint(profile: any) {
  return mockCareerHint(profile);
}