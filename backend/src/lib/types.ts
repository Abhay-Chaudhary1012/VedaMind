// ─────────────────────────────────────────────
// VedaMind Shared Types
// ─────────────────────────────────────────────

export type NoteLevel = 'eli10' | 'grade' | 'advanced';
export type QuizDifficulty = 'easy' | 'medium' | 'hard';
export type QuestionType = 'mcq' | 'short' | 'numeric';
export type LearningStyle = 'visual' | 'example' | 'logic';

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

export interface Session {
  id: string;
  studentId: string;
  topic: string;
  hours: number;
  startedAt: Date;
  endedAt: Date;
}

export interface NoteContent {
  summary: string;
  keyPoints: string[];
  examples: { title: string; content: string }[];
  practiceProblems: { question: string; hint: string }[];
}

export interface Note {
  noteId: string;
  studentId: string;
  topic: string;
  level: NoteLevel;
  note: NoteContent;
  meta: { generatedAt: string };
}

export interface QuizQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];       // MCQ only
  correctAnswer?: string;   // Only in mock mode / after submission
}

export interface Quiz {
  quizId: string;
  topic: string;
  difficulty: QuizDifficulty;
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
  recentSessions: Session[];
  recentQuizzes: {
    topic: string;
    score: number;
    createdAt: string;
  }[];
  masteryScores: Record<string, number>;
  unlockedTiers: number[];
  nextUnlockAt: number | null;
  careerHint?: string;
}

export interface AuthResponse {
  studentId: string;
  token: string;
  profile: StudentProfile;
}
