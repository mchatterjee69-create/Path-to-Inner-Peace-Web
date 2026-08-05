import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { natureAudio } from '../../utils/natureAudio';
import { Wind, Play, Pause, RotateCcw, Volume2, VolumeX, CheckCircle2, Sun } from 'lucide-react';

export const BreathingExercise: React.FC = () => {
  const { addMeditationMinutes, triggerConfetti } = useApp();

  const [selectedMins, setSelectedMins] = useState<3 | 5 | 10>(5);
  const [secondsLeft, setSecondsLeft] = useState(300); // 5 mins default
  const [isRunning, setIsRunning] = useState(false);

  // Box breath phases: Inhale (4s), Hold (4s), Exhale (4s), Hold (4s)
  const [phase, setPhase] = useState<'Inhale' | 'Hold (In)' | 'Exhale' | 'Hold (Out)'>('Inhale');
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Timer effect
  useEffect(() => {
    let timer: any = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      addMeditationMinutes(selectedMins);
      triggerConfetti();
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  // Phase cycle effect (4 seconds per phase)
  useEffect(() => {
    let breathTimer: any = null;
    if (isRunning) {
      if (soundEnabled) {
        natureAudio.start('ocean', 0.5);
      }
      const phases: ('Inhale' | 'Hold (In)' | 'Exhale' | 'Hold (Out)')[] = [
        'Inhale',
        'Hold (In)',
        'Exhale',
        'Hold (Out)'
      ];
      let currentIdx = 0;

      breathTimer = setInterval(() => {
        currentIdx = (currentIdx + 1) % phases.length;
        setPhase(phases[currentIdx]);
      }, 4000);
    } else {
      natureAudio.stop();
    }
    return () => {
      clearInterval(breathTimer);
      natureAudio.stop();
    };
  }, [isRunning, soundEnabled]);

  const handleSelectDuration = (mins: 3 | 5 | 10) => {
    setSelectedMins(mins);
    setSecondsLeft(mins * 60);
    setIsRunning(false);
    setPhase('Inhale');
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(selectedMins * 60);
    setPhase('Inhale');
  };

  const formatTime = (totalSecs: number) => {
    const m = Math.floor(totalSecs / 60);
    const s = totalSecs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn pb-24">
      
      {/* Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          SOMATIC NERVOUS SYSTEM REGULATION
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Somatic Breathwork Trainer
        </h1>
        <p className="text-slate-600 text-sm">
          Activate your vagus nerve with 4-4-4-4 Box Breathing. Select your duration below.
        </p>
      </div>

      {/* Duration Selector Tabs */}
      <div className="flex items-center justify-center gap-3">
        {[3, 5, 10].map((mins) => (
          <button
            key={mins}
            onClick={() => handleSelectDuration(mins as any)}
            className={`px-5 py-2.5 rounded-2xl font-bold text-xs transition-all ${
              selectedMins === mins
                ? 'bg-[#0B6B53] text-white shadow-md scale-105'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            {mins} Minutes
          </button>
        ))}
      </div>

      {/* Main Breathing Stage Card */}
      <div className="bg-gradient-to-b from-slate-900 via-[#134E4A] to-[#0B6B53] rounded-3xl p-8 sm:p-12 text-white shadow-2xl flex flex-col items-center justify-center relative overflow-hidden">
        
        {/* Sound toggle button */}
        <button
          onClick={() => setSoundEnabled(!soundEnabled)}
          className="absolute top-6 right-6 p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          title="Toggle Sound FX"
        >
          {soundEnabled ? <Volume2 className="w-5 h-5 text-[#D4AF37]" /> : <VolumeX className="w-5 h-5 text-slate-400" />}
        </button>

        {/* Breathing Animation Canvas Container */}
        <div className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 my-6">
          
          {/* Animated Expanding Aura */}
          <div 
            className={`absolute inset-0 rounded-full bg-[#D4AF37]/30 border-2 border-[#D4AF37] transition-all duration-[4000ms] ${
              isRunning && (phase === 'Inhale' || phase === 'Hold (In)')
                ? 'scale-100 opacity-90'
                : 'scale-50 opacity-20'
            }`}
          />

          <div 
            className={`absolute inset-4 rounded-full bg-emerald-500/20 border border-emerald-400/40 transition-all duration-[4000ms] ${
              isRunning && (phase === 'Inhale' || phase === 'Hold (In)')
                ? 'scale-100 opacity-80'
                : 'scale-60 opacity-30'
            }`}
          />

          {/* Core Interactive Center */}
          <div 
            className={`w-40 h-40 sm:w-48 sm:h-48 rounded-full bg-slate-900/90 border-2 border-[#D4AF37] flex flex-col items-center justify-center text-center shadow-2xl transition-all duration-[4000ms] ${
              isRunning && (phase === 'Inhale' || phase === 'Hold (In)')
                ? 'scale-110 border-amber-300 shadow-amber-500/30'
                : 'scale-90 border-[#D4AF37]/50'
            }`}
          >
            <span className="font-heading font-extrabold text-2xl text-[#D4AF37] tracking-wider block">
              {isRunning ? phase : 'Ready'}
            </span>
            <span className="font-mono text-sm text-emerald-200 mt-1 block">
              {formatTime(secondsLeft)}
            </span>
          </div>

        </div>

        {/* Instructions Guide */}
        <div className="text-center space-y-1 mb-8 max-w-sm">
          <p className="text-xs font-semibold text-emerald-200">
            {phase === 'Inhale' && 'Slowly fill your lungs with fresh air (4s)'}
            {phase === 'Hold (In)' && 'Hold gently at the top without straining (4s)'}
            {phase === 'Exhale' && 'Smoothly release all air and tension (4s)'}
            {phase === 'Hold (Out)' && 'Pause calmly at empty (4s)'}
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className="px-8 py-3.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-extrabold text-sm rounded-2xl shadow-xl hover:brightness-110 active:scale-95 transition-all flex items-center gap-2"
          >
            {isRunning ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950" />}
            <span>{isRunning ? 'Pause Exercise' : 'Start Breathing'}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-3.5 bg-white/10 hover:bg-white/20 text-white rounded-2xl border border-white/20 transition-all"
            title="Reset Timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

      </div>

    </div>
  );
};
