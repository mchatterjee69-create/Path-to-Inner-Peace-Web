import React from 'react';
import { 
  UserPlus, 
  MessageSquare, 
  PlayCircle, 
  Compass, 
  Award, 
  Crown, 
  ArrowDown 
} from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: 'Step 1',
      title: 'Register Free',
      description: 'Sign up in 30 seconds with your WhatsApp number & email.',
      icon: UserPlus,
      color: 'bg-emerald-50 text-[#0B6B53] border-emerald-200'
    },
    {
      step: 'Step 2',
      title: 'Receive WhatsApp Confirmation',
      description: 'Instant welcome & daily challenge reminder alerts delivered straight to your phone.',
      icon: MessageSquare,
      color: 'bg-teal-50 text-teal-700 border-teal-200'
    },
    {
      step: 'Step 3',
      title: 'Attend Daily 30-Minute Sessions',
      description: 'Engage with guided breathwork, CBT audio lessons, and meditation soundscapes.',
      icon: PlayCircle,
      color: 'bg-emerald-50 text-[#0B6B53] border-emerald-200'
    },
    {
      step: 'Step 4',
      title: 'Practice Daily Exercises',
      description: 'Complete daily journal reflections, mood logs, and affirmations in your dashboard.',
      icon: Compass,
      color: 'bg-amber-50 text-amber-800 border-amber-200'
    },
    {
      step: 'Step 5',
      title: 'Complete Challenge',
      description: 'Finish all 5 days to unlock your verifiable Certificate of Completion!',
      icon: Award,
      color: 'bg-yellow-50 text-yellow-800 border-yellow-200'
    },
    {
      step: 'Bonus',
      title: 'Unlock MindForge 360°™',
      description: 'Gain access to advanced masterclasses, live coaching, and 50+ guided meditations.',
      icon: Crown,
      color: 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 border-[#D4AF37]'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#093d30] text-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        
        <ScrollReveal variant="slide-up">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-white/10 px-3 py-1 rounded-full border border-white/10">
              SIMPLE 5-DAY ROADMAP
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-white mt-3 tracking-tight">
              How The 5-Day Mental Reset Works
            </h2>
            <p className="text-slate-300 text-sm mt-2">
              A frictionless, step-by-step transformation path designed for your busy routine.
            </p>
          </div>
        </ScrollReveal>

        {/* Timeline Grid / Stack */}
        <div className="relative max-w-4xl mx-auto space-y-6">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isLast = idx === steps.length - 1;

            return (
              <React.Fragment key={idx}>
                <ScrollReveal variant={idx % 2 === 0 ? 'slide-right' : 'slide-left'} delay={0.05}>
                  <div className="bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 border border-slate-700/80 hover:border-[#D4AF37]/50 transition-all flex flex-col sm:flex-row items-start sm:items-center gap-5 shadow-lg group">
                    
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${item.color} shadow-md group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#D4AF37]">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="font-heading font-bold text-lg text-white">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                  </div>
                </ScrollReveal>

                {!isLast && (
                  <div className="flex justify-center py-1">
                    <div className="p-1.5 rounded-full bg-slate-800 border border-slate-700 text-[#D4AF37] animate-bounce">
                      <ArrowDown className="w-4 h-4" />
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
