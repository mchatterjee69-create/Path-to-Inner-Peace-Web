import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Clock, 
  Sparkles, 
  Info, 
  Headphones, 
  Radio, 
  Music, 
  Activity, 
  RotateCcw,
  Waves,
  Disc,
  Repeat,
  Volume1,
  Trash2,
  Sliders,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface SoundTrack {
  id: string;
  title: string;
  subtitle: string;
  category: 'binaural' | 'crystal_bowls' | 'gong_bath' | 'solfeggio' | 'nature' | 'instruments';
  categoryLabel: string;
  frequency: string;
  audioUrl: string;
  description: string;
  benefits: string[];
  chakaColor: string;
  bgGradient: string;
  recommendedDuration: string;
}

const SOUND_TRACKS: SoundTrack[] = [
  // 1. BINAURAL BEATS
  {
    id: 'binaural-theta-6hz',
    title: '6 Hz Theta Deep Meditation',
    subtitle: 'Dual-Channel Brainwave Entrainment (200 Hz / 206 Hz)',
    category: 'binaural',
    categoryLabel: 'Binaural Beats',
    frequency: '6 Hz Theta Wave',
    audioUrl: 'https://www.image2url.com/r2/default/audio/1786110503048-d40f8f8b-287c-4eac-8750-8146fa2acca2.mp3',
    description: 'Stereophonic binaural pulse with a 6 Hz frequency differential between left and right ears. Naturally guides the brain into deep theta meditation, subconscious stress release, and restorative calm.',
    benefits: ['Calms mental chatter', 'Encourages theta brainwave entrainment', 'Enhances deep meditation state'],
    chakaColor: '#8B5CF6',
    bgGradient: 'from-purple-950 via-indigo-950 to-slate-900',
    recommendedDuration: '20 Mins'
  },
  {
    id: 'binaural-alpha-10hz',
    title: '10 Hz Alpha Mindful Focus',
    subtitle: 'Relaxed Alertness & Cognitive Flow (210 Hz / 220 Hz)',
    category: 'binaural',
    categoryLabel: 'Binaural Beats',
    frequency: '10 Hz Alpha Wave',
    audioUrl: 'https://www.image2url.com/r2/default/audio/1786122511436-6e307797-0f5f-4c82-a765-1339a54ce996.mp3',
    description: 'Smooth 10 Hz alpha binaural tone engineered for effortless focus, creative problem solving, and anxiety-free productivity.',
    benefits: ['Sharpens cognitive focus', 'Dissolves workplace stress', 'Fosters calm mental clarity'],
    chakaColor: '#3B82F6',
    bgGradient: 'from-blue-950 via-teal-950 to-slate-900',
    recommendedDuration: '30 Mins'
  },
  {
    id: 'binaural-delta-3hz',
    title: '3 Hz Delta Restorative Sleep',
    subtitle: 'Slow-Wave Sleep Induction & Cellular Repair',
    category: 'binaural',
    categoryLabel: 'Binaural Beats',
    frequency: '3 Hz Delta Wave',
    audioUrl: 'https://assistant-jade-yrr4fikt.edgeone.dev/',
    description: 'Deep sub-audible delta wave pulses designed to slow heart rate, quiet evening insomnia, and induce restorative deep REM sleep.',
    benefits: ['Accelerates sleep onset', 'Promotes deep slow-wave sleep', 'Restores nervous system energy'],
    chakaColor: '#6366F1',
    bgGradient: 'from-indigo-950 via-slate-950 to-black',
    recommendedDuration: '45 Mins'
  },
  {
    id: 'binaural-gamma-40hz',
    title: '40 Hz Gamma High Focus',
    subtitle: 'High Cognitive Synthesis & Memory Encoding',
    category: 'binaural',
    categoryLabel: 'Binaural Beats',
    frequency: '40 Hz Gamma Wave',
    audioUrl: 'https://yammering-tan-aatr4wws.edgeone.dev/',
    description: 'Pulsating 40 Hz gamma binaural beat known to stimulate neural synchronization, mental agility, and heightened awareness.',
    benefits: ['Stimulates memory recall', 'Elevates mental alertness', 'Synchronizes cerebral hemispheres'],
    chakaColor: '#EC4899',
    bgGradient: 'from-pink-950 via-purple-950 to-slate-900',
    recommendedDuration: '15 Mins'
  },

  // 2. CRYSTAL SINGING BOWLS
  {
    id: 'bowls-frosted-quartz-432',
    title: '432 Hz Frosted Quartz Crystal Bowl',
    subtitle: 'Pure Crystalline Sound Bath',
    category: 'crystal_bowls',
    categoryLabel: 'Crystal Bowls',
    frequency: '432 Hz Sacred Quartz',
    audioUrl: 'https://www.image2url.com/r2/default/audio/1788332218938-2e736c6f-9eea-4a45-a0ed-34f6baf3a9c2.mp3',
    description: 'Authentic acoustic recording of 99.9% pure silica quartz singing bowls sustaining long, shimmering crystalline overtones tuned to 432 Hz.',
    benefits: ['Purifies cellular energy', 'Dissolves emotional tension', 'Deepens meditative absorption'],
    chakaColor: '#D4AF37',
    bgGradient: 'from-amber-950 via-yellow-950 to-slate-900',
    recommendedDuration: '20 Mins'
  },
  {
    id: 'bowls-emerald-528',
    title: '528 Hz Emerald Crystal Bowl',
    subtitle: 'Solar Plexus & Heart Harmonizer',
    category: 'crystal_bowls',
    categoryLabel: 'Crystal Bowls',
    frequency: '528 Hz Miracle Tone',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    description: 'Gemstone-infused quartz bowl emitting a soothing 528 Hz vibration that resonates deeply through the chest and vital energy centers.',
    benefits: ['Restores inner confidence', 'Opens heart chakra space', 'Eases chronic worry'],
    chakaColor: '#10B981',
    bgGradient: 'from-emerald-950 via-teal-900 to-slate-900',
    recommendedDuration: '20 Mins'
  },
  {
    id: 'bowls-crown-963',
    title: '963 Hz Crown Chakra Crystal Bowl',
    subtitle: 'Ethereal Divine Resonance',
    category: 'crystal_bowls',
    categoryLabel: 'Crystal Bowls',
    frequency: '963 Hz Crown Frequency',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    description: 'High-register crystal bowl sound bath designed to clear mental chatter and connect the listener to states of pure bliss and stillness.',
    benefits: ['Activates spiritual awareness', 'Calms overactive thinking', 'Fosters transcendent tranquility'],
    chakaColor: '#A855F7',
    bgGradient: 'from-purple-950 via-fuchsia-950 to-slate-900',
    recommendedDuration: '15 Mins'
  },

  // 3. GONG BATHS
  {
    id: 'gong-himalayan-temple',
    title: 'Deep Himalayan Temple Gong Bath',
    subtitle: 'Hand-Hammered 38-Inch Bronze Resonance',
    category: 'gong_bath',
    categoryLabel: 'Gong Bath',
    frequency: 'Deep Bass & Acoustic Overtones',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
    description: 'Slow, majestic strikes of a master bronze Chau gong. Rich sub-bass frequencies envelope the room, washing away deep-seated stress.',
    benefits: ['Releases physical somatic tension', 'Resets autonomic nervous system', 'Deeply therapeutic acoustic vibration'],
    chakaColor: '#F59E0B',
    bgGradient: 'from-amber-950 via-stone-900 to-black',
    recommendedDuration: '30 Mins'
  },
  {
    id: 'gong-cosmic-wind',
    title: 'Cosmic Wind Gong & Ocean Swells',
    subtitle: 'Atmospheric Swells & Soft Mallet Strikes',
    category: 'gong_bath',
    categoryLabel: 'Gong Bath',
    frequency: 'Multi-Harmonic Wind Shimmer',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
    description: 'Gentle mallet rolls on a handcrafted Wind Gong, creating continuous shimmering waves of acoustic sound that mimic the vast ocean.',
    benefits: ['Induces effortless relaxation', 'Clears stagnant emotional energy', 'Anchors mindful breathing'],
    chakaColor: '#06B6D4',
    bgGradient: 'from-cyan-950 via-teal-950 to-slate-900',
    recommendedDuration: '25 Mins'
  },
  {
    id: 'gong-paiste-chimes',
    title: 'Sacred Paiste Gong & Tibetan Chimes',
    subtitle: 'Harmonic Sound Bath & Tingsha Rings',
    category: 'gong_bath',
    categoryLabel: 'Gong Bath',
    frequency: 'Planetary & Bronze Harmonics',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
    description: 'Intertwined tones of planetary bronze gongs and high-pitched Tibetan tingsha bells for clearing energetic clutter in body and mind.',
    benefits: ['Refreshes spiritual vitality', 'Clears heavy mental energy', 'Enhances post-meditation clarity'],
    chakaColor: '#EAB308',
    bgGradient: 'from-yellow-950 via-amber-950 to-slate-900',
    recommendedDuration: '20 Mins'
  },

  // 4. SOLFEGGIO FREQUENCIES
  {
    id: 'solfeggio-174hz',
    title: '174 Hz Solfeggio Pain Relief',
    subtitle: 'Natural Acoustic Anesthetic & Grounding',
    category: 'solfeggio',
    categoryLabel: 'Solfeggio Frequencies',
    frequency: '174 Hz Anesthetic Tone',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
    description: 'The lowest Solfeggio tone acts as a natural acoustic anesthetic, providing physical organs with a sense of safety, stability, and ease.',
    benefits: ['Eases physical discomfort', 'Grounds nervous system', 'Promotes somatic relaxation'],
    chakaColor: '#EF4444',
    bgGradient: 'from-rose-950 via-stone-900 to-black',
    recommendedDuration: '20 Mins'
  },
  {
    id: 'solfeggio-396hz',
    title: '396 Hz Solfeggio Liberation',
    subtitle: 'Releasing Guilt, Fear & Subconscious Anxiety',
    category: 'solfeggio',
    categoryLabel: 'Solfeggio Frequencies',
    frequency: '396 Hz Root Solfeggio',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
    description: 'Grounding 396 Hz tone tailored to dissolve subconscious guilt, overcome limiting fears, and anchor unwavering confidence.',
    benefits: ['Clears guilt & self-doubt', 'Strengthens emotional security', 'Anchors root chakra'],
    chakaColor: '#DC2626',
    bgGradient: 'from-red-950 via-amber-950 to-slate-900',
    recommendedDuration: '20 Mins'
  },
  {
    id: 'solfeggio-432hz',
    title: '432 Hz Natural Frequency Tuning',
    subtitle: 'Sacred Pitch of Nature & Cosmic Harmony',
    category: 'solfeggio',
    categoryLabel: 'Solfeggio Frequencies',
    frequency: '432 Hz Sacred Frequency',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
    description: 'Universally tuned 432 Hz harmonic vibration that aligns heart rate variability with natural biological rhythms.',
    benefits: ['Promotes heart coherence', 'Harmonizes body & mind', 'Decreases cortisol levels'],
    chakaColor: '#D4AF37',
    bgGradient: 'from-amber-950 via-yellow-900 to-slate-900',
    recommendedDuration: '25 Mins'
  },
  {
    id: 'solfeggio-528hz',
    title: '528 Hz Solfeggio Miracle Frequency',
    subtitle: 'Transformation, Vitality & Cellular Repair',
    category: 'solfeggio',
    categoryLabel: 'Solfeggio Frequencies',
    frequency: '528 Hz Miracle Tone',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
    description: 'The famed Solfeggio frequency of transformation, encouraging tissue regeneration, inner peace, and unconditional joy.',
    benefits: ['Accelerates cellular healing', 'Inspires deep gratitude & joy', 'Brings peace to mind'],
    chakaColor: '#22C55E',
    bgGradient: 'from-green-950 via-emerald-900 to-slate-900',
    recommendedDuration: '20 Mins'
  },
  {
    id: 'solfeggio-639hz',
    title: '639 Hz Solfeggio Heart Resonance',
    subtitle: 'Fostering Empathy, Relationships & Forgiveness',
    category: 'solfeggio',
    categoryLabel: 'Solfeggio Frequencies',
    frequency: '639 Hz Heart Tone',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
    description: 'Warm acoustic 639 Hz frequency tone that softens emotional resistance, repairs interpersonal relationships, and promotes compassion.',
    benefits: ['Heals emotional wounds', 'Promotes unconditional love', 'Strengthens social connection'],
    chakaColor: '#3B82F6',
    bgGradient: 'from-blue-950 via-indigo-950 to-slate-900',
    recommendedDuration: '20 Mins'
  },
  {
    id: 'solfeggio-741hz',
    title: '741 Hz Solfeggio Intuition & Expression',
    subtitle: 'Throat Chakra Cleansing & Problem Solving',
    category: 'solfeggio',
    categoryLabel: 'Solfeggio Frequencies',
    frequency: '741 Hz Throat Solfeggio',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
    description: 'Vibrant 741 Hz tone designed to dissolve toxins, clear mental clutter, and empower authentic self-expression.',
    benefits: ['Encourages clear self-expression', 'Purifies mental space', 'Unlocks creative intuition'],
    chakaColor: '#0284C7',
    bgGradient: 'from-sky-950 via-teal-950 to-slate-900',
    recommendedDuration: '15 Mins'
  },
  {
    id: 'solfeggio-852hz',
    title: '852 Hz Solfeggio Third Eye Awakening',
    subtitle: 'Spiritual Order & Deep Intuitive Vision',
    category: 'solfeggio',
    categoryLabel: 'Solfeggio Frequencies',
    frequency: '852 Hz Third Eye Tone',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    description: 'Acoustic 852 Hz tone associated with awakening inner sight, restoring spiritual order, and deepening meditation insight.',
    benefits: ['Enhances intuitive awareness', 'Soothes overactive ego', 'Opens inner vision'],
    chakaColor: '#6366F1',
    bgGradient: 'from-indigo-950 via-purple-950 to-slate-900',
    recommendedDuration: '15 Mins'
  },

  // 5. ORGANIC NATURE SOUNDSCAPES
  {
    id: 'nature-ocean-waves',
    title: 'Ocean Waves & Coastal Tide',
    subtitle: 'Authentic Ocean Shore Recording',
    category: 'nature',
    categoryLabel: 'Nature Soundscapes',
    frequency: 'Organic Coastal Soundscape',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    description: 'High-definition acoustic recording of rolling ocean waves breaking gently on sandy shorelines. Naturally synchronizes deep diaphragmatic breathing.',
    benefits: ['Calms sympathetic nervous system', 'Blocks erratic ambient noise', 'Restores mental tranquility'],
    chakaColor: '#06B6D4',
    bgGradient: 'from-cyan-950 via-teal-950 to-slate-900',
    recommendedDuration: '20 Mins'
  },
  {
    id: 'nature-amazon-rain',
    title: 'Rainforest Rain & Rolling Thunder',
    subtitle: 'Lush Canopy Rainfall & Wildlife',
    category: 'nature',
    categoryLabel: 'Nature Soundscapes',
    frequency: 'Organic Rain & Low Thunder',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    description: 'Pure acoustic rain falling over broad rainforest leaves with soft, rolling distant thunder. Recorded live with stereophonic microphones.',
    benefits: ['Relieves sensory overload', 'Eases chronic stress & anxiety', 'Promotes slow-wave restorative sleep'],
    chakaColor: '#10B981',
    bgGradient: 'from-emerald-950 via-teal-900 to-slate-900',
    recommendedDuration: '30 Mins'
  },
  {
    id: 'nature-mountain-stream',
    title: 'Mountain Stream & Forest Waterfall',
    subtitle: 'Fresh Alpine Glacial Water Flow',
    category: 'nature',
    categoryLabel: 'Nature Soundscapes',
    frequency: 'Babbling River Acoustics',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
    description: 'Crystal-clear glacial stream trickling over smooth river stones amidst alpine pines. Naturally refreshes focus and releases cognitive fatigue.',
    benefits: ['Enhances creative clarity', 'Soothes mental chatter', 'Ideal for deep study & meditation'],
    chakaColor: '#0284C7',
    bgGradient: 'from-sky-950 via-slate-900 to-emerald-950',
    recommendedDuration: '25 Mins'
  },
  {
    id: 'nature-campfire-crickets',
    title: 'Campfire Embers & Night Crickets',
    subtitle: 'Crackling Pine Wood & Dusk Field',
    category: 'nature',
    categoryLabel: 'Nature Soundscapes',
    frequency: 'Natural Crackle & Chirps',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
    description: 'Softly crackling pine log fire under a starlit sky accompanied by soothing nocturnal meadow crickets. Creates a safe, grounding warmth.',
    benefits: ['Creates safe emotional space', 'Dissolves evening restlessness', 'Helps insomnia sufferers fall asleep'],
    chakaColor: '#F97316',
    bgGradient: 'from-amber-950 via-orange-950 to-slate-950',
    recommendedDuration: '45 Mins'
  },

  // 6. ACOUSTIC HEALING INSTRUMENTS
  {
    id: 'instr-bansuri-flute',
    title: 'Bamboo Bansuri Flute & River',
    subtitle: 'Acoustic Meditative Raga Yaman',
    category: 'instruments',
    categoryLabel: 'Acoustic Instruments',
    frequency: 'Acoustic Woodwind Melodies',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
    description: 'Soulful acoustic Indian bamboo flute improvisations played live by a master musician against a subtle backdrop of natural river waters.',
    benefits: ['Opens emotional heart space', 'Slows racing thoughts', 'Inspires tranquility and peace'],
    chakaColor: '#EAB308',
    bgGradient: 'from-yellow-950 via-amber-900 to-slate-950',
    recommendedDuration: '25 Mins'
  },
  {
    id: 'instr-piano-cello',
    title: 'Grand Piano & Soft Acoustic Cello',
    subtitle: 'Acoustic Chamber Sanctuary',
    category: 'instruments',
    categoryLabel: 'Acoustic Instruments',
    frequency: 'Acoustic Strings & Keys',
    audioUrl: 'https://mathematical-amaranth-ptouttw3.edgeone.dev/',
    description: 'Slow, heartwarming acoustic grand piano chords intertwined with a warm, comforting solo cello recorded in a resonant acoustic sanctuary.',
    benefits: ['Deep emotional healing & comfort', 'Calms inner turmoil', 'Promotes introspection'],
    chakaColor: '#8B5CF6',
    bgGradient: 'from-purple-950 via-indigo-950 to-slate-900',
    recommendedDuration: '20 Mins'
  },
  {
    id: 'instr-handpan-sunset',
    title: 'Handpan Sunset Meditation',
    subtitle: 'Real Steel Tongue Drum Acoustics',
    category: 'instruments',
    categoryLabel: 'Acoustic Instruments',
    frequency: 'Pentatonic Steel Resonance',
    audioUrl: 'https://assistant-lavender-jy297nzf.edgeone.dev/',
    description: 'Hypnotic acoustic handpan drum patterns played with soft fingertips on an ocean cliffside at golden hour.',
    benefits: ['Anchors rhythm & breathing', 'Relieves tension & tight muscles', 'Uplifts emotional state'],
    chakaColor: '#F59E0B',
    bgGradient: 'from-amber-950 via-[#071E17] to-slate-950',
    recommendedDuration: '20 Mins'
  }
];

