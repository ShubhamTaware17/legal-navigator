import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Compass, UserCheck, Upload, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { DisclaimerBanner } from '@/components/ui/DisclaimerBanner';
import { useApp } from '@/contexts/AppContext';

export function LegalNavigatorGuidance() {
  const navigate = useNavigate();
  const { currentGuidance } = useApp();

  if (!currentGuidance) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <p className="text-navy-500 mb-4">No guidance available. Please complete the questionnaire first.</p>
          <Button variant="primary" onClick={() => navigate('/legal-navigator')}>Start Questionnaire</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-teal-50 py-6 sm:py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-700 to-teal-600 flex items-center justify-center mx-auto mb-4">
              <Compass className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">What Should I Do Now?</h1>
            <p className="mt-2 text-navy-500">Here's a step-by-step guide to help you move forward.</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-8">
            <Badge variant="info"><BookOpen className="w-3 h-3" /> General Guidance</Badge>
            <span className="text-navy-300 text-sm">vs</span>
            <Badge variant="accent"><UserCheck className="w-3 h-3" /> Professional Legal Advice</Badge>
          </div>

          <Card className="p-6 sm:p-8 mb-6">
            <div className="relative">
              {currentGuidance.steps.map((step, i) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="flex flex-col items-center">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-navy-700 to-teal-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {step.step}
                    </div>
                    {i < currentGuidance.steps.length - 1 && <div className="w-0.5 flex-1 bg-navy-200 my-2 min-h-[2rem]" />}
                  </div>
                  <div className="pb-6">
                    <h3 className="font-bold text-navy-900 mb-1">{step.title}</h3>
                    <p className="text-sm text-navy-600 leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>

          <div className="mb-6">
            <DisclaimerBanner variant="warning">
              This guidance is general in nature. For advice specific to your situation, please consult a qualified lawyer. Legal Navigator provides general guidance, not legal advice.
            </DisclaimerBanner>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <Button variant="primary" size="lg" onClick={() => navigate('/lawyers')}>
              <UserCheck className="w-4 h-4" /> Connect With a Lawyer <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/documents')}>
              <Upload className="w-4 h-4" /> Upload Documents
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
