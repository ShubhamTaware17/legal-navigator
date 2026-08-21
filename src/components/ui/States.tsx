import { type ReactNode } from 'react';
import { Loader2, Inbox, AlertCircle, Search } from 'lucide-react';
import { cn } from '@/utils/cn';

export function LoadingState({ text = 'Loading...', className }: { text?: string; className?: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center py-16', className)}>
      <Loader2 className="w-8 h-8 text-navy-400 animate-spin mb-3" />
      <p className="text-sm text-navy-500 font-medium">{text}</p>
    </div>
  );
}

export function SkeletonLoader({ className }: { className?: string }) {
  return <div className={cn('animate-pulse bg-navy-100 rounded-xl', className)} />;
}

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-4', className)}>
      <div className="w-16 h-16 rounded-2xl bg-navy-50 flex items-center justify-center mb-4 text-navy-400">
        {icon || <Inbox className="w-8 h-8" />}
      </div>
      <h3 className="text-lg font-bold text-navy-900 mb-1">{title}</h3>
      {description && <p className="text-sm text-navy-500 max-w-md">{description}</p>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({ title = 'Something went wrong', message, onRetry, className }: ErrorStateProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center text-center py-16 px-4', className)}>
      <div className="w-16 h-16 rounded-2xl bg-error-50 flex items-center justify-center mb-4 text-error-500">
        <AlertCircle className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-navy-900 mb-1">{title}</h3>
      {message && <p className="text-sm text-navy-500 max-w-md">{message}</p>}
      {onRetry && (
        <button onClick={onRetry} className="mt-4 btn-primary">
          Try Again
        </button>
      )}
    </div>
  );
}

export function NoResultsState({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 px-4">
      <div className="w-16 h-16 rounded-2xl bg-navy-50 flex items-center justify-center mb-4 text-navy-400">
        <Search className="w-8 h-8" />
      </div>
      <h3 className="text-lg font-bold text-navy-900 mb-1">{title}</h3>
      <p className="text-sm text-navy-500 max-w-md">{description}</p>
    </div>
  );
}
