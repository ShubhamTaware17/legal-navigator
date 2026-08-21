import { Link, Outlet } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Scale } from 'lucide-react';

export function PublicLayout() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main><Outlet /></main>
      <footer className="bg-navy-950 text-navy-300 mt-20">
        <div className="container-app py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-navy-500 to-teal-500 flex items-center justify-center">
                  <Scale className="w-4 h-4 text-white" />
                </div>
                <span className="font-display font-bold text-white">Legal Navigator</span>
              </div>
              <p className="text-sm text-navy-400 max-w-xs">Understand your legal problem. Know your options. Connect with the right lawyer.</p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
                <li><Link to="/find-lawyer" className="hover:text-white transition-colors">Find a Lawyer</Link></li>
                <li><Link to="/legal-consultation" className="hover:text-white transition-colors">Consultation</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">Services</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/faq" className="hover:text-white transition-colors">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Disclaimer</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-navy-500">© 2026 Legal Navigator. All rights reserved.</p>
            <p className="text-xs text-navy-500">Legal Navigator provides general guidance, not legal advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
