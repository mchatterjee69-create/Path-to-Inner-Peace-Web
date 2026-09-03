import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { dispatchFormToAdmin } from '../../utils/formSubmit';
import { 
  Wind, 
  Headphones, 
  Volume2, 
  Users, 
  MessageCircle, 
  PhoneCall, 
  ArrowRight,
  Sun,
  Zap,
  Compass,
  Home,
  X,
  Send,
  CheckCircle2,
  Target,
  TrendingUp,
  UserCheck,
  GraduationCap,
  Building2,
  Flame,
  Brain,
  ShieldCheck,
  HeartHandshake,
  Sparkles,
  Presentation,
  Users2,
  MapPin,
  Sparkle,
  Check,
  ArrowDown
} from 'lucide-react';
import { INNER_SHIFT_SERVICES, ServiceCardItem } from '../InnerShift/InnerShiftView';
import { INNER_REVOLUTION_PROGRAMS, InnerRevolutionProgramItem } from '../InnerShift/InnerRevolutionView';
import confusedLadyBg from '../../assets/images/confused_career_lady_1788439823753.jpg';
import corporateWellnessBg from '../../assets/images/corporate_wellness_bg_1788440459846.jpg';
import { CorporateConsultationModal } from '../CorporateWellness/CorporateConsultationModal';

