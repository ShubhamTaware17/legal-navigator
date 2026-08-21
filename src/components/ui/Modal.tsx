import { type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { cn } from '@/utils/cn';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export function Modal({ open, onClose, title, children, size = 'md' }: ModalProps) {
  const sizes = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className={cn('w-full bg-white rounded-2xl shadow-elevated max-h-[90vh] overflow-hidden flex flex-col', sizes[size])}
            onClick={(e) => e.stopPropagation()}
          >
            {title && (
              <div className="flex items-center justify-between px-6 py-4 border-b border-navy-100">
                <h3 className="text-lg font-bold text-navy-900">{title}</h3>
                <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50 hover:text-navy-700 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            )}
            {!title && (
              <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg text-navy-400 hover:bg-navy-50 hover:text-navy-700 transition-colors z-10">
                <X className="w-5 h-5" />
              </button>
            )}
            <div className="overflow-y-auto p-6 scrollbar-thin">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
