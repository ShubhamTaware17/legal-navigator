import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge, Avatar } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Search, Users, ShieldCheck, Calendar } from 'lucide-react';
import { demoUsers } from '@/data/demoData';
import { formatDate } from '@/utils/cn';

export function AdminUsers() {
  const [search, setSearch] = useState('');
  const allUsers = [
    ...demoUsers,
    { id: 'u1', name: 'Rahul Verma', email: 'rahul@example.com', role: 'customer' as const, created_at: '2026-07-01', avatar_url: 'https://images.pexels.com/photos/6148101/pexels-photo-6148101.jpeg?auto=compress&cs=tinysrgb&w=200' },
    { id: 'u2', name: 'Sneha Patil', email: 'sneha@example.com', role: 'customer' as const, created_at: '2026-06-15' },
    { id: 'u3', name: 'Amit Shah', email: 'amit@example.com', role: 'customer' as const, created_at: '2026-05-20' },
    { id: 'u4', name: 'Adv. Rajesh Kumar', email: 'rajesh@legalnavigator.in', role: 'lawyer' as const, created_at: '2026-01-10' },
    { id: 'u5', name: 'Adv. Meera Iyer', email: 'meera@legalnavigator.in', role: 'lawyer' as const, created_at: '2026-02-15' },
  ];

  const filtered = allUsers.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <DashboardHeader title="Users" subtitle="Manage all platform users" />
      <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4"><Users className="w-5 h-5 text-navy-600 mb-2" /><p className="text-2xl font-bold text-navy-900">{allUsers.filter((u) => u.role === 'customer').length}</p><p className="text-xs text-navy-500">Customers</p></Card>
          <Card className="p-4"><ShieldCheck className="w-5 h-5 text-indigo-500 mb-2" /><p className="text-2xl font-bold text-navy-900">{allUsers.filter((u) => u.role === 'lawyer').length}</p><p className="text-xs text-navy-500">Lawyers</p></Card>
          <Card className="p-4"><Calendar className="w-5 h-5 text-teal-500 mb-2" /><p className="text-2xl font-bold text-navy-900">{allUsers.length}</p><p className="text-xs text-navy-500">Total Users</p></Card>
        </div>

        <Card className="p-5">
          <Input placeholder="Search users by name or email..." value={search} onChange={(e) => setSearch(e.target.value)} icon={<Search className="w-5 h-5" />} className="mb-4" />
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="text-left text-navy-400 border-b border-navy-100">
                <th className="pb-3 font-semibold">User</th><th className="pb-3 font-semibold">Role</th><th className="pb-3 font-semibold">Joined</th><th className="pb-3 font-semibold">Status</th>
              </tr></thead>
              <tbody>
                {filtered.map((user, i) => (
                  <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="border-b border-navy-50 hover:bg-navy-50">
                    <td className="py-3"><div className="flex items-center gap-2"><Avatar src={user.avatar_url} name={user.name} size="sm" /><div><p className="font-semibold text-navy-900">{user.name}</p><p className="text-xs text-navy-400">{user.email}</p></div></div></td>
                    <td className="py-3"><Badge variant={user.role === 'lawyer' ? 'info' : 'default'}>{user.role}</Badge></td>
                    <td className="py-3 text-navy-500">{formatDate(user.created_at)}</td>
                    <td className="py-3"><Badge variant="success">Active</Badge></td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
