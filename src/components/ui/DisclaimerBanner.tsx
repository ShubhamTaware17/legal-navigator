import { ShieldCheck, AlertTriangle } from 'lucide-react';
import { cn } from '@/utils/cn';

interface DisclaimerBannerProps {
  variant?: 'info' | 'warning';
  className?: string;
  children?: React.ReactNode;
}

export function DisclaimerBanner({ variant = 'info', className, children }: DisclaimerBannerProps) {
  const isWarning = variant === 'warning';
  return (
    <div
      className={cn(
        'flex items-start gap-3 rounded-xl p-4 text-sm',
        isWarning ? 'bg-amber-50 border border-amber-200 text-amber-800' : 'bg-navy-50 border border-navy-200 text-navy-700',
        className
      )}
    >
      {isWarning ? <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5 text-amber-500" /> : <ShieldCheck className="w-5 h-5 flex-shrink-0 mt-0.5 text-navy-500" />}
      <p className="leading-relaxed">
        {children || 'Legal Navigator provides general guidance, not legal advice. This is preliminary information for guidance only. It is not a legal opinion. Final legal classification and legal advice should be provided by a qualified lawyer.'}
      </p>
    </div>
  );
}
