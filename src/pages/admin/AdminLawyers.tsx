import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge, Avatar } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Search, ShieldCheck, CheckCircle2, XCircle } from 'lucide-react';
import { lawyers, legalCategories } from '@/data/demoData';
import { formatDate } from '@/utils/cn';

export function AdminLawyers() {
  const [search, setSearch] = useState('');
  const [verifiedLawyers, setVerifiedLawyers] = useState<Record<string, boolean>>(Object.fromEntries(lawyers.map((l) => [l.id, l.verified])));

  const filtered = lawyers.filter((l) => l.name.toLowerCase().includes(search.toLowerCase()) || l.specialization_ids.some((s) => legalCategories.find((c) => c.id === s)?.name.toLowerCase().includes(search.toLowerCase())));

  const toggleVerify = (id: string) => {
    setVerifiedLawyers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <DashboardHeader title="Lawyers" subtitle="Manage and verify lawyer profiles" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4"><ShieldCheck className="w-5 h-5 text-indigo-500 mb-2" /><p className="text-2xl font-bold text-navy-900">{lawyers.length}</p><p className="text-xs text-navy-500">Total Lawyers</p></Card>
          <Card className="p-4"><CheckCircle2 className="w-5 h-5 text-emerald-500 mb-2" /><p className="text-2xl font-bold text-navy-900">{Object.values(verifiedLawyers).filter(Boolean).length}</p><p className="text-xs text-navy-500">Verified</p></Card>
          <Card className="p-4"><XCircle className="w-5 h-5 text-amber-500 mb-2" /><p className="text-2xl font-bold text-navy-900">{Object.values(verifiedLawyers).filter((v) => !v).length}</p><p className="text-xs text-navy-500">Pending</p></Card>
        </div>

        <Card className="p-5">
          <Input placeholder="Search lawyers by name or specialization..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="w-5 h-5" />} className="mb-4" />
          <div className="space-y-3">
            {filtered.map((lawyer, i) => (
              <motion.div key={lawyer.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center justify-between p-4 rounded-xl border border-navy-100">
                <div className="flex items-center gap-3">
                  <Avatar src={lawyer.avatar_url} name={lawyer.name} size="md" />
                  <div>
                    <p className="font-semibold text-navy-900 text-sm">{lawyer.name}</p>
                    <p className="text-xs text-navy-500">{lawyer.specialization_ids.map((s) => legalCategories.find((c) => c.id === s)?.name).join(', ')} · {lawyer.city}</p>
                    <p className="text-xs text-navy-400 mt-0.5">Bar: {lawyer.bar_enrollment} · {lawyer.experience_years} years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge variant={verifiedLawyers[lawyer.id] ? 'success' : 'warning'}>{verifiedLawyers[lawyer.id] ? 'Verified' : 'Pending'}</Badge>
                  <Button variant={verifiedLawyers[lawyer.id] ? 'secondary' : 'primary'} size="sm" onClick={() => toggleVerify(lawyer.id)}>
                    {verifiedLawyers[lawyer.id] ? 'Revoke' : 'Verify'}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
