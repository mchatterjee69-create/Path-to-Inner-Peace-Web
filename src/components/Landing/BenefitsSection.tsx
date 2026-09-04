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
      description: 'Lower cortisol levels through targeted vagus nerve stimulation and somatic stress release.',
      icon: HeartPulse,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Calm Overthinking',
      description: 'Break anxious thought loops and catastrophizing using proven cognitive re-framing techniques.',
      icon: Compass,
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Better Sleep',
      description: 'Unwind your mind before bedtime with deep restorative soundscapes and delta wave pacing.',
      icon: Moon,
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Emotional Healing',
      description: 'Release past grievances, unburden unresolved stress, and cultivate radical self-compassion.',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Mental Clarity',
      description: 'Eliminate brain fog and gain sharp, razor-focused clarity for work and critical daily decisions.',
      icon: Lightbulb,
      image: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Confidence Reset',
      description: 'Overcome imposter syndrome, dismantle self-doubt, and step boldly into your innate core worth.',
      icon: Zap,
      image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Mindfulness',
      description: 'Cultivate grounded, non-judgmental present-moment awareness throughout busy workdays.',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Breathing Exercises',
      description: 'Master 3-10 minute Box Breathing and 4-7-8 calming breath patterns for instant physiological calm.',
      icon: Wind,
      image: 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Guided Meditation',
      description: 'Immerse in daily audio tracks accompanied by 432Hz ambient natural acoustic frequencies.',
      icon: Headphones,
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Healthy Habits',
      description: 'Build an unbroken streak of 10-minute daily mental reset rituals that compound effortlessly.',
      icon: Activity,
      image: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      title: 'Subconscious Mastery',
      description: 'Rewire limiting subconscious thought programs and anchor deep, unwavering internal stillness.',
      icon: Brain,
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

  // Smooth continuous auto-cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length);
    }, 3200);
    return () => clearInterval(interval);
  }, [benefits.length]);

  const activeBenefit = benefits[activeIndex];
  const ActiveIcon = activeBenefit.icon;

  return (
    <section className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="relative w-full max-w-6xl mx-auto">
        
        {/* Section Header */}
        <ScrollReveal variant="slide-up">
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200/70 inline-flex items-center gap-1.5 shadow-xs">
              <HeartPulse className="w-3.5 h-3.5 text-[#0B6B53]" />
              HOLISTIC MENTAL TRANSFORMATION
            </span>
            
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl md:text-5xl text-slate-900 mt-4 tracking-tight">
              Comprehensive Benefits of Your 5-Day Mind Reset
            </h2>
            
            <div className="mt-4 max-w-3xl mx-auto space-y-2.5 text-slate-600 font-inter">
              <p className="text-base sm:text-lg md:text-xl font-bold text-[#0B6B53] tracking-tight">
                Reset Your Mind. Reclaim Your Inner Peace.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-600">
                Reduce stress and overthinking while building emotional balance, confidence, mindfulness, and healthier daily habits through breathing exercises and guided meditation.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-600">
                Learn to work with your subconscious patterns, strengthen self-awareness, and create a calmer, more focused, and empowered version of yourself in just 5 days.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* SYNCHRONIZED TEXT ANIMATION & SLIDING IMAGE SHOWCASE */}
        <ScrollReveal variant="fade">
          <div className="relative w-full py-2 sm:py-4">
            
            {/* Split Showcase Layout (Desktop Side-by-Side, Mobile Stacked) */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-12 items-center">
              
              {/* Left Column: Synchronized Golden Text Animation Content */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">

                {/* Animated Single Line Title Container */}
                <div className="min-h-[58px] sm:min-h-[68px] overflow-hidden flex items-center">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, x: 28, filter: 'blur(3px)' }}
                      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                      exit={{ opacity: 0, x: -28, filter: 'blur(3px)' }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="flex items-center gap-3 sm:gap-4 font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight"
                    >
                      <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-amber-50/90 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shadow-xs shrink-0">
                        <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37]" />
                      </div>
                      <span className="leading-tight text-[#D4AF37] gold-text font-extrabold">{activeBenefit.title}</span>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Synchronized Animated Description Subline */}
                <div className="mt-3 sm:mt-4 min-h-[52px] sm:min-h-[60px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.p
                      key={activeIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                      className="text-base sm:text-lg text-slate-600 font-inter leading-relaxed"
                    >
                      {activeBenefit.description}
                    </motion.p>
                  </AnimatePresence>
                </div>

              </div>

              {/* Right Column: Clean Synchronized Sliding Relevant Image Stage */}
              <div className="lg:col-span-6 w-full">
                <div className="relative w-full aspect-[4/3] sm:aspect-[16/11] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl border border-slate-200/80 bg-slate-950">
                  
                  {/* Clean Sliding Image Animation Container */}
                  <AnimatePresence mode="popLayout">
                    <motion.div
                      key={activeIndex}
                      variants={{
                        enter: {
                          x: '100%',
                          opacity: 0.7,
                          scale: 1.04
                        },
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
                        exit: {
                          x: '-100%',
                          opacity: 0,
                          scale: 0.96,
                          transition: {
                            x: { type: 'spring', stiffness: 220, damping: 26 },
                            opacity: { duration: 0.3 }
                          }
                        }
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
                    </motion.div>
                  </AnimatePresence>

                </div>
              </div>

            </div>

          </div>
        </ScrollReveal>

      </div>
    </section>
  );
};
