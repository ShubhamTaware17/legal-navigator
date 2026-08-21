import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { MobileNavigation } from '@/components/MobileNavigation';
import { Scale, LayoutDashboard, FolderOpen, FileText, Users, Calendar, MessageSquare, CreditCard, Briefcase, Inbox, Bell, User, Settings } from 'lucide-react';

const customerLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'My Legal Problems', icon: FolderOpen, to: '/cases' },
  { label: 'My Documents', icon: FileText, to: '/documents' },
  { label: 'My Lawyers', icon: Users, to: '/lawyers' },
  { label: 'Appointments', icon: Calendar, to: '/appointments' },
  { label: 'Chat', icon: MessageSquare, to: '/chat' },
  { label: 'Payments', icon: CreditCard, to: '/payments' },
  { label: 'Services', icon: Briefcase, to: '/services' },
  { label: 'Requests', icon: Inbox, to: '/requests' },
  { label: 'Notifications', icon: Bell, to: '/notifications' },
  { label: 'Profile', icon: User, to: '/profile' },
  { label: 'Settings', icon: Settings, to: '/settings' },
];

const mobileLinks = [
  { label: 'Home', icon: LayoutDashboard, to: '/dashboard' },
  { label: 'Cases', icon: FolderOpen, to: '/cases' },
  { label: 'Lawyers', icon: Users, to: '/lawyers' },
  { label: 'Appointments', icon: Calendar, to: '/appointments' },
  { label: 'Profile', icon: User, to: '/profile' },
];

export function CustomerLayout() {
  return (
    <div className="flex min-h-screen bg-navy-50">
      <Sidebar links={customerLinks} title="Legal Navigator" titleIcon={Scale} />
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 pb-20 lg:pb-0"><Outlet /></main>
        <MobileNavigation links={mobileLinks} />
      </div>
    </div>
  );
}
