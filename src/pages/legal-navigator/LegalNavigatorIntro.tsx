import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DisclaimerBanner } from '@/components/ui/DisclaimerBanner';

export function LegalNavigatorIntro() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-teal-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-2xl"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-navy-700 to-teal-600 flex items-center justify-center mx-auto mb-5 shadow-elevated">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">Let's Understand What Happened</h1>
          <p className="mt-3 text-lg text-navy-500 max-w-xl mx-auto">You don't need to know the legal term. Just tell us what happened.</p>
        </div>

        <div className="bg-white rounded-2xl border border-navy-100 shadow-card p-6 sm:p-8">
          <div className="space-y-4 mb-6">
            {[
              { icon: '1', title: 'Answer a few simple questions', desc: 'No legal jargon. Just plain questions about your situation.' },
              { icon: '2', title: 'Get a preliminary analysis', desc: 'We identify possible legal areas and explain them simply.' },
              { icon: '3', title: 'Receive step-by-step guidance', desc: 'Know what to do next, and connect with the right lawyer.' },
            ].map((item) => (
              <div key={item.icon} className="flex items-start gap-4">
                <div className="w-9 h-9 rounded-xl bg-navy-100 flex items-center justify-center font-bold text-navy-700 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-navy-900 text-sm">{item.title}</h3>
                  <p className="text-sm text-navy-500 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-navy-400 mb-6">
            <ShieldCheck className="w-4 h-4 text-teal-500" />
            <span>Takes about 3-5 minutes. Your answers are private and secure.</span>
          </div>

          <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/legal-navigator/questions')}>
            Start Questionnaire <ArrowRight className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="md" fullWidth className="mt-2" onClick={() => navigate('/')}>
            Back to Home
          </Button>
        </div>

        <div className="mt-6">
          <DisclaimerBanner />
        </div>
      </motion.div>
    </div>
  );
}
