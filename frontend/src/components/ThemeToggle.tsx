import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function ThemeToggle() {
  const { isDark, toggle } = useTheme();
  return (
    <button
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="p-2 rounded-lg glass hover:bg-white/10 transition-colors"
    >
      {isDark ? <Sun size={18} className="text-yellow-300" /> : <Moon size={18} className="text-veda-violet" />}
    </button>
  );
}
