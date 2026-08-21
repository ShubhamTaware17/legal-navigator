import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Video, Mic, MicOff, VideoOff, PhoneOff, MessageSquare, FileText, Users, Clock, ArrowLeft } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { Card, Avatar } from '@/components/ui/Card';
import { useApp } from '@/contexts/AppContext';
import { lawyers } from '@/data/demoData';
import { formatDate } from '@/utils/cn';

export function VideoConsultationPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { appointments } = useApp();
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [showChat, setShowChat] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const appointment = appointments.find((a) => a.id === appointmentId);
  const lawyer = appointment ? lawyers.find((l) => l.id === appointment.lawyer_id) : null;

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  return (
    <div className="h-screen bg-navy-950 flex flex-col">
      {/* Top bar */}
      <div className="bg-navy-900/80 backdrop-blur px-4 py-3 flex items-center justify-between border-b border-navy-800">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-navy-300 hover:text-white text-sm">
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        <div className="flex items-center gap-2 text-white">
          <span className="w-2 h-2 rounded-full bg-error-500 animate-pulse" />
          <span className="text-sm font-semibold">Live Consultation</span>
          <span className="text-sm text-navy-400 ml-2 flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {formatTime(seconds)}</span>
        </div>
        <div className="text-sm text-navy-400">
          {appointment && `${appointment.duration} min · ${formatDate(appointment.date)}`}
        </div>
      </div>

      {/* Video area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Lawyer video (main) */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-navy-900 to-navy-800 relative">
          {lawyer ? (
            <div className="flex flex-col items-center gap-4">
              <Avatar src={lawyer.avatar_url} name={lawyer.name} size="lg" className="w-32 h-32 text-4xl" />
              <div className="text-center">
                <p className="text-white font-bold text-lg">{lawyer.name}</p>
                <p className="text-navy-400 text-sm">{lawyer.specialization_ids.join(', ')}</p>
              </div>
            </div>
          ) : (
            <div className="text-navy-500">Connecting to lawyer...</div>
          )}
          <div className="absolute bottom-4 left-4 bg-navy-900/60 backdrop-blur px-3 py-1.5 rounded-lg text-white text-sm font-medium">
            {lawyer?.name || 'Lawyer'}
          </div>
        </div>

        {/* User video (picture-in-picture) */}
        <div className="absolute bottom-4 right-4 w-32 sm:w-48 h-24 sm:h-36 rounded-xl overflow-hidden border-2 border-navy-700 bg-navy-900 flex items-center justify-center">
          {camOn ? (
            <div className="flex flex-col items-center gap-2">
              <Avatar name="You" size="md" />
              <span className="text-xs text-navy-400">You</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 text-navy-500">
              <VideoOff className="w-6 h-6" />
              <span className="text-xs">Camera off</span>
            </div>
          )}
        </div>

        {/* Chat sidebar */}
        {showChat && (
          <motion.div initial={{ x: 100 }} animate={{ x: 0 }} className="absolute right-0 top-0 bottom-0 w-72 bg-white shadow-elevated flex flex-col z-10">
            <div className="p-3 border-b border-navy-100 flex items-center justify-between">
              <h3 className="font-bold text-navy-900 text-sm">Chat</h3>
              <button onClick={() => setShowChat(false)} className="text-navy-400 text-sm">Close</button>
            </div>
            <div className="flex-1 overflow-y-auto p-3 space-y-2 scrollbar-thin">
              <div className="bg-navy-50 rounded-xl p-2.5 text-sm text-navy-700">Hello! I have reviewed your case documents. Let's discuss the next steps.</div>
              <div className="bg-navy-700 text-white rounded-xl p-2.5 text-sm ml-auto max-w-[80%]">Thank you. What should I prepare for the consultation?</div>
              <div className="bg-navy-50 rounded-xl p-2.5 text-sm text-navy-700">Please keep your legal notice and property documents ready. We'll go through them together.</div>
            </div>
            <div className="p-3 border-t border-navy-100 flex gap-2">
              <input placeholder="Type..." className="flex-1 px-3 py-2 rounded-lg bg-navy-50 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
              <button className="p-2 rounded-lg bg-navy-700 text-white"><MessageSquare className="w-4 h-4" /></button>
            </div>
          </motion.div>
        )}
      </div>

      {/* Controls */}
      <div className="bg-navy-900/80 backdrop-blur px-4 py-4 flex items-center justify-center gap-3 border-t border-navy-800">
        <button onClick={() => setMicOn(!micOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${micOn ? 'bg-navy-700 text-white hover:bg-navy-600' : 'bg-error-500 text-white'}`}>
          {micOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </button>
        <button onClick={() => setCamOn(!camOn)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${camOn ? 'bg-navy-700 text-white hover:bg-navy-600' : 'bg-error-500 text-white'}`}>
          {camOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </button>
        <button onClick={() => setShowChat(!showChat)} className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${showChat ? 'bg-teal-500 text-white' : 'bg-navy-700 text-white hover:bg-navy-600'}`}>
          <MessageSquare className="w-5 h-5" />
        </button>
        <button className="w-12 h-12 rounded-full bg-navy-700 text-white hover:bg-navy-600 flex items-center justify-center transition-colors">
          <FileText className="w-5 h-5" />
        </button>
        <button onClick={() => navigate(-1)} className="w-14 h-14 rounded-full bg-error-500 text-white hover:bg-error-600 flex items-center justify-center transition-colors shadow-elevated">
          <PhoneOff className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
