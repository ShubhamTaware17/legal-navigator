import { Link, useLocation, useNavigate } from 'react-router-dom';
import { type LucideIcon } from 'lucide-react';
import { cn } from '@/utils/cn';

interface SidebarLink {
  label: string;
  icon: LucideIcon;
  to: string;
}

interface SidebarProps {
  links: SidebarLink[];
  title: string;
  titleIcon: LucideIcon;
}

export function Sidebar({ links, title, titleIcon: TitleIcon }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-navy-100 h-screen sticky top-0">
      <div className="px-5 py-5 border-b border-navy-100">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-700 to-teal-600 flex items-center justify-center">
            <TitleIcon className="w-4 h-4 text-white" />
          </div>
          <span className="font-display font-bold text-navy-900">{title}</span>
        </Link>
      </div>
      <nav className="flex-1 overflow-y-auto py-3 px-3 scrollbar-thin">
        {links.map((link) => {
          const active = location.pathname === link.to || location.pathname.startsWith(link.to + '/');
          return (
            <button
              key={link.to}
              onClick={() => navigate(link.to)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all mb-0.5',
                active ? 'bg-navy-700 text-white shadow-soft' : 'text-navy-600 hover:bg-navy-50'
              )}
            >
              <link.icon className="w-4 h-4 flex-shrink-0" />
              {link.label}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
