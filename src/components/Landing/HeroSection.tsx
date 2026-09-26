import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Shield, Users, Award, ArrowRight, Check, Clock, UserCheck, Gift, Video } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';
import { FreeStarBadge } from '../Common/FreeStarBadge';
import corporateWellnessBg from '../../assets/images/corporate_wellness_bg_1788440459846.jpg';

export const HeroSection: React.FC = () => {
  const { setIsRegistrationModalOpen, setActiveView, user } = useApp();
  const [selectedBatch, setSelectedBatch] = useState<string>('6:30 AM');

  return (
    <section id="hero-content-section" className="relative overflow-hidden bg-gradient-to-b from-[#041F18] via-[#083D30] to-[#0D4D3E] text-white pt-8 sm:pt-10 lg:pt-12 pb-24 sm:pb-28 px-4 sm:px-6 lg:px-8">
      
      {/* Ambient Radial Lights */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[450px] bg-gradient-to-b from-emerald-500/15 via-[#D4AF37]/10 to-transparent blur-3xl pointer-events-none rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-600/10 blur-3xl pointer-events-none rounded-full" />

      {/* Full length & width shadow image for desktop & laptop only (no image for tab & mobile) */}
      <div className="hidden lg:block absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <img 
          src={corporateWellnessBg}
          alt="Path to Inner Peace Serene Wellness"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center filter brightness-[0.60] contrast-[1.15] saturate-[0.85] opacity-80 scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#021811]/85 via-[#032419]/60 to-[#021811]/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#021811] via-emerald-950/30 to-[#021811]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
        
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

          {/* 2. 5-DAY EXCLUSIVE MIND RESET CHALLENGE Live Badge */}
          <ScrollReveal variant="slide-down" delay={0.1}>
            <div className="flex justify-center">
              <div className="inline-flex items-center gap-2.5 bg-emerald-950/70 border border-[#D4AF37]/40 px-4 py-1.5 rounded-full shadow-inner backdrop-blur-md">
                <span className="w-2.5 h-2.5 rounded-full bg-[#D4AF37] animate-pulse shadow-sm shadow-[#D4AF37]"></span>
                <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                  5-DAY EXCLUSIVE MIND RESET CHALLENGE
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
                'Reprogram Subconscious State'
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

          {/* Time Schedule (Reference: Join Any Batch) with Destination Color Scheme - Mobile & Tablet Only */}
          <div className="block lg:hidden">
            <ScrollReveal variant="slide-up" delay={0.3}>
              <div className="mt-6 w-full max-w-xl mx-auto rounded-3xl bg-gradient-to-b from-[#063025]/90 to-[#041F18]/95 backdrop-blur-xl border border-emerald-400/30 p-5 sm:p-6 shadow-2xl relative overflow-hidden text-center">
                
                {/* Subtle ambient glows */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-[#0B6B53]/40 rounded-full blur-3xl pointer-events-none" />

                {/* Schedule Title */}
                <div className="relative z-10">
                  <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                    JOIN ANY BATCH
                  </h3>
                  <p className="text-xs sm:text-sm font-inter text-emerald-200/90 font-medium mt-1 flex items-center justify-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    <span>30 min each session, Indian Standard Time</span>
                  </p>
                </div>

                {/* Morning & Evening Batch Cards */}
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-5 relative z-10 text-left">
                  
                  {/* Morning Card */}
                  <div className="rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-emerald-400/30 overflow-hidden shadow-lg transition-all flex flex-col">
                    <div className="bg-gradient-to-r from-[#0B6B53] to-emerald-600 px-3 py-2 sm:py-2.5 text-center flex items-center justify-center gap-1.5 border-b border-emerald-400/30">
                      <span className="text-base sm:text-lg select-none" role="img" aria-label="Morning sun">🌤️</span>
                      <span className="font-poppins font-bold text-xs sm:text-sm text-white tracking-wide">
                        Morning
                      </span>
                    </div>
                    <div className="p-3 sm:p-4 flex flex-col items-center justify-center gap-2 sm:gap-2.5 font-inter">
                      {['6:30 AM', '7:30 AM', '8:30 AM'].map((time) => {
                        const isSelected = selectedBatch === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedBatch(time)}
                            className={`w-full py-2 px-2.5 rounded-xl text-center text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 font-bold shadow-md ring-2 ring-amber-300/80 scale-[1.02]'
                                : 'bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-100 hover:text-white border border-emerald-500/20'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Evening Card */}
                  <div className="rounded-2xl bg-white/[0.05] hover:bg-white/[0.08] border border-emerald-400/30 overflow-hidden shadow-lg transition-all flex flex-col">
                    <div className="bg-gradient-to-r from-emerald-900 to-[#041F18] px-3 py-2 sm:py-2.5 text-center flex items-center justify-center gap-1.5 border-b border-emerald-400/30">
                      <span className="font-poppins font-bold text-xs sm:text-sm text-white tracking-wide">
                        Evening
                      </span>
                      <span className="text-base sm:text-lg select-none" role="img" aria-label="Evening moon">🌙</span>
                    </div>
                    <div className="p-3 sm:p-4 flex flex-col items-center justify-center gap-2 sm:gap-2.5 font-inter">
                      {['5:00 PM', '6:00 PM', '7:00 PM'].map((time) => {
                        const isSelected = selectedBatch === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedBatch(time)}
                            className={`w-full py-2 px-2.5 rounded-xl text-center text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 font-bold shadow-md ring-2 ring-amber-300/80 scale-[1.02]'
                                : 'bg-emerald-950/70 hover:bg-emerald-900/90 text-emerald-100 hover:text-white border border-emerald-500/20'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                </div>

                {/* CTA Button matching screenshot with destination colors */}
                <div className="mt-5 relative z-10 flex flex-col items-center">
                  <button
                    onClick={() => {
                      if (user.registered) {
                        setActiveView('dashboard');
                      } else {
                        setIsRegistrationModalOpen(true);
                      }
                    }}
                    className="relative btn-glowing-gold w-full py-3.5 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 font-poppins font-bold text-sm sm:text-base rounded-2xl shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 border border-amber-200/60 cursor-pointer group"
                  >
                    {!user.registered && (
                      <FreeStarBadge size="md" />
                    )}
                    {user.registered ? (
                      <span>Go to My Dashboard</span>
                    ) : (
                      <span>Click to Join Free Challenge</span>
                    )}
                    <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform shrink-0" />
                  </button>

                  {/* Social Proof Attendance Count */}
                  <p className="mt-3 text-xs sm:text-sm font-inter font-bold text-emerald-100 tracking-tight flex items-center justify-center gap-1.5">
                    <span className="text-[#D4AF37] text-sm sm:text-base font-extrabold">2k+</span>
                    <span className="text-emerald-100/90 font-medium">already attended</span>
                  </p>
                </div>

              </div>
            </ScrollReveal>
          </div>

          {/* Desktop Main CTA & Social Proof */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 pt-3 w-full">
            <button
              onClick={() => {
                if (user.registered) {
                  setActiveView('dashboard');
                } else {
                  setIsRegistrationModalOpen(true);
                }
              }}
              className="relative btn-glowing-gold py-3.5 px-8 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 font-poppins font-bold text-base rounded-2xl shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2.5 border border-amber-200/60 cursor-pointer group"
            >
              {!user.registered && (
                <FreeStarBadge size="md" />
              )}
              {user.registered ? (
                <span>Go to My Dashboard</span>
              ) : (
                <span>Click to Join Free Challenge</span>
              )}
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform shrink-0" />
            </button>
            <p className="text-xs sm:text-sm font-inter font-bold text-emerald-100 tracking-tight flex items-center justify-center gap-1.5">
              <span className="text-[#D4AF37] text-sm sm:text-base font-extrabold">2k+</span>
              <span className="text-emerald-100/90 font-medium">already attended</span>
            </p>
          </div>

          {/* Secondary Curriculum Link & Social Proof Badges */}
          <ScrollReveal variant="fade" delay={0.35}>
            <div className="pt-4 flex flex-col items-center justify-center gap-3 w-full">
              <button
                onClick={() => {
                  const element = document.getElementById('curriculum-section');
                  if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    setActiveView('landing');
                  }
                }}
                className="inline-flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold text-emerald-200 hover:text-white transition-colors cursor-pointer group"
              >
                <Play className="w-3.5 h-3.5 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="underline underline-offset-4 decoration-emerald-400/50 group-hover:decoration-white">Explore Full 5-Day Curriculum</span>
              </button>

              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-emerald-200/90 text-center pt-1">
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
            </div>
          </ScrollReveal>

        </div>

        {/* Right Column: High-End Interactive Fast Registration Card */}
        <div className="lg:col-span-5 lg:-mt-4 xl:-mt-7 space-y-4">
          <ScrollReveal variant="scale" delay={0.2}>
            <div className="relative rounded-3xl glass-panel-dark p-6 sm:p-7 lg:p-5 shadow-2xl border border-white/15 soft-shadow glow-emerald">
              
              {/* Top Accent Ribbon */}
              <div className="absolute -top-3.5 -right-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-poppins font-extrabold text-[10px] uppercase tracking-widest px-4 py-1.5 rounded-full shadow-md border border-amber-200/40 flex items-center gap-1">
                <Clock className="w-3 h-3 text-slate-950" />
                <span>Limited Free Seats</span>
              </div>

              <div className="text-center mb-4 lg:mb-3">
                <h3 className="font-poppins font-bold text-xl sm:text-2xl text-white mb-1 tracking-tight">
                  Reserve Your Free Spot
                </h3>
                <p className="text-xs text-emerald-100/80 font-inter">
                  Instant access to Day 1 Mental Detox & Meditation
                </p>
              </div>

              <div className="space-y-3.5">
                <div className="bg-emerald-950/80 rounded-2xl p-4 lg:p-3.5 border border-emerald-500/25 text-white space-y-2.5 shadow-inner">
                  
                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-emerald-200/90 font-medium flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Coach:
                    </span>
                    <span className="font-semibold text-white">Mainak Chatterjee</span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-emerald-200/90 font-medium flex items-center gap-1.5">
                      <Video className="w-3.5 h-3.5 text-red-400" />
                      Platform:
                    </span>
                    <span className="font-semibold text-white flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                      Youtube Live
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-emerald-200/90 font-medium flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-emerald-400" />
                      Format:
                    </span>
                    <span className="font-semibold text-white">Daily 30-Min Guided Reset</span>
                  </div>

                  <div className="flex items-center justify-between text-xs border-b border-white/10 pb-2">
                    <span className="text-emerald-200/90 font-medium flex items-center gap-1.5">
                      <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                      Fee:
                    </span>
                    <span className="text-[#D4AF37] font-bold text-xs bg-[#D4AF37]/10 px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                      100% FREE
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs gap-2">
                    <span className="text-emerald-200/90 font-medium flex items-center gap-1.5 shrink-0">
                      <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      Includes:
                    </span>
                    <span className="text-amber-200 font-semibold text-right whitespace-nowrap text-[11.5px] sm:text-xs">
                      Exclusive pack of free Welcome Kit
                    </span>
                  </div>

                </div>

                {/* Mobile / Tablet only Join Now button */}
                <div className="flex justify-center pt-1.5 lg:hidden">
                  <button
                    onClick={() => setIsRegistrationModalOpen(true)}
                    className="relative btn-glowing-gold inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 hover:from-[#e5bd3d] hover:to-amber-400 text-slate-950 font-poppins font-bold text-sm rounded-xl shadow-md hover:shadow hover:brightness-110 active:scale-[0.98] transition-all text-center border border-amber-200/60 cursor-pointer group"
                  >
                    <span>Join Now</span>
                    <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>

                <p className="text-[11px] text-center text-emerald-200/70 font-inter italic lg:hidden">
                  MindForge 360°™ Certification included upon completion.
                </p>
              </div>

            </div>
          </ScrollReveal>

          {/* Desktop-Only Concise Join Any Batch Card Naturally Below */}
          <div className="hidden lg:block">
            <ScrollReveal variant="slide-up" delay={0.25}>
              <div className="relative rounded-2xl bg-gradient-to-b from-[#063025]/90 to-[#041F18]/95 backdrop-blur-xl border border-emerald-400/30 p-3.5 shadow-2xl relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-emerald-500/20 pb-2 mb-2.5">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                    <h4 className="font-heading font-extrabold text-sm text-white tracking-wide">
                      JOIN ANY BATCH
                    </h4>
                  </div>
                  <span className="text-[11px] font-inter text-emerald-200/90 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#D4AF37]" />
                    <span>30 min / session (IST)</span>
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2.5 text-left">
                  {/* Morning */}
                  <div className="rounded-xl bg-white/[0.04] border border-emerald-400/25 p-2 flex flex-col gap-1.5">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-200 pb-1 border-b border-emerald-500/20">
                      <span>🌤️</span>
                      <span>Morning</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {['6:30 AM', '7:30 AM', '8:30 AM'].map((time) => {
                        const isSelected = selectedBatch === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedBatch(time)}
                            className={`w-full py-1 px-2 rounded-lg text-center text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 font-bold shadow-xs ring-1 ring-amber-300'
                                : 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-100 hover:text-white border border-emerald-500/20'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Evening */}
                  <div className="rounded-xl bg-white/[0.04] border border-emerald-400/25 p-2 flex flex-col gap-1.5">
                    <div className="flex items-center justify-center gap-1 text-[11px] font-bold text-emerald-200 pb-1 border-b border-emerald-500/20">
                      <span>🌙</span>
                      <span>Evening</span>
                    </div>
                    <div className="grid grid-cols-1 gap-1">
                      {['5:00 PM', '6:00 PM', '7:00 PM'].map((time) => {
                        const isSelected = selectedBatch === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            onClick={() => setSelectedBatch(time)}
                            className={`w-full py-1 px-2 rounded-lg text-center text-xs font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 font-bold shadow-xs ring-1 ring-amber-300'
                                : 'bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-100 hover:text-white border border-emerald-500/20'
                            }`}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-[10.5px] text-emerald-200/80 font-inter text-center">
                  <span className="text-[#D4AF37] font-bold">2k+ Seekers Joined</span> • Batch: <strong className="text-white">{selectedBatch}</strong>
                </p>
              </div>

              {/* Desktop-Only Join Now button placed naturally after Join Any Batch card */}
              <div className="mt-3 flex flex-col items-center gap-1.5">
                <button
                  onClick={() => setIsRegistrationModalOpen(true)}
                  className="relative btn-glowing-gold inline-flex items-center justify-center gap-2 px-7 py-2.5 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 hover:from-[#e5bd3d] hover:to-amber-400 text-slate-950 font-poppins font-bold text-sm tracking-wide rounded-xl shadow-md hover:shadow-lg hover:shadow-amber-500/20 hover:brightness-110 active:scale-[0.98] transition-all text-center border border-amber-200/60 cursor-pointer group"
                >
                  <span>Join Now</span>
                  <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <p className="text-[11px] text-center text-emerald-200/70 font-inter italic">
                  MindForge 360°™ Certification included upon completion.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>

      </div>
    </section>
  );
};
