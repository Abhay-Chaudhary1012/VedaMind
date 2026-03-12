import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  isDark: boolean;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextType>({ isDark: true, toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState<boolean>(() => {
    // Read saved preference on first load
    const saved = localStorage.getItem('veda-theme');
    return saved ? saved === 'dark' : true; // default = dark
  });

  useEffect(() => {
    // Apply theme to DOM
    document.documentElement.classList.toggle('dark', isDark);
    document.body.style.background = isDark
      ? 'linear-gradient(135deg, #0f0a1a 0%, #1a1028 50%, #0d1a2e 100%)'
      : 'linear-gradient(135deg, #f8f4ff 0%, #ede8ff 50%, #e8f0ff 100%)';
    document.body.style.color = isDark ? 'white' : '#1a1028';

    // Save preference
    localStorage.setItem('veda-theme', isDark ? 'dark' : 'light');
  }, [isDark]);

  return (
    <ThemeContext.Provider value={{ isDark, toggle: () => setIsDark(p => !p) }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);