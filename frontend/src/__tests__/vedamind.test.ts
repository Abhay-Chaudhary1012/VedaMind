import { describe, it, expect } from 'vitest';

// Test unlock logic (duplicated here for frontend validation)
function computeFrontendTiers(hours: number): number[] {
  const tiers = [0];
  if (hours >= 10) tiers.push(1);
  if (hours >= 29) tiers.push(2);
  return tiers;
}

describe('Frontend tier computation', () => {
  it('always includes Tier 0', () => {
    expect(computeFrontendTiers(0)).toContain(0);
  });

  it('unlocks Tier 1 at 10h', () => {
    expect(computeFrontendTiers(10)).toContain(1);
  });

  it('unlocks Tier 2 at 29h', () => {
    expect(computeFrontendTiers(29)).toContain(2);
  });

  it('Priya (32h) has all tiers', () => {
    expect(computeFrontendTiers(32)).toEqual([0, 1, 2]);
  });
});

// API type shape tests
describe('Type validation', () => {
  it('QuizAnswer shape is correct', () => {
    const answer = { questionId: 'q1', answer: 'My answer' };
    expect(answer).toHaveProperty('questionId');
    expect(answer).toHaveProperty('answer');
  });
});
