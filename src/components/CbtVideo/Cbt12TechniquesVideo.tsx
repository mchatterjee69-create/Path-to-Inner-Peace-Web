import React, { useState, useEffect, useRef } from 'react';
import therapistImg from '../../assets/images/cbt_therapist_room_1786123127613.jpg';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  RotateCw, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  Sparkles, 
  BookOpen, 
  CheckCircle2, 
  Brain, 
  Heart, 
  Scale, 
  Zap, 
  ShieldCheck, 
  Subtitles, 
  ArrowRight,
  Wind,
  Feather,
  Sun,
  Activity
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';

export interface CbtTechniqueScene {
  id: number;
  title: string;
  subtitle: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  narration: string;
  visualSummary: string;
  displayElements: {
    badge: string;
    headline: string;
    steps: { label: string; desc: string; icon?: string }[];
    exampleText?: string;
    flowDiagram?: { from: string; arrow: string; to: string }[];
  };
}

export const CBT_STRESS_SCENES: CbtTechniqueScene[] = [
  {
    id: 0,
    title: 'OPENING & WELCOME',
    subtitle: 'Welcome to Path to Inner Peace',
    startTime: 0,
    endTime: 45,
    narration: "Welcome to Path to Inner Peace. Stress isn't just in your mind—it affects your body, emotions and everyday life. Today, I'll guide you through five powerful Cognitive Behavioral Therapy techniques that psychologists use to reduce stress naturally. Let's begin.",
    visualSummary: 'Warm hyper-realistic psychologist sitting in a soft emerald wellness room with indoor plants, books, and natural sunlight.',
    displayElements: {
      badge: 'CBT STRESS RELEASE MASTERCLASS',
      headline: '5 CBT Techniques to Instantly Release Stress',
      steps: [
        { label: 'Science-Backed', desc: 'Used by psychologists to calm nervous system & rewire stress pathways' },
        { label: 'Actionable & Practical', desc: '5-minute daily tools for anxiety, burnout & mental overload' },
        { label: 'Lasting Resilience', desc: 'Shift from reactive tension to calm emotional control' }
      ]
    }
  },
  {
    id: 1,
    title: 'TECHNIQUE 1: THOUGHT RECORD',
    subtitle: 'Deconstruct Anxious & Stressful Thoughts',
    startTime: 45,
    endTime: 165, // 2 Minutes
    narration: "Technique 1: Thought Record. When stress hits, write down the 5 pillars: Situation, Automatic Thought, Emotion, Evidence, and your Balanced Thought. For example: Situation—Boss didn't reply. Automatic Thought—'I'm in trouble.' Balanced Thought—'My boss may simply be busy.' Capturing thoughts on paper strips them of their emotional power.",
    visualSummary: 'A stressed office worker sitting with anxious thoughts, introducing a notebook to record situation, thoughts, and balanced facts.',
    displayElements: {
      badge: 'TECHNIQUE 1',
      headline: 'The 5-Step Thought Record',
      steps: [
        { label: '1. Situation', desc: 'Boss didn\'t reply to my email' },
        { label: '2. Automatic Thought', desc: '"I\'m in trouble. I made a huge mistake."' },
        { label: '3. Emotion & Intensity', desc: 'Anxiety (8/10), Tight chest' },
        { label: '4. Evidence Check', desc: 'Facts: Boss is in back-to-back meetings today' },
        { label: '5. Balanced Thought', desc: '"My boss may simply be busy. My work is accurate."' }
      ],
      exampleText: 'Therapist Insight: Writing thoughts down shifts brain activity from emotional amygdala to rational prefrontal cortex.'
    }
  },
  {
    id: 2,
    title: 'TECHNIQUE 2: COGNITIVE REFRAMING',
    subtitle: 'Transform Dark Thought Clouds into Clear Skies',
    startTime: 165,
    endTime: 285, // 2 Minutes
    narration: "Technique 2: Cognitive Reframing. Stress distorts our thinking into dark clouds. Instead of staying trapped in 'I can't handle this', reframe to 'This is difficult, but I can take one step at a time.' Changing your perspective instantly changes your emotional response.",
    visualSummary: 'Dark storm clouds of stress slowly dissolving into bright golden sunlight.',
    displayElements: {
      badge: 'TECHNIQUE 2',
      headline: 'Cognitive Reframing Strategy',
      steps: [
        { label: 'Dark Thought Cloud', desc: '"I can\'t handle this. Everything is falling apart."' },
        { label: 'Pause & Reframe', desc: '"This is difficult, but I can take one step at a time."' },
        { label: 'Emotional Result', desc: 'Lower heart rate, restored focus, grounded presence' }
      ],
      exampleText: 'Reframe Rule: Do not force toxic positivity. Acknowledge difficulty, then choose an empowered next step.'
    }
  },
  {
    id: 3,
    title: 'TECHNIQUE 3: THE S.T.O.P. TECHNIQUE',
    subtitle: 'Your Instant 4-Step Emotional Circuit Breaker',
    startTime: 285,
    endTime: 405, // 2 Minutes
    narration: "Technique 3: The STOP Technique. S: Stop what you are doing. T: Take a deep breath. O: Observe your physical sensations and thoughts without judgment. P: Proceed with calm, intentional wisdom. Watch as your stress level visibly decreases.",
    visualSummary: 'A person overwhelmed with stress guided through slow breathing animation; stress meter drops from 90% down to 25%.',
    displayElements: {
      badge: 'TECHNIQUE 3',
      headline: 'S.T.O.P. Emergency Stress Reset',
      steps: [
        { label: 'S — Stop', desc: 'Freeze physical & mental reactions immediately' },
        { label: 'T — Take a Breath', desc: 'Inhale deeply for 4s, exhale slowly for 6s' },
        { label: 'O — Observe', desc: 'Notice body tension & feelings with gentle curiosity' },
        { label: 'P — Proceed', desc: 'Respond with wise, calm, values-aligned action' }
      ],
      exampleText: 'Breathing Guide: Inhale peace... Exhale tension. Your stress level drops with every slow breath.'
    }
  },
  {
    id: 4,
    title: 'TECHNIQUE 4: EVIDENCE TESTING',
    subtitle: 'Put Your Stress Assumptions On Trial',
    startTime: 405,
    endTime: 525, // 2 Minutes
    narration: "Technique 4: Evidence Testing. Stress often comes from assumptions rather than facts. Imagine a large weighing scale. On the left, place Evidence For. On the right, place Evidence Against. Example: 'I\'m going to fail.' Evidence For: One mistake. Evidence Against: Many previous successes. Facts weigh far heavier than fear.",
    visualSummary: 'A large golden courtroom weighing scale balancing Evidence For vs Evidence Against.',
    displayElements: {
      badge: 'TECHNIQUE 4',
      headline: 'Courtroom Evidence Scale',
      steps: [
        { label: 'Fear Prediction', desc: '"I\'m going to fail my evaluation tomorrow."' },
        { label: 'Evidence FOR (Left)', desc: 'I stumbled over one word during practice.' },
        { label: 'Evidence AGAINST (Right)', desc: 'I prepared for 10 hours and received top praise on 5 past projects.' }
      ],
      exampleText: 'Scale Verdict: One small mistake weighs light. Years of proven success weigh heavy.'
    }
  },
  {
    id: 5,
    title: 'TECHNIQUE 5: BEHAVIOURAL ACTIVATION',
    subtitle: 'Break Couch Inertia with Safe Micro-Actions',
    startTime: 525,
    endTime: 570, // 45 Seconds
    narration: "Technique 5: Behavioural Activation. When stress tells you to freeze on the couch, small physical actions tell your brain you are safe. Stand up. Take a short walk. Stretch. Drink water. Water a plant. Journal. Micro-actions restore emotional safety and lift your mood.",
    visualSummary: 'Person lying overwhelmed on couch starting a micro-action (walking, stretching, watering plants, journaling) as mood brightens.',
    displayElements: {
      badge: 'TECHNIQUE 5',
      headline: 'Behavioural Activation Loop',
      steps: [
        { label: '1. Recognize Freeze', desc: 'Couch inertia tells you to hide from stress' },
        { label: '2. Take Micro-Action', desc: 'Walk for 3 mins, stretch, drink water, or water plants' },
        { label: '3. Mind Signal', desc: 'Action signals safety to the brain, releasing dopamine' }
      ],
      exampleText: 'Therapist Mantra: "When stress tells you to stop... Small actions tell your brain you\'re safe."'
    }
  },
  {
    id: 6,
    title: 'FINAL SUMMARY',
    subtitle: 'Mastery of 5 CBT Stress Tools',
    startTime: 570,
    endTime: 585, // 15 Seconds
    narration: "You don't have to use all five techniques today. Choose just one. Practice it daily. Small changes create lasting transformation.",
    visualSummary: 'Clean checkmarked summary card displaying all 5 CBT stress release techniques.',
    displayElements: {
      badge: 'SUMMARY',
      headline: '5 CBT Stress Tools Summary',
      steps: [
        { label: '✔ 1. Thought Record', desc: 'Deconstruct anxious thoughts on paper' },
        { label: '✔ 2. Cognitive Reframing', desc: 'Shift from "I can\'t" to "One step at a time"' },
        { label: '✔ 3. STOP Technique', desc: 'Stop, Take a breath, Observe, Proceed' },
        { label: '✔ 4. Evidence Testing', desc: 'Weigh facts against fear assumptions' },
        { label: '✔ 5. Behavioural Activation', desc: 'Micro-actions that signal safety to your brain' }
      ]
    }
  },
  {
    id: 7,
    title: 'ENDING & OUTRO',
    subtitle: 'Train Your Mind. Transform Your Life.',
    startTime: 585,
    endTime: 600, // 15 Seconds
    narration: "Thank you for joining Path to Inner Peace. Remember... You don't have to control every thought. You only have to choose how you respond.",
    visualSummary: 'Therapist smiling warmly with Path to Inner Peace golden crest overlay.',
    displayElements: {
      badge: 'PATH TO INNER PEACE',
      headline: 'Train Your Mind. Transform Your Life.',
      steps: [
        { label: 'Daily Mental Fitness', desc: 'Practice 1 CBT technique daily in your Journal' },
        { label: 'Follow for More', desc: 'Guided meditations, sound therapy & CBT tools' }
      ]
    }
  }
];

