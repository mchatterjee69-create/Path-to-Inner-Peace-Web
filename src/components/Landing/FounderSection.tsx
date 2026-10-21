import React, { useState } from 'react';
import { FOUNDER_INFO } from '../../data/mockData';
import { useApp } from '../../context/AppContext';
import { ShieldCheck, Award, X, CheckCircle2, UserCheck, ArrowRight, Quote, ExternalLink } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';
import founderMentorPhoto from '../../assets/images/mainak-chatterjee.jpg';
import verifyScannerImg from '../../assets/images/verify-scanner.png';

export const FounderSection: React.FC = () => {
  const [showBioModal, setShowBioModal] = useState(false);
  const [showVerifyModal, setShowVerifyModal] = useState(false);
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

        {/* Founder Details Grid (Full Screen / Unboxed Layout) */}
        <ScrollReveal variant="fade" delay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center py-2 sm:py-4">
            
            {/* Left Column: Founder Photo Display */}
            <div className="md:col-span-5 flex flex-col items-center w-full">
              <div className="relative w-full h-80 sm:h-96 md:h-[420px] rounded-3xl overflow-hidden border-2 border-[#D4AF37] shadow-xl bg-emerald-950 flex items-center justify-center group">
                <img 
                  src={founderMentorPhoto} 
                  alt={FOUNDER_INFO.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top sm:object-center group-hover:scale-105 transition-transform duration-700" 
                />
                
                {/* Verified Mentor Badge */}
                <div className="absolute bottom-2.5 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 bg-emerald-950/90 backdrop-blur-md px-2 sm:px-2.5 lg:px-3 py-1.5 rounded-xl sm:rounded-2xl border border-[#D4AF37]/50 flex items-center justify-between gap-1 sm:gap-1.5 text-white shadow-md overflow-hidden">
                  {/* Left: Verified Mentor */}
                  <div className="flex items-center gap-1 font-bold text-amber-200 shrink-0 whitespace-nowrap">
                    <ShieldCheck className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-[#D4AF37] shrink-0" />
                    <span className="text-[9px] sm:text-[10px] lg:text-[10.5px] tracking-tight">Verified Mentor</span>
                  </div>

                  {/* Center: Scan to Verify */}
                  <button 
                    onClick={() => setShowVerifyModal(true)}
                    className="inline-flex items-center gap-1 sm:gap-1.5 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-emerald-900/85 border border-[#D4AF37]/40 text-[8px] sm:text-[9.5px] lg:text-[10px] font-medium text-emerald-100 whitespace-nowrap tracking-tight shrink-0 shadow-2xs hover:border-[#D4AF37] hover:bg-emerald-800 transition-colors cursor-pointer"
                    title="Click to scan or view verified accreditation & credentials"
                  >
                    <span>Scan to Verify</span>
                    <img 
                      src={verifyScannerImg} 
                      alt="Verification Scanner" 
                      className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[3px] object-contain bg-white shrink-0 p-[0.5px] shadow-xs" 
                    />
                  </button>

                  {/* Right: 10+ Yrs Exp */}
                  <div className="text-[8.5px] sm:text-[9.5px] lg:text-[10px] text-emerald-200 font-semibold shrink-0 whitespace-nowrap tracking-tight">
                    10+ Yrs Exp
                  </div>
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
                <span className="inline-flex items-center gap-1.5 bg-amber-50 text-amber-900 px-3.5 py-1.5 rounded-full font-bold border border-amber-200 shadow-2xs">
                  <Award className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  1000+ Mentored
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
              <img src={founderMentorPhoto} alt={FOUNDER_INFO.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-[#D4AF37] shrink-0 shadow-md" />
              <div className="flex-1">
                <h3 className="font-heading font-bold text-2xl text-slate-900">{FOUNDER_INFO.name}</h3>
                <p className="text-xs text-[#0B6B53] font-bold mt-0.5">{FOUNDER_INFO.title}</p>
              </div>
              <button 
                onClick={() => { setShowBioModal(false); setShowVerifyModal(true); }}
                className="hidden sm:flex flex-col items-center gap-1 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200/80 p-2 rounded-xl shrink-0 transition-colors cursor-pointer group"
                title="Click to view full scannable verification record"
              >
                <img src={verifyScannerImg} alt="Accredited Scanner" className="w-10 h-10 object-contain rounded bg-white p-0.5 border border-[#D4AF37]/40 shadow-xs group-hover:scale-105 transition-transform" />
                <span className="text-[9px] font-bold text-[#0B6B53] uppercase tracking-tight">Verified Mentor</span>
              </button>
            </div>

            <div className="space-y-4 text-sm text-slate-700 leading-relaxed font-inter">
              <p>
                Mainak Chatterjee is a <strong>Certified Mindfulness & Stress Management Coach</strong>, <strong>Quantum Alchemist</strong>, <strong>Author</strong> & <strong>Post Graduate in Business Management</strong>.
              </p>
              <p>
                Having spent over a decade researching cognitive behavioral techniques, mindfulness protocols, eastern spiritual wisdom, and nervous system regulation, Mainak created the <strong>5-Day 30-Minute Mind Reset Challenge</strong> to make emotional healing accessible to busy individuals.
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
                  <span><strong>Mindfulness & Meditation:</strong> Cultivating present-moment awareness, emotional detachment, and mental clarity through guided stillness.</span>
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
      {/* Official GSDC Accreditation & Scanner Verification Modal */}
      {showVerifyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-6 sm:p-7 border border-slate-200 text-center">
            <button
              onClick={() => setShowVerifyModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="flex items-center justify-center gap-2 mb-1.5">
              <ShieldCheck className="w-6 h-6 text-[#0B6B53]" />
              <span className="font-heading font-extrabold text-lg text-slate-900">
                Official Credential Verification
              </span>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Global Skill Development Council (GSDC) Certification
            </p>

            {/* Scannable High-Res QR Code Card */}
            <div className="bg-slate-50 border-2 border-[#D4AF37] rounded-2xl p-4 sm:p-5 inline-block shadow-inner mx-auto mb-4">
              <img 
                src={verifyScannerImg} 
                alt="Scan to Verify GSDC Certification" 
                className="w-48 h-48 sm:w-56 sm:h-56 object-contain rounded-lg bg-white mx-auto shadow-xs" 
              />
              <p className="text-[11px] font-semibold text-slate-700 mt-2.5">
                Scan with any phone camera to verify credentials
              </p>
            </div>

            {/* Verification Metadata */}
            <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-xl p-3 text-left space-y-1.5 mb-5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Coach / Mentor:</span>
                <span className="font-bold text-slate-900">Mainak Chatterjee</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Certification:</span>
                <span className="font-bold text-[#0B6B53] text-[11px] text-right">Mindfulness & Stress Management Coach</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500">Accreditation:</span>
                <span className="font-bold text-slate-800">GSDC Global Registry</span>
              </div>
              <div className="flex justify-between items-center pt-1 border-t border-emerald-200/50">
                <span className="text-slate-500">Verification Status:</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px]">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  AUTHENTICATED & ACTIVE
                </span>
              </div>
            </div>

            {/* Direct Verification Link for Mobile / Instant View */}
            <a
              href="https://gsdci.com/result/mainak-chatterjee-certified-mindfulness-stress-management-coach/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#0B6B53] hover:bg-[#08523F] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all mb-2 cursor-pointer"
            >
              <span>Open Official Verification Record</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            <button
              onClick={() => setShowVerifyModal(false)}
              className="w-full py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 transition-colors cursor-pointer"
            >
              Done & Return
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

