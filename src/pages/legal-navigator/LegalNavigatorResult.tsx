import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, CheckCircle2, FileText, UserCheck, Upload } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { Accordion } from '@/components/ui/Tabs';
import { DisclaimerBanner } from '@/components/ui/DisclaimerBanner';
import { useApp } from '@/contexts/AppContext';
import { legalCategories } from '@/data/demoData';

const relevanceColors: Record<string, 'success' | 'info' | 'default'> = {
  High: 'success',
  Medium: 'info',
  Low: 'default',
};

export function LegalNavigatorResult() {
  const navigate = useNavigate();
  const { currentAnalysis, currentAnswers } = useApp();

  if (!currentAnalysis) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <p className="text-navy-500 mb-4">No analysis available. Please complete the questionnaire first.</p>
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
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-navy-900 tracking-tight">Here's What We Understand</h1>
            <p className="mt-2 text-navy-500">Based on your answers, here's a preliminary analysis of your situation.</p>
          </div>

          <Card className="p-6 sm:p-8 mb-6">
            <h2 className="text-sm font-semibold text-navy-400 uppercase tracking-wide mb-2">Your Situation</h2>
            <p className="text-lg text-navy-900 leading-relaxed">{currentAnalysis.summary}</p>
          </Card>

          <Card className="p-6 sm:p-8 mb-6">
            <h2 className="text-sm font-semibold text-navy-400 uppercase tracking-wide mb-4">Possible Legal Areas</h2>
            <div className="space-y-3">
              {currentAnalysis.categories.map((cat, i) => {
                const category = legalCategories.find((c) => c.id === cat.category_id);
                return (
                  <motion.div
                    key={cat.category_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-xl border border-navy-100 bg-navy-50"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-navy-700">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-900">{cat.name}</h3>
                        {category && <p className="text-xs text-navy-500">{category.description}</p>}
                      </div>
                    </div>
                    <Badge variant={relevanceColors[cat.relevance]}>{cat.relevance} relevance</Badge>
                  </motion.div>
                );
              })}
            </div>
          </Card>

          <Card className="p-6 sm:p-8 mb-6">
            <h2 className="text-sm font-semibold text-navy-400 uppercase tracking-wide mb-4">Your Answers</h2>
            <div className="space-y-3">
              {currentAnswers.map((ans) => (
                <Accordion key={ans.question_id} title={ans.question}>
                  <p className="text-navy-600">{Array.isArray(ans.answer) ? ans.answer.join(', ') : ans.answer}</p>
                </Accordion>
              ))}
            </div>
          </Card>

          <div className="mb-6">
            <DisclaimerBanner />
          </div>

          <div className="grid sm:grid-cols-3 gap-3">
            <Button variant="primary" size="lg" onClick={() => navigate('/legal-navigator/guidance')}>
              What Should I Do Now? <ArrowRight className="w-4 h-4" />
            </Button>
            <Button variant="secondary" size="lg" onClick={() => navigate('/lawyers')}>
              <UserCheck className="w-4 h-4" /> Find a Lawyer
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
