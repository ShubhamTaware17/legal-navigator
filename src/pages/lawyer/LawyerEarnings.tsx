import { DashboardHeader } from '@/components/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { formatCurrency, formatDate } from '@/utils/cn';
import { Wallet, TrendingUp, DollarSign, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export function LawyerEarnings() {
  const { payments } = useApp();
  const consultationPayments = payments.filter((p) => p.appointment_id);
  const totalEarnings = consultationPayments.reduce((sum, p) => sum + p.amount, 0);
  const platformFees = consultationPayments.reduce((sum, p) => sum + p.platform_fee, 0);
  const netEarnings = totalEarnings - platformFees;

  const stats = [
    { label: 'Total Earnings', value: formatCurrency(totalEarnings), icon: Wallet, color: 'text-navy-600' },
    { label: 'Platform Fees', value: formatCurrency(platformFees), icon: DollarSign, color: 'text-error-500' },
    { label: 'Net Earnings', value: formatCurrency(netEarnings), icon: TrendingUp, color: 'text-emerald-500' },
  ];

  return (
    <div>
      <DashboardHeader title="Earnings" subtitle="Track your consultation revenue" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5">
                <s.icon className={`w-5 h-5 ${s.color} mb-2`} />
                <p className="text-2xl font-bold text-navy-900">{s.value}</p>
                <p className="text-xs text-navy-500 mt-0.5">{s.label}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <Card className="p-5">
          <h2 className="font-bold text-navy-900 mb-4">Payment History</h2>
          {consultationPayments.length === 0 ? (
            <p className="text-sm text-navy-400 text-center py-6">No earnings yet.</p>
          ) : (
            <div className="space-y-3">
              {consultationPayments.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center text-navy-600"><Calendar className="w-4 h-4" /></div>
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{p.description}</p>
                      <p className="text-xs text-navy-400">{formatDate(p.created_at)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-navy-900">{formatCurrency(p.amount)}</p>
                    <p className="text-xs text-navy-400">Fee: {formatCurrency(p.platform_fee)}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
