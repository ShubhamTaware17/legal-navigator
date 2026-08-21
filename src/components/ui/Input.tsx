import { type InputHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  helperText?: string;
}

export function Input({ label, error, icon, helperText, className, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-navy-700 mb-1.5">{label}</label>}
      <div className="relative">
        {icon && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-navy-400">{icon}</span>}
        <input
          className={cn(
            'w-full rounded-xl border bg-white px-4 py-3 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-500 transition-all',
            icon && 'pl-10',
            error ? 'border-error-300 focus:ring-error-500/30 focus:border-error-500' : 'border-navy-200',
            className
          )}
          {...props}
        />
      </div>
      {helperText && !error && <p className="mt-1 text-xs text-navy-400">{helperText}</p>}
      {error && <p className="mt-1 text-xs text-error-500 font-medium">{error}</p>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  children: ReactNode;
}

export function Select({ label, error, className, children, ...props }: SelectProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-navy-700 mb-1.5">{label}</label>}
      <select
        className={cn(
          'w-full rounded-xl border bg-white px-4 py-3 text-navy-900 focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-500 transition-all',
          error ? 'border-error-300' : 'border-navy-200',
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <p className="mt-1 text-xs text-error-500 font-medium">{error}</p>}
    </div>
  );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export function Textarea({ label, error, className, ...props }: TextareaProps) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-semibold text-navy-700 mb-1.5">{label}</label>}
      <textarea
        className={cn(
          'w-full rounded-xl border bg-white px-4 py-3 text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-navy-500/30 focus:border-navy-500 transition-all resize-none',
          error ? 'border-error-300' : 'border-navy-200',
          className
        )}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error-500 font-medium">{error}</p>}
    </div>
  );
}
