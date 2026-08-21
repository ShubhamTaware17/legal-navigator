import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Scale, Mail, Lock, ArrowRight, User, ShieldCheck, Gavel,
  Eye, EyeOff, Sparkles, CheckCircle2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';

const demoRoles: { role: UserRole; label: string; icon: typeof User; desc: string }[] = [
  { role: 'customer', label: 'Try as Customer', icon: User, desc: 'Explore legal guidance' },
  { role: 'lawyer', label: 'Try as Lawyer', icon: Gavel, desc: 'Manage cases & clients' },
  { role: 'admin', label: 'Try as Admin', icon: ShieldCheck, desc: 'Oversee the platform' },
];

const dashboardFor = (role: UserRole) =>
  role === 'admin' ? '/admin/dashboard' : role === 'lawyer' ? '/lawyer/dashboard' : '/dashboard';

export function LoginPage() {
  const navigate = useNavigate();
  const { login, loginAsDemo } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; form?: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const next: typeof errors = {};
    if (!email) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Enter a valid email address';
    if (!password) next.password = 'Password is required';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const result = await login(email, password);
    setSubmitting(false);
    if (result.success) {
      const role = email.includes('admin') ? 'admin' : email.includes('priya') || email.includes('lawyer') ? 'lawyer' : 'customer';
      navigate(dashboardFor(role as UserRole));
    } else {
      setErrors({ form: result.error ?? 'Unable to sign in. Please try again.' });
    }
  };

  const handleDemo = (role: UserRole) => {
    loginAsDemo(role);
    navigate(dashboardFor(role));
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-navy-50">
      {/* Brand / visual panel */}
      <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 p-12">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl" />
        </div>

        <div className="relative flex items-center gap-2.5 text-white">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center shadow-lg">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg">Legal Navigator</span>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative max-w-md"
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-teal-500/20 border border-teal-500/30 px-3 py-1 text-xs font-semibold text-teal-300 mb-5">
            <Sparkles className="w-3 h-3" /> AI-Guided Legal Navigator
          </span>
          <h1 className="text-4xl font-bold text-white leading-tight tracking-tight">
            Understand your legal problem.
            <span className="block mt-2 bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
              Know your options.
            </span>
          </h1>
          <p className="mt-5 text-navy-300 leading-relaxed">
            Tell us what happened. Answer a few simple questions. Get clear guidance and connect with the right legal professional.
          </p>

          <div className="mt-8 space-y-3">
            {['Guided questionnaire — no legal jargon needed', 'Clear, structured next-step guidance', 'Connect with verified legal professionals'].map((item) => (
              <div key={item} className="flex items-center gap-3 text-navy-200">
                <CheckCircle2 className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative flex items-center gap-6 text-navy-400 text-sm">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal-400" /> Secure</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-teal-400" /> Guided</span>
          <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-teal-400" /> Human-assisted</span>
        </div>
      </div>

      {/* Form panel */}
      <div className="flex items-center justify-center p-6 sm:p-10 lg:p-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Mobile brand */}
          <div className="flex lg:hidden items-center gap-2.5 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center">
              <Scale className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-lg text-navy-900">Legal Navigator</span>
          </div>

          <h2 className="text-2xl font-bold text-navy-900 font-display">Welcome back</h2>
          <p className="mt-1.5 text-sm text-navy-500">Sign in to continue to your dashboard.</p>

          {errors.form && (
            <div className="mt-5 rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              autoComplete="email"
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                icon={<Lock className="w-4 h-4" />}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={errors.password}
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="mt-1.5 text-xs font-medium text-navy-500 hover:text-navy-700 inline-flex items-center gap-1"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                {showPassword ? 'Hide' : 'Show'} password
              </button>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-navy-600 cursor-pointer select-none">
                <input type="checkbox" className="rounded border-navy-300 text-teal-500 focus:ring-teal-500/30" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-sm font-semibold text-teal-600 hover:text-teal-700">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting} className="mt-2">
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in…
                </>
              ) : (
                <>
                  Sign in <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>
          </form>

          {/* Demo logins */}
          <div className="mt-8">
            <div className="relative flex items-center my-5">
              <div className="flex-1 h-px bg-navy-200" />
              <span className="px-3 text-xs font-semibold uppercase tracking-wider text-navy-400">Or try a demo</span>
              <div className="flex-1 h-px bg-navy-200" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {demoRoles.map(({ role, label, icon: Icon, desc }) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => handleDemo(role)}
                  className="group rounded-xl border border-navy-200 bg-white p-3.5 text-left transition-all hover:border-teal-300 hover:shadow-soft hover:-translate-y-0.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-navy-50 flex items-center justify-center text-navy-700 group-hover:bg-teal-50 group-hover:text-teal-600 transition-colors">
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <p className="mt-2.5 text-sm font-semibold text-navy-900">{label}</p>
                  <p className="text-xs text-navy-400 mt-0.5">{desc}</p>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-navy-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-semibold text-teal-600 hover:text-teal-700">
              Register
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
