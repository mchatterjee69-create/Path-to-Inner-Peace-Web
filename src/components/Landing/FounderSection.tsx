import React, { useState } from 'react';
import { FOUNDER_INFO } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Award, X, CheckCircle2, UserCheck, Sparkles, ArrowRight, Quote } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const FounderSection: React.FC = () => {
  const [showBioModal, setShowBioModal] = useState(false);
  const { founderPhoto } = useApp();

  return (
    <section className="pt-2 sm:pt-4 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto space-y-6 sm:space-y-7">
        
        {/* Header Tag */}
        <ScrollReveal variant="slide-right">
          <div className="flex items-center gap-3">
            <span className="w-10 sm:w-12 h-1.5 bg-[#D4AF37] rounded-full"></span>
            <span className="text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider text-[#0B6B53] bg-emerald-50 px-4 py-1.5 sm:py-2 rounded-full border border-emerald-200/80 inline-flex items-center gap-2 shadow-xs">
              <UserCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0B6B53]" />
              MEET THE FOUNDER & MENTOR
            </span>
          </div>
        </ScrollReveal>

        {/* Founder Card with Image & Details Grid */}
        <ScrollReveal variant="scale" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-10 items-stretch bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40">
            
            {/* Left Column: Founder Photo Display */}
            <div className="md:col-span-5 flex flex-col items-center w-full">
              <div className="relative w-full h-80 sm:h-96 md:h-full min-h-[360px] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-xl bg-emerald-950 flex items-center justify-center group">
                <img 
                  src={founderPhoto || FOUNDER_INFO.image} 
                  alt={FOUNDER_INFO.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Verified Mentor Badge */}
                <div className="absolute bottom-3 left-3 right-3 bg-emerald-950/80 backdrop-blur-md px-3 py-2 rounded-xl border border-[#D4AF37]/40 flex items-center justify-between text-xs text-white shadow-md">
                  <div className="flex items-center gap-1.5 font-bold text-amber-200">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                    <span>Verified Mentor</span>
                  </div>
                  <span className="text-[10px] text-emerald-200 font-medium">10+ Yrs Exp</span>
                </div>
              </div>
            </div>

            {/* Right Column: Name, Title & Credentials */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5">
              
              <div className="space-y-1.5">
                <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
                  {FOUNDER_INFO.name}
                </h2>
                <p className="text-xs sm:text-sm font-bold text-[#0B6B53] uppercase tracking-wider font-poppins">
                  {FOUNDER_INFO.title}
                </p>
              </div>

              {/* Achievement Badges */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-700">
                <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-[#0B6B53] px-3 py-1.5 rounded-full font-bold border border-emerald-200 shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#0B6B53] shrink-0" />
                  {FOUNDER_INFO.achievement}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3 py-1.5 rounded-full font-bold border border-amber-200 shadow-2xs">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  1,000+ Mentored
                </span>
              </div>

              <p className="text-slate-600 font-inter text-sm sm:text-base leading-relaxed">
                {FOUNDER_INFO.bio}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => setShowBioModal(true)}
                  className="px-6 py-3 rounded-2xl bg-slate-900 hover:bg-[#0B6B53] text-white text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer group"
                >
                  <span>Learn More About Mainak</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

            </div>

          </div>
        </ScrollReveal>

        {/* Quote Block */}
        <ScrollReveal variant="slide-up" delay={0.2}>
          <div className="p-6 sm:p-7 bg-white rounded-3xl border border-slate-200/90 shadow-md relative overflow-hidden flex items-start gap-4">
            <div className="w-2 rounded-full self-stretch bg-gradient-to-b from-[#D4AF37] to-amber-500 shrink-0" />
            <div className="space-y-1.5 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-widest text-[#0B6B53]">
                Founder's Philosophy
              </p>
              <p className="text-base sm:text-lg font-serif-italic text-slate-800 leading-relaxed">
                "{FOUNDER_INFO.quote}"
              </p>
            </div>
            <Quote className="w-12 h-12 text-[#0B6B53]/10 shrink-0 hidden sm:block" />
          </div>
        </ScrollReveal>

      </div>

      {/* Extended Biography Modal */}
      {showBioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] border border-slate-200">
            <button
              onClick={() => setShowBioModal(false)}
              className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6 pb-5 border-b border-slate-200">
              <img src={founderPhoto || FOUNDER_INFO.image} alt={FOUNDER_INFO.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37] shrink-0 shadow-md" />
              <div>
                <h3 className="font-heading font-bold text-2xl text-slate-900">{FOUNDER_INFO.name}</h3>
                <p className="text-xs text-[#0B6B53] font-bold mt-0.5">{FOUNDER_INFO.title}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-inter">
              <p>
                Mainak Chatterjee is an <strong>Author, Mind Mastery Coach & Founder</strong> of <strong>Path to Inner Peace</strong> and the <strong>MindForge 360°™</strong> ecosystem.
              </p>
              <p>
                Having spent over a decade researching cognitive behavioral techniques, mindfulness protocols, eastern spiritual wisdom, and nervous system regulation, Mainak created the <strong>5-Day 30-Minute Mental Reset Challenge</strong> to make emotional healing accessible to busy individuals.
              </p>
              
              <h4 className="font-heading font-bold text-slate-900 text-base pt-2">Core Pillars of His Coaching:</h4>
              <ul className="space-y-2.5 text-xs text-slate-700">
                <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                  <span><strong>Cognitive Re-Framing:</strong> Disarming unhelpful thoughts through practical CBT frameworks.</span>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                  <span><strong>Somatic Breathwork:</strong> Vagus nerve activation to quiet fight-or-flight anxiety within 3 minutes.</span>
                </li>
                <li className="flex items-start gap-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200/80">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                  <span><strong>Spiritual Grounding:</strong> Reconnecting with effortless inner presence beyond ego and stress.</span>
                </li>
              </ul>

              <div className="pt-5 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setShowBioModal(false)}
                  className="px-6 py-2.5 bg-[#0B6B53] hover:bg-[#08523F] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Close & Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

