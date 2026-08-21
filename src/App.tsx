import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { PublicLayout } from '@/layouts/PublicLayout';
import { CustomerLayout } from '@/layouts/CustomerLayout';
import { LawyerLayout } from '@/layouts/LawyerLayout';
import { AdminLayout } from '@/layouts/AdminLayout';

import { LandingPage } from '@/pages/LandingPage';
import { FAQPage } from '@/pages/FAQPage';
import { AboutPage } from '@/pages/AboutPage';
import { ContactPage } from '@/pages/ContactPage';
import { LegalConsultationPage } from '@/pages/LegalConsultationPage';
import { DocumentReviewPage } from '@/pages/DocumentReviewPage';
import { FindLawyerPage } from '@/pages/FindLawyerPage';
import { LawyerProfilePage } from '@/pages/LawyerProfilePage';
import { BookingPage } from '@/pages/BookingPage';
import { VideoConsultationPage } from '@/pages/VideoConsultationPage';

import { LoginPage } from '@/pages/auth/LoginPage';
import { RegisterPage } from '@/pages/auth/RegisterPage';
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage';

import { LegalNavigatorIntro } from '@/pages/legal-navigator/LegalNavigatorIntro';
import { LegalNavigatorQuestions } from '@/pages/legal-navigator/LegalNavigatorQuestions';
import { LegalNavigatorResult } from '@/pages/legal-navigator/LegalNavigatorResult';
import { LegalNavigatorGuidance } from '@/pages/legal-navigator/LegalNavigatorGuidance';

import { CustomerDashboard } from '@/pages/customer/CustomerDashboard';
import { CustomerCases } from '@/pages/customer/CustomerCases';
import { CustomerCaseDetail } from '@/pages/customer/CustomerCaseDetail';
import { CustomerDocuments } from '@/pages/customer/CustomerDocuments';
import { CustomerAppointments } from '@/pages/customer/CustomerAppointments';
import { CustomerChat } from '@/pages/customer/CustomerChat';
import { CustomerPayments } from '@/pages/customer/CustomerPayments';
import { CustomerServices } from '@/pages/customer/CustomerServices';
import { CustomerRequests } from '@/pages/customer/CustomerRequests';
import { CustomerProfile } from '@/pages/customer/CustomerProfile';
import { CustomerSettings } from '@/pages/customer/CustomerSettings';
import { CustomerNotifications } from '@/pages/customer/CustomerNotifications';

import { LawyerDashboard } from '@/pages/lawyer/LawyerDashboard';
import { LawyerRequests } from '@/pages/lawyer/LawyerRequests';
import { LawyerClients } from '@/pages/lawyer/LawyerClients';
import { LawyerAppointments } from '@/pages/lawyer/LawyerAppointments';
import { LawyerChat } from '@/pages/lawyer/LawyerChat';
import { LawyerVideo } from '@/pages/lawyer/LawyerVideo';
import { LawyerDocuments } from '@/pages/lawyer/LawyerDocuments';
import { LawyerServices } from '@/pages/lawyer/LawyerServices';
import { LawyerEarnings } from '@/pages/lawyer/LawyerEarnings';
import { LawyerProfile } from '@/pages/lawyer/LawyerProfile';
import { LawyerAvailability } from '@/pages/lawyer/LawyerAvailability';

