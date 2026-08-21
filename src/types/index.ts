export type UserRole = 'customer' | 'lawyer' | 'admin';

export type CaseStatus =
  | 'Draft'
  | 'Analyzing'
  | 'Guidance Ready'
  | 'Lawyer Matching'
  | 'Lawyer Selected'
  | 'Consultation Scheduled'
  | 'In Consultation'
  | 'Service In Progress'
  | 'Completed'
  | 'Closed';

export type RequestStatus = 'Pending' | 'Accepted' | 'Declined' | 'Expired';
export type AppointmentStatus = 'Upcoming' | 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled';
export type ServiceStatus = 'Requested' | 'Payment Pending' | 'Paid' | 'In Progress' | 'Completed' | 'Cancelled';

export type ConsultationType = 'chat' | 'voice' | 'video';

export interface LegalCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  next_question_id: string | null;
  category_id: string | null;
  category_weight: number;
  emergency?: boolean;
}

export type QuestionType = 'single' | 'multiple' | 'text' | 'yesno' | 'date' | 'file';

export interface Question {
  id: string;
  question: string;
  question_type: QuestionType;
  helper_text?: string;
  category_id: string | null;
  required: boolean;
  order: number;
  emergency_flag: boolean;
  active: boolean;
  options: QuestionOption[];
}

export interface Answer {
  question_id: string;
  question: string;
  answer: string | string[];
  category_id?: string | null;
  category_weight?: number;
}

export interface LegalCase {
  id: string;
  user_id: string;
  title: string;
  summary: string;
  answers: Answer[];
  categories: { category_id: string; name: string; relevance: 'High' | 'Medium' | 'Low'; weight: number }[];
  guidance: { step: number; title: string; description: string }[];
  status: CaseStatus;
  selected_lawyer_id?: string;
  appointment_id?: string;
  created_at: string;
  updated_at: string;
  timeline: { status: string; timestamp: string; done: boolean }[];
}

export interface Lawyer {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar_url: string;
  qualification: string;
  bar_enrollment: string;
  experience_years: number;
  bio: string;
  specialization_ids: string[];
  languages: string[];
  city: string;
  consultation_fee_15: number;
  consultation_fee_30: number;
  consultation_fee_60: number;
  online_consultation: boolean;
  offline_consultation: boolean;
  rating: number;
  review_count: number;
  verified: boolean;
  next_available: string;
  services: { id: string; name: string; description: string; price: number }[];
  reviews: { id: string; author: string; rating: number; comment: string; date: string }[];
  availability: { day: string; slots: string[] }[];
}

export interface Appointment {
  id: string;
  case_id?: string;
  lawyer_id: string;
  user_id: string;
  user_name: string;
  lawyer_name: string;
  date: string;
  time: string;
  duration: number;
  type: ConsultationType;
  fee: number;
  platform_fee: number;
  total: number;
  status: AppointmentStatus;
  created_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  case_id?: string;
  name: string;
  type: string;
  size: number;
  category: string;
  uploaded_at: string;
  url?: string;
}

export interface ChatMessage {
  id: string;
  conversation_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: UserRole;
  text: string;
  attachment?: { name: string; type: string };
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  user_id: string;
  lawyer_id: string;
  user_name: string;
  lawyer_name: string;
  lawyer_avatar?: string;
  last_message?: string;
  last_message_time?: string;
  unread: number;
}

export interface LegalService {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  icon: string;
}

export interface ServiceOrder {
  id: string;
  service_id: string;
  service_name: string;
  user_id: string;
  lawyer_id?: string;
  price: number;
  status: ServiceStatus;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  message: string;
  read: boolean;
  created_at: string;
  link?: string;
}

export interface LawyerRequest {
  id: string;
  case_id: string;
  lawyer_id: string;
  user_name: string;
  category: string;
  location: string;
  language: string;
  consultation_duration: number;
  status: RequestStatus;
  created_at: string;
  summary: string;
}

export interface Payment {
  id: string;
  user_id: string;
  appointment_id?: string;
  service_order_id?: string;
  amount: number;
  platform_fee: number;
  total: number;
  method: string;
  status: 'Pending' | 'Paid' | 'Refunded' | 'Failed';
  created_at: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}
