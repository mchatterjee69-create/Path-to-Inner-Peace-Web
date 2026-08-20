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
    bgImageUrl: 'https://media-cdn.cosmofeed.com/chat/1000155931-2026-30-03-09-07-18.png'
  },
  {
    id: 'mind-mastery',
    title: 'Inner Mastery Module',
    description: 'Rewire your mind, regulate your emotions, and reclaim your power in a structured 2 weeks live journey of cognitive awareness and inner reprogramming.',
    buttonText: 'Start Mastering Your Mind',
    bannerType: 'mind-mastery',
    bgImageUrl: 'https://media-cdn.cosmofeed.com/chat/WhatsApp-Image-2026-03-28-at-2-2026-02-04-09-18-6.jpeg'
  },
  {
    id: 'advanced-stress-management',
    title: 'Advanced Stress Reset Framework',
    description: 'Calm your mind, reset your system, and build lasting emotional resilience in a CBT-based 2 weeks live structured program.',
    buttonText: 'Activate Stress Reset',
    bannerType: 'stress-reset',
    bgImageUrl: 'https://media-cdn.cosmofeed.com/chat/WhatsApp-Image-2026-04-02-at-3-2026-02-04-10-25-23.jpeg'
  },
  {
    id: 'relationship-healing',
    title: 'Relationship Healing Therapy',
    description: 'Heal deep emotional wounds, rebuild trust, and create meaningful connections using evidence-based principles inspired by John Gottman’s Sound Relationship House Theory.',
    buttonText: 'Initiate Your Therapy',
    bannerType: 'relationship',
    bgImageUrl: 'https://media-cdn.cosmofeed.com/chat/1000155399-2026-02-04-01-58-50.png'
  },
  {
    id: 'mindfulness-meditation-journey',
    title: 'COMPLETE MINDFULNESS & MEDITATION JOURNEY',
    description: 'Cultivate awareness, deepen presence, and elevate consciousness. Integrating 8 globally recognized meditation approaches including Vipassana-based insight.',
    buttonText: 'Elevate Your Clarity',
    bannerType: 'meditation',
    bgImageUrl: 'https://media-cdn.cosmofeed.com/chat/1000155400-2026-09-04-03-16-59.png'
  },
  {
    id: 'deeper-awakening',
    title: 'Deeper Awakening Masterclass',
    description: 'Transcend conditioning, expand consciousness, and embody your highest self in an advanced 4 weeks live immersion with Heartfulness practices.',
    buttonText: 'Unlock Your True Potential',
    bannerType: 'awakening',
    bgImageUrl: 'https://media-cdn.cosmofeed.com/chat/1000155401-2026-08-04-11-27-2.png'
  }
];

export const InnerRevolutionView: React.FC = () => {
  const { 
    setIsRegistrationModalOpen, 
    setIsPaymentModalOpen, 
    setSelectedPlan,
    setIsInnerRevolutionModalOpen,
    setIsInnerMasteryModalOpen,
    setIsStressResetModalOpen,
    setIsRelationshipHealingModalOpen,
    setIsMindfulnessJourneyModalOpen,
    setIsDeeperAwakeningModalOpen 
  } = useApp();

  const handleProgramClick = (program: InnerRevolutionProgramItem) => {
    if (program.id === 'complete-inner-revolution') {
      setIsInnerRevolutionModalOpen(true);
      return;
    }

    if (program.id === 'mind-mastery') {
      setIsInnerMasteryModalOpen(true);
      return;
    }

    if (program.id === 'advanced-stress-management') {
      setIsStressResetModalOpen(true);
      return;
    }

    if (program.id === 'relationship-healing') {
      setIsRelationshipHealingModalOpen(true);
      return;
    }

    if (program.id === 'mindfulness-meditation-journey') {
      setIsMindfulnessJourneyModalOpen(true);
      return;
    }

    if (program.id === 'deeper-awakening') {
      setIsDeeperAwakeningModalOpen(true);
      return;
    }

    setIsRegistrationModalOpen(true);
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
            Transform Your Mindset
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

                  {/* 2. Large 16:9 banner image matching popup banner */}
                  <div 
                    className="relative aspect-[16/9] rounded-xl overflow-hidden mb-4 border border-slate-200 shadow-sm bg-slate-900 group cursor-pointer"
                    onClick={() => handleProgramClick(program)}
                  >
                    <img 
                      src={program.bgImageUrl} 
                      alt={program.title} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
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