export const SoundTherapyView: React.FC = () => {
  const { addMeditationMinutes } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedTrack, setSelectedTrack] = useState<SoundTrack>(SOUND_TRACKS[0]);
  
  // Custom uploaded MP3 files per track ID
  const [customAudioMap, setCustomAudioMap] = useState<Record<string, { url: string; fileName: string }>>({});

  // Audio Player States
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.85);
  const [isLooping, setIsLooping] = useState<boolean>(true);
  
  // Track Time & Duration States
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(0);
  const [durationSec, setDurationSec] = useState<number>(0);

  // Session Timer
  const [selectedTimerMins, setSelectedTimerMins] = useState<number>(20);
  const [timeLeftSec, setTimeLeftSec] = useState<number>(20 * 60);

  // Audio HTML Element Ref
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Canvas visualizer
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  // Get active audio URL for current track
  const getActiveAudioUrl = (track: SoundTrack) => {
    if (customAudioMap[track.id]) {
      return customAudioMap[track.id].url;
    }
    return track.audioUrl;
  };

  // Initialize Audio
  useEffect(() => {
    const audio = new Audio();
    audio.loop = isLooping;
    audio.volume = volume;
    audio.setAttribute('controlsList', 'nodownload');
    audioRef.current = audio;

    const handleTimeUpdate = () => {
      if (audioRef.current) {
        setCurrentTimeSec(audioRef.current.currentTime || 0);
      }
    };

    const handleLoadedMetadata = () => {
      if (audioRef.current && !isNaN(audioRef.current.duration)) {
        setDurationSec(audioRef.current.duration);
      }
    };

    const handleEnded = () => {
      if (!isLooping) {
        setIsPlaying(false);
      }
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.pause();
    };
  }, []);

  // Update loop state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isLooping;
    }
  }, [isLooping]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Session countdown timer
  useEffect(() => {
    let interval: any = null;
    if (isPlaying && selectedTimerMins > 0) {
      interval = setInterval(() => {
        setTimeLeftSec(prev => {
          if (prev <= 1) {
            // Session completed!
            if (audioRef.current) {
              audioRef.current.pause();
            }
            setIsPlaying(false);
            addMeditationMinutes(selectedTimerMins);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, selectedTimerMins, addMeditationMinutes]);

  // Visualizer Animation Ring
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = 60;

      step += isPlaying ? 0.05 : 0.01;

      // Draw concentric glowing audio rings
      const ringCount = 3;
      for (let i = 0; i < ringCount; i++) {
        ctx.beginPath();
        const wave = Math.sin(step + i * 1.2) * (isPlaying ? 12 : 3);
        const radius = baseRadius + i * 22 + wave;
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.strokeStyle = selectedTrack.chakaColor;
        ctx.globalAlpha = isPlaying ? 0.7 - i * 0.18 : 0.2 - i * 0.05;
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Center orb
      ctx.beginPath();
      ctx.arc(centerX, centerY, baseRadius - 10 + Math.sin(step) * (isPlaying ? 5 : 1), 0, Math.PI * 2);
      ctx.fillStyle = selectedTrack.chakaColor;
      ctx.globalAlpha = isPlaying ? 0.35 : 0.15;
      ctx.fill();

      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying, selectedTrack]);

  // Handle Track Selection
  const handleSelectTrack = (track: SoundTrack) => {
    if (selectedTrack.id === track.id) {
      togglePlayPause();
      return;
    }

    setSelectedTrack(track);
    if (selectedTimerMins > 0 && timeLeftSec <= 0) {
      setTimeLeftSec(selectedTimerMins * 60);
    }
    const targetUrl = getActiveAudioUrl(track);

    if (audioRef.current) {
      audioRef.current.src = targetUrl;
      audioRef.current.currentTime = 0;
      setCurrentTimeSec(0);
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.warn('Audio play failed:', err));
    }
  };

  // Toggle Play / Pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      if (selectedTimerMins > 0 && timeLeftSec <= 0) {
        setTimeLeftSec(selectedTimerMins * 60);
      }
      const targetUrl = getActiveAudioUrl(selectedTrack);
      if (!audioRef.current.src || (!audioRef.current.src.endsWith(targetUrl) && audioRef.current.src !== targetUrl)) {
        audioRef.current.src = targetUrl;
      }
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.warn('Playback error:', err);
      });
    }
  };

  // Timer option changes
  const handleTimerChange = (mins: number) => {
    setSelectedTimerMins(mins);
    setTimeLeftSec(mins > 0 ? mins * 60 : 0);
  };

  // Upload Custom MP3
  const handleFileUpload = (trackId: string, file: File) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setCustomAudioMap(prev => ({
      ...prev,
      [trackId]: { url: objectUrl, fileName: file.name }
    }));

    if (selectedTrack.id === trackId) {
      if (audioRef.current) {
        audioRef.current.src = objectUrl;
        audioRef.current.currentTime = 0;
        if (isPlaying) {
          audioRef.current.play().catch(err => console.warn('Custom MP3 error:', err));
        }
      }
    }
  };

  // Remove custom audio override
  const removeCustomAudio = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCustomAudioMap(prev => {
      const next = { ...prev };
      delete next[trackId];
      return next;
    });

    if (selectedTrack.id === trackId && audioRef.current) {
      audioRef.current.src = selectedTrack.audioUrl;
      audioRef.current.currentTime = 0;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.warn('Reset error:', err));
      }
    }
  };

  // Formatting helpers
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '0:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Filter Tracks
  const filteredTracks = SOUND_TRACKS.filter(t => 
    activeCategory === 'all' ? true : t.category === activeCategory
  );

  return (
    <div className="min-h-screen bg-[#061814] text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* Header Title Banner */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-900/60 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold tracking-wide uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Realistic Acoustic Sound Therapy & Frequency Healing</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-bold text-white tracking-tight leading-tight">
            Realistic Calm Sound Therapy
          </h1>
          <p className="text-[#C2D8D2] text-sm sm:text-base font-sans font-normal leading-relaxed">
            Authentic natural soundscapes — Binaural Beats, Crystal Singing Bowls, Temple Gong Baths, Solfeggio Frequencies, Rainforest Ocean Tides, and Master Acoustic Instruments. No AI synthetic noise.
          </p>
        </div>

        {/* Category Selection Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-3 no-scrollbar">
          {[
            { id: 'all', label: 'All Soundscapes', icon: Radio },
            { id: 'binaural', label: 'Binaural Beats', icon: Activity },
            { id: 'crystal_bowls', label: 'Crystal Bowls', icon: Sparkles },
            { id: 'gong_bath', label: 'Gong Bath', icon: Disc },
            { id: 'solfeggio', label: 'Solfeggio Frequencies', icon: Headphones },
            { id: 'nature', label: 'Nature Soundscapes', icon: Waves },
            { id: 'instruments', label: 'Acoustic Instruments', icon: Music }
          ].map(cat => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all flex-shrink-0 border ${
                  isActive
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20 font-bold'
                    : 'bg-emerald-950/60 text-[#C2D8D2] border-emerald-800/50 hover:bg-emerald-900/60 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Main Sound Stage Player Card */}
        <div className={`relative overflow-hidden rounded-3xl p-6 sm:p-10 border border-[#D4AF37]/40 bg-gradient-to-br ${selectedTrack.bgGradient} shadow-2xl transition-all duration-500`}>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visualizer Canvas & Track Info Column */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-black/40 border border-[#D4AF37]/40 text-[#D4AF37]">
                  {selectedTrack.categoryLabel}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-emerald-950/80 text-emerald-300 border border-emerald-800/60">
                  {selectedTrack.frequency}
                </span>
                {customAudioMap[selectedTrack.id] && (
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/40">
                    Custom MP3
                  </span>
                )}
              </div>

              <div>
                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-white tracking-wide">
                  {selectedTrack.title}
                </h2>
                <p className="text-sm sm:text-base text-emerald-200/80 font-medium mt-1">
                  {selectedTrack.subtitle}
                </p>
              </div>

              <p className="text-xs sm:text-sm text-[#C2D8D2] leading-relaxed max-w-xl">
                {selectedTrack.description}
              </p>

              {/* Key Benefits Pills */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Therapeutic Benefits:
                </span>
                <div className="flex flex-wrap gap-2 pt-1">
                  {selectedTrack.benefits.map((b, idx) => (
                    <span 
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs bg-emerald-950/70 border border-emerald-800/50 text-emerald-100"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>{b}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>

            {/* Interactive Player Controls Column */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center space-y-6 bg-black/40 backdrop-blur-md p-6 sm:p-8 rounded-3xl border border-white/10">
              
              {/* Canvas Visualizer Circle */}
              <div className="relative w-48 h-48 flex items-center justify-center">
                <canvas 
                  ref={canvasRef} 
                  width={220} 
                  height={220} 
                  className="absolute inset-0 w-full h-full"
                />
                <button
                  onClick={togglePlayPause}
                  className="relative z-10 w-20 h-20 rounded-full bg-[#D4AF37] hover:bg-[#c49f27] text-black flex items-center justify-center shadow-xl shadow-[#D4AF37]/30 transition-all transform hover:scale-105 active:scale-95"
                >
                  {isPlaying ? (
                    <Pause className="w-9 h-9 fill-current" />
                  ) : (
                    <Play className="w-9 h-9 fill-current ml-1" />
                  )}
                </button>
              </div>

              {/* Time progress bar */}
              <div className="w-full space-y-2">
                <div className="flex items-center justify-between text-xs text-[#C2D8D2] font-mono">
                  <span>{formatTime(currentTimeSec)}</span>
                  <span>{durationSec > 0 ? formatTime(durationSec) : 'Continuous Stream'}</span>
                </div>
                <div className="w-full bg-emerald-950/80 rounded-full h-2 overflow-hidden border border-emerald-800/40">
                  <div 
                    className="bg-[#D4AF37] h-full transition-all duration-300"
                    style={{ width: `${durationSec > 0 ? (currentTimeSec / durationSec) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Session Duration Selection */}
              <div className="w-full space-y-2 text-center">
                <div className="flex items-center justify-between text-xs text-[#C2D8D2]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Session Timer:
                  </span>
                  <span className="font-mono text-emerald-300 font-semibold">
                    {selectedTimerMins > 0 ? `${formatTime(timeLeftSec)} Left` : 'Continuous Loop'}
                  </span>
                </div>
                
                <div className="grid grid-cols-5 gap-1.5 pt-1">
                  {[10, 15, 20, 30, 0].map(mins => (
                    <button
                      key={mins}
                      onClick={() => handleTimerChange(mins)}
                      className={`py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                        selectedTimerMins === mins
                          ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-bold shadow-md'
                          : 'bg-emerald-950/60 text-[#C2D8D2] border-emerald-800/50 hover:bg-emerald-900/60 hover:text-white'
                      }`}
                    >
                      {mins === 0 ? 'Off' : `${mins}m`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Loop and Mute Toggles */}
              <div className="flex items-center justify-between w-full pt-2 border-t border-emerald-900/60">
                <button
                  onClick={() => setIsLooping(!isLooping)}
                  className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-all ${
                    isLooping 
                      ? 'bg-emerald-900/80 text-[#D4AF37] border-[#D4AF37]/50' 
                      : 'bg-emerald-950 text-emerald-400 border-emerald-800/40'
                  }`}
                >
                  <Repeat className="w-3.5 h-3.5" />
                  <span>{isLooping ? 'Loop On' : 'Loop Off'}</span>
                </button>

                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-5 h-5 text-rose-400" /> : <Volume2 className="w-5 h-5 text-[#D4AF37]" />}
                </button>
              </div>

              {/* Master Volume Slider */}
              <div className="w-full space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-xs text-[#C2D8D2]">
                  <span className="flex items-center gap-1">
                    <Sliders className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Volume
                  </span>
                  <span className="font-mono text-emerald-300">{isMuted ? 'Muted' : `${Math.round(volume * 100)}%`}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={e => {
                    setVolume(parseFloat(e.target.value));
                    if (isMuted) setIsMuted(false);
                  }}
                  className="w-full accent-[#D4AF37] bg-emerald-950 rounded-lg h-2 cursor-pointer"
                />
              </div>

            </div>

          </div>
        </div>

        {/* Track Library Grid */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Authentic Acoustic Soundscapes
              </h3>
              <p className="text-xs sm:text-sm text-[#C2D8D2]">
                Select any natural recording for authentic acoustic sound therapy
              </p>
            </div>
            <span className="text-xs font-semibold text-[#D4AF37] bg-emerald-950/90 px-3.5 py-1.5 rounded-full border border-[#D4AF37]/30">
              {filteredTracks.length} Natural Sessions Available
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTracks.map(track => {
              const isSelected = selectedTrack.id === track.id;

              return (
                <div
                  key={track.id}
                  onClick={() => handleSelectTrack(track)}
                  className={`group relative rounded-2xl p-6 border cursor-pointer transition-all duration-300 hover:-translate-y-1 flex flex-col justify-between ${
                    isSelected
                      ? 'bg-gradient-to-b from-emerald-900/70 to-slate-900 border-[#D4AF37] shadow-xl shadow-[#D4AF37]/10'
                      : 'bg-emerald-950/40 border-emerald-800/40 hover:bg-emerald-900/40 hover:border-emerald-700/60'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-950 border border-emerald-800 text-[#D4AF37]">
                            {track.categoryLabel}
                          </span>
                        </div>
                        <h4 className="text-lg font-serif font-bold text-white pt-1 group-hover:text-[#D4AF37] transition-colors">
                          {track.title}
                        </h4>
                        <p className="text-xs text-emerald-100/70">
                          {track.subtitle}
                        </p>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectTrack(track);
                        }}
                        className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                          isSelected && isPlaying
                            ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40'
                            : isSelected
                            ? 'bg-[#D4AF37] text-black shadow-lg shadow-[#D4AF37]/30'
                            : 'bg-emerald-900/60 text-emerald-200 group-hover:bg-[#D4AF37] group-hover:text-black'
                        }`}
                      >
                        {isSelected && isPlaying ? (
                          <Pause className="w-5 h-5 fill-current" />
                        ) : (
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        )}
                      </button>
                    </div>

                    <p className="text-xs text-[#C2D8D2] line-clamp-2 mb-4 leading-relaxed">
                      {track.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-emerald-900/60">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-mono text-emerald-300 font-medium truncate max-w-[180px]">
                        {track.frequency}
                      </span>
                      <span className="text-emerald-100/60">
                        {track.recommendedDuration}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Educational Sound Therapy Science Section */}
        <div className="bg-emerald-950/40 border border-emerald-800/50 rounded-3xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-[#D4AF37]" />
            <h3 className="text-xl font-serif font-bold text-white">
              Why Organic Soundscapes Calm the Nervous System
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-[#C2D8D2]">
            <div className="space-y-2 bg-emerald-900/20 p-5 rounded-2xl border border-emerald-800/30">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-[#D4AF37]" />
                Dual-Ear Brainwave Entrainment
              </h4>
              <p className="text-xs leading-relaxed">
                Binaural beats deliver slightly different frequencies to each ear, prompting the auditory cortex to synchronize brainwaves into relaxed alpha (10 Hz), deep theta (6 Hz), or restorative delta (3 Hz) states.
              </p>
            </div>

            <div className="space-y-2 bg-emerald-900/20 p-5 rounded-2xl border border-emerald-800/30">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Disc className="w-4 h-4 text-[#D4AF37]" />
                Crystal & Gong Acoustics
              </h4>
              <p className="text-xs leading-relaxed">
                Hand-hammered bronze gongs and pure quartz singing bowls tuned to 432 Hz emit multi-tonal acoustic overtones that resonate deeply through physical tissues, promoting deep parasympathetic relaxation.
              </p>
            </div>

            <div className="space-y-2 bg-emerald-900/20 p-5 rounded-2xl border border-emerald-800/30">
              <h4 className="font-bold text-white flex items-center gap-2">
                <Headphones className="w-4 h-4 text-[#D4AF37]" />
                Harmonic Immersion
              </h4>
              <p className="text-xs leading-relaxed">
                Every audio track is meticulously synthesized and mastered at precise acoustic frequencies for maximum restorative impact and stress relief.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
