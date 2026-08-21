import { useState } from 'react';
import { DashboardHeader } from '@/components/DashboardHeader';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { motion } from 'framer-motion';
import { Bell, Lock, Globe, Moon, CheckCircle2 } from 'lucide-react';

export function CustomerSettings() {
  const [settings, setSettings] = useState({
    emailNotif: true,
    smsNotif: false,
    pushNotif: true,
    twoFactor: false,
    language: 'English',
    theme: 'Light',
  });
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 3000); };

  const toggles = [
    { key: 'emailNotif', label: 'Email Notifications', desc: 'Receive notifications via email', icon: Bell },
    { key: 'smsNotif', label: 'SMS Notifications', desc: 'Receive notifications via SMS', icon: Bell },
    { key: 'pushNotif', label: 'Push Notifications', desc: 'Receive push notifications in browser', icon: Bell },
    { key: 'twoFactor', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security', icon: Lock },
  ] as const;

  return (
    <div>
      <DashboardHeader title="Settings" subtitle="Manage your preferences" />
      <div className="p-4 sm:p-6 lg:p-8 max-w-3xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="p-6">
            <h3 className="font-bold text-navy-900 mb-4">Notifications</h3>
            <div className="space-y-4">
              {toggles.map((t) => (
                <div key={t.key} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center text-navy-600"><t.icon className="w-4 h-4" /></div>
                    <div><p className="text-sm font-semibold text-navy-900">{t.label}</p><p className="text-xs text-navy-500">{t.desc}</p></div>
                  </div>
                  <button onClick={() => setSettings({ ...settings, [t.key]: !settings[t.key] })} className={`relative w-11 h-6 rounded-full transition-colors ${settings[t.key] ? 'bg-teal-500' : 'bg-navy-200'}`}>
                    <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${settings[t.key] ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <Card className="p-6">
          <h3 className="font-bold text-navy-900 mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center text-navy-600"><Globe className="w-4 h-4" /></div>
                <div><p className="text-sm font-semibold text-navy-900">Language</p><p className="text-xs text-navy-500">Display language</p></div>
              </div>
              <select value={settings.language} onChange={(e) => setSettings({ ...settings, language: e.target.value })} className="rounded-xl border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30">
                <option>English</option><option>हिन्दी</option><option>मराठी</option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center text-navy-600"><Moon className="w-4 h-4" /></div>
                <div><p className="text-sm font-semibold text-navy-900">Theme</p><p className="text-xs text-navy-500">Display theme</p></div>
              </div>
              <select value={settings.theme} onChange={(e) => setSettings({ ...settings, theme: e.target.value })} className="rounded-xl border border-navy-200 px-3 py-2 text-sm text-navy-700 focus:outline-none focus:ring-2 focus:ring-teal-500/30">
                <option>Light</option><option>Dark</option><option>System</option>
              </select>
            </div>
          </div>
        </Card>

        <div className="flex items-center gap-3">
          <Button variant="primary" onClick={handleSave}>Save Settings</Button>
          {saved && <span className="flex items-center gap-1 text-sm text-emerald-600 font-semibold"><CheckCircle2 className="w-4 h-4" /> Saved!</span>}
        </div>
      </div>
    </div>
  );
}
