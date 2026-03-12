export type Level = 'eli10' | 'grade' | 'advanced';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type LearningStyle = 'visual' | 'example' | 'logic';
export type QuestionType = 'mcq' | 'short' | 'challenge';

export interface NoteData {
  summary: string;
  keyPoints: string[];
  examples: { title: string; steps: string[]; result: string }[];
  practiceProblems: { id: string; question: string; hint: string }[];
}

export interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
}

export interface QuizData {
  quizId: string;
  quizTitle: string;
  questions: Question[];
}

export interface EvalFeedback {
  questionId: string;
  score: number;
  isCorrect: boolean;
  analysis: string;
  mistakes: string[];
  correctedSteps: string[];
  practiceSuggestions: { topic: string; reason: string }[];
}

export interface StudentProfile {
  id: string;
  name: string;
  totalLearningHours: number;
  avgScore: number;
  preferences: { style: LearningStyle };
  unlockedTiers: number[];
}

export interface DashboardData {
  profile: StudentProfile;
  recentSessions: { topic: string; hours: number }[];
  masteryScores: { topic: string; score: number }[];
  nextGoal: { tier: number; hoursNeeded: number } | null;
  careerHintIfUnlocked: {
    hint: string;
    matchedFields: string[];
    encouragement: string;
    nextStep: string;
  } | null;
}
