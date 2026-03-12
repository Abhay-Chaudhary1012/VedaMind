import { randomUUID } from 'crypto';
import { memStore } from './db';

interface Student {
  id: string;
  name: string;
  token: string;
  hoursSpent: number;
  totalLearningHours: number;
  avgScore: number;
  unlockedTiers: number[];
  preferences: { style: string };
  sessions: any[];
  quizzes: any[];
}

const studentsById = new Map<string, Student>();

export async function findOrCreateStudent(name: string): Promise<Student> {
  const key = name.toLowerCase().trim();

  // Check mock students first (priya, raj, etc.)
  const mock = memStore.students.get(key);
  if (mock) {
    if (!mock.token) mock.token = randomUUID();
    studentsById.set(mock.id, mock);
    return mock;
  }

  // Check if already created in this session
  for (const s of studentsById.values()) {
    if (s.name.toLowerCase() === key) return s;
  }

  // Create new student
  const student: Student = {
    id: randomUUID(),
    name: name.trim(),
    token: randomUUID(),
    hoursSpent: 0,
    totalLearningHours: 0,
    avgScore: 0,
    unlockedTiers: [0],
    preferences: { style: 'example' },
    sessions: [],
    quizzes: [],
  };

  // ✅ Save in BOTH maps so authMiddleware can find the token
  studentsById.set(student.id, student);
  memStore.students.set(key, student);

  return student;
}

export async function getStudent(id: string): Promise<Student | null> {
  // Check by id directly
  if (studentsById.has(id)) return studentsById.get(id)!;
  
  // Also search memStore
  for (const s of memStore.students.values()) {
    if (s.id === id) return s;
  }
  return null;
}