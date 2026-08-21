import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Scale, ArrowRight, Search, MessageSquare, FileText, UserCheck,
  ShieldCheck, Sparkles, Clock, MapPin, Star, Users, FileSearch,
  Gavel, Building2, Heart, Briefcase, ShieldAlert, ShoppingBag,
  CheckCircle2, ChevronRight, Quote,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { DisclaimerBanner } from '@/components/ui/DisclaimerBanner';
import { legalCategories, lawyers } from '@/data/demoData';
import { Avatar } from '@/components/ui/Card';

const iconMap: Record<string, typeof Scale> = {
  Gavel, Scale, Building2, ShoppingBag, Heart, Briefcase, ShieldAlert, FileText,
};

const steps = [
  { num: '01', title: 'Tell Us What Happened', desc: 'Explain your situation in simple words. No legal terminology needed.', icon: MessageSquare },
  { num: '02', title: 'Answer Simple Questions', desc: 'Our guided questionnaire adapts to your answers to understand your situation.', icon: Sparkles },
  { num: '03', title: 'Understand Your Situation', desc: 'Get a preliminary legal category and a structured summary of your matter.', icon: FileSearch },
  { num: '04', title: 'Know What To Do Next', desc: 'Receive general step-by-step guidance on what actions you can take.', icon: CheckCircle2 },
  { num: '05', title: 'Connect With The Right Lawyer', desc: 'Find and consult a suitable legal professional matched to your needs.', icon: UserCheck },
];

