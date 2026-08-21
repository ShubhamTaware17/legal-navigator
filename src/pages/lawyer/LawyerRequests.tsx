import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, MapPin, Globe, Clock, FileText, ArrowRight } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge, Avatar } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { formatDate } from '@/utils/cn';

export function LawyerRequests() {
  const navigate = useNavigate();
  const { lawyerRequests, updateLawyerRequest, addAppointment, addConversation, addNotification } = useApp();

  const handleAccept = (reqId: string) => {
    const req = lawyerRequests.find((r) => r.id === reqId);
    if (!req) return;
    updateLawyerRequest(reqId, { status: 'Accepted' });
    const aptId = `apt-${Date.now()}`;
    addAppointment({
      id: aptId,
      lawyer_id: req.lawyer_id,
      user_id: 'demo-customer',
      user_name: req.user_name,
      lawyer_name: 'Adv. Priya Sharma',
      date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
      time: '10:00 AM',
      duration: req.consultation_duration,
      type: 'video',
      fee: req.consultation_duration === 15 ? 199 : req.consultation_duration === 30 ? 499 : 999,
      platform_fee: 50,
      total: (req.consultation_duration === 15 ? 199 : req.consultation_duration === 30 ? 499 : 999) + 50,
      status: 'Confirmed',
      created_at: new Date().toISOString(),
    });
    addConversation({
      id: `conv-${Date.now()}`,
      user_id: 'demo-customer',
      lawyer_id: req.lawyer_id,
      user_name: req.user_name,
      lawyer_name: 'Adv. Priya Sharma',
      lawyer_avatar: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=200',
      last_message: 'Request accepted. Looking forward to our consultation.',
      last_message_time: new Date().toISOString(),
      unread: 0,
    });
    addNotification({
      id: `n-${Date.now()}`,
      user_id: 'demo-customer',
      type: 'appointment',
      title: 'Request Accepted',
      message: `Your request has been accepted by Adv. Priya Sharma. Consultation scheduled.`,
      read: false,
      created_at: new Date().toISOString(),
      link: '/appointments',
    });
  };

  const handleDecline = (reqId: string) => {
    updateLawyerRequest(reqId, { status: 'Declined' });
  };

  const pending = lawyerRequests.filter((r) => r.status === 'Pending');
  const resolved = lawyerRequests.filter((r) => r.status !== 'Pending');

  return (
    <div>
      <DashboardHeader title="New Requests" subtitle="Review and respond to client requests" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {pending.length === 0 && resolved.length === 0 ? (
          <EmptyState title="No requests yet" description="When clients send you requests, they will appear here." />
        ) : (
          <>
            {pending.length > 0 && (
              <div>
                <h2 className="font-bold text-navy-900 mb-3">Pending ({pending.length})</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {pending.map((req, i) => (
                    <motion.div key={req.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                      <Card className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar name={req.user_name} size="md" />
                            <div>
                              <h3 className="font-bold text-navy-900 text-sm">{req.user_name}</h3>
                              <p className="text-xs text-navy-400">{formatDate(req.created_at)}</p>
                            </div>
                          </div>
                          <Badge variant="info">{req.category}</Badge>
                        </div>
                        <p className="text-sm text-navy-600 mb-4">{req.summary}</p>
                        <div className="grid grid-cols-3 gap-2 text-xs mb-4">
                          <div className="flex items-center gap-1 text-navy-500"><MapPin className="w-3.5 h-3.5" /> {req.location}</div>
                          <div className="flex items-center gap-1 text-navy-500"><Globe className="w-3.5 h-3.5" /> {req.language}</div>
                          <div className="flex items-center gap-1 text-navy-500"><Clock className="w-3.5 h-3.5" /> {req.consultation_duration}m</div>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="primary" size="sm" fullWidth onClick={() => handleAccept(req.id)}><Check className="w-4 h-4" /> Accept</Button>
                          <Button variant="secondary" size="sm" fullWidth onClick={() => handleDecline(req.id)}><X className="w-4 h-4" /> Decline</Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            {resolved.length > 0 && (
              <div>
                <h2 className="font-bold text-navy-900 mb-3">Resolved ({resolved.length})</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {resolved.map((req) => (
                    <Card key={req.id} className="p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar name={req.user_name} size="md" />
                          <div>
                            <h3 className="font-bold text-navy-900 text-sm">{req.user_name}</h3>
                            <p className="text-xs text-navy-400">{formatDate(req.created_at)}</p>
                          </div>
                        </div>
                        <StatusBadge status={req.status} />
                      </div>
                      <p className="text-sm text-navy-600 mb-3">{req.summary}</p>
                      {req.status === 'Accepted' && (
                        <Button variant="secondary" size="sm" onClick={() => navigate('/lawyer/chat')}>Chat with Client <ArrowRight className="w-3.5 h-3.5" /></Button>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
