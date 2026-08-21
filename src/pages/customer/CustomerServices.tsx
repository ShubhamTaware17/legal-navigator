import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, ArrowRight, Check, Loader2, CheckCircle2, X } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { DisclaimerBanner } from '@/components/ui/DisclaimerBanner';
import { useApp } from '@/contexts/AppContext';
import { legalServices, lawyers } from '@/data/demoData';
import { formatCurrency, formatDate } from '@/utils/cn';
import type { ServiceOrder, Payment } from '@/types';

const iconMap: Record<string, typeof Briefcase> = {
  FileText: Briefcase, Reply: Briefcase, FileSearch: Briefcase, FileSignature: Briefcase,
  FileWarning: Briefcase, FileEdit: Briefcase, FolderOpen: Briefcase, Briefcase,
};

export function CustomerServices() {
  const navigate = useNavigate();
  const { serviceOrders, addServiceOrder, addPayment } = useApp();
  const [selectedService, setSelectedService] = useState<typeof legalServices[0] | null>(null);
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  const handleOrder = async () => {
    if (!selectedService) return;
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1200));
    const orderId = `so-${Date.now()}`;
    const order: ServiceOrder = {
      id: orderId,
      service_id: selectedService.id,
      service_name: selectedService.name,
      user_id: 'demo-customer',
      lawyer_id: lawyers[0].id,
      price: selectedService.price,
      status: 'In Progress',
      created_at: new Date().toISOString(),
    };
    addServiceOrder(order);
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      user_id: 'demo-customer',
      service_order_id: orderId,
      amount: selectedService.price,
      platform_fee: 0,
      total: selectedService.price,
      method: 'UPI',
      status: 'Paid',
      created_at: new Date().toISOString(),
      description: selectedService.name,
    };
    addPayment(payment);
    setProcessing(false);
    setConfirmed(true);
    setTimeout(() => { setConfirmed(false); setSelectedService(null); }, 2000);
  };

  return (
    <div>
      <DashboardHeader title="Legal Services" subtitle="Browse and order legal services" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Active Orders */}
        {serviceOrders.length > 0 && (
          <Card className="p-5">
            <h2 className="font-bold text-navy-900 mb-4">My Orders</h2>
            <div className="space-y-3">
              {serviceOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{order.service_name}</p>
                    <p className="text-xs text-navy-400">{formatDate(order.created_at)} · {formatCurrency(order.price)}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Services */}
        <div>
          <h2 className="font-bold text-navy-900 mb-4">Available Services</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {legalServices.map((service, i) => {
              const Icon = iconMap[service.icon] || Briefcase;
              return (
                <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-5 h-full flex flex-col">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-100 to-navy-50 flex items-center justify-center text-navy-700 mb-3">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-navy-900 text-sm mb-1">{service.name}</h3>
                    <p className="text-xs text-navy-500 mb-4 flex-1">{service.description}</p>
                    <div className="flex items-center justify-between pt-3 border-t border-navy-100">
                      <span className="font-bold text-navy-900">{formatCurrency(service.price)}</span>
                      <Button variant="primary" size="sm" onClick={() => setSelectedService(service)}>Order</Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        <DisclaimerBanner />
      </div>

      {/* Order Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 backdrop-blur-sm" onClick={() => !processing && setSelectedService(null)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-elevated max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            {confirmed ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-navy-900">Order Placed!</h3>
                <p className="text-sm text-navy-500 mt-1">Your service order has been confirmed.</p>
              </div>
            ) : (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-navy-900">Order Service</h3>
                  <button onClick={() => setSelectedService(null)} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50"><X className="w-5 h-5" /></button>
                </div>
                <div className="space-y-4">
                  <div className="bg-navy-50 rounded-xl p-4">
                    <p className="font-semibold text-navy-900">{selectedService.name}</p>
                    <p className="text-xs text-navy-500 mt-1">{selectedService.description}</p>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-navy-500">Service Fee</span>
                    <span className="font-bold text-navy-900">{formatCurrency(selectedService.price)}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm pt-2 border-t border-navy-100">
                    <span className="font-bold text-navy-900">Total</span>
                    <span className="font-bold text-navy-900 text-lg">{formatCurrency(selectedService.price)}</span>
                  </div>
                  <Button variant="accent" size="lg" fullWidth onClick={handleOrder} disabled={processing}>
                    {processing ? (<><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>) : (<>Pay & Order <ArrowRight className="w-4 h-4" /></>)}
                  </Button>
                  <p className="text-xs text-navy-400 text-center">Demo payment — no real transaction will occur.</p>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}
