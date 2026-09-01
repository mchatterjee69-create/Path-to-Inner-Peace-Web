import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Activity, 
  Eye, 
  HeartHandshake, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface HolisticWellnessSectionProps {
  className?: string;
}

export const HolisticWellnessSection: React.FC<HolisticWellnessSectionProps> = ({ className = '' }) => {
  const { setActiveView } = useApp();

  const coreSolutions = [
    {
      id: 'stress-management',
      number: '01',
      title: 'Stress Management',
      highlightBadge: 'Evidence-Informed',
      icon: Activity,
      description: 'Evidence-informed tools to understand, regulate and transform stress.',
      foundation: 'Nervous System Regulation & CBT',
      accentColor: 'text-[#D4AF37]',
      cardGlow: 'hover:border-[#D4AF37]/60 hover:shadow-[0_12px_32px_rgba(6,44,34,0.35)]',
    },
    {
      id: 'meditation-mindfulness',
      number: '02',
      title: 'Meditation & Mindfulness',
      highlightBadge: 'Vipassana 3-Step',
      icon: Eye,
      description: 'World-accepted meditation and mindfulness practices, with a 3-step approach inspired by Vipassana: awareness, observation and inner transformation.',
      foundation: 'Awareness • Observation • Transformation',
      accentColor: 'text-[#D4AF37]',
      cardGlow: 'hover:border-[#D4AF37]/60 hover:shadow-[0_12px_32px_rgba(6,44,34,0.35)]',
    },
    {
      id: 'relationship-recovery',
      number: '03',
      title: 'Relationship Recovery',
      highlightBadge: 'Gottman Method',
      icon: HeartHandshake,
      description: 'Relationship healing and emotional connection based on principles from Gottman Method Therapy.',
      foundation: 'Emotional Connection & Repair',
      accentColor: 'text-[#D4AF37]',
      cardGlow: 'hover:border-[#D4AF37]/60 hover:shadow-[0_12px_32px_rgba(6,44,34,0.35)]',
    },
    {
      id: 'higher-consciousness',
      number: '04',
      title: 'Higher Consciousness Activation',
      highlightBadge: 'Heartfulness & Ashtanga',
      icon: Sparkles,
      description: 'Practices integrating Heartfulness and Ashtanga Yoga to cultivate deeper awareness, discipline and inner growth.',
      foundation: 'Heart Centered • Yogic Discipline',
      accentColor: 'text-[#D4AF37]',
      cardGlow: 'hover:border-[#D4AF37]/60 hover:shadow-[0_12px_32px_rgba(6,44,34,0.35)]',
    },
    {
      id: 'career-axis',
      number: '05',
      title: 'Career Axis',
      highlightBadge: '1:1 Career Mapping',
      icon: Compass,
      description: 'Personalized career mapping, decision frameworks and 1:1 guidance to navigate transitions, remove confusion and align with your true purpose.',
      foundation: 'Decision Framework & Clarity',
      accentColor: 'text-[#D4AF37]',
      cardGlow: 'hover:border-[#D4AF37]/60 hover:shadow-[0_12px_32px_rgba(6,44,34,0.35)]',
    },
  ];

  const handleCtaClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveView('explore-path');
  };

  return (
    <section 
      id="holistic-wellness-solutions"
      aria-label="Path to Inner Peace Holistic Solutions"
      className={`relative w-full pt-6 pb-2 sm:pt-8 sm:pb-3 text-slate-900 ${className}`}
    >
      <div className="relative max-w-7xl mx-auto space-y-8 sm:space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 sm:py-2 rounded-full bg-emerald-50 border border-emerald-200/80 text-[#0B6B53] text-xs sm:text-sm md:text-base font-extrabold uppercase tracking-wider shadow-xs">
            <Compass className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#0B6B53]" />
            <span>Holistic Wellness & Inner Transformation</span>
          </div>

          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight leading-snug">
            Path to Inner Peace —{' '}
            <span className="text-[#0B6B53] block sm:inline">
              A Holistic Wellness One-Stop Solution
            </span>
          </h2>

          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
            One integrated approach to emotional wellbeing, relationships, mindfulness, higher consciousness and career clarity.
          </p>
        </div>

        {/* 5 Core Solutions Grid (Matched Emerald Green Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 sm:gap-6 items-stretch">
          {coreSolutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <div
                key={solution.id}
                id={`core-solution-${solution.id}`}
                className={`group relative rounded-2xl bg-gradient-to-b from-[#062C22] via-[#083D30] to-[#0A4739] border border-emerald-700/40 hover:border-[#D4AF37]/60 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-md shadow-emerald-950/20 ${solution.cardGlow}`}
              >
                {/* Subtle top index indicator & Icon */}
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5">
                    <div className="w-11 h-11 rounded-xl bg-emerald-950/80 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-inner group-hover:border-[#D4AF37] group-hover:scale-105 transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono font-bold tracking-widest text-[#D4AF37]/80 group-hover:text-[#D4AF37] transition-colors">
                      {solution.number}
                    </span>
                  </div>

                  {/* Title & Badge */}
                  <h3 className="font-heading font-bold text-lg text-white mb-2 group-hover:text-[#D4AF37] transition-colors leading-snug">
                    {solution.title}
                  </h3>

                  <div className="mb-3">
                    <span className="inline-block text-[11px] font-semibold tracking-wide text-[#D4AF37] bg-white/10 border border-[#D4AF37]/30 px-2 py-0.5 rounded-md backdrop-blur-xs">
                      {solution.highlightBadge}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-xs sm:text-[13px] text-stone-200 font-light leading-relaxed">
                    {solution.description}
                  </p>
                </div>

                {/* Grounding Foundation footer */}
                <div className="mt-6 pt-4 border-t border-emerald-700/40 flex items-center gap-1.5 text-[11px] text-emerald-200/90 font-medium">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="truncate">{solution.foundation}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Explore Your Path to Inner Peace CTA Button matching 5-Day Mental Reset style & glowing animation */}
        <div className="text-center pt-1 sm:pt-2">
          <button
            id="btn-explore-path-inner-peace"
            onClick={handleCtaClick}
            className="btn-glowing-gold inline-flex items-center justify-center gap-2.5 px-6 sm:px-10 py-3.5 sm:py-4 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 font-poppins font-bold text-sm sm:text-base rounded-2xl shadow-2xl hover:brightness-110 active:scale-[0.98] transition-all border border-amber-200/60 cursor-pointer group whitespace-nowrap"
          >
            <span className="whitespace-nowrap">Explore Your Path to Inner Peace</span>
            <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
