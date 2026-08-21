import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FolderOpen, Calendar, FileText, Inbox, Users, Sparkles, Upload, MessageSquare,
  ArrowRight, Bell, CreditCard, Briefcase,
} from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge, Avatar } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { lawyers, legalCategories } from '@/data/demoData';
import { formatCurrency, formatDate, timeAgo } from '@/utils/cn';

export function CustomerDashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cases, appointments, documents, notifications, conversations } = useApp();

  const upcomingAppt = appointments.find((a) => a.status === 'Confirmed' || a.status === 'Upcoming');
  const activeCases = cases.filter((c) => c.status !== 'Completed' && c.status !== 'Closed');
  const unreadNotifs = notifications.filter((n) => !n.read);
  const recommendedLawyers = lawyers.filter((l) => l.verified).slice(0, 3);

  const stats = [
    { label: 'Active Problems', value: activeCases.length, icon: FolderOpen, color: 'navy' },
    { label: 'Appointments', value: appointments.length, icon: Calendar, color: 'teal' },
    { label: 'Documents', value: documents.length, icon: FileText, color: 'indigo' },
    { label: 'Unread', value: unreadNotifs.length, icon: Bell, color: 'amber' },
  ];

  const quickActions = [
    { label: 'Understand My Legal Problem', icon: Sparkles, to: '/legal-navigator', variant: 'primary' as const },
    { label: 'Find a Lawyer', icon: Users, to: '/find-lawyer', variant: 'secondary' as const },
    { label: 'Upload Document', icon: Upload, to: '/documents', variant: 'secondary' as const },
    { label: 'Book Consultation', icon: Calendar, to: '/find-lawyer', variant: 'secondary' as const },
  ];

  return (
    <div>
      <DashboardHeader title={`Welcome, ${user?.name?.split(' ')[0] || 'there'}`} subtitle="Here's an overview of your legal matters" />

      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <stat.icon className="w-5 h-5 text-navy-400" />
                </div>
                <p className="text-2xl font-bold text-navy-900">{stat.value}</p>
                <p className="text-xs text-navy-500 mt-0.5">{stat.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {quickActions.map((action, i) => (
            <motion.div key={action.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Button variant={action.variant} size="md" fullWidth onClick={() => navigate(action.to)} className="h-full">
                <action.icon className="w-4 h-4" /> <span className="text-xs sm:text-sm">{action.label}</span>
              </Button>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Legal Problems */}
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-navy-900">Active Legal Problems</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/cases')}>View all <ArrowRight className="w-3.5 h-3.5" /></Button>
            </div>
            {activeCases.length === 0 ? (
              <div className="text-center py-8">
                <FolderOpen className="w-10 h-10 text-navy-200 mx-auto mb-2" />
                <p className="text-sm text-navy-500 mb-3">No active legal problems yet.</p>
                <Button variant="primary" size="sm" onClick={() => navigate('/legal-navigator')}>Start Legal Navigator</Button>
              </div>
            ) : (
              <div className="space-y-3">
                {activeCases.slice(0, 3).map((c) => (
                  <div key={c.id} className="flex items-center justify-between p-3 rounded-xl border border-navy-100 hover:bg-navy-50 cursor-pointer transition-colors" onClick={() => navigate(`/cases/${c.id}`)}>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-navy-900 text-sm truncate">{c.title}</h3>
                      <p className="text-xs text-navy-500 mt-0.5 truncate">{c.summary}</p>
                      <div className="flex gap-1 mt-1.5">
                        {c.categories.slice(0, 2).map((cat) => (
                          <Badge key={cat.category_id} variant="info">{cat.name}</Badge>
                        ))}
                      </div>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                ))}
              </div>
            )}
          </Card>

          {/* Upcoming Consultation */}
          <Card className="p-5">
            <h2 className="font-bold text-navy-900 mb-4">Upcoming Consultation</h2>
            {upcomingAppt ? (
              <div className="bg-gradient-to-br from-navy-50 to-teal-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Avatar src={lawyers.find((l) => l.id === upcomingAppt.lawyer_id)?.avatar_url} name={upcomingAppt.lawyer_name} size="md" />
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{upcomingAppt.lawyer_name}</p>
                    <p className="text-xs text-navy-500">{upcomingAppt.duration} min · Video</p>
                  </div>
                </div>
                <div className="space-y-1 text-sm text-navy-600">
                  <p className="flex items-center gap-2"><Calendar className="w-4 h-4 text-navy-400" /> {formatDate(upcomingAppt.date)}</p>
                  <p className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-navy-400" /> {upcomingAppt.time}</p>
                </div>
                <Button variant="primary" size="sm" fullWidth className="mt-4" onClick={() => navigate(`/video-consultation/${upcomingAppt.id}`)}>Join Consultation</Button>
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="w-10 h-10 text-navy-200 mx-auto mb-2" />
                <p className="text-sm text-navy-500 mb-3">No upcoming consultations.</p>
                <Button variant="secondary" size="sm" onClick={() => navigate('/find-lawyer')}>Book One</Button>
              </div>
            )}
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Recommended Lawyers */}
          <Card className="p-5 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-navy-900">Recommended Lawyers</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/lawyers')}>View all <ArrowRight className="w-3.5 h-3.5" /></Button>
            </div>
            <div className="grid sm:grid-cols-3 gap-3">
              {recommendedLawyers.map((lawyer) => (
                <div key={lawyer.id} className="p-3 rounded-xl border border-navy-100 hover:shadow-soft transition-all cursor-pointer" onClick={() => navigate(`/lawyer/${lawyer.id}`)}>
                  <Avatar src={lawyer.avatar_url} name={lawyer.name} size="md" className="mx-auto mb-2" />
                  <p className="text-sm font-semibold text-navy-900 text-center truncate">{lawyer.name}</p>
                  <p className="text-xs text-navy-500 text-center truncate">{lawyer.city}</p>
                  <p className="text-xs font-bold text-navy-900 text-center mt-1">From {formatCurrency(lawyer.consultation_fee_15)}</p>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Notifications */}
          <Card className="p-5">
            <h2 className="font-bold text-navy-900 mb-4">Recent Notifications</h2>
            <div className="space-y-3">
              {notifications.slice(0, 4).map((n) => (
                <div key={n.id} className={`p-3 rounded-xl ${n.read ? 'bg-navy-50' : 'bg-teal-50 border border-teal-100'}`}>
                  <p className="text-sm font-semibold text-navy-900">{n.title}</p>
                  <p className="text-xs text-navy-500 mt-0.5">{n.message}</p>
                  <p className="text-xs text-navy-400 mt-1">{timeAgo(n.created_at)}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
