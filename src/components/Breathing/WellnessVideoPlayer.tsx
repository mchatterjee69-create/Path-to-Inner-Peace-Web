import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Maximize, 
  Minimize, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  Sparkles, 
  Sun
} from 'lucide-react';
import guideAvatar from '../../assets/images/wellness_female_guide_1786113672089.jpg';

interface Scene {
  id: number;
  title: string;
  subtitle: string;
  startTime: number; // in seconds
  endTime: number;
}

const SCENES: Scene[] = [
  { id: 1, title: 'Scene 1: Introduction', subtitle: 'Welcome & Mindful Stance', startTime: 0, endTime: 30 },
  { id: 2, title: 'Scene 2: 4-7-8 Breathing', subtitle: 'Parasympathetic Reset', startTime: 30, endTime: 120 },
  { id: 3, title: 'Scene 3: Box Breathing', subtitle: '4-4-4-4 Square Balance', startTime: 120, endTime: 210 },
  { id: 4, title: 'Scene 4: Muscle Relaxation', subtitle: 'Somatic Tension Release', startTime: 210, endTime: 285 },
  { id: 5, title: 'Scene 5: Ending', subtitle: 'Closing Harmony & Title', startTime: 285, endTime: 300 }
];

export const WellnessVideoPlayer: React.FC<{ onNextSlide?: () => void }> = ({ onNextSlide }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showSubtitles, setShowSubtitles] = useState<boolean>(true);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalDurationSec = 300; // 5 minutes exactly

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Web Audio Context & Nodes Ref for realistic ambient (Piano + Water + Wind)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const pianoGainRef = useRef<GainNode | null>(null);
  const waterGainRef = useRef<GainNode | null>(null);
  const windGainRef = useRef<GainNode | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const pianoIntervalRef = useRef<any>(null);

  // Track speech synthesis spoken script line
  const currentSpokenTextRef = useRef<string>('');

  // Determine current active scene
  const currentScene = SCENES.find(
    s => currentTimeSec >= s.startTime && currentTimeSec < s.endTime
  ) || SCENES[4];

  // Initialize Web Audio Engine
  const initAudioEngine = () => {
    if (!audioCtxRef.current) {
      const AudioCtxClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtxClass();
      audioCtxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = isMuted ? 0 : 0.7;
      master.connect(ctx.destination);
      masterGainRef.current = master;

      // 1. Water stream noise generator
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02; // Pink noise filtering
        lastOut = output[i];
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const waterFilter = ctx.createBiquadFilter();
      waterFilter.type = 'lowpass';
      waterFilter.frequency.value = 450;

      const waterGain = ctx.createGain();
      waterGain.gain.value = 0.15;

      noiseSource.connect(waterFilter);
      waterFilter.connect(waterGain);
      waterGain.connect(master);
      noiseSource.start();
      waterGainRef.current = waterGain;

      // 2. Wind breeze noise generator
      const windSource = ctx.createBufferSource();
      windSource.buffer = noiseBuffer;
      windSource.loop = true;

      const windFilter = ctx.createBiquadFilter();
      windFilter.type = 'bandpass';
      windFilter.frequency.value = 250;
      windFilter.Q.value = 2.0;

      const windGain = ctx.createGain();
      windGain.gain.value = 0.08;

      windSource.connect(windFilter);
      windFilter.connect(windGain);
      windGain.connect(master);
      windSource.start();
      windGainRef.current = windGain;

      // 3. Piano Gain
      const pianoGain = ctx.createGain();
      pianoGain.gain.value = 0.3;
      pianoGain.connect(master);
      pianoGainRef.current = pianoGain;
    }

    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Play a soft natural piano chord
  const playPianoNote = (freq: number, duration: number = 3) => {
    if (!audioCtxRef.current || isMuted || !pianoGainRef.current) return;
    try {
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const noteGain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      // Add soft warm harmonic sine overtone
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(freq * 2, ctx.currentTime);
      const noteGain2 = ctx.createGain();
      noteGain2.gain.setValueAtTime(0.05, ctx.currentTime);
      noteGain2.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      const now = ctx.currentTime;
      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.linearRampToValueAtTime(0.2, now + 0.08); // soft attack
      noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(pianoGainRef.current);
      osc2.connect(noteGain2);
      noteGain2.connect(pianoGainRef.current);

      osc.start(now);
      osc2.start(now);
      osc.stop(now + duration);
      osc2.stop(now + duration);
    } catch (e) {
      console.warn('Piano synthesis error:', e);
    }
  };

  // Start piano arpeggios when video plays
  useEffect(() => {
    if (isPlaying) {
      initAudioEngine();
      const notes = [261.63, 329.63, 392.00, 440.00, 523.25, 659.25]; // C4, E4, G4, A4, C5, E5
      let index = 0;

      pianoIntervalRef.current = setInterval(() => {
        const currentNote = notes[index % notes.length];
        playPianoNote(currentNote, 4.5);
        index++;
      }, 3500);
    } else {
      if (pianoIntervalRef.current) clearInterval(pianoIntervalRef.current);
    }

    return () => {
      if (pianoIntervalRef.current) clearInterval(pianoIntervalRef.current);
    };
  }, [isPlaying, isMuted]);

  // Master Volume sync
  useEffect(() => {
    if (masterGainRef.current) {
      masterGainRef.current.gain.value = isMuted ? 0 : 0.7;
    }
  }, [isMuted]);

  // Timer Effect for 5-minute video progression (100ms interval for smooth rendering)
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTimeSec(prev => {
          if (prev >= totalDurationSec) {
            setIsPlaying(false);
            return totalDurationSec;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Particle & Animated Somatic Video Canvas Background Effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    const particles: { x: number; y: number; radius: number; alpha: number; speedY: number; speedX: number }[] = [];

    for (let i = 0; i < 50; i++) {
      particles.push({
        x: Math.random() * (canvas.width || 1280),
        y: Math.random() * (canvas.height || 720),
        radius: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3
      });
    }

    const render = (timestamp: number) => {
      canvas.width = canvas.parentElement?.clientWidth || 1280;
      canvas.height = canvas.parentElement?.clientHeight || 720;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. VOLUMETRIC SUNLIGHT BEAMS
      const lightBeam = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      lightBeam.addColorStop(0, 'rgba(212, 175, 55, 0.12)');
      lightBeam.addColorStop(0.5, 'rgba(20, 184, 166, 0.08)');
      lightBeam.addColorStop(1, 'rgba(15, 23, 42, 0.2)');
      ctx.fillStyle = lightBeam;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 2. DYNAMIC SOMATIC BREATHING RING (When Playing)
      if (isPlaying) {
        const pulse = 100 + Math.sin(timestamp * 0.0018) * 40;
        ctx.save();
        ctx.translate(canvas.width / 2, canvas.height / 2);
        
        // Outer glowing aura ring
        ctx.beginPath();
        ctx.arc(0, 0, pulse + 25, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.25)';
        ctx.lineWidth = 2;
        ctx.setLineDash([10, 8]);
        ctx.stroke();

        // Inner solid somatic ring
        ctx.beginPath();
        ctx.arc(0, 0, pulse, 0, Math.PI * 2);
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 4;
        ctx.shadowBlur = 18;
        ctx.shadowColor = '#10B981';
        ctx.stroke();
        ctx.restore();

        // HUD RECORDING BADGE
        ctx.save();
        ctx.beginPath();
        ctx.arc(35, 35, 6, 0, Math.PI * 2);
        ctx.fillStyle = Math.sin(timestamp * 0.005) > 0 ? '#EF4444' : '#991B1B';
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('REC • SOMATIC REGULATION 60 FPS VIDEO', 50, 39);

        // Spectrum Equalizer
        for (let k = 0; k < 6; k++) {
          const barH = 5 + Math.abs(Math.sin(timestamp * 0.01 + k)) * 12;
          ctx.fillStyle = '#D4AF37';
          ctx.fillRect(320 + k * 6, 39 - barH, 4, barH);
        }
        ctx.restore();
      }

      // 3. DRAW GLOWING LIGHT PARTICLES
      particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`; // #D4AF37 Gold
        ctx.shadowBlur = 12;
        ctx.shadowColor = '#D4AF37';
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < 0) {
          p.y = canvas.height;
          p.x = Math.random() * canvas.width;
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  // Web Speech Synthesis for Voice Guide Script
  const speakVoiceover = (text: string) => {
    if (!voiceEnabled || isMuted || !('speechSynthesis' in window)) return;
    if (currentSpokenTextRef.current === text) return;

    currentSpokenTextRef.current = text;
    window.speechSynthesis.cancel(); // Stop prior speech

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.85; // Calming slow pace
    utterance.pitch = 1.05; // Soothing warm tone

    // Try finding female voice
    const voices = window.speechSynthesis.getVoices();
    const femaleVoice = voices.find(
      v =>
        v.lang.startsWith('en') &&
        (v.name.toLowerCase().includes('female') ||
         v.name.toLowerCase().includes('samantha') ||
         v.name.toLowerCase().includes('zira') ||
         v.name.toLowerCase().includes('victoria') ||
         v.name.toLowerCase().includes('google us english'))
    );
    if (femaleVoice) {
      utterance.voice = femaleVoice;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Synchronize Voiceover Script per Scene and Phase
  useEffect(() => {
    if (!isPlaying) {
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
      currentSpokenTextRef.current = '';
      return;
    }

    const script = getCurrentScript();
    if (script && script !== currentSpokenTextRef.current) {
      speakVoiceover(script);
    }
  }, [currentTimeSec, isPlaying, voiceEnabled]);

  // Compute Current Script Text & Visual Details for active Scene
  function getCurrentScript(): string {
    if (currentTimeSec >= 0 && currentTimeSec < 30) {
      return "Welcome to Path to Inner Peace. Take a comfortable position. For the next few minutes, allow yourself to pause, breathe, and reconnect with your body and mind.";
    }

    if (currentTimeSec >= 30 && currentTimeSec < 120) {
      // 4-7-8 Breathing (Cycle duration = 19 seconds)
      const secInScene = currentTimeSec - 30;
      const cycleSec = secInScene % 19;
      if (cycleSec < 4) {
        return "Inhale gently through your nose for 4 seconds.";
      } else if (cycleSec < 11) {
        return "Hold your breath for 7 seconds.";
      } else {
        return "Exhale slowly through your mouth for 8 seconds.";
      }
    }

    if (currentTimeSec >= 120 && currentTimeSec < 210) {
      // Box Breathing (Cycle duration = 16 seconds)
      const secInScene = currentTimeSec - 120;
      const cycleSec = secInScene % 16;
      if (cycleSec < 4) {
        return "Inhale for 4 seconds.";
      } else if (cycleSec < 8) {
        return "Hold for 4 seconds.";
      } else if (cycleSec < 12) {
        return "Exhale for 4 seconds.";
      } else {
        return "Hold for 4 seconds.";
      }
    }

    if (currentTimeSec >= 210 && currentTimeSec < 285) {
      // Progressive Muscle Relaxation (75 seconds)
      const secInScene = currentTimeSec - 210;
      if (secInScene < 12) {
        return "Now gently tense your feet... Hold... Relax.";
      } else if (secInScene < 25) {
        return "Relax your legs.";
      } else if (secInScene < 38) {
        return "Relax your stomach.";
      } else if (secInScene < 50) {
        return "Relax your shoulders.";
      } else if (secInScene < 62) {
        return "Relax your hands.";
      } else {
        return "Relax your face.";
      }
    }

    if (currentTimeSec >= 285 && currentTimeSec <= 300) {
      return "Take one final deep breath. Notice how you feel. Carry this calmness with you through your day. Thank you for practicing with Path to Inner Peace.";
    }

    return "";
  }

  // Handle Fullscreen Toggle
  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  // Sync fullscreen state with ESC / browser events
  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    document.addEventListener('webkitfullscreenchange', handleFSChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFSChange);
      document.removeEventListener('webkitfullscreenchange', handleFSChange);
    };
  }, []);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Jump to specific scene
  const handleJumpToScene = (scene: Scene) => {
    setCurrentTimeSec(scene.startTime);
    setIsPlaying(true);
  };

  // Render Scene-Specific Dynamic Visual Canvas
  const renderSceneVisuals = () => {
    switch (currentScene.id) {
      case 1:
        // INTRODUCTION
        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-full px-6 z-10 py-4">
            {/* Guide Avatar with glowing aura */}
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-emerald-400 to-[#D4AF37] opacity-60 blur-lg animate-pulse" />
              <img 
                src={guideAvatar} 
                alt="Wellness Female Guide" 
                className="relative w-44 h-44 sm:w-56 sm:h-56 rounded-full object-cover border-4 border-[#D4AF37] shadow-2xl scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-2 right-2 bg-emerald-950/90 text-[#D4AF37] border border-[#D4AF37] text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                <span>Wellness Guide</span>
              </div>
            </div>

            {/* Introductory Callout */}
            <div className="max-w-md text-center md:text-left space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-emerald-950/80 px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
                SCENE 1 • INTRODUCTION
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-tight">
                Welcome to Path to Inner Peace
              </h2>
              <p className="text-emerald-100 text-sm leading-relaxed">
                Take a comfortable position. Allow yourself to pause, breathe, and reconnect with your body and mind in this 5-minute somatic sanctuary.
              </p>
            </div>
          </div>
        );

      case 2: {
        // 4-7-8 BREATHING
        const secInScene = currentTimeSec - 30;
        const cycleSec = secInScene % 19;
        let phaseName: 'Inhale' | 'Hold' | 'Exhale' = 'Inhale';
        let countdown = 4;
        let circleScale = 1.0;

        if (cycleSec < 4) {
          phaseName = 'Inhale';
          countdown = Math.ceil(4 - cycleSec);
          circleScale = 0.6 + (cycleSec / 4) * 0.5; // Expands from 0.6 to 1.1
        } else if (cycleSec < 11) {
          phaseName = 'Hold';
          countdown = Math.ceil(11 - cycleSec);
          circleScale = 1.1; // Holds expanded
        } else {
          phaseName = 'Exhale';
          countdown = Math.ceil(19 - cycleSec);
          circleScale = 1.1 - ((cycleSec - 11) / 8) * 0.5; // Contracts from 1.1 to 0.6
        }

        return (
          <div className="flex flex-col items-center justify-center space-y-6 h-full z-10 px-6 text-center py-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-emerald-950/80 px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
              SCENE 2 • 4-7-8 BREATHING
            </span>

            {/* Animated Breathing Circle */}
            <div className="relative flex items-center justify-center w-56 h-56 sm:w-64 sm:h-64">
              <div 
                className="absolute inset-0 rounded-full bg-gradient-to-r from-[#D4AF37]/40 via-emerald-400/30 to-amber-300/40 border-2 border-[#D4AF37] transition-all duration-300 ease-out shadow-2xl"
                style={{ transform: `scale(${circleScale * 1.15})` }}
              />
              <div 
                className="absolute inset-4 rounded-full bg-emerald-500/20 border border-emerald-300/40 transition-all duration-300 ease-out"
                style={{ transform: `scale(${circleScale})` }}
              />

              <div 
                className="w-40 h-40 sm:w-44 sm:h-44 rounded-full bg-slate-950/90 border-2 border-[#D4AF37] flex flex-col items-center justify-center shadow-2xl transition-transform duration-300 ease-out"
                style={{ transform: `scale(${circleScale * 0.95})` }}
              >
                <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider block">
                  4-7-8 Cycle
                </span>
                <span className="font-heading font-black text-3xl sm:text-4xl text-[#D4AF37] tracking-wider block my-1">
                  {phaseName}
                </span>
                <span className="font-mono font-extrabold text-2xl text-white">
                  {countdown}s
                </span>
              </div>
            </div>

            {/* Phase Badges */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold text-emerald-200">
              <span className={`px-3 py-1 rounded-full border ${phaseName === 'Inhale' ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-emerald-950/60 border-emerald-800'}`}>
                1. Inhale (4s)
              </span>
              <span className={`px-3 py-1 rounded-full border ${phaseName === 'Hold' ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-emerald-950/60 border-emerald-800'}`}>
                2. Hold (7s)
              </span>
              <span className={`px-3 py-1 rounded-full border ${phaseName === 'Exhale' ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37]' : 'bg-emerald-950/60 border-emerald-800'}`}>
                3. Exhale (8s)
              </span>
            </div>
          </div>
        );
      }

      case 3: {
        // BOX BREATHING
        const secInScene = currentTimeSec - 120;
        const cycleSec = secInScene % 16;
        let phaseName: 'Inhale' | 'Hold' | 'Exhale' = 'Inhale';
        let edge = 1; // 1: Up, 2: Right, 3: Down, 4: Left
        let progress = (cycleSec % 4) / 4;

        if (cycleSec < 4) {
          phaseName = 'Inhale';
          edge = 1;
        } else if (cycleSec < 8) {
          phaseName = 'Hold';
          edge = 2;
        } else if (cycleSec < 12) {
          phaseName = 'Exhale';
          edge = 3;
        } else {
          phaseName = 'Hold';
          edge = 4;
        }

        return (
          <div className="flex flex-col items-center justify-center space-y-5 h-full z-10 px-6 text-center py-4">
            <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-emerald-950/80 px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
              SCENE 3 • 4-4-4-4 BOX BREATHING
            </span>

            <div className="relative w-56 h-56 sm:w-64 sm:h-64 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 200 200">
                <rect 
                  x="20" 
                  y="20" 
                  width="160" 
                  height="160" 
                  rx="12"
                  fill="none" 
                  stroke="#064E3B" 
                  strokeWidth="6" 
                />

                {edge === 1 && (
                  <line 
                    x1="20" y1={180 - progress * 160} 
                    x2="20" y2="180" 
                    stroke="#D4AF37" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                  />
                )}
                {edge === 2 && (
                  <line 
                    x1="20" y1="20" 
                    x2={20 + progress * 160} y2="20" 
                    stroke="#D4AF37" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                  />
                )}
                {edge === 3 && (
                  <line 
                    x1="180" y1="20" 
                    x2="180" y2={20 + progress * 160} 
                    stroke="#D4AF37" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                  />
                )}
                {edge === 4 && (
                  <line 
                    x1="180" y1="180" 
                    x2={180 - progress * 160} y2="180" 
                    stroke="#D4AF37" 
                    strokeWidth="8" 
                    strokeLinecap="round" 
                  />
                )}
              </svg>

              <div className="w-36 h-36 bg-slate-950/90 rounded-2xl border border-[#D4AF37]/50 flex flex-col items-center justify-center shadow-xl">
                <span className="text-xs uppercase font-bold text-emerald-300">
                  Box Cycle
                </span>
                <span className="font-heading font-extrabold text-2xl text-[#D4AF37] my-1">
                  {phaseName}
                </span>
                <span className="font-mono text-sm text-white">
                  {Math.ceil(4 - (cycleSec % 4))}s
                </span>
              </div>
            </div>

            {/* Box Phase Badges */}
            <div className="flex flex-wrap justify-center gap-2 text-xs font-bold text-emerald-100">
              <span className={`px-2.5 py-1 rounded-lg border ${edge === 1 ? 'bg-[#D4AF37] text-slate-950 font-extrabold border-[#D4AF37]' : 'bg-emerald-950/60 border-emerald-800'}`}>
                1. Inhale ↑
              </span>
              <span className={`px-2.5 py-1 rounded-lg border ${edge === 2 ? 'bg-[#D4AF37] text-slate-950 font-extrabold border-[#D4AF37]' : 'bg-emerald-950/60 border-emerald-800'}`}>
                2. Hold →
              </span>
              <span className={`px-2.5 py-1 rounded-lg border ${edge === 3 ? 'bg-[#D4AF37] text-slate-950 font-extrabold border-[#D4AF37]' : 'bg-emerald-950/60 border-emerald-800'}`}>
                3. Exhale ↓
              </span>
              <span className={`px-2.5 py-1 rounded-lg border ${edge === 4 ? 'bg-[#D4AF37] text-slate-950 font-extrabold border-[#D4AF37]' : 'bg-emerald-950/60 border-emerald-800'}`}>
                4. Hold ←
              </span>
            </div>
          </div>
        );
      }

      case 4: {
        // PROGRESSIVE MUSCLE RELAXATION
        const secInScene = currentTimeSec - 210;
        let activeFocus = 'Feet';
        if (secInScene >= 12 && secInScene < 25) activeFocus = 'Legs';
        if (secInScene >= 25 && secInScene < 38) activeFocus = 'Stomach';
        if (secInScene >= 38 && secInScene < 50) activeFocus = 'Shoulders';
        if (secInScene >= 50 && secInScene < 62) activeFocus = 'Hands';
        if (secInScene >= 62) activeFocus = 'Face & Crown';

        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-full px-6 z-10 py-4">
            <div className="text-center md:text-left space-y-3 max-w-sm">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-emerald-950/80 px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
                SCENE 4 • SOMATIC RELAXATION
              </span>
              <h3 className="font-heading font-extrabold text-2xl text-white">
                Target: <span className="text-[#D4AF37]">{activeFocus}</span>
              </h3>
              <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed">
                Tense targeted muscle group for 3s, then release and exhale tension.
              </p>
            </div>

            {/* Body Silhouette Relaxation Visualizer */}
            <div className="relative w-48 h-64 bg-slate-950/80 rounded-2xl border border-[#D4AF37]/40 p-4 flex flex-col items-center justify-between shadow-2xl shrink-0">
              <div className={`w-12 h-12 rounded-full border-2 transition-all duration-500 flex items-center justify-center text-xs font-bold ${activeFocus === 'Face & Crown' ? 'bg-[#D4AF37] text-slate-950 border-white shadow-lg shadow-amber-400/50 scale-110' : 'border-emerald-700 bg-emerald-950/50 text-emerald-300'}`}>
                Face
              </div>

              <div className={`w-36 h-8 rounded-xl border-2 transition-all duration-500 flex items-center justify-center text-xs font-bold ${activeFocus === 'Shoulders' ? 'bg-[#D4AF37] text-slate-950 border-white shadow-lg shadow-amber-400/50 scale-110' : 'border-emerald-700 bg-emerald-950/50 text-emerald-300'}`}>
                Shoulders
              </div>

              <div className={`w-28 h-9 rounded-xl border-2 transition-all duration-500 flex items-center justify-center text-xs font-bold ${activeFocus === 'Stomach' ? 'bg-[#D4AF37] text-slate-950 border-white shadow-lg shadow-amber-400/50 scale-110' : 'border-emerald-700 bg-emerald-950/50 text-emerald-300'}`}>
                Stomach
              </div>

              <div className={`w-40 h-6 rounded-lg border-2 transition-all duration-500 flex items-center justify-center text-xs font-bold ${activeFocus === 'Hands' ? 'bg-[#D4AF37] text-slate-950 border-white shadow-lg shadow-amber-400/50 scale-110' : 'border-emerald-700 bg-emerald-950/50 text-emerald-300'}`}>
                Hands
              </div>

              <div className="flex gap-2 w-full justify-center">
                <div className={`w-12 h-12 rounded-lg border-2 transition-all duration-500 flex items-center justify-center text-xs font-bold ${activeFocus === 'Legs' ? 'bg-[#D4AF37] text-slate-950 border-white shadow-lg scale-110' : 'border-emerald-700 bg-emerald-950/50 text-emerald-300'}`}>
                  Legs
                </div>
                <div className={`w-12 h-12 rounded-lg border-2 transition-all duration-500 flex items-center justify-center text-xs font-bold ${activeFocus === 'Feet' ? 'bg-[#D4AF37] text-slate-950 border-white shadow-lg scale-110' : 'border-emerald-700 bg-emerald-950/50 text-emerald-300'}`}>
                  Feet
                </div>
              </div>
            </div>
          </div>
        );
      }

      case 5:
      default:
        // ENDING SLATE
        return (
          <div className="flex flex-col md:flex-row items-center justify-center gap-8 h-full px-6 z-10 py-4">
            <div className="relative group">
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-[#D4AF37] via-emerald-400 to-[#D4AF37] opacity-60 blur-lg animate-pulse" />
              <img 
                src={guideAvatar} 
                alt="Wellness Female Guide" 
                className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full object-cover border-4 border-[#D4AF37] shadow-2xl scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-2 right-2 bg-emerald-950/90 text-[#D4AF37] border border-[#D4AF37] text-[10px] font-bold uppercase px-3 py-1 rounded-full shadow-lg flex items-center gap-1.5">
                <Sun className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Complete</span>
              </div>
            </div>

            <div className="text-center md:text-left space-y-3 max-w-md">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] bg-emerald-950/80 px-3.5 py-1 rounded-full border border-[#D4AF37]/30">
                SCENE 5 • HARMONIOUS COMPLETION
              </span>
              <h2 className="font-serif font-bold text-3xl sm:text-4xl text-white tracking-wide">
                Path to Inner Peace
              </h2>
              <p className="text-sm font-semibold text-emerald-200 tracking-wider">
                Train Your Mind. Transform Your Life.
              </p>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pt-1">
                Carry this profound inner calmness with you into your daily activities.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mt-3">
                <button
                  onClick={() => {
                    setCurrentTimeSec(0);
                    setIsPlaying(true);
                  }}
                  className="px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-extrabold text-xs rounded-full shadow-xl hover:scale-105 transition-all flex items-center gap-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Replay Somatic Orientation</span>
                </button>

                {onNextSlide && (
                  <button
                    onClick={onNextSlide}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-xs rounded-full shadow-xl hover:scale-105 transition-all flex items-center gap-2 border border-emerald-300/40"
                  >
                    <span>Next Slide: 5 CBT Techniques Video →</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Section Pre-Header Badge */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/80 inline-flex items-center gap-1.5 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#0B6B53]" />
              SOMATIC NERVOUS SYSTEM REGULATION
            </span>
          </div>
          <h1 className="font-heading font-black text-3xl sm:text-4xl lg:text-5xl text-slate-900 mt-2 tracking-tight">
            Somatic Orientation
          </h1>
          <p className="text-slate-600 text-sm sm:text-base mt-1.5 max-w-3xl">
            A 5-minute animated wellness training designed to reset parasympathetic tone, guide 4-7-8 and box breathing, and release physical tension.
          </p>
        </div>
      </div>

      {/* Main Video Player Canvas Container */}
      <div 
        ref={containerRef}
        className={`relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[#D4AF37]/50 bg-gradient-to-b from-slate-950 via-[#0F4C45] to-emerald-950 flex flex-col justify-between transition-all duration-300 ${
          isFullscreen 
            ? 'fixed inset-0 z-[99999] w-screen h-screen rounded-none border-none p-0 bg-slate-950' 
            : 'aspect-video'
        }`}
      >
        {/* Animated Particle Canvas Background */}
        <canvas 
          ref={canvasRef} 
          width={1280} 
          height={720} 
          className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-60"
        />

        {/* Top Overlay Bar */}
        <div className="relative z-20 p-4 flex items-center justify-between bg-gradient-to-b from-slate-950/80 to-transparent">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-[#D4AF37] animate-ping" />
            <span className="font-heading font-extrabold text-xs sm:text-sm text-white tracking-wide">
              Path to Inner Peace
            </span>
            <span className="text-[10px] text-emerald-300 font-semibold hidden sm:inline-block px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-800">
              1920×1080 Full HD
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Voice toggle */}
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`p-2 rounded-xl text-xs font-bold transition-colors flex items-center gap-1 ${
                voiceEnabled ? 'bg-[#D4AF37] text-slate-950' : 'bg-slate-900/80 text-slate-400 border border-slate-700'
              }`}
              title="Toggle Voiceover Guide"
            >
              <MessageSquare className="w-4 h-4" />
              <span className="hidden sm:inline">Voice</span>
            </button>

            {/* Mute toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-2 rounded-xl bg-slate-900/80 text-white hover:bg-slate-800 border border-slate-700 transition-colors"
              title="Toggle Audio"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-[#D4AF37]" />}
            </button>

            {/* Prominent Fullscreen Toggle Button */}
            <button
              onClick={toggleFullscreen}
              className="px-3 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-lg border border-amber-300"
              title={isFullscreen ? "Exit Fullscreen (ESC)" : "Expand Video Full Screen"}
            >
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Exit Full Screen' : 'Expand Full Screen'}</span>
            </button>
          </div>
        </div>

        {/* Center Dynamic Visual Stage */}
        <div 
          onClick={() => setIsPlaying(!isPlaying)}
          className="relative z-10 flex-1 flex items-center justify-center cursor-pointer group"
        >
          {renderSceneVisuals()}

          {/* Center Play Button Overlay when Paused */}
          {!isPlaying && (
            <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm transition-all group-hover:bg-slate-950/50">
              <div className="relative group/btn">
                <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] opacity-75 blur-lg animate-pulse" />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsPlaying(true);
                  }}
                  className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-2xl transition-transform transform group-hover/btn:scale-110 active:scale-95 border-4 border-white/80"
                >
                  <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-slate-950 ml-1.5" />
                </button>
              </div>

              <div className="mt-4 text-center space-y-1">
                <span className="inline-block px-4 py-1 bg-slate-950/90 text-[#D4AF37] border border-[#D4AF37]/50 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-xl">
                  CLICK TO PLAY ANIMATED SOMATIC VIDEO
                </span>
                <p className="text-xs text-slate-200 font-medium drop-shadow-md">
                  5-Minute Somatic Nervous System Regulation Video
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Live Script Subtitles Overlay */}
        {showSubtitles && getCurrentScript() && (
          <div className="relative z-20 px-6 py-2.5 bg-slate-950/90 border-t border-[#D4AF37]/30 text-center">
            <p className="text-xs sm:text-sm text-[#D4AF37] font-medium leading-relaxed max-w-3xl mx-auto drop-shadow-md">
              "{getCurrentScript()}"
            </p>
          </div>
        )}

        {/* Bottom Control Bar */}
        <div className="relative z-20 p-4 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent space-y-3">
          {/* Scrub Timeline Bar */}
          <div className="space-y-1">
            <input 
              type="range"
              min={0}
              max={totalDurationSec}
              step={0.1}
              value={currentTimeSec}
              onChange={e => setCurrentTimeSec(parseFloat(e.target.value))}
              className="w-full h-1.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
            />
            <div className="flex items-center justify-between text-[11px] font-mono text-emerald-200">
              <span>{formatTime(currentTimeSec)}</span>
              <span className="text-[#D4AF37] font-semibold">{currentScene.title}</span>
              <span>{formatTime(totalDurationSec)}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="p-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg flex items-center gap-2"
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-slate-950" /> : <Play className="w-5 h-5 fill-slate-950" />}
                <span className="text-xs font-black uppercase tracking-wider">
                  {isPlaying ? 'Pause Video' : 'Play Video'}
                </span>
              </button>

              <button
                onClick={() => {
                  setCurrentTimeSec(0);
                  setIsPlaying(true);
                }}
                className="p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-700 transition-colors"
                title="Restart Video"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={toggleFullscreen}
                className="px-3 py-2 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-[#D4AF37] border border-[#D4AF37]/50 transition-all font-bold text-xs flex items-center gap-1.5 shadow-md"
                title={isFullscreen ? "Exit Fullscreen (ESC)" : "Expand Video Full Screen"}
              >
                {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                <span>{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
              </button>
            </div>

            {/* Scene Jump Tabs */}
            <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto">
              {SCENES.map(scene => {
                const isActive = currentScene.id === scene.id;
                return (
                  <button
                    key={scene.id}
                    onClick={() => handleJumpToScene(scene)}
                    className={`px-3 py-1.5 rounded-xl text-[11px] font-bold border transition-all whitespace-nowrap ${
                      isActive 
                        ? 'bg-[#D4AF37] text-slate-950 border-[#D4AF37] shadow-md' 
                        : 'bg-slate-900/80 text-emerald-200 border-emerald-900/60 hover:bg-slate-800'
                    }`}
                  >
                    Scene {scene.id}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Scene Navigation Grid Cards below player for quick access */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1">
        {SCENES.map(scene => {
          const isActive = currentScene.id === scene.id;
          return (
            <button
              key={scene.id}
              onClick={() => handleJumpToScene(scene)}
              className={`p-3 rounded-2xl border text-left transition-all ${
                isActive 
                  ? 'bg-emerald-900 border-[#D4AF37] shadow-lg scale-102' 
                  : 'bg-white border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-[10px] font-bold uppercase ${isActive ? 'text-[#D4AF37]' : 'text-slate-500'}`}>
                  {formatTime(scene.startTime)} - {formatTime(scene.endTime)}
                </span>
                {isActive && <Sparkles className="w-3 h-3 text-[#D4AF37]" />}
              </div>
              <h4 className={`text-xs font-bold mt-1 ${isActive ? 'text-white' : 'text-slate-900'}`}>
                {scene.title}
              </h4>
              <p className={`text-[11px] truncate ${isActive ? 'text-emerald-200' : 'text-slate-500'}`}>
                {scene.subtitle}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
};
