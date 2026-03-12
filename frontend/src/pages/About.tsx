import { GlassCard } from '../components/GlassCard';
import { motion } from 'framer-motion';
import { Github, Linkedin } from 'lucide-react';

const team = [
  { name: 'Abhigya Chand Singh', role: 'AI & Backend Lead', linkedin: 'https://xyz.com', github: 'https://xyz.com' },
  { name: 'Abhay Chaudhary', role: 'Frontend & UX Lead', linkedin: 'https://xyz.com', github: 'https://xyz.com' },
  { name: 'Aryan Sharma', role: 'ML & Prompt Engineering', linkedin: 'https://xyz.com', github: 'https://xyz.com' },
  { name: 'Abhinav Pratap Singh', role: 'Product & Research', linkedin: 'https://xyz.com', github: 'https://xyz.com' },
];

export function About() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-4xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
        <h1 className="text-4xl font-bold gradient-text mb-3">About VedaMind</h1>
        <p className="text-white/50 max-w-xl mx-auto">
          "Students should not fit the education system — the education system should adapt to the student."
        </p>
      </motion.div>
      <GlassCard hover={false} className="mb-8 p-6">
        <p className="text-white/70 leading-relaxed">
          VedaMind (MentorMind AI) is a full-stack prototype demonstrating how AI can personalise learning for Class 6–10 students across India.
          Built by a team of student developers, it combines ancient wisdom of structured learning with modern LLM capabilities — adapting to each student's pace, style, and goals.
        </p>
      </GlassCard>
      <h2 className="text-xl font-bold mb-5 text-white/80">The Team</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {team.map((m, i) => (
          <GlassCard key={m.name} delay={i * 0.1} className="flex items-center gap-4 p-4">
            <div className="w-12 h-12 rounded-2xl bg-veda-gradient flex items-center justify-center text-white font-bold text-lg shrink-0">
              {m.name[0]}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-white text-sm">{m.name}</p>
              <p className="text-xs text-white/45 mb-2">{m.role}</p>
              <div className="flex gap-3">
                <a href={m.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-white/35 hover:text-veda-violet-light transition-colors">
                  <Linkedin size={12} /> LinkedIn
                </a>
                <a href={m.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-white/35 hover:text-veda-violet-light transition-colors">
                  <Github size={12} /> GitHub
                </a>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