export function LandingPage() {
  const navigate = useNavigate();
  const featuredLawyers = lawyers.filter((l) => l.verified).slice(0, 3);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="container-app relative py-16 sm:py-24 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge variant="accent" className="mb-5 bg-teal-500/20 text-teal-300 border border-teal-500/30">
                <Sparkles className="w-3 h-3" /> AI-Guided Legal Navigator
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight text-balance">
                Understand Your Legal Problem.
                <span className="block mt-2 bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
                  Know Your Options.
                </span>
              </h1>
              <p className="mt-6 text-lg text-navy-300 max-w-xl leading-relaxed">
                Tell us what happened. Answer a few simple questions. Understand your possible legal options and connect with the right legal professional.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button variant="accent" size="lg" onClick={() => navigate('/legal-navigator')} className="group">
                  Understand My Legal Problem
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate('/find-lawyer')} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Find a Lawyer
                </Button>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-navy-400">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal-400" /> Simple</span>
                <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-teal-400" /> Guided</span>
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal-400" /> Secure</span>
                <span className="flex items-center gap-1.5"><UserCheck className="w-4 h-4 text-teal-400" /> Human-assisted</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative">
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-6 shadow-2xl">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-white font-semibold text-sm">Legal Navigator</p>
                      <p className="text-navy-400 text-xs">AI-Guided Assistant</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="bg-white/10 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                      <p className="text-sm text-navy-200">What happened to you?</p>
                    </div>
                    <div className="bg-teal-500/30 rounded-2xl rounded-tr-sm p-3 max-w-[85%] ml-auto">
                      <p className="text-sm text-white">I received a legal notice about my property</p>
                    </div>
                    <div className="bg-white/10 rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                      <p className="text-sm text-navy-200">I understand. Let me ask a few questions to identify the right legal area for you.</p>
                    </div>
                    <div className="flex gap-2 mt-3">
                      <div className="flex-1 bg-white/5 rounded-xl p-2.5 border border-white/10">
                        <p className="text-xs text-teal-300 font-semibold">Property Law</p>
                        <p className="text-xs text-navy-400 mt-0.5">High relevance</p>
                      </div>
                      <div className="flex-1 bg-white/5 rounded-xl p-2.5 border border-white/10">
                        <p className="text-xs text-indigo-300 font-semibold">Civil Law</p>
                        <p className="text-xs text-navy-400 mt-0.5">Possible relevance</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-teal-500 rounded-2xl p-3 shadow-xl">
                  <Scale className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-16 sm:py-24 bg-white">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <Badge variant="accent" className="mb-3">How It Works</Badge>
            <h2 className="section-title">From Problem to Resolution in 5 Simple Steps</h2>
            <p className="section-subtitle">You don't need to know the law to get started. Just tell us what happened.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-5 h-full hover:shadow-elevated transition-all">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-navy-200 font-display">{step.num}</span>
                    <div className="w-10 h-10 rounded-xl bg-navy-50 flex items-center justify-center text-navy-700">
                      <step.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm mb-1.5">{step.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Categories */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="container-app">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="info" className="mb-3">Legal Categories</Badge>
            <h2 className="section-title">We Cover All Major Legal Areas</h2>
            <p className="section-subtitle">You don't need to pick a category — our navigator will figure it out for you.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {legalCategories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Scale;
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Card hover className="p-5 text-center h-full" onClick={() => navigate('/legal-navigator')}>
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-50 flex items-center justify-center mx-auto mb-3 text-navy-700">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-navy-900 text-sm mb-1">{cat.name}</h3>
                    <p className="text-xs text-navy-500 leading-relaxed">{cat.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Lawyers */}
      <section className="py-16 sm:py-20 bg-white">
        <div className="container-app">
          <div className="flex items-center justify-between mb-10">
            <div>
              <Badge variant="accent" className="mb-3">Featured Lawyers</Badge>
              <h2 className="section-title">Trusted Legal Professionals</h2>
            </div>
            <Button variant="secondary" size="sm" onClick={() => navigate('/find-lawyer')} className="hidden sm:flex">
              View All <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {featuredLawyers.map((lawyer, i) => (
              <motion.div
                key={lawyer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="p-5 h-full">
                  <div className="flex items-start gap-3 mb-4">
                    <Avatar src={lawyer.avatar_url} name={lawyer.name} size="lg" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-bold text-navy-900 text-sm truncate">{lawyer.name}</h3>
                        {lawyer.verified && <ShieldCheck className="w-4 h-4 text-teal-500 flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-navy-500 mt-0.5">{lawyer.specialization_ids.map((s) => legalCategories.find((c) => c.id === s)?.name).join(', ')}</p>
                      <div className="flex items-center gap-1 mt-1">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span className="text-xs font-semibold text-navy-700">{lawyer.rating}</span>
                        <span className="text-xs text-navy-400">({lawyer.review_count})</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-navy-500 mb-4">
                    <span className="flex items-center gap-1"><Briefcase className="w-3.5 h-3.5" /> {lawyer.experience_years} yrs</span>
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {lawyer.city}</span>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-navy-100">
                    <div>
                      <p className="text-xs text-navy-400">From</p>
                      <p className="text-sm font-bold text-navy-900">₹{lawyer.consultation_fee_15}</p>
                    </div>
                    <Button variant="primary" size="sm" onClick={() => navigate(`/lawyer/${lawyer.id}`)}>
                      View Profile
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Trust / Stats */}
      <section className="py-16 bg-gradient-to-br from-navy-900 to-navy-800">
        <div className="container-app">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { icon: Users, value: '10,000+', label: 'Users Helped' },
              { icon: ShieldCheck, value: '500+', label: 'Verified Lawyers' },
              { icon: MessageSquare, value: '25,000+', label: 'Consultations' },
              { icon: Star, value: '4.8/5', label: 'Average Rating' },
            ].map((stat) => (
              <div key={stat.label}>
                <stat.icon className="w-8 h-8 text-teal-400 mx-auto mb-2" />
                <p className="text-3xl font-bold text-white font-display">{stat.value}</p>
                <p className="text-sm text-navy-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="container-app max-w-4xl">
          <div className="text-center mb-10">
            <Quote className="w-10 h-10 text-teal-500 mx-auto mb-3" />
            <h2 className="section-title">What Our Users Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { name: 'Rahul M.', text: 'I received a legal notice and had no idea what to do. Legal Navigator helped me understand the situation and connected me with an excellent property lawyer.', role: 'Customer, Pune' },
              { name: 'Sneha K.', text: 'The questionnaire was so simple. I did not need to know any legal terms. The guidance was clear and the lawyer I got was very helpful.', role: 'Customer, Mumbai' },
              { name: 'Adv. Priya S.', text: 'As a lawyer, I get well-matched cases with proper case summaries. The platform saves me time and helps me reach clients who genuinely need my expertise.', role: 'Lawyer, Pune' },
            ].map((t, i) => (
              <Card key={i} className="p-5">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-sm text-navy-600 leading-relaxed mb-4">"{t.text}"</p>
                <div className="flex items-center gap-2">
                  <Avatar name={t.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-navy-900">{t.name}</p>
                    <p className="text-xs text-navy-400">{t.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="container-app">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy-800 to-navy-900 p-8 sm:p-12 lg:p-16 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl" />
            <div className="relative">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 text-balance">
                You don't need to know the law to get started.
              </h2>
              <p className="text-navy-300 text-lg max-w-2xl mx-auto mb-8">
                Simply explain what happened. We'll help you understand, guide, and connect with the right lawyer.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="accent" size="lg" onClick={() => navigate('/legal-navigator')}>
                  Start Now — It's Free <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate('/register')} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Create an Account
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-16 bg-white">
        <div className="container-app max-w-4xl">
          <DisclaimerBanner />
        </div>
      </section>
    </div>
  );
}
