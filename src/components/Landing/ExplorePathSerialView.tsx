import React, { useState } from 'react';
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
import corporateWellnessBg from '../../assets/images/corporate_wellness_bg_1788440459846.jpg';
import corporateBurnoutImage from '../../assets/images/corporate_burnout_stress_1788454326993.jpg';
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
          PART 3: CORPORATE WELLNESS (PAGE 3)
      ========================================================================= */}
      <section id="serial-corporate-wellness" className="relative w-full overflow-hidden bg-slate-50 text-slate-900 border-t-4 border-[#0B6B53] pt-14 pb-20">
        
        {/* Part 3 Eyebrow Bar */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between gap-4 pb-4 border-b border-stone-200"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
              <Building2 className="w-4 h-4 text-[#0B6B53]" />
              <span>Part 3: Corporate Wellness</span>
            </div>
            <span className="text-xs text-stone-500 font-medium">
              Workplace Mental Health & Team Resilience
            </span>
          </motion.div>
        </div>

        {/* PROMINENT FOREGROUND LAYERED IMAGE (ELEVATED 3D EFFECT OVERLAPPING DEEP EMERALD HERO) */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 -mb-16 sm:-mb-24 md:-mb-32 lg:-mb-40">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="relative group"
          >
            {/* Multi-layered soft ambient drop shadow behind the image for 3D elevation */}
            <div 
              aria-hidden="true"
              className="absolute -inset-2 sm:-inset-4 bg-gradient-to-b from-black/20 via-[#021811]/40 to-[#021811]/70 rounded-3xl blur-2xl opacity-80 transform translate-y-4 sm:translate-y-8 pointer-events-none"
            />

            {/* Elevated Floating Image Card - Not a flat box, pure rounded image with subtle ring & deep layered shadow */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5),0_12px_28px_-8px_rgba(2,24,17,0.4)] ring-1 ring-black/5 bg-white border border-white/80">
              <img 
                src={corporateBurnoutImage}
                alt="Corporate Workplace Stress, Burnout & Dilemmas - Meeting overload, mental fatigue and work-life balance challenges"
                className="w-full h-auto object-cover transform hover:scale-[1.008] transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>
        </div>

        {/* FULL-WIDTH CORPORATE WELLNESS HERO SECTION EXTENDING BEHIND THE ELEVATED FOREGROUND IMAGE */}
        <div className="relative z-10 overflow-hidden bg-gradient-to-b from-[#021811] via-[#032318] to-[#021811] text-white pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 border-b border-emerald-900/40">
          <div className="absolute inset-0 pointer-events-none select-none overflow-hidden">
            <img 
              src={corporateWellnessBg}
              alt="Corporate Wellness Atmosphere"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover brightness-[0.60] contrast-[1.15] opacity-80 scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#021811]/85 via-[#032318]/60 to-[#021811]/85" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/40 via-transparent to-[#021811]/85" />
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
                  setActiveView('partner-with-us');
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-900/80 text-emerald-100 font-semibold text-sm border border-emerald-700/50 backdrop-blur-xs transition-all cursor-pointer"
              >
                <span>Open Partner With Us Portal</span>
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


    </div>
  );
};
