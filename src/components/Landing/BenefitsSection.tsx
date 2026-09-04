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
  Activity
} from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const BenefitsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const benefits = [
    {
      title: 'Reduce Stress',
      description: 'Lower cortisol levels through targeted vagus nerve stimulation.',
      icon: HeartPulse,
      tag: 'Nervous System'
    },
    {
      title: 'Calm Overthinking',
      description: 'Break anxious thought loops using cognitive re-framing techniques.',
      icon: Compass,
      tag: 'Cognitive Calm'
    },
    {
      title: 'Better Sleep',
      description: 'Unwind your mind before bedtime with deep restorative soundscapes.',
      icon: Moon,
      tag: 'Restorative Sleep'
    },
    {
      title: 'Emotional Healing',
      description: 'Release past grievances and cultivate radical self-compassion.',
      icon: Heart,
      tag: 'Self-Compassion'
    },
    {
      title: 'Mental Clarity',
      description: 'Eliminate brain fog and gain sharp focus for work and daily decisions.',
      icon: Lightbulb,
      tag: 'Deep Focus'
    },
    {
      title: 'Confidence Reset',
      description: 'Overcome imposter syndrome and step boldly into your core worth.',
      icon: Zap,
      tag: 'Self-Worth'
    },
    {
      title: 'Mindfulness',
      description: 'Cultivate non-judgmental present-moment awareness every day.',
      icon: Sun,
      tag: 'Presence'
    },
    {
      title: 'Breathing Exercises',
      description: 'Master 3-10 minute Box Breathing and Calming Breath patterns.',
      icon: Wind,
      tag: 'Breathwork'
    },
    {
      title: 'Guided Meditation',
      description: 'Immerse in daily audio tracks accompanied by nature soundscapes.',
      icon: Headphones,
      tag: 'Audio Resets'
    },
    {
      title: 'Healthy Habits',
      description: 'Build an unbroken streak of 10-minute daily mental reset rituals.',
      icon: Activity,
      tag: 'Daily Habit'
    },
    {
      title: 'Subconscious Mastery',
      description: 'Rewire limiting mental programs and anchor deep subconscious calm.',
      icon: Brain,
      tag: 'Subconscious'
    }
  ];

  // Auto-cycle through each title line-by-line smoothly every 2.8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [benefits.length]);

  const activeBenefit = benefits[activeIndex];
  const ActiveIcon = activeBenefit.icon;

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal variant="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12">
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

        {/* PROMINENT SINGLE-LINE TITLE ROTATING SHOWCASE (SMOOTH ANIMATION, CLEAN FULL-WIDTH) */}
        <ScrollReveal variant="fade">
          <div className="relative w-full py-2 sm:py-4">
            {/* THE PROMINENT SINGLE LINE TITLE ANIMATION */}
            <div className="py-8 sm:py-12 md:py-14 flex flex-col items-center justify-center text-center">
              
              {/* Single Line Headline Container */}
              <div className="w-full flex items-center justify-center min-h-[64px] sm:min-h-[80px] md:min-h-[90px] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 28, filter: 'blur(4px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, y: -28, filter: 'blur(4px)' }}
                    transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                    className="flex items-center justify-center gap-3 sm:gap-4 md:gap-5 font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-900 tracking-tight whitespace-nowrap"
                  >
                    <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0B6B53] shadow-sm shrink-0">
                      <ActiveIcon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
                    </div>
                    <span>
                      {activeBenefit.title}
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Synchronized Description Subline */}
              <div className="mt-4 sm:mt-6 max-w-2xl min-h-[48px] flex items-center justify-center">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                    className="text-sm sm:text-base md:text-lg text-slate-600 font-inter leading-relaxed text-center"
                  >
                    {activeBenefit.description}
                  </motion.p>
                </AnimatePresence>
              </div>

            </div>

            {/* Quick Interactive Benefit Indicator Pills (One-Click Jump to any Title) */}
            <div className="pt-6 border-t border-slate-200">
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
                {benefits.map((b, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveIndex(idx)}
                      className={`px-3 sm:px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 ${
                        isCurrent
                          ? 'bg-[#0B6B53] text-white shadow-md font-bold scale-105'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200'
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
