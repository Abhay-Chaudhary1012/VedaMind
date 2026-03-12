/**
 * VedaMind — Mock API Service
 * Returns deterministic mock data when OPENAI_API_KEY is not set.
 * Uses a simple seeded approach for slightly varied outputs.
 */

// ── Seed helper ────────────────────────────────────────────────
function seededVariant<T>(arr: T[], seed: string): T {
  let hash = 0;
  for (const c of seed) hash = (hash * 31 + c.charCodeAt(0)) % arr.length;
  return arr[Math.abs(hash) % arr.length];
}

// ── Mock Student Profiles ──────────────────────────────────────
export const MOCK_STUDENTS: Record<string, any> = {
  priya: {
    id: 'student_priya',
    name: 'Priya',
    totalLearningHours: 32,
    sessions: [
      { start: '2024-01-10T09:00:00Z', end: '2024-01-10T11:00:00Z', topic: 'Algebra', hours: 2 },
      { start: '2024-01-11T10:00:00Z', end: '2024-01-11T12:30:00Z', topic: 'Geometry', hours: 2.5 },
    ],
    quizzes: [
      { id: 'q_p1', topic: 'Algebra', score: 92, timeTaken: 340, mistakes: ['sign errors'] },
      { id: 'q_p2', topic: 'Geometry', score: 88, timeTaken: 410, mistakes: [] },
    ],
    preferences: { style: 'logic' },
    unlockedTiers: [0, 1, 2],
    strongTopics: ['Algebra', 'Quadratic Equations', 'Geometry'],
    topSubjects: ['Mathematics', 'Physics'],
    avgScore: 90,
  },
  raj: {
    id: 'student_raj',
    name: 'Raj',
    totalLearningHours: 8,
    sessions: [
      { start: '2024-01-12T14:00:00Z', end: '2024-01-12T16:00:00Z', topic: 'Photosynthesis', hours: 2 },
    ],
    quizzes: [
      { id: 'q_r1', topic: 'Photosynthesis', score: 74, timeTaken: 520, mistakes: ['Light reactions confused with dark reactions'] },
    ],
    preferences: { style: 'visual' },
    unlockedTiers: [0],
    strongTopics: ['Biology', 'Environmental Science'],
    topSubjects: ['Biology', 'Geography'],
    avgScore: 74,
  },
  testuser: {
    id: 'student_testuser',
    name: 'TestUser',
    totalLearningHours: 0,
    sessions: [],
    quizzes: [],
    preferences: { style: 'example' },
    unlockedTiers: [0],
    strongTopics: [],
    topSubjects: [],
    avgScore: 0,
  },
};

// ── Mock Note Generator ────────────────────────────────────────
export function mockGenerateNote(topic: string, level: string): any {
  const variants = [
    `${topic} is a fundamental concept that forms the building blocks of understanding.`,
    `${topic} connects multiple ideas and helps us see the bigger picture.`,
    `${topic} is best understood through examples and real-world applications.`,
  ];
  return {
    summary: seededVariant(variants, topic + level),
    keyPoints: [
      `${topic} has several core principles worth mastering`,
      `Understanding ${topic} requires connecting prior knowledge`,
      `${topic} appears frequently in competitive exams`,
      `Practice is key to mastering ${topic}`,
    ],
    examples: [
      {
        title: `Basic ${topic} Example`,
        steps: [`Identify the key variable in the problem`, `Apply the ${topic} formula`, `Simplify step by step`],
        result: 'Final answer computed correctly',
      },
      {
        title: `Applied ${topic} Problem`,
        steps: [`Read the problem carefully`, `Map it to ${topic} concepts`, `Solve systematically`],
        result: 'Solution verified',
      },
    ],
    practiceProblems: [
      { id: 'p1', question: `Solve a basic ${topic} problem with given values`, hint: `Start with the formula for ${topic}` },
      { id: 'p2', question: `A real-world scenario involving ${topic}`, hint: `Think about units and conversions` },
      { id: 'p3', question: `Challenge: combine ${topic} with a related concept`, hint: `Break the problem into smaller parts` },
    ],
  };
}

// ── Mock Quiz Generator ────────────────────────────────────────
export function mockGenerateQuiz(topic: string, difficulty: string): any {
  return {
    quizTitle: `${topic} — ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Quiz`,
    questions: [
      {
        id: 'q1',
        type: 'mcq',
        text: `Which of the following best describes ${topic}?`,
        options: [
          `A process related to ${topic}`,
          `The core definition of ${topic}`,
          `An unrelated concept`,
          `A common misconception about ${topic}`,
        ],
        correctIndex: 1,
      },
      {
        id: 'q2',
        type: 'mcq',
        text: `What is the key formula or rule associated with ${topic}?`,
        options: [`Formula A`, `Formula B (correct)`, `Formula C`, `Formula D`],
        correctIndex: 1,
      },
      {
        id: 'q3',
        type: 'short',
        text: `Explain ${topic} in your own words.`,
        sampleAnswer: `${topic} refers to the systematic study of its core principles and applications in real-world contexts.`,
      },
      {
        id: 'q4',
        type: 'short',
        text: `Give one real-life example of ${topic} and explain how it works.`,
        sampleAnswer: `A practical example of ${topic} is seen in everyday situations where its principles apply directly.`,
      },
      {
        id: 'q5',
        type: 'challenge',
        text: `A complex scenario involving ${topic}: Solve step by step.`,
        sampleAnswer: `Step 1: Identify relevant variables. Step 2: Apply ${topic} principles. Step 3: Compute and verify.`,
      },
    ],
  };
}

// ── Mock Answer Evaluator ──────────────────────────────────────
export function mockEvaluateAnswer(
  question: string,
  studentAnswer: string,
  correctAnswer: string
): any {
  const wordOverlap = studentAnswer.toLowerCase().split(' ').filter(w =>
    correctAnswer.toLowerCase().includes(w) && w.length > 3
  ).length;
  const score = Math.min(100, Math.max(20, wordOverlap * 15 + 30));
  return {
    score,
    isCorrect: score >= 70,
    analysis: score >= 70
      ? 'Good answer! You captured the key concepts correctly.'
      : 'Your answer partially addresses the question. Review the key concepts.',
    mistakes: score < 70 ? ['Some key terms missing', 'Could be more specific'] : [],
    correctedSteps: [
      'Identify the core concept being asked',
      'State the definition or formula clearly',
      'Apply with an example if possible',
    ],
    practiceSuggestions: [
      { topic: 'Related fundamentals', reason: 'Strengthen foundational understanding' },
      { topic: 'Applied problems', reason: 'Practice applying concepts to new situations' },
    ],
  };
}

// ── Mock Career Hint ───────────────────────────────────────────
export function mockCareerHint(profile: any): any {
  const hints = [
    {
      hint: `Based on your strength in ${profile.strongTopics?.[0] || 'core subjects'}, you show great potential in analytical fields. Your consistent learning habits are a strong foundation.`,
      matchedFields: ['Engineering', 'Data Science', 'Research'],
      encouragement: 'Every hour you spend learning brings you closer to mastery. Keep going!',
      nextStep: 'Try solving 2 olympiad-level problems this week in your strongest topic.',
    },
    {
      hint: `Your curiosity and visual learning style suggests you could excel in creative technical fields like design, architecture, or life sciences.`,
      matchedFields: ['Architecture', 'Biology', 'Medicine'],
      encouragement: "Your learning journey is unique — embrace it and don't compare with others!",
      nextStep: 'Watch one documentary about your favourite subject and note 3 new things you learned.',
    },
  ];
  return seededVariant(hints, profile.name || 'default');
}
