import { motion } from 'framer-motion';
import { Users, Briefcase, FolderTree, Calendar, CreditCard, TrendingUp, Inbox, CheckCircle2, Star } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useApp } from '@/contexts/AppContext';
import { lawyers, legalCategories, demoUsers } from '@/data/demoData';
import { formatCurrency, formatDate } from '@/utils/cn';

export function AdminDashboard() {
  const { cases, appointments, payments, lawyerRequests } = useApp();
  const verifiedLawyers = lawyers.filter((l) => l.verified).length;
  const totalRevenue = payments.filter((p) => p.status === 'Paid').reduce((s, p) => s + p.total, 0);
  const pendingRequests = lawyerRequests.filter((r) => r.status === 'Pending').length;
  const completedConsultations = appointments.filter((a) => a.status === 'Completed').length;

  const kpis = [
    { label: 'Total Users', value: demoUsers.length + 1247, icon: Users, color: 'text-navy-600' },
    { label: 'Total Lawyers', value: lawyers.length, icon: Briefcase, color: 'text-indigo-500' },
    { label: 'Verified Lawyers', value: verifiedLawyers, icon: CheckCircle2, color: 'text-emerald-500' },
    { label: 'Legal Requests', value: cases.length + 89, icon: Inbox, color: 'text-teal-500' },
    { label: 'Consultations', value: appointments.length + 156, icon: Calendar, color: 'text-navy-600' },
    { label: 'Completed', value: completedConsultations + 142, icon: CheckCircle2, color: 'text-emerald-500' },
    { label: 'Revenue', value: formatCurrency(totalRevenue + 145000), icon: TrendingUp, color: 'text-teal-500' },
    { label: 'Pending Requests', value: pendingRequests, icon: Inbox, color: 'text-amber-500' },
  ];

  const categoryDistribution = legalCategories.map((cat) => {
    const count = cases.filter((c) => c.categories.some((cc) => cc.category_id === cat.id)).length + Math.floor(Math.random() * 20 + 5);
    return { name: cat.name, count };
  }).sort((a, b) => b.count - a.count);
  const maxCount = Math.max(...categoryDistribution.map((c) => c.count));

  const monthlyTrend = [
    { month: 'Jan', value: 12 }, { month: 'Feb', value: 18 }, { month: 'Mar', value: 25 },
    { month: 'Apr', value: 22 }, { month: 'May', value: 30 }, { month: 'Jun', value: 28 },
    { month: 'Jul', value: 35 }, { month: 'Aug', value: 42 },
  ];
  const maxTrend = Math.max(...monthlyTrend.map((m) => m.value));

  const topLawyers = [...lawyers].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div>
      <DashboardHeader title="Admin Dashboard" subtitle="Platform overview and analytics" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi, i) => (
            <motion.div key={kpi.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-4">
                <kpi.icon className={`w-5 h-5 ${kpi.color} mb-2`} />
                <p className="text-xl sm:text-2xl font-bold text-navy-900">{kpi.value}</p>
                <p className="text-xs text-navy-500 mt-0.5">{kpi.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="font-bold text-navy-900 mb-4">Monthly Consultation Trend</h2>
            <div className="flex items-end justify-between gap-2 h-48">
              {monthlyTrend.map((m) => (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full bg-gradient-to-t from-navy-700 to-teal-500 rounded-t-lg transition-all hover:opacity-80" style={{ height: `${(m.value / maxTrend) * 100}%` }} />
                  <span className="text-xs text-navy-500">{m.month}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-bold text-navy-900 mb-4">Legal Category Distribution</h2>
            <div className="space-y-3">
              {categoryDistribution.map((cat) => (
                <div key={cat.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span className="text-navy-700">{cat.name}</span>
                    <span className="font-semibold text-navy-900">{cat.count}</span>
                  </div>
                  <div className="h-2 bg-navy-100 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-navy-600 to-teal-500 rounded-full" style={{ width: `${(cat.count / maxCount) * 100}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6">
          <h2 className="font-bold text-navy-900 mb-4">Top Performing Lawyers</h2>
          <div className="space-y-3">
            {topLawyers.map((lawyer, i) => (
              <div key={lawyer.id} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-full bg-navy-100 flex items-center justify-center text-xs font-bold text-navy-700">{i + 1}</span>
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{lawyer.name}</p>
                    <p className="text-xs text-navy-500">{lawyer.city} · {lawyer.experience_years} years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-navy-900">{lawyer.rating}</span>
                  </div>
                  <Badge variant="success">{lawyer.review_count} reviews</Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="font-bold text-navy-900 mb-4">Recent Requests</h2>
            <div className="space-y-3">
              {lawyerRequests.slice(0, 5).map((req) => (
                <div key={req.id} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{req.user_name}</p>
                    <p className="text-xs text-navy-500">{req.category} · {formatDate(req.created_at)}</p>
                  </div>
                  <StatusBadge status={req.status} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="font-bold text-navy-900 mb-4">Recent Payments</h2>
            <div className="space-y-3">
              {payments.slice(0, 5).map((p) => (
                <div key={p.id} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{p.description}</p>
                    <p className="text-xs text-navy-500">{formatDate(p.created_at)} · {p.method}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-navy-900">{formatCurrency(p.total)}</p>
                    <StatusBadge status={p.status} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
