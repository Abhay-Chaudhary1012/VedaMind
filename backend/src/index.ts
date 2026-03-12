import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectMongo } from './lib/db';
import { router } from './routes';
import { errorHandler } from './middleware/errorHandler';

const app = express();
const PORT = process.env.PORT || 4000;

// ── Middleware ─────────────────────────────────────────────────
app.use(cors({ origin: '*' }));
app.use(express.json());

// ── Routes ────────────────────────────────────────────────────
app.use('/api', router);

// Dev-only logs endpoint
if (process.env.NODE_ENV !== 'production') {
  app.get('/logs', (_req, res) => {
    res.json({ message: 'Dev log endpoint — disabled in prod', logs: [] });
  });
}

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', mode: process.env.OPENAI_API_KEY ? 'live' : 'mock' }));

// ── Error handler ─────────────────────────────────────────────
app.use(errorHandler);

// ── DB + Start ────────────────────────────────────────────────
const start = async () => {
  // Connect to MongoDB if MONGO_URI is set
  // If using SQLite/Prisma, remove this block and use PrismaClient directly in models
  if (process.env.MONGO_URI) {
    await connectMongo();
  } else {
    console.log('⚠️  No MONGO_URI — using in-memory mock store');
  }
  app.listen(PORT, () => {
    const mode = process.env.OPENAI_API_KEY ? '🤖 LIVE (OpenAI)' : '🎭 MOCK mode';
    console.log(`✅ VedaMind backend running on http://localhost:${PORT} [${mode}]`);
  });
};

start().catch(console.error);
