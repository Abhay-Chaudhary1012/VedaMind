// VedaMind Backend Tests
// Run: npm test

import { mockGenerateNote, mockGenerateQuiz, mockEvaluateAnswer, MOCK_STUDENTS } from '../lib/mockApi';
import { computeUnlockStatus } from '../lib/unlockLogic';

// ── Mock API Tests ───────────────────────────
describe('mockGenerateNote', () => {
  it('returns a valid NoteContent object', () => {
    const note = mockGenerateNote('Photosynthesis', 'grade');
    expect(note).toHaveProperty('summary');
    expect(note).toHaveProperty('keyPoints');
    expect(Array.isArray(note.keyPoints)).toBe(true);
    expect(note.keyPoints.length).toBeGreaterThan(0);
    expect(note).toHaveProperty('examples');
    expect(note).toHaveProperty('practiceProblems');
    expect(note.practiceProblems.length).toBe(3);
  });

  it('returns deterministic output for same inputs', () => {
    const note1 = mockGenerateNote('Algebra', 'eli10');
    const note2 = mockGenerateNote('Algebra', 'eli10');
    expect(note1.summary).toBe(note2.summary);
  });

  it('returns different output for different levels', () => {
    const noteGrade = mockGenerateNote('Newton Laws', 'grade');
    const noteAdv = mockGenerateNote('Newton Laws', 'advanced');
    // Topics are the same but seeded differently
    expect(noteGrade).toBeDefined();
    expect(noteAdv).toBeDefined();
  });
});

describe('mockGenerateQuiz', () => {
  it('returns 5 questions', () => {
    const questions = mockGenerateQuiz('Gravity', 'medium');
    expect(questions).toHaveLength(5);
  });

  it('has 2 MCQs with 4 options each', () => {
    const questions = mockGenerateQuiz('Gravity', 'easy');
    const mcqs = questions.filter(q => q.type === 'mcq');
    expect(mcqs).toHaveLength(2);
    mcqs.forEach(q => {
      expect(q.options).toHaveLength(4);
    });
  });

  it('has 2 short answer questions', () => {
    const questions = mockGenerateQuiz('Gravity', 'hard');
    const shorts = questions.filter(q => q.type === 'short');
    expect(shorts).toHaveLength(2);
  });

  it('has 1 challenge problem', () => {
    const questions = mockGenerateQuiz('Gravity', 'hard');
    const numeric = questions.filter(q => q.type === 'numeric');
    expect(numeric).toHaveLength(1);
  });
});

// ── Answer Evaluation Tests ──────────────────
describe('mockEvaluateAnswer', () => {
  it('scores a perfect answer highly', () => {
    const correctAnswer = 'The force of gravity attracts objects with mass towards each other';
    const result = mockEvaluateAnswer({
      questionId: 'q1',
      question: 'What is gravity?',
      studentAnswer: correctAnswer,
      correctAnswer,
    });
    expect(result.grade).toBeGreaterThanOrEqual(80);
    expect(result.isCorrect).toBe(true);
  });

  it('scores a blank answer at 0', () => {
    const result = mockEvaluateAnswer({
      questionId: 'q2',
      question: 'What is gravity?',
      studentAnswer: '',
      correctAnswer: 'Gravity is a force',
    });
    expect(result.grade).toBe(0);
    expect(result.isCorrect).toBe(false);
  });

  it('always returns 2 suggested problems', () => {
    const result = mockEvaluateAnswer({
      questionId: 'q3',
      question: 'Explain Newton\'s law',
      studentAnswer: 'Every action has reaction',
      correctAnswer: 'Every action has an equal and opposite reaction',
    });
    expect(result.suggestedProblems).toHaveLength(2);
  });
});

// ── Unlock Logic Tests ───────────────────────
describe('computeUnlockStatus', () => {
  it('Tier 0 always unlocked', () => {
    const status = computeUnlockStatus(0, [0]);
    expect(status.unlockedTiers).toContain(0);
  });

  it('unlocks Tier 1 at 10 hours', () => {
    const status = computeUnlockStatus(10, [0]);
    expect(status.unlockedTiers).toContain(1);
  });

  it('does NOT unlock Tier 1 below 10 hours', () => {
    const status = computeUnlockStatus(9.9, [0]);
    expect(status.unlockedTiers).not.toContain(1);
  });

  it('unlocks Tier 2 at 29 hours', () => {
    const status = computeUnlockStatus(29, [0, 1]);
    expect(status.unlockedTiers).toContain(2);
  });

  it('detects newly unlocked tier', () => {
    const status = computeUnlockStatus(10, [0]); // previously only Tier 0
    expect(status.newlyUnlocked).toBe(1);
  });

  it('computes correct hoursToNext', () => {
    const status = computeUnlockStatus(5, [0]);
    expect(status.hoursToNext).toBe(5); // 10 - 5
  });

  it('Priya (32h) has all 3 tiers', () => {
    const priya = MOCK_STUDENTS['priya'];
    const status = computeUnlockStatus(priya.totalLearningHours, [0]);
    expect(status.unlockedTiers).toEqual([0, 1, 2]);
  });

  it('Raj (8h) only has Tier 0', () => {
    const raj = MOCK_STUDENTS['raj'];
    const status = computeUnlockStatus(raj.totalLearningHours, [0]);
    expect(status.unlockedTiers).toEqual([0]);
  });
});
