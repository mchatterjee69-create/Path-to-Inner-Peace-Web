import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { DAYS_DATA } from '../../data/mockData';
import { natureAudio } from '../../utils/natureAudio';
import { 
  Play, 
  Pause, 
  FastForward, 
  RotateCcw, 
  Volume2, 
  Moon, 
  CloudRain, 
  Waves, 
  Trees, 
  Bird,
  Clock,
  Sun
} from 'lucide-react';

export const MeditationPlayer: React.FC = () => {
  const { addMeditationMinutes } = useApp();

  const [selectedTrackIndex, setSelectedTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSecs, setElapsedSecs] = useState(0);
  const [selectedSoundscape, setSelectedSoundscape] = useState<'rain' | 'ocean' | 'forest' | 'birds'>('rain');
  const [volume, setVolume] = useState(80);
  const [sleepMode, setSleepMode] = useState(false);
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number | null>(null);

  const activeTrack = DAYS_DATA[selectedTrackIndex] || DAYS_DATA[0];

  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      natureAudio.start(selectedSoundscape, volume / 100, activeTrack.dayNumber);
      natureAudio.speakGuidedInstruction(
        `Guided Meditation: ${activeTrack.meditationTrack.title}. ${activeTrack.affirmation}`
      );
      interval = setInterval(() => {
        setElapsedSecs(prev => prev + 1);
      }, 1000);
    } else {
      natureAudio.stop();
      natureAudio.stopGuidedInstruction();
    }
    return () => {
      clearInterval(interval);
      natureAudio.stop();
      natureAudio.stopGuidedInstruction();
    };
  }, [isPlaying, selectedSoundscape, selectedTrackIndex, activeTrack.dayNumber]);

  useEffect(() => {
    natureAudio.setVolume(volume / 100);
  }, [volume]);

  useEffect(() => {
    if (sleepTimerMinutes && elapsedSecs >= sleepTimerMinutes * 60) {
      setIsPlaying(false);
      addMeditationMinutes(Math.floor(elapsedSecs / 60));
      setSleepTimerMinutes(null);
    }
  }, [elapsedSecs, sleepTimerMinutes]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const soundscapes = [
    { id: 'rain', name: 'Gentle Rain', icon: CloudRain },
    { id: 'ocean', name: 'Ocean Waves', icon: Waves },
    { id: 'forest', name: 'Forest Solitude', icon: Trees },
    { id: 'birds', name: 'Morning Birds', icon: Bird }
  ] as const;

  return (
    <div className={`max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn pb-24 transition-colors duration-500 ${sleepMode ? 'bg-slate-950 text-white rounded-3xl p-6' : ''}`}>
      
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53]">
            GUIDED AUDIO & SOUNDSCAPES
          </span>
          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-1">
            Meditation Player
          </h1>
        </div>

        {/* Sleep Mode Toggle */}
        <button
          onClick={() => setSleepMode(!sleepMode)}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
            sleepMode 
              ? 'bg-amber-400 text-slate-950 shadow-lg' 
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <Moon className="w-4 h-4" />
          <span>{sleepMode ? 'Sleep Mode Active' : 'Enable Sleep Mode'}</span>
        </button>
      </div>

      {/* Main Player Display */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0B6B53] to-[#134E4A] rounded-3xl p-8 sm:p-10 text-white shadow-2xl space-y-8">
        
        {/* Track Title */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-[#D4AF37]/20 px-3 py-1 rounded-full border border-[#D4AF37]/30">
              DAY {activeTrack.dayNumber} GUIDED TRACK
            </span>
            {activeTrack.meditationTrack.genre && (
              <span className="text-xs font-semibold text-emerald-200 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-500/30">
                🎵 {activeTrack.meditationTrack.genre}
              </span>
            )}
          </div>
          <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
            {activeTrack.meditationTrack.title}
          </h2>
          {activeTrack.meditationTrack.audioDescription && (
            <p className="text-xs text-emerald-100/90 max-w-xl mx-auto font-normal leading-relaxed pt-1">
              {activeTrack.meditationTrack.audioDescription}
            </p>
          )}
          <p className="text-xs text-emerald-200 font-medium pt-0.5">
            Guided by Mainak Chatterjee • Duration: {activeTrack.meditationTrack.duration}
          </p>
        </div>

        {/* Progress Bar & Counter */}
        <div className="space-y-2 max-w-lg mx-auto">
          <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#D4AF37] transition-all duration-1000"
              style={{ width: `${Math.min(100, (elapsedSecs / 720) * 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-xs font-mono text-emerald-200">
            <span>{formatTime(elapsedSecs)}</span>
            <span>{activeTrack.meditationTrack.duration}</span>
          </div>
        </div>

        {/* Main Controls: Rewind, Play/Pause, Forward */}
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setElapsedSecs(Math.max(0, elapsedSecs - 15))}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
            title="Rewind 15s"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-16 h-16 rounded-full bg-gradient-to-r from-[#D4AF37] to-amber-400 text-slate-950 flex items-center justify-center font-bold shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            {isPlaying ? <Pause className="w-7 h-7 fill-slate-950" /> : <Play className="w-7 h-7 fill-slate-950 ml-1" />}
          </button>

          <button
            onClick={() => setElapsedSecs(elapsedSecs + 15)}
            className="p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
            title="Forward 15s"
          >
            <FastForward className="w-5 h-5" />
          </button>
        </div>

        {/* Soundscape Selector Grid */}
        <div className="pt-6 border-t border-white/10 space-y-3">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-200 text-center block">
            Select Ambient Soundscape Overlay
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto">
            {soundscapes.map((s) => {
              const Icon = s.icon;
              const active = selectedSoundscape === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => setSelectedSoundscape(s.id as any)}
                  className={`p-3 rounded-2xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    active 
                      ? 'bg-[#D4AF37] text-slate-950 font-bold shadow-md' 
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{s.name}</span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* Track Selection List */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="font-heading font-bold text-lg text-slate-900 border-b border-slate-100 pb-3">
          Explore Challenge Meditation Tracks
        </h3>
        <div className="space-y-2">
          {DAYS_DATA.map((d, idx) => (
            <div
              key={d.dayNumber}
              onClick={() => {
                setSelectedTrackIndex(idx);
                setElapsedSecs(0);
                setIsPlaying(true);
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                selectedTrackIndex === idx 
                  ? 'bg-emerald-50 border-[#0B6B53] shadow-sm' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-[#0B6B53] text-white font-bold text-xs flex items-center justify-center">
                  D{d.dayNumber}
                </span>
                <div>
                  <h4 className="font-heading font-bold text-sm text-slate-900">
                    {d.meditationTrack.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Day {d.dayNumber}: {d.title} • <span className="text-[#0B6B53] font-semibold">{d.meditationTrack.subtitle}</span> • {d.meditationTrack.duration}
                  </p>
                </div>
              </div>

              <Play className="w-4 h-4 text-[#0B6B53]" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
