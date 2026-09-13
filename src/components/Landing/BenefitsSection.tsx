import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Brain, 
  Target, 
  Moon, 
  Heart, 
  Shield, 
  RefreshCw, 
  Wind, 
  Sun, 
  Sprout, 
  Sparkles,
  HeartPulse 
} from 'lucide-react';
import { ScrollReveal } from '../ScrollReveal';

export const BenefitsSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const benefits = [
    {
      id: 1,
      title: '1. Stress & Anxiety Reduction',
      point1: 'Learn practical breathing, mindfulness and mental-reset techniques to reduce everyday stress.',
      point2: 'Develop the ability to respond to pressure with greater calm rather than automatic reactions.',
      description: 'Learn practical breathing, mindfulness and mental-reset techniques to reduce everyday stress. Develop the ability to respond to pressure with greater calm rather than automatic reactions.',
      icon: Brain,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 2,
      title: '2. Improved Focus & Mental Clarity',
      point1: 'Train your attention to reduce mental distractions, overthinking and cognitive clutter.',
      point2: 'Create greater clarity so you can concentrate on what actually deserves your attention.',
      description: 'Train your attention to reduce mental distractions, overthinking and cognitive clutter. Create greater clarity so you can concentrate on what actually deserves your attention.',
      icon: Target,
      image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 3,
      title: '3. Better Sleep & Deep Relaxation',
      point1: 'Use relaxation and mindfulness practices to help quiet an overactive mind before sleep.',
      point2: 'Build a calmer mental state that supports more restorative and consistent rest.',
      description: 'Use relaxation and mindfulness practices to help quiet an overactive mind before sleep. Build a calmer mental state that supports more restorative and consistent rest.',
      icon: Moon,
      image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 4,
      title: '4. Emotional Balance',
      point1: 'Understand your emotional patterns and learn techniques to create space between emotion and reaction.',
      point2: 'Develop greater emotional stability, self-awareness and control during challenging situations.',
      description: 'Understand your emotional patterns and learn techniques to create space between emotion and reaction. Develop greater emotional stability, self-awareness and control during challenging situations.',
      icon: Heart,
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 5,
      title: '5. Mental Strength & Resilience',
      point1: 'Build the ability to handle setbacks, pressure and difficult thoughts without becoming overwhelmed.',
      point2: 'Strengthen your capacity to recover, adapt and move forward with greater confidence.',
      description: 'Build the ability to handle setbacks, pressure and difficult thoughts without becoming overwhelmed. Strengthen your capacity to recover, adapt and move forward with greater confidence.',
      icon: Shield,
      image: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 6,
      title: '6. Subconscious Pattern Awareness',
      point1: 'Explore how repeated thoughts, beliefs and habits can influence your everyday behaviour.',
      point2: 'Begin identifying unhelpful mental patterns and consciously replacing them with healthier responses.',
      description: 'Explore how repeated thoughts, beliefs and habits can influence your everyday behaviour. Begin identifying unhelpful mental patterns and consciously replacing them with healthier responses.',
      icon: RefreshCw,
      image: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 7,
      title: '7. Mindfulness & Present-Moment Awareness',
      point1: 'Learn to bring your attention back from past regrets and future worries to the present moment.',
      point2: 'Develop greater awareness of your thoughts, emotions, body and surroundings.',
      description: 'Learn to bring your attention back from past regrets and future worries to the present moment. Develop greater awareness of your thoughts, emotions, body and surroundings.',
      icon: Wind,
      image: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 8,
      title: '8. Inner Calm & Nervous-System Regulation',
      point1: 'Experience guided practices designed to shift you from constant mental activation toward a calmer state.',
      point2: 'Learn simple techniques you can continue using whenever you feel mentally overloaded.',
      description: 'Experience guided practices designed to shift you from constant mental activation toward a calmer state. Learn simple techniques you can continue using whenever you feel mentally overloaded.',
      icon: Sun,
      image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 9,
      title: '9. Healthier Mental Habits',
      point1: 'Discover how small, consistent practices can influence your thinking patterns and daily behaviour.',
      point2: 'Create a practical foundation for replacing reactive habits with more conscious choices.',
      description: 'Discover how small, consistent practices can influence your thinking patterns and daily behaviour. Create a practical foundation for replacing reactive habits with more conscious choices.',
      icon: Sprout,
      image: 'https://images.unsplash.com/photo-1489710437720-ebb67ec84dd2?auto=format&fit=crop&w=1200&q=80'
    },
    {
      id: 10,
      title: '10. Personal Reset & Inner Transformation',
      point1: 'Step back from mental autopilot and reconnect with greater clarity, balance and self-awareness.',
      point2: 'Use the five-day experience as a starting point for a deeper Path to Inner Peace.',
      description: 'Step back from mental autopilot and reconnect with greater clarity, balance and self-awareness. Use the five-day experience as a starting point for a deeper Path to Inner Peace.',
      icon: Sparkles,
      image: 'https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?auto=format&fit=crop&w=1200&q=80'
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
    }, 3800);
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
                A structured 10-pillar transformation designed to dissolve stress and anxiety, sharpen mental focus, and restore restorative sleep through nervous-system regulation and present-moment mindfulness.
              </p>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-slate-600">
                Cultivate emotional balance, strengthen mental resilience, and illuminate subconscious patterns to build lasting healthy habits—guiding your personal reset toward genuine inner transformation.
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
                <div className="min-h-[68px] sm:min-h-[80px] overflow-hidden flex items-center">
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
                <div className="mt-4 sm:mt-5 min-h-[110px] sm:min-h-[120px] overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.35, ease: 'easeOut', delay: 0.05 }}
                      className="space-y-2 text-slate-600 font-inter"
                    >
                      <p className="text-base sm:text-lg text-slate-800 font-medium leading-relaxed">
                        {activeBenefit.point1}
                      </p>
                      <p className="text-sm sm:text-base text-slate-500 font-normal leading-relaxed">
                        {activeBenefit.point2}
                      </p>
                    </motion.div>
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
