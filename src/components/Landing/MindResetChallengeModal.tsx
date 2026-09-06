import React from 'react';
import { useApp } from '../../context/AppContext';
import { Calendar, Clock, CheckCircle2, ArrowRight, X, Target, Play } from 'lucide-react';

export const MindResetChallengeModal: React.FC = () => {
  const { isChallengeDetailsModalOpen, setIsChallengeDetailsModalOpen } = useApp();

  if (!isChallengeDetailsModalOpen) return null;

  const handleClose = () => {
    setIsChallengeDetailsModalOpen(false);
  };

  const handleJoinLive = () => {
    const liveUrl = 'https://www.youtube.com/live/u42RK5eV_c8?si=wg7ziJNLQNRu7hID';
    const newWin = window.open(liveUrl, '_blank');
    if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
      window.location.href = liveUrl;
    }
  };

  const learnPoints = [
    'Reduce Stress Naturally',
    'Stop Overthinking',
    'Improve Sleep',
    'Increase Focus',
    'Build Emotional Balance',
    'Reprogram Subconscious Mind',
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/85 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center min-h-full animate-fadeIn">
      <div className="relative w-full max-w-md bg-gradient-to-b from-[#06241C] via-[#051F18] to-[#031510] text-white rounded-3xl shadow-[0_0_50px_rgba(4,35,27,0.8)] overflow-hidden border-2 border-[#D4AF37]/60 max-h-[92vh] flex flex-col my-auto">
        
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-20 cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Scrollable Content Body */}
        <div className="p-5 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto flex-1">
          
          {/* Top Pill Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-400/40 bg-amber-950/30 text-amber-300 text-xs font-semibold shadow-sm">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>FREE 5 Day Mind Reset Challenge</span>
            </div>
          </div>

          {/* Main Headings */}
          <div className="space-y-0.5 font-heading">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              Join FREE
            </h2>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E5B842] tracking-tight leading-tight">
              5 Day Mind Reset
            </h2>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#E5B842] tracking-tight leading-tight">
              Challenge
            </h2>
          </div>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm font-bold tracking-wider text-emerald-400 uppercase">
            TRAIN YOUR MIND. TRANSFORM YOUR LIFE.
          </p>

          {/* Description */}
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed font-normal">
            Join us every morning for 30 minutes of guided mind fitness training using practical breathwork, CBT-based techniques, mindfulness, and daily mind conditioning.
          </p>

          {/* Schedule Card */}
          <div className="bg-[#062c22]/90 border border-emerald-700/50 rounded-2xl p-4 sm:p-5 relative shadow-inner">
            <div className="flex items-start gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-emerald-900/60 border border-emerald-600/30 flex items-center justify-center text-amber-300 shrink-0 mt-0.5">
                <Clock className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-widest text-emerald-300/80 mb-1">
                  SCHEDULE
                </span>
                <div className="flex items-center gap-2 text-white flex-wrap">
                  <div className="flex items-center gap-1.5 font-bold text-sm sm:text-base text-white">
                    <Clock className="w-3.5 h-3.5 text-white" />
                    <span>Every Morning</span>
                  </div>
                  <span className="text-amber-400 font-bold text-lg leading-none">•</span>
                  <span className="font-bold text-white text-base sm:text-lg">6:30 AM</span>
                </div>
                
                {/* YouTube LIVE badge */}
                <div className="mt-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#CC0000] text-white text-xs font-bold rounded-full shadow-md shadow-red-950/40">
                    <span className="w-4 h-3 bg-white rounded-xs flex items-center justify-center shrink-0">
                      <Play className="w-2 h-2 text-[#CC0000] fill-current translate-x-[0.5px]" />
                    </span>
                    <span>YouTube LIVE</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* YOU'LL LEARN Section */}
          <div className="space-y-3 pt-1">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-amber-400 shrink-0" />
              <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300">
                YOU'LL LEARN
              </h4>
            </div>

            <div className="space-y-2.5">
              {learnPoints.map((point) => (
                <div
                  key={point}
                  className="w-full px-4 py-3 bg-[#062c21]/90 border border-emerald-800/60 rounded-xl flex items-center gap-3 text-white text-xs sm:text-sm font-medium hover:border-emerald-600/50 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Glowing Gold CTA Button */}
          <div className="pt-3 sticky bottom-0 bg-gradient-to-t from-[#031510] via-[#031510]/95 to-transparent pb-1">
            <button
              type="button"
              onClick={handleJoinLive}
              className="w-full py-4 px-5 sm:px-6 bg-gradient-to-r from-[#F6D365] via-[#E8B328] to-[#D89E1E] text-slate-950 font-extrabold text-sm sm:text-base rounded-2xl shadow-[0_0_30px_rgba(246,211,101,0.45)] hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-between border border-amber-200/60 cursor-pointer group"
            >
              <span className="flex items-center gap-2 text-left">
                <span className="text-lg">🚀</span>
                <span>Join 5 Day Mind Reset Challenge</span>
              </span>
              <ArrowRight className="w-5 h-5 text-slate-950 font-bold shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
