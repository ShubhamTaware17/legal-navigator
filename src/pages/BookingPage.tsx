import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Clock, Calendar, CreditCard, CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, Badge } from '@/components/ui/Card';
import { ProgressStepper } from '@/components/ui/ProgressStepper';
import { lawyers } from '@/data/demoData';
import { formatCurrency } from '@/utils/cn';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import type { Appointment, Payment } from '@/types';

export function BookingPage() {
  const { lawyerId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addAppointment, addPayment } = useApp();
  const lawyer = lawyers.find((l) => l.id === lawyerId);

  const [step, setStep] = useState(1);
  const [duration, setDuration] = useState<15 | 30 | 60>(30);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [processing, setProcessing] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  if (!lawyer) {
    return (
      <div className="min-h-screen bg-navy-50 flex items-center justify-center p-4">
        <Card className="p-8 text-center max-w-md">
          <p className="text-navy-500 mb-4">Lawyer not found.</p>
          <Button variant="primary" onClick={() => navigate('/find-lawyer')}>Find a Lawyer</Button>
        </Card>
      </div>
    );
  }

  const fee = duration === 15 ? lawyer.consultation_fee_15 : duration === 30 ? lawyer.consultation_fee_30 : lawyer.consultation_fee_60;
  const platformFee = Math.round(fee * 0.1);
  const total = fee + platformFee;

  const durations = [
    { val: 15, fee: lawyer.consultation_fee_15 },
    { val: 30, fee: lawyer.consultation_fee_30 },
    { val: 60, fee: lawyer.consultation_fee_60 },
  ];

  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i + 1);
    return { value: d.toISOString().split('T')[0], label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }) };
  });

  const timeSlots = ['10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'];

  const handlePay = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 1500));
    const appointmentId = `apt-${Date.now()}`;
    const appointment: Appointment = {
      id: appointmentId,
      lawyer_id: lawyer.id,
      user_id: user?.id || 'demo-customer',
      user_name: user?.name || 'Rahul Verma',
      lawyer_name: lawyer.name,
      date: selectedDate,
      time: selectedTime,
      duration,
      type: 'video',
      fee,
      platform_fee: platformFee,
      total,
      status: 'Confirmed',
      created_at: new Date().toISOString(),
    };
    addAppointment(appointment);
    const payment: Payment = {
      id: `pay-${Date.now()}`,
      user_id: user?.id || 'demo-customer',
      appointment_id: appointmentId,
      amount: fee,
      platform_fee: platformFee,
      total,
      method: paymentMethod,
      status: 'Paid',
      created_at: new Date().toISOString(),
      description: `${duration}-min consultation with ${lawyer.name}`,
    };
    addPayment(payment);
    setProcessing(false);
    setConfirmed(true);
  };

  if (confirmed) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-navy-50 via-white to-teal-50 flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-lg w-full">
          <Card className="p-8 text-center">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }} className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
              <CheckCircle2 className="w-10 h-10 text-emerald-600" />
            </motion.div>
            <h1 className="text-2xl font-bold text-navy-900 mb-2">Booking Confirmed!</h1>
            <p className="text-navy-500 mb-6">Your consultation with {lawyer.name} has been scheduled.</p>
            <div className="bg-navy-50 rounded-xl p-4 text-left space-y-2 mb-6">
              <div className="flex justify-between text-sm"><span className="text-navy-500">Lawyer</span><span className="font-semibold text-navy-900">{lawyer.name}</span></div>
              <div className="flex justify-between text-sm"><span className="text-navy-500">Date</span><span className="font-semibold text-navy-900">{selectedDate}</span></div>
              <div className="flex justify-between text-sm"><span className="text-navy-500">Time</span><span className="font-semibold text-navy-900">{selectedTime}</span></div>
              <div className="flex justify-between text-sm"><span className="text-navy-500">Duration</span><span className="font-semibold text-navy-900">{duration} minutes</span></div>
              <div className="flex justify-between text-sm"><span className="text-navy-500">Type</span><span className="font-semibold text-navy-900">Video Consultation</span></div>
              <div className="flex justify-between text-sm pt-2 border-t border-navy-200"><span className="text-navy-500">Total Paid</span><span className="font-bold text-navy-900">{formatCurrency(total)}</span></div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="primary" size="lg" fullWidth onClick={() => navigate('/chat')}>Chat with Lawyer</Button>
              <Button variant="secondary" size="lg" fullWidth onClick={() => navigate('/appointments')}>View Appointments</Button>
            </div>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-navy-50 py-6 px-4">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="text-navy-500 hover:text-navy-700 text-sm mb-4 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>

        <div className="mb-6">
          <ProgressStepper current={step} total={5} />
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Card className="p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-1">Choose Duration</h2>
                <p className="text-sm text-navy-500 mb-6">Select how long you'd like your consultation to be.</p>
                <div className="space-y-3">
                  {durations.map((d) => (
                    <button key={d.val} onClick={() => setDuration(d.val as 15 | 30 | 60)} className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${duration === d.val ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20' : 'border-navy-200 hover:border-navy-300'}`}>
                      <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-navy-400" />
                        <span className="font-semibold text-navy-900">{d.val} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-navy-900">{formatCurrency(d.fee)}</span>
                        {duration === d.val && <Check className="w-5 h-5 text-teal-500" />}
                      </div>
                    </button>
                  ))}
                </div>
                <Badge className="mt-4">Sample/demo pricing</Badge>
                <div className="flex justify-end mt-6">
                  <Button variant="primary" onClick={() => setStep(2)}>Continue <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Card className="p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-1">Select Date</h2>
                <p className="text-sm text-navy-500 mb-6">Choose a date for your consultation.</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {nextDays.map((d) => (
                    <button key={d.value} onClick={() => setSelectedDate(d.value)} className={`p-3 rounded-xl border-2 text-center transition-all ${selectedDate === d.value ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20' : 'border-navy-200 hover:border-navy-300'}`}>
                      <Calendar className="w-4 h-4 mx-auto mb-1 text-navy-400" />
                      <p className="text-xs font-semibold text-navy-900">{d.label}</p>
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="ghost" onClick={() => setStep(1)}><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button variant="primary" onClick={() => setStep(3)} disabled={!selectedDate}>Continue <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Card className="p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-1">Select Time</h2>
                <p className="text-sm text-navy-500 mb-6">Choose an available time slot.</p>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {timeSlots.map((time) => (
                    <button key={time} onClick={() => setSelectedTime(time)} className={`p-3 rounded-xl border-2 text-center text-sm font-semibold transition-all ${selectedTime === time ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20 text-teal-700' : 'border-navy-200 text-navy-700 hover:border-navy-300'}`}>
                      {time}
                    </button>
                  ))}
                </div>
                <div className="flex justify-between mt-6">
                  <Button variant="ghost" onClick={() => setStep(2)}><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button variant="primary" onClick={() => setStep(4)} disabled={!selectedTime}>Continue <ArrowRight className="w-4 h-4" /></Button>
                </div>
              </Card>
            </motion.div>
          )}

          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
              <Card className="p-6">
                <h2 className="text-xl font-bold text-navy-900 mb-1">Review & Pay</h2>
                <p className="text-sm text-navy-500 mb-6">Review your booking details and complete payment.</p>
                <div className="bg-navy-50 rounded-xl p-4 space-y-2 mb-6">
                  <div className="flex justify-between text-sm"><span className="text-navy-500">Lawyer</span><span className="font-semibold text-navy-900">{lawyer.name}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-navy-500">Date</span><span className="font-semibold text-navy-900">{selectedDate}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-navy-500">Time</span><span className="font-semibold text-navy-900">{selectedTime}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-navy-500">Duration</span><span className="font-semibold text-navy-900">{duration} minutes</span></div>
                  <div className="flex justify-between text-sm"><span className="text-navy-500">Consultation fee</span><span className="font-semibold text-navy-900">{formatCurrency(fee)}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-navy-500">Platform fee</span><span className="font-semibold text-navy-900">{formatCurrency(platformFee)}</span></div>
                  <div className="flex justify-between text-sm pt-2 border-t border-navy-200"><span className="font-bold text-navy-900">Total</span><span className="font-bold text-navy-900 text-lg">{formatCurrency(total)}</span></div>
                </div>
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-navy-700 mb-2">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['UPI', 'Card', 'Net Banking'].map((m) => (
                      <button key={m} onClick={() => setPaymentMethod(m)} className={`p-3 rounded-xl border-2 text-sm font-semibold transition-all ${paymentMethod === m ? 'border-teal-500 bg-teal-50 text-teal-700' : 'border-navy-200 text-navy-700 hover:border-navy-300'}`}>
                        {m}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(3)}><ArrowLeft className="w-4 h-4" /> Back</Button>
                  <Button variant="accent" onClick={handlePay} disabled={processing}>
                    {processing ? (<><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>) : (<><CreditCard className="w-4 h-4" /> Pay {formatCurrency(total)}</>)}
                  </Button>
                </div>
                <p className="text-xs text-navy-400 mt-3 text-center">Demo payment — no real transaction will occur.</p>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
