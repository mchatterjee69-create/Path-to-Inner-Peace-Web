import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';

export interface InnerRevolutionProgramItem {
  id: string;
  title: string;
  description: string;
  buttonText: string;
  bannerType: 'revolution' | 'mind-mastery' | 'stress-reset' | 'relationship' | 'meditation' | 'awakening';
  bgImageUrl: string;
}

const PROGRAM_ITEMS: InnerRevolutionProgramItem[] = [
  {
    id: 'complete-inner-revolution',
    title: 'Complete Inner Revolution Program',
    description: 'Embark on a complete journey to transform your mindset, manage stress effectively, and elevate your emotions and consciousness for lasting inner peace and clarity.',
    buttonText: 'Begin Your Transformation',
    bannerType: 'revolution',
    bgImageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'mind-mastery',
    title: 'Mind Mastery Program',
    description: 'Learn to control your thoughts and emotions while building mental strength, awareness, and resilience to transform your mindset.',
    buttonText: 'Start Mastering Your Mind',
    bannerType: 'mind-mastery',
    bgImageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'advanced-stress-management',
    title: 'Advanced Stress Management Framework',
    description: 'A CBT-based structured framework to reduce stress, build emotional resilience, and develop long-term mental well-being.',
    buttonText: 'Activate Stress Reset',
    bannerType: 'stress-reset',
    bgImageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'relationship-healing',
    title: 'Relationship Healing Therapy',
    description: 'Heal emotional wounds, strengthen relationships, and create healthier connections using proven therapeutic principles.',
    buttonText: 'Initiate Your Therapy',
    bannerType: 'relationship',
    bgImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'mindfulness-meditation-journey',
    title: 'Complete Mindfulness & Meditation Journey',
    description: 'Develop awareness, mindfulness, and higher consciousness through guided meditation practices for greater inner clarity.',
    buttonText: 'Elevate Your Clarity',
    bannerType: 'meditation',
    bgImageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=1000&q=80'
  },
  {
    id: 'deeper-awakening',
    title: 'Deeper Awakening Masterclass',
    description: 'Experience deeper self-awareness, inner freedom, and expanded consciousness through advanced meditation and Heartfulness practices.',
    buttonText: 'Unlock Your True Potential',
    bannerType: 'awakening',
    bgImageUrl: 'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1000&q=80'
  }
];

