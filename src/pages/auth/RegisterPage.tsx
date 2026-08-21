import { useState, FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Scale, Mail, Lock, ArrowRight, User, Phone, Gavel, Briefcase,
  Eye, EyeOff, Sparkles, CheckCircle2, ShieldCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/contexts/AuthContext';
import type { UserRole } from '@/types';

const dashboardFor = (role: UserRole) =>
  role === 'lawyer' ? '/lawyer/dashboard' : '/dashboard';

const roleCards: { role: UserRole; label: string; desc: string; icon: typeof User }[] = [
  { role: 'customer', label: 'Customer', desc: 'I need legal help', icon: User },
  { role: 'lawyer', label: 'Lawyer', desc: 'I provide legal services', icon: Gavel },
];

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [role, setRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Name is required';
    if (!form.email) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email address';
    if (form.phone && !/^[+\d][\d\s-]{6,}$/.test(form.phone)) next.phone = 'Enter a valid phone number';
    if (!form.password) next.password = 'Password is required';
    else if (form.password.length < 8) next.password = 'Password must be at least 8 characters';
    if (!form.confirmPassword) next.confirmPassword = 'Please confirm your password';
    else if (form.password !== form.confirmPassword) next.confirmPassword = 'Passwords do not match';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const result = await register({
      name: form.name.trim(),
      email: form.email.trim(),
      password: form.password,
      phone: form.phone.trim() || undefined,
      role,
    });
    setSubmitting(false);
    if (result.success) {
      navigate(dashboardFor(role));
    } else {
      setErrors({ form: result.error ?? 'Unable to register. Please try again.' });
    }
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
            <Sparkles className="w-3 h-3" /> Get Started Today
          </span>
          <h1 className="text-4xl font-bold text-white leading-tight tracking-tight">
            Take the first step toward
            <span className="block mt-2 bg-gradient-to-r from-teal-400 to-indigo-400 bg-clip-text text-transparent">
              resolving your legal matter.
            </span>
          </h1>
          <p className="mt-5 text-navy-300 leading-relaxed">
            Create your free account to access guided legal navigation, structured guidance, and verified legal professionals.
          </p>

          <div className="mt-8 space-y-3">
            {[
              { icon: User, text: 'Free account for customers seeking legal help' },
              { icon: Briefcase, text: 'Lawyers get matched with relevant, well-summarized cases' },
              { icon: ShieldCheck, text: 'Your information stays private and secure' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3 text-navy-200">
                <Icon className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <span className="text-sm">{text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative flex items-center gap-6 text-navy-400 text-sm">
          <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-teal-400" /> Secure</span>
          <span className="flex items-center gap-1.5"><Sparkles className="w-4 h-4 text-teal-400" /> Guided</span>
          <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-teal-400" /> Trusted</span>
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

          <h2 className="text-2xl font-bold text-navy-900 font-display">Create your account</h2>
          <p className="mt-1.5 text-sm text-navy-500">Join Legal Navigator in under a minute.</p>

          {errors.form && (
            <div className="mt-5 rounded-xl border border-error-200 bg-error-50 px-4 py-3 text-sm font-medium text-error-700">
              {errors.form}
            </div>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
            {/* Role selector */}
            <div>
              <label className="block text-sm font-semibold text-navy-700 mb-1.5">I am a…</label>
              <div className="grid grid-cols-2 gap-3">
                {roleCards.map(({ role: r, label, desc, icon: Icon }) => {
                  const active = role === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRole(r)}
                      className={`relative rounded-xl border p-4 text-left transition-all ${
                        active
                          ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20'
                          : 'border-navy-200 bg-white hover:border-navy-300'
                      }`}
                    >
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${active ? 'bg-teal-500 text-white' : 'bg-navy-50 text-navy-600'}`}>
                        <Icon className="w-4.5 h-4.5" />
                      </div>
                      <p className={`mt-2.5 text-sm font-semibold ${active ? 'text-teal-700' : 'text-navy-900'}`}>{label}</p>
                      <p className="text-xs text-navy-400 mt-0.5">{desc}</p>
                      {active && (
                        <span className="absolute top-3 right-3 w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <Input
              label="Full name"
              type="text"
              placeholder="Rahul Verma"
              icon={<User className="w-4 h-4" />}
              value={form.name}
              onChange={set('name')}
              error={errors.name}
              autoComplete="name"
            />

            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              icon={<Mail className="w-4 h-4" />}
              value={form.email}
              onChange={set('email')}
              error={errors.email}
              autoComplete="email"
            />

            <Input
              label="Phone number"
              type="tel"
              placeholder="+91 98765 43210"
              icon={<Phone className="w-4 h-4" />}
              value={form.phone}
              onChange={set('phone')}
              error={errors.phone}
              helperText="Optional"
              autoComplete="tel"
            />

            <div>
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="At least 8 characters"
                icon={<Lock className="w-4 h-4" />}
                value={form.password}
                onChange={set('password')}
                error={errors.password}
                autoComplete="new-password"
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

            <Input
              label="Confirm password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              icon={<Lock className="w-4 h-4" />}
              value={form.confirmPassword}
              onChange={set('confirmPassword')}
              error={errors.confirmPassword}
              autoComplete="new-password"
            />

            <Button type="submit" variant="primary" size="lg" fullWidth disabled={submitting} className="mt-2">
              {submitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account…
                </>
              ) : (
                <>
                  Create account <ArrowRight className="w-4 h-4" />
                </>
              )}
            </Button>

            <p className="text-xs text-navy-400 text-center leading-relaxed">
              By creating an account, you agree to our{' '}
              <span className="font-medium text-navy-600 hover:text-navy-800 cursor-pointer">Terms of Service</span> and{' '}
              <span className="font-medium text-navy-600 hover:text-navy-800 cursor-pointer">Privacy Policy</span>.
            </p>
          </form>

          <p className="mt-6 text-center text-sm text-navy-500">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-700">
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
