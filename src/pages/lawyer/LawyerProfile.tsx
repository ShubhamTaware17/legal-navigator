import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/contexts/AuthContext';
import { motion } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Upload, Briefcase, Globe, MapPin, Award } from 'lucide-react';
import { legalCategories } from '@/data/demoData';

export function LawyerProfile() {
  const { user } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || 'Adv. Priya Sharma',
    qualification: 'LL.B (University of Pune), LL.M (Constitutional Law, Delhi University)',
    barEnrollment: 'MAH/12345/2012',
    experience: '12',
    bio: 'Priya is a seasoned civil and property lawyer with over a decade of experience.',
    city: 'Pune',
    fee15: '199',
    fee30: '499',
    fee60: '999',
    specializations: ['property', 'civil'],
    languages: ['English', 'Hindi', 'Marathi'],
    onlineConsult: true,
    offlineConsult: true,
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const toggleSpec = (id: string) => {
    setForm((f) => ({
      ...f,
      specializations: f.specializations.includes(id) ? f.specializations.filter((s) => s !== id) : [...f.specializations, id],
    }));
  };

  const toggleLang = (lang: string) => {
    setForm((f) => ({
      ...f,
      languages: f.languages.includes(lang) ? f.languages.filter((l) => l !== lang) : [...f.languages, lang],
    }));
  };

  return (
    <div>
      <DashboardHeader title="Profile Management" subtitle="Manage your professional profile" action={<Badge variant="success"><ShieldCheck className="w-3 h-3" /> Verified</Badge>} />
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6">
            <h3 className="font-bold text-navy-900 mb-4">Professional Details</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              <Input label="Bar Enrollment Number" value={form.barEnrollment} onChange={(e) => setForm({ ...form, barEnrollment: e.target.value })} />
              <Input label="Qualification" value={form.qualification} onChange={(e) => setForm({ ...form, qualification: e.target.value })} />
              <Input label="Experience (years)" type="number" value={form.experience} onChange={(e) => setForm({ ...form, experience: e.target.value })} />
              <Input label="City" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} icon={<MapPin className="w-4 h-4" />} />
            </div>
            <div className="mt-4">
              <Textarea label="Bio" rows={3} value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} />
            </div>
          </Card>
        </motion.div>

        <Card className="p-6">
          <h3 className="font-bold text-navy-900 mb-4">Specializations</h3>
          <div className="flex flex-wrap gap-2">
            {legalCategories.map((cat) => (
              <button key={cat.id} onClick={() => toggleSpec(cat.id)} className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${form.specializations.includes(cat.id) ? 'bg-teal-500 text-white' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'}`}>
                {cat.name}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-navy-900 mb-4">Languages</h3>
          <div className="flex flex-wrap gap-2">
            {['English', 'Hindi', 'Marathi', 'Telugu', 'Kannada', 'Tamil', 'Gujarati', 'Bengali'].map((lang) => (
              <button key={lang} onClick={() => toggleLang(lang)} className={`px-3 py-2 rounded-xl text-sm font-semibold transition-all ${form.languages.includes(lang) ? 'bg-navy-700 text-white' : 'bg-navy-50 text-navy-600 hover:bg-navy-100'}`}>
                {lang}
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-navy-900 mb-4">Consultation Fees</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            <Input label="15 min (₹)" type="number" value={form.fee15} onChange={(e) => setForm({ ...form, fee15: e.target.value })} />
            <Input label="30 min (₹)" type="number" value={form.fee30} onChange={(e) => setForm({ ...form, fee30: e.target.value })} />
            <Input label="60 min (₹)" type="number" value={form.fee60} onChange={(e) => setForm({ ...form, fee60: e.target.value })} />
          </div>
          <div className="mt-4 space-y-2">
            <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
              <input type="checkbox" checked={form.onlineConsult} onChange={(e) => setForm({ ...form, onlineConsult: e.target.checked })} className="rounded border-navy-300 text-teal-500 focus:ring-teal-500/30" /> Offer online consultations
            </label>
            <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
              <input type="checkbox" checked={form.offlineConsult} onChange={(e) => setForm({ ...form, offlineConsult: e.target.checked })} className="rounded border-navy-300 text-teal-500 focus:ring-teal-500/30" /> Offer in-person consultations
            </label>
          </div>
          <p className="text-xs text-navy-400 mt-2">Sample/demo pricing</p>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-navy-900 mb-2">Verification Documents</h3>
          <p className="text-sm text-navy-500 mb-4">Upload your bar council registration, degree certificates, and ID proof for verification.</p>
          <div className="border-2 border-dashed border-navy-200 rounded-xl p-6 text-center hover:border-navy-300 transition-colors cursor-pointer">
            <Upload className="w-8 h-8 text-navy-300 mx-auto mb-2" />
            <p className="text-sm text-navy-600">Click to upload verification documents</p>
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleSave}>Save Profile</Button>
          {saved && <span className="flex items-center gap-1 text-sm text-emerald-600 font-semibold"><CheckCircle2 className="w-4 h-4" /> Saved!</span>}
        </div>
      </div>
    </div>
  );
}
