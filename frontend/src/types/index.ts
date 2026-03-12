// ─────────────────────────────────────────────
// VedaMind Frontend Types
// ─────────────────────────────────────────────

export type NoteLevel = 'eli10' | 'grade' | 'advanced';
export type QuizDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'mcq' | 'short' | 'numeric';
export type LearningStyle = 'visual' | 'example' | 'logic';
export type Theme = 'dark' | 'light';

export interface StudentPreferences {
  style: LearningStyle;
}

export interface StudentProfile {
  id: string;
  name: string;
  totalLearningHours: number;
  unlockedTiers: number[];
  preferences: StudentPreferences;
  dataLoggingOptIn: boolean;
}

export interface AuthState {
  isAuthenticated: boolean;
  studentId: string | null;
  token: string | null;
  profile: StudentProfile | null;
}

export interface NoteContent {
  summary: string;
  keyPoints: string[];
  examples: { title: string; content: string }[];
  practiceProblems: { question: string; hint: string }[];
}

export interface NoteResponse {
  noteId: string;
  note: NoteContent;
  meta: { generatedAt: string };
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
}

export interface QuizResponse {
  quizId: string;
  questions: QuizQuestion[];
}

export interface QuizAnswer {
  questionId: string;
  answer: string;
}

export interface QuizTiming {
  questionId: string;
  timeSeconds: number;
}

export interface QuestionFeedback {
  questionId: string;
  grade: number;
  isCorrect: boolean;
  analysis: string;
  correctAnswer: string;
  suggestedProblems?: string[];
}

export interface QuizSubmitResult {
  score: number;
  totalQuestions: number;
  feedback: QuestionFeedback[];
  updatedProfile: StudentProfile;
  unlockedNewTier?: number;
}

export interface DashboardData {
  profile: StudentProfile;
  recentSessions: { topic: string; hours: number; startedAt: string; endedAt: string }[];
  recentQuizzes: { topic: string; score: number; createdAt: string }[];
  masteryScores: Record<string, number>;
  unlockedTiers: number[];
  nextUnlockAt: number | null;
  hoursToNext: number | null;
  careerHint?: {
    careerHints: { title: string; why: string; nextStep: string }[];
    motivationalNote: string;
  };
}
