import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { useApp } from '@/contexts/AppContext';
import { legalServices } from '@/data/demoData';
import { formatCurrency } from '@/utils/cn';
import { motion } from 'framer-motion';
import { Briefcase, Plus, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export function LawyerServices() {
  const { serviceOrders } = useApp();
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div>
      <DashboardHeader title="Legal Services" subtitle="Manage your service offerings" action={<Button variant="primary" size="sm" onClick={() => setShowAdd(!showAdd)}><Plus className="w-4 h-4" /> Add Service</Button>} />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        {serviceOrders.length > 0 && (
          <Card className="p-5">
            <h2 className="font-bold text-navy-900 mb-4">Active Orders</h2>
            <div className="space-y-3">
              {serviceOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{order.service_name}</p>
                    <p className="text-xs text-navy-400">{formatCurrency(order.price)}</p>
                  </div>
                  <StatusBadge status={order.status} />
                </div>
              ))}
            </div>
          </Card>
        )}

        <div>
          <h2 className="font-bold text-navy-900 mb-4">Available Service Templates</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {legalServices.map((service, i) => (
              <motion.div key={service.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card className="p-5">
                  <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-600 mb-3"><Briefcase className="w-5 h-5" /></div>
                  <h3 className="font-bold text-navy-900 text-sm mb-1">{service.name}</h3>
                  <p className="text-xs text-navy-500 mb-3">{service.description}</p>
                  <div className="flex items-center justify-between pt-3 border-t border-navy-100">
                    <span className="font-bold text-navy-900">{formatCurrency(service.price)}</span>
                    <Button variant="secondary" size="sm" onClick={() => setShowAdd(false)}>Offer</Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
