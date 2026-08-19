import React, { useState } from 'react';
import { FAQ_ITEMS } from '../../data/mockData';
import { ChevronDown, HelpCircle, Sparkles } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        <ScrollReveal variant="slide-up">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/70 inline-flex items-center gap-1.5 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#0B6B53]" />
              GOT QUESTIONS?
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-4 tracking-tight">
              Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="space-y-4">
          {FAQ_ITEMS.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <StaggerItem key={idx} variant="slide-up">
                <div 
                  className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden shadow-xs ${
                    isOpen ? 'border-[#0B6B53]/40 shadow-md' : 'border-slate-200/90 hover:border-slate-300'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-slate-900 text-base sm:text-lg hover:bg-slate-50/60 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-3.5">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isOpen ? 'bg-emerald-100 text-[#0B6B53]' : 'bg-slate-100 text-slate-500'
                      }`}>
                        <HelpCircle className="w-4.5 h-4.5" />
                      </div>
                      <span className="leading-snug">{faq.question}</span>
                    </span>
                    <ChevronDown className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0B6B53]' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4 bg-[#FAF9F6]/60 font-inter">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
