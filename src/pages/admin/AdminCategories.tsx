import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, FolderTree, Check } from 'lucide-react';
import { legalCategories } from '@/data/demoData';

export function AdminCategories() {
  const [categories, setCategories] = useState(legalCategories);
  const [showAdd, setShowAdd] = useState(false);
  const [newCat, setNewCat] = useState({ name: '', description: '' });

  const handleAdd = () => {
    if (!newCat.name.trim()) return;
    setCategories([...categories, { id: `cat-${Date.now()}`, name: newCat.name, description: newCat.description, icon: 'FolderTree', color: 'navy' }]);
    setNewCat({ name: '', description: '' });
    setShowAdd(false);
  };

  return (
    <div>
      <DashboardHeader title="Legal Categories" subtitle="Manage legal area categories" action={<Button variant="primary" size="sm" onClick={() => setShowAdd(true)}><Plus className="w-4 h-4" /> Add Category</Button>} />
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat, i) => (
            <motion.div key={cat.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5">
                <div className="flex items-start justify-between mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-100 to-navy-50 flex items-center justify-center text-navy-700"><FolderTree className="w-5 h-5" /></div>
                  <Badge variant="success">Active</Badge>
                </div>
                <h3 className="font-bold text-navy-900 text-sm">{cat.name}</h3>
                <p className="text-xs text-navy-500 mt-1">{cat.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 backdrop-blur-sm" onClick={() => setShowAdd(false)}>
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-2xl shadow-elevated max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-navy-900">Add Category</h3>
              <button onClick={() => setShowAdd(false)} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <Input label="Category Name" value={newCat.name} onChange={(e) => setNewCat({ ...newCat, name: e.target.value })} placeholder="e.g. Tax Law" />
              <Input label="Description" value={newCat.description} onChange={(e) => setNewCat({ ...newCat, description: e.target.value })} placeholder="Brief description" />
              <Button variant="primary" fullWidth onClick={handleAdd}><Check className="w-4 h-4" /> Add Category</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
