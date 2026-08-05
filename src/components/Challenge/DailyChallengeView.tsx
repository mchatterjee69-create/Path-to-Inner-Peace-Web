import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DAYS_DATA } from '../../data/mockData';
import { natureAudio } from '../../utils/natureAudio';
import { 
  Play, 
  Pause, 
  CheckCircle2, 
  Sun, 
  Wind, 
  Headphones, 
  BookOpen, 
  Copy, 
  Check, 
  Lock, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  Volume2,
  VolumeX,
  RotateCcw
} from 'lucide-react';

export const DailyChallengeView: React.FC = () => {
  const { 
    activeDayNumber, 
    setActiveDayNumber, 
    user, 
    completeDay, 
    saveJournalEntry, 
    addMoodLog, 
    triggerConfetti 
  } = useApp();

  const dayData = DAYS_DATA.find(d => d.dayNumber === activeDayNumber) || DAYS_DATA[0];

  // 30-minute session countdown timer state
  const [timerSeconds, setTimerSeconds] = useState(1800); // 30 mins
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Breathing circle state
  const [breathPhase, setBreathPhase] = useState<'Inhale' | 'Hold' | 'Exhale' | 'Pause'>('Inhale');
  const [isBreathingActive, setIsBreathingActive] = useState(false);

  // Meditation audio state
  const [isMeditationPlaying, setIsMeditationPlaying] = useState(false);
  const [meditationTime, setMeditationTime] = useState(0);
  const [ambientSound, setAmbientSound] = useState<'rain' | 'ocean' | 'forest' | 'birds'>(dayData.meditationTrack.ambientSound);

  // Sync ambient sound and reset meditation audio state when changing days
  useEffect(() => {
    setAmbientSound(dayData.meditationTrack.ambientSound);
    setIsMeditationPlaying(false);
    setMeditationTime(0);
  }, [activeDayNumber]);

  // Journal responses state
  const [journalAnswers, setJournalAnswers] = useState<Record<string, string>>({});
  const [journalSaved, setJournalSaved] = useState(false);

  // Mood selection state
  const [selectedMood, setSelectedMood] = useState<'😁' | '😌' | '😐' | '😔' | '😢'>('😌');

  // Copy affirmation state
  const [copied, setCopied] = useState(false);

  // Session timer countdown effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  // Breathing loop effect (4s inhale, 4s hold, 4s exhale, 4s pause)
  useEffect(() => {
    let breathInterval: any = null;
    if (isBreathingActive) {
      const phases: ('Inhale' | 'Hold' | 'Exhale' | 'Pause')[] = ['Inhale', 'Hold', 'Exhale', 'Pause'];
      let currentIdx = 0;

      breathInterval = setInterval(() => {
        currentIdx = (currentIdx + 1) % phases.length;
        setBreathPhase(phases[currentIdx]);
      }, 4000);
    }
    return () => clearInterval(breathInterval);
  }, [isBreathingActive]);

  // Meditation timer & real Web Audio nature soundscape effect
  useEffect(() => {
    let medInterval: any = null;
    if (isMeditationPlaying) {
      // Start nature soundscape & audio guidance tailored specifically for this day
      natureAudio.start(ambientSound, 0.8, dayData.dayNumber);
      natureAudio.speakGuidedInstruction(
        `Welcome to Day ${dayData.dayNumber} guided meditation: ${dayData.meditationTrack.title}. Take a deep breath, relax your body, and allow the ambient nature soundscape to settle your mind.`
      );

      medInterval = setInterval(() => {
        setMeditationTime(prev => prev + 1);
      }, 1000);
    } else {
      natureAudio.stop();
      natureAudio.stopGuidedInstruction();
    }
    return () => {
      clearInterval(medInterval);
      natureAudio.stop();
      natureAudio.stopGuidedInstruction();
    };
  }, [isMeditationPlaying, ambientSound, activeDayNumber, dayData.dayNumber]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCopyAffirmation = () => {
    navigator.clipboard.writeText(dayData.affirmation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveJournal = () => {
    saveJournalEntry({
      id: Date.now().toString(),
      dayNumber: activeDayNumber,
      date: new Date().toISOString().split('T')[0],
      responses: journalAnswers,
      feelingToday: selectedMood,
      gratitude: journalAnswers['2'] || '',
      learnings: journalAnswers['0'] || ''
    });

    addMoodLog({
      date: new Date().toISOString().split('T')[0],
      dayOfWeek: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
      moodEmoji: selectedMood,
      moodLabel: selectedMood === '😁' ? 'Joyful' : selectedMood === '😌' ? 'Calm' : selectedMood === '😐' ? 'Neutral' : selectedMood === '😔' ? 'Sad' : 'Distressed'
    });

    setJournalSaved(true);
    triggerConfetti();
  };

  const handleCompleteDay = () => {
    completeDay(activeDayNumber);
  };

  const isCompleted = user.completedDays.includes(activeDayNumber);

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn pb-24">
      
      {/* Day Selector Navigation Pills */}
      <div className="flex items-center justify-between bg-white p-2 rounded-2xl border border-slate-200 shadow-sm overflow-x-auto">
        <div className="flex items-center gap-1 sm:gap-2">
          {DAYS_DATA.map((d) => {
            const done = user.completedDays.includes(d.dayNumber);
            const active = d.dayNumber === activeDayNumber;
            return (
              <button
                key={d.dayNumber}
                onClick={() => setActiveDayNumber(d.dayNumber)}
                className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  active 
                    ? 'bg-[#0B6B53] text-white shadow-sm' 
                    : done 
                    ? 'bg-emerald-50 text-[#0B6B53] hover:bg-emerald-100' 
                    : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                }`}
              >
                <span>Day {d.dayNumber}</span>
                {done && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 inline" />}
              </button>
            );
          })}
        </div>

        <div className="hidden sm:flex items-center gap-2 px-3 text-xs text-slate-500 font-semibold">
          <span>Target: 30 Mins</span>
        </div>
      </div>

      {/* Day Header & Main Title */}
      <div className="bg-gradient-to-r from-[#0B6B53] via-[#134E4A] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-emerald-800/80 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/20 px-3 py-1 rounded-full border border-[#D4AF37]/30">
              DAY {dayData.dayNumber} OF 5
            </span>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mt-2">
              {dayData.title}
            </h1>
            <p className="text-xs sm:text-sm text-emerald-100 mt-0.5">
              {dayData.subtitle}
            </p>
          </div>

          {/* 30-Minute Timer Widget */}
          <div className="bg-[#064E3B] p-4 rounded-2xl border border-emerald-700/50 text-center shrink-0">
            <span className="text-[10px] uppercase font-bold text-emerald-300 block">
              Session Countdown
            </span>
            <span className="font-mono font-extrabold text-2xl text-white block mt-0.5">
              {formatTime(timerSeconds)}
            </span>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="mt-2 text-[11px] font-bold text-[#D4AF37] hover:underline"
            >
              {isTimerRunning ? 'Pause Timer' : 'Start Timer'}
            </button>
          </div>
        </div>

        {/* Day Summary */}
        <p className="text-xs sm:text-sm text-emerald-50 leading-relaxed">
          {dayData.summary}
        </p>
      </div>

      {/* SECTION 1: ANIMATED BREATHING EXERCISE */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-50 text-[#0B6B53] rounded-xl">
            <Wind className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900">
              Step 1: 5-Minute Calming Box Breath
            </h2>
            <p className="text-xs text-slate-500">
              Inhale for 4s, Hold for 4s, Exhale for 4s, Pause for 4s
            </p>
          </div>
        </div>

        {/* Breathing Circle Visualization */}
        <div className="flex flex-col items-center justify-center py-8 bg-slate-50 rounded-2xl border border-slate-200/80 relative overflow-hidden">
          
          <div className="relative flex items-center justify-center w-48 h-48 sm:w-56 sm:h-56">
            {/* Outer expanding ring */}
            <div 
              className={`absolute inset-0 rounded-full bg-[#0B6B53]/20 border-2 border-[#0B6B53] transition-all duration-[4000ms] ${
                isBreathingActive && (breathPhase === 'Inhale' || breathPhase === 'Hold')
                  ? 'scale-100 opacity-100'
                  : 'scale-50 opacity-40'
              }`}
            />

            {/* Inner pulsating core */}
            <div 
              className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full bg-gradient-to-tr from-[#0B6B53] to-[#134E4A] flex flex-col items-center justify-center text-white shadow-xl transition-all duration-[4000ms] ${
                isBreathingActive && (breathPhase === 'Inhale' || breathPhase === 'Hold')
                  ? 'scale-110 shadow-emerald-900/30'
                  : 'scale-90 shadow-none'
              }`}
            >
              <span className="font-heading font-bold text-lg text-[#D4AF37]">
                {isBreathingActive ? breathPhase : 'Ready'}
              </span>
              <span className="text-[10px] text-emerald-100 mt-0.5">
                {isBreathingActive ? '4 Seconds' : 'Click Start'}
              </span>
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={() => setIsBreathingActive(!isBreathingActive)}
              className="px-6 py-2.5 bg-[#0B6B53] hover:bg-[#134E4A] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              {isBreathingActive ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
              <span>{isBreathingActive ? 'Pause Breath' : 'Start Breathing Guide'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* SECTION 2: MEDITATION AUDIO PLAYER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-emerald-50 text-[#0B6B53] rounded-xl">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-bold text-xl text-slate-900">
                Step 2: Day {dayData.dayNumber} {dayData.title} Meditation ({dayData.meditationTrack.soundName})
              </h2>
              <p className="text-xs text-slate-600 font-medium mt-0.5">
                {dayData.meditationTrack.title} — <span className="text-[#0B6B53] font-semibold">{dayData.meditationTrack.subtitle}</span>
              </p>
            </div>
          </div>

          <span className="text-xs font-bold bg-emerald-50 text-[#0B6B53] px-3 py-1 rounded-full border border-emerald-100">
            {dayData.meditationTrack.duration}
          </span>
        </div>

        {/* Ambient Player Controls */}
        <div className="p-6 bg-gradient-to-r from-[#064E3B] to-[#0B6B53] rounded-2xl text-white space-y-4 shadow-lg border border-emerald-700/50">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold text-[#D4AF37]">
                  Active Track Profile
                </span>
                {dayData.meditationTrack.genre && (
                  <span className="text-[10px] font-extrabold bg-[#D4AF37]/20 text-[#D4AF37] px-2 py-0.5 rounded-full border border-[#D4AF37]/30">
                    🎵 {dayData.meditationTrack.genre}
                  </span>
                )}
              </div>
              <h3 className="font-heading font-bold text-lg text-white mt-0.5">
                {dayData.meditationTrack.title}
              </h3>
              {dayData.meditationTrack.audioDescription && (
                <p className="text-xs text-emerald-100/90 mt-1 max-w-xl font-normal leading-relaxed">
                  {dayData.meditationTrack.audioDescription}
                </p>
              )}
            </div>

            {/* Nature Sound selector */}
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400 font-semibold">Soundscape:</span>
              <select
                value={ambientSound}
                onChange={(e) => setAmbientSound(e.target.value as any)}
                className="bg-slate-800 text-white border border-slate-700 rounded-lg px-2.5 py-1 text-xs focus:outline-none"
              >
                <option value="rain">🌧️ Gentle Rain</option>
                <option value="ocean">🌊 Deep Ocean Waves</option>
                <option value="forest">🌲 Forest Solitude</option>
                <option value="birds">🐦 Morning Birds</option>
              </select>
            </div>
          </div>

          {/* Audio Play/Pause & Progress */}
          <div className="flex items-center gap-4 pt-2">
            <button
              onClick={() => setIsMeditationPlaying(!isMeditationPlaying)}
              className="w-12 h-12 rounded-full bg-[#D4AF37] hover:bg-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-md transition-all shrink-0"
            >
              {isMeditationPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950 ml-0.5" />}
            </button>

            <div className="flex-1 space-y-1">
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-[#D4AF37] to-amber-400 transition-all duration-1000"
                  style={{ width: `${Math.min(100, (meditationTime / 600) * 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                <span>{formatTime(meditationTime)}</span>
                <span>{dayData.meditationTrack.duration}</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* SECTION 3: DAILY LESSON CONTENT */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-heading font-bold text-xl text-slate-900 border-b border-slate-100 pb-3">
          Step 3: Core Teaching by Mainak Chatterjee
        </h2>
        <div className="prose prose-slate text-sm text-slate-700 leading-relaxed whitespace-pre-line bg-slate-50 p-5 rounded-2xl border border-slate-200">
          {dayData.lessonContent}
        </div>
      </div>

      {/* SECTION 4: JOURNAL REFLECTION & MOOD TRACKER */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <div className="p-2.5 bg-amber-50 text-amber-800 rounded-xl">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h2 className="font-heading font-bold text-xl text-slate-900">
              Step 4: Daily Reflection & Mood Tracker
            </h2>
            <p className="text-xs text-slate-500">
              Anchor your learnings into long-term mental awareness.
            </p>
          </div>
        </div>

        {/* Mood Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            How do you feel today after this session?
          </label>
          <div className="flex items-center gap-3">
            {(['😁', '😌', '😐', '😔', '😢'] as const).map((emoji) => (
              <button
                key={emoji}
                onClick={() => setSelectedMood(emoji)}
                className={`w-12 h-12 rounded-2xl text-2xl flex items-center justify-center transition-all ${
                  selectedMood === emoji 
                    ? 'bg-emerald-100 border-2 border-[#0B6B53] scale-110 shadow-sm' 
                    : 'bg-slate-50 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>

        {/* Prompts */}
        <div className="space-y-4">
          {dayData.journalPrompts.map((prompt, idx) => (
            <div key={idx} className="space-y-1">
              <label className="block text-xs font-semibold text-slate-800">
                {idx + 1}. {prompt}
              </label>
              <textarea
                rows={2}
                placeholder="Write your honest reflection here..."
                value={journalAnswers[idx] || ''}
                onChange={(e) => setJournalAnswers({ ...journalAnswers, [idx]: e.target.value })}
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:bg-white transition-all"
              />
            </div>
          ))}

          <button
            onClick={handleSaveJournal}
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>{journalSaved ? 'Journal Saved! (+50 XP)' : 'Save Journal Reflection'}</span>
          </button>
        </div>
      </div>

      {/* SECTION 5: DAILY AFFIRMATION CARD */}
      <div className="bg-gradient-to-r from-emerald-900 to-[#134E4A] p-6 sm:p-8 rounded-3xl text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/20 px-3 py-1 rounded-full">
            DAILY MENTAL AFFIRMATION
          </span>
          <p className="font-heading font-extrabold text-lg sm:text-xl text-white italic">
            "{dayData.affirmation}"
          </p>
        </div>

        <button
          onClick={handleCopyAffirmation}
          className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center gap-2 shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? 'Copied!' : 'Copy Affirmation'}</span>
        </button>
      </div>

      {/* FINAL STEP: COMPLETE DAY & CELEBRATE */}
      <div className="bg-[#064E3B] p-8 rounded-3xl text-center space-y-4 border border-emerald-800 shadow-xl">
        <h3 className="font-heading font-extrabold text-2xl text-white">
          Ready to Mark Day {activeDayNumber} Complete?
        </h3>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Click below to earn +150 XP, increase your streak, and automatically unlock the next day’s session!
        </p>

        <button
          onClick={handleCompleteDay}
          className={`px-10 py-4 font-extrabold text-base rounded-2xl shadow-xl transition-all ${
            isCompleted 
              ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
              : 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-yellow-500 text-slate-950 hover:brightness-110 hover:scale-[1.02]'
          }`}
        >
          {isCompleted ? '✓ Day Completed! Re-Celebrate' : `🎉 Mark Day ${activeDayNumber} Complete & Unlock Day ${Math.min(5, activeDayNumber + 1)}`}
        </button>
      </div>

    </div>
  );
};
