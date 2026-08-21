import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Scale, ShieldCheck, Sparkles, Users, MessageSquare, ArrowRight, Target, Eye, Heart, Award, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge, Avatar } from '@/components/ui/Card';

const values = [
  { icon: Sparkles, title: 'Simple', desc: 'No legal jargon. Plain language that anyone can understand.' },
  { icon: ShieldCheck, title: 'Guided', desc: 'Step-by-step guidance through every stage of your legal journey.' },
  { icon: Award, title: 'Secure', desc: 'Your data is protected with industry-standard security.' },
  { icon: Users, title: 'Human-assisted', desc: 'AI guides you, but qualified lawyers provide the actual advice.' },
];

const stats = [
  { value: '10,000+', label: 'Users Helped' },
  { value: '500+', label: 'Verified Lawyers' },
  { value: '25,000+', label: 'Consultations' },
  { value: '4.8/5', label: 'Average Rating' },
];

const team = [
  { name: 'Arjun Krishnan', role: 'Founder & CEO', avatar: 'https://images.pexels.com/photos/6148101/pexels-photo-6148101.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Priya Nair', role: 'Head of Legal', avatar: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Vikram Singh', role: 'CTO', avatar: 'https://images.pexels.com/photos/6147849/pexels-photo-6147849.jpeg?auto=compress&cs=tinysrgb&w=200' },
  { name: 'Meera Joshi', role: 'Head of Operations', avatar: 'https://images.pexels.com/photos/5212702/pexels-photo-5212702.jpeg?auto=compress&cs=tinysrgb&w=200' },
];

export function AboutPage() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="container-app relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="accent" className="mb-4 bg-teal-500/20 text-teal-300 border border-teal-500/30">About Us</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight text-balance">
              Making legal help accessible to everyone
            </h1>
            <p className="mt-5 text-lg text-navy-300 max-w-2xl mx-auto leading-relaxed">
              Legal Navigator was born from a simple idea: ordinary people shouldn't need a law degree to understand their legal rights and options.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-app max-w-4xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Badge variant="info" className="mb-3">Our Mission</Badge>
              <h2 className="section-title mb-4">Democratizing legal access</h2>
              <p className="text-navy-600 leading-relaxed">
                Millions of people face legal problems every year without knowing where to turn. The legal system is complex, intimidating, and expensive. Legal Navigator bridges this gap by helping users understand their situation in simple terms, providing structured guidance, and connecting them with the right legal professionals.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="p-6">
                <Target className="w-10 h-10 text-teal-500 mb-3" />
                <h3 className="font-bold text-navy-900 mb-2">Our Vision</h3>
                <p className="text-sm text-navy-600 leading-relaxed">A world where every person, regardless of background, can understand their legal rights and access quality legal help without barriers.</p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-3">Our Values</Badge>
            <h2 className="section-title">What we stand for</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 text-center h-full">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-50 flex items-center justify-center mx-auto mb-3 text-navy-700">
                    <v.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-navy-900 mb-1.5">{v.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{v.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-br from-navy-900 to-navy-800">
        <div className="container-app">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {stats.map((s) => (
              <div key={s.label}>
                <p className="text-3xl sm:text-4xl font-bold text-white font-display">{s.value}</p>
                <p className="text-sm text-navy-400 mt-1">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <Badge variant="info" className="mb-3">Our Team</Badge>
            <h2 className="section-title">The people behind Legal Navigator</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {team.map((m, i) => (
              <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-5 text-center h-full">
                  <Avatar src={m.avatar} name={m.name} size="lg" className="mx-auto mb-3" />
                  <h3 className="font-bold text-navy-900 text-sm">{m.name}</h3>
                  <p className="text-xs text-navy-500 mt-0.5">{m.role}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container-app max-w-3xl">
          <Card className="p-8 sm:p-10 text-center">
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Ready to get started?</h2>
            <p className="text-navy-500 mb-6">Understand your legal problem today. It only takes a few minutes.</p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="primary" size="lg" onClick={() => navigate('/legal-navigator')}>Start Legal Navigator <ArrowRight className="w-4 h-4" /></Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/find-lawyer')}>Find a Lawyer</Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
