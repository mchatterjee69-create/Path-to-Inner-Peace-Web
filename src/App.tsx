import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';

// Landing Page Sections
import { HeroSection } from './components/Landing/HeroSection';
import { TrustSection } from './components/Landing/TrustSection';
import { BenefitsSection } from './components/Landing/BenefitsSection';
import { HowItWorks } from './components/Landing/HowItWorks';
import { ChallengeOverview } from './components/Landing/ChallengeOverview';
import { FounderSection } from './components/Landing/FounderSection';
import { TestimonialsSection } from './components/Landing/TestimonialsSection';
import { FaqSection } from './components/Landing/FaqSection';
import { RegistrationModal } from './components/Landing/RegistrationModal';

// App Views & Modals
import { DashboardOverview } from './components/Dashboard/DashboardOverview';
import { DailyChallengeView } from './components/Challenge/DailyChallengeView';
import { BreathingExercise } from './components/Breathing/BreathingExercise';
import { MeditationPlayer } from './components/Meditation/MeditationPlayer';
import { SoundTherapyView } from './components/SoundTherapy/SoundTherapyView';
import { InnerShiftView } from './components/InnerShift/InnerShiftView';
import { InnerRevolutionView } from './components/InnerShift/InnerRevolutionView';
import { CareerAxisView } from './components/CareerAxis/CareerAxisView';
import { CareerAxisBookingView } from './components/CareerAxis/CareerAxisBookingView';
import { JournalView } from './components/Journal/JournalView';
import { MindForgeUpgrade } from './components/Pricing/MindForgeUpgrade';
import { RazorpayModal } from './components/Payment/RazorpayModal';
import { SuccessView } from './components/Payment/SuccessView';
import { AiReflectionAssistant } from './components/AiAssistant/AiReflectionAssistant';
import { Cbt12TechniquesVideo } from './components/CbtVideo/Cbt12TechniquesVideo';
import { CertificateModal } from './components/Gamification/CertificateModal';
import { ProfileView } from './components/Profile/ProfileView';

const MainContent: React.FC = () => {
  const { activeView, setActiveView, upgradeMembership, selectedPlan } = useApp();

  useEffect(() => {
    // Scroll to top on view transition
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [activeView]);

  useEffect(() => {
    // Detect if user landed on /success page
    if (window.location.pathname.startsWith('/success') || window.location.search.includes('status=success')) {
      upgradeMembership(selectedPlan?.id || 'MIND_MASTERY_PRO');
      setActiveView('success');
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F6] text-slate-900 font-sans flex flex-col selection:bg-[#0B6B53] selection:text-white overflow-x-hidden w-full max-w-full">
      <Header />

      <main className="flex-1">
        {activeView === 'landing' && (
          <div className="space-y-0">
            <HeroSection />
            <TrustSection />
            <BenefitsSection />
            <HowItWorks />
            <ChallengeOverview />
            <FounderSection />
            <TestimonialsSection />
            <FaqSection />
            <div className="bg-[#093d30] text-white py-12 px-4 text-center border-t border-emerald-800">
              <h3 className="font-heading font-extrabold text-2xl mb-2">Ready to Rewire Your Mind in 5 Days?</h3>
              <p className="text-xs text-emerald-100/90 max-w-md mx-auto">Join the FREE 30-Minute Mental Reset Challenge today!</p>
            </div>
            <div className="bg-white">
              <MindForgeUpgrade />
            </div>
          </div>
        )}

        {activeView === 'dashboard' && <DashboardOverview />}
        {activeView === 'inner-shift' && <InnerShiftView />}
        {activeView === 'inner-revolution' && <InnerRevolutionView />}
        {activeView === 'career-axis' && <CareerAxisView />}
        {activeView === 'career-axis-booking' && <CareerAxisBookingView />}
        {activeView === 'challenge' && <DailyChallengeView />}
        {activeView === 'breathing' && <BreathingExercise />}
        {activeView === 'meditation' && <MeditationPlayer />}
        {activeView === 'sound-therapy' && <SoundTherapyView />}
        {activeView === 'journal' && <JournalView />}
        {activeView === 'upgrade' && <MindForgeUpgrade />}
        {activeView === 'ai-coach' && <AiReflectionAssistant />}
        {activeView === 'cbt-video' && <Cbt12TechniquesVideo />}
        {activeView === 'profile' && <ProfileView />}
        {activeView === 'success' && <SuccessView />}
      </main>

      <Footer />

      {/* Global Modals */}
      <RegistrationModal />
      <RazorpayModal />
      <CertificateModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
