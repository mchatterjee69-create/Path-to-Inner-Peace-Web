import React from 'react';
import { useApp } from '../../context/AppContext';
import { DAYS_DATA } from '../../data/mockData';
import { Unlock, ArrowRight, Clock, Video } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';

export const ChallengeOverview: React.FC = () => {
  const { user, setIsRegistrationModalOpen } = useApp();

  const handleAction = () => {
    if (!user.registered) {
      setIsRegistrationModalOpen(true);
    } else {
      const liveUrl = 'https://www.youtube.com/live/u42RK5eV_c8?si=wg7ziJNLQNRu7hID';
      const newWin = window.open(liveUrl, '_blank');
      if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
        window.location.href = liveUrl;
      }
    }
  };

  return (
    <section id="curriculum-section" className="pt-20 pb-12 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <ScrollReveal variant="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-100 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
              <Video className="w-3.5 h-3.5 text-[#0B6B53]" />
              LIVE 5-DAY MENTAL RESET
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
              The 5-Day Mental Reset Breakdown
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              30 minutes each day carefully engineered to rewire your nervous system. Register to attend the live challenge sessions.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {DAYS_DATA.map((day) => {
            return (
              <StaggerItem key={day.dayNumber} variant="scale">
                <div
                  onClick={handleAction}
                  className="relative rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between h-full bg-white border-slate-200 hover:border-[#0B6B53] hover:shadow-md group"
                >
                  {/* Day Badge Header */}
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B6B53]">
                        DAY {day.dayNumber}
                      </span>
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Unlock className="w-3 h-3 text-[#0B6B53]" />
                        Unlock Now
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-slate-900 mb-1 group-hover:text-[#0B6B53] transition-colors">
                      {day.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-3">
                      {day.subtitle}
                    </p>

                    {/* Bullet points */}
                    <ul className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                      {day.keyTakeaways.slice(0, 3).map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-1.5">
                          <span className="text-[#0B6B53] font-bold">•</span>
                          <span className="line-clamp-2">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Metadata & CTA */}
                  <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      30 Mins
                    </span>
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAction();
                      }}
                      className="text-white bg-[#0B6B53] hover:bg-emerald-800 font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 shadow-sm transition-all text-xs"
                    >
                      Start
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
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

