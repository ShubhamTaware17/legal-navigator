import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Scale, Menu, X, Bell, User as UserIcon } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'How It Works', href: '/#how-it-works' },
  { label: 'Find a Lawyer', href: '/find-lawyer' },
  { label: 'Legal Consultation', href: '/legal-consultation' },
  { label: 'Document Review', href: '/document-review' },
  { label: 'FAQs', href: '/faq' },
];

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const dashboardLink = user ? (user.role === 'customer' ? '/dashboard' : user.role === 'lawyer' ? '/lawyer/dashboard' : '/admin/dashboard') : '/login';

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-lg border-b border-navy-100">
      <nav className="container-app flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-navy-700 to-teal-600 flex items-center justify-center">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-navy-900">Legal Navigator</span>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm font-medium text-navy-600 hover:text-navy-900 rounded-lg hover:bg-navy-50 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          {user ? (
            <>
              <Link to={dashboardLink} className="relative p-2 rounded-lg text-navy-600 hover:bg-navy-50 transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-error-500 rounded-full" />
              </Link>
              <Link to={dashboardLink} className="flex items-center gap-2">
                <Avatar src={user.avatar_url} name={user.name} size="sm" />
                <span className="text-sm font-semibold text-navy-700">{user.name.split(' ')[0]}</span>
              </Link>
              <Button variant="secondary" size="sm" onClick={() => { logout(); navigate('/'); }}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>Login</Button>
              <Button variant="primary" size="sm" onClick={() => navigate('/register')}>Get Started</Button>
            </>
          )}
        </div>

        <button className="lg:hidden p-2 text-navy-700" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden border-t border-navy-100 bg-white overflow-hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="block px-3 py-2 text-sm font-medium text-navy-600 hover:bg-navy-50 rounded-lg"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-navy-100 flex gap-2">
                {user ? (
                  <Button variant="secondary" size="sm" fullWidth onClick={() => { logout(); navigate('/'); setMobileOpen(false); }}>
                    Logout
                  </Button>
                ) : (
                  <>
                    <Button variant="secondary" size="sm" fullWidth onClick={() => { navigate('/login'); setMobileOpen(false); }}>Login</Button>
                    <Button variant="primary" size="sm" fullWidth onClick={() => { navigate('/register'); setMobileOpen(false); }}>Get Started</Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
