import { type ReactNode } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Avatar } from '@/components/ui/Card';
import { Bell } from 'lucide-react';

interface DashboardHeaderProps {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function DashboardHeader({ title, subtitle, action }: DashboardHeaderProps) {
  const { user } = useAuth();
  return (
    <div className="flex items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-5 bg-white border-b border-navy-100 sticky top-0 z-30">
      <div className="min-w-0">
        <h1 className="text-xl sm:text-2xl font-bold text-navy-900 truncate">{title}</h1>
        {subtitle && <p className="text-sm text-navy-500 mt-0.5 truncate">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        {action}
        <button className="relative p-2 rounded-lg text-navy-600 hover:bg-navy-50 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full" />
        </button>
        <Avatar src={user?.avatar_url} name={user?.name || 'User'} size="sm" />
      </div>
    </div>
  );
}
