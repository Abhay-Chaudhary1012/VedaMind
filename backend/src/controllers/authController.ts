import { Request, Response } from 'express';
import { z } from 'zod';
import { findOrCreateStudent } from '../lib/studentStore';

const loginSchema = z.object({ name: z.string().min(1).max(50) });

export async function login(req: Request, res: Response): Promise<void> {
  const parse = loginSchema.safeParse(req.body);
  if (!parse.success) { res.status(400).json({ error: 'Name is required' }); return; }

  const student = await findOrCreateStudent(parse.data.name);
  // NOTE: In production, replace this with JWT signing:
  // const token = jwt.sign({ studentId: student.id }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  res.json({ studentId: student.id, token: student.token, name: student.name });
}
