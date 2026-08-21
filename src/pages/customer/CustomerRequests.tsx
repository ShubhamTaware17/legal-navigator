import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Inbox, ArrowRight } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { formatDate } from '@/utils/cn';

export function CustomerRequests() {
  const navigate = useNavigate();
  const { lawyerRequests } = useApp();
  const myRequests = lawyerRequests.filter((r) => r.user_name === 'Rahul Verma');

  return (
    <div>
      <DashboardHeader title="My Requests" subtitle="Track your lawyer connection requests" />
      <div className="p-4 sm:p-6 lg:p-8">
        {myRequests.length === 0 ? (
          <EmptyState icon={<Inbox className="w-8 h-8" />} title="No requests yet" description="When you connect with a lawyer, your requests will appear here." action={<Button variant="primary" onClick={() => navigate('/find-lawyer')}>Find a Lawyer</Button>} />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {myRequests.map((req, i) => (
              <motion.div key={req.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-navy-900">{req.category}</h3>
                      <p className="text-xs text-navy-400 mt-0.5">{formatDate(req.created_at)}</p>
                    </div>
                    <StatusBadge status={req.status} />
                  </div>
                  <p className="text-sm text-navy-600 mb-3">{req.summary}</p>
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div><p className="text-navy-400">Location</p><p className="font-semibold text-navy-700">{req.location}</p></div>
                    <div><p className="text-navy-400">Language</p><p className="font-semibold text-navy-700">{req.language}</p></div>
                    <div><p className="text-navy-400">Duration</p><p className="font-semibold text-navy-700">{req.consultation_duration} min</p></div>
                  </div>
                  {req.status === 'Accepted' && (
                    <Button variant="primary" size="sm" fullWidth className="mt-4" onClick={() => navigate('/chat')}>
                      Chat with Lawyer <ArrowRight className="w-3.5 h-3.5" />
                    </Button>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
