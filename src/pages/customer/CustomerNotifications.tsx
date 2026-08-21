import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Bell, CheckCheck, ArrowRight } from 'lucide-react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { EmptyState } from '@/components/ui/States';
import { useApp } from '@/contexts/AppContext';
import { timeAgo } from '@/utils/cn';

export function CustomerNotifications() {
  const navigate = useNavigate();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useApp();

  return (
    <div>
      <DashboardHeader
        title="Notifications"
        subtitle="Stay updated on your legal matters"
        action={notifications.some((n) => !n.read) ? <Button variant="secondary" size="sm" onClick={markAllNotificationsRead}><CheckCheck className="w-4 h-4" /> Mark all read</Button> : undefined}
      />
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
        {notifications.length === 0 ? (
          <EmptyState icon={<Bell className="w-8 h-8" />} title="No notifications" description="You'll be notified about appointments, messages, and updates here." />
        ) : (
          <div className="space-y-3">
            {notifications.map((n, i) => (
              <motion.div key={n.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className={`p-4 cursor-pointer transition-all hover:shadow-soft ${!n.read ? 'border-teal-200 bg-teal-50/50' : ''}`} onClick={() => { markNotificationRead(n.id); if (n.link) navigate(n.link); }}>
                  <div className="flex items-start gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${!n.read ? 'bg-teal-100 text-teal-600' : 'bg-navy-50 text-navy-400'}`}>
                      <Bell className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-navy-900 text-sm">{n.title}</p>
                        {!n.read && <span className="w-2 h-2 rounded-full bg-teal-500" />}
                      </div>
                      <p className="text-sm text-navy-500 mt-0.5">{n.message}</p>
                      <p className="text-xs text-navy-400 mt-1">{timeAgo(n.created_at)}</p>
                    </div>
                    {n.link && <ArrowRight className="w-4 h-4 text-navy-300 flex-shrink-0 mt-2" />}
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
