import { Hero } from '../components/Hero';
import { FeatureCard } from '../components/FeatureCard';
import { GlassCard } from '../components/GlassCard';
import { Brain, Zap, Target, TrendingUp, BookOpen, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const features = [
  { icon: Brain, title: 'Adaptive AI Notes', description: 'Notes generated at 3 levels: simplified (ELI10), grade-appropriate, and advanced — all tailored to how you learn.', accent: 'text-veda-violet-light', delay: 0.1 },
  { icon: Zap, title: 'Instant Quiz Generation', description: 'AI-crafted quizzes with MCQs, short answers, and challenge problems — with real-time evaluation and feedback.', accent: 'text-veda-coral', delay: 0.2 },
  { icon: Target, title: 'Smart Feedback', description: 'Every answer is analysed for mistakes, corrected step-by-step, and paired with targeted practice suggestions.', accent: 'text-veda-green', delay: 0.3 },
  { icon: TrendingUp, title: 'Learning Dashboard', description: 'Track hours, accuracy trends, and unlock new features as you grow — from basic tools to career guidance.', accent: 'text-yellow-400', delay: 0.4 },
  { icon: BookOpen, title: 'Multi-level Content', description: 'Whether you need a simple explanation or olympiad-depth coverage, VedaMind adapts to your current level.', accent: 'text-blue-400', delay: 0.5 },
  { icon: Users, title: 'Mentor Dashboard', description: 'Teachers get insights on student progress, mastery gaps, and learning patterns — without extra overhead.', accent: 'text-pink-400', delay: 0.6 },
];

export function Home() {
  return (
    <div>
      <Hero />
      {/* Features section */}
      <section className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything a student needs to <span className="gradient-text">excel</span>
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            VedaMind isn't just another study app. It's an intelligent companion that evolves with you.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <GlassCard hover={false} className="max-w-2xl mx-auto text-center p-10 border-veda-violet/20">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 gradient-text">Ready to learn smarter?</h2>
          <p className="text-white/55 mb-6">Jump into the demo — no signup, no credit card. Just learning.</p>
          <Link to="/demo" className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-base">
            <Brain size={18} /> Try the Demo Now
          </Link>
        </GlassCard>
      </section>
    </div>
  );
}
