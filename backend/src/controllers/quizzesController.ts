import { Request, Response } from 'express';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import * as llmService from '../services/llmService';
import { getStudent, updateStudentAfterQuiz } from '../lib/studentStore';
import { memStore } from '../lib/db';

const generateSchema = z.object({
  studentId: z.string(),
  topic: z.string().min(1).max(100),
  difficulty: z.enum(['easy', 'medium', 'hard']),
});

export async function generateQuiz(req: Request, res: Response): Promise<void> {
  const parse = generateSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { studentId, topic, difficulty } = parse.data;
  const student = await getStudent(studentId);
  const profile = student ?? { name: 'Student', totalLearningHours: 0 };

  const quizData = await llmService.generateQuiz(topic, difficulty, profile);
  const quizId = `quiz_${uuid()}`;

  // Store quiz for later evaluation (strip correctAnswers for response)
  memStore.quizzes.set(quizId, { quizId, topic, difficulty, ...quizData, studentId });

  // Don't send correct answers to frontend in live mode
  const safeQuestions = quizData.questions.map((q: any) => {
    const { correctIndex: _ci, sampleAnswer: _sa, ...safe } = q;
    return safe;
  });

  res.json({ quizId, questions: safeQuestions, quizTitle: quizData.quizTitle });
}

const submitSchema = z.object({
  studentId: z.string(),
  quizId: z.string(),
  answers: z.array(z.object({ questionId: z.string(), answer: z.string() })),
  timings: z.array(z.object({ questionId: z.string(), timeSeconds: z.number() })).optional(),
});

export async function submitQuiz(req: Request, res: Response): Promise<void> {
  const parse = submitSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { studentId, quizId, answers, timings = [] } = parse.data;
  const storedQuiz = memStore.quizzes.get(quizId);
  if (!storedQuiz) { res.status(404).json({ error: 'Quiz not found' }); return; }

  const startTime = Date.now();
  const feedbackArr: any[] = [];
  let totalScore = 0;
  const mistakes: string[] = [];

  for (const ans of answers) {
    const question = storedQuiz.questions.find((q: any) => q.id === ans.questionId);
    if (!question) continue;

    const correctAnswer =
      question.type === 'mcq'
        ? question.options?.[question.correctIndex] ?? ''
        : question.sampleAnswer ?? '';

    const evaluation = await llmService.evaluateAnswer(
      question.text,
      ans.answer,
      correctAnswer,
      storedQuiz.topic
    );
    totalScore += evaluation.score;
    feedbackArr.push({ questionId: ans.questionId, ...evaluation });
    if (evaluation.mistakes?.length) mistakes.push(...evaluation.mistakes);
  }

  const avgScore = answers.length > 0 ? Math.round(totalScore / answers.length) : 0;
  const timeTaken = timings.reduce((a: number, t: any) => a + t.timeSeconds, 0) || Math.round((Date.now() - startTime) / 1000);

  const quizRecord = {
    id: quizId,
    topic: storedQuiz.topic,
    score: avgScore,
    timeTaken,
    mistakes: [...new Set(mistakes)],
  };

  const updatedProfile = await updateStudentAfterQuiz(studentId, quizRecord);

  res.json({
    score: avgScore,
    feedback: feedbackArr,
    updatedProfile: {
      totalLearningHours: updatedProfile.totalLearningHours,
      unlockedTiers: updatedProfile.unlockedTiers,
      avgScore: updatedProfile.avgScore,
    },
  });
}
