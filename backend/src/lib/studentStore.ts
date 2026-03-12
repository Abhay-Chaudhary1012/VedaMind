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
  const mock = memStore.students.get(key);
  if (mock) {
    if (!mock.token) mock.token = randomUUID();
    studentsById.set(mock.id, mock);
    return mock;
  }
  for (const s of studentsById.values()) {
    if (s.name.toLowerCase() === key) return s;
  }
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
  studentsById.set(student.id, student);
  memStore.students.set(key, student);
  return student;
}

export async function getStudent(id: string): Promise<Student | null> {
  if (studentsById.has(id)) return studentsById.get(id)!;
  for (const s of memStore.students.values()) {
    if (s.id === id) return s;
  }
  return null;
}

export async function updateStudentAfterQuiz(studentId: string, quizRecord: any): Promise<Student> {
  const student = await getStudent(studentId);
  if (!student) throw new Error('Student not found');
  student.quizzes = [...(student.quizzes || []), quizRecord];
  const scores = student.quizzes.map((q: any) => q.score);
  student.avgScore = Math.round(scores.reduce((a: number, b: number) => a + b, 0) / scores.length);
  student.totalLearningHours = parseFloat((student.totalLearningHours + 0.5).toFixed(1));
  if (student.totalLearningHours >= 29) student.unlockedTiers = [0, 1, 2];
  else if (student.totalLearningHours >= 10) student.unlockedTiers = [0, 1];
  else student.unlockedTiers = [0];
  studentsById.set(studentId, student);
  return student;
}