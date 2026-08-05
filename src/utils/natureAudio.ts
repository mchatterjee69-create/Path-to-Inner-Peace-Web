// Web Audio API Soundscape & Meditation Synthesizer Engine
// Provides distinct, realistic, live-generated nature soundscapes with unique harmonic instruments and genre-specific Solfeggio/binaural frequencies for each daily challenge.

class NatureAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private currentType: 'rain' | 'ocean' | 'forest' | 'birds' | null = null;
  private currentDayNumber: number | null = null;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioBufferSourceNode | null = null;
  private lfoNodes: OscillatorNode[] = [];
  private extraOscillators: OscillatorNode[] = [];
  private activeIntervals: any[] = [];

  private initCtx() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public start(
    type: 'rain' | 'ocean' | 'forest' | 'birds' = 'birds', 
    volume = 0.8,
    dayNumber?: number
  ) {
    this.stop();
    this.initCtx();
    if (!this.ctx) return;

    this.isPlaying = true;
    this.currentType = type;
    this.currentDayNumber = dayNumber || null;

    // Master Gain Node
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);

    // Continuous Noise Buffer (White/Pink noise generator for wind/water)
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise filtering for softer natural warmth
      output[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = output[i];
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;
    this.noiseNode = noiseSource;

    // ROUTING GENRE-SPECIFIC DYNAMIC AUDIO COMPOSITIONS
    if (dayNumber === 1) {
      this.buildRainSoundscapeWithBinauralTheta();
    } else if (dayNumber === 2) {
      this.buildOceanSoundscapeWith528Hz();
    } else if (dayNumber === 3) {
      this.buildForestSoundscapeWith639Hz();
    } else if (dayNumber === 4) {
      this.buildBirdsSoundscapeWith741Hz();
    } else if (dayNumber === 5) {
      this.buildMeadowSoundscapeWith852Hz();
    } else {
      // Fallback by type
      if (type === 'rain') this.buildRainSoundscapeWithBinauralTheta();
      else if (type === 'ocean') this.buildOceanSoundscapeWith528Hz();
      else if (type === 'forest') this.buildForestSoundscapeWith639Hz();
      else if (type === 'birds') this.buildBirdsSoundscapeWith741Hz();
      else this.buildRainSoundscapeWithBinauralTheta();
    }

    try {
      noiseSource.start();
    } catch (e) {
      console.warn('Error starting noise source:', e);
    }
  }

  // ==========================================
  // DAY 1: GENTLE RAIN & THETA BINAURAL TONES (6Hz)
  // ==========================================
  private buildRainSoundscapeWithBinauralTheta() {
    if (!this.ctx || !this.noiseNode || !this.masterGain) return;

    // Rain Wash Base Filter
    const lowpass = this.ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.setValueAtTime(1100, this.ctx.currentTime);

    const highpass = this.ctx.createBiquadFilter();
    highpass.type = 'highpass';
    highpass.frequency.setValueAtTime(280, this.ctx.currentTime);

    const rainGain = this.ctx.createGain();
    rainGain.gain.setValueAtTime(0.24, this.ctx.currentTime);

    this.noiseNode.connect(lowpass);
    lowpass.connect(highpass);
    highpass.connect(rainGain);
    rainGain.connect(this.masterGain);

    // 6Hz THETA BINAURAL BEAT GENERATOR (Carrier 216Hz Left, 222Hz Right)
    this.buildBinauralBeats(216, 6, 0.06);

    // Soft introspective Eb-Major Drone for mental detox
    const chordFreqs = [155.56, 196.00, 233.08]; // Eb3, G3, Bb3
    const chordGain = this.ctx.createGain();
    chordGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    chordFreqs.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.connect(chordGain);
      osc.start();
      this.extraOscillators.push(osc);
    });
    chordGain.connect(this.masterGain);

    // REALISTIC INDIVIDUAL RAINDROP DROPLETS
    const dropInterval = setInterval(() => {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;
      this.triggerRainDrop();
    }, 90);
    this.activeIntervals.push(dropInterval);
  }

  private triggerRainDrop() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const dropFreq = 1400 + Math.random() * 2200;
    osc.type = 'sine';
    osc.frequency.setValueAtTime(dropFreq, now);
    osc.frequency.exponentialRampToValueAtTime(dropFreq * 0.4, now + 0.025);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.035, now + 0.003);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.035);
  }

  // ==========================================
  // DAY 2: DEEP OCEAN WAVES & SOLFEGGIO 528Hz
  // ==========================================
  private buildOceanSoundscapeWith528Hz() {
    if (!this.ctx || !this.noiseNode || !this.masterGain) return;

    // Tidal swell wave filter modulated by 13-second LFO
    const waveFilter = this.ctx.createBiquadFilter();
    waveFilter.type = 'lowpass';
    waveFilter.frequency.setValueAtTime(320, this.ctx.currentTime);

    const waveGain = this.ctx.createGain();
    waveGain.gain.setValueAtTime(0.22, this.ctx.currentTime);

    const waveLfo = this.ctx.createOscillator();
    waveLfo.type = 'sine';
    waveLfo.frequency.setValueAtTime(0.075, this.ctx.currentTime); // 13.3s tide cycle

    const waveLfoGain = this.ctx.createGain();
    waveLfoGain.gain.setValueAtTime(380, this.ctx.currentTime);

    const waveGainLfo = this.ctx.createGain();
    waveGainLfo.gain.setValueAtTime(0.18, this.ctx.currentTime);

    waveLfo.connect(waveLfoGain);
    waveLfoGain.connect(waveFilter.frequency);

    waveLfo.connect(waveGainLfo);
    waveGainLfo.connect(waveGain.gain);

    this.noiseNode.connect(waveFilter);
    waveFilter.connect(waveGain);
    waveGain.connect(this.masterGain);

    waveLfo.start();
    this.lfoNodes.push(waveLfo);

    // SOLFEGGIO 528Hz MIRACLE TONE & 136.1Hz OM DRONE
    const omFreqs = [136.10, 272.20, 528.00];
    const droneGain = this.ctx.createGain();
    droneGain.gain.setValueAtTime(0.065, this.ctx.currentTime);

    omFreqs.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.04, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      osc.connect(droneGain);
      osc.start();
      lfo.start();

      this.extraOscillators.push(osc);
      this.lfoNodes.push(lfo);
    });

    droneGain.connect(this.masterGain);
  }

  // ==========================================
  // DAY 3: PINE FOREST SOLITUDE & 639Hz HEART CHAKRA + BAMBOO FLUTE
  // ==========================================
  private buildForestSoundscapeWith639Hz() {
    if (!this.ctx || !this.noiseNode || !this.masterGain) return;

    // Whispering Forest Wind
    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.setValueAtTime(550, this.ctx.currentTime);

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.16, this.ctx.currentTime);

    const breezeLfo = this.ctx.createOscillator();
    breezeLfo.type = 'sine';
    breezeLfo.frequency.setValueAtTime(0.05, this.ctx.currentTime);
    const breezeLfoGain = this.ctx.createGain();
    breezeLfoGain.gain.setValueAtTime(200, this.ctx.currentTime);

    breezeLfo.connect(breezeLfoGain);
    breezeLfoGain.connect(windFilter.frequency);

    this.noiseNode.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);

    breezeLfo.start();
    this.lfoNodes.push(breezeLfo);

    // 639Hz HEART CHAKRA SOLFEGGIO DRONE
    const heartGain = this.ctx.createGain();
    heartGain.gain.setValueAtTime(0.05, this.ctx.currentTime);

    const heartOsc = this.ctx.createOscillator();
    heartOsc.type = 'sine';
    heartOsc.frequency.setValueAtTime(639.00, this.ctx.currentTime);
    heartOsc.connect(heartGain);
    heartOsc.start();
    this.extraOscillators.push(heartOsc);

    const octOsc = this.ctx.createOscillator();
    octOsc.type = 'sine';
    octOsc.frequency.setValueAtTime(319.50, this.ctx.currentTime);
    octOsc.connect(heartGain);
    octOsc.start();
    this.extraOscillators.push(octOsc);

    heartGain.connect(this.masterGain);

    // JAPANESE BANSURI / BAMBOO FLUTE LIVE MELODY NOTES
    const fluteInterval = setInterval(() => {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;
      this.playBambooFluteNote();
    }, 4500);
    this.activeIntervals.push(fluteInterval);

    this.playBambooFluteNote();
  }

  private playBambooFluteNote() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const scale = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00];
    const freq = scale[Math.floor(Math.random() * scale.length)];

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    const vibrato = this.ctx.createOscillator();
    vibrato.frequency.setValueAtTime(5, now);
    const vibratoGain = this.ctx.createGain();
    vibratoGain.gain.setValueAtTime(3.5, now);
    vibrato.connect(vibratoGain);
    vibratoGain.connect(osc.frequency);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.09, now + 0.4);
    gain.gain.setValueAtTime(0.08, now + 2.0);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.8);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    vibrato.start(now);
    osc.stop(now + 3.9);
    vibrato.stop(now + 3.9);
  }

  // ==========================================
  // DAY 4: MORNING BIRDSONG & 741Hz AWAKENING + ALPHA WAVES (10Hz)
  // ==========================================
  private buildBirdsSoundscapeWith741Hz() {
    if (!this.ctx || !this.noiseNode || !this.masterGain) return;

    // Meadow Breeze Background
    const meadowFilter = this.ctx.createBiquadFilter();
    meadowFilter.type = 'lowpass';
    meadowFilter.frequency.setValueAtTime(700, this.ctx.currentTime);

    const meadowGain = this.ctx.createGain();
    meadowGain.gain.setValueAtTime(0.12, this.ctx.currentTime);

    this.noiseNode.connect(meadowFilter);
    meadowFilter.connect(meadowGain);
    meadowGain.connect(this.masterGain);

    // 741Hz SOLFEGGIO INTUITION/CONFIDENCE TONE with 10Hz ALPHA WAVE PULSE
    const sunGain = this.ctx.createGain();
    sunGain.gain.setValueAtTime(0.045, this.ctx.currentTime);

    const tone741 = this.ctx.createOscillator();
    tone741.type = 'sine';
    tone741.frequency.setValueAtTime(741.00, this.ctx.currentTime);

    // 10Hz Alpha pulse tremolo
    const alphaPulse = this.ctx.createOscillator();
    alphaPulse.type = 'sine';
    alphaPulse.frequency.setValueAtTime(10, this.ctx.currentTime);
    const alphaGain = this.ctx.createGain();
    alphaGain.gain.setValueAtTime(0.015, this.ctx.currentTime);

    alphaPulse.connect(alphaGain);
    alphaGain.connect(sunGain.gain);

    tone741.connect(sunGain);
    tone741.start();
    alphaPulse.start();

    this.extraOscillators.push(tone741);
    this.lfoNodes.push(alphaPulse);

    sunGain.connect(this.masterGain);

    // BIRD CALLS
    const birdInterval = setInterval(() => {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;
      if (Math.random() < 0.6) {
        this.playRobinChirp();
      } else {
        this.playWarblerTrill();
      }
    }, 2000);
    this.activeIntervals.push(birdInterval);

    this.playRobinChirp();
  }

  // ==========================================
  // DAY 5: SUNRISE MEADOW & 852Hz SACRED LIFE MASTERY + 432Hz TRIAD
  // ==========================================
  private buildMeadowSoundscapeWith852Hz() {
    if (!this.ctx || !this.noiseNode || !this.masterGain) return;

    // Gentle Dawn Wind
    const meadowFilter = this.ctx.createBiquadFilter();
    meadowFilter.type = 'lowpass';
    meadowFilter.frequency.setValueAtTime(650, this.ctx.currentTime);

    const meadowGain = this.ctx.createGain();
    meadowGain.gain.setValueAtTime(0.14, this.ctx.currentTime);

    this.noiseNode.connect(meadowFilter);
    meadowFilter.connect(meadowGain);
    meadowGain.connect(this.masterGain);

    // 852Hz SPIRITUAL ORDER SOLFEGGIO & A-MAJOR 432Hz SACRED TRIAD
    const sacredFreqs = [216.00, 270.00, 324.00, 432.00, 852.00];
    const sacredGain = this.ctx.createGain();
    sacredGain.gain.setValueAtTime(0.04, this.ctx.currentTime);

    sacredFreqs.forEach(freq => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.connect(sacredGain);
      osc.start();
      this.extraOscillators.push(osc);
    });
    sacredGain.connect(this.masterGain);

    // FULL BIRD SYMPHONY (Robin, Warbler, Dove)
    const birdInterval = setInterval(() => {
      if (!this.ctx || !this.isPlaying || !this.masterGain) return;
      const birdType = Math.random();
      if (birdType < 0.35) {
        this.playRobinChirp();
      } else if (birdType < 0.7) {
        this.playWarblerTrill();
      } else {
        this.playDoveCoo();
      }
    }, 1800);
    this.activeIntervals.push(birdInterval);

    this.playRobinChirp();
  }

  // Helper for stereo binaural beats
  private buildBinauralBeats(carrierFreq: number, beatFreq: number, gainVal: number) {
    if (!this.ctx || !this.masterGain) return;

    const oscL = this.ctx.createOscillator();
    oscL.type = 'sine';
    oscL.frequency.setValueAtTime(carrierFreq, this.ctx.currentTime);

    const oscR = this.ctx.createOscillator();
    oscR.type = 'sine';
    oscR.frequency.setValueAtTime(carrierFreq + beatFreq, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);

    try {
      const merger = this.ctx.createChannelMerger(2);
      oscL.connect(merger, 0, 0);
      oscR.connect(merger, 0, 1);
      merger.connect(gain);
    } catch (e) {
      oscL.connect(gain);
      oscR.connect(gain);
    }

    gain.connect(this.masterGain);
    oscL.start();
    oscR.start();

    this.extraOscillators.push(oscL, oscR);
  }

  private playRobinChirp() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    const baseFreq = 2400 + Math.random() * 600;

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(baseFreq, now);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq + 800, now + 0.06);
    osc1.frequency.exponentialRampToValueAtTime(baseFreq - 200, now + 0.12);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(baseFreq * 1.2, now + 0.07);
    osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, now + 0.15);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.045, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.masterGain);

    osc1.start(now);
    osc1.stop(now + 0.2);
    osc2.start(now + 0.07);
    osc2.stop(now + 0.2);
  }

  private playWarblerTrill() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = 3000 + Math.random() * 500;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.linearRampToValueAtTime(startFreq + 500, now + 0.04);
    osc.frequency.linearRampToValueAtTime(startFreq + 200, now + 0.08);
    osc.frequency.linearRampToValueAtTime(startFreq + 700, now + 0.14);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.04, now + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  private playDoveCoo() {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.exponentialRampToValueAtTime(460, now + 0.35);

    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.035, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.4);

    osc.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.42);
  }

  // ==========================================
  // CONTROLS & CLEANUP
  // ==========================================
  public setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.linearRampToValueAtTime(Math.max(0, Math.min(1, vol)), this.ctx.currentTime + 0.1);
    }
  }

  public stop() {
    this.isPlaying = false;
    this.currentType = null;
    this.currentDayNumber = null;

    // Clear all active soundscape intervals
    this.activeIntervals.forEach(interval => clearInterval(interval));
    this.activeIntervals = [];

    // Stop LFOs
    this.lfoNodes.forEach(lfo => {
      try { lfo.stop(); } catch (e) {}
    });
    this.lfoNodes = [];

    // Stop Extra Oscillators
    this.extraOscillators.forEach(osc => {
      try { osc.stop(); } catch (e) {}
    });
    this.extraOscillators = [];

    // Stop Noise Generator
    if (this.noiseNode) {
      try { this.noiseNode.stop(); } catch (e) {}
      this.noiseNode = null;
    }

    // Suspend Audio Context safely
    if (this.ctx && this.ctx.state !== 'closed') {
      try {
        this.ctx.suspend();
      } catch (e) {}
    }
  }

  public speakGuidedInstruction(text: string) {
    if (!('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85; // Calming, slow pace
      utterance.pitch = 0.95; // Warm pitch
      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  }

  public stopGuidedInstruction() {
    if ('speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
      } catch (e) {}
    }
  }

  public getIsPlaying() {
    return this.isPlaying;
  }

  public getCurrentType() {
    return this.currentType;
  }

  public getCurrentDayNumber() {
    return this.currentDayNumber;
  }
}

export const natureAudio = new NatureAudioEngine();
