import React from 'react';
import { useApp } from '../../context/AppContext';
import { ALL_BADGES } from '../../data/mockData';
import { Award, Sun, Flame, Moon, Wind, Heart, Lock, CheckCircle2 } from 'lucide-react';

export const BadgesView: React.FC = () => {
  const { user } = useApp();

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles': return Sun;
      case 'Sun': return Sun;
      case 'Heart': return Heart;
      case 'Award': return Award;
      case 'Flame': return Flame;
      case 'Moon': return Moon;
      case 'Wind': return Wind;
      default: return Award;
    }
  };

  const nextLevelXp = user.level * 300;
  const xpProgress = Math.round((user.xpPoints / nextLevelXp) * 100);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn pb-24">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-[#0B6B53] via-[#134E4A] to-slate-900 rounded-3xl p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/20 px-3 py-1 rounded-full">
            LEVEL {user.level} SEEKER
          </span>
          <h1 className="font-heading font-extrabold text-3xl text-white">
            Your Achievements & Badges
          </h1>
          <p className="text-xs text-emerald-100">
            Earn XP points by completing daily resets, breathwork, and journal entries!
          </p>
        </div>

        {/* Level XP Meter */}
        <div className="bg-[#064E3B]/80 p-5 rounded-2xl border border-emerald-700/50 w-full md:w-64 space-y-2 text-center">
          <div className="flex justify-between text-xs text-emerald-200 font-bold">
            <span>Level {user.level}</span>
            <span>{user.xpPoints} / {nextLevelXp} XP</span>
          </div>
          <div className="w-full h-3 bg-emerald-950 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-400 transition-all duration-500"
              style={{ width: `${Math.min(100, xpProgress)}%` }}
            />
          </div>
          <span className="text-[10px] text-slate-400 block">
            {nextLevelXp - user.xpPoints} XP needed for Level {user.level + 1}
          </span>
        </div>
      </div>

      {/* Badges Grid */}
      <div className="space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-900">
          MindForge Badges ({user.badges.length} / {ALL_BADGES.length} Unlocked)
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_BADGES.map((b) => {
            const unlocked = user.badges.includes(b.id);
            const Icon = getIcon(b.icon);

            return (
              <div
                key={b.id}
                className={`p-6 rounded-3xl border transition-all flex items-start gap-4 ${
                  unlocked
                    ? 'bg-white border-[#D4AF37] shadow-lg ring-2 ring-[#D4AF37]/20'
                    : 'bg-slate-50 border-slate-200 opacity-60'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${
                  unlocked
                    ? 'bg-[#D4AF37]/10 text-[#D4AF37] border-[#D4AF37]'
                    : 'bg-slate-200 text-slate-400 border-slate-300'
                }`}>
                  <Icon className="w-7 h-7" />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      {b.title}
                    </h3>
                    {unlocked ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-slate-400 inline" />
                    )}
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {b.description}
                  </p>
                  <span className={`text-[10px] font-bold uppercase tracking-wider block pt-1 ${
                    unlocked ? 'text-[#0B6B53]' : 'text-slate-400'
                  }`}>
                    {unlocked ? 'UNLOCKED' : 'LOCKED'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
