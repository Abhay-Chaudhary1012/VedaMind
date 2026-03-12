import { Brain, Github, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';

const team = [
  { name: 'Abhigya Chand Singh', linkedin: 'https://xyz.com', github: 'https://xyz.com' },
  { name: 'Abhay Chaudhary', linkedin: 'https://xyz.com', github: 'https://xyz.com' },
  { name: 'Aryan Sharma', linkedin: 'https://xyz.com', github: 'https://xyz.com' },
  { name: 'Abhinav Pratap Singh', linkedin: 'https://xyz.com', github: 'https://xyz.com' },
];

export function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10 mt-20 py-12">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 font-bold text-lg mb-3">
            <div className="w-8 h-8 rounded-lg bg-veda-gradient flex items-center justify-center">
              <Brain size={16} className="text-white" />
            </div>
            <span className="gradient-text">VedaMind</span>
          </div>
          <p className="text-muted text-sm leading-relaxed">
            "Students should not fit the education system — the education system should adapt to the student."
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="font-semibold mb-3 text-muted">Platform</h4>
          <ul className="space-y-2 text-sm text-muted">
            {[['/', 'Home'], ['/features', 'Features'], ['/demo', 'Demo'], ['/about', 'About']].map(([to, label]) => (
              <li key={to}>
                <Link to={to} className="hover:text-veda-violet-light transition-colors">{label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Team */}
        <div className="md:col-span-2">
          <h4 className="font-semibold mb-3 text-muted">Team</h4>
          <div className="grid grid-cols-2 gap-3">
            {team.map(m => (
              <div key={m.name} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-veda-violet/20 flex items-center justify-center text-xs font-bold text-veda-violet-light shrink-0">
                  {m.name[0]}
                </div>
                <div>
                  <p className="text-xs text-muted font-medium">{m.name}</p>
                  <div className="flex gap-2 mt-0.5">
                    <a href={m.linkedin} target="_blank" rel="noopener noreferrer"
                      className="text-muted hover:text-veda-violet-light transition-colors">
                      <Linkedin size={12} />
                    </a>
                    <a href={m.github} target="_blank" rel="noopener noreferrer"
                      className="text-muted hover:text-veda-violet-light transition-colors">
                      <Github size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-8 pt-6 border-t border-black/5 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-2">
        <p className="text-muted text-xs">© 2024 VedaMind. Built with ❤️ for Indian students.</p>
        <p className="text-muted text-xs">Privacy-first · No ads · Student data protected</p>
      </div>
    </footer>
  );
}