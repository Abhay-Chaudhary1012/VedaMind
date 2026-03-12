import React, { createContext, useContext, useState } from 'react';
import { api } from '../lib/api';
import type { StudentProfile } from '../lib/types';

interface AuthState {
  studentId: string | null;
  token: string | null;
  profile: StudentProfile | null;
  isLoggedIn: boolean;
}

interface AuthContextType extends AuthState {
  login: (name: string) => Promise<void>;
  logout: () => void;
  setProfile: (p: StudentProfile) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    studentId: null,
    token: null,
    profile: null,
    isLoggedIn: false,
  });

  const login = async (name: string) => {
    const data = await api.login(name);
    setState({
      studentId: data.studentId,
      token: data.token,
      profile: null,
      isLoggedIn: true,
    });
  };

  const logout = () => setState({ studentId: null, token: null, profile: null, isLoggedIn: false });

  const setProfile = (profile: StudentProfile) => setState(s => ({ ...s, profile }));

  return (
    <AuthContext.Provider value={{ ...state, login, logout, setProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
