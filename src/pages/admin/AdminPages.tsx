import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { formatDate, formatCurrency } from '@/utils/cn';
import { motion } from 'framer-motion';
import { Inbox, Calendar, FileText, CreditCard, AlertCircle, Bell, BarChart3, FileEdit, Settings, GitBranch } from 'lucide-react';

export function AdminRequests() {
  const { lawyerRequests } = useApp();
  return (
    <div>
      <DashboardHeader title="Requests" subtitle="Manage all client-lawyer requests" />
      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="p-5">
          <div className="space-y-3">
            {lawyerRequests.map((req, i) => (
              <motion.div key={req.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                <div><p className="font-semibold text-navy-900 text-sm">{req.user_name} · {req.category}</p><p className="text-xs text-navy-500">{req.location} · {formatDate(req.created_at)}</p></div>
                <StatusBadge status={req.status} />
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function AdminAppointments() {
  const { appointments } = useApp();
  return (
    <div>
      <DashboardHeader title="Appointments" subtitle="View all platform appointments" />
      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="p-5">
          <div className="space-y-3">
            {appointments.map((apt, i) => (
              <motion.div key={apt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                <div><p className="font-semibold text-navy-900 text-sm">{apt.user_name} ↔ {apt.lawyer_name}</p><p className="text-xs text-navy-500">{formatDate(apt.date)} · {apt.time} · {apt.duration}m</p></div>
                <div className="flex items-center gap-3"><span className="text-sm font-bold text-navy-900">{formatCurrency(apt.total)}</span><StatusBadge status={apt.status} /></div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function AdminDocuments() {
  const { documents } = useApp();
  return (
    <div>
      <DashboardHeader title="Documents" subtitle="Monitor all uploaded documents" />
      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="p-5">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc, i) => (
              <motion.div key={doc.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <FileText className="w-8 h-8 text-navy-400" />
                    <div><p className="text-sm font-semibold text-navy-900 truncate">{doc.name}</p><p className="text-xs text-navy-400">{formatDate(doc.uploaded_at)}</p><Badge variant="default" className="mt-1">{doc.category}</Badge></div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function AdminPayments() {
  const { payments } = useApp();
  const totalRevenue = payments.filter((p) => p.status === 'Paid').reduce((s, p) => s + p.total, 0);
  return (
    <div>
      <DashboardHeader title="Payments" subtitle="Track all platform transactions" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4"><CreditCard className="w-5 h-5 text-teal-500 mb-2" /><p className="text-2xl font-bold text-navy-900">{formatCurrency(totalRevenue)}</p><p className="text-xs text-navy-500">Total Revenue</p></Card>
          <Card className="p-4"><CreditCard className="w-5 h-5 text-navy-600 mb-2" /><p className="text-2xl font-bold text-navy-900">{payments.length}</p><p className="text-xs text-navy-500">Transactions</p></Card>
          <Card className="p-4"><CreditCard className="w-5 h-5 text-emerald-500 mb-2" /><p className="text-2xl font-bold text-navy-900">{payments.filter((p) => p.status === 'Paid').length}</p><p className="text-xs text-navy-500">Successful</p></Card>
        </div>
        <Card className="p-5">
          <div className="space-y-3">
            {payments.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                <div><p className="font-semibold text-navy-900 text-sm">{p.description}</p><p className="text-xs text-navy-500">{formatDate(p.created_at)} · {p.method}</p></div>
                <div className="flex items-center gap-3"><span className="font-bold text-navy-900">{formatCurrency(p.total)}</span><StatusBadge status={p.status} /></div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function AdminComplaints() {
  return (
    <div>
      <DashboardHeader title="Complaints" subtitle="Manage user complaints and issues" />
      <div className="p-4 sm:p-6 lg:p-8">
        <EmptyState icon={<AlertCircle className="w-8 h-8" />} title="No complaints" description="There are currently no active complaints on the platform." />
      </div>
    </div>
  );
}

export function AdminNotifications() {
  const { notifications } = useApp();
  return (
    <div>
      <DashboardHeader title="Notifications" subtitle="Manage platform-wide notifications" />
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
        <div className="space-y-3">
          {notifications.map((n, i) => (
            <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
              <Card className="p-4"><div className="flex items-start gap-3"><Bell className="w-5 h-5 text-navy-400 mt-0.5" /><div><p className="font-semibold text-navy-900 text-sm">{n.title}</p><p className="text-xs text-navy-500">{n.message}</p><p className="text-xs text-navy-400 mt-1">{formatDate(n.created_at)}</p></div></div></Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function AdminReports() {
  const { cases, appointments, payments } = useApp();
  return (
    <div>
      <DashboardHeader title="Reports" subtitle="Platform analytics and insights" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Cases', value: cases.length + 89, icon: Inbox },
            { label: 'Appointments', value: appointments.length + 156, icon: Calendar },
            { label: 'Revenue', value: formatCurrency(payments.reduce((s, p) => s + p.total, 0) + 145000), icon: CreditCard },
            { label: 'Active Users', value: 1247, icon: BarChart3 },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-4"><s.icon className="w-5 h-5 text-navy-500 mb-2" /><p className="text-xl font-bold text-navy-900">{s.value}</p><p className="text-xs text-navy-500">{s.label}</p></Card>
            </motion.div>
          ))}
        </div>
        <Card className="p-6">
          <h2 className="font-bold text-navy-900 mb-4">Consultation Statistics</h2>
          <div className="space-y-3">
            {['Video', 'Chat', 'Voice'].map((type) => {
              const pct = type === 'Video' ? 65 : type === 'Chat' ? 25 : 10;
              return (
                <div key={type}>
                  <div className="flex items-center justify-between text-sm mb-1"><span className="text-navy-700">{type} Consultations</span><span className="font-semibold text-navy-900">{pct}%</span></div>
                  <div className="h-2 bg-navy-100 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-navy-600 to-teal-500 rounded-full" style={{ width: `${pct}%` }} /></div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function AdminCMS() {
  return (
    <div>
      <DashboardHeader title="CMS" subtitle="Manage website content and banners" />
      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4"><FileEdit className="w-6 h-6 text-navy-500" /><h2 className="font-bold text-navy-900">Website Content</h2></div>
          <div className="space-y-3">
            {['Hero Headline', 'Hero Subheading', 'How It Works Section', 'Footer Links', 'FAQ Content', 'Legal Information'].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                <span className="text-sm font-semibold text-navy-700">{item}</span>
                <Badge variant="success">Published</Badge>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function AdminSettings() {
  return (
    <div>
      <DashboardHeader title="Settings" subtitle="Platform configuration" />
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4"><Settings className="w-6 h-6 text-navy-500" /><h2 className="font-bold text-navy-900">Platform Settings</h2></div>
          <div className="space-y-4">
            {[
              { label: 'Platform Commission', value: '10%' },
              { label: 'Minimum Consultation Fee', value: '₹199' },
              { label: 'Maximum File Upload Size', value: '10 MB' },
              { label: 'Auto-accept Requests', value: 'Disabled' },
              { label: 'Email Notifications', value: 'Enabled' },
            ].map((s) => (
              <div key={s.label} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                <span className="text-sm font-semibold text-navy-700">{s.label}</span>
                <span className="text-sm text-navy-900">{s.value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function AdminQuestionLogic() {
  return (
    <div>
      <DashboardHeader title="Question Logic" subtitle="Configure question branching and flow" />
      <div className="p-4 sm:p-6 lg:p-8">
        <Card className="p-6">
          <div className="flex items-center gap-3 mb-4"><GitBranch className="w-6 h-6 text-navy-500" /><h2 className="font-bold text-navy-900">Question Flow Diagram</h2></div>
          <p className="text-sm text-navy-500 mb-4">Visualize how questions branch based on user answers.</p>
          <div className="space-y-2">
            {['Q1: What happened? → 12 branches', 'Q2: Legal notice type → 6 branches', 'Q8: Who threatened? → 5 branches', 'Q8a: Immediate threat? → Emergency / Continue', 'Q12: When did it happen? → 4 branches'].map((item) => (
              <div key={item} className="flex items-center gap-2 p-3 rounded-xl bg-navy-50 text-sm text-navy-700"><GitBranch className="w-4 h-4 text-teal-500" /> {item}</div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
