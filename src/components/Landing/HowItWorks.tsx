import React from 'react';
import { 
  UserPlus, 
  MessageSquare, 
  PlayCircle, 
  Compass, 
  Award, 
  Crown, 
  ArrowDown,
  Sparkles
} from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      num: '01',
      step: 'Step 1',
      title: 'Register Free',
      description: 'Sign up in 30 seconds with your WhatsApp number & email.',
      icon: UserPlus,
      color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
    },
    {
      num: '02',
      step: 'Step 2',
      title: 'Receive WhatsApp Confirmation',
      description: 'Instant welcome & daily challenge reminder alerts delivered straight to your phone.',
      icon: MessageSquare,
      color: 'bg-teal-500/10 text-teal-300 border-teal-500/30'
    },
    {
      num: '03',
      step: 'Step 3',
      title: 'Attend Daily 30-Minute Sessions',
      description: 'Engage with guided breathwork, CBT audio lessons, and meditation soundscapes.',
      icon: PlayCircle,
      color: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30'
    },
    {
      num: '04',
      step: 'Step 4',
      title: 'Practice Daily Exercises',
      description: 'Complete daily journal reflections, mood logs, and affirmations in your dashboard.',
      icon: Compass,
      color: 'bg-amber-500/10 text-amber-300 border-amber-500/30'
    },
    {
      num: '05',
      step: 'Step 5',
      title: 'Complete Challenge',
      description: 'Finish all 5 days to unlock your verifiable Certificate of Completion!',
      icon: Award,
      color: 'bg-[#D4AF37]/15 text-[#D4AF37] border-[#D4AF37]/40'
    },
    {
      num: '★',
      step: 'Bonus',
      title: 'Unlock MindForge 360°™',
      description: 'Gain access to advanced masterclasses, live coaching, and 50+ guided meditations.',
      icon: Crown,
      color: 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 border-[#D4AF37]'
    }
  ];

  return (
    <section className="py-20 sm:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#062C22] via-[#083D30] to-[#0A4739] text-white relative overflow-hidden">
      
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto">
        
        <ScrollReveal variant="slide-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-4 py-1.5 rounded-full border border-white/15 inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              SIMPLE 5-DAY ROADMAP
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-4 tracking-tight">
              How The 5-Day Mental Reset Works
            </h2>
            <p className="text-emerald-100/80 text-sm sm:text-base mt-2.5 font-inter">
              A frictionless, step-by-step transformation path designed for your busy routine.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Stack */}
        <div className="relative max-w-4xl mx-auto space-y-4 sm:space-y-5">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === steps.length - 1;

            return (
              <React.Fragment key={idx}>
                <ScrollReveal variant={idx % 2 === 0 ? 'slide-right' : 'slide-left'} delay={0.05 * idx}>
                  <div className="bg-emerald-950/60 backdrop-blur-md rounded-2xl p-5 sm:p-6 border border-emerald-500/20 hover:border-[#D4AF37]/50 hover:bg-emerald-950/80 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg group">
                    
                    {/* Step badge & Icon */}
                    <div className="flex items-center gap-4 shrink-0">
                      <div className={`w-13 h-13 sm:w-14 sm:h-14 rounded-2xl flex items-center justify-center shrink-0 border ${item.color} shadow-md group-hover:scale-105 transition-transform`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                      </div>
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 px-2 py-0.5 rounded border border-[#D4AF37]/20">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-amber-100 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-emerald-100/80 mt-1 leading-relaxed font-inter">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </ScrollReveal>

                {!isLast && (
                  <div className="flex justify-center py-0.5">
                    <div className="p-1 rounded-full bg-emerald-900/60 border border-emerald-700/60 text-[#D4AF37] animate-bounce">
                      <ArrowDown className="w-3.5 h-3.5" />
                    </div>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
};
