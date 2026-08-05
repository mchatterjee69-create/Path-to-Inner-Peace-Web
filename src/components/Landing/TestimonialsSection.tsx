import React, { useState } from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { Star, ChevronLeft, ChevronRight, Quote, CheckCircle2 } from 'lucide-react';

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
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200">
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-3 py-1 rounded-full">
            REAL STORIES OF TRANSFORMATION
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
            What Our Seekers Are Saying
          </h2>
        </div>

        {/* Avatar Selection Strip for All 10 Seekers */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 mb-6 scrollbar-none">
          {TESTIMONIALS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => setCurrentIndex(idx)}
              className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all border ${
                idx === currentIndex
                  ? 'bg-[#0B6B53] text-white border-[#0B6B53] shadow-md scale-105'
                  : 'bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200'
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

        {/* Carousel Card */}
        <div className="relative bg-slate-50 rounded-3xl p-8 sm:p-10 border border-slate-200/80 shadow-sm transition-all">
          <Quote className="absolute top-6 right-8 w-16 h-16 text-[#0B6B53]/10 pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            
            <img 
              src={active.avatar} 
              alt={active.name}
              className="w-20 h-20 rounded-2xl object-cover border-2 border-[#0B6B53] shadow-md shrink-0"
              referrerPolicy="no-referrer"
            />

            <div className="flex-1 text-center sm:text-left space-y-3">
              
              <div className="flex items-center justify-center sm:justify-start gap-1">
                {[...Array(active.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <p className="text-slate-800 text-base sm:text-lg italic leading-relaxed font-medium">
                "{active.text}"
              </p>

              <div>
                <h4 className="font-heading font-bold text-slate-900 text-base flex items-center justify-center sm:justify-start gap-1.5">
                  <span>{active.name}</span>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                </h4>
                <p className="text-xs text-slate-500 font-medium">
                  {active.role} • {active.location}
                </p>
              </div>

            </div>

          </div>

          {/* Navigation Controls */}
          <div className="mt-8 pt-6 border-t border-slate-200 flex items-center justify-between">
            <div className="flex gap-1.5">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    idx === currentIndex ? 'w-8 bg-[#0B6B53]' : 'w-2 bg-slate-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
