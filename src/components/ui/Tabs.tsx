import { type ReactNode, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

interface TabsProps {
  tabs: { id: string; label: string; icon?: ReactNode }[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 border-b border-navy-100 overflow-x-auto scrollbar-thin', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 text-sm font-semibold whitespace-nowrap border-b-2 transition-all',
            active === tab.id ? 'border-navy-700 text-navy-900' : 'border-transparent text-navy-400 hover:text-navy-600'
          )}
        >
          {tab.icon}
          {tab.label}
        </button>
      ))}
    </div>
  );
}

interface AccordionProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export function Accordion({ title, children, defaultOpen = false }: AccordionProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-navy-100 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-navy-50 transition-colors"
      >
        <span className="font-semibold text-navy-800 text-sm">{title}</span>
        <ChevronDown className={cn('w-4 h-4 text-navy-400 transition-transform', open && 'rotate-180')} />
      </button>
      {open && <div className="px-4 py-3 text-sm text-navy-600 border-t border-navy-100">{children}</div>}
    </div>
  );
}
