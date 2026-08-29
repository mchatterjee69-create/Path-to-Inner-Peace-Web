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
import { ExplorePathSerialView } from './components/Landing/ExplorePathSerialView';
import { CareerAxisBookingView } from './components/CareerAxis/CareerAxisBookingView';
import { JournalView } from './components/Journal/JournalView';
import { MindForgeUpgrade } from './components/Pricing/MindForgeUpgrade';
import { RazorpayModal } from './components/Payment/RazorpayModal';
import { SuccessView } from './components/Payment/SuccessView';
import { AiReflectionAssistant } from './components/AiAssistant/AiReflectionAssistant';
import { Cbt12TechniquesVideo } from './components/CbtVideo/Cbt12TechniquesVideo';
import { CertificateModal } from './components/Gamification/CertificateModal';
import { ProfileView } from './components/Profile/ProfileView';
import { AdminLeadsModal } from './components/Admin/AdminLeadsModal';
import { CompleteInnerRevolutionModal } from './components/InnerShift/CompleteInnerRevolutionModal';
import { InnerMasteryModal } from './components/InnerShift/InnerMasteryModal';
import { StressResetModal } from './components/InnerShift/StressResetModal';
import { RelationshipHealingModal } from './components/InnerShift/RelationshipHealingModal';
import { MindfulnessJourneyModal } from './components/InnerShift/MindfulnessJourneyModal';
import { DeeperAwakeningModal } from './components/InnerShift/DeeperAwakeningModal';
import { MeditationCampModal } from './components/InnerShift/MeditationCampModal';
import { WeeklyLiveSessionModal } from './components/InnerShift/WeeklyLiveSessionModal';
import { ScrollToTop } from './components/Navigation/ScrollToTop';

const MainContent: React.FC = () => {
  const { 
    user,
    activeView, 
    setActiveView, 
    upgradeMembership, 
    selectedPlan, 
    isAdminLeadsModalOpen, 
    setIsAdminLeadsModalOpen,
    setIsRegistrationModalOpen,
    isInnerRevolutionModalOpen,
    setIsInnerRevolutionModalOpen,
    isInnerMasteryModalOpen,
    setIsInnerMasteryModalOpen,
    isStressResetModalOpen,
    setIsStressResetModalOpen,
    isRelationshipHealingModalOpen,
    setIsRelationshipHealingModalOpen,
    isMindfulnessJourneyModalOpen,
    setIsMindfulnessJourneyModalOpen,
    isDeeperAwakeningModalOpen,
    setIsDeeperAwakeningModalOpen,
    isMeditationCampModalOpen,
    setIsMeditationCampModalOpen,
    isWeeklyLiveSessionModalOpen,
    setIsWeeklyLiveSessionModalOpen
  } = useApp();

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

      <main className="flex-1 w-full">
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
            
            {/* Elevated Bottom Call To Action Banner */}
            <div className="relative overflow-hidden bg-gradient-to-r from-[#041F18] via-[#083D30] to-[#0D4D3E] text-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8 border-t border-emerald-800/40 text-center">
              <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-amber-300/30 via-transparent to-transparent blur-2xl" />
              
              <div className="relative max-w-3xl mx-auto space-y-4">
                <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 text-[#D4AF37] text-[11px] font-bold uppercase tracking-widest">
                  ★ Start Your Journey Today
                </span>
                <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                  Ready to Rewire Your Mind in 5 Days?
                </h3>
                <p className="text-xs sm:text-sm text-emerald-100/90 max-w-lg mx-auto font-inter leading-relaxed">
                  Join 1,000+ seekers in the FREE 30-Minute Daily Mental Reset Challenge and experience true inner calm.
                </p>
                <div className="pt-3">
                  <button
                    onClick={() => {
                      if (user?.registered) {
                        setActiveView('dashboard');
                      } else {
                        setIsRegistrationModalOpen(true);
                      }
                    }}
                    className="btn-glowing-gold px-8 py-4 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-poppins font-extrabold text-sm sm:text-base rounded-2xl shadow-2xl active:scale-[0.98] transition-all cursor-pointer inline-flex items-center gap-2 border border-amber-200/60 group"
                  >
                    <span>Join 5-Day Mental Reset Free</span>
                    <span className="text-slate-950 font-bold group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-white">
              <MindForgeUpgrade />
            </div>
          </div>
        )}

        {activeView === 'dashboard' && <DashboardOverview />}
        {activeView === 'explore-path' && <ExplorePathSerialView />}
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
      <AdminLeadsModal isOpen={isAdminLeadsModalOpen} onClose={() => setIsAdminLeadsModalOpen(false)} />
      <CompleteInnerRevolutionModal 
        isOpen={isInnerRevolutionModalOpen} 
        onClose={() => setIsInnerRevolutionModalOpen(false)} 
      />
      <InnerMasteryModal
        isOpen={isInnerMasteryModalOpen}
        onClose={() => setIsInnerMasteryModalOpen(false)}
      />
      <StressResetModal
        isOpen={isStressResetModalOpen}
        onClose={() => setIsStressResetModalOpen(false)}
      />
      <RelationshipHealingModal
        isOpen={isRelationshipHealingModalOpen}
        onClose={() => setIsRelationshipHealingModalOpen(false)}
      />
      <MindfulnessJourneyModal
        isOpen={isMindfulnessJourneyModalOpen}
        onClose={() => setIsMindfulnessJourneyModalOpen(false)}
      />
      <DeeperAwakeningModal
        isOpen={isDeeperAwakeningModalOpen}
        onClose={() => setIsDeeperAwakeningModalOpen(false)}
      />
      <MeditationCampModal
        isOpen={isMeditationCampModalOpen}
        onClose={() => setIsMeditationCampModalOpen(false)}
      />
      <WeeklyLiveSessionModal
        isOpen={isWeeklyLiveSessionModalOpen}
        onClose={() => setIsWeeklyLiveSessionModalOpen(false)}
      />

      {/* Floating Scroll to Top Button */}
      <ScrollToTop />
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
