import { GlassCard } from '../components/GlassCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export function Students() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-3">For Students</h1>
        <p className="text-white/50 max-w-xl mx-auto">Your AI companion for Class 6–10. Learn at your pace, in your style.</p>
      </motion.div>
      <div className="grid md:grid-cols-2 gap-5 mb-8">
        {[
          { emoji: '📚', title: 'Learn Any Topic', desc: 'Type any topic from your textbook and get instant, clear explanations at the right level.' },
          { emoji: '🧠', title: 'Test Yourself', desc: 'Take AI-crafted quizzes and get step-by-step feedback on every mistake.' },
          { emoji: '📈', title: 'See Your Growth', desc: 'Watch your accuracy improve over time. Every session adds to your learning profile.' },
          { emoji: '🎯', title: 'Unlock Career Hints', desc: 'After 29 hours of learning, discover which career paths align with your strengths.' },
        ].map((c, i) => (
          <GlassCard key={c.title} delay={i * 0.1} className="p-5">
            <div className="text-3xl mb-3">{c.emoji}</div>
            <h3 className="font-semibold mb-1">{c.title}</h3>
            <p className="text-sm text-white/55">{c.desc}</p>
          </GlassCard>
        ))}
      </div>
      <div className="text-center">
        <Link to="/demo" className="btn-primary inline-flex items-center gap-2 px-8 py-4">Start Learning Now</Link>
      </div>
    </div>
  );
}
