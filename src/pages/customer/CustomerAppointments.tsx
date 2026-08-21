import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Video, MessageSquare, Phone, ArrowRight, Plus } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge, Avatar } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { lawyers } from '@/data/demoData';
import { formatCurrency, formatDate } from '@/utils/cn';

const typeIcons: Record<string, typeof Video> = { video: Video, chat: MessageSquare, voice: Phone };

export function CustomerAppointments() {
  const navigate = useNavigate();
  const { appointments } = useApp();

  return (
    <div>
      <DashboardHeader title="Appointments" subtitle="View and manage your consultations" action={<Button variant="primary" size="sm" onClick={() => navigate('/find-lawyer')}><Plus className="w-4 h-4" /> Book</Button>} />
      <div className="p-4 sm:p-6 lg:p-8">
        {appointments.length === 0 ? (
          <EmptyState icon={<Calendar className="w-8 h-8" />} title="No appointments yet" description="Book a consultation with one of our verified lawyers." action={<Button variant="primary" onClick={() => navigate('/find-lawyer')}>Find a Lawyer</Button>} />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {appointments.map((apt, i) => {
              const lawyer = lawyers.find((l) => l.id === apt.lawyer_id);
              const Icon = typeIcons[apt.type] || Video;
              return (
                <motion.div key={apt.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-5">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={lawyer?.avatar_url} name={apt.lawyer_name} size="md" />
                        <div>
                          <h3 className="font-bold text-navy-900 text-sm">{apt.lawyer_name}</h3>
                          <p className="text-xs text-navy-500">{apt.duration} min · {apt.type}</p>
                        </div>
                      </div>
                      <StatusBadge status={apt.status} />
                    </div>
                    <div className="space-y-2 text-sm text-navy-600 mb-4">
                      <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-navy-400" /> {formatDate(apt.date)}</p>
                      <p className="flex items-center gap-2"><Icon className="w-4 h-4 text-navy-400" /> {apt.time}</p>
                      <p className="flex items-center gap-2"><Badge variant="default">{apt.type} consultation</Badge></p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-navy-100">
                      <span className="text-sm font-bold text-navy-900">{formatCurrency(apt.total)}</span>
                      <div className="flex gap-2">
                        <Button variant="secondary" size="sm" onClick={() => navigate('/chat')}><MessageSquare className="w-4 h-4" /></Button>
                        {(apt.status === 'Confirmed' || apt.status === 'Upcoming') && (
                          <Button variant="accent" size="sm" onClick={() => navigate(`/video-consultation/${apt.id}`)}>Join <ArrowRight className="w-3.5 h-3.5" /></Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