export const InnerRevolutionView: React.FC = () => {
  const { setIsRegistrationModalOpen, setIsPaymentModalOpen, setSelectedPlan } = useApp();

  const handleProgramClick = (program: InnerRevolutionProgramItem) => {
    if (program.id === 'complete-inner-revolution' || program.id === 'deeper-awakening') {
      setSelectedPlan({
        id: 'INNER_TRANSFORMATION_ELITE',
        name: 'Inner Transformation Elite',
        tagline: 'Complete Mind Mastery & Consciousness Evolution',
        priceINR: 1999,
        priceUSD: 29,
        originalPriceINR: 9999,
        popular: true,
        features: [
          'All 5-Day Challenges & Daily Audio Guides',
          'Live Weekly Coaching & Q&A with Mainak',
          'Full Mind Mastery Pro & Sound Therapy Vault',
          '1-on-1 Guidance & Personalized Roadmap'
        ],
        badgeText: 'MOST COMPREHENSIVE'
      });
      setIsPaymentModalOpen(true);
    } else {
      setIsRegistrationModalOpen(true);
    }
  };

  return (
    <div id="inner-revolution-page" className="min-h-screen bg-white text-slate-900 pt-6 sm:pt-8 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
        
        {/* Left-aligned heading with thin light grey divider below */}
        <motion.div 
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="border-b border-gray-200 pb-3"
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#C89620] tracking-tight text-left">
            Inner Shift Program: Transform Your Mindset
          </h1>
        </motion.div>

        {/* Two-column responsive grid on desktop & tablet, single-column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {PROGRAM_ITEMS.map((program, index) => {
            return (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: index * 0.06 }}
                className="bg-white flex flex-col justify-between h-full"
              >
                <div>
                  {/* 1. Dark green bold program title */}
                  <h2 className="text-lg sm:text-xl font-bold text-[#1F5E2B] mb-3 text-left leading-snug">
                    {program.title}
                  </h2>

                  {/* 2. Large 16:9 banner image */}
                  <div 
                    className="relative aspect-[16/9] rounded-lg overflow-hidden mb-4 border border-slate-200 shadow-sm bg-slate-900 group cursor-pointer"
                    onClick={() => handleProgramClick(program)}
                  >
                    <img 
                      src={program.bgImageUrl} 
                      alt={program.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />

                    {/* Styled Banner Graphic Overlays */}
                    {program.bannerType === 'revolution' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-emerald-950/85 to-indigo-950/80 p-4 sm:p-6 flex flex-col justify-between text-white">
                        <div className="space-y-1">
                          <h3 className="font-extrabold text-sm sm:text-base lg:text-lg tracking-wider text-white uppercase">
                            COMPLETE INNER REVOLUTION <span className="text-[#D4AF37]">PROGRAM</span>
                          </h3>
                          <p className="text-[11px] sm:text-xs text-slate-200 font-medium max-w-sm leading-tight hidden sm:block">
                            A complete system to transform your mindset, emotions, and consciousness for lasting inner peace and clarity.
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <div className="text-[10px] text-emerald-300 uppercase tracking-widest font-semibold">
                            COMPLETE PREMIUM & CORPORATE PROGRAM
                          </div>
                          <span className="px-3 py-1 bg-[#1E3A8A] hover:bg-blue-800 text-white text-[11px] font-bold rounded tracking-wider shadow">
                            ENROLL NOW
                          </span>
                        </div>
                      </div>
                    )}

                    {program.bannerType === 'mind-mastery' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-sky-950/85 to-slate-900/90 p-4 sm:p-6 flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                          <div className="space-y-1 max-w-[65%]">
                            <h3 className="font-extrabold text-sm sm:text-base lg:text-lg text-white uppercase tracking-wider">
                              MIND MASTERY <span className="text-sky-400">PROGRAM</span>
                            </h3>
                            <p className="text-[11px] sm:text-xs text-slate-200 font-medium leading-tight hidden sm:block">
                              Learn to control your thoughts and emotions, building unshakable mental strength and awareness.
                            </p>
                          </div>
                          <div className="hidden sm:flex flex-col gap-1 text-[9px] text-slate-300 text-right">
                            <span className="bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">Thought Control</span>
                            <span className="bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">Emotional Regulation</span>
                            <span className="bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700">Mental Fortitude</span>
                          </div>
                        </div>
                        <div className="flex justify-end pt-2">
                          <span className="px-3 py-1 bg-[#1E3A8A] hover:bg-blue-800 text-white text-[11px] font-bold rounded tracking-wider shadow">
                            ENROLL NOW
                          </span>
                        </div>
                      </div>
                    )}

                    {program.bannerType === 'stress-reset' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/85 to-teal-950/80 p-4 sm:p-6 flex flex-col justify-between text-white">
                        <div className="space-y-1 max-w-md">
                          <h3 className="font-extrabold text-sm sm:text-base lg:text-lg text-white uppercase tracking-wider">
                            ADVANCED STRESS RESET <span className="text-teal-400">FRAMEWORK</span>
                          </h3>
                          <p className="text-[10px] sm:text-xs text-slate-300 font-medium leading-tight hidden sm:block uppercase tracking-wide">
                            A STRUCTURED, DEEP APPROACH TO ELIMINATE STRESS AND BUILD LONG-TERM EMOTIONAL RESILIENCE.
                          </p>
                        </div>
                        <div className="flex justify-start pt-2">
                          <span className="px-3 py-1 bg-[#0F766E] hover:bg-teal-700 text-white text-[11px] font-bold rounded tracking-wider shadow">
                            ENROLL NOW
                          </span>
                        </div>
                      </div>
                    )}

                    {program.bannerType === 'relationship' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-sky-950/85 via-sky-900/75 to-emerald-950/80 p-4 sm:p-6 flex flex-col justify-between text-white">
                        <div className="space-y-1 max-w-xs">
                          <h3 className="font-bold text-sm sm:text-base lg:text-lg text-white">
                            Relationship Healing Therapy
                          </h3>
                          <p className="text-[11px] sm:text-xs text-slate-100 font-normal leading-tight hidden sm:block">
                            Heal emotional wounds and transform your relationships into deeper, healthier connections.
                          </p>
                        </div>
                        <div className="flex justify-start pt-2">
                          <span className="px-3 py-1 bg-[#D4AF37] text-slate-950 text-[11px] font-bold rounded-md tracking-wide shadow flex items-center gap-1">
                            <span>Enroll Now</span>
                            <span>&rsaquo;</span>
                          </span>
                        </div>
                      </div>
                    )}

                    {program.bannerType === 'meditation' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-900/70 to-stone-950/80 p-4 sm:p-6 flex flex-col justify-between text-white">
                        <div className="space-y-1 max-w-xs">
                          <h3 className="font-extrabold text-sm sm:text-base lg:text-lg text-white uppercase tracking-wider">
                            MINDFULNESS & MEDITATION JOURNEY
                          </h3>
                          <p className="text-[11px] sm:text-xs text-slate-200 font-normal leading-tight hidden sm:block">
                            A guided path to develop awareness, presence, and higher consciousness through meditation.
                          </p>
                        </div>
                        <div className="flex justify-start pt-2">
                          <span className="px-3 py-1 bg-[#1E3A8A] text-white text-[11px] font-bold rounded tracking-wider shadow">
                            ENROLL NOW &rsaquo;
                          </span>
                        </div>
                      </div>
                    )}

                    {program.bannerType === 'awakening' && (
                      <div className="absolute inset-0 bg-gradient-to-r from-amber-950/90 via-amber-900/80 to-yellow-950/85 p-4 sm:p-6 flex flex-col justify-between text-white">
                        <div className="space-y-1 max-w-xs">
                          <h3 className="font-extrabold text-sm sm:text-base lg:text-lg text-amber-200 uppercase tracking-widest">
                            DEEPER AWAKENING
                          </h3>
                          <p className="text-[11px] sm:text-xs text-amber-100 font-normal leading-tight hidden sm:block">
                            Go beyond the surface and experience a profound shift in consciousness.
                          </p>
                        </div>
                        <div className="flex justify-start pt-2">
                          <span className="px-3 py-1 bg-[#1E3A8A] text-white text-[11px] font-bold rounded tracking-wider shadow">
                            Enroll Now
                          </span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* 3. Very short description (2–3 lines only) */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 text-left">
                    {program.description}
                  </p>
                </div>

                {/* 4. Rounded dark green CTA button with white text */}
                <div className="text-left pt-1">
                  <button
                    onClick={() => handleProgramClick(program)}
                    className="inline-flex items-center justify-center bg-[#1F5E2B] hover:bg-[#184a22] active:bg-[#12381a] text-white px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm tracking-wide shadow-sm transition-all duration-200 cursor-pointer"
                  >
                    {program.buttonText}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
