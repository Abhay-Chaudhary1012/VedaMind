import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, BookOpen, Trophy } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-veda-violet/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-veda-coral/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-8"
        >
          <Sparkles size={14} className="text-veda-green" />
          <span className="text-white/70">AI-powered adaptive learning for Class 6–10</span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight"
        >
          <span className="gradient-text">VedaMind</span>
          <br />
          <span className="text-white/90 text-4xl md:text-5xl font-bold">Where Ancient Wisdom Meets</span>
          <br />
          <span className="text-white/90 text-4xl md:text-5xl font-bold">Intelligent Learning</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto"
        >
          An adaptive AI companion that understands how <em>you</em> learn — generating personalised notes,
          quizzes, and career hints so every student reaches their full potential.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link to="/demo" className="btn-primary text-base px-8 py-4 flex items-center justify-center gap-2">
            <BookOpen size={18} />
            Try Demo
          </Link>
          <Link to="/how-it-works" className="btn-secondary text-base px-8 py-4 flex items-center justify-center gap-2">
            <Trophy size={18} />
            See How It Works
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { label: 'Classes', value: '6–10' },
            { label: 'Learning Tiers', value: '3' },
            { label: 'Mock Mode', value: '✓' },
          ].map(stat => (
            <div key={stat.label} className="glass p-4 text-center">
              <div className="text-2xl font-bold gradient-text">{stat.value}</div>
              <div className="text-xs text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
