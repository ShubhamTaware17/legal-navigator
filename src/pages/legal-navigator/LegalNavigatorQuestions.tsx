import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProgressStepper } from '@/components/ui/ProgressStepper';
import { Input, Textarea } from '@/components/ui/Input';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { getQuestion, getFirstQuestion, questions } from '@/data/questions';
import { legalNavigatorService } from '@/services/legalNavigatorService';
import type { Answer, Question, QuestionOption } from '@/types';

export function LegalNavigatorQuestions() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { setAnswers, setAnalysis, setGuidance, addCase } = useApp();

  const [currentQuestion, setCurrentQuestion] = useState<Question>(getFirstQuestion());
  const [answers, setLocalAnswers] = useState<Answer[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [multiOptions, setMultiOptions] = useState<string[]>([]);
  const [textAnswer, setTextAnswer] = useState('');
  const [showEmergency, setShowEmergency] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [questionPath, setQuestionPath] = useState<string[]>(['q1']);

  useEffect(() => {
    if (!user) navigate('/login');
  }, [user, navigate]);

  const totalSteps = 5;
  const currentStep = questionPath.length;

  const handleSelect = (option: QuestionOption) => {
    if (currentQuestion.question_type === 'multiple') {
      const newSelection = multiOptions.includes(option.id)
        ? multiOptions.filter((id) => id !== option.id)
        : [...multiOptions, option.id];
      setMultiOptions(newSelection);
    } else {
      setSelectedOption(option.id);
    }
  };

  const recordAnswer = (question: Question, answer: string | string[], categoryId?: string | null, weight?: number) => {
    const newAnswer: Answer = {
      question_id: question.id,
      question: question.question,
      answer,
      category_id: categoryId,
      category_weight: weight,
    };
    setLocalAnswers((prev) => {
      const filtered = prev.filter((a) => a.question_id !== question.id);
      return [...filtered, newAnswer];
    });
  };

  const handleContinue = async () => {
    let nextQuestionId: string | null = null;
    let answerValue: string | string[] = '';

    if (currentQuestion.question_type === 'single') {
      const option = currentQuestion.options.find((o) => o.id === selectedOption);
      if (!option) return;
      nextQuestionId = option.next_question_id;
      answerValue = option.option_text;
      recordAnswer(currentQuestion, answerValue, option.category_id, option.category_weight);
      if (option.emergency || nextQuestionId === 'emergency') {
        setShowEmergency(true);
        return;
      }
    } else if (currentQuestion.question_type === 'yesno') {
      const option = currentQuestion.options.find((o) => o.id === selectedOption);
      if (!option) return;
      nextQuestionId = option.next_question_id;
      answerValue = option.option_text;
      recordAnswer(currentQuestion, answerValue, option.category_id, option.category_weight);
      if (option.emergency || nextQuestionId === 'emergency') {
        setShowEmergency(true);
        return;
      }
    } else if (currentQuestion.question_type === 'multiple') {
      const selectedOptions = currentQuestion.options.filter((o) => multiOptions.includes(o.id));
      answerValue = selectedOptions.map((o) => o.option_text);
      if (selectedOptions.length > 0) {
        nextQuestionId = selectedOptions[0].next_question_id;
        const topOption = selectedOptions.reduce((max, o) => (o.category_weight > max.category_weight ? o : max));
        recordAnswer(currentQuestion, answerValue, topOption.category_id, topOption.category_weight);
      }
    } else if (currentQuestion.question_type === 'text') {
      answerValue = textAnswer;
      recordAnswer(currentQuestion, answerValue, currentQuestion.category_id, 0);
      nextQuestionId = 'q12';
    }

    if (!nextQuestionId) {
      await finishQuestionnaire();
      return;
    }

    const nextQ = getQuestion(nextQuestionId);
    if (nextQ) {
      setQuestionPath((prev) => [...prev, nextQuestionId]);
      setCurrentQuestion(nextQ);
      setSelectedOption(null);
      setMultiOptions([]);
      setTextAnswer('');
    } else {
      await finishQuestionnaire();
    }
  };

  const finishQuestionnaire = async () => {
    setAnalyzing(true);
    setAnswers(answers);
    const analysis = await legalNavigatorService.analyzeProblem(answers);
    setAnalysis(analysis);
    const guidance = await legalNavigatorService.generateGuidance(analysis.categories, answers);
    setGuidance(guidance);

    const newCase = {
      id: `case-${Date.now()}`,
      user_id: user?.id || 'demo-customer',
      title: String(answers[0]?.answer || 'Legal Problem'),
      summary: analysis.summary,
      answers,
      categories: analysis.categories,
      guidance: guidance.steps,
      status: 'Guidance Ready' as const,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      timeline: [
        { status: 'Problem Submitted', timestamp: new Date().toISOString(), done: true },
        { status: 'Analysis Complete', timestamp: new Date().toISOString(), done: true },
        { status: 'Guidance Generated', timestamp: new Date().toISOString(), done: true },
      ],
    };
    addCase(newCase);
    setAnalyzing(false);
    navigate('/legal-navigator/result');
  };

  const handleBack = () => {
    if (questionPath.length > 1) {
      const newPath = questionPath.slice(0, -1);
      setQuestionPath(newPath);
      const prevQ = getQuestion(newPath[newPath.length - 1]);
      if (prevQ) {
        setCurrentQuestion(prevQ);
        const prevAnswer = answers.find((a) => a.question_id === prevQ.id);
        if (prevAnswer) {
          if (prevQ.question_type === 'multiple') {
            const optionIds = prevQ.options.filter((o) => Array.isArray(prevAnswer.answer) && prevAnswer.answer.includes(o.option_text)).map((o) => o.id);
            setMultiOptions(optionIds);
            setSelectedOption(null);
          } else if (prevQ.question_type === 'text') {
            setTextAnswer(String(prevAnswer.answer));
            setSelectedOption(null);
          } else {
            const opt = prevQ.options.find((o) => o.option_text === prevAnswer.answer);
            setSelectedOption(opt?.id || null);
            setMultiOptions([]);
          }
        }
      }
    } else {
      navigate('/legal-navigator');
    }
  };

  const canContinue = () => {
    if (currentQuestion.question_type === 'single' || currentQuestion.question_type === 'yesno') return selectedOption !== null;
    if (currentQuestion.question_type === 'multiple') return multiOptions.length > 0 || !currentQuestion.required;
    if (currentQuestion.question_type === 'text') return textAnswer.trim().length > 0;
    return true;
  };

  if (showEmergency) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-error-50 via-white to-navy-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg w-full">
          <div className="bg-white rounded-2xl border border-error-200 shadow-elevated p-8 text-center">
            <div className="w-16 h-16 rounded-2xl bg-error-50 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-8 h-8 text-error-500" />
            </div>
            <h1 className="text-2xl font-bold text-navy-900 mb-3">Your Safety Comes First</h1>
            <p className="text-navy-600 leading-relaxed mb-6">
              If you are in immediate physical danger, seek immediate local emergency or police assistance. Do not rely only on an online consultation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="tel:100" className="btn-danger inline-flex items-center justify-center gap-2 font-semibold rounded-xl px-5 py-3 bg-error-500 text-white hover:bg-error-600 transition-all">
                <AlertTriangle className="w-4 h-4" /> Seek Immediate Help
              </a>
              <Button variant="secondary" size="lg" onClick={() => setShowEmergency(false)}>
                Continue Legal Guidance
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (analyzing) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <Loader2 className="w-12 h-12 text-teal-500 animate-spin mx-auto mb-4" />
          <h2 className="text-xl font-bold text-navy-900 mb-1">Analyzing your situation...</h2>
          <p className="text-sm text-navy-500">We're identifying possible legal areas and preparing guidance.</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-teal-50 py-6 sm:py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <ProgressStepper current={Math.min(currentStep, totalSteps)} total={totalSteps} />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div className="bg-white rounded-2xl border border-navy-100 shadow-card p-6 sm:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-navy-900 mb-2">{currentQuestion.question}</h2>
              {currentQuestion.helper_text && <p className="text-sm text-navy-500 mb-6">{currentQuestion.helper_text}</p>}

              {(currentQuestion.question_type === 'single' || currentQuestion.question_type === 'yesno') && (
                <div className={currentQuestion.options.length > 6 ? 'grid sm:grid-cols-2 gap-3' : 'space-y-3'}>
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                        selectedOption === option.id
                          ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20'
                          : 'border-navy-200 bg-white hover:border-navy-300 hover:bg-navy-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-navy-900">{option.option_text}</span>
                        {selectedOption === option.id && <Check className="w-5 h-5 text-teal-500" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.question_type === 'multiple' && (
                <div className="space-y-3">
                  <p className="text-xs text-navy-400 font-medium">Select all that apply</p>
                  {currentQuestion.options.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => handleSelect(option)}
                      className={`w-full text-left rounded-xl border-2 p-4 transition-all ${
                        multiOptions.includes(option.id)
                          ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20'
                          : 'border-navy-200 bg-white hover:border-navy-300 hover:bg-navy-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-navy-900">{option.option_text}</span>
                        {multiOptions.includes(option.id) && <Check className="w-5 h-5 text-teal-500" />}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {currentQuestion.question_type === 'text' && (
                <Textarea
                  placeholder="Describe what happened in your own words..."
                  rows={5}
                  value={textAnswer}
                  onChange={(e) => setTextAnswer(e.target.value)}
                />
              )}

              {currentQuestion.question_type === 'date' && (
                <Input type="date" value={textAnswer} onChange={(e) => setTextAnswer(e.target.value)} />
              )}

              <div className="flex items-center justify-between mt-8">
                <Button variant="ghost" size="md" onClick={handleBack}>
                  <ArrowLeft className="w-4 h-4" /> Back
                </Button>
                <Button variant="primary" size="md" onClick={handleContinue} disabled={!canContinue()}>
                  Continue <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
