/**
 * Tier unlock logic
 * Tier 0 — immediate (always unlocked)
 * Tier 1 — after >= 10 total learning hours
 * Tier 2 — after >= 29 total learning hours OR significant improvement
 */
export function computeUnlockedTiers(
  totalHours: number,
  quizScores: number[]
): number[] {
  const tiers: number[] = [0]; // always

  if (totalHours >= 10) tiers.push(1);

  if (totalHours >= 29) {
    tiers.push(2);
  } else if (quizScores.length >= 5) {
    // Statistically significant improvement: last 3 avg > first 3 avg by 15+ points
    const first = quizScores.slice(0, 3).reduce((a, b) => a + b, 0) / 3;
    const last = quizScores.slice(-3).reduce((a, b) => a + b, 0) / 3;
    if (last - first >= 15) tiers.push(2);
  }

  return tiers;
}

export function getNextUnlockGoal(totalHours: number): { tier: number; hoursNeeded: number } | null {
  if (totalHours < 10) return { tier: 1, hoursNeeded: 10 - totalHours };
  if (totalHours < 29) return { tier: 2, hoursNeeded: 29 - totalHours };
  return null; // all unlocked
}
