import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card, Badge } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { motion } from 'framer-motion';
import { Clock, CheckCircle2, Calendar } from 'lucide-react';

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

export function LawyerAvailability() {
  const [schedule, setSchedule] = useState<Record<string, { enabled: boolean; start: string; end: string }>>(
    Object.fromEntries(days.map((d) => [d, { enabled: d !== 'Sunday', start: '10:00', end: '18:00' }]))
  );
  const [saved, setSaved] = useState(false);
  const [consultDuration, setConsultDuration] = useState('30');
  const [onlineAvail, setOnlineAvail] = useState(true);
  const [offlineAvail, setOfflineAvail] = useState(true);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const toggleDay = (day: string) => {
    setSchedule((s) => ({ ...s, [day]: { ...s[day], enabled: !s[day].enabled } }));
  };

  return (
    <div>
      <DashboardHeader title="Availability" subtitle="Configure your working hours and consultation settings" />
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6">
            <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-navy-500" /> Working Days & Hours</h3>
            <div className="space-y-3">
              {days.map((day) => (
                <div key={day} className="flex items-center gap-4 p-3 rounded-xl border border-navy-100">
                  <button onClick={() => toggleDay(day)} className={`relative w-11 h-6 rounded-full transition-colors ${schedule[day].enabled ? 'bg-teal-500' : 'bg-navy-200'}`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${schedule[day].enabled ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                  <span className={`text-sm font-semibold w-24 ${schedule[day].enabled ? 'text-navy-900' : 'text-navy-400'}`}>{day}</span>
                  {schedule[day].enabled && (
                    <div className="flex items-center gap-2 flex-1">
                      <input type="time" value={schedule[day].start} onChange={(e) => setSchedule({ ...schedule, [day]: { ...schedule[day], start: e.target.value } })} className="rounded-lg border border-navy-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
                      <span className="text-navy-400 text-sm">to</span>
                      <input type="time" value={schedule[day].end} onChange={(e) => setSchedule({ ...schedule, [day]: { ...schedule[day], end: e.target.value } })} className="rounded-lg border border-navy-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <Card className="p-6">
          <h3 className="font-bold text-navy-900 mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-navy-500" /> Consultation Settings</h3>
          <div className="space-y-4">
            <Select label="Default Consultation Duration" value={consultDuration} onChange={(e) => setConsultDuration(e.target.value)}>
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">60 minutes</option>
            </Select>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
                <input type="checkbox" checked={onlineAvail} onChange={(e) => setOnlineAvail(e.target.checked)} className="rounded border-navy-300 text-teal-500 focus:ring-teal-500/30" /> Available for online consultations
              </label>
              <label className="flex items-center gap-2 text-sm text-navy-700 cursor-pointer">
                <input type="checkbox" checked={offlineAvail} onChange={(e) => setOfflineAvail(e.target.checked)} className="rounded border-navy-300 text-teal-500 focus:ring-teal-500/30" /> Available for in-person consultations
              </label>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-bold text-navy-900 mb-3">Generated Slots Preview</h3>
          <div className="flex flex-wrap gap-2">
            {['10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'].map((slot) => (
              <Badge key={slot} variant="default">{slot}</Badge>
            ))}
          </div>
          <p className="text-xs text-navy-400 mt-3">Slots are generated based on your working hours and consultation duration.</p>
        </Card>

        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleSave}>Save Availability</Button>
          {saved && <span className="flex items-center gap-1 text-sm text-emerald-600 font-semibold"><CheckCircle2 className="w-4 h-4" /> Saved!</span>}
        </div>
      </div>
    </div>
  );
}
