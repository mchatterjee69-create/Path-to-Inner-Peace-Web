import React from 'react';
import { 
  HeartPulse, 
  Compass, 
  Moon, 
  Heart, 
  Lightbulb, 
  Zap, 
  Sun, 
  Wind, 
  Headphones, 
  Brain, 
  Activity
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: 'Reduce Stress',
      description: 'Lower cortisol levels through targeted vagus nerve stimulation.',
      icon: HeartPulse,
      color: 'bg-emerald-50 text-[#0B6B53] border-emerald-200'
    },
    {
      title: 'Calm Overthinking',
      description: 'Break anxious thought loops using cognitive re-framing techniques.',
      icon: Compass,
      color: 'bg-amber-50 text-amber-700 border-amber-200'
    },
    {
      title: 'Better Sleep',
      description: 'Unwind your mind before bedtime with deep restorative soundscapes.',
      icon: Moon,
      color: 'bg-indigo-50 text-indigo-700 border-indigo-200'
    },
    {
      title: 'Emotional Healing',
      description: 'Release past grievances and cultivate radical self-compassion.',
      icon: Heart,
      color: 'bg-rose-50 text-rose-700 border-rose-200'
    },
    {
      title: 'Mental Clarity',
      description: 'Eliminate brain fog and gain sharp focus for work and daily decisions.',
      icon: Lightbulb,
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      title: 'Confidence Reset',
      description: 'Overcome imposter syndrome and step boldly into your core worth.',
      icon: Zap,
      color: 'bg-yellow-50 text-yellow-800 border-yellow-200'
    },
    {
      title: 'Mindfulness',
      description: 'Cultivate non-judgmental present-moment awareness every day.',
      icon: Sun,
      color: 'bg-emerald-50 text-[#0B6B53] border-emerald-200'
    },
    {
      title: 'Breathing Exercises',
      description: 'Master 3-10 minute Box Breathing and Calming Breath patterns.',
      icon: Wind,
      color: 'bg-cyan-50 text-cyan-700 border-cyan-200'
    },
    {
      title: 'Guided Meditation',
      description: 'Immerse in daily audio tracks accompanied by nature soundscapes.',
      icon: Headphones,
      color: 'bg-purple-50 text-purple-700 border-purple-200'
    },
    {
      title: 'Healthy Habits',
      description: 'Build an unbroken streak of 10-minute daily mental reset rituals.',
      icon: Activity,
      color: 'bg-[#134E4A]/10 text-[#134E4A] border-emerald-300'
    },
    {
      title: 'Subconscious Mastery',
      description: 'Rewire limiting mental programs and anchor deep subconscious calm.',
      icon: Brain,
      color: 'bg-amber-50 text-amber-800 border-amber-200'
    }
  ];

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-50/60 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto">
        
        <ScrollReveal variant="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/70 inline-flex items-center gap-1.5 shadow-xs">
              <HeartPulse className="w-3.5 h-3.5 text-[#0B6B53]" />
              HOLISTIC MENTAL TRANSFORMATION
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-4 tracking-tight">
              Comprehensive Benefits of Your 5-Day Reset
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              Every session combines modern psychology, CBT techniques, and psycho-spiritual wisdom to deliver profound, measurable shifts in your well-being.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <StaggerItem key={idx} variant="scale">
                <div className="p-6 rounded-2xl bg-[#FAF9F6] border border-slate-200/90 hover:bg-white hover:border-[#0B6B53]/40 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${b.color} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-xs`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 mb-2 group-hover:text-[#0B6B53] transition-colors">
                      {b.title}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed font-inter">
                      {b.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-2 border-t border-slate-100/80 flex items-center gap-1 text-[11px] font-semibold text-[#0B6B53] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Evidence-Backed Protocol</span>
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
