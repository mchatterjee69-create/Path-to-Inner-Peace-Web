import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Shield, Users, Award, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const HeroSection: React.FC = () => {
  const { setIsRegistrationModalOpen, setActiveView, user } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#062c22] via-[#0B6B53] to-[#134E4A] text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
      
      {/* Background Decorative Graphic */}
      <div className="absolute inset-0 opacity-15 pointer-events-none overflow-hidden">
        <img 
          src="/src/assets/images/hero_wellness_1785602450811.jpg" 
          alt="Serene Lotus Wellness"
          className="w-full h-full object-cover scale-105 filter blur-[2px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#062c22]/90 via-[#0B6B53]/80 to-[#134E4A]/95" />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7 space-y-6 text-center flex flex-col items-center">
          
          {/* 1. Welcome to & Path to Inner Peace (Centered) */}
          <ScrollReveal variant="fade" delay={0.05}>
            <div className="text-center py-2">
              <span className="block text-xl sm:text-2xl lg:text-3xl font-serif text-emerald-100/90 font-light tracking-wide mb-1">
                Welcome to
              </span>
              <div className="text-3xl sm:text-5xl lg:text-6xl gold-text font-bold tracking-tight leading-tight">
                Path to Inner Peace
              </div>
            </div>
          </ScrollReveal>

          {/* 2. FREE 5-DAY MENTAL RESET CHALLENGE Tagline */}
          <ScrollReveal variant="slide-down" delay={0.1}>
            <div className="flex justify-center pt-1">
              <div className="inline-flex items-center gap-3 bg-emerald-950/40 border border-[#D4AF37]/30 px-3.5 py-1.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                <span className="text-xs sm:text-sm font-bold uppercase tracking-widest gold-text">
                  FREE 5-DAY MENTAL RESET CHALLENGE
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* 3. Rewire Your Mind in Just 5 Days */}
          <ScrollReveal variant="slide-up" delay={0.15}>
            <div className="text-center w-full">
              <h1 className="font-poppins font-bold text-xl sm:text-3xl md:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] text-center">
                Rewire Your Mind in{' '}
                <span className="font-serif-italic text-[#D4AF37] font-normal italic">
                  Just 5 Days.
                </span>
              </h1>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade" delay={0.2}>
            <p className="text-base sm:text-lg font-inter text-emerald-100/90 font-normal max-w-2xl leading-relaxed text-center mx-auto">
              Escape the noise. Join 1,000+ others in a science-backed, 30-minute daily journey with <strong className="font-bold text-white">Path to Inner Peace</strong> to reduce stress, calm anxiety, and reclaim your emotional strength.
            </p>
          </ScrollReveal>

          {/* Key 5 Benefits Checklist (Centered) */}
          <ScrollReveal variant="scale" delay={0.25}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 max-w-xl mx-auto w-full">
              {[
                'Reduce Stress',
                'Calm Anxiety',
                'Improve Focus',
                'Sleep Better',
                'Emotional Healing',
                'MindForge Certificate'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center justify-center gap-2 sm:gap-2.5 bg-white/10 backdrop-blur-md px-3 py-2 sm:px-3.5 sm:py-2.5 rounded-2xl border border-white/10 shadow-sm text-center">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-800 text-[10px] font-bold shrink-0">
                    ✓
                  </div>
                  <span className="text-xs font-medium text-white tracking-tight text-center">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Primary Action Buttons */}
          <ScrollReveal variant="slide-up" delay={0.3}>
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full">
              <button
                onClick={() => {
                  if (user.registered) {
                    setActiveView('dashboard');
                  } else {
                    setIsRegistrationModalOpen(true);
                  }
                }}
                className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-yellow-500 text-slate-950 font-poppins font-bold text-sm sm:text-base rounded-2xl shadow-lg shadow-amber-500/20 hover:brightness-110 hover:scale-[1.01] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <span>{user.registered ? 'Go to My Dashboard' : 'Start Free Challenge'}</span>
                <ArrowRight className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>

              <button
                onClick={() => {
                  const element = document.getElementById('curriculum-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveView('landing');
                  }
                }}
                className="w-full sm:w-auto px-5 py-3 sm:py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Explore 5-Day Curriculum</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Social Proof Line */}
          <ScrollReveal variant="fade" delay={0.35}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-emerald-200 text-center">
              <span className="flex items-center justify-center gap-1.5 font-inter">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <strong>1,000+</strong> Lives Impacted
              </span>
              <span className="flex items-center justify-center gap-1.5 font-inter">
                <Shield className="w-4 h-4 text-emerald-300" />
                100% Beginner Friendly
              </span>
              <span className="flex items-center justify-center gap-1.5 font-inter">
                <Award className="w-4 h-4 text-[#D4AF37]" />
                Certificate Included
              </span>
            </div>
          </ScrollReveal>

        </div>

        {/* Right Column: Interactive Quick Registration Card / Hero Visual */}
        <div className="lg:col-span-5">
          <ScrollReveal variant="scale" delay={0.2}>
            <div className="relative rounded-[32px] glass-panel-dark p-8 shadow-2xl text-slate-900 border border-white/20 soft-shadow">
              
              <div className="absolute -top-3.5 -right-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-poppins font-extrabold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md">
                Limited Free Seats
              </div>

              <div className="text-center mb-6">
                <h3 className="font-poppins font-bold text-2xl text-white mb-1">
                  Reserve Your Free Spot
                </h3>
                <p className="text-xs text-emerald-100/80 font-inter">
                  Instant access to Day 1 Mental Detox & Meditation
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-950/70 rounded-2xl p-5 border border-emerald-500/20 text-white space-y-3">
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                    <span className="text-emerald-200 font-medium">Format:</span>
                    <span className="font-semibold">Daily 30-Min Guided Reset</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                    <span className="text-emerald-200 font-medium">Coach:</span>
                    <span className="font-semibold">Mainak Chatterjee</span>
                  </div>
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                    <span className="text-emerald-200 font-medium">Fee:</span>
                    <span className="gold-text font-bold">100% FREE</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-200 font-medium">Includes:</span>
                    <span className="text-amber-200 font-semibold">WhatsApp Reminders & Certificate</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsRegistrationModalOpen(true)}
                  className="w-full py-4 emerald-gradient text-white font-poppins font-bold text-base rounded-2xl shadow-xl shadow-emerald-950/40 hover:brightness-110 active:scale-[0.98] transition-all text-center border border-emerald-400/30"
                >
                  Start Free Challenge
                </button>

                <p className="text-[10px] text-center text-emerald-200/60 font-inter italic">
                  MindForge 360°™ Certification included upon completion.
                </p>
              </div>

            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
