// Additional integration-style tests for quiz scoring and profile updates
import { mockGenerateNote, mockGenerateQuiz, mockEvaluateAnswer } from '../lib/mockApi';
import { computeUnlockStatus } from '../lib/unlockLogic';

describe('Integration: Full quiz → profile flow', () => {
  it('generates notes, quiz, evaluates, and updates tiers correctly', async () => {
    // 1. Generate a note
    const note = mockGenerateNote('Gravity', 'grade');
    expect(note.summary).toBeDefined();
    expect(note.practiceProblems).toHaveLength(3);

    // 2. Generate a quiz
    const questions = mockGenerateQuiz('Gravity', 'easy');
    expect(questions).toHaveLength(5);

    // 3. Evaluate an answer for each question
    const feedback = questions.map(q =>
      mockEvaluateAnswer({
        questionId: q.id,
        question: q.text,
        studentAnswer: q.correctAnswer ?? 'I am not sure',
        correctAnswer: q.correctAnswer ?? '',
      })
    );
    expect(feedback).toHaveLength(5);
    feedback.forEach(f => {
      expect(f).toHaveProperty('grade');
      expect(f).toHaveProperty('isCorrect');
      expect(f.suggestedProblems).toHaveLength(2);
    });

    // 4. Compute score
    const score = Math.round(feedback.reduce((s, f) => s + f.grade, 0) / feedback.length);
    expect(score).toBeGreaterThanOrEqual(0);
    expect(score).toBeLessThanOrEqual(100);

    // 5. Simulate hour increment and tier unlock
    const newHours = 10.1; // just above Tier 1 threshold
    const unlockStatus = computeUnlockStatus(newHours, [0]);
    expect(unlockStatus.unlockedTiers).toContain(1);
    expect(unlockStatus.newlyUnlocked).toBe(1);
  });

  it('Tier 2 unlocks correctly at 29 hours', () => {
    const status = computeUnlockStatus(29, [0, 1]);
    expect(status.unlockedTiers).toEqual([0, 1, 2]);
    expect(status.newlyUnlocked).toBe(2);
    expect(status.nextUnlockAt).toBeNull();
    expect(status.hoursToNext).toBeNull();
  });
});
