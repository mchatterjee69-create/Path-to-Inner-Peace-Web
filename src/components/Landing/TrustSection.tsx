import React from 'react';
import { Star, Users, Headphones, Sun, Award } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';

export const TrustSection: React.FC = () => {
  const stats = [
    {
      icon: Star,
      value: '4.9 ★★★★★',
      label: 'Average User Rating',
      detail: 'Based on 850+ verified reviews'
    },
    {
      icon: Users,
      value: '1,000+',
      label: 'Lives Impacted',
      detail: 'Across India & worldwide'
    },
    {
      icon: Headphones,
      value: 'Daily Guided',
      label: '30-Min Sessions',
      detail: 'Breathwork & meditation audio'
    },
    {
      icon: Sun,
      value: 'Beginner Friendly',
      label: 'Zero Prior Experience',
      detail: 'Step-by-step coaching'
    },
    {
      icon: Award,
      value: 'Certificate',
      label: 'Included Free',
      detail: 'Verifiable MindForge badge'
    }
  ];

  return (
    <section className="bg-slate-50 border-y border-slate-200/80 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <ScrollReveal variant="fade">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53]">
              Trusted Wellness Platform
            </span>
            <h2 className="font-heading font-bold text-2xl text-slate-900 mt-1">
              Why 1,000+ Seekers Trust Path to Inner Peace
            </h2>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <StaggerItem key={idx} variant="scale">
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-center flex flex-col items-center justify-between h-full">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6B53] flex items-center justify-center mb-3">
                    <Icon className="w-5 h-5 text-[#0B6B53]" />
                  </div>
                  <div className="font-heading font-extrabold text-lg text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-[#0B6B53] mt-0.5">
                    {stat.label}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">
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
