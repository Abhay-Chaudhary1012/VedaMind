import { Request, Response } from 'express';
import { z } from 'zod';
import { v4 as uuid } from 'uuid';
import * as llmService from '../services/llmService';
import { getStudent } from '../lib/studentStore';
import { memStore } from '../lib/db';

const generateSchema = z.object({
  studentId: z.string(),
  topic: z.string().min(1).max(100),
  level: z.enum(['eli10', 'grade', 'advanced']),
});

export async function generateNotes(req: Request, res: Response): Promise<void> {
  const parse = generateSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: parse.error.flatten() }); return; }

  const { studentId, topic, level } = parse.data;
  const student = await getStudent(studentId);
  const profile = student ?? { name: 'Student', preferenceStyle: 'example', totalLearningHours: 0, recentTopics: [] };

  const note = await llmService.generateNotes(topic, level, profile);
  const noteId = `note_${uuid()}`;
  memStore.notes.set(noteId, { noteId, topic, level, note });

  res.json({ noteId, note, meta: { generatedAt: new Date().toISOString(), topic, level } });
}
