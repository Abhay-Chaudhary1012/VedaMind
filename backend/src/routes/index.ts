import { Router } from 'express';
import { login } from '../controllers/authController';
import { generateNotes } from '../controllers/topicsController';
import { generateQuiz, submitQuiz } from '../controllers/quizzesController';
import { getDashboard, updateProfile } from '../controllers/dashboardController';
import { authMiddleware } from '../middleware/auth';

export const router = Router();

// Auth (no middleware needed)
router.post('/auth/login', login);

// Topics (protected)
router.post('/topics/generate', authMiddleware, generateNotes);

// Quizzes (protected)
router.post('/quizzes/generate', authMiddleware, generateQuiz);
router.post('/quizzes/submit', authMiddleware, submitQuiz);

// Dashboard (protected)
router.get('/dashboard/:studentId', authMiddleware, getDashboard);
router.post('/profile/update', authMiddleware, updateProfile);
