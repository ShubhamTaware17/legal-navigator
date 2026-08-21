import { cn } from '@/utils/cn';

interface StatusBadgeProps {
  status: string;
  className?: string;
}

const statusConfig: Record<string, { color: string; bg: string; dot: string }> = {
  // Case statuses
  Draft: { color: 'text-navy-600', bg: 'bg-navy-100', dot: 'bg-navy-400' },
  Analyzing: { color: 'text-indigo-600', bg: 'bg-indigo-100', dot: 'bg-indigo-500' },
  'Guidance Ready': { color: 'text-teal-600', bg: 'bg-teal-100', dot: 'bg-teal-500' },
  'Lawyer Matching': { color: 'text-indigo-600', bg: 'bg-indigo-100', dot: 'bg-indigo-500' },
  'Lawyer Selected': { color: 'text-indigo-600', bg: 'bg-indigo-100', dot: 'bg-indigo-500' },
  'Consultation Scheduled': { color: 'text-teal-600', bg: 'bg-teal-100', dot: 'bg-teal-500' },
  'In Consultation': { color: 'text-teal-600', bg: 'bg-teal-100', dot: 'bg-teal-500 animate-pulse' },
  'Service In Progress': { color: 'text-amber-600', bg: 'bg-amber-100', dot: 'bg-amber-500' },
  Completed: { color: 'text-emerald-600', bg: 'bg-emerald-100', dot: 'bg-emerald-500' },
  Closed: { color: 'text-navy-500', bg: 'bg-navy-100', dot: 'bg-navy-400' },
  // Request statuses
  Pending: { color: 'text-amber-600', bg: 'bg-amber-100', dot: 'bg-amber-500' },
  Accepted: { color: 'text-emerald-600', bg: 'bg-emerald-100', dot: 'bg-emerald-500' },
  Declined: { color: 'text-error-600', bg: 'bg-error-100', dot: 'bg-error-500' },
  Expired: { color: 'text-navy-500', bg: 'bg-navy-100', dot: 'bg-navy-400' },
  // Appointment statuses
  Upcoming: { color: 'text-indigo-600', bg: 'bg-indigo-100', dot: 'bg-indigo-500' },
  Confirmed: { color: 'text-teal-600', bg: 'bg-teal-100', dot: 'bg-teal-500' },
  'In Progress': { color: 'text-teal-600', bg: 'bg-teal-100', dot: 'bg-teal-500 animate-pulse' },
  Cancelled: { color: 'text-error-600', bg: 'bg-error-100', dot: 'bg-error-500' },
  // Payment statuses
  Paid: { color: 'text-emerald-600', bg: 'bg-emerald-100', dot: 'bg-emerald-500' },
  Refunded: { color: 'text-navy-600', bg: 'bg-navy-100', dot: 'bg-navy-400' },
  Failed: { color: 'text-error-600', bg: 'bg-error-100', dot: 'bg-error-500' },
  // Service statuses
  'Payment Pending': { color: 'text-amber-600', bg: 'bg-amber-100', dot: 'bg-amber-500' },
  Requested: { color: 'text-indigo-600', bg: 'bg-indigo-100', dot: 'bg-indigo-500' },
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status] || { color: 'text-navy-600', bg: 'bg-navy-100', dot: 'bg-navy-400' };
  return (
    <span className={cn('inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold', config.bg, config.color, className)}>
      <span className={cn('w-1.5 h-1.5 rounded-full', config.dot)} />
      {status}
    </span>
  );
}
