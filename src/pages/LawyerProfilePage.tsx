import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Star, MapPin, Briefcase, ShieldCheck, Globe, Video, Phone, MessageSquare,
  ArrowRight, Award, FileText, Clock, CheckCircle2, Calendar,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge, Avatar } from '@/components/ui/Card';
import { Tabs } from '@/components/ui/Tabs';
import { DisclaimerBanner } from '@/components/ui/DisclaimerBanner';
import { lawyers, legalCategories } from '@/data/demoData';
import { formatCurrency, formatDate } from '@/utils/cn';
import { useState } from 'react';

export function LawyerProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');
  const lawyer = lawyers.find((l) => l.id === id);

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <p className="text-navy-500 mb-4">Lawyer not found.</p>
          <Button variant="primary" onClick={() => navigate('/find-lawyer')}>Back to Find a Lawyer</Button>
        </Card>
      </div>
    );
  }

  const tabs = [
    { id: 'about', label: 'About', icon: <FileText className="w-4 h-4" /> },
    { id: 'services', label: 'Services', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'reviews', label: 'Reviews', icon: <Star className="w-4 h-4" /> },
    { id: 'availability', label: 'Availability', icon: <Clock className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-navy-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-10">
        <div className="container-app">
          <button onClick={() => navigate(-1)} className="text-navy-400 hover:text-white text-sm mb-4 flex items-center gap-1">
            ← Back
          </button>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row items-start gap-6">
            <Avatar src={lawyer.avatar_url} name={lawyer.name} size="lg" className="w-24 h-24 text-2xl" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{lawyer.name}</h1>
                {lawyer.verified && (
                  <Badge variant="accent" className="bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    <ShieldCheck className="w-3 h-3" /> Verified
                  </Badge>
                )}
              </div>
              <p className="text-navy-300 mt-1">
                {lawyer.specialization_ids.map((s) => legalCategories.find((c) => c.id === s)?.name).join(', ')}
              </p>
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-navy-300">
                <span className="flex items-center gap-1"><Star className="w-4 h-4 text-amber-400 fill-amber-400" /> {lawyer.rating} ({lawyer.review_count})</span>
                <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {lawyer.experience_years} years</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {lawyer.city}</span>
                <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {lawyer.next_available}</span>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <Button variant="accent" size="lg" onClick={() => navigate(`/booking/${lawyer.id}`)}>
                Book Consultation <ArrowRight className="w-4 h-4" />
              </Button>
              <div className="grid grid-cols-3 gap-2">
                <Button variant="secondary" size="sm" onClick={() => navigate('/chat')} className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <MessageSquare className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="secondary" size="sm" className="bg-white/10 border-white/20 text-white hover:bg-white/20">
                  <Video className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="container-app py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card className="p-6">
              <Tabs tabs={tabs} active={activeTab} onChange={setActiveTab} className="mb-6" />

              {activeTab === 'about' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
                  <div>
                    <h3 className="font-bold text-navy-900 mb-2">About</h3>
                    <p className="text-sm text-navy-600 leading-relaxed">{lawyer.bio}</p>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-xs font-semibold text-navy-400 uppercase mb-1">Qualification</h4>
                      <p className="text-sm text-navy-700">{lawyer.qualification}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-navy-400 uppercase mb-1">Bar Enrollment</h4>
                      <p className="text-sm text-navy-700">{lawyer.bar_enrollment}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-navy-400 uppercase mb-1">Experience</h4>
                      <p className="text-sm text-navy-700">{lawyer.experience_years} years of practice</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-navy-400 uppercase mb-1">Languages</h4>
                      <p className="text-sm text-navy-700">{lawyer.languages.join(', ')}</p>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-navy-400 uppercase mb-2">Practice Areas</h4>
                    <div className="flex flex-wrap gap-2">
                      {lawyer.specialization_ids.map((s) => {
                        const cat = legalCategories.find((c) => c.id === s);
                        return <Badge key={s} variant="info">{cat?.name}</Badge>;
                      })}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-navy-400 uppercase mb-2">Consultation Options</h4>
                    <div className="flex flex-wrap gap-2">
                      {lawyer.online_consultation && <Badge variant="accent"><Video className="w-3 h-3" /> Online</Badge>}
                      {lawyer.offline_consultation && <Badge variant="default"><MapPin className="w-3 h-3" /> In-Person</Badge>}
                    </div>
                  </div>
                </motion.div>
              )}

              {activeTab === 'services' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-3">
                  {lawyer.services.map((service) => (
                    <div key={service.id} className="flex items-center justify-between p-4 rounded-xl border border-navy-100 bg-navy-50">
                      <div>
                        <h4 className="font-semibold text-navy-900 text-sm">{service.name}</h4>
                        <p className="text-xs text-navy-500 mt-0.5">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-navy-900">{formatCurrency(service.price)}</p>
                        <Button variant="secondary" size="sm" className="mt-1" onClick={() => navigate('/services')}>Order</Button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'reviews' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {lawyer.reviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-xl border border-navy-100">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Avatar name={review.author} size="sm" />
                          <span className="font-semibold text-navy-900 text-sm">{review.author}</span>
                        </div>
                        <div className="flex gap-0.5">
                          {[...Array(5)].map((_, j) => (
                            <Star key={j} className={`w-3.5 h-3.5 ${j < review.rating ? 'text-amber-400 fill-amber-400' : 'text-navy-200'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-navy-600">{review.comment}</p>
                      <p className="text-xs text-navy-400 mt-2">{formatDate(review.date)}</p>
                    </div>
                  ))}
                </motion.div>
              )}

              {activeTab === 'availability' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
                  {lawyer.availability.map((slot) => (
                    <div key={slot.day} className="flex items-start gap-3">
                      <div className="w-16 text-sm font-semibold text-navy-700 pt-2">{slot.day}</div>
                      <div className="flex-1 flex flex-wrap gap-2">
                        {slot.slots.map((time) => (
                          <span key={time} className="px-3 py-1.5 rounded-lg bg-navy-50 text-sm text-navy-700 border border-navy-100">{time}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                  <Button variant="primary" size="lg" fullWidth onClick={() => navigate(`/booking/${lawyer.id}`)}>
                    <Calendar className="w-4 h-4" /> Book a Consultation
                  </Button>
                </motion.div>
              )}
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <h3 className="font-bold text-navy-900 mb-4">Consultation Fees</h3>
              <div className="space-y-3">
                {[
                  { dur: '15 min', fee: lawyer.consultation_fee_15 },
                  { dur: '30 min', fee: lawyer.consultation_fee_30 },
                  { dur: '60 min', fee: lawyer.consultation_fee_60 },
                ].map((tier) => (
                  <div key={tier.dur} className="flex items-center justify-between p-3 rounded-xl border border-navy-100">
                    <span className="text-sm font-semibold text-navy-700">{tier.dur}</span>
                    <span className="text-sm font-bold text-navy-900">{formatCurrency(tier.fee)}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-navy-400 mt-3">Sample/demo pricing</p>
              <Button variant="primary" size="lg" fullWidth className="mt-4" onClick={() => navigate(`/booking/${lawyer.id}`)}>
                Book Now <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="font-bold text-navy-900 mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-navy-500">Rating</span><span className="font-semibold text-navy-900">{lawyer.rating} / 5</span></div>
                <div className="flex justify-between"><span className="text-navy-500">Reviews</span><span className="font-semibold text-navy-900">{lawyer.review_count}</span></div>
                <div className="flex justify-between"><span className="text-navy-500">Experience</span><span className="font-semibold text-navy-900">{lawyer.experience_years} years</span></div>
                <div className="flex justify-between"><span className="text-navy-500">Location</span><span className="font-semibold text-navy-900">{lawyer.city}</span></div>
              </div>
            </Card>

            <DisclaimerBanner />
          </div>
        </div>
      </div>
    </div>
  );
}
