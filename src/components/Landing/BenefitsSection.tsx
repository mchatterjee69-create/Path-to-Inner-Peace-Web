import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  HeartPulse, 
  Compass, 
  Moon, 
  Heart, 
  Lightbulb, 
  Zap, 
  Sun, 
  Wind, 
  Headphones, 
  Brain, 
  Activity,
  CheckCircle2
} from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const BenefitsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const benefits = [
    {
      title: 'Reduce Stress',
      description: 'Lower cortisol levels through targeted vagus nerve stimulation and somatic stress release.',
      icon: HeartPulse,
      tag: 'Nervous System',
      outcome: 'Regulates sympathetic baseline',
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Calm Overthinking',
      description: 'Break anxious thought loops and catastrophizing using proven cognitive re-framing techniques.',
      icon: Compass,
      tag: 'Cognitive Calm',
      outcome: 'Quiets the default mode network',
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Better Sleep',
      description: 'Unwind your mind before bedtime with deep restorative soundscapes and delta wave pacing.',
      icon: Moon,
      tag: 'Restorative Sleep',
      outcome: 'Promotes deep restorative REM',
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Emotional Healing',
      description: 'Release past grievances, unburden unresolved stress, and cultivate radical self-compassion.',
      icon: Heart,
      tag: 'Self-Compassion',
      outcome: 'Dissolves internal resistance',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Mental Clarity',
      description: 'Eliminate brain fog and gain sharp, razor-focused clarity for work and critical daily decisions.',
      icon: Lightbulb,
      tag: 'Deep Focus',
      outcome: 'Sharpens executive focus',
      image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Confidence Reset',
      description: 'Overcome imposter syndrome, dismantle self-doubt, and step boldly into your innate core worth.',
      icon: Zap,
      tag: 'Self-Worth',
      outcome: 'Restores decisive self-trust',
      image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Mindfulness',
      description: 'Cultivate grounded, non-judgmental present-moment awareness throughout busy workdays.',
      icon: Sun,
      tag: 'Presence',
      outcome: 'Stops impulsive reactions',
      image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Breathing Exercises',
      description: 'Master 3-10 minute Box Breathing and 4-7-8 calming breath patterns for instant physiological calm.',
      icon: Wind,
      tag: 'Breathwork',
      outcome: 'Improves autonomic heart rate variability',
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Guided Meditation',
      description: 'Immerse in daily audio tracks accompanied by 432Hz ambient natural acoustic frequencies.',
      icon: Headphones,
      tag: 'Audio Resets',
      outcome: 'Alpha brainwave synchronization',
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Healthy Habits',
      description: 'Build an unbroken streak of 10-minute daily mental reset rituals that compound effortlessly.',
      icon: Activity,
      tag: 'Daily Habit',
      outcome: 'Solidifies neuroplastic routines',
      image: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Subconscious Mastery',
      description: 'Rewire limiting subconscious thought programs and anchor deep, unwavering internal stillness.',
      icon: Brain,
      tag: 'Subconscious',
      outcome: 'Repatterns deep cognitive scripts',
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80'
    }
  ];

  // Preload all images for seamless sliding transitions
  useEffect(() => {
    benefits.forEach((item) => {
      const img = new Image();
      img.src = item.image;
    });
  }, []);

  // Synchronized auto-slide cycle every 3.2 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setDirection(1);
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [isPaused, benefits.length]);

  const handleSelectBenefit = (index: number) => {
    if (index === activeIndex) return;
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  const activeBenefit = benefits[activeIndex];
  const ActiveIcon = activeBenefit.icon;

  return (
    <section 
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal variant="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/70 inline-flex items-center gap-1.5 shadow-xs">
              <HeartPulse className="w-3.5 h-3.5 text-[#0B6B53]" />
              HOLISTIC MENTAL TRANSFORMATION
            </span>
            
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 mt-4 tracking-tight">
              Comprehensive Benefits of Your 5-Day Reset
            </h2>
            
            <p className="text-slate-600 text-sm sm:text-base md:text-lg mt-3 leading-relaxed font-inter">
              Every session combines modern psychology, CBT techniques, and psycho-spiritual wisdom to deliver profound, measurable shifts in your well-being.
            </p>
          </div>
        </ScrollReveal>

        {/* SYNCHRONIZED TEXT ANIMATION & IMAGE SLIDER SHOWCASE */}
        <ScrollReveal variant="fade">
          <div className="relative w-full py-2 sm:py-4">
            
            {/* Split Showcase Layout (Desktop Side-by-Side, Mobile Stacked) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Synchronized Text Animation Content */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                
                {/* Step / Category Tag */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200/60">
                    Benefit {activeIndex + 1} of {benefits.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    • {activeBenefit.tag}
                  </span>
                </div>

                {/* Animated Single Line Title Container */}
                <div className="min-h-[58px] sm:min-h-[68px] overflow-hidden flex items-center">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      initial={{ opacity: 0, x: direction > 0 ? 32 : -32, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: direction > 0 ? -32 : 32, filter: 'blur(3px)' }}
                      transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-3 sm:gap-4 font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl text-slate-900 tracking-tight"
                    >
                      <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-emerald-50 border border-emerald-200/80 flex items-center justify-center text-[#0B6B53] shadow-xs shrink-0">
                        <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                      </div>
                      <span className="leading-tight">{activeBenefit.title}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Synchronized Animated Description Subline */}
                <div className="mt-3 sm:mt-4 min-h-[52px] sm:min-h-[60px] overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.p
                      key={activeIndex}
                      custom={direction}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.32, ease: 'easeOut', delay: 0.05 }}
                      className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed"
                    >
                      {activeBenefit.description}
                    </motion.p>
                  </AnimatePresence>
                </div>

                {/* Methodology / Scientific Outcome Highlight */}
                <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="text-xs sm:text-sm font-medium text-slate-700">
                    <strong className="text-slate-900 font-semibold">Clinical target:</strong> {activeBenefit.outcome}
                  </span>
                </div>

              </div>

              {/* Right Column: Synchronized Sliding Relevant Image Stage */}
              <div className="lg:col-span-6 w-full">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-950">
                  
                  {/* Sliding Image Animation Container */}
                  <AnimatePresence mode="popLayout" custom={direction}>
                    <motion.div
                      key={activeIndex}
                      custom={direction}
                      variants={{
                        enter: (dir: number) => ({
                          x: dir > 0 ? '100%' : '-100%',
                          opacity: 0.7,
                          scale: 1.04
                        }),
                        center: {
                          x: 0,
                          opacity: 1,
                          scale: 1,
                          transition: {
                            x: { type: 'spring', stiffness: 220, damping: 26 },
                            opacity: { duration: 0.4 },
                            scale: { duration: 0.5 }
                          }
                        },
                        exit: (dir: number) => ({
                          x: dir > 0 ? '-100%' : '100%',
                          opacity: 0,
                          scale: 0.96,
                          transition: {
                            x: { type: 'spring', stiffness: 220, damping: 26 },
                            opacity: { duration: 0.3 }
                          }
                        })
                      }}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 w-full h-full"
                    >
                      <img
                        src={activeBenefit.image}
                        alt={activeBenefit.title}
                        className="w-full h-full object-cover select-none"
                        loading="eager"
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Gradient Ambient Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/25 to-transparent pointer-events-none" />
                      
                      {/* Floating Caption inside Image */}
                      <div className="absolute bottom-4 left-4 right-4 sm:bottom-5 sm:left-5 sm:right-5 flex items-end justify-between gap-3 text-white pointer-events-none">
                        <div className="min-w-0">
                          <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold text-emerald-300 bg-black/40 px-2.5 py-0.5 rounded-md backdrop-blur-xs border border-white/10 inline-block mb-1">
                            {activeBenefit.tag}
                          </span>
                          <p className="text-lg sm:text-xl font-extrabold text-white tracking-tight drop-shadow-md truncate">
                            {activeBenefit.title}
                          </p>
                        </div>
                        
                        <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shrink-0 shadow-sm">
                          <ActiveIcon className="w-5 h-5 text-amber-300" />
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Top-Right Progress Badge */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 px-2.5 py-1 bg-black/55 backdrop-blur-md rounded-full border border-white/20 text-white text-[11px] font-semibold tracking-wider flex items-center gap-1.5 shadow-sm">
                    <span className="text-emerald-400 font-bold">{activeIndex + 1}</span>
                    <span className="text-white/50">/</span>
                    <span className="text-white/80">{benefits.length}</span>
                  </div>

                </div>
              </div>

            </div>

            {/* Quick Interactive Benefit Indicator Pills (One-Click Jump to any Benefit) */}
            <div className="pt-8 sm:pt-10 mt-8 sm:mt-10 border-t border-slate-200">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {benefits.map((b, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectBenefit(idx)}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0B6B53] text-white shadow-md font-bold scale-105 ring-2 ring-emerald-600/30'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200 hover:border-slate-300'
                      }`}
                      title={b.title}
                    >
                      {b.title}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
