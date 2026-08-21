import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FileSearch, ArrowRight, Upload, FileCheck, FileWarning, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { DisclaimerBanner } from '@/components/ui/DisclaimerBanner';

export function DocumentReviewPage() {
  const navigate = useNavigate();
  const steps = [
    { icon: Upload, title: 'Upload Your Document', desc: 'Upload legal notices, agreements, court documents, or any legal paperwork you need reviewed.' },
    { icon: FileSearch, title: 'Lawyer Reviews', desc: 'A qualified lawyer carefully reviews your document and identifies key issues, risks, and opportunities.' },
    { icon: FileCheck, title: 'Get Detailed Analysis', desc: 'Receive a clear, plain-language summary of what the document says and what you should do next.' },
  ];

  const docTypes = ['Legal Notice', 'Court Notice', 'Summons', 'Agreements', 'Property Documents', 'Contracts', 'Court Orders', 'Affidavits'];

  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-16 sm:py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="container-app relative text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <Badge variant="accent" className="mb-4 bg-teal-500/20 text-teal-300 border border-teal-500/30">Document Review</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight text-balance">Don't understand a legal document?</h1>
            <p className="mt-5 text-lg text-navy-300 max-w-2xl mx-auto leading-relaxed">Upload any legal document and get it reviewed by a qualified lawyer. Understand what it means in plain language.</p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Button variant="accent" size="lg" onClick={() => navigate('/find-lawyer')}>Find a Lawyer for Review <ArrowRight className="w-4 h-4" /></Button>
              <Button variant="secondary" size="lg" onClick={() => navigate('/legal-navigator')} className="bg-white/10 border-white/20 text-white hover:bg-white/20">Understand My Problem First</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-white">
        <div className="container-app max-w-4xl">
          <div className="text-center mb-12">
            <Badge variant="info" className="mb-3">How It Works</Badge>
            <h2 className="section-title">Get your document reviewed in 3 steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {steps.map((step, i) => (
              <motion.div key={step.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-100 to-navy-50 flex items-center justify-center mx-auto mb-4 text-navy-700">
                    <step.icon className="w-7 h-7" />
                  </div>
                  <div className="text-sm font-bold text-teal-500 mb-1">Step {i + 1}</div>
                  <h3 className="font-bold text-navy-900 mb-1.5">{step.title}</h3>
                  <p className="text-sm text-navy-500 leading-relaxed">{step.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-navy-50">
        <div className="container-app max-w-4xl">
          <div className="text-center mb-10">
            <Badge variant="accent" className="mb-3">Document Types</Badge>
            <h2 className="section-title">We review all kinds of legal documents</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {docTypes.map((doc, i) => (
              <motion.div key={doc} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                <Card className="p-4 text-center h-full">
                  <FileWarning className="w-6 h-6 text-navy-400 mx-auto mb-2" />
                  <p className="text-sm font-semibold text-navy-700">{doc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-app max-w-3xl">
          <Card className="p-8 text-center">
            <ShieldCheck className="w-10 h-10 text-teal-500 mx-auto mb-3" />
            <h2 className="text-2xl font-bold text-navy-900 mb-2">Your documents are secure</h2>
            <p className="text-navy-500 mb-6">All uploaded documents are encrypted and only accessible to you and the lawyer assigned to your case.</p>
            <Button variant="primary" size="lg" onClick={() => navigate('/find-lawyer')}>Find a Lawyer <ArrowRight className="w-4 h-4" /></Button>
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
