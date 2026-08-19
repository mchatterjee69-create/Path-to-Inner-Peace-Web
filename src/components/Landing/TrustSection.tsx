import React from 'react';
import { Star, Users, Headphones, Sun, Award, CheckCircle } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';

export const TrustSection: React.FC = () => {
  const stats = [
    {
      icon: Star,
      value: '4.9 ★★★★★',
      label: 'Average User Rating',
      detail: 'Based on 850+ verified reviews',
      accent: 'text-amber-500 bg-amber-50 border-amber-200'
    },
    {
      icon: Users,
      value: '1,000+',
      label: 'Lives Impacted',
      detail: 'Across India',
      accent: 'text-[#0B6B53] bg-emerald-50 border-emerald-200'
    },
    {
      icon: Headphones,
      value: 'Daily Guided',
      label: '30-Min Sessions',
      detail: 'Breathwork & meditation audio',
      accent: 'text-teal-700 bg-teal-50 border-teal-200'
    },
    {
      icon: Sun,
      value: 'Beginner Friendly',
      label: 'Zero Prior Experience',
      detail: 'Step-by-step coaching',
      accent: 'text-[#D4AF37] bg-yellow-50 border-yellow-200'
    },
    {
      icon: Award,
      value: 'Certificate',
      label: 'Included Free',
      detail: 'Verifiable MindForge badge',
      accent: 'text-emerald-800 bg-emerald-100/70 border-emerald-300'
    }
  ];

  return (
    <section className="bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] border-y border-emerald-950/5 py-14 sm:py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <ScrollReveal variant="fade">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200/60 inline-flex items-center gap-1.5 shadow-xs">
              <CheckCircle className="w-3.5 h-3.5 text-[#0B6B53]" />
              Trusted Wellness Platform
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900 mt-3 tracking-tight">
              Why 1,000+ Seekers Trust Path to Inner Peace
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={idx} variant="scale">
                <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center flex flex-col items-center justify-between h-full group">
                  
                  <div className={`w-12 h-12 rounded-2xl ${stat.accent} border flex items-center justify-center mb-3.5 group-hover:scale-110 transition-transform shadow-xs`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>

                  <div className="font-heading font-extrabold text-base sm:text-lg text-slate-900 tracking-tight">
                    {stat.value}
                  </div>

                  <div className="text-xs font-bold text-[#0B6B53] mt-1">
                    {stat.label}
                  </div>

                  <div className="text-[11px] text-slate-500 mt-1.5 leading-snug">
                    {stat.detail}
                  </div>

                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

      </div>
    </section>
  );
};
