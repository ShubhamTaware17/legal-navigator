import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, MessageSquare, FileText, ArrowRight } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Avatar, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { formatDate } from '@/utils/cn';

export function LawyerClients() {
  const navigate = useNavigate();
  const { lawyerRequests, cases } = useApp();
  const clients = lawyerRequests.filter((r) => r.status === 'Accepted');

  return (
    <div>
      <DashboardHeader title="My Clients" subtitle="Manage your active client relationships" />
      <div className="p-4 sm:p-6 lg:p-8">
        {clients.length === 0 ? (
          <EmptyState icon={<Users className="w-8 h-8" />} title="No clients yet" description="When you accept client requests, they will appear here." />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {clients.map((client, i) => {
              const clientCases = cases.filter((c) => c.user_id === 'demo-customer');
              return (
                <motion.div key={client.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-5">
                    <div className="flex items-center gap-3 mb-4">
                      <Avatar name={client.user_name} size="md" />
                      <div>
                        <h3 className="font-bold text-navy-900 text-sm">{client.user_name}</h3>
                        <p className="text-xs text-navy-500">Since {formatDate(client.created_at)}</p>
                      </div>
                    </div>
                    <div className="space-y-2 text-sm text-navy-600 mb-4">
                      <p className="flex items-center gap-2"><FileText className="w-4 h-4 text-navy-400" /> {client.category}</p>
                      <p className="flex items-center gap-2"><Badge variant="default">{client.consultation_duration} min consultation</Badge></p>
                    </div>
                    <div className="flex gap-2 pt-3 border-t border-navy-100">
                      <Button variant="primary" size="sm" fullWidth onClick={() => navigate('/lawyer/chat')}><MessageSquare className="w-4 h-4" /> Chat</Button>
                      <Button variant="secondary" size="sm" fullWidth onClick={() => navigate('/lawyer/documents')}>Files</Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
