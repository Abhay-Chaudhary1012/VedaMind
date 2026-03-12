import { Request, Response } from 'express';
import { getStudent } from '../lib/studentStore';
import { getNextUnlockGoal } from '../lib/unlockLogic';
import { getCareerHint } from '../services/llmService';

export async function getDashboard(req: Request, res: Response): Promise<void> {
  const { studentId } = req.params;
  const student = await getStudent(studentId);
  if (!student) { res.status(404).json({ error: 'Student not found' }); return; }

  const nextGoal = getNextUnlockGoal(student.totalLearningHours);
  const isTier2 = student.unlockedTiers?.includes(2);

  let careerHintIfUnlocked = null;
  if (isTier2) {
    careerHintIfUnlocked = await getCareerHint({
      ...student,
      preferenceStyle: student.preferences?.style ?? 'example',
    });
  }

  const recentSessions = (student.sessions || []).slice(-5);
  const quizScores = (student.quizzes || []).map((q: any) => ({ topic: q.topic, score: q.score, date: q.id }));

  res.json({
    profile: {
      id: student.id,
      name: student.name,
      totalLearningHours: student.totalLearningHours,
      avgScore: student.avgScore,
      preferences: student.preferences,
      unlockedTiers: student.unlockedTiers ?? [0],
    },
    recentSessions,
    masteryScores: quizScores,
    nextGoal,
    careerHintIfUnlocked,
  });
}

export async function updateProfile(req: Request, res: Response): Promise<void> {
  const { studentId, preferences } = req.body;
  if (!studentId) { res.status(400).json({ error: 'studentId required' }); return; }
  // Simplified — extend as needed
  res.json({ success: true, message: 'Profile update noted (extend with DB write)' });
}
