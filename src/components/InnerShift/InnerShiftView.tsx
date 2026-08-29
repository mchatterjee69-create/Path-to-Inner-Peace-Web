import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { 
  Wind, 
  Headphones, 
  Volume2, 
  Users, 
  MessageCircle, 
  PhoneCall, 
  ArrowRight,
  Sun
} from 'lucide-react';

export interface ServiceCardItem {
  id: string;
  heading: string;
  description: string;
  buttonText: string;
  imageUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  actionType: 'breathing' | 'meditation' | 'sound' | 'register' | 'whatsapp' | 'call';
}

export const INNER_SHIFT_SERVICES: ServiceCardItem[] = [
  {
    id: 'stress-relief',
    heading: 'Stress Relief Practices',
    description: 'Discover effective breathing techniques, mindfulness exercises and relaxation methods that help manage daily stress naturally and improve overall mental wellbeing.',
    buttonText: 'Practice Now',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80',
    icon: Wind,
    actionType: 'breathing'
  },
  {
    id: 'guided-meditation',
    heading: 'Guided Meditation',
    description: 'Experience structured guided meditation sessions designed to improve awareness, emotional stability, relaxation and inner peace for beginners as well as regular practitioners.',
    buttonText: 'Explore',
    imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80',
    icon: Headphones,
    actionType: 'meditation'
  },
  {
    id: 'sound-therapy',
    heading: 'Sound Therapy',
    description: 'Experience immersive soundscapes, binaural beats, sound bowls and therapeutic frequencies designed to promote deep relaxation, sleep quality and emotional calmness.',
    buttonText: 'Listen Now',
    imageUrl: 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=800&q=80',
    icon: Volume2,
    actionType: 'sound'
  },
  {
    id: 'weekly-live',
    heading: 'Weekly Live Sessions',
    description: 'Join interactive live sessions where practical mental fitness strategies, mindfulness techniques and guided discussions help you stay consistent in your growth.',
    buttonText: 'Register Now',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    icon: Users,
    actionType: 'register'
  },
  {
    id: 'whatsapp-community',
    heading: 'WhatsApp Community',
    description: 'Become part of our supportive WhatsApp Community where you receive daily motivation, Morning Mantra, helpful resources and regular mental wellness updates.',
    buttonText: 'Get Access Now',
    imageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
    icon: MessageCircle,
    actionType: 'whatsapp'
  },
  {
    id: 'need-to-talk',
    heading: 'Need to Talk?',
    description: 'A safe and confidential space where you can express your thoughts, emotions and challenges without judgement while receiving guidance to help regain clarity and direction.',
    buttonText: 'Call Now',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    icon: PhoneCall,
    actionType: 'call'
  }
];

export const InnerShiftView: React.FC = () => {
  const { 
    setActiveView, 
    setIsMeditationCampModalOpen, 
    setIsWeeklyLiveSessionModalOpen 
  } = useApp();

  const handleAction = (item: ServiceCardItem) => {
    switch (item.actionType) {
      case 'breathing':
        setActiveView('breathing');
        break;
      case 'meditation':
        setIsMeditationCampModalOpen(true);
        break;
      case 'sound':
        setActiveView('sound-therapy');
        break;
      case 'register':
        setIsWeeklyLiveSessionModalOpen(true);
        break;
      case 'whatsapp':
        window.open('https://wa.me/919163670300', '_blank');
        break;
      case 'call':
        window.location.href = 'tel:+9191636703000';
        break;
      default:
        setActiveView('landing');
    }
  };

  return (
    <div id="inner-shift-page" className="min-h-screen bg-white text-slate-900 pb-20 font-sans">
      <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10">
        {/* Page Title & Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 border-b border-slate-200 pb-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-extrabold text-[#C89620] tracking-tight flex items-center gap-2.5">
            <Sun className="w-7 h-7 sm:w-9 sm:h-9 text-[#C89620] shrink-0" />
            <span>Welcome to Inner Shift</span>
          </h1>
          <p className="text-sm sm:text-base text-[#C89620] font-semibold max-w-2xl mt-2">
            Transform Your Mindset & Elevate Your Consciousness
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
          {INNER_SHIFT_SERVICES.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-2xl flex flex-col justify-between group"
              >
                <div>
                  {/* Heading */}
                  <div 
                    onClick={() => handleAction(item)}
                    className="flex items-center gap-2.5 mb-3 cursor-pointer"
                  >
                    <div className="p-2 rounded-lg bg-emerald-50 text-[#1b4d2e] group-hover:bg-[#1b4d2e] group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#1b4d2e] group-hover:text-[#0B6B53] transition-colors">
                      {item.heading}
                    </h2>
                  </div>

                  {/* Image */}
                  <div 
                    onClick={() => handleAction(item)}
                    className="relative overflow-hidden rounded-xl border border-slate-100 shadow-sm aspect-[16/9] mb-4 bg-slate-100 cursor-pointer"
                  >
                    <img 
                      src={item.imageUrl} 
                      alt={item.heading} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&w=800&q=80';
                      }}
                    />
                  </div>

                  {/* Short Description */}
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-normal">
                    {item.description}
                  </p>
                </div>

                {/* Green Rounded CTA Button */}
                <div>
                  <button
                    onClick={() => handleAction(item)}
                    className="inline-flex items-center justify-center gap-2 bg-[#235338] hover:bg-[#183e2a] active:bg-[#123020] text-white px-6 py-2.5 rounded-full font-semibold text-sm tracking-wide shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer"
                  >
                    <span>{item.buttonText}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