export const ExplorePathSerialView: React.FC = () => {
  const { 
    setActiveView, 
    setIsRegistrationModalOpen,
    setIsInnerRevolutionModalOpen,
    setIsInnerMasteryModalOpen,
    setIsStressResetModalOpen,
    setIsRelationshipHealingModalOpen,
    setIsMindfulnessJourneyModalOpen,
    setIsDeeperAwakeningModalOpen,
    setIsMeditationCampModalOpen,
    setIsWeeklyLiveSessionModalOpen
  } = useApp();

  // Corporate Wellness Modal state
  const [corporateModalOpen, setCorporateModalOpen] = useState(false);
  const [selectedCorporateProg, setSelectedCorporateProg] = useState<string | undefined>(undefined);

  // Career Axis Floating Chat state
  const [chatOpen, setChatOpen] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryMsg, setInquiryMsg] = useState('');
  const [inquirySent, setInquirySent] = useState(false);

  const handleInnerShiftAction = (item: ServiceCardItem) => {
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

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inquiryMsg.trim()) return;

    dispatchFormToAdmin({
      formType: 'Career Axis Guidance Inquiry',
      fullName: inquiryName || 'Career Axis Visitor',
      details: {
        inquiryMessage: inquiryMsg,
        timestamp: new Date().toISOString()
      }
    });

    const encodedText = encodeURIComponent(`Hi Career Axis Team, my name is ${inquiryName || 'Student/Professional'}. Inquiry: ${inquiryMsg}`);
    window.open(`https://wa.me/919163670300?text=${encodedText}`, '_blank');
    setInquirySent(true);
    setTimeout(() => {
      setInquirySent(false);
      setChatOpen(false);
      setInquiryMsg('');
    }, 2000);
  };

  return (
    <div id="explore-path-serial-page" className="min-h-screen bg-white text-slate-900 pb-24 font-sans selection:bg-[#0B6B53] selection:text-white">
      
      {/* Top Simple Sticky Bar with Back to Home only (NO sub-menu pills) */}
      <div className="bg-slate-50 border-b border-slate-200 py-2.5 px-4 sticky top-16 z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs sm:text-sm font-serif font-bold text-[#1b4d2e]">
            <Compass className="w-4 h-4 text-[#D4AF37]" />
            <span>Complete Transformation Pathway</span>
          </div>
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveView('landing');
            }}
            className="text-xs font-semibold text-slate-700 hover:text-[#0B6B53] flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-slate-200 hover:border-emerald-300 transition-all shadow-xs cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>
      </div>

      {/* =========================================================================
          PART 1: INNER SHIFT (PAGE 1)
      ========================================================================= */}
      <section id="serial-inner-shift" className="pt-8 sm:pt-12 pb-14 sm:pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-12 px-4 sm:px-6 lg:px-8">
          
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

          {/* Service Cards Grid (2 Columns Desktop, 1 Column Mobile) */}
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
                      onClick={() => handleInnerShiftAction(item)}
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
                      onClick={() => handleInnerShiftAction(item)}
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
                      onClick={() => handleInnerShiftAction(item)}
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
      </section>

      {/* =========================================================================
          PART 2: INNER REVOLUTION (PAGE 2)
      ========================================================================= */}
      <section id="serial-inner-revolution" className="pt-12 sm:pt-16 pb-14 sm:pb-20 border-b border-slate-200">
        <div className="max-w-7xl mx-auto space-y-8 sm:space-y-10 px-4 sm:px-6 lg:px-8">
          
          {/* Section Heading with gold accent */}
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="border-b border-gray-200 pb-3"
          >
            <div className="flex items-center gap-2.5">
              <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-[#C89620]" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-extrabold text-[#C89620] tracking-tight text-left">
                Transform Your Mindset & Inner Revolution
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-semibold text-[#1b4d2e] uppercase tracking-wider mt-1.5">
              Structured Live Programs, Emotional Recovery & Higher Consciousness Immersion
            </p>
          </motion.div>

          {/* Two-column responsive grid on desktop & tablet, single-column on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
            {INNER_REVOLUTION_PROGRAMS.map((program, index) => {
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
                    <h3 className="text-lg sm:text-xl font-bold text-[#1F5E2B] mb-3 text-left leading-snug">
                      {program.title}
                    </h3>

                    {/* 2. Large 16:9 banner image */}
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

                    {/* 3. Description */}
                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 text-left">
                      {program.description}
                    </p>
                  </div>

                  {/* 4. Rounded dark green CTA button */}
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
      </section>

      {/* =========================================================================
          PART 3: CAREER AXIS (PAGE 3)
      ========================================================================= */}
      <section id="serial-career-axis" className="pt-12 sm:pt-16 pb-12">
        {/* Top Header Title */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-2.5">
              <Compass className="w-7 h-7 sm:w-9 sm:h-9 text-[#C89620]" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#C89620] sm:text-[#1b4d2e] tracking-tight">
                Career Guidance Services at Career Axis
              </h2>
            </div>
            <div className="w-full h-px bg-slate-200" />
          </motion.div>
        </div>

        {/* FULL-WIDTH CAREER AXIS SECTION (NO CARD) WITH DIM SHADOW BACKGROUND IMAGE */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative w-full my-6 sm:my-8 overflow-hidden bg-[#021811] text-white border-y border-emerald-900/40"
        >
          {/* Background Dim Shadow Image: Lady confused which career to choose */}
          <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
            <img 
              src={confusedLadyBg}
              alt="A student confused and contemplating which career to choose"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center scale-105 filter brightness-[0.38] contrast-[1.12] saturate-[0.85]"
            />
            {/* Dim Shadow and Vignette Gradients before text */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#021811]/95 via-[#04281c]/88 to-[#021811]/96" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#02140e] via-transparent to-[#02140e]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#021811]/40 to-[#02140e]/95" />
          </div>

          {/* Content Container (Full Width Spanning Layout) */}
          <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            {/* Top Brand Header */}
            <div className="flex flex-col items-center text-center space-y-2 border-b border-emerald-700/40 pb-5">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#021811]/90 border-2 border-[#D4AF37] flex items-center justify-center shadow-lg backdrop-blur-xs">
                <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-[#D4AF37]" />
              </div>
              <h3 className="text-2xl sm:text-4xl font-serif font-black tracking-wider text-[#D4AF37] uppercase drop-shadow-md">
                CAREER AXIS
              </h3>
              <p className="text-[11px] sm:text-xs font-bold tracking-widest text-emerald-200 uppercase">
                CLARITY. DIRECTION. SUCCESS.
              </p>
            </div>

            {/* Main Body Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center py-7 sm:py-9">
              
              {/* Left Column: Pain Points & Dilemmas */}
              <div className="space-y-4 text-center md:text-left">
                <div className="inline-block bg-amber-500/20 text-amber-300 font-extrabold text-xs sm:text-sm px-3.5 py-1 rounded-full border border-amber-400/35 backdrop-blur-xs shadow-sm">
                  YOU'RE NOT ALONE 🤯
                </div>
                <h4 className="text-xl sm:text-2xl lg:text-3xl font-black text-amber-400 leading-tight drop-shadow-sm">
                  90% STUDENTS FEEL CONFUSED ABOUT CAREERS.
                </h4>
                
                <ul className="space-y-2.5 text-xs sm:text-sm text-emerald-100 font-medium">
                  <li className="flex items-center gap-2.5 justify-center md:justify-start">
                    <span className="text-amber-400 font-bold text-sm">➤</span> Too many choices.
                  </li>
                  <li className="flex items-center gap-2.5 justify-center md:justify-start">
                    <span className="text-amber-400 font-bold text-sm">➤</span> Too much pressure.
                  </li>
                  <li className="flex items-center gap-2.5 justify-center md:justify-start">
                    <span className="text-amber-400 font-bold text-sm">➤</span> Too little clarity.
                  </li>
                </ul>

                {/* Career Fields Badges */}
                <div className="flex flex-wrap gap-2 justify-center md:justify-start pt-3">
                  <span className="bg-emerald-950/80 border border-emerald-600/40 text-emerald-200 text-[11px] sm:text-xs px-3 py-1 rounded-full backdrop-blur-xs">
                    B.Tech / Engineering
                  </span>
                  <span className="bg-emerald-950/80 border border-emerald-600/40 text-emerald-200 text-[11px] sm:text-xs px-3 py-1 rounded-full backdrop-blur-xs">
                    B.Arch
                  </span>
                  <span className="bg-emerald-950/80 border border-emerald-600/40 text-emerald-200 text-[11px] sm:text-xs px-3 py-1 rounded-full backdrop-blur-xs">
                    Merchant Navy
                  </span>
                  <span className="bg-emerald-950/80 border border-emerald-600/40 text-emerald-200 text-[11px] sm:text-xs px-3 py-1 rounded-full backdrop-blur-xs">
                    B.Pharma
                  </span>
                  <span className="bg-emerald-950/80 border border-emerald-600/40 text-emerald-200 text-[11px] sm:text-xs px-3 py-1 rounded-full backdrop-blur-xs">
                    Paramedical
                  </span>
                  <span className="bg-amber-400/20 border border-amber-400/30 text-amber-200 text-[11px] sm:text-xs px-3 py-1 rounded-full font-bold backdrop-blur-xs">
                    And Many More...
                  </span>
                </div>
              </div>

              {/* Right Column: Key Pillar Benefits (integrated dim background panel) */}
              <div className="bg-emerald-950/50 backdrop-blur-md p-5 sm:p-6 rounded-xl border border-emerald-600/30 space-y-3.5 shadow-xl">
                <div className="flex items-center gap-3.5 text-xs sm:text-sm text-emerald-100 font-bold">
                  <div className="w-8 h-8 rounded-full bg-emerald-800/70 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-sm">
                    <UserCheck className="w-4 h-4 text-amber-300" />
                  </div>
                  <span>1:1 Guidance</span>
                </div>

                <div className="flex items-center gap-3.5 text-xs sm:text-sm text-emerald-100 font-bold">
                  <div className="w-8 h-8 rounded-full bg-emerald-800/70 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-sm">
                    <Target className="w-4 h-4 text-amber-300" />
                  </div>
                  <span>Right Direction</span>
                </div>

                <div className="flex items-center gap-3.5 text-xs sm:text-sm text-emerald-100 font-bold">
                  <div className="w-8 h-8 rounded-full bg-emerald-800/70 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-sm">
                    <TrendingUp className="w-4 h-4 text-amber-300" />
                  </div>
                  <span>Career Growth</span>
                </div>

                <div className="flex items-center gap-3.5 text-xs sm:text-sm text-emerald-100 font-bold">
                  <div className="w-8 h-8 rounded-full bg-emerald-800/70 border border-emerald-400/40 flex items-center justify-center shrink-0 shadow-sm">
                    <GraduationCap className="w-4 h-4 text-amber-300" />
                  </div>
                  <span>Action Roadmap</span>
                </div>
              </div>
            </div>

            {/* Bottom Slogan */}
            <div className="text-center border-t border-emerald-700/40 pt-5 space-y-1.5">
              <p className="text-xs sm:text-sm italic font-serif text-emerald-200">
                Discover Your Path. Design Your Future.
              </p>
              <p className="text-[10px] sm:text-xs font-bold text-[#D4AF37] tracking-wider uppercase">
                GUIDANCE TODAY. SUCCESS TOMORROW.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content Sections below */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          {/* SECTION 1: ABOUT CAREER AXIS */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1b4d2e] tracking-tight">
              About Career Axis
            </h3>

            <p className="text-base sm:text-xl font-serif italic text-slate-700 leading-relaxed">
              Find clarity. Choose the right path. Build your future with confidence.
            </p>

            <p className="text-base sm:text-lg font-serif text-slate-600 leading-relaxed font-normal">
              Career Axis offers personalized career guidance through a detailed decision framework, designed to help you transition from confusion to clarity. Whether you're a student or a professional, we assist you in career mapping to choose the right direction with confidence.
            </p>

            <div className="pt-2">
              <h4 className="text-xl sm:text-2xl font-serif font-bold text-[#1b4d2e] mb-4">
                What You Get:
              </h4>

              {/* Image 1: Professional Consultation */}
              <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
                <img 
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80" 
                  alt="1:1 Professional Career Consultation" 
                  className="w-full h-auto max-h-[420px] object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </motion.section>

          {/* SECTION 2: 1:1 CLARITY SESSION */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1b4d2e] tracking-tight">
              1:1 Clarity Session
            </h3>

            <p className="text-base sm:text-lg font-serif text-slate-600 leading-relaxed font-normal">
              A focused one-on-one session for career mapping that deeply understands your current situation, challenges, and confusion—bringing immediate clarity and direction through a personalized career guidance and decision framework.
            </p>

            {/* Image 2: Global Career Network Map */}
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=1200&q=80" 
                alt="Global Career Mapping & Opportunities" 
                className="w-full h-auto max-h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.section>

          {/* SECTION 3: CAREER MAPPING */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1b4d2e] tracking-tight">
              Career Mapping
            </h3>

            <p className="text-base sm:text-lg font-serif text-slate-600 leading-relaxed font-normal">
              Explore career paths that truly align with your strengths, interests, and long-term potential using a decision framework designed to help you make informed choices.
            </p>

            {/* Image 3: Strategic Career Mapping & Pathway Trajectory */}
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" 
                alt="Strategic Career Mapping and Pathway Direction" 
                className="w-full h-auto max-h-[420px] object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.section>

          {/* SECTION 4: DECISION FRAMEWORK */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1b4d2e] tracking-tight">
              Decision Framework
            </h3>

            <p className="text-base sm:text-lg font-serif text-slate-600 leading-relaxed font-normal">
              A structured approach to career mapping that helps you evaluate options, remove overthinking, and make confident, well-informed career decisions using a reliable decision framework, along with personalized career guidance.
            </p>

            {/* Image 4: Upward Growth Arrow */}
            <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm bg-slate-50">
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80" 
                alt="Action Roadmap and Career Growth" 
                className="w-full h-auto max-h-[420px] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.section>

          {/* SECTION 5: ACTION ROADMAP */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1b4d2e] tracking-tight">
              Action Roadmap
            </h3>

            <p className="text-base sm:text-lg font-serif text-slate-600 leading-relaxed font-normal">
              A clear, step-by-step plan for career mapping that outlines exactly what to do next—skills, direction, and execution—providing a decision framework for personalized career guidance so you can move forward with confidence.
            </p>
          </motion.section>

          {/* FINAL CTA SECTION */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="text-center py-8 sm:py-12 space-y-5"
          >
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-[#C89620] tracking-tight">
              Book Your Session Now
            </h3>

            <div className="pt-2">
              <button
                onClick={() => setActiveView('career-axis-booking')}
                className="inline-flex items-center justify-center gap-2 bg-[#1b4d2e] hover:bg-[#123820] text-white font-bold px-10 sm:px-12 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-emerald-900/30 cursor-pointer"
              >
                <PhoneCall className="w-5 h-5 text-amber-300" />
                <span>Book Now</span>
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* =========================================================================
          PART 4: CORPORATE WELLNESS (PAGE 4)
      ========================================================================= */}
      <section id="serial-corporate-wellness" className="relative w-full overflow-hidden bg-slate-50 text-slate-900 border-t-4 border-[#0B6B53] pt-14 pb-20">
        
        {/* Banner with subtle dim corporate background */}
        <div className="relative overflow-hidden bg-[#021811] text-white py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/40">
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <img 
              src={corporateWellnessBg}
              alt="Corporate Wellness Atmosphere"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.3] contrast-[1.1] scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#021811]/95 via-[#032318]/90 to-[#021811]/95" />
          </div>

          <div className="relative z-10 max-w-5xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-amber-200 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Part 4: Corporate Wellness (Page 4)</span>
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
                Corporate Wellness
              </h2>
              <p className="text-xl sm:text-2xl font-serif font-semibold text-[#D4AF37] tracking-tight">
                Building Healthier Minds. Stronger Teams. Better Workplaces.
              </p>
            </div>

            <p className="text-sm sm:text-base text-emerald-100/90 max-w-3xl leading-relaxed font-normal">
              Path to Inner Peace is your holistic corporate wellness partner helping organizations reduce workplace stress, improve emotional wellbeing, strengthen relationships, enhance focus and build a healthier workplace culture. Our evidence-informed methodologies are tailored specifically for HR leaders, founders, business owners, and L&D decision-makers seeking sustainable cultural transformation.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => {
                  setSelectedCorporateProg(undefined);
                  setCorporateModalOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#C89620] text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:brightness-105 transition-all cursor-pointer border border-amber-300"
              >
                <span>Book a Corporate Wellness Session</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('serial-corporate-key-areas');
                  if (el) {
                    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-100 font-semibold text-sm border border-emerald-700/50 backdrop-blur-xs transition-all cursor-pointer group"
              >
                <span>Key Areas</span>
                <ArrowDown className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setActiveView('corporate-wellness');
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-100 font-semibold text-sm border border-emerald-700/50 backdrop-blur-xs transition-all cursor-pointer"
              >
                <span>Open Dedicated Portal</span>
                <ArrowRight className="w-4 h-4 text-emerald-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Content Container */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 space-y-16">
          
          {/* Key Program Areas */}
          <div id="serial-corporate-key-areas" className="space-y-8 scroll-mt-24">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-bold text-[#0B6B53] tracking-widest uppercase bg-emerald-100 px-3 py-1 rounded-full">
                Core Program Areas
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
                Key Corporate Wellness Programs
              </h3>
              <p className="text-xs sm:text-sm text-slate-600">
                Displaying our specialized executive & team interventions crafted for high-performance workplaces.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Stress & Burnout Management',
                  desc: 'Practical tools to manage workplace stress, emotional pressure and burnout.',
                  icon: Flame,
                  tag: 'Burnout Prevention'
                },
                {
                  title: 'Mindfulness & Meditation',
                  desc: 'Evidence-informed mindfulness and meditation practices for focus, calm and mental clarity.',
                  icon: Brain,
                  tag: 'Focus & Calm'
                },
                {
                  title: 'Emotional Resilience',
                  desc: 'Develop greater self-awareness, emotional regulation and resilience under pressure.',
                  icon: ShieldCheck,
                  tag: 'Mental Fortitude'
                },
                {
                  title: 'Workplace Relationships',
                  desc: 'Build healthier communication, trust and interpersonal relationships within teams.',
                  icon: HeartHandshake,
                  tag: 'Team Cohesion'
                },
                {
                  title: 'Focus & Productivity',
                  desc: 'Improve attention, mental clarity and sustainable performance without promoting unhealthy overwork.',
                  icon: Target,
                  tag: 'Sustainable Output'
                },
                {
                  title: 'Higher Consciousness & Inner Growth',
                  desc: 'Guided practices for deeper self-awareness, purpose and conscious living.',
                  icon: Sparkles,
                  tag: 'Conscious Living'
                }
              ].map((prog, i) => {
                const Icon = prog.icon;
                return (
                  <div 
                    key={i}
                    className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-emerald-600/40 transition-all flex flex-col justify-between space-y-4"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6B53] flex items-center justify-center border border-emerald-200">
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                          {prog.tag}
                        </span>
                      </div>
                      <h4 className="font-serif font-bold text-base text-slate-900">
                        {prog.title}
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {prog.desc}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        setSelectedCorporateProg(prog.title);
                        setCorporateModalOpen(true);
                      }}
                      className="w-full py-2 px-3 rounded-lg bg-slate-50 hover:bg-[#0B6B53] text-slate-700 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer border border-slate-200"
                    >
                      <span>Inquire for Team</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Designed Around Your Organization */}
          <div className="bg-[#04241a] text-white rounded-3xl p-6 sm:p-10 border border-emerald-800/40 shadow-xl space-y-6">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <span className="text-xs font-bold text-amber-300 uppercase tracking-widest">
                Flexible Corporate Formats
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-white">
                Designed Around Your Organization
              </h3>
              <p className="text-xs text-emerald-100/80">
                Sessions can be conducted online or offline, depending on organizational requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { title: 'Corporate Workshops', icon: Presentation, desc: 'Interactive 90-min to half-day team workshops.' },
                { title: 'Employee Wellness Sessions', icon: Users2, desc: 'Regular guided breathwork & calm rituals.' },
                { title: 'Mindfulness & Meditation Programs', icon: Brain, desc: 'Structured multi-week mental mastery tracks.' },
                { title: 'Stress Management Programs', icon: Flame, desc: 'Comprehensive burnout prevention toolkits.' },
                { title: 'Leadership & Emotional Resilience Sessions', icon: ShieldCheck, desc: 'Executive coaching & high-pressure leadership.' },
                { title: 'Customized Wellness Programs', icon: Sparkle, desc: 'Bespoke programs built around your company calendar.' }
              ].map((fmt, idx) => {
                const Icon = fmt.icon;
                return (
                  <div key={idx} className="bg-emerald-950/60 border border-emerald-700/40 rounded-xl p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-amber-300">
                      <Icon className="w-4 h-4" />
                      <h5 className="font-bold text-xs text-white">{fmt.title}</h5>
                    </div>
                    <p className="text-[11px] text-emerald-100/80">{fmt.desc}</p>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-emerald-800/60 text-xs text-emerald-200">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>Online virtual sessions or on-premise sessions tailored to your office location.</span>
              </div>
              <button
                onClick={() => {
                  setSelectedCorporateProg(undefined);
                  setCorporateModalOpen(true);
                }}
                className="px-6 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shrink-0"
              >
                Book a Corporate Wellness Session
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Corporate Consultation Booking Popup Modal */}
      <CorporateConsultationModal 
        isOpen={corporateModalOpen}
        onClose={() => setCorporateModalOpen(false)}
        preselectedProgram={selectedCorporateProg}
      />

      {/* FLOATING CHAT BUTTON & QUICK INQUIRY MODAL */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="relative w-14 h-14 rounded-full bg-[#F5C518] hover:bg-[#e0b010] text-slate-900 shadow-2xl flex items-center justify-center border-2 border-white cursor-pointer hover:scale-105 transition-all active:scale-95 group"
          aria-label="Contact Career Axis Advisor"
        >
          <MessageCircle className="w-7 h-7 text-slate-900 group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-bounce shadow-md">
            1
          </span>
        </button>

        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="absolute bottom-16 right-0 w-[88vw] max-w-[340px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden text-slate-800 z-50"
            >
              <div className="bg-[#093d2e] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#05281e] border border-[#D4AF37] flex items-center justify-center">
                    <Compass className="w-4 h-4 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-sm text-[#D4AF37]">Career Axis Guidance</h4>
                    <p className="text-[10px] text-emerald-200">Online & Ready to Help</p>
                  </div>
                </div>
                <button 
                  onClick={() => setChatOpen(false)}
                  className="text-emerald-300 hover:text-white p-1 rounded-full cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-3 bg-slate-50">
                {inquirySent ? (
                  <div className="bg-emerald-100 text-emerald-900 p-3 rounded-xl text-center space-y-1">
                    <CheckCircle2 className="w-6 h-6 text-emerald-700 mx-auto" />
                    <p className="text-xs font-bold">Connecting to WhatsApp Advisor...</p>
                  </div>
                ) : (
                  <>
                    <p className="text-xs font-serif text-slate-700 leading-relaxed">
                      Namaste! Need assistance with 1:1 Career Mapping or Decision Framework? Ask us directly:
                    </p>

                    <form onSubmit={handleSendInquiry} className="space-y-2">
                      <input 
                        type="text" 
                        placeholder="Your Name (Optional)"
                        value={inquiryName}
                        onChange={(e) => setInquiryName(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B6B53] bg-white"
                      />
                      <textarea
                        rows={2}
                        placeholder="Type your career question..."
                        value={inquiryMsg}
                        onChange={(e) => setInquiryMsg(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#0B6B53] bg-white resize-none"
                      />
                      <button
                        type="submit"
                        className="w-full py-2 bg-[#1b4d2e] hover:bg-[#123820] text-white font-bold rounded-lg text-xs flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 text-amber-300" />
                        <span>Send via WhatsApp</span>
                      </button>
                    </form>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};
