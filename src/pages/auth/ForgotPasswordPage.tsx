import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Scale, Mail, ArrowRight, ArrowLeft, MailCheck,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const validate = () => {
    if (!email) {
      setError('Email is required');
      return false;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Enter a valid email address');
      return false;
    }
    setError(undefined);
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    // Simulate request latency for a realistic UX
    await new Promise((r) => setTimeout(r, 600));
    setSending(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-navy-50 via-white to-teal-50 p-6">
      {/* Decorative backdrop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md"
      >
        {/* Brand */}
        <div className="flex items-center justify-center gap-2.5 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-400 to-indigo-500 flex items-center justify-center shadow-lg">
            <Scale className="w-5 h-5 text-white" />
          </div>
          <span className="font-display font-bold text-lg text-navy-900">Legal Navigator</span>
        </div>

        <div className="bg-white rounded-2xl border border-navy-100 shadow-card p-7 sm:p-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-5">
                <MailCheck className="w-7 h-7 text-teal-600" />
              </div>
              <h1 className="text-xl font-bold text-navy-900 font-display">Check your inbox</h1>
              <p className="mt-2.5 text-sm text-navy-500 leading-relaxed">
                If an account exists with <span className="font-semibold text-navy-700">{email}</span>, you will receive a reset link shortly.
              </p>
              <p className="mt-2 text-xs text-navy-400 leading-relaxed">
                The link will expire in 30 minutes. Don't forget to check your spam folder.
              </p>

              <Button
                variant="secondary"
                size="lg"
                fullWidth
                className="mt-6"
                onClick={() => {
                  setSubmitted(false);
                  setEmail('');
                }}
              >
                Try a different email
              </Button>
            </motion.div>
          ) : (
            <>
              <div className="w-14 h-14 rounded-2xl bg-navy-50 flex items-center justify-center mb-5">
                <Mail className="w-7 h-7 text-navy-600" />
              </div>
              <h1 className="text-xl font-bold text-navy-900 font-display">Forgot your password?</h1>
              <p className="mt-2 text-sm text-navy-500 leading-relaxed">
                No worries — enter the email associated with your account and we'll send you a link to reset it.
              </p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  icon={<Mail className="w-4 h-4" />}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={error}
                  autoComplete="email"
                  autoFocus
                />

                <Button type="submit" variant="primary" size="lg" fullWidth disabled={sending}>
                  {sending ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending link…
                    </>
                  ) : (
                    <>
                      Send reset link <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </Button>
              </form>
            </>
          )}

          <div className="mt-6 pt-6 border-t border-navy-100">
            <Link
              to="/login"
              className="flex items-center justify-center gap-1.5 text-sm font-semibold text-navy-600 hover:text-navy-900 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-navy-400">
          Need help?{' '}
          <span className="font-medium text-navy-600 hover:text-navy-800 cursor-pointer">Contact support</span>
        </p>
      </motion.div>
    </div>
  );
}
