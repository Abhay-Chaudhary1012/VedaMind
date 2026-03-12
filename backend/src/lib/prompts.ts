/**
 * VedaMind — LLM Prompt Templates
 * All prompts return strings ready to send as user messages to the LLM.
 * The system prompt sets JSON-only output mode.
 */

export const SYSTEM_PROMPT = `You are VedaMind — an adaptive AI learning companion for students in Class 6–10.
Always respond with VALID JSON only. No markdown, no prose outside JSON.
Tailor explanations to the student's level and learning style.`;

// ── Types ──────────────────────────────────────────────────────
export interface StudentProfileSnapshot {
  name: string;
  level: 'eli10' | 'grade' | 'advanced';
  preferenceStyle: 'visual' | 'example' | 'logic';
  totalLearningHours: number;
  recentTopics: string[];
}

// ── 1. Generate Notes ──────────────────────────────────────────
/**
 * Expected LLM output schema:
 * {
 *   summary: string,
 *   keyPoints: string[],          // 4-6 bullet points
 *   examples: [{ title, steps, result }],  // 2 worked examples
 *   practiceProblems: [{ id, question, hint }]  // 3 problems
 * }
 */
export function generateNotesPrompt(params: {
  topic: string;
  level: 'eli10' | 'grade' | 'advanced';
  studentProfile: StudentProfileSnapshot;
}): string {
  const levelMap = {
    eli10: 'a curious 10-year-old with no prior knowledge',
    grade: 'a Class 8 student with standard school knowledge',
    advanced: 'a high-achieving student ready for olympiad-level depth',
  };
  return `Generate comprehensive study notes on "${params.topic}" for ${levelMap[params.level]}.
Student name: ${params.studentProfile.name}
Learning style preference: ${params.studentProfile.preferenceStyle}

Return JSON with this exact structure:
{
  "summary": "2-3 sentence overview",
  "keyPoints": ["point 1", "point 2", "point 3", "point 4"],
  "examples": [
    { "title": "Example 1 title", "steps": ["step 1", "step 2"], "result": "final answer" },
    { "title": "Example 2 title", "steps": ["step 1", "step 2"], "result": "final answer" }
  ],
  "practiceProblems": [
    { "id": "p1", "question": "problem text", "hint": "helpful hint" },
    { "id": "p2", "question": "problem text", "hint": "helpful hint" },
    { "id": "p3", "question": "problem text", "hint": "helpful hint" }
  ]
}`;
}

// ── 2. Generate Quiz ───────────────────────────────────────────
/**
 * Expected LLM output schema:
 * {
 *   quizTitle: string,
 *   questions: [
 *     { id, type: 'mcq', text, options: string[4], correctIndex: number },
 *     { id, type: 'short', text, sampleAnswer: string },
 *     { id, type: 'challenge', text, sampleAnswer: string }
 *   ]
 * }
 */
export function generateQuizPrompt(params: {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  studentProfile: StudentProfileSnapshot;
}): string {
  return `Create a 5-question quiz on "${params.topic}" at ${params.difficulty} difficulty.
Student: ${params.studentProfile.name} (${params.studentProfile.totalLearningHours} learning hours logged)

Return JSON with this exact structure:
{
  "quizTitle": "Quiz title",
  "questions": [
    { "id": "q1", "type": "mcq", "text": "question", "options": ["A","B","C","D"], "correctIndex": 0 },
    { "id": "q2", "type": "mcq", "text": "question", "options": ["A","B","C","D"], "correctIndex": 2 },
    { "id": "q3", "type": "short", "text": "question", "sampleAnswer": "expected answer" },
    { "id": "q4", "type": "short", "text": "question", "sampleAnswer": "expected answer" },
    { "id": "q5", "type": "challenge", "text": "harder multi-step question", "sampleAnswer": "detailed answer" }
  ]
}`;
}

// ── 3. Evaluate Answer ─────────────────────────────────────────
/**
 * Expected LLM output schema:
 * {
 *   score: number (0-100),
 *   isCorrect: boolean,
 *   analysis: string,
 *   mistakes: string[],
 *   correctedSteps: string[],
 *   practiceSuggestions: [{ topic, reason }]
 * }
 */
export function evaluateAnswerPrompt(params: {
  question: string;
  studentAnswer: string;
  correctAnswer: string;
  topic: string;
}): string {
  return `Evaluate this student's answer:
Question: "${params.question}"
Topic: ${params.topic}
Student's Answer: "${params.studentAnswer}"
Expected/Sample Answer: "${params.correctAnswer}"

Return JSON:
{
  "score": 85,
  "isCorrect": true,
  "analysis": "explanation of what was right/wrong",
  "mistakes": ["mistake 1 if any"],
  "correctedSteps": ["step 1", "step 2"],
  "practiceSuggestions": [
    { "topic": "related topic", "reason": "why to practice this" },
    { "topic": "another topic", "reason": "why to practice this" }
  ]
}`;
}

// ── 4. Career Hint ─────────────────────────────────────────────
/**
 * Expected LLM output schema:
 * {
 *   hint: string,
 *   matchedFields: string[],
 *   encouragement: string,
 *   nextStep: string
 * }
 */
export function careerHintPrompt(params: {
  studentProfile: StudentProfileSnapshot & {
    topSubjects: string[];
    avgScore: number;
    strongTopics: string[];
  };
}): string {
  return `Based on this student's learning profile, generate a career direction hint:
Name: ${params.studentProfile.name}
Strong topics: ${params.studentProfile.strongTopics.join(', ')}
Top subjects: ${params.studentProfile.topSubjects.join(', ')}
Average quiz score: ${params.studentProfile.avgScore}%
Total learning hours: ${params.studentProfile.totalLearningHours}

Return JSON:
{
  "hint": "personalized career direction suggestion (2-3 sentences)",
  "matchedFields": ["Field 1", "Field 2", "Field 3"],
  "encouragement": "motivational message",
  "nextStep": "concrete next action the student can take today"
}`;
}