export const Cbt12TechniquesVideo: React.FC<{ onComplete?: () => void }> = ({ onComplete }) => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(true);
  const [natureMusicEnabled, setNatureMusicEnabled] = useState<boolean>(true);
  const [showCaptions, setShowCaptions] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'video' | 'cheatsheet'>('video');

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const timerRef = useRef<any>(null);
  
  // Web Audio Context for natural ambience (Piano tones + forest wind + stream soft synth)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const pianoNodeRef = useRef<OscillatorNode | null>(null);
  const windNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Current active scene based on currentTime
  const currentScene = CBT_STRESS_SCENES.find(
    s => currentTime >= s.startTime && currentTime < s.endTime
  ) || CBT_STRESS_SCENES[CBT_STRESS_SCENES.length - 1];

  // Speech synthesis for warm, empathetic female therapist narration
  const speakSceneNarration = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.90 * playbackSpeed; // calm, slow speaking
      utterance.pitch = 1.02; // warm reassuring tone
      
      const voices = window.speechSynthesis.getVoices();
      const femaleVoice = voices.find(
        v => v.name.includes('Natural') || v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Zira') || v.name.includes('Google UK English Female')
      );
      if (femaleVoice) utterance.voice = femaleVoice;

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      console.warn('Speech synthesis error:', err);
    }
  };

  // Canvas Video Animation Engine (60 FPS Animated Video Renderer)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particleList: { x: number; y: number; r: number; alpha: number; speedX: number; speedY: number }[] = [];

    // Initialize 50 floating gold dust particles
    for (let i = 0; i < 50; i++) {
      particleList.push({
        x: Math.random() * 1280,
        y: Math.random() * 720,
        r: Math.random() * 3 + 1,
        alpha: Math.random() * 0.6 + 0.2,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: -(Math.random() * 0.5 + 0.2)
      });
    }

    let cloudX = 0;

    const renderVideoFrame = (timestamp: number) => {
      canvas.width = 1280;
      canvas.height = 720;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const sceneId = currentScene.id;

      // 1. VOLUMETRIC SUNBEAMS & LIGHTING
      const rayGradient = ctx.createLinearGradient(0, 0, 1280, 720);
      rayGradient.addColorStop(0, 'rgba(212, 175, 55, 0.15)');
      rayGradient.addColorStop(0.5, 'rgba(20, 184, 166, 0.08)');
      rayGradient.addColorStop(1, 'rgba(15, 23, 42, 0.2)');
      ctx.fillStyle = rayGradient;
      ctx.fillRect(0, 0, 1280, 720);

      // Light shaft rays
      const shift = Math.sin(timestamp * 0.001) * 30;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(100 + shift, 0);
      ctx.lineTo(400 + shift, 0);
      ctx.lineTo(800 + shift, 720);
      ctx.lineTo(400 + shift, 720);
      ctx.closePath();
      ctx.fillStyle = 'rgba(255, 240, 200, 0.06)';
      ctx.fill();
      ctx.restore();

      // 2. THERAPIST CHARACTER LIP SYNC & BREATHING ANIMATION OVERLAY
      if (isPlaying) {
        // Lip sync wave
        const lipOpen = Math.abs(Math.sin(timestamp * 0.015)) * 6;
        ctx.save();
        ctx.beginPath();
        // Lip overlay on therapist image location
        ctx.ellipse(640, 360, 12, 4 + lipOpen, 0, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(230, 140, 140, 0.18)';
        ctx.fill();
        ctx.restore();

        // Subtle eye blink
        const blinkCycle = Math.sin(timestamp * 0.002);
        if (blinkCycle > 0.97) {
          ctx.save();
          ctx.fillStyle = 'rgba(20, 20, 25, 0.4)';
          ctx.fillRect(610, 310, 60, 8);
          ctx.restore();
        }
      }

      // 3. SCENE-SPECIFIC DYNAMIC ANIMATED GRAPHICS
      if (sceneId === 0) {
        // OPENING: Golden 3D Aperture Ring & Flare
        const angle = timestamp * 0.001;
        ctx.save();
        ctx.translate(640, 360);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.arc(0, 0, 160 + Math.sin(timestamp * 0.003) * 10, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(212, 175, 55, 0.35)';
        ctx.lineWidth = 3;
        ctx.setLineDash([15, 10]);
        ctx.stroke();
        ctx.restore();
      } else if (sceneId === 1) {
        // TECHNIQUE 1: Animated Notebook Pen Writing Lines
        const writeLen = Math.min(400, (timestamp * 0.15) % 500);
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(440, 520);
        ctx.lineTo(440 + writeLen, 520);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 3;
        ctx.stroke();

        // Glowing Pen Tip
        ctx.beginPath();
        ctx.arc(440 + writeLen, 520, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#10B981';
        ctx.fill();
        ctx.restore();
      } else if (sceneId === 2) {
        // TECHNIQUE 2: Storm Clouds Dissolving into Golden Sunburst
        cloudX = (cloudX + 0.5) % 1280;
        ctx.save();
        ctx.beginPath();
        ctx.arc(200 + cloudX, 150, 70, 0, Math.PI * 2);
        ctx.arc(270 + cloudX, 130, 90, 0, Math.PI * 2);
        ctx.arc(340 + cloudX, 150, 70, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(15, 23, 42, 0.35)';
        ctx.fill();

        // Sunburst rays
        const sunGlow = ctx.createRadialGradient(640, 360, 20, 640, 360, 300);
        sunGlow.addColorStop(0, 'rgba(251, 191, 36, 0.25)');
        sunGlow.addColorStop(1, 'rgba(251, 191, 36, 0)');
        ctx.fillStyle = sunGlow;
        ctx.fillRect(0, 0, 1280, 720);
        ctx.restore();
      } else if (sceneId === 3) {
        // TECHNIQUE 3: S.T.O.P. Animated Breathing Circle & Pulse Graph
        const breathRadius = 90 + Math.sin(timestamp * 0.0015) * 45;
        ctx.save();
        ctx.beginPath();
        ctx.arc(640, 340, breathRadius, 0, Math.PI * 2);
        ctx.strokeStyle = '#6366F1';
        ctx.lineWidth = 6;
        ctx.shadowBlur = 20;
        ctx.shadowColor = '#6366F1';
        ctx.stroke();

        // Heart rate ECG Wave Line at bottom
        ctx.beginPath();
        ctx.moveTo(100, 650);
        for (let x = 100; x < 1180; x += 20) {
          const y = 650 + (x % 100 === 0 ? Math.sin((x + timestamp * 0.2) * 0.1) * 25 : 0);
          ctx.lineTo(x, y);
        }
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.restore();
      } else if (sceneId === 4) {
        // TECHNIQUE 4: Courtroom Balance Scale Tilting
        const tilt = Math.sin(timestamp * 0.002) * 0.12;
        ctx.save();
        ctx.translate(640, 280);
        ctx.rotate(tilt);
        // Scale Bar
        ctx.beginPath();
        ctx.moveTo(-180, 0);
        ctx.lineTo(180, 0);
        ctx.strokeStyle = '#D4AF37';
        ctx.lineWidth = 6;
        ctx.stroke();
        // Left Pan (Fear)
        ctx.beginPath();
        ctx.arc(-180, 70, 45, 0, Math.PI);
        ctx.strokeStyle = '#F43F5E';
        ctx.lineWidth = 3;
        ctx.stroke();
        // Right Pan (Facts - Heavy)
        ctx.beginPath();
        ctx.arc(180, 85, 55, 0, Math.PI);
        ctx.strokeStyle = '#10B981';
        ctx.lineWidth = 4;
        ctx.stroke();
        ctx.restore();
      } else if (sceneId === 5) {
        // TECHNIQUE 5: Dopamine Micro-Action Energy Stream
        const flowStep = (timestamp * 0.3) % 400;
        ctx.save();
        ctx.beginPath();
        ctx.arc(440 + flowStep, 450 - Math.sin(flowStep * 0.015) * 60, 6, 0, Math.PI * 2);
        ctx.fillStyle = '#38BDF8';
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#38BDF8';
        ctx.fill();
        ctx.restore();
      }

      // 4. FLOATING DUST BOKEH PARTICLES
      particleList.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${p.alpha})`;
        ctx.fill();

        p.y += p.speedY;
        p.x += p.speedX;
        if (p.y < 0) p.y = 720;
        if (p.x < 0) p.x = 1280;
        if (p.x > 1280) p.x = 0;
      });

      // 5. VIDEO RECORDING HUD BADGE
      if (isPlaying) {
        ctx.save();
        // Red Recording Dot
        ctx.beginPath();
        ctx.arc(40, 40, 6, 0, Math.PI * 2);
        ctx.fillStyle = Math.sin(timestamp * 0.005) > 0 ? '#EF4444' : '#991B1B';
        ctx.fill();

        ctx.fillStyle = '#FFFFFF';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.fillText('REC • HD 1080p • 60 FPS ANIMATED VIDEO', 55, 44);

        // Audio Equalizer Spectrum Bar Visualizer
        for (let i = 0; i < 8; i++) {
          const h = 6 + Math.abs(Math.sin(timestamp * 0.01 + i)) * 14;
          ctx.fillStyle = '#10B981';
          ctx.fillRect(360 + i * 6, 44 - h, 4, h);
        }
        ctx.restore();
      }

      animId = requestAnimationFrame(renderVideoFrame);
    };

    animId = requestAnimationFrame(renderVideoFrame);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying, currentScene.id]);

  // Start Natural Ambience (Soft piano tones, forest wind, water stream)
  const startNatureAmbience = () => {
    if (!natureMusicEnabled) return;
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        audioCtxRef.current.resume();
      }

      if (!gainNodeRef.current) {
        const masterGain = audioCtxRef.current.createGain();
        masterGain.gain.setValueAtTime(0.06, audioCtxRef.current.currentTime);
        masterGain.connect(audioCtxRef.current.destination);
        gainNodeRef.current = masterGain;

        // Soft calming piano root chord (174 Hz Solfeggio / pain & stress relief)
        const osc = audioCtxRef.current.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(174, audioCtxRef.current.currentTime);
        
        // Gentle LFO filter to simulate breeze / stream oscillation
        const lfo = audioCtxRef.current.createOscillator();
        lfo.type = 'sine';
        lfo.frequency.setValueAtTime(0.15, audioCtxRef.current.currentTime);
        const lfoGain = audioCtxRef.current.createGain();
        lfoGain.gain.setValueAtTime(10, audioCtxRef.current.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(masterGain);
        osc.start();
        pianoNodeRef.current = osc;
      }
    } catch (e) {
      console.warn('Web Audio Ambience error:', e);
    }
  };

  const stopNatureAmbience = () => {
    try {
      if (pianoNodeRef.current) {
        pianoNodeRef.current.stop();
        pianoNodeRef.current.disconnect();
        pianoNodeRef.current = null;
      }
      if (gainNodeRef.current) {
        gainNodeRef.current.disconnect();
        gainNodeRef.current = null;
      }
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    } catch (e) {
      console.warn('Stop ambience error:', e);
    }
  };

  // Timer loop when video is playing (Smooth 100ms updates)
  useEffect(() => {
    if (isPlaying) {
      startNatureAmbience();
      timerRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= 600) {
            setIsPlaying(false);
            if (onComplete) onComplete();
            return 600;
          }
          return prev + 0.1;
        });
      }, 100 / playbackSpeed);
    } else {
      clearInterval(timerRef.current);
      stopNatureAmbience();
    }

    return () => {
      clearInterval(timerRef.current);
    };
  }, [isPlaying, playbackSpeed, natureMusicEnabled]);

  // Handle scene voice changes when entering a new scene
  const prevSceneIdRef = useRef<number | null>(null);
  useEffect(() => {
    if (isPlaying && currentScene.id !== prevSceneIdRef.current) {
      prevSceneIdRef.current = currentScene.id;
      speakSceneNarration(currentScene.narration);
    }
  }, [currentScene.id, isPlaying, voiceEnabled]);

  const handlePlayPause = () => {
    if (!isPlaying) {
      setIsPlaying(true);
      speakSceneNarration(currentScene.narration);
    } else {
      setIsPlaying(false);
    }
  };

  const handleSeek = (newTime: number) => {
    const clamped = Math.max(0, Math.min(600, newTime));
    setCurrentTime(clamped);
    if (isPlaying) {
      const scene = CBT_STRESS_SCENES.find(s => clamped >= s.startTime && clamped < s.endTime) || CBT_STRESS_SCENES[0];
      speakSceneNarration(scene.narration);
    }
  };

  const jumpToScene = (sceneId: number) => {
    const targetScene = CBT_STRESS_SCENES.find(s => s.id === sceneId);
    if (targetScene) {
      handleSeek(targetScene.startTime);
      setIsPlaying(true);
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(prev => !prev);
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

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

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-6xl mx-auto py-2 space-y-6 animate-fadeIn">
      
      {/* Top Header Controls Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gradient-to-r from-[#0F4C45] via-[#134E4A] to-slate-900 text-white p-4 sm:p-5 rounded-3xl shadow-xl border border-emerald-500/30">
        <div>
          <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest mb-1">
            <Sparkles className="w-3 h-3" />
            <span>PATH TO INNER PEACE — 10 MIN VIDEO MASTERCLASS</span>
          </div>
          <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
            5 CBT Techniques to Instantly Release Stress
          </h2>
        </div>

        {/* View Mode Switcher & Fullscreen Button */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-white/10 shrink-0">
            <button
              onClick={() => setActiveTab('video')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'video'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Animated Video</span>
            </button>
            <button
              onClick={() => setActiveTab('cheatsheet')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                activeTab === 'cheatsheet'
                  ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 shadow-md'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>5 Techniques Guide</span>
            </button>
          </div>

          <button
            onClick={toggleFullscreen}
            className="px-3 py-2.5 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5 shadow-lg border border-amber-300"
            title={isFullscreen ? "Exit Fullscreen (ESC)" : "Expand Video Full Screen"}
          >
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            <span className="hidden sm:inline">{isFullscreen ? 'Exit Full Screen' : 'Expand Full Screen'}</span>
          </button>
        </div>
      </div>

      {activeTab === 'video' ? (
        /* MAIN VIDEO PLAYER DISPLAY (Netflix documentary style) */
        <div 
          ref={containerRef} 
          className={`relative bg-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 transition-all duration-300 ${
            isFullscreen ? 'fixed inset-0 z-[99999] rounded-none h-screen w-screen border-none p-0' : ''
          }`}
        >
          {/* VIDEO DISPLAY STAGE (16:9 Aspect Ratio) */}
          <div 
            onClick={() => handlePlayPause()}
            className="relative aspect-video w-full bg-slate-950 overflow-hidden flex flex-col justify-between p-4 sm:p-8 text-white select-none cursor-pointer group"
          >
            
            {/* Background Hyper-Realistic 3D Psychologist Therapy Room Render */}
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={therapistImg} 
                alt="Hyper-realistic 3D female psychologist in wellness therapy room" 
                className={`w-full h-full object-cover transition-transform duration-[12000ms] ease-out ${
                  isPlaying ? 'scale-110 translate-y-[-5px] filter brightness-105' : 'scale-100 brightness-90'
                }`}
              />
              {/* Soft Palette Overlay: Soft Emerald Green (#0F4C45) & Deep Gold Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/30" />
              <div className="absolute inset-0 bg-[#0F4C45]/20 mix-blend-overlay" />

              {/* Live 60 FPS Animated Video Canvas */}
              <canvas 
                ref={canvasRef} 
                className="absolute inset-0 w-full h-full object-cover pointer-events-none z-10" 
              />

              {/* Animated Motion Video Dust Particles & Light Beams when playing */}
              {isPlaying && (
                <div className="absolute inset-0 pointer-events-none z-0">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-transparent to-amber-400/10 animate-pulse" />
                  <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl animate-ping opacity-40" />
                </div>
              )}
            </div>

            {/* TOP OVERLAY: Current Technique Title & Scene Jumper */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 flex items-center justify-between gap-4 bg-slate-950/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <span className={`w-3 h-3 rounded-full block ${isPlaying ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                  {isPlaying && <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />}
                </div>
                <div>
                  <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#D4AF37]">
                    {currentScene.displayElements.badge}
                  </div>
                  <h3 className="font-heading font-bold text-xs sm:text-sm text-white truncate max-w-xs sm:max-w-md">
                    {currentScene.title}: {currentScene.subtitle}
                  </h3>
                </div>
              </div>

              {/* Therapist Speaking Audio Wave Indicator */}
              {isPlaying && voiceEnabled && (
                <div className="hidden sm:flex items-center gap-1 bg-emerald-950/90 px-3 py-1 rounded-full border border-emerald-500/40 text-[10px] text-emerald-300 font-bold">
                  <span className="w-1 h-3 bg-emerald-400 animate-pulse" />
                  <span className="w-1 h-4 bg-emerald-400 animate-pulse delay-75" />
                  <span className="w-1 h-2 bg-emerald-400 animate-pulse delay-150" />
                  <span className="ml-1 uppercase tracking-wider">Therapist Speaking</span>
                </div>
              )}

              <div className="flex items-center gap-2">
                {/* Scene Dropdown Jumper */}
                <select
                  value={currentScene.id}
                  onChange={(e) => jumpToScene(Number(e.target.value))}
                  className="bg-slate-900/90 text-slate-200 border border-white/20 text-[11px] font-semibold rounded-xl px-2.5 py-1 focus:outline-none cursor-pointer"
                >
                  {CBT_STRESS_SCENES.map(scene => (
                    <option key={scene.id} value={scene.id}>
                      {scene.id === 0 ? '0. Opening' : scene.id === 6 ? '6. Summary' : scene.id === 7 ? '7. Outro' : `${scene.id}. ${scene.title.replace('TECHNIQUE ', '')}`}
                    </option>
                  ))}
                </select>

                {/* Fullscreen Expand Button */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold hover:brightness-110 transition-all shadow-md flex items-center gap-1 text-[11px]"
                  title={isFullscreen ? "Exit Fullscreen (ESC)" : "Expand Video Full Screen"}
                >
                  {isFullscreen ? <Minimize className="w-3.5 h-3.5" /> : <Maximize className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline font-black uppercase text-[10px]">{isFullscreen ? 'Exit' : 'Full Screen'}</span>
                </button>
              </div>
            </div>

            {/* CENTER PLAY BUTTON OVERLAY WHEN PAUSED */}
            {!isPlaying && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-950/60 backdrop-blur-sm transition-all group-hover:bg-slate-950/50">
                <div className="relative group/btn">
                  <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#D4AF37] opacity-75 blur-lg animate-pulse" />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handlePlayPause();
                    }}
                    className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 flex items-center justify-center shadow-2xl transition-transform transform group-hover/btn:scale-110 active:scale-95 border-4 border-white/80"
                  >
                    <Play className="w-10 h-10 sm:w-12 sm:h-12 fill-slate-950 ml-1.5" />
                  </button>
                </div>

                <div className="mt-4 text-center space-y-1">
                  <span className="inline-block px-4 py-1 bg-slate-950/90 text-[#D4AF37] border border-[#D4AF37]/50 rounded-full text-xs font-extrabold uppercase tracking-widest shadow-xl">
                    CLICK TO PLAY ANIMATED VIDEO
                  </span>
                  <p className="text-xs text-slate-200 font-medium drop-shadow-md">
                    10-Minute HD CBT Masterclass with Therapist Audio
                  </p>
                </div>
              </div>
            )}

            {/* CENTER STAGE: ANIMATED EDUCATIONAL DIAGRAM CARD */}
            <div className="relative z-10 my-auto py-2 px-2 sm:px-6 max-w-3xl mx-auto w-full text-center">
              
              {currentScene.id === 0 && (
                /* OPENING SCENE */
                <ScrollReveal variant="fade">
                  <div className="bg-slate-950/85 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/40 shadow-2xl space-y-4">
                    <span className="inline-block px-3 py-1 bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40 text-xs font-extrabold rounded-full uppercase tracking-widest">
                      Path to Inner Peace Video
                    </span>
                    <h2 className="font-heading font-extrabold text-xl sm:text-3xl gold-text">
                      5 CBT Techniques to Instantly Release Stress
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-200 font-inter leading-relaxed max-w-lg mx-auto">
                      "Stress isn't just in your mind—it affects your body, emotions and everyday life. Today, I'll guide you through five powerful CBT techniques to reduce stress naturally."
                    </p>
                  </div>
                </ScrollReveal>
              )}

              {currentScene.id === 1 && (
                /* TECHNIQUE 1: THOUGHT RECORD ANIMATED CARD */
                <div className="bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-[#D4AF37] animate-pulse" />
                      <h3 className="font-heading font-bold text-base sm:text-xl text-white">
                        Technique 1: 5-Step Thought Record Notebook
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase font-extrabold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700/50">
                      Deconstruct Anxiety
                    </span>
                  </div>

                  {/* Flow Steps / Pillars */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 text-left">
                    {currentScene.displayElements.steps.map((step, idx) => (
                      <div key={idx} className="bg-white/5 hover:bg-white/10 p-3 rounded-2xl border border-white/10 transition-all">
                        <span className="text-[10px] font-extrabold text-[#D4AF37] block uppercase tracking-wider mb-0.5">
                          {step.label}
                        </span>
                        <p className="text-xs text-slate-200 leading-snug">
                          {step.desc}
                        </p>
                      </div>
                    ))}
                  </div>

                  {currentScene.displayElements.exampleText && (
                    <div className="bg-emerald-950/80 p-3 rounded-xl border border-emerald-500/30 text-xs text-emerald-200 italic text-left flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                      <span>{currentScene.displayElements.exampleText}</span>
                    </div>
                  )}
                </div>
              )}

              {currentScene.id === 2 && (
                /* TECHNIQUE 2: COGNITIVE REFRAMING ANIMATED CLOUD CLEARING */
                <div className="bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-amber-500/40 shadow-2xl space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Sun className="w-5 h-5 text-amber-400 animate-spin" style={{ animationDuration: '20s' }} />
                      <h3 className="font-heading font-bold text-base sm:text-xl text-white">
                        Technique 2: Cognitive Reframing (Clouds → Sun)
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase font-extrabold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-700/50">
                      Transform Perspective
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                    <div className="bg-rose-950/40 border border-rose-800/40 p-3 rounded-2xl">
                      <span className="text-[10px] font-extrabold text-rose-400 uppercase tracking-wider block mb-1">
                        ☁️ Dark Thought Cloud
                      </span>
                      <p className="text-xs text-rose-100 font-medium">
                        "I can't handle this. Everything is falling apart."
                      </p>
                    </div>

                    <div className="bg-amber-950/40 border border-amber-800/40 p-3 rounded-2xl flex flex-col justify-center items-center text-center">
                      <span className="text-xl mb-1">☀️</span>
                      <span className="text-[10px] font-extrabold text-amber-300 uppercase tracking-wider">
                        Reframe Pivot
                      </span>
                      <span className="text-[11px] text-slate-300 mt-1">
                        Pause & Choose Wisdom
                      </span>
                    </div>

                    <div className="bg-emerald-950/40 border border-emerald-800/40 p-3 rounded-2xl">
                      <span className="text-[10px] font-extrabold text-emerald-400 uppercase tracking-wider block mb-1">
                        ✨ Clear Sky Reframe
                      </span>
                      <p className="text-xs text-emerald-100 font-medium">
                        "This is difficult, but I can take one step at a time."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentScene.id === 3 && (
                /* TECHNIQUE 3: ANIMATED S.T.O.P. BREATHING CIRCLE */
                <div className="bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-indigo-500/40 shadow-2xl space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Wind className="w-5 h-5 text-indigo-400 animate-pulse" />
                      <h3 className="font-heading font-bold text-base sm:text-xl text-white">
                        Technique 3: S.T.O.P. Emergency Breathing Reset
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase font-extrabold text-indigo-300 bg-indigo-950/80 px-2.5 py-1 rounded-full border border-indigo-700/50">
                      Circuit Breaker
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-left">
                    <div className="bg-white/5 p-2.5 rounded-xl border border-indigo-500/30 text-center">
                      <span className="text-lg font-black text-amber-400 block">S</span>
                      <span className="text-[10px] font-bold text-white uppercase">Stop</span>
                      <p className="text-[10px] text-slate-300 mt-0.5">Freeze reaction</p>
                    </div>
                    <div className="bg-white/5 p-2.5 rounded-xl border border-indigo-500/30 text-center">
                      <span className="text-lg font-black text-emerald-400 block">T</span>
                      <span className="text-[10px] font-bold text-white uppercase">Take a Breath</span>
                      <p className="text-[10px] text-slate-300 mt-0.5">Slow 4s inhale</p>
                    </div>
                    <div className="bg-white/5 p-2.5 rounded-xl border border-indigo-500/30 text-center">
                      <span className="text-lg font-black text-cyan-400 block">O</span>
                      <span className="text-[10px] font-bold text-white uppercase">Observe</span>
                      <p className="text-[10px] text-slate-300 mt-0.5">Notice tension</p>
                    </div>
                    <div className="bg-white/5 p-2.5 rounded-xl border border-indigo-500/30 text-center">
                      <span className="text-lg font-black text-purple-400 block">P</span>
                      <span className="text-[10px] font-bold text-white uppercase">Proceed</span>
                      <p className="text-[10px] text-slate-300 mt-0.5">Act with wisdom</p>
                    </div>
                  </div>
                </div>
              )}

              {currentScene.id === 4 && (
                /* TECHNIQUE 4: ANIMATED EVIDENCE WEIGHING SCALE */
                <div className="bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-amber-500/40 shadow-2xl space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Scale className="w-5 h-5 text-amber-400" />
                      <h3 className="font-heading font-bold text-base sm:text-xl text-white">
                        Technique 4: Evidence Testing Courtroom Scale
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase font-extrabold text-amber-300 bg-amber-950/80 px-2.5 py-1 rounded-full border border-amber-700/50">
                      Facts Over Fear
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-left">
                    <div className="bg-rose-950/30 border border-rose-800/40 p-3 rounded-2xl">
                      <span className="text-[10px] font-extrabold text-rose-400 uppercase block mb-1">
                        Left: Evidence FOR Fear (Light Weight)
                      </span>
                      <p className="text-xs text-rose-100">
                        • "I stumbled over one word during practice."
                      </p>
                    </div>

                    <div className="bg-emerald-950/40 border border-emerald-800/40 p-3 rounded-2xl">
                      <span className="text-[10px] font-extrabold text-emerald-400 uppercase block mb-1">
                        Right: Evidence AGAINST Fear (Heavy Weight)
                      </span>
                      <p className="text-xs text-emerald-100">
                        • "Prepared 10 hrs & received top praise on 5 past projects."
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {currentScene.id === 5 && (
                /* TECHNIQUE 5: BEHAVIOURAL ACTIVATION LOOP */
                <div className="bg-slate-950/90 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-emerald-500/40 shadow-2xl space-y-4 animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-emerald-400 animate-bounce" />
                      <h3 className="font-heading font-bold text-base sm:text-xl text-white">
                        Technique 5: Behavioural Activation Loop
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase font-extrabold text-emerald-300 bg-emerald-950/80 px-2.5 py-1 rounded-full border border-emerald-700/50">
                      Signal Safety
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-left">
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] font-extrabold text-amber-400 block uppercase mb-1">1. Couch Freeze</span>
                      <p className="text-xs text-slate-300">Overwhelmed inertia tells you to stop</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] font-extrabold text-emerald-400 block uppercase mb-1">2. Micro-Action</span>
                      <p className="text-xs text-slate-300">Walk, stretch, drink water, water plants</p>
                    </div>
                    <div className="bg-white/5 p-3 rounded-2xl border border-white/10">
                      <span className="text-[10px] font-extrabold text-cyan-400 block uppercase mb-1">3. Brain Safety Signal</span>
                      <p className="text-xs text-slate-300">Small action signals safety to nervous system</p>
                    </div>
                  </div>
                </div>
              )}

              {currentScene.id === 6 && (
                /* FINAL SUMMARY SCENE */
                <div className="bg-slate-950/90 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-[#D4AF37]/50 shadow-2xl space-y-4">
                  <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest bg-[#D4AF37]/20 px-3 py-1 rounded-full border border-[#D4AF37]/40">
                    Final Summary
                  </span>
                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white">
                    5 CBT Techniques to Release Stress
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left text-xs text-slate-200">
                    {currentScene.displayElements.steps.map((s, idx) => (
                      <div key={idx} className="bg-white/5 p-2.5 rounded-xl border border-white/10 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        <span><strong>{s.label}</strong>: {s.desc}</span>
                      </div>
                    ))}
                  </div>
                  <p className="text-xs text-emerald-200 italic pt-2">
                    "You don't have to use all five techniques today. Choose just one. Practice it daily. Small changes create lasting transformation."
                  </p>
                </div>
              )}

              {currentScene.id === 7 && (
                /* ENDING OUTRO SCENE */
                <div className="bg-gradient-to-br from-emerald-950 to-slate-950 p-8 rounded-3xl border border-[#D4AF37] shadow-2xl text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] flex items-center justify-center mx-auto text-2xl font-bold">
                    🌿
                  </div>
                  <h2 className="font-heading font-extrabold text-2xl sm:text-3xl gold-text">
                    Path to Inner Peace
                  </h2>
                  <p className="text-sm text-white font-medium">
                    Train Your Mind. Transform Your Life.
                  </p>
                  <p className="text-xs text-emerald-200 italic">
                    Follow for more Mental Fitness practices.
                  </p>
                  <button
                    onClick={() => handleSeek(0)}
                    className="mt-2 px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:brightness-110 transition-all inline-flex items-center gap-2"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>Replay Video</span>
                  </button>
                </div>
              )}

            </div>

            {/* CLOSED CAPTION SUBTITLES OVERLAY */}
            {showCaptions && (
              <div className="relative z-10 max-w-2xl mx-auto w-full text-center my-2">
                <div className="inline-block bg-slate-950/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-white/20 text-xs sm:text-sm text-emerald-100 font-medium leading-relaxed shadow-xl">
                  💬 <span className="text-white italic">"{currentScene.narration}"</span>
                </div>
              </div>
            )}

            {/* BOTTOM VIDEO CONTROLS BAR */}
            <div className="relative z-10 space-y-2 bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/10">
              
              {/* Scrub Timeline */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-300 w-10 text-right">
                  {formatTime(currentTime)}
                </span>

                <div className="relative flex-1 h-2 bg-slate-800 rounded-full cursor-pointer group">
                  <input
                    type="range"
                    min={0}
                    max={600}
                    value={currentTime}
                    onChange={(e) => handleSeek(Number(e.target.value))}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  />
                  <div 
                    className="h-full bg-gradient-to-r from-[#0F4C45] via-[#D4AF37] to-amber-400 rounded-full transition-all"
                    style={{ width: `${(currentTime / 600) * 100}%` }}
                  />
                </div>

                <span className="text-xs font-mono text-slate-400 w-10">
                  10:00
                </span>
              </div>

              {/* Control Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                
                {/* Play / Rewind / Fast Forward */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePlayPause}
                    className="w-9 h-9 rounded-xl bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 flex items-center justify-center font-bold shadow-md hover:brightness-110 active:scale-95 transition-all"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
                  </button>

                  <button
                    onClick={() => handleSeek(currentTime - 10)}
                    title="Rewind 10s"
                    className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>

                  <button
                    onClick={() => handleSeek(currentTime + 10)}
                    title="Forward 10s"
                    className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-xl transition-all"
                  >
                    <RotateCw className="w-4 h-4" />
                  </button>
                </div>

                {/* Voice, Nature Ambience, CC, Speed */}
                <div className="flex items-center gap-2 text-xs">
                  
                  {/* Voice Narration */}
                  <button
                    onClick={() => {
                      const next = !voiceEnabled;
                      setVoiceEnabled(next);
                      if (!next && 'speechSynthesis' in window) window.speechSynthesis.cancel();
                      else if (next) speakSceneNarration(currentScene.narration);
                    }}
                    className={`px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1 ${
                      voiceEnabled
                        ? 'bg-emerald-900/60 border-emerald-500/50 text-emerald-200'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    {voiceEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
                    <span className="hidden sm:inline">Therapist Voice</span>
                  </button>

                  {/* Soft Nature Ambience */}
                  <button
                    onClick={() => setNatureMusicEnabled(!natureMusicEnabled)}
                    className={`px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1 ${
                      natureMusicEnabled
                        ? 'bg-amber-950/60 border-amber-500/50 text-amber-200'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    <Wind className="w-3.5 h-3.5 text-amber-400" />
                    <span className="hidden sm:inline">Nature Ambience</span>
                  </button>

                  {/* Subtitles (CC) */}
                  <button
                    onClick={() => setShowCaptions(!showCaptions)}
                    className={`px-2.5 py-1.5 rounded-xl border transition-all flex items-center gap-1 ${
                      showCaptions
                        ? 'bg-indigo-950/60 border-indigo-500/50 text-indigo-200'
                        : 'bg-slate-900 border-slate-700 text-slate-400'
                    }`}
                  >
                    <Subtitles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">CC</span>
                  </button>

                  {/* Speed */}
                  <select
                    value={playbackSpeed}
                    onChange={(e) => setPlaybackSpeed(Number(e.target.value))}
                    className="bg-slate-900 text-slate-300 border border-slate-700 rounded-xl px-2 py-1 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value={0.75}>0.75x</option>
                    <option value={1}>1.0x</option>
                    <option value={1.25}>1.25x</option>
                    <option value={1.5}>1.5x</option>
                  </select>

                </div>

                {/* Fullscreen Button */}
                <div>
                  <button
                    onClick={toggleFullscreen}
                    className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-[#D4AF37] border border-[#D4AF37]/50 rounded-xl transition-all font-bold text-xs flex items-center gap-1.5 shadow-sm"
                    title={isFullscreen ? "Exit Fullscreen (ESC)" : "Expand Video Full Screen"}
                  >
                    {isFullscreen ? <Minimize className="w-4 h-4 text-amber-400" /> : <Maximize className="w-4 h-4 text-amber-400" />}
                    <span>{isFullscreen ? 'Exit Full Screen' : 'Full Screen'}</span>
                  </button>
                </div>

              </div>

            </div>

          </div>
        </div>
      ) : (
        /* REFERENCE CHEATSHEET TAB */
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#0F4C45]">
                PRACTITIONER REFERENCE
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-slate-900 mt-1">
                5 CBT Techniques to Instantly Release Stress
              </h2>
            </div>
            <span className="px-3 py-1 bg-emerald-50 text-[#0F4C45] font-bold text-xs rounded-full border border-emerald-200">
              10-Minute Masterclass Guide
            </span>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {CBT_STRESS_SCENES.filter(s => s.id >= 1 && s.id <= 5).map((tech) => (
              <StaggerItem key={tech.id} variant="scale">
                <div 
                  onClick={() => {
                    jumpToScene(tech.id);
                    setActiveTab('video');
                  }}
                  className="bg-slate-50 hover:bg-emerald-50/60 p-5 rounded-2xl border border-slate-200 hover:border-emerald-300 transition-all cursor-pointer group flex flex-col justify-between space-y-3 h-full shadow-sm hover:shadow"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-extrabold uppercase bg-[#0F4C45] text-white px-2.5 py-0.5 rounded-full">
                        Technique {tech.id}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-400 group-hover:text-[#0F4C45]">
                        {formatTime(tech.startTime)}
                      </span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-900 group-hover:text-[#0F4C45]">
                      {tech.title.replace(`TECHNIQUE ${tech.id}: `, '')}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                      {tech.subtitle}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs font-bold text-[#0F4C45]">
                    <span>Watch Scene</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      )}

    </div>
  );
};