import { AdminDashboard } from '@/pages/admin/AdminDashboard';
import { AdminUsers } from '@/pages/admin/AdminUsers';
import { AdminLawyers } from '@/pages/admin/AdminLawyers';
import { AdminCategories } from '@/pages/admin/AdminCategories';
import { AdminQuestions } from '@/pages/admin/AdminQuestions';
import {
  AdminRequests, AdminAppointments, AdminDocuments, AdminPayments,
  AdminComplaints, AdminNotifications, AdminReports, AdminCMS,
  AdminSettings, AdminQuestionLogic,
} from '@/pages/admin/AdminPages';

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/legal-consultation" element={<LegalConsultationPage />} />
              <Route path="/document-review" element={<DocumentReviewPage />} />
              <Route path="/find-lawyer" element={<FindLawyerPage />} />
              <Route path="/lawyer/:id" element={<LawyerProfilePage />} />
            </Route>

            {/* Auth routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />

            {/* Legal Navigator */}
            <Route path="/legal-navigator" element={<ProtectedRoute allowedRoles={['customer']}><LegalNavigatorIntro /></ProtectedRoute>} />
            <Route path="/legal-navigator/questions" element={<ProtectedRoute allowedRoles={['customer']}><LegalNavigatorQuestions /></ProtectedRoute>} />
            <Route path="/legal-navigator/result" element={<ProtectedRoute allowedRoles={['customer']}><LegalNavigatorResult /></ProtectedRoute>} />
            <Route path="/legal-navigator/guidance" element={<ProtectedRoute allowedRoles={['customer']}><LegalNavigatorGuidance /></ProtectedRoute>} />

            {/* Booking */}
            <Route path="/booking/:lawyerId" element={<ProtectedRoute allowedRoles={['customer']}><BookingPage /></ProtectedRoute>} />

            {/* Video consultation */}
            <Route path="/video-consultation/:appointmentId" element={<ProtectedRoute><VideoConsultationPage /></ProtectedRoute>} />

            {/* Customer routes */}
            <Route element={<ProtectedRoute allowedRoles={['customer']}><CustomerLayout /></ProtectedRoute>}>
              <Route path="/dashboard" element={<CustomerDashboard />} />
              <Route path="/cases" element={<CustomerCases />} />
              <Route path="/cases/:id" element={<CustomerCaseDetail />} />
              <Route path="/documents" element={<CustomerDocuments />} />
              <Route path="/lawyers" element={<FindLawyerPage />} />
              <Route path="/appointments" element={<CustomerAppointments />} />
              <Route path="/payments" element={<CustomerPayments />} />
              <Route path="/services" element={<CustomerServices />} />
              <Route path="/requests" element={<CustomerRequests />} />
              <Route path="/profile" element={<CustomerProfile />} />
              <Route path="/settings" element={<CustomerSettings />} />
              <Route path="/notifications" element={<CustomerNotifications />} />
            </Route>
            <Route path="/chat" element={<ProtectedRoute allowedRoles={['customer']}><CustomerChat /></ProtectedRoute>} />

            {/* Lawyer routes */}
            <Route element={<ProtectedRoute allowedRoles={['lawyer']}><LawyerLayout /></ProtectedRoute>}>
              <Route path="/lawyer/dashboard" element={<LawyerDashboard />} />
              <Route path="/lawyer/requests" element={<LawyerRequests />} />
              <Route path="/lawyer/clients" element={<LawyerClients />} />
              <Route path="/lawyer/appointments" element={<LawyerAppointments />} />
              <Route path="/lawyer/documents" element={<LawyerDocuments />} />
              <Route path="/lawyer/services" element={<LawyerServices />} />
              <Route path="/lawyer/earnings" element={<LawyerEarnings />} />
              <Route path="/lawyer/profile" element={<LawyerProfile />} />
              <Route path="/lawyer/availability" element={<LawyerAvailability />} />
            </Route>
            <Route path="/lawyer/chat" element={<ProtectedRoute allowedRoles={['lawyer']}><LawyerChat /></ProtectedRoute>} />
            <Route path="/lawyer/video" element={<ProtectedRoute allowedRoles={['lawyer']}><LawyerVideo /></ProtectedRoute>} />

            {/* Admin routes */}
            <Route element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/lawyers" element={<AdminLawyers />} />
              <Route path="/admin/categories" element={<AdminCategories />} />
              <Route path="/admin/questions" element={<AdminQuestions />} />
              <Route path="/admin/question-logic" element={<AdminQuestionLogic />} />
              <Route path="/admin/requests" element={<AdminRequests />} />
              <Route path="/admin/appointments" element={<AdminAppointments />} />
              <Route path="/admin/documents" element={<AdminDocuments />} />
              <Route path="/admin/payments" element={<AdminPayments />} />
              <Route path="/admin/complaints" element={<AdminComplaints />} />
              <Route path="/admin/notifications" element={<AdminNotifications />} />
              <Route path="/admin/reports" element={<AdminReports />} />
              <Route path="/admin/cms" element={<AdminCMS />} />
              <Route path="/admin/settings" element={<AdminSettings />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppProvider>
    </AuthProvider>
  );
}
