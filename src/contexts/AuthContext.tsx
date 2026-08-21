import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { User, UserRole } from '@/types';
import { demoUsers } from '@/data/demoData';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: { name: string; email: string; password: string; role: UserRole; phone?: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  loginAsDemo: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = 'ln_auth_user';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 500));
    const demoUser = demoUsers.find((u) => u.email === email);
    if (demoUser) {
      setUser(demoUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
      return { success: true };
    }
    if (email && _password) {
      const newUser: User = {
        id: `user-${Date.now()}`,
        name: email.split('@')[0],
        email,
        role: 'customer',
        created_at: new Date().toISOString(),
      };
      setUser(newUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (data: { name: string; email: string; password: string; role: UserRole; phone?: string }) => {
    await new Promise((r) => setTimeout(r, 500));
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      avatar_url: `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=1e2f4e&color=fff`,
      created_at: new Date().toISOString(),
    };
    setUser(newUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const loginAsDemo = (role: UserRole) => {
    const demoUser = demoUsers.find((u) => u.role === role);
    if (demoUser) {
      setUser(demoUser);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(demoUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, loginAsDemo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
