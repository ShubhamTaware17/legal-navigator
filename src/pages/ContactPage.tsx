import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea } from '@/components/ui/Input';
import { Card, Badge } from '@/components/ui/Card';

export function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email';
    if (!form.subject.trim()) next.subject = 'Subject is required';
    if (!form.message.trim()) next.message = 'Message is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 800));
    setSending(false);
    setSubmitted(true);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'support@legalnavigator.in', href: 'mailto:support@legalnavigator.in' },
    { icon: Phone, label: 'Phone', value: '+91 1800 123 4567', href: 'tel:+9118001234567' },
    { icon: MapPin, label: 'Office', value: 'Pune, Maharashtra, India', href: '#' },
  ];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="container-app relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="accent" className="mb-4 bg-teal-500/20 text-teal-300 border border-teal-500/30">Contact Us</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight">Get in touch</h1>
            <p className="mt-4 text-lg text-navy-300 max-w-2xl mx-auto">Have a question or need help? We're here for you.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-app max-w-5xl">
          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {contactInfo.map((info, i) => (
              <motion.div key={info.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-50 flex items-center justify-center mx-auto mb-3 text-navy-700">
                    <info.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm mb-1">{info.label}</h3>
                  <a href={info.href} className="text-sm text-teal-600 hover:text-teal-700">{info.value}</a>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <Card className="p-6 sm:p-8">
              {submitted ? (
                <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-2">Message sent!</h3>
                  <p className="text-sm text-navy-500 mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <Button variant="secondary" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}>
                    Send another message
                  </Button>
                </motion.div>
              ) : (
                <>
                  <h2 className="text-xl font-bold text-navy-900 mb-1">Send us a message</h2>
                  <p className="text-sm text-navy-500 mb-6">Fill out the form below and we'll respond as soon as possible.</p>
                  <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                    <Input label="Name" placeholder="Your name" value={form.name} onChange={set('name')} error={errors.name} />
                    <Input label="Email" type="email" placeholder="you@example.com" value={form.email} onChange={set('email')} error={errors.email} />
                    <Input label="Phone (optional)" type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={set('phone')} />
                    <Input label="Subject" placeholder="What is this about?" value={form.subject} onChange={set('subject')} error={errors.subject} />
                    <Textarea label="Message" placeholder="Tell us how we can help..." rows={4} value={form.message} onChange={set('message')} error={errors.message} />
                    <Button type="submit" variant="primary" size="lg" fullWidth disabled={sending}>
                      {sending ? (<><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</>) : (<>Send Message <Send className="w-4 h-4" /></>)}
                    </Button>
                  </form>
                </>
              )}
            </Card>

            <div className="flex flex-col gap-6">
              <Card className="p-6 bg-gradient-to-br from-navy-50 to-teal-50">
                <MessageCircle className="w-8 h-8 text-teal-500 mb-3" />
                <h3 className="font-bold text-navy-900 mb-1">Need immediate help?</h3>
                <p className="text-sm text-navy-600 mb-4">If you're facing a legal problem, start with our guided questionnaire. It takes just a few minutes.</p>
                <Button variant="accent" size="sm" onClick={() => navigate('/legal-navigator')}>Start Legal Navigator</Button>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-navy-900 mb-3">Response times</h3>
                <ul className="space-y-2 text-sm text-navy-600">
                  <li className="flex items-center justify-between"><span>General inquiries</span><span className="font-semibold">Within 24 hours</span></li>
                  <li className="flex items-center justify-between"><span>Technical support</span><span className="font-semibold">Within 4 hours</span></li>
                  <li className="flex items-center justify-between"><span>Urgent matters</span><span className="font-semibold">Within 1 hour</span></li>
                </ul>
              </Card>
              <Card className="p-6">
                <div className="w-full h-40 rounded-xl bg-navy-100 flex items-center justify-center text-navy-400">
                  <MapPin className="w-8 h-8 mr-2" /> Pune, Maharashtra, India
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
