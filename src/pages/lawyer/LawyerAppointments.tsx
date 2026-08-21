import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Video, MessageSquare, Phone, ArrowRight } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Avatar } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { formatDate, formatCurrency } from '@/utils/cn';

export function LawyerAppointments() {
  const navigate = useNavigate();
  const { appointments } = useApp();

  return (
    <div>
      <DashboardHeader title="Appointments" subtitle="Manage your consultation schedule" />
      <div className="p-4 sm:p-6 lg:p-8">
        {appointments.length === 0 ? (
          <EmptyState icon={<Calendar className="w-8 h-8" />} title="No appointments" description="Your scheduled consultations will appear here." />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {appointments.map((apt, i) => (
              <motion.div key={apt.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={apt.user_name} size="md" />
                      <div>
                        <h3 className="font-bold text-navy-900 text-sm">{apt.user_name}</h3>
                        <p className="text-xs text-navy-500">{apt.duration} min · {apt.type}</p>
                      </div>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                  <div className="space-y-2 text-sm text-navy-600 mb-4">
                    <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-navy-400" /> {formatDate(apt.date)} at {apt.time}</p>
                    <p className="text-navy-500">{formatCurrency(apt.total)}</p>
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-navy-100">
                    <Button variant="secondary" size="sm" onClick={() => navigate('/lawyer/chat')}><MessageSquare className="w-4 h-4" /></Button>
                    {(apt.status === 'Confirmed' || apt.status === 'Upcoming') && (
                      <Button variant="accent" size="sm" fullWidth onClick={() => navigate(`/video-consultation/${apt.id}`)}>Join Consultation <ArrowRight className="w-3.5 h-3.5" /></Button>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
