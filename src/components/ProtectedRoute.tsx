import { type ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';
import { LoadingState } from '@/components/ui/States';

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRoles?: UserRole[];
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) return <LoadingState text="Loading..." className="min-h-screen" />;
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    const redirect = user.role === 'customer' ? '/dashboard' : user.role === 'lawyer' ? '/lawyer/dashboard' : '/admin/dashboard';
    return <Navigate to={redirect} replace />;
  }
  return <>{children}</>;
}
