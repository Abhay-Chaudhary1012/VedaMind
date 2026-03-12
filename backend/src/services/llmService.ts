/**
 * LLM Service — wraps OpenAI calls with retry, rate-limit handling,
 * and automatic fallback to mockService when no API key is present.
 */
import OpenAI from 'openai';
import { SYSTEM_PROMPT } from '../lib/prompts';
import * as mockService from './mockService';

let openaiClient: OpenAI | null = null;

function getClient(): OpenAI | null {
  if (!process.env.OPENAI_API_KEY) return null;
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

async function callWithRetry(prompt: string, maxRetries = 3): Promise<string> {
  const client = getClient();
  if (!client) throw new Error('No OpenAI client');

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const res = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          { role: 'user', content: prompt },
        ],
        response_format: { type: 'json_object' },
        temperature: 0.7,
        max_tokens: 1500,
      });
      return res.choices[0]?.message?.content ?? '{}';
    } catch (err: any) {
      if (err?.status === 429 && attempt < maxRetries) {
        // Rate limited — wait with exponential backoff
        await new Promise(r => setTimeout(r, 1000 * attempt * 2));
        continue;
      }
      throw err;
    }
  }
  throw new Error('LLM call failed after retries');
}

// ── Public API ─────────────────────────────────────────────────

export async function generateNotes(topic: string, level: string, profile: any): Promise<any> {
  const client = getClient();
  if (!client) {
    console.log('🎭 Mock mode: generateNotes');
    return mockService.generateNotes(topic, level, profile);
  }
  const { generateNotesPrompt } = await import('../lib/prompts');
  const prompt = generateNotesPrompt({ topic, level: level as any, studentProfile: profile });
  const raw = await callWithRetry(prompt);
  return JSON.parse(raw);
}

export async function generateQuiz(topic: string, difficulty: string, profile: any): Promise<any> {
  const client = getClient();
  if (!client) {
    console.log('🎭 Mock mode: generateQuiz');
    return mockService.generateQuiz(topic, difficulty, profile);
  }
  const { generateQuizPrompt } = await import('../lib/prompts');
  const prompt = generateQuizPrompt({ topic, difficulty: difficulty as any, studentProfile: profile });
  const raw = await callWithRetry(prompt);
  return JSON.parse(raw);
}

export async function evaluateAnswer(
  question: string,
  studentAnswer: string,
  correctAnswer: string,
  topic: string
): Promise<any> {
  const client = getClient();
  if (!client) {
    console.log('🎭 Mock mode: evaluateAnswer');
    return mockService.evaluateAnswer(question, studentAnswer, correctAnswer);
  }
  const { evaluateAnswerPrompt } = await import('../lib/prompts');
  const prompt = evaluateAnswerPrompt({ question, studentAnswer, correctAnswer, topic });
  const raw = await callWithRetry(prompt);
  return JSON.parse(raw);
}

export async function getCareerHint(profile: any): Promise<any> {
  const client = getClient();
  if (!client) {
    console.log('🎭 Mock mode: careerHint');
    return mockService.careerHint(profile);
  }
  const { careerHintPrompt } = await import('../lib/prompts');
  const prompt = careerHintPrompt({ studentProfile: profile });
  const raw = await callWithRetry(prompt);
  return JSON.parse(raw);
}
