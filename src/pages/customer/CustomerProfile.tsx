import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Avatar } from '@/components/ui/Card';
import { Input, Textarea } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle2, User, Mail, Phone, MapPin } from 'lucide-react';

export function CustomerProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: user?.phone || '', city: '', bio: '' });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <DashboardHeader title="Profile" subtitle="Manage your personal information" />
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6 mb-6">
            <div className="flex items-center gap-4 mb-6">
              <Avatar src={user?.avatar_url} name={user?.name || 'User'} size="lg" className="w-20 h-20 text-2xl" />
              <div>
                <h2 className="text-xl font-bold text-navy-900">{user?.name}</h2>
                <p className="text-sm text-navy-500">{user?.email}</p>
                <span className="inline-flex items-center gap-1 mt-1 text-xs font-semibold text-teal-600 capitalize"><User className="w-3 h-3" /> {user?.role}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-bold text-navy-900 mb-4">Personal Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} icon={<User className="w-4 h-4" />} />
              <Input label="Email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} icon={<Mail className="w-4 h-4" />} />
              <Input label="Phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} icon={<Phone className="w-4 h-4" />} />
              <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} icon={<MapPin className="w-4 h-4" />} />
            </div>
            <div className="mt-4">
              <Textarea label="Bio" rows={3} placeholder="Tell us about yourself..." value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </div>
            <div className="flex items-center gap-3 mt-6">
              <Button variant="primary" onClick={handleSave}>Save Changes</Button>
              {saved && <span className="flex items-center gap-1 text-sm text-emerald-600 font-semibold"><CheckCircle2 className="w-4 h-4" /> Saved!</span>}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
