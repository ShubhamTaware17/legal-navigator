import { cn } from '@/utils/cn';

interface ProgressStepperProps {
  current: number;
  total: number;
  className?: string;
}

export function ProgressStepper({ current, total, className }: ProgressStepperProps) {
  const pct = Math.min(100, (current / total) * 100);
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-navy-700">
          Step {current} of {total}
        </span>
        <span className="text-sm text-navy-400">{Math.round(pct)}% complete</span>
      </div>
      <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-navy-600 to-teal-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
