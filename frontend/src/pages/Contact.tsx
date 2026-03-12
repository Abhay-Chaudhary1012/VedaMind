import { GlassCard } from '../components/GlassCard';
import { motion } from 'framer-motion';
import { Mail, Github } from 'lucide-react';

export function Contact() {
  return (
    <div className="pt-24 pb-16 px-4 max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <h1 className="text-4xl font-bold gradient-text mb-3">Contact</h1>
        <p className="text-white/50">We'd love to hear from you — feedback, collaboration, or just a hello.</p>
      </motion.div>
      <GlassCard hover={false} className="p-8 space-y-5">
        <div className="flex items-center gap-4">
          <Mail size={20} className="text-veda-coral shrink-0" />
          <div>
            <p className="font-medium text-sm">Email</p>
            <a href="mailto:vedamind@example.com" className="text-white/50 text-sm hover:text-veda-violet-light transition-colors">vedamind@example.com</a>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Github size={20} className="text-veda-violet-light shrink-0" />
          <div>
            <p className="font-medium text-sm">GitHub</p>
            <a href="https://xyz.com" target="_blank" rel="noopener noreferrer" className="text-white/50 text-sm hover:text-veda-violet-light transition-colors">github.com/vedamind</a>
          </div>
        </div>
        <div className="pt-4 border-t border-white/10">
          <p className="text-xs text-white/30 text-center">Replace these placeholders with real contact details before going live.</p>
        </div>
      </GlassCard>
    </div>
  );
}
