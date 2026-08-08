import React from 'react';
import { WellnessVideoPlayer } from './WellnessVideoPlayer';
import { Sparkles, Heart } from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const BreathingExercise: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-6 px-4 sm:px-6 lg:px-8 space-y-6 animate-fadeIn pb-24">
      
      {/* Top Header Bar */}
      <ScrollReveal variant="slide-down">
        <div className="bg-gradient-to-r from-[#0F4C45] via-[#134E4A] to-slate-900 text-white p-6 rounded-3xl shadow-xl border border-emerald-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>5-MINUTE SOMATIC REGULATION VIDEO</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-2">
              Somatic Orientation & Breathwork
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-2xl">
              Guided 3D animated somatic video designed to quiet fight-or-flight anxiety, release physical tension, and reset parasympathetic nervous system tone.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-950/60 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 shrink-0">
            <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
              <Heart className="w-5 h-5 text-emerald-400 animate-pulse" />
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">NERVOUS SYSTEM STATE</div>
              <div className="text-xs font-extrabold text-amber-300">PARASYMPATHETIC RESET</div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Somatic Video Player */}
      <ScrollReveal variant="slide-up" delay={0.1}>
        <WellnessVideoPlayer />
      </ScrollReveal>

    </div>
  );
};

