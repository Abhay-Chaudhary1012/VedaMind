import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import type { NoteData, QuizData, EvalFeedback, Level, Difficulty } from '../lib/types';
import { Quiz } from './Quiz';
import { GlassCard } from './GlassCard';
import { BookOpen, HelpCircle, ChevronDown, ChevronUp, Loader2, User, LogIn } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type Tab = 'notes' | 'quiz';

export function DemoPanel() {
  const { isLoggedIn, studentId, token, login, profile } = useAuth();

  const [loginName, setLoginName] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<Level>('grade');
  const [difficulty, setDifficulty] = useState<Difficulty>('medium');
  const [activeTab, setActiveTab] = useState<Tab>('notes');

  const [note, setNote] = useState<NoteData | null>(null);
  const [quiz, setQuiz] = useState<QuizData | null>(null);
  const [feedback, setFeedback] = useState<EvalFeedback[] | null>(null);
  const [score, setScore] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [openSection, setOpenSection] = useState<string | null>('summary');

  const handleLogin = async () => {
    if (!loginName.trim()) return;
    setLoginLoading(true);
    try { await login(loginName.trim()); } catch { setError('Login failed — is the backend running?'); }
    finally { setLoginLoading(false); }
  };

  const handleGenerate = async () => {
    if (!topic.trim()) { setError('Please enter a topic'); return; }
    setError('');
    setLoading(true);
    setNote(null);
    setQuiz(null);
    setFeedback(null);
    try {
      if (activeTab === 'notes') {
        const res = await api.generateNotes(studentId!, topic, level, token!);
        setNote(res.note);
      } else {
        const res = await api.generateQuiz(studentId!, topic, difficulty, token!);
        setQuiz(res);
      }
    } catch (e: any) {
      setError(e?.response?.data?.error ?? 'Something went wrong. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleQuizSubmit = async (
    answers: { questionId: string; answer: string }[],
    timings: { questionId: string; timeSeconds: number }[]
  ) => {
    if (!quiz) return;
    setLoading(true);
    try {
      const res = await api.submitQuiz(studentId!, quiz.quizId, answers, timings, token!);
      setFeedback(res.feedback);
      setScore(res.score);
    } catch (e: any) {
      setError(e?.response?.data?.error ?? 'Submission failed');
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <GlassCard hover={false} className="p-6 max-w-sm mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <User size={20} className="text-veda-violet-light" />
          <h3 className="font-semibold">Quick Login (Demo)</h3>
        </div>
        <p className="text-muted text-sm mb-3">
          Try entering <strong className="text-veda-green">Priya</strong> (32h), <strong className="text-veda-green">Raj</strong> (8h), or any new name.
        </p>
        <input
          type="text"
          value={loginName}
          onChange={e => setLoginName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleLogin()}
          placeholder="Enter your name..."
          aria-label="Student name"
          className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 rounded-xl p-3 text-sm focus:outline-none focus:border-veda-violet/50 mb-3"
        />
        {error && <p className="text-veda-coral text-xs mb-3">{error}</p>}
        <button onClick={handleLogin} disabled={loginLoading} className="btn-primary w-full flex items-center justify-center gap-2">
          {loginLoading ? <Loader2 size={16} className="animate-spin" /> : <LogIn size={16} />}
          Enter Demo
        </button>
      </GlassCard>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted">
          Welcome back, <span className="text-veda-green font-semibold">{profile?.name ?? 'Student'}</span>!
        </p>
      </div>

      <div className="flex gap-2 p-1 bg-black/5 dark:bg-white/5 rounded-xl">
        {([['notes', 'Generate Notes', BookOpen], ['quiz', 'Give Quiz', HelpCircle]] as const).map(([tab, label, Icon]) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab ? 'bg-veda-violet text-white' : 'text-muted hover:bg-black/5 dark:hover:bg-white/5'
            }`}
          >
            <Icon size={14} /> {label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        <div>
          <label htmlFor="topic-input" className="text-xs text-muted block mb-1">Topic</label>
          <input
            id="topic-input"
            type="text"
            value={topic}
            onChange={e => setTopic(e.target.value)}
            placeholder="e.g. Photosynthesis, Quadratic Equations, French Revolution..."
            className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 rounded-xl p-3 text-sm focus:outline-none focus:border-veda-violet/50"
          />
        </div>

        {activeTab === 'notes' ? (
          <div>
            <label htmlFor="level-select" className="text-xs text-muted block mb-1">Level</label>
            <select
              id="level-select"
              value={level}
              onChange={e => setLevel(e.target.value as Level)}
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 rounded-xl p-3 text-sm focus:outline-none focus:border-veda-violet/50"
            >
              <option value="eli10">ELI10 (Simplified)</option>
              <option value="grade">Grade Level</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        ) : (
          <div>
            <label htmlFor="diff-select" className="text-xs text-muted block mb-1">Difficulty</label>
            <select
              id="diff-select"
              value={difficulty}
              onChange={e => setDifficulty(e.target.value as Difficulty)}
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/15 rounded-xl p-3 text-sm focus:outline-none focus:border-veda-violet/50"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        )}

        {error && <p className="text-veda-coral text-xs">{error}</p>}

        <button
          onClick={handleGenerate}
          disabled={loading || !topic.trim()}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <><Loader2 size={16} className="animate-spin" /> Generating...</>
          ) : activeTab === 'notes' ? (
            <><BookOpen size={16} /> Generate Notes</>
          ) : (
            <><HelpCircle size={16} /> Give Quiz</>
          )}
        </button>
      </div>

      <AnimatePresence>
        {note && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-3">
            {(['summary', 'keyPoints', 'examples', 'practiceProblems'] as const).map(section => (
              <div key={section} className="glass rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenSection(openSection === section ? null : section)}
                  className="w-full flex items-center justify-between p-4 text-sm font-medium hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                  aria-expanded={openSection === section}
                >
                  <span>
                    {{ summary: '📝 Summary', keyPoints: '🔑 Key Points', examples: '💡 Examples', practiceProblems: '✏️ Practice Problems' }[section]}
                  </span>
                  {openSection === section ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                </button>
                <AnimatePresence>
                  {openSection === section && (
                    <motion.div
                      initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 text-sm text-muted">
                        {section === 'summary' && <p>{note.summary}</p>}
                        {section === 'keyPoints' && (
                          <ul className="space-y-1 list-disc list-inside">
                            {note.keyPoints.map((k, i) => <li key={i}>{k}</li>)}
                          </ul>
                        )}
                        {section === 'examples' && note.examples.map((ex, i) => (
                          <div key={i} className="mb-3">
                            <p className="font-medium text-veda-green mb-1">{ex.title}</p>
                            <ol className="list-decimal list-inside space-y-0.5 text-muted">
                              {ex.steps.map((s, j) => <li key={j}>{s}</li>)}
                            </ol>
                            <p className="mt-1 text-veda-violet-light">→ {ex.result}</p>
                          </div>
                        ))}
                        {section === 'practiceProblems' && note.practiceProblems.map((p, i) => (
                          <div key={i} className="mb-3">
                            <p className="font-medium">P{i + 1}. {p.question}</p>
                            <p className="text-xs text-muted mt-0.5">💡 Hint: {p.hint}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {quiz && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Quiz quiz={quiz} onSubmit={handleQuizSubmit} feedback={feedback} score={score} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}