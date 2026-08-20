import React, { useState } from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2, MessageSquareQuote } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  const active = TESTIMONIALS[currentIndex];

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200/80 overflow-hidden relative">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-emerald-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        
        <ScrollReveal variant="slide-up">
          <div className="text-center mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/70 inline-flex items-center gap-1.5 shadow-xs">
              <MessageSquareQuote className="w-3.5 h-3.5 text-[#0B6B53]" />
              REAL STORIES OF TRANSFORMATION
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-4 tracking-tight">
              What Our Seekers Are Saying
            </h2>
          </div>
        </ScrollReveal>

        {/* Avatar Selection Strip for All 10 Seekers */}
        <ScrollReveal variant="fade" delay={0.1}>
          <div className="flex items-center justify-center gap-2.5 overflow-x-auto py-3 mb-8 scrollbar-none">
            {TESTIMONIALS.map((item, idx) => (
              <button
                key={item.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border ${
                  idx === currentIndex
                    ? 'bg-[#0B6B53] text-white border-[#0B6B53] shadow-md scale-105 ring-2 ring-emerald-400/30'
                    : 'bg-slate-50 text-slate-700 border-slate-200/90 hover:bg-slate-100'
                }`}
                title={item.name}
              >
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="w-6 h-6 rounded-full object-cover border border-white"
                  referrerPolicy="no-referrer"
                />
                <span className="whitespace-nowrap font-semibold">{item.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Carousel Card */}
        <ScrollReveal variant="scale" delay={0.15}>
          <div className="relative bg-gradient-to-b from-[#FAF9F6] to-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl shadow-slate-200/50 transition-all">
            <Quote className="absolute top-6 right-8 sm:top-8 sm:right-10 w-20 h-20 text-[#0B6B53]/10 pointer-events-none" />

            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-8">
              
              <div className="relative shrink-0">
                <img 
                  src={active.avatar} 
                  alt={active.name}
                  className="w-22 h-22 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-lg"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-700 text-white p-1 rounded-full border border-white shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left space-y-4">
                
                <div className="flex items-center justify-center sm:justify-start gap-1">
                  {[...Array(active.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 drop-shadow-xs" />
                  ))}
                  <span className="text-xs font-bold text-amber-900 ml-2">Verified Seeker</span>
                </div>

                <p className="text-slate-800 text-base sm:text-lg italic leading-relaxed font-serif-italic font-medium">
                  "{active.text}"
                </p>

                <div className="pt-2 border-t border-slate-200/60">
                  <h4 className="font-heading font-bold text-slate-900 text-base sm:text-lg flex items-center justify-center sm:justify-start gap-2">
                    <span>{active.name}</span>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-500 font-medium font-inter mt-0.5">
                    {active.role} • {active.location}
                  </p>
                </div>

              </div>

            </div>

            {/* Navigation Controls */}
            <div className="mt-10 pt-6 border-t border-slate-200 flex items-center justify-between">
              <div className="flex gap-2">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      idx === currentIndex ? 'w-8 bg-[#0B6B53]' : 'w-2 bg-slate-300 hover:bg-slate-400'
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2.5">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shadow-xs cursor-pointer"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
