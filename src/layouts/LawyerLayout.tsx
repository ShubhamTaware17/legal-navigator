import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { MobileNavigation } from '@/components/MobileNavigation';
import { Scale, LayoutDashboard, Inbox, Users, Calendar, MessageSquare, Video, FileText, Briefcase, Wallet, User, Clock } from 'lucide-react';

const lawyerLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/lawyer/dashboard' },
  { label: 'New Requests', icon: Inbox, to: '/lawyer/requests' },
  { label: 'My Clients', icon: Users, to: '/lawyer/clients' },
  { label: 'Appointments', icon: Calendar, to: '/lawyer/appointments' },
  { label: 'Chat', icon: MessageSquare, to: '/lawyer/chat' },
  { label: 'Video Consultations', icon: Video, to: '/lawyer/video' },
  { label: 'Documents', icon: FileText, to: '/lawyer/documents' },
  { label: 'Legal Services', icon: Briefcase, to: '/lawyer/services' },
  { label: 'Earnings', icon: Wallet, to: '/lawyer/earnings' },
  { label: 'Profile', icon: User, to: '/lawyer/profile' },
  { label: 'Availability', icon: Clock, to: '/lawyer/availability' },
];

const mobileLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/lawyer/dashboard' },
  { label: 'Requests', icon: Inbox, to: '/lawyer/requests' },
  { label: 'Clients', icon: Users, to: '/lawyer/clients' },
  { label: 'Appointments', icon: Calendar, to: '/lawyer/appointments' },
  { label: 'Profile', icon: User, to: '/lawyer/profile' },
];

export function LawyerLayout() {
  return (
    <div className="flex min-h-screen bg-navy-50">
      <Sidebar links={lawyerLinks} title="Lawyer Portal" titleIcon={Scale} />
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 pb-20 lg:pb-0"><Outlet /></main>
        <MobileNavigation links={mobileLinks} />
      </div>
    </div>
  );
}
