import { useState } from 'react';
import type { QuizData, EvalFeedback } from '../lib/types';
import { CheckCircle, XCircle, ChevronRight, Clock } from 'lucide-react';
import { GlassCard } from './GlassCard';

interface Props {
  quiz: QuizData;
  onSubmit: (answers: { questionId: string; answer: string }[], timings: { questionId: string; timeSeconds: number }[]) => void;
  feedback: EvalFeedback[] | null;
  score: number | null;
}

export function Quiz({ quiz, onSubmit, feedback, score }: Props) {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [questionTimes] = useState<Record<string, number>>(
    Object.fromEntries(quiz.questions.map(q => [q.id, Date.now()]))
  );
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    const ansArr = quiz.questions.map(q => ({ questionId: q.id, answer: answers[q.id] ?? '' }));
    const timings = quiz.questions.map(q => ({
      questionId: q.id,
      timeSeconds: Math.round((Date.now() - (questionTimes[q.id] ?? Date.now())) / 1000),
    }));
    onSubmit(ansArr, timings);
  };

  if (submitted && feedback) {
    return (
      <div className="space-y-4">
        {/* Score banner */}
        <GlassCard hover={false} className={`p-4 text-center ${score && score >= 70 ? 'border-veda-green/40' : 'border-veda-coral/40'}`}>
          <div className="text-4xl font-extrabold gradient-text">{score}%</div>
          <p className="text-white/60 text-sm mt-1">
            {score && score >= 70 ? '🎉 Great work!' : '📚 Keep practising — you\'re improving!'}
          </p>
        </GlassCard>

        {/* Feedback per question */}
        {feedback.map((fb, i) => (
          <GlassCard key={fb.questionId} hover={false} delay={i * 0.08} className="p-4">
            <div className="flex items-center gap-2 mb-2">
              {fb.isCorrect
                ? <CheckCircle size={16} className="text-veda-green shrink-0" />
                : <XCircle size={16} className="text-veda-coral shrink-0" />}
              <span className="text-xs font-semibold text-white/80">Q{i + 1} — {fb.score}/100</span>
            </div>
            <p className="text-sm text-white/65">{fb.analysis}</p>
            {fb.mistakes.length > 0 && (
              <div className="mt-2 p-2 bg-veda-coral/10 rounded-lg">
                <p className="text-xs text-veda-coral font-medium mb-1">Mistakes spotted:</p>
                <ul className="list-disc list-inside text-xs text-white/55 space-y-0.5">
                  {fb.mistakes.map((m, j) => <li key={j}>{m}</li>)}
                </ul>
              </div>
            )}
            {fb.correctedSteps.length > 0 && (
              <div className="mt-2 p-2 bg-veda-green/10 rounded-lg">
                <p className="text-xs text-veda-green font-medium mb-1">Correct approach:</p>
                <ol className="list-decimal list-inside text-xs text-white/55 space-y-0.5">
                  {fb.correctedSteps.map((s, j) => <li key={j}>{s}</li>)}
                </ol>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-white">{quiz.quizTitle}</h3>
        <div className="flex items-center gap-1 text-xs text-white/40">
          <Clock size={12} />
          {quiz.questions.length} questions
        </div>
      </div>

      {quiz.questions.map((q, i) => (
        <GlassCard key={q.id} hover={false} delay={i * 0.05} className="p-4">
          <p className="text-sm font-medium text-white mb-3">
            <span className="text-veda-violet-light mr-2">Q{i + 1}.</span>
            {q.text}
          </p>

          {q.type === 'mcq' && q.options ? (
            <div className="space-y-2">
              {q.options.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => setAnswers(a => ({ ...a, [q.id]: opt }))}
                  className={`w-full text-left p-2.5 rounded-lg text-sm transition-all border ${
                    answers[q.id] === opt
                      ? 'bg-veda-violet/20 border-veda-violet/60 text-white'
                      : 'border-white/10 text-white/60 hover:border-white/25 hover:bg-white/5'
                  }`}
                  aria-label={`Option ${String.fromCharCode(65 + j)}: ${opt}`}
                >
                  <span className="text-veda-violet-light font-medium mr-2">{String.fromCharCode(65 + j)}.</span>
                  {opt}
                </button>
              ))}
            </div>
          ) : (
            <textarea
              value={answers[q.id] ?? ''}
              onChange={e => setAnswers(a => ({ ...a, [q.id]: e.target.value }))}
              placeholder="Type your answer here..."
              aria-label={`Answer for question ${i + 1}`}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white placeholder-white/25 focus:outline-none focus:border-veda-violet/50 resize-none"
            />
          )}
        </GlassCard>
      ))}

      <button
        onClick={handleSubmit}
        className="btn-primary w-full flex items-center justify-center gap-2"
        disabled={Object.keys(answers).length < quiz.questions.length}
      >
        Submit Quiz
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
