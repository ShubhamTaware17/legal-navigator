import { Link, useLocation } from 'react-router-dom';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface MobileNavProps {
  links: { label: string; icon: LucideIcon; to: string }[];
}

export function MobileNavigation({ links }: MobileNavProps) {
  const location = useLocation();
  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-navy-100 z-40 flex items-center justify-around px-2 py-2">
      {links.map((link) => {
        const active = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
        return (
          <Link
            key={link.to}
            to={link.to}
            className={cn(
              'flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors',
              active ? 'text-navy-700' : 'text-navy-400'
            )}
          >
            <link.icon className={cn('w-5 h-5', active && 'text-navy-700')} />
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
