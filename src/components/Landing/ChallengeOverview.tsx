import React from 'react';
import { useApp } from '../../context/AppContext';
import { DAYS_DATA } from '../../data/mockData';
import { Unlock, Lock, ArrowRight, Clock, Video, CheckCircle2, CalendarDays } from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';

export const ChallengeOverview: React.FC = () => {
  const { 
    user, 
    setIsRegistrationModalOpen, 
    setRegistrationTargetDay,
    setActiveDayNumber,
    setActiveView 
  } = useApp();

  const handleDayAction = (dayNumber: number) => {
    // Day 1
    if (dayNumber === 1) {
      if (!user.registered) {
        setRegistrationTargetDay(1);
        setIsRegistrationModalOpen(true);
      } else {
        setActiveDayNumber(1);
        setActiveView('challenge');
      }
      return;
    }

    // Day 2 to Day 5:
    // Serial progression check: user must be registered and must have completed previous day (e.g., Day 1 for Day 2)
    const isUnlocked = user.registered && user.completedDays.includes(dayNumber - 1);

    if (!isUnlocked) {
      // Trigger popup: Complete Day 1 first with Join 5-day Mental Reset Challenge registration form
      setRegistrationTargetDay(dayNumber);
      setIsRegistrationModalOpen(true);
    } else {
      setActiveDayNumber(dayNumber);
      setActiveView('challenge');
    }
  };

  return (
    <section id="curriculum-section" className="pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FAF9F6] via-white to-[#FAF9F6] border-t border-slate-200/80 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <ScrollReveal variant="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/70 inline-flex items-center gap-1.5 shadow-xs">
              <CalendarDays className="w-3.5 h-3.5 text-[#0B6B53]" />
              LIVE 5-DAY MENTAL RESET
            </span>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-4 tracking-tight">
              The 5-Day Mental Reset Breakdown
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2.5 font-inter">
              30 minutes each day carefully engineered to rewire your nervous system. Complete serially starting with Day 1.
            </p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5 sm:gap-6">
          {DAYS_DATA.map((day) => {
            const isDay1 = day.dayNumber === 1;
            const isCompleted = user.completedDays.includes(day.dayNumber);
            const isUnlocked = isDay1 || (user.registered && user.completedDays.includes(day.dayNumber - 1));

            return (
              <StaggerItem key={day.dayNumber} variant="scale">
                <div
                  onClick={() => handleDayAction(day.dayNumber)}
                  className={`relative rounded-2xl p-5 sm:p-6 border transition-all duration-300 cursor-pointer flex flex-col justify-between h-full group ${
                    isCompleted 
                      ? 'bg-emerald-50/60 border-emerald-300 shadow-xs hover:shadow-lg hover:-translate-y-1' 
                      : isDay1
                      ? 'bg-white border-[#0B6B53]/40 ring-2 ring-[#0B6B53]/10 shadow-md hover:shadow-xl hover:-translate-y-1'
                      : isUnlocked 
                      ? 'bg-white border-slate-200/90 hover:border-[#0B6B53] shadow-xs hover:shadow-lg hover:-translate-y-1' 
                      : 'bg-slate-50/90 border-slate-200 hover:border-amber-400/80 shadow-xs hover:shadow-md'
                  }`}
                >
                  {/* Day Badge Header */}
                  <div>
                    <div className="flex items-center justify-between mb-3.5">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#0B6B53] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/50">
                        DAY {day.dayNumber}
                      </span>
                      
                      {isCompleted ? (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3 text-[#0B6B53]" />
                          Completed
                        </span>
                      ) : isDay1 || isUnlocked ? (
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                          <Unlock className="w-3 h-3 text-[#0B6B53]" />
                          Start Here
                        </span>
                      ) : (
                        <span className="text-[10.5px] font-bold text-amber-800 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-700" />
                          Day 1 Required
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-lg text-slate-900 mb-1 group-hover:text-[#0B6B53] transition-colors leading-snug">
                      {day.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-medium mb-3.5">
                      {day.subtitle}
                    </p>

                    {/* Bullet points */}
                    <ul className="space-y-2 text-xs text-slate-600 border-t border-slate-100 pt-3.5">
                      {day.keyTakeaways.slice(0, 3).map((point, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 leading-relaxed">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0B6B53] shrink-0 mt-1.5"></span>
                          <span className="line-clamp-2">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Metadata & CTA */}
                  <div className="pt-4 mt-5 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-500 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      30 Mins
                    </span>
                    
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDayAction(day.dayNumber);
                      }}
                      className={`font-bold px-3.5 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all text-xs cursor-pointer ${
                        isCompleted
                          ? 'bg-emerald-700 hover:bg-emerald-800 text-white'
                          : isDay1 || isUnlocked
                          ? 'bg-[#0B6B53] hover:bg-[#08523F] text-white shadow-emerald-900/20'
                          : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-900/20'
                      }`}
                    >
                      {!isUnlocked && !isDay1 && <Lock className="w-3 h-3 text-amber-200" />}
                      <span>{isCompleted ? 'Review' : 'Start'}</span>
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

