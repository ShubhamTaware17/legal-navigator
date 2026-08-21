import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Paperclip, Mic, ArrowLeft, CheckCheck, Image } from 'lucide-react';
import { Avatar } from '@/components/ui/Card';
import { useApp } from '@/contexts/AppContext';
import { useAuth } from '@/contexts/AuthContext';
import { timeAgo } from '@/utils/cn';
import type { ChatMessage } from '@/types';

export function LawyerChat() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { conversations, messages, addMessage } = useApp();
  const [activeConv, setActiveConv] = useState(conversations[0]?.id || '');
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const convMessages = messages.filter((m) => m.conversation_id === activeConv);
  const activeConversation = conversations.find((c) => c.id === activeConv);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [convMessages.length]);

  const handleSend = () => {
    if (!input.trim()) return;
    const msg: ChatMessage = {
      id: `msg-${Date.now()}`,
      conversation_id: activeConv,
      sender_id: user?.id || 'demo-lawyer',
      sender_name: user?.name || 'Adv. Priya Sharma',
      sender_role: 'lawyer',
      text: input.trim(),
      timestamp: new Date().toISOString(),
      read: false,
    };
    addMessage(msg);
    setInput('');
    setTimeout(() => {
      addMessage({
        id: `msg-${Date.now() + 1}`,
        conversation_id: activeConv,
        sender_id: 'demo-customer',
        sender_name: activeConversation?.user_name || 'Client',
        sender_role: 'customer',
        text: 'Thank you for the update. I will prepare the documents as discussed.',
        timestamp: new Date().toISOString(),
        read: false,
      });
    }, 1500);
  };

  return (
    <div className="h-screen flex">
      <div className="w-72 border-r border-navy-100 bg-white hidden lg:flex flex-col">
        <div className="p-4 border-b border-navy-100"><h2 className="font-bold text-navy-900">Clients</h2></div>
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          {conversations.map((conv) => (
            <button key={conv.id} onClick={() => setActiveConv(conv.id)} className={`w-full flex items-center gap-3 p-3 hover:bg-navy-50 transition-colors text-left ${activeConv === conv.id ? 'bg-navy-50' : ''}`}>
              <Avatar name={conv.user_name} size="md" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-navy-900 text-sm truncate">{conv.user_name}</p>
                <p className="text-xs text-navy-400 truncate">{conv.last_message}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="flex-1 flex flex-col bg-navy-50">
        <div className="bg-white border-b border-navy-100 p-4 flex items-center gap-3">
          <button onClick={() => navigate('/lawyer/dashboard')} className="lg:hidden p-1 text-navy-500"><ArrowLeft className="w-5 h-5" /></button>
          <Avatar name={activeConversation?.user_name || 'Client'} size="sm" />
          <div><p className="font-semibold text-navy-900 text-sm">{activeConversation?.user_name}</p><p className="text-xs text-emerald-500">Online</p></div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          <AnimatePresence>
            {convMessages.map((msg) => {
              const isMe = msg.sender_role === 'lawyer';
              return (
                <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 ${isMe ? 'bg-navy-700 text-white rounded-tr-sm' : 'bg-white text-navy-900 rounded-tl-sm border border-navy-100'}`}>
                    <p className="text-sm">{msg.text}</p>
                    <div className={`flex items-center gap-1 mt-1 ${isMe ? 'text-navy-300' : 'text-navy-400'}`}>
                      <span className="text-xs">{timeAgo(msg.timestamp)}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5" />}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
        <div className="bg-white border-t border-navy-100 p-3 flex items-center gap-2">
          <button className="p-2 rounded-lg text-navy-400 hover:bg-navy-50"><Paperclip className="w-5 h-5" /></button>
          <button className="p-2 rounded-lg text-navy-400 hover:bg-navy-50"><Image className="w-5 h-5" /></button>
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Type a message..." className="flex-1 px-4 py-2.5 rounded-xl bg-navy-50 text-sm text-navy-900 placeholder:text-navy-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30" />
          <button className="p-2 rounded-lg text-navy-400 hover:bg-navy-50"><Mic className="w-5 h-5" /></button>
          <button onClick={handleSend} className="p-2.5 rounded-xl bg-navy-700 text-white hover:bg-navy-800 transition-colors"><Send className="w-4 h-4" /></button>
        </div>
      </div>
    </div>
  );
}
