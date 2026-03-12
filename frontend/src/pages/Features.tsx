import { GlassCard } from '../components/GlassCard';
import { motion } from 'framer-motion';
import { Brain, Zap, TrendingUp, Lock, Unlock } from 'lucide-react';

export function Features() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-3">Features</h1>
        <p className="text-white/50">Everything you need to learn smarter, not harder.</p>
      </motion.div>

      <div className="space-y-6">
        {[
          { tier: 0, icon: Brain, label: 'Tier 0 — Always Available', color: 'text-veda-green', items: ['AI-generated notes (ELI10 / Grade / Advanced)', '5-question adaptive quizzes', 'Immediate answer feedback', 'Multi-level explanations'] },
          { tier: 1, icon: TrendingUp, label: 'Tier 1 — Unlocks at 10 hours', color: 'text-veda-violet-light', items: ['Score trend analytics', 'Topic mastery heatmap', 'Mistake pattern analysis', 'Session history'] },
          { tier: 2, icon: Zap, label: 'Tier 2 — Unlocks at 29 hours', color: 'text-veda-coral', items: ['Career direction hints', 'Advanced AI tutor mode', 'Olympiad-level practice', 'Personalised study plan'] },
        ].map((t, i) => (
          <GlassCard key={t.tier} delay={i * 0.1} className="p-6">
            <div className="flex items-center gap-3 mb-4">
              {t.tier === 0 ? <Unlock size={20} className={t.color} /> : <Lock size={20} className={t.color} />}
              <h2 className={`font-bold text-lg ${t.color}`}>{t.label}</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-2">
              {t.items.map(item => (
                <li key={item} className="flex items-center gap-2 text-sm text-white/65">
                  <span className={`w-1.5 h-1.5 rounded-full bg-current ${t.color} shrink-0`} />
                  {item}
                </li>
              ))}
            </ul>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
