import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, HelpCircle, Edit, Trash2, AlertTriangle, Check } from 'lucide-react';
import { questions as initialQuestions } from '@/data/questions';
import { legalCategories } from '@/data/demoData';
import type { Question } from '@/types';

export function AdminQuestions() {
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);
  const [editing, setEditing] = useState<Question | null>(null);
  const [showForm, setShowForm] = useState(false);

  const handleSave = (q: Question) => {
    if (questions.find((x) => x.id === q.id)) {
      setQuestions(questions.map((x) => (x.id === q.id ? q : x)));
    } else {
      setQuestions([...questions, q]);
    }
    setEditing(null);
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    setQuestions(questions.filter((q) => q.id !== id));
  };

  const toggleActive = (id: string) => {
    setQuestions(questions.map((q) => (q.id === id ? { ...q, active: !q.active } : q)));
  };

  return (
    <div>
      <DashboardHeader title="Question Management" subtitle="Create, edit, and manage Legal Navigator questions" action={<Button variant="primary" size="sm" onClick={() => { setEditing(null); setShowForm(true); }}><Plus className="w-4 h-4" /> Add Question</Button>} />
      <div className="p-4 sm:p-6 lg:p-8 space-y-4">
        {questions.map((q, i) => (
          <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.02 }}>
            <Card className="p-4">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-navy-400">Q{q.order}</span>
                    <Badge variant={q.question_type === 'single' ? 'info' : q.question_type === 'multiple' ? 'accent' : 'default'}>{q.question_type}</Badge>
                    {q.emergency_flag && <Badge variant="error"><AlertTriangle className="w-3 h-3" /> Emergency</Badge>}
                    {q.required && <Badge variant="warning">Required</Badge>}
                    <Badge variant={q.active ? 'success' : 'default'}>{q.active ? 'Active' : 'Inactive'}</Badge>
                  </div>
                  <p className="font-semibold text-navy-900 text-sm">{q.question}</p>
                  {q.helper_text && <p className="text-xs text-navy-500 mt-1">{q.helper_text}</p>}
                  {q.options.length > 0 && <p className="text-xs text-navy-400 mt-1">{q.options.length} options</p>}
                </div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(q); setShowForm(true); }} className="p-2 rounded-lg text-navy-400 hover:bg-navy-50 hover:text-navy-700"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => toggleActive(q.id)} className="p-2 rounded-lg text-navy-400 hover:bg-navy-50 hover:text-navy-700"><Check className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(q.id)} className="p-2 rounded-lg text-navy-400 hover:bg-error-50 hover:text-error-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showForm && (
          <QuestionForm question={editing} onSave={handleSave} onClose={() => { setShowForm(false); setEditing(null); }} />
        )}
      </AnimatePresence>
    </div>
  );
}

function QuestionForm({ question, onSave, onClose }: { question: Question | null; onSave: (q: Question) => void; onClose: () => void }) {
  const [form, setForm] = useState<Question>(
    question || {
      id: `q-${Date.now()}`,
      question: '',
      question_type: 'single',
      helper_text: '',
      category_id: null,
      required: true,
      order: 99,
      emergency_flag: false,
      active: true,
      options: [],
    }
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-950/50 backdrop-blur-sm" onClick={onClose}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ opacity: 0 }} className="bg-white rounded-2xl shadow-elevated max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto scrollbar-thin" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-navy-900">{question ? 'Edit Question' : 'Add Question'}</h3>
          <button onClick={onClose} className="p-1.5 rounded-lg text-navy-400 hover:bg-navy-50"><X className="w-5 h-5" /></button>
        </div>
        <div className="space-y-4">
          <Textarea label="Question" rows={2} value={form.question} onChange={(e) => setForm({ ...form, question: e.target.value })} />
          <div className="grid sm:grid-cols-2 gap-4">
            <Select label="Question Type" value={form.question_type} onChange={(e) => setForm({ ...form, question_type: e.target.value as Question['question_type'] })}>
              <option value="single">Single Choice</option>
              <option value="multiple">Multiple Choice</option>
              <option value="text">Text</option>
              <option value="yesno">Yes/No</option>
              <option value="date">Date</option>
              <option value="file">File Upload</option>
            </Select>
            <Select label="Legal Category" value={form.category_id || ''} onChange={(e) => setForm({ ...form, category_id: e.target.value || null })}>
              <option value="">None</option>
              {legalCategories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </Select>
            <Input label="Order" type="number" value={form.order} onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) })} />
            <Input label="Helper Text" value={form.helper_text || ''} onChange={(e) => setForm({ ...form, helper_text: e.target.value })} />
          </div>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
              <input type="checkbox" checked={form.required} onChange={(e) => setForm({ ...form, required: e.target.checked })} className="rounded border-navy-300 text-teal-500" /> Required
            </label>
            <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
              <input type="checkbox" checked={form.emergency_flag} onChange={(e) => setForm({ ...form, emergency_flag: e.target.checked })} className="rounded border-navy-300 text-teal-500" /> Emergency Flag
            </label>
            <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
              <input type="checkbox" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} className="rounded border-navy-300 text-teal-500" /> Active
            </label>
          </div>
          <Button variant="primary" fullWidth onClick={() => onSave(form)}><Check className="w-4 h-4" /> Save Question</Button>
        </div>
      </motion.div>
    </div>
  );
}
