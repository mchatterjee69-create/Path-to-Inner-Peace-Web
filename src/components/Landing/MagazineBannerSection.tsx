import React from 'react';
import { useApp } from '../../context/AppContext';
import { BookOpen, ExternalLink, Sparkles, CheckCircle, Download, FileText, ArrowRight } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';
import innerHorizonCover from '../../assets/images/inner_horizon_cover_1785774252941.jpg';

export const MagazineBannerSection: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF9F6] via-amber-50/40 to-white relative overflow-hidden border-y border-amber-200/50">
      {/* Decorative Blur Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-200/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-200/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="relative max-w-7xl mx-auto">
        <ScrollReveal variant="slide-up">
          <div className="bg-gradient-to-r from-[#041F18] via-[#083D30] to-[#0A2E24] rounded-3xl p-6 sm:p-10 lg:p-12 text-white border-2 border-[#D4AF37]/50 shadow-2xl relative overflow-hidden">
            
            {/* Background Pattern */}
            <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
              
              {/* Left Column: Magazine Cover Poster Preview */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="relative group cursor-pointer max-w-[260px] sm:max-w-[280px]">
                  <div className="absolute -inset-2 bg-gradient-to-r from-amber-400 to-[#D4AF37] rounded-3xl blur-md opacity-60 group-hover:opacity-90 transition duration-500" />
                  
                  <div className="relative rounded-2xl overflow-hidden border-2 border-amber-300/80 shadow-2xl bg-slate-950 aspect-[1/1.45] w-full">
                    <img 
                      src={innerHorizonCover || '/inner_horizon_cover.jpg'} 
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/inner_horizon_cover.jpg';
                      }}
                      alt="INNER HORIZON Issue 01 Official Magazine Cover" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Badge Overlay */}
                    <div className="absolute top-3 left-3 bg-[#D4AF37] text-slate-950 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider shadow-lg flex items-center gap-1">
                      <Sparkles className="w-3 h-3 fill-slate-950" />
                      <span>Issue 01 Launch</span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full text-[10px] font-bold border border-amber-400/40">
                      31 Full Pages
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Information, Features & Actions */}
              <div className="lg:col-span-8 space-y-6 text-center lg:text-left">
                
                <div className="space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#D4AF37] text-xs font-bold uppercase tracking-wider">
                    <BookOpen className="w-4 h-4 text-[#D4AF37]" />
                    <span>Official Transformation Publication</span>
                  </div>

                  <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight">
                    INNER HORIZON: <span className="text-[#D4AF37]">The Science of Inner Peace</span>
                  </h2>

                  <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-2xl font-inter">
                    Welcome to the inaugural launch edition of <strong>Inner Horizon Magazine</strong>. Explore 31 comprehensive pages blending neuroscience, CBT cognitive reframing protocols, guided mindfulness reflections, and expert mental health dialogues.
                  </p>
                </div>

                {/* Key Issue Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-left">
                  {[
                    'The Neurobiology of Stress & Vagus Nerve Calm',
                    '12 Practical CBT Thought-Rewiring Frameworks',
                    'Q&A with Leading Wisdom Practitioners',
                    '7-Day Reflection & Mental Reset Toolkit'
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 bg-white/10 backdrop-blur-xs px-3.5 py-2 rounded-xl border border-white/10">
                      <CheckCircle className="w-4 h-4 text-[#D4AF37] shrink-0" />
                      <span className="text-xs sm:text-sm text-emerald-50 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
                  <a
                    href="https://conscious-gold-2gld9uka.edgeone.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-7 py-3.5 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 hover:brightness-110 text-slate-950 font-extrabold text-sm rounded-xl shadow-xl transition-all flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-slate-950" />
                    <span>Read Issue 01 Digital PDF</span>
                    <ExternalLink className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
                  </a>

                  <button
                    onClick={() => setActiveView('profile')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-emerald-800/80 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl border border-emerald-500/50 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    <span>Open in Member Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
