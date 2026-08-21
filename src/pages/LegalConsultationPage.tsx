import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MessageSquare, Phone, Video, ArrowRight, CheckCircle2, Clock, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { DisclaimerBanner } from '@/components/ui/DisclaimerBanner';

const consultationTypes = [
  { icon: MessageSquare, title: 'Chat Consultation', desc: 'Text-based consultation with a lawyer. Share documents and get written advice.', color: 'navy' },
  { icon: Phone, title: 'Voice Consultation', desc: 'Speak directly with a lawyer over the phone. Clear, real-time communication.', color: 'teal' },
  { icon: Video, title: 'Video Consultation', desc: 'Face-to-face video call with screen sharing and document collaboration.', color: 'indigo' },
];

const pricingTiers = [
  { duration: '15 Minutes', price: 199, features: ['Quick legal opinion', 'Document review', 'Next steps advice'] },
  { duration: '30 Minutes', price: 499, features: ['Detailed discussion', 'Case strategy', 'Document review', 'Q&A session'], popular: true },
  { duration: '60 Minutes', price: 999, features: ['In-depth consultation', 'Full case analysis', 'Document drafting guidance', 'Comprehensive Q&A'] },
];

const steps = [
  { title: 'Find a Lawyer', desc: 'Browse verified lawyers or get matched based on your legal matter.' },
  { title: 'Choose a Slot', desc: 'Select a date and time that works for you from the lawyer\'s availability.' },
  { title: 'Pay Securely', desc: 'Complete the payment using your preferred method. Secure and encrypted.' },
  { title: 'Join Consultation', desc: 'Connect with your lawyer via chat, voice, or video at the scheduled time.' },
  { title: 'Get Guidance', desc: 'Receive legal guidance, next steps, and optionally purchase legal services.' },
];

export function LegalConsultationPage() {
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
            <Badge variant="accent" className="mb-4 bg-teal-500/20 text-teal-300 border border-teal-500/30">Legal Consultation</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight text-balance">Talk to a lawyer when you need to</h1>
            <p className="mt-5 text-lg text-navy-300 max-w-2xl mx-auto leading-relaxed">Choose how you want to consult — chat, voice, or video. Get expert legal guidance at your convenience.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="accent" size="lg" onClick={() => navigate('/find-lawyer')}>Find a Lawyer <ArrowRight className="w-4 h-4" /></Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/legal-navigator')} className="bg-white/10 border-white/20 text-white hover:bg-white/20">Understand My Problem First</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-app">
          <div className="text-center mb-12">
            <Badge variant="info" className="mb-3">Consultation Types</Badge>
            <h2 className="section-title">Choose what works for you</h2>
            <p className="section-subtitle">Three ways to connect with a legal professional.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {consultationTypes.map((type, i) => (
              <motion.div key={type.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 h-full">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-50 flex items-center justify-center mb-4 text-navy-700">
                    <type.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-navy-900 mb-1.5">{type.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{type.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-navy-50">
        <div className="container-app">
          <div className="text-center mb-12">
            <Badge variant="accent" className="mb-3">Pricing</Badge>
            <h2 className="section-title">Simple, transparent pricing</h2>
            <p className="section-subtitle">Sample/demo pricing. Each lawyer sets their own fees.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {pricingTiers.map((tier, i) => (
              <motion.div key={tier.duration} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className={`p-6 h-full relative ${tier.popular ? 'border-teal-500 ring-2 ring-teal-500/20' : ''}`}>
                  {tier.popular && <Badge variant="accent" className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>}
                  <h3 className="font-bold text-navy-900">{tier.duration}</h3>
                  <p className="text-3xl font-bold text-navy-900 mt-2 font-display">₹{tier.price}</p>
                  <ul className="mt-4 space-y-2">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-navy-600">
                        <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button variant={tier.popular ? 'accent' : 'secondary'} size="sm" fullWidth className="mt-6" onClick={() => navigate('/find-lawyer')}>
                    Get Started
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-app max-w-3xl">
          <div className="text-center mb-12">
            <Badge variant="info" className="mb-3">How It Works</Badge>
            <h2 className="section-title">Book a consultation in 5 steps</h2>
          </div>
          <div className="space-y-4">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-navy-700 to-teal-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                    {i + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-navy-900">{step.title}</h3>
                    <p className="text-sm text-navy-500 mt-0.5">{step.desc}</p>
                  </div>
                </div>
                {i < steps.length - 1 && <div className="ml-5 mt-2 h-6 w-px bg-navy-200" />}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container-app max-w-3xl">
          <Card className="p-8 text-center">
            <Sparkles className="w-10 h-10 text-teal-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Not sure what kind of lawyer you need?</h2>
            <p className="text-navy-500 mb-6">Start with our guided questionnaire. We'll help you understand your legal problem and match you with the right professional.</p>
            <Button variant="primary" size="lg" onClick={() => navigate('/legal-navigator')}>Start Legal Navigator <ArrowRight className="w-4 h-4" /></Button>
          </Card>
        </div>
      </section>

      <section className="pb-16 bg-white">
        <div className="container-app max-w-4xl">
          <DisclaimerBanner />
        </div>
      </section>
    </div>
  );
}
