import { GlassCard } from '../components/GlassCard';
import { motion } from 'framer-motion';

export function Mentors() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-3">For Mentors</h1>
        <p className="text-white/50 max-w-xl mx-auto">Gain insight into how your students learn — without extra effort.</p>
      </motion.div>
      <div className="grid md:grid-cols-3 gap-5">
        {[
          { emoji: '👁️', title: 'Progress Visibility', desc: 'See how each student is progressing — hours logged, topics covered, scores improving.' },
          { emoji: '🔍', title: 'Gap Analysis', desc: 'Identify which topics are causing mistakes across your class.' },
          { emoji: '🤝', title: 'Collaborative Hints', desc: 'Nudge students toward the right career paths based on their learning signals.' },
        ].map((c, i) => (
          <GlassCard key={c.title} delay={i * 0.1} className="p-5 text-center">
            <div className="text-3xl mb-3">{c.emoji}</div>
            <h3 className="font-semibold mb-1">{c.title}</h3>
            <p className="text-sm text-white/55">{c.desc}</p>
          </GlassCard>
        ))}
      </div>
      <GlassCard hover={false} className="mt-8 p-6 border-veda-violet/20">
        <p className="text-white/60 text-sm text-center">
          🚀 Mentor dashboard coming in v2. <a href="mailto:vedamind@example.com" className="text-veda-violet-light hover:underline">Join the waitlist</a>.
        </p>
      </GlassCard>
    </div>
  );
}
