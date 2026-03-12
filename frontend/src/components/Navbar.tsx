import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Brain, Menu, X } from 'lucide-react';
import { useState } from 'react';

const links = [
  { to: '/', label: 'Home' },
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How It Works' },
  { to: '/students', label: 'Students' },
  { to: '/mentors', label: 'Mentors' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export function Navbar() {
  const location = useLocation();
  const { isLoggedIn, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass-strong border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-veda-gradient flex items-center justify-center">
            <Brain size={16} className="text-white" />
          </div>
          <span className="gradient-text">VedaMind</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                location.pathname === l.to
                  ? 'bg-veda-violet/20 text-veda-violet-light'
                  : 'nav-link'
              }`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isLoggedIn ? (
            <>
              <Link to="/demo" className="btn-primary text-sm py-2 px-4">Dashboard</Link>
              <button onClick={logout} className="text-white/50 hover:text-white text-sm px-3 py-2">Logout</button>
            </>
          ) : (
            <Link to="/demo" className="btn-primary text-sm py-2 px-4">Try Demo</Link>
          )}
          {/* Mobile menu toggle */}
          <button className="md:hidden p-2" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu">
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-3 space-y-1">
          {links.map(l => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-white/80 hover:bg-white/5"
            >
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </motion.nav>
  );
}
