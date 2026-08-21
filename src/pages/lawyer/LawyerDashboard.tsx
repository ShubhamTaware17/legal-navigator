import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Inbox, Users, Calendar, Wallet, Clock, TrendingUp, ArrowRight, MessageSquare, Video } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Avatar } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatDate, formatCurrency } from '@/utils/cn';

export function LawyerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lawyerRequests, appointments, conversations } = useApp();

  const pendingRequests = lawyerRequests.filter((r) => r.status === 'Pending');
  const acceptedRequests = lawyerRequests.filter((r) => r.status === 'Accepted');
  const upcomingAppts = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Upcoming');
  const todayAppts = appointments.filter((a) => a.date === new Date().toISOString().split('T')[0]);
  const earnings = appointments.filter((a) => a.status === 'Completed').reduce((sum, a) => sum + a.fee, 0);

  const stats = [
    { label: 'New Requests', value: pendingRequests.length, icon: Inbox, color: 'text-teal-500' },
    { label: 'Active Clients', value: acceptedRequests.length, icon: Users, color: 'text-indigo-500' },
    { label: 'Upcoming', value: upcomingAppts.length, icon: Calendar, color: 'text-navy-600' },
    { label: 'Earnings', value: formatCurrency(earnings), icon: Wallet, color: 'text-emerald-500' },
  ];

  return (
    <div>
      <DashboardHeader title={`Welcome, ${user?.name?.split(' ')[0] || 'Advocate'}`} subtitle="Manage your cases, clients, and consultations" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-4">
                <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                <p className="text-xl sm:text-2xl font-bold text-navy-900">{s.value}</p>
                <p className="text-xs text-navy-500 mt-0.5">{s.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-navy-900">Pending Requests</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/lawyer/requests')}>View all <ArrowRight className="w-3.5 h-3.5" /></Button>
            </div>
            {pendingRequests.length === 0 ? (
              <p className="text-sm text-navy-400 text-center py-6">No pending requests.</p>
            ) : (
              <div className="space-y-3">
                {pendingRequests.slice(0, 3).map((req) => (
                  <div key={req.id} className="flex items-center justify-between p-3 rounded-xl border border-navy-100 hover:bg-navy-50 cursor-pointer transition-colors" onClick={() => navigate('/lawyer/requests')}>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-navy-900 text-sm">{req.category}</h3>
                      <p className="text-xs text-navy-500 mt-0.5 truncate">{req.user_name} · {req.location}</p>
                    </div>
                    <StatusBadge status={req.status} />
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-navy-900">Today's Consultations</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/lawyer/appointments')}>View all <ArrowRight className="w-3.5 h-3.5" /></Button>
            </div>
            {todayAppts.length === 0 ? (
              <p className="text-sm text-navy-400 text-center py-6">No consultations today.</p>
            ) : (
              <div className="space-y-3">
                {todayAppts.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                    <div className="flex items-center gap-3">
                      <Avatar name={apt.user_name} size="sm" />
                      <div>
                        <p className="font-semibold text-navy-900 text-sm">{apt.user_name}</p>
                        <p className="text-xs text-navy-500">{apt.time} · {apt.duration} min</p>
                      </div>
                    </div>
                    <Button variant="accent" size="sm" onClick={() => navigate(`/video-consultation/${apt.id}`)}><Video className="w-3.5 h-3.5" /> Join</Button>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-5">
            <h2 className="font-bold text-navy-900 mb-4">Upcoming Appointments</h2>
            {upcomingAppts.length === 0 ? (
              <p className="text-sm text-navy-400 text-center py-6">No upcoming appointments.</p>
            ) : (
              <div className="space-y-3">
                {upcomingAppts.slice(0, 4).map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{apt.user_name}</p>
                      <p className="text-xs text-navy-500">{formatDate(apt.date)} · {apt.time}</p>
                    </div>
                    <StatusBadge status={apt.status} />
                  </div>
                ))}
              </div>
            )}
          </Card>

          <Card className="p-5">
            <h2 className="font-bold text-navy-900 mb-4">Recent Conversations</h2>
            {conversations.length === 0 ? (
              <p className="text-sm text-navy-400 text-center py-6">No conversations yet.</p>
            ) : (
              <div className="space-y-3">
                {conversations.slice(0, 4).map((conv) => (
                  <div key={conv.id} className="flex items-center gap-3 p-3 rounded-xl border border-navy-100 hover:bg-navy-50 cursor-pointer transition-colors" onClick={() => navigate('/lawyer/chat')}>
                    <Avatar src={conv.lawyer_avatar} name={conv.user_name} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-navy-900 text-sm truncate">{conv.user_name}</p>
                      <p className="text-xs text-navy-400 truncate">{conv.last_message}</p>
                    </div>
                    {conv.unread > 0 && <span className="w-5 h-5 rounded-full bg-teal-500 text-white text-xs font-bold flex items-center justify-center">{conv.unread}</span>}
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
