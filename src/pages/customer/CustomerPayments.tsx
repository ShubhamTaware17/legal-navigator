import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, ArrowRight, TrendingUp, CheckCircle2 } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { formatCurrency, formatDate } from '@/utils/cn';

export function CustomerPayments() {
  const navigate = useNavigate();
  const { payments } = useApp();
  const totalPaid = payments.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + p.total, 0);

  return (
    <div>
      <DashboardHeader title="Payments" subtitle="View your payment history" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="p-5">
            <TrendingUp className="w-5 h-5 text-teal-500 mb-2" />
            <p className="text-2xl font-bold text-navy-900">{formatCurrency(totalPaid)}</p>
            <p className="text-xs text-navy-500 mt-0.5">Total Paid</p>
          </Card>
          <Card className="p-5">
            <CreditCard className="w-5 h-5 text-navy-400 mb-2" />
            <p className="text-2xl font-bold text-navy-900">{payments.length}</p>
            <p className="text-xs text-navy-500 mt-0.5">Transactions</p>
          </Card>
          <Card className="p-5">
            <CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" />
            <p className="text-2xl font-bold text-navy-900">{payments.filter((p) => p.status === 'Paid').length}</p>
            <p className="text-xs text-navy-500 mt-0.5">Successful</p>
          </Card>
        </div>

        {payments.length === 0 ? (
          <EmptyState icon={<CreditCard className="w-8 h-8" />} title="No payments yet" description="Your payment history will appear here once you book a consultation." action={<Button variant="primary" onClick={() => navigate('/find-lawyer')}>Find a Lawyer</Button>} />
        ) : (
          <Card className="p-5">
            <h2 className="font-bold text-navy-900 mb-4">Transaction History</h2>
            <div className="space-y-3">
              {payments.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="flex items-center justify-between p-4 rounded-xl border border-navy-100 hover:bg-navy-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-600"><CreditCard className="w-5 h-5" /></div>
                    <div>
                      <p className="font-semibold text-navy-900 text-sm">{p.description}</p>
                      <p className="text-xs text-navy-400">{formatDate(p.created_at)} · {p.method}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-navy-900">{formatCurrency(p.total)}</p>
                    <Badge variant={p.status === 'Paid' ? 'success' : 'warning'}>{p.status}</Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
