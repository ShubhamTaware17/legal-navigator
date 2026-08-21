import { Outlet } from 'react-router-dom';
import { Sidebar } from '@/components/Sidebar';
import { Scale, LayoutDashboard, Users, Briefcase, FolderTree, HelpCircle, GitBranch, Inbox, Calendar, FileText, CreditCard, AlertCircle, Bell, BarChart3, FileEdit, Settings } from 'lucide-react';

const adminLinks = [
  { label: 'Dashboard', icon: LayoutDashboard, to: '/admin/dashboard' },
  { label: 'Users', icon: Users, to: '/admin/users' },
  { label: 'Lawyers', icon: Briefcase, to: '/admin/lawyers' },
  { label: 'Categories', icon: FolderTree, to: '/admin/categories' },
  { label: 'Questions', icon: HelpCircle, to: '/admin/questions' },
  { label: 'Question Logic', icon: GitBranch, to: '/admin/question-logic' },
  { label: 'Requests', icon: Inbox, to: '/admin/requests' },
  { label: 'Appointments', icon: Calendar, to: '/admin/appointments' },
  { label: 'Documents', icon: FileText, to: '/admin/documents' },
  { label: 'Payments', icon: CreditCard, to: '/admin/payments' },
  { label: 'Complaints', icon: AlertCircle, to: '/admin/complaints' },
  { label: 'Notifications', icon: Bell, to: '/admin/notifications' },
  { label: 'Reports', icon: BarChart3, to: '/admin/reports' },
  { label: 'CMS', icon: FileEdit, to: '/admin/cms' },
  { label: 'Settings', icon: Settings, to: '/admin/settings' },
];

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-navy-50">
      <Sidebar links={adminLinks} title="Admin Panel" titleIcon={Scale} />
      <div className="flex-1 min-w-0 flex flex-col">
        <main className="flex-1 pb-20 lg:pb-0"><Outlet /></main>
      </div>
    </div>
  );
}
