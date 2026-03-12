import { GlassCard } from '../components/GlassCard';
import { motion } from 'framer-motion';
import { LogIn, BookOpen, HelpCircle, BarChart } from 'lucide-react';

const steps = [
  { icon: LogIn, num: 1, title: 'Quick Login', desc: 'Enter your name — no passwords, no friction. Your learning profile is created instantly.' },
  { icon: BookOpen, num: 2, title: 'Pick a Topic', desc: 'Type any topic from your syllabus. Choose your level: simplified, grade-level, or advanced.' },
  { icon: HelpCircle, num: 3, title: 'Learn & Quiz', desc: 'Read AI-generated notes and take a 5-question quiz. Each answer is evaluated with detailed feedback.' },
  { icon: BarChart, num: 4, title: 'Track & Unlock', desc: 'Your learning hours accumulate. Hit 10h for analytics, 29h for career hints and advanced features.' },
];

export function HowItWorks() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-3">How It Works</h1>
        <p className="text-white/50">Four simple steps to smarter, adaptive learning.</p>
      </motion.div>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <GlassCard key={step.num} delay={i * 0.1} className="flex items-start gap-5 p-6">
            <div className="w-12 h-12 rounded-2xl bg-veda-gradient flex items-center justify-center shrink-0 text-white font-bold text-lg">
              {step.num}
            </div>
            <div>
              <h3 className="font-semibold text-white mb-1">{step.title}</h3>
              <p className="text-white/55 text-sm leading-relaxed">{step.desc}</p>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
