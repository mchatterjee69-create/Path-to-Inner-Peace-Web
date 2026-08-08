import React, { useState } from 'react';
import { FOUNDER_INFO } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Award, X, CheckCircle2, Sparkles } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const FounderSection: React.FC = () => {
  const [showBioModal, setShowBioModal] = useState(false);
  const { founderPhoto } = useApp();

  return (
    <section className="pt-8 pb-16 px-4 sm:px-6 lg:px-8 bg-[#FAF9F6] relative overflow-hidden">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Tag */}
        <ScrollReveal variant="slide-right">
          <div className="flex items-center gap-3">
            <span className="w-10 h-1 bg-[#D4AF37] rounded-full"></span>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-poppins font-bold uppercase tracking-wide text-[#0B6B53]">
              MEET THE FOUNDER & MENTOR
            </h2>
          </div>
        </ScrollReveal>

        {/* Founder Card with Image & Details Grid */}
        <ScrollReveal variant="scale" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch bg-white p-6 sm:p-8 rounded-3xl border border-emerald-900/10 shadow-sm">
            
            {/* Left Column: Founder Photo Display */}
            <div className="md:col-span-5 flex flex-col items-center w-full">
              <div className="relative w-full h-80 sm:h-96 md:h-full min-h-[340px] rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-lg bg-emerald-950 flex items-center justify-center">
                <img 
                  src={founderPhoto || FOUNDER_INFO.image} 
                  alt={FOUNDER_INFO.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top sm:object-center hover:scale-105 transition-transform duration-500" 
                />
              </div>
            </div>

            {/* Right Column: Name, Title & Credentials */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-4">
              <div className="space-y-1">
                <h2 className="font-poppins font-bold text-2xl sm:text-3xl text-emerald-950 tracking-tight">
                  {FOUNDER_INFO.name}
                </h2>
                <p className="text-xs sm:text-sm font-bold text-[#0B6B53] uppercase tracking-wider">
                  {FOUNDER_INFO.title}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-slate-600 max-w-full pb-0.5">
                <span className="inline-flex items-center gap-1 bg-emerald-50 text-[#0B6B53] px-2 py-1 sm:px-2.5 rounded-full font-bold border border-emerald-200 text-[10px] sm:text-xs whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-[#0B6B53] shrink-0" />
                  {FOUNDER_INFO.achievement}
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-900 px-2 py-1 sm:px-2.5 rounded-full font-bold border border-amber-200 text-[10px] sm:text-xs whitespace-nowrap">
                  <Award className="w-3 h-3 text-[#D4AF37] shrink-0" />
                  1,000+ Mentored
                </span>
              </div>

              <p className="text-slate-700 font-inter text-sm sm:text-base leading-relaxed">
                {FOUNDER_INFO.bio}
              </p>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => setShowBioModal(true)}
                  className="px-5 py-2.5 rounded-full border border-emerald-900 text-emerald-900 text-xs font-bold uppercase tracking-widest hover:bg-emerald-50 transition-colors shadow-sm"
                >
                  Learn More About Mainak
                </button>
              </div>
            </div>

          </div>
        </ScrollReveal>

        {/* Quote Block */}
        <ScrollReveal variant="slide-up" delay={0.2}>
          <div className="p-6 bg-white rounded-2xl border-l-4 border-[#D4AF37] shadow-sm space-y-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#0B6B53]">
              Founder's Philosophy
            </p>
            <p className="text-base sm:text-lg font-serif-italic italic text-slate-800">
              "{FOUNDER_INFO.quote}"
            </p>
          </div>
        </ScrollReveal>

      </div>

      {/* Extended Biography Modal */}
      {showBioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setShowBioModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6 pb-4 border-b border-slate-200">
              <img src={FOUNDER_INFO.image} alt={FOUNDER_INFO.name} className="w-16 h-16 rounded-full object-cover border-2 border-[#D4AF37] shrink-0" />
              <div>
                <h3 className="font-heading font-bold text-2xl text-slate-900">{FOUNDER_INFO.name}</h3>
                <p className="text-xs text-[#0B6B53] font-bold mt-0.5">{FOUNDER_INFO.title}</p>
              </div>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
              <p>
                Mainak Chatterjee is an <strong>Author, Mind Mastery Coach & Founder</strong> of <strong>Path to Inner Peace</strong> and the <strong>MindForge 360°™</strong> ecosystem.
              </p>
              <p>
                Having spent over a decade researching cognitive behavioral techniques, mindfulness protocols, eastern spiritual wisdom, and nervous system regulation, Mainak created the <strong>5-Day 30-Minute Mental Reset Challenge</strong> to make emotional healing accessible to busy individuals.
              </p>
              
              <h4 className="font-heading font-bold text-slate-900 text-base pt-2">Core Pillars of His Coaching:</h4>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                  <span><strong>Cognitive Re-Framing:</strong> Disarming unhelpful thoughts through practical CBT frameworks.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                  <span><strong>Somatic Breathwork:</strong> Vagus nerve activation to quiet fight-or-flight anxiety within 3 minutes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                  <span><strong>Spiritual Grounding:</strong> Reconnecting with effortless inner presence beyond ego and stress.</span>
                </li>
              </ul>

              <div className="pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setShowBioModal(false)}
                  className="px-5 py-2.5 bg-[#0B6B53] text-white font-bold text-xs rounded-xl"
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

