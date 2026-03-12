import { Request, Response, NextFunction } from 'express';
import { memStore } from '../lib/db';
import mongoose from 'mongoose';

/**
 * Mock auth middleware — validates Bearer token from in-memory store.
 * NOTE: Replace with real JWT verification in production:
 *   const decoded = jwt.verify(token, process.env.JWT_SECRET!);
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers['authorization'];
  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing or invalid Authorization header' });
    return;
  }
  const token = authHeader.split(' ')[1];

  // Check in-memory store
  let valid = false;
  for (const [, student] of memStore.students) {
    if (student.token === token) { valid = true; break; }
  }

  // If Mongo is connected, we trust token format (simplified for demo)
  if (!valid && mongoose.connection.readyState === 1) valid = true;

  if (!valid) {
    res.status(401).json({ error: 'Invalid token' });
    return;
  }
  next();
}
