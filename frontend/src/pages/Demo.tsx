import { DemoPanel } from '../components/DemoPanel';
import { DashboardMini } from '../components/DashboardMini';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export function Demo() {
  const { isLoggedIn } = useAuth();
  return (
    <div className="pt-24 pb-16 px-4 max-w-6xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text mb-2">MentorMind Demo</h1>
        <p className="text-white/50 text-sm">
          {isLoggedIn ? 'Pick a topic and explore AI-powered learning.' : 'Log in with any name to begin.'}
        </p>
      </motion.div>
      <div className="grid lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <DemoPanel />
        </div>
        <div className="lg:col-span-2">
          <DashboardMini />
        </div>
      </div>
    </div>
  );
}
