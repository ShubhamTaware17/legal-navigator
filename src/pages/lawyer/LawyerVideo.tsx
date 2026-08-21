import { useNavigate } from 'react-router-dom';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Avatar } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { formatDate } from '@/utils/cn';
import { motion } from 'framer-motion';
import { Video, ArrowRight } from 'lucide-react';

export function LawyerVideo() {
  const navigate = useNavigate();
  const { appointments } = useApp();
  const videoAppts = appointments.filter((a) => a.type === 'video');

  return (
    <div>
      <DashboardHeader title="Video Consultations" subtitle="Manage your video consultation schedule" />
      <div className="p-4 sm:p-6 lg:p-8">
        {videoAppts.length === 0 ? (
          <EmptyState icon={<Video className="w-8 h-8" />} title="No video consultations" description="Your scheduled video consultations will appear here." />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {videoAppts.map((apt, i) => (
              <motion.div key={apt.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-5">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar name={apt.user_name} size="md" />
                      <div>
                        <h3 className="font-bold text-navy-900 text-sm">{apt.user_name}</h3>
                        <p className="text-xs text-navy-500">{apt.duration} min · Video</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-navy-600 mb-4">{formatDate(apt.date)} at {apt.time}</p>
                  <Button variant="accent" size="sm" fullWidth onClick={() => navigate(`/video-consultation/${apt.id}`)}>Join Consultation <ArrowRight className="w-3.5 h-3.5" /></Button>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
