import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FolderOpen, ArrowRight, Plus } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { formatDate } from '@/utils/cn';

export function CustomerCases() {
  const navigate = useNavigate();
  const { cases } = useApp();

  return (
    <div>
      <DashboardHeader title="My Legal Problems" subtitle="Track and manage your legal matters" action={<Button variant="primary" size="sm" onClick={() => navigate('/legal-navigator')}><Plus className="w-4 h-4" /> New</Button>} />
      <div className="p-4 sm:p-6 lg:p-8">
        {cases.length === 0 ? (
          <EmptyState icon={<FolderOpen className="w-8 h-8" />} title="No legal problems yet" description="Start the Legal Navigator to understand your legal situation and create your first case." action={<Button variant="primary" onClick={() => navigate('/legal-navigator')}>Start Legal Navigator</Button>} />
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {cases.map((c, i) => (
              <motion.div key={c.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card hover className="p-5" onClick={() => navigate(`/cases/${c.id}`)}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0">
                      <h3 className="font-bold text-navy-900 truncate">{c.title}</h3>
                      <p className="text-xs text-navy-400 mt-0.5">{formatDate(c.created_at)}</p>
                    </div>
                    <StatusBadge status={c.status} />
                  </div>
                  <p className="text-sm text-navy-600 mb-3 line-clamp-2">{c.summary}</p>
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {c.categories.map((cat) => (
                      <Badge key={cat.category_id} variant={cat.relevance === 'High' ? 'success' : 'info'}>{cat.name}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-navy-100">
                    <span className="text-xs text-navy-400">{c.timeline.filter((t) => t.done).length} of {c.timeline.length} steps</span>
                    <span className="text-xs font-semibold text-teal-600 flex items-center gap-1">View Details <ArrowRight className="w-3 h-3" /></span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
