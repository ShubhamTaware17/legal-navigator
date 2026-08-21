import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ArrowRight, HelpCircle, MessageCircle, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Accordion } from '@/components/ui/Tabs';
import { DisclaimerBanner } from '@/components/ui/DisclaimerBanner';
import { faqs } from '@/data/demoData';

const categoryIcons: Record<string, typeof HelpCircle> = {
  General: HelpCircle,
  'Legal Navigator': Sparkles,
  Lawyers: MessageCircle,
  Consultation: ArrowRight,
  Security: HelpCircle,
  Payments: HelpCircle,
};

export function FAQPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const set = new Set(faqs.map((f) => f.category));
    return ['All', ...Array.from(set)];
  }, []);

  const filteredFaqs = useMemo(() => {
    const lower = search.toLowerCase();
    return faqs.filter((f) => {
      const matchesSearch =
        !lower ||
        f.question.toLowerCase().includes(lower) ||
        f.answer.toLowerCase().includes(lower);
      const matchesCategory = activeCategory === 'All' || f.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [search, activeCategory]);

  const groupedFaqs = useMemo(() => {
    const groups: Record<string, typeof faqs> = {};
    filteredFaqs.forEach((f) => {
      if (!groups[f.category]) groups[f.category] = [];
      groups[f.category].push(f);
    });
    return groups;
  }, [filteredFaqs]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>
        <div className="container-app relative py-16 sm:py-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge variant="accent" className="mb-4 bg-teal-500/20 text-teal-300 border border-teal-500/30">
              <HelpCircle className="w-3 h-3" /> Help Center
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-white leading-tight tracking-tight text-balance">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-navy-300 max-w-2xl mx-auto leading-relaxed">
              Find answers to common questions about Legal Navigator, consultations, payments, and more.
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-8 max-w-xl mx-auto"
          >
            <Input
              placeholder="Search for a question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              icon={<Search className="w-5 h-5" />}
            />
          </motion.div>
        </div>
      </section>

      {/* Category Pills + FAQ List */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-app max-w-3xl">
          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {categories.map((cat) => {
              const Icon = categoryIcons[cat] || HelpCircle;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    activeCategory === cat
                      ? 'bg-navy-700 text-white shadow-soft'
                      : 'bg-navy-50 text-navy-600 hover:bg-navy-100'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {cat}
                </button>
              );
            })}
          </div>

          {/* No results */}
          {filteredFaqs.length === 0 && (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-2xl bg-navy-50 flex items-center justify-center mx-auto mb-4 text-navy-400">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-navy-900 mb-1">No matching questions</h3>
              <p className="text-sm text-navy-500 max-w-md mx-auto">
                Try a different search term or browse all categories.
              </p>
              <Button
                variant="secondary"
                size="sm"
                className="mt-4"
                onClick={() => {
                  setSearch('');
                  setActiveCategory('All');
                }}
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Grouped FAQs */}
          {Object.entries(groupedFaqs).map((group, i) => {
            const [category, items] = group;
            return (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="mb-8"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-navy-50 flex items-center justify-center text-navy-700">
                    {(() => {
                      const Icon = categoryIcons[category] || HelpCircle;
                      return <Icon className="w-4 h-4" />;
                    })()}
                  </div>
                  <h2 className="text-lg font-bold text-navy-900">{category}</h2>
                  <Badge variant="default" className="ml-1">
                    {items.length}
                  </Badge>
                </div>
                <div className="space-y-3">
                  {items.map((faq) => (
                    <Accordion key={faq.id} title={faq.question}>
                      <p className="leading-relaxed">{faq.answer}</p>
                    </Accordion>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-16 bg-navy-50">
        <div className="container-app max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8 sm:p-10 text-center">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-navy-600 to-teal-500 flex items-center justify-center mx-auto mb-5">
                <MessageCircle className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-navy-900 mb-2">Still have questions?</h2>
              <p className="text-navy-500 mb-6 max-w-lg mx-auto">
                Our team is here to help. Reach out and we'll get back to you as soon as possible, or start the
                legal navigator to understand your legal situation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button variant="primary" size="lg" onClick={() => navigate('/legal-navigator')}>
                  Start Legal Navigator <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="lg" onClick={() => navigate('/contact')}>
                  Contact Us
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-16 bg-white">
        <div className="container-app max-w-3xl">
          <DisclaimerBanner />
        </div>
      </section>
    </div>
  );
}
