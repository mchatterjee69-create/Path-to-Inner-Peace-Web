import React from 'react';
import { useApp } from '../../context/AppContext';
import { DAYS_DATA } from '../../data/mockData';
import { CheckCircle2, Lock, ArrowRight, Flame, Clock, Headphones } from 'lucide-react';

export const ChallengeOverview: React.FC = () => {
  const { user, setActiveView, setActiveDayNumber } = useApp();

  return (
    <section id="curriculum-section" className="pt-20 pb-8 px-4 sm:px-6 lg:px-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-100 px-3 py-1 rounded-full">
            5-DAY CURRICULUM
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
            The 5-Day Mental Reset Breakdown
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            30 minutes each day carefully engineered to rewire your nervous system and cultivate lasting calm.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {DAYS_DATA.map((day) => {
            const isCompleted = user.completedDays.includes(day.dayNumber);
            const isCurrent = user.currentDay === day.dayNumber;
            const isLocked = day.dayNumber > user.currentDay && !user.completedDays.includes(day.dayNumber);

            return (
              <div
                key={day.dayNumber}
                onClick={() => {
                  setActiveDayNumber(day.dayNumber);
                  setActiveView('challenge');
                }}
                className={`relative rounded-2xl p-5 border transition-all cursor-pointer flex flex-col justify-between ${
                  isCompleted 
                    ? 'bg-emerald-50/80 border-emerald-300 shadow-sm' 
                    : isCurrent 
                    ? 'bg-white border-[#0B6B53] shadow-lg ring-2 ring-[#0B6B53]/20 scale-[1.02]' 
                    : 'bg-white border-slate-200 hover:border-slate-300 opacity-90'
                }`}
              >
                {/* Day Badge Header */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#0B6B53]">
                      DAY {day.dayNumber}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        Done
                      </span>
                    ) : isCurrent ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-amber-900 bg-amber-100 px-2 py-0.5 rounded-full">
                        <Flame className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
                        Active Today
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Locked
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-900 mb-1">
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
                  
                  <span className="text-[#0B6B53] font-bold flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
                    Start
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
