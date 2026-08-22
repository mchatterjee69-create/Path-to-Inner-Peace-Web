import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Shield, Users, Award, ArrowRight, Check, Clock, UserCheck, Gift } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const HeroSection: React.FC = () => {
  const { setIsRegistrationModalOpen, setActiveView, user } = useApp();

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#041F18] via-[#083D30] to-[#0D4D3E] text-white pt-8 sm:pt-10 lg:pt-12 pb-24 sm:pb-28 px-4 sm:px-6 lg:px-8">
      
      {/* Ambient Radial Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-emerald-500/15 via-[#D4AF37]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Subtle Background Pattern & Image Overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden mix-blend-overlay">
        <img 
          src="/src/assets/images/hero_wellness_1785602450811.jpg" 
          alt="Serene Lotus Wellness"
          className="w-full h-full object-cover scale-105 filter blur-[1px]"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#041F18]/95 via-[#083D30]/85 to-[#0D4D3E]/95" />
      </div>

      <div className="relative max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
        {/* Left / Center Column: High-Impact Typography & Value Proposition */}
        <div className="lg:col-span-7 space-y-6 sm:space-y-7 text-center flex flex-col items-center">
          
          {/* Logo at Middle at Beginning */}
          <ScrollReveal variant="scale" delay={0.02}>
            <div className="flex justify-center">
              <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-xl shadow-black/80 bg-black flex items-center justify-center">
                <img 
                  src="https://cdn.corenexis.com/f/J29m8uBQ4qF.jpeg" 
                  alt="Path to Inner Peace Logo" 
                  className="w-full h-full object-cover scale-[1.18] rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </ScrollReveal>

          {/* 1. Welcome to & Path to Inner Peace */}
          <ScrollReveal variant="fade" delay={0.05}>
            <div className="text-center">
              <span className="block text-lg sm:text-2xl lg:text-3xl font-serif text-emerald-100/90 font-light tracking-wide mb-1">
                Welcome to
              </span>
              <div className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight leading-tight gold-gradient-text drop-shadow-sm">
                Path to Inner Peace
              </div>
            </div>
          </ScrollReveal>

          {/* 2. FREE 5-DAY MENTAL RESET CHALLENGE Live Badge */}
          <ScrollReveal variant="slide-down" delay={0.1}>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2.5 bg-emerald-950/70 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full shadow-inner backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse shadow-sm shadow-[#D4AF37]"></span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  FREE 5-DAY MENTAL RESET CHALLENGE
                </span>
              </div>
            </div>
          </ScrollReveal>

          {/* 3. Rewire Your Mind in Just 5 Days */}
          <ScrollReveal variant="slide-up" delay={0.15}>
            <div className="text-center w-full">
              <h1 className="font-poppins font-bold text-2xl sm:text-4xl md:text-5xl text-white tracking-tight leading-[1.18] text-center">
                Rewire Your Mind in{' '}
                <span className="font-serif-italic text-[#D4AF37] font-normal italic drop-shadow">
                  Just 5 Days
                </span>
              </h1>
            </div>
          </ScrollReveal>

          {/* 4. Core Descriptive Copy */}
          <ScrollReveal variant="fade" delay={0.2}>
            <p className="text-sm sm:text-base md:text-lg font-inter text-emerald-100/90 font-normal max-w-2xl leading-relaxed text-center mx-auto">
              Escape the noise. Join 1,000+ others in a science-backed, 30-minute daily journey with <strong className="font-semibold text-white">Path to Inner Peace</strong> to reduce stress, calm anxiety, and reclaim your emotional strength.
            </p>
          </ScrollReveal>

          {/* Key 6 Benefits Checklist */}
          <ScrollReveal variant="scale" delay={0.25}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 sm:gap-3 max-w-xl mx-auto w-full pt-1">
              {[
                'Reduce Stress',
                'Calm Anxiety',
                'Improve Focus',
                'Sleep Better',
                'Emotional Healing',
                'MindForge Certificate'
              ].map((item, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center justify-center gap-2 bg-white/[0.08] hover:bg-white/[0.12] backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/10 shadow-sm text-center transition-all group"
                >
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 flex items-center justify-center text-[#D4AF37] text-[10px] font-bold shrink-0 group-hover:bg-[#D4AF37] group-hover:text-slate-950 transition-colors">
                    <Check className="w-3 h-3" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-medium text-emerald-50 tracking-tight text-center">{item}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Primary Action Buttons */}
          <ScrollReveal variant="slide-up" delay={0.3}>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full">
              <button
                onClick={() => {
                  if (user.registered) {
                    setActiveView('dashboard');
                  } else {
                    setIsRegistrationModalOpen(true);
                  }
                }}
                className="btn-glowing-gold w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-4 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 font-poppins font-bold text-sm sm:text-base rounded-2xl shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 border border-amber-200/60 cursor-pointer group"
              >
                <span>{user.registered ? 'Go to My Dashboard' : 'Join 5-Day Mental Reset Free'}</span>
                <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
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
                className="w-full sm:w-auto px-6 py-3.5 sm:py-4 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#D4AF37]/50 text-white font-semibold text-xs sm:text-sm rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 fill-white" />
                <span>Explore 5-Day Curriculum</span>
              </button>
            </div>
          </ScrollReveal>

          {/* Social Proof Badges */}
          <ScrollReveal variant="fade" delay={0.35}>
            <div className="pt-2 flex flex-wrap items-center justify-center gap-x-7 gap-y-2.5 text-xs text-emerald-200/90 text-center">
              <span className="flex items-center justify-center gap-1.5 font-inter">
                <Users className="w-4 h-4 text-[#D4AF37]" />
                <strong className="text-white">1,000+</strong> Lives Impacted
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

        {/* Right Column: High-End Interactive Fast Registration Card */}
        <div className="lg:col-span-5">
          <ScrollReveal variant="scale" delay={0.2}>
            <div className="relative rounded-3xl glass-panel-dark p-7 sm:p-8 shadow-2xl border border-white/15 soft-shadow glow-emerald">
              
              {/* Top Accent Ribbon */}
              <div className="absolute -top-3.5 -right-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-poppins font-extrabold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md border border-amber-200/40 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-950" />
                <span>Limited Free Seats</span>
              </div>

              <div className="text-center mb-6">
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-white mb-1 tracking-tight">
                  Reserve Your Free Spot
                </h3>
                <p className="text-xs text-emerald-100/80 font-inter">
                  Instant access to Day 1 Mental Detox & Meditation
                </p>
              </div>

              <div className="space-y-4">
                <div className="bg-emerald-950/80 rounded-2xl p-5 border border-emerald-500/25 text-white space-y-3.5 shadow-inner">
                  
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                    <span className="text-emerald-200/90 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      Format:
                    </span>
                    <span className="font-semibold text-white">Daily 30-Min Guided Reset</span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                    <span className="text-emerald-200/90 font-medium flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Coach:
                    </span>
                    <span className="font-semibold text-white">Mainak Chatterjee</span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2.5">
                    <span className="text-emerald-200/90 font-medium flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Fee:
                    </span>
                    <span className="text-[#D4AF37] font-bold text-xs bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                      100% FREE
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-emerald-200/90 font-medium flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-400" />
                      Includes:
                    </span>
                    <span className="text-amber-200 font-semibold text-right">
                      WhatsApp Reminders & Certificate
                    </span>
                  </div>

                </div>

                <div className="flex justify-center pt-1">
                  <button
                    onClick={() => setIsRegistrationModalOpen(true)}
                    className="btn-glowing-gold px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 font-poppins font-bold text-sm rounded-xl shadow-lg hover:brightness-110 active:scale-[0.98] transition-all text-center border border-amber-200/60 flex items-center justify-center gap-1.5 cursor-pointer group"
                  >
                    <span>Join now.</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <p className="text-[10.5px] text-center text-emerald-200/70 font-inter italic">
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
