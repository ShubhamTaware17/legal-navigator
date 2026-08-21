import { createContext, useContext, useState, type ReactNode } from 'react';
import type {
  LegalCase,
  Appointment,
  Document,
  ChatMessage,
  Conversation,
  Notification,
  LawyerRequest,
  ServiceOrder,
  Payment,
  Answer,
} from '@/types';
import type { AnalysisResult, GuidanceResult } from '@/services/legalNavigatorService';

interface AppContextValue {
  cases: LegalCase[];
  appointments: Appointment[];
  documents: Document[];
  conversations: Conversation[];
  messages: ChatMessage[];
  notifications: Notification[];
  lawyerRequests: LawyerRequest[];
  serviceOrders: ServiceOrder[];
  payments: Payment[];
  currentAnswers: Answer[];
  currentAnalysis: AnalysisResult | null;
  currentGuidance: GuidanceResult | null;
  setAnswers: (answers: Answer[]) => void;
  setAnalysis: (analysis: AnalysisResult | null) => void;
  setGuidance: (guidance: GuidanceResult | null) => void;
  addCase: (legalCase: LegalCase) => void;
  updateCase: (id: string, updates: Partial<LegalCase>) => void;
  addAppointment: (appointment: Appointment) => void;
  updateAppointment: (id: string, updates: Partial<Appointment>) => void;
  addDocument: (doc: Document) => void;
  deleteDocument: (id: string) => void;
  addMessage: (message: ChatMessage) => void;
  addConversation: (conv: Conversation) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (n: Notification) => void;
  addLawyerRequest: (req: LawyerRequest) => void;
  updateLawyerRequest: (id: string, updates: Partial<LawyerRequest>) => void;
  addServiceOrder: (order: ServiceOrder) => void;
  updateServiceOrder: (id: string, updates: Partial<ServiceOrder>) => void;
  addPayment: (payment: Payment) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

const initialNotifications: Notification[] = [
  { id: 'n1', user_id: 'demo-customer', type: 'appointment', title: 'Appointment Confirmed', message: 'Your consultation with Adv. Priya Sharma is confirmed for tomorrow at 10:00 AM.', read: false, created_at: '2026-08-19T10:30:00Z', link: '/appointments' },
  { id: 'n2', user_id: 'demo-customer', type: 'message', title: 'New Message', message: 'Adv. Priya Sharma sent you a message regarding your case.', read: false, created_at: '2026-08-19T09:15:00Z', link: '/chat' },
  { id: 'n3', user_id: 'demo-customer', type: 'lawyer', title: 'Lawyer Matched', message: 'We found 3 lawyers matching your legal matter. View recommendations.', read: true, created_at: '2026-08-18T16:00:00Z', link: '/lawyers' },
  { id: 'n4', user_id: 'demo-customer', type: 'payment', title: 'Payment Successful', message: 'Your payment of ₹499 for consultation has been processed successfully.', read: true, created_at: '2026-08-18T14:30:00Z', link: '/payments' },
];

const initialConversations: Conversation[] = [
  { id: 'conv-1', user_id: 'demo-customer', lawyer_id: 'law-1', user_name: 'Rahul Verma', lawyer_name: 'Adv. Priya Sharma', lawyer_avatar: 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?auto=compress&cs=tinysrgb&w=200', last_message: 'I have reviewed your documents. Let\'s discuss in the consultation.', last_message_time: '2026-08-19T09:15:00Z', unread: 2 },
];

const initialMessages: ChatMessage[] = [
  { id: 'm1', conversation_id: 'conv-1', sender_id: 'law-1', sender_name: 'Adv. Priya Sharma', sender_role: 'lawyer', text: 'Hello Rahul, I have received your case details. Could you share the legal notice document?', timestamp: '2026-08-18T14:00:00Z', read: true },
  { id: 'm2', conversation_id: 'conv-1', sender_id: 'demo-customer', sender_name: 'Rahul Verma', sender_role: 'customer', text: 'Sure, I have uploaded it in the documents section.', timestamp: '2026-08-18T14:30:00Z', read: true },
  { id: 'm3', conversation_id: 'conv-1', sender_id: 'law-1', sender_name: 'Adv. Priya Sharma', sender_role: 'lawyer', text: 'Thank you. I have reviewed your documents. Let\'s discuss in the consultation.', timestamp: '2026-08-19T09:15:00Z', read: false },
];

const initialAppointments: Appointment[] = [
  { id: 'apt-1', lawyer_id: 'law-1', user_id: 'demo-customer', user_name: 'Rahul Verma', lawyer_name: 'Adv. Priya Sharma', date: '2026-08-21', time: '10:00 AM', duration: 30, type: 'video', fee: 499, platform_fee: 50, total: 549, status: 'Confirmed', created_at: '2026-08-18T14:00:00Z' },
  { id: 'apt-2', lawyer_id: 'law-2', user_id: 'demo-customer', user_name: 'Rahul Verma', lawyer_name: 'Adv. Rajesh Kumar', date: '2026-08-25', time: '03:00 PM', duration: 60, type: 'chat', fee: 1499, platform_fee: 100, total: 1599, status: 'Upcoming', created_at: '2026-08-19T10:00:00Z' },
];

const initialDocuments: Document[] = [
  { id: 'doc-1', user_id: 'demo-customer', case_id: 'case-1', name: 'Legal_Notice_Property.pdf', type: 'application/pdf', size: 245678, category: 'Legal Notice', uploaded_at: '2026-08-17T11:00:00Z' },
  { id: 'doc-2', user_id: 'demo-customer', case_id: 'case-1', name: 'Property_Deed.jpg', type: 'image/jpeg', size: 1024000, category: 'Property Documents', uploaded_at: '2026-08-17T11:05:00Z' },
  { id: 'doc-3', user_id: 'demo-customer', name: 'Email_Communication.pdf', type: 'application/pdf', size: 89000, category: 'Emails', uploaded_at: '2026-08-16T15:00:00Z' },
];

const initialCases: LegalCase[] = [
  {
    id: 'case-1',
    user_id: 'demo-customer',
    title: 'Property Legal Notice',
    summary: 'You received a legal notice related to a property dispute regarding boundary and ownership.',
    answers: [
      { question_id: 'q1', question: 'What happened to you?', answer: 'I received a Legal Notice', category_id: 'civil', category_weight: 3 },
      { question_id: 'q2', question: 'What is the legal notice about?', answer: 'Property or land matter', category_id: 'property', category_weight: 2 },
      { question_id: 'q5', question: 'What type of property is involved?', answer: 'Residential property', category_id: 'property', category_weight: 1 },
    ],
    categories: [
      { category_id: 'property', name: 'Property Law', relevance: 'High', weight: 5 },
      { category_id: 'civil', name: 'Civil Law', relevance: 'Medium', weight: 3 },
    ],
    guidance: [
      { step: 1, title: 'Keep a copy of your Legal Notice safely', description: 'Store the original notice and make copies.' },
      { step: 2, title: 'Note the date on which you received it', description: 'Deadlines in legal notices are often time-sensitive.' },
      { step: 3, title: 'Collect relevant documents', description: 'Gather property deeds, agreements, and correspondence.' },
      { step: 4, title: 'Consult an appropriate lawyer', description: 'Find a lawyer specializing in property law.' },
      { step: 5, title: 'Get assistance preparing a reply', description: 'A timely, well-drafted reply is important.' },
      { step: 6, title: 'Ask whether further legal action is required', description: 'Your lawyer can advise on next steps.' },
    ],
    status: 'Consultation Scheduled',
    selected_lawyer_id: 'law-1',
    appointment_id: 'apt-1',
    created_at: '2026-08-17T10:00:00Z',
    updated_at: '2026-08-19T10:00:00Z',
    timeline: [
      { status: 'Problem Submitted', timestamp: '2026-08-17T10:00:00Z', done: true },
      { status: 'Analysis Complete', timestamp: '2026-08-17T10:01:00Z', done: true },
      { status: 'Guidance Generated', timestamp: '2026-08-17T10:02:00Z', done: true },
      { status: 'Lawyer Matching', timestamp: '2026-08-17T10:03:00Z', done: true },
      { status: 'Lawyer Selected', timestamp: '2026-08-18T14:00:00Z', done: true },
      { status: 'Consultation Scheduled', timestamp: '2026-08-18T14:05:00Z', done: true },
      { status: 'Consultation Completed', timestamp: '', done: false },
      { status: 'Service In Progress', timestamp: '', done: false },
      { status: 'Completed', timestamp: '', done: false },
    ],
  },
];

const initialLawyerRequests: LawyerRequest[] = [
  { id: 'lr-1', case_id: 'case-1', lawyer_id: 'law-1', user_name: 'Rahul Verma', category: 'Property Law', location: 'Pune', language: 'Marathi', consultation_duration: 30, status: 'Accepted', created_at: '2026-08-18T13:00:00Z', summary: 'Property legal notice received regarding boundary dispute. Residential property in Pune.' },
  { id: 'lr-2', case_id: 'case-2', lawyer_id: 'law-1', user_name: 'Sneha Patil', category: 'Civil Law', location: 'Pune', language: 'English', consultation_duration: 15, status: 'Pending', created_at: '2026-08-19T08:00:00Z', summary: 'Money owed by a contractor. Amount ₹50,000. No prior legal action taken.' },
  { id: 'lr-3', case_id: 'case-3', lawyer_id: 'law-1', user_name: 'Amit Shah', category: 'Property Law', location: 'Mumbai', language: 'Hindi', consultation_duration: 60, status: 'Pending', created_at: '2026-08-19T09:30:00Z', summary: 'Title dispute on inherited property. Multiple family members involved.' },
];

const initialPayments: Payment[] = [
  { id: 'pay-1', user_id: 'demo-customer', appointment_id: 'apt-1', amount: 499, platform_fee: 50, total: 549, method: 'UPI', status: 'Paid', created_at: '2026-08-18T14:02:00Z', description: '30-min consultation with Adv. Priya Sharma' },
  { id: 'pay-2', user_id: 'demo-customer', appointment_id: 'apt-2', amount: 1499, platform_fee: 100, total: 1599, method: 'Card', status: 'Paid', created_at: '2026-08-19T10:01:00Z', description: '60-min consultation with Adv. Rajesh Kumar' },
];

const initialServiceOrders: ServiceOrder[] = [
  { id: 'so-1', service_id: 'srv-2', service_name: 'Legal Notice Reply', user_id: 'demo-customer', lawyer_id: 'law-1', price: 2999, status: 'In Progress', created_at: '2026-08-18T15:00:00Z' },
];

export function AppProvider({ children }: { children: ReactNode }) {
  const [cases, setCases] = useState<LegalCase[]>(initialCases);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [documents, setDocuments] = useState<Document[]>(initialDocuments);
  const [conversations, setConversations] = useState<Conversation[]>(initialConversations);
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [lawyerRequests, setLawyerRequests] = useState<LawyerRequest[]>(initialLawyerRequests);
  const [serviceOrders, setServiceOrders] = useState<ServiceOrder[]>(initialServiceOrders);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [currentAnswers, setCurrentAnswers] = useState<Answer[]>([]);
  const [currentAnalysis, setCurrentAnalysis] = useState<AnalysisResult | null>(null);
  const [currentGuidance, setCurrentGuidance] = useState<GuidanceResult | null>(null);

  return (
    <AppContext.Provider
      value={{
        cases,
        appointments,
        documents,
        conversations,
        messages,
        notifications,
        lawyerRequests,
        serviceOrders,
        payments,
        currentAnswers,
        currentAnalysis,
        currentGuidance,
        setAnswers: setCurrentAnswers,
        setAnalysis: setCurrentAnalysis,
        setGuidance: setCurrentGuidance,
        addCase: (c) => setCases((prev) => [c, ...prev]),
        updateCase: (id, updates) => setCases((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c))),
        addAppointment: (a) => setAppointments((prev) => [a, ...prev]),
        updateAppointment: (id, updates) => setAppointments((prev) => prev.map((a) => (a.id === id ? { ...a, ...updates } : a))),
        addDocument: (d) => setDocuments((prev) => [d, ...prev]),
        deleteDocument: (id) => setDocuments((prev) => prev.filter((d) => d.id !== id)),
        addMessage: (m) => setMessages((prev) => [...prev, m]),
        addConversation: (c) => setConversations((prev) => [c, ...prev.filter((x) => x.id !== c.id)]),
        markNotificationRead: (id) => setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n))),
        markAllNotificationsRead: () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true }))),
        addNotification: (n) => setNotifications((prev) => [n, ...prev]),
        addLawyerRequest: (r) => setLawyerRequests((prev) => [r, ...prev]),
        updateLawyerRequest: (id, updates) => setLawyerRequests((prev) => prev.map((r) => (r.id === id ? { ...r, ...updates } : r))),
        addServiceOrder: (o) => setServiceOrders((prev) => [o, ...prev]),
        updateServiceOrder: (id, updates) => setServiceOrders((prev) => prev.map((o) => (o.id === id ? { ...o, ...updates } : o))),
        addPayment: (p) => setPayments((prev) => [p, ...prev]),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
