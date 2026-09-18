import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Dumbbell, 
  GraduationCap, 
  Handshake, 
  Flame, 
  Brain, 
  HeartHandshake, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Globe2, 
  Users2, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  ArrowDown,
  CalendarCheck, 
  Presentation, 
  Laptop, 
  MapPin, 
  Award, 
  TrendingUp, 
  Check, 
  PhoneCall,
  Sparkle,
  Activity,
  BookOpen,
  Zap,
  Clock,
  MessageCircle,
  HelpCircle,
  Smile
} from 'lucide-react';
import { PartnerCategory } from '../../types';
import { PartnerConsultationModal } from './PartnerConsultationModal';

// Images
import gymWellnessImage from '../../assets/images/gym_wellness_partner_1789548961424.jpg';
import collegeWellnessImage from '../../assets/images/college_campus_wellness_1789548973586.jpg';
import corporateBurnoutImage from '../../assets/images/corporate_burnout_stress_1788454326993.jpg';
import corporateWellnessBg from '../../assets/images/corporate_wellness_bg_1788440459846.jpg';

export const PartnerWithUsView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<PartnerCategory>('corporate');
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>(undefined);
  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState<PartnerCategory>('corporate');

  const handleOpenConsultation = (category: PartnerCategory = activeTab, programName?: string) => {
    setSelectedCategoryForModal(category);
    setSelectedProgram(programName);
    setIsModalOpen(true);
  };

  // High-level vertical tabs
  const PARTNER_VERTICALS = [
    {
      id: 'corporate' as PartnerCategory,
      title: 'Corporates & Startups',
      icon: Building2,
      subtitle: 'Workplace Mental Health, Executive Burnout & Psychological Safety',
      badge: 'Enterprises & Teams'
    },
    {
      id: 'gym' as PartnerCategory,
      title: 'Gyms & Fitness Studios',
      icon: Dumbbell,
      subtitle: 'Somatic Recovery, Vagus Nerve Cooldown & Mental Conditioning',
      badge: 'Athletic & Fitness'
    },
    {
      id: 'college' as PartnerCategory,
      title: 'Colleges & Universities',
      icon: GraduationCap,
      subtitle: 'Student Exam Anxiety, Youth Mental Resilience & Career Fortitude',
      badge: 'Higher Education'
    },
    {
      id: 'other' as PartnerCategory,
      title: 'Communities & Retreats',
      icon: Handshake,
      subtitle: 'Co-Branded Mindful Masterclasses, Pop-Ups & Consciousness Circles',
      badge: 'Holistic & Studio'
    }
  ];

  // Specific Programs for Corporates
  const CORPORATE_PROGRAMS = [
    {
      id: 'stress-burnout',
      title: 'Stress & Burnout Decompression',
      icon: Flame,
      summary: 'Practical cognitive & nervous system tools to counteract deadline overwhelm, Zoom fatigue, and talent exhaustion.',
      details: [
        'Recognize subtle cognitive and physiological burnout triggers',
        'In-the-moment 3-minute nervous system reset techniques',
        'Sustainable boundary setting amidst 24/7 Slack culture',
        'Proven retention and energy restoration for high-velocity teams'
      ],
      tag: 'Workplace Essential'
    },
    {
      id: 'mindfulness-focus',
      title: 'Mindfulness & Attentional Focus',
      icon: Brain,
      summary: 'Evidence-informed mindfulness and breathwork practices that elevate focus and reduce context-switching drag.',
      details: [
        'Scientifically grounded breathwork for cognitive clarity',
        'Attentional anchors to handle distraction & email overload',
        'Pre-meeting micro-rituals for calm executive presence',
        'Sustained mental flow without toxic caffeinated spikes'
      ],
      tag: 'Cognitive Flow'
    },
    {
      id: 'emotional-resilience',
      title: 'Executive Emotional Resilience',
      icon: ShieldCheck,
      summary: 'Equip founders, team leads, and managers with emotional regulation to navigate volatility with composure.',
      details: [
        'Cognitive reframing for corporate pivots & crisis moments',
        'Emotional self-regulation to prevent reactive leadership',
        'Eradicating toxic friction with non-defensive communication',
        'Building psychological fortitude across executive ranks'
      ],
      tag: 'Leadership Tier'
    }
  ];

  // Specific Programs for Gyms & Fitness Centers
  const GYM_PROGRAMS = [
    {
      id: 'somatic-recovery',
      title: 'Somatic Vagus Nerve Cooldown',
      icon: Activity,
      summary: 'Bridge the missing link in physical training: shifting members from sympathetic fight-or-flight into parasympathetic deep recovery.',
      details: [
        'Post-workout 12-minute parasympathetic breathwork sequences',
        'Vagus nerve activation to lower heart rate and cortisol post-lifting',
        'Accelerated muscular recovery & enhanced sleep architecture',
        'Reduces central nervous system (CNS) burnout in heavy lifters'
      ],
      tag: 'Post-Workout Gold Standard'
    },
    {
      id: 'mind-muscle-resilience',
      title: 'Mind-Muscle Mental Conditioning',
      icon: Dumbbell,
      summary: 'Teach gym members and athletes how to overcome mental fatigue, self-doubt, and break through training plateaus.',
      details: [
        'Mental grit and perceptual fatigue mitigation',
        'Focus anchors during high-intensity metabolic intervals',
        'Breath-regulated pain tolerance & calm under heavy exertion',
        'Workshops for personal trainers to coach holistic wellbeing'
      ],
      tag: 'Athletic Conditioning'
    },
    {
      id: 'gym-member-pass',
      title: 'Digital Wellness Pass for Members',
      icon: Sparkles,
      summary: 'Provide every gym member with premium app access to the 5-Day Mind Reset challenge, binaural soundscapes, and guided journals.',
      details: [
        'Co-branded gym onboarding mental fitness package',
        'Increases gym member retention and monthly renewal rates',
        'Monthly in-studio weekend breathwork masterclasses',
        'Differentiates your gym as a holistic health sanctuary'
      ],
      tag: 'Retention Multiplier'
    }
  ];

  // Specific Programs for Colleges & Universities
  const COLLEGE_PROGRAMS = [
    {
      id: 'exam-anxiety',
      title: 'Pre-Exam Anxiety & Mental Calm Reset',
      icon: BookOpen,
      summary: 'Targeted cognitive reframing and physiological calming protocols designed specifically for students facing academic evaluation pressure.',
      details: [
        'Overcoming catastrophic thinking and fear of failure',
        'Quick breathing techniques to stop panic before examinations',
        'Attentional clarity to optimize study retention and memory',
        'Healthy study pacing to avoid caffeine-fueled all-nighters'
      ],
      tag: 'Academic Wellness'
    },
    {
      id: 'career-anxiety',
      title: 'Placement & Career Direction Fortitude',
      icon: Compass,
      summary: 'Grounded guidance for final-year students facing placement stress, campus interviews, and career confusion.',
      details: [
        'Overcoming imposter syndrome and interview anxiety',
        'Integrating Career Axis principles to match inner strengths with jobs',
        'Emotional resilience when navigating rejection or market downturns',
        'Clarity over societal comparison and peer envy'
      ],
      tag: 'Career Readiness'
    },
    {
      id: 'campus-induction',
      title: 'Campus Orientation & Youth Mental Reset',
      icon: GraduationCap,
      summary: 'Interactive, high-energy 90-minute auditorium sessions during freshers orientation to build campus-wide mental health awareness.',
      details: [
        'Destigmatizing mental health support on campus',
        'Building emotional regulation habits early in college life',
        'Faculty & student advisor sensitivity workshops',
        'Free digital app passes for all enrolled campus students'
      ],
      tag: 'Campus-Wide Impact'
    }
  ];

  // Institutional value metrics
  const VALUE_METRICS = [
    {
      stat: '94%',
      label: 'Stress Reduction',
      desc: 'Participants report immediate alleviation in acute stress and anxiety within one session.'
    },
    {
      stat: '3.2x',
      label: 'Engagement ROI',
      desc: 'Measurable uplift in workplace morale, student attendance, and gym member retention.'
    },
    {
      stat: '100%',
      label: 'Custom Tailored',
      desc: 'Programs designed around your timetable, audience age, and specific institutional objectives.'
    },
    {
      stat: 'Hybrid',
      label: 'Online & Onsite',
      desc: 'Live interactive virtual webinars or immersive hands-on workshops across all major Indian cities.'
    }
  ];

  return (
    <div id="partner-with-us-page" className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      
      {/* Top Breadcrumb Header */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <Handshake className="w-4 h-4 text-[#0B6B53]" />
            <span>Path to Inner Peace • Institutional Partnerships</span>
          </div>
          <span className="hidden sm:inline-block text-xs text-slate-500 font-medium">
            Gyms • Colleges & Universities • Corporates & Enterprises
          </span>
        </motion.div>
      </div>

      {/* =========================================================================
          HERO & INTRO SECTION (Deep Emerald Sanctuary Architecture)
      ========================================================================= */}
      <section className="relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#021811] via-[#032419] to-[#021811] text-white border-b border-emerald-900/40 mt-6">
        {/* Background Image with dark cinematic gradient overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <img 
            src={corporateWellnessBg}
            alt="Wellness Partnership Environment"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.60] contrast-[1.15] saturate-[0.85] opacity-80 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#021811]/85 via-[#032419]/60 to-[#021811]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021811] via-emerald-950/30 to-[#021811]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 pb-14 sm:pb-20 space-y-8">
          <div className="max-w-3xl space-y-6">
            
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-[#D4AF37]/50 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-xs"
            >
              <Handshake className="w-4 h-4 text-[#D4AF37]" />
              <span>Institutional & Organizational Collaborations</span>
            </motion.div>

            {/* Main Title */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                Partner With Us
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-[#D4AF37] tracking-tight leading-snug">
                Holistic Mental Reset & Wellness Architecture for Gyms, Colleges & Corporates
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-normal"
            >
              Whether you are an innovative <strong>gym owner</strong> looking to offer members parasympathetic post-workout recovery, a forward-looking <strong>university or college</strong> empowering students against exam burnout, or an ambitious <strong>corporate enterprise</strong> dismantling workplace stress — Path to Inner Peace delivers transformative, evidence-informed mental health and breathwork programs tailored to your community.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => handleOpenConsultation(activeTab)}
                className="btn-corporate-primary inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#C89620] text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-98 transition-all cursor-pointer border border-amber-300"
              >
                <span>Book a Partnership Discovery Call</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => {
                  const target = document.getElementById('partner-verticals');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-100 font-semibold text-sm border border-emerald-700/50 backdrop-blur-xs transition-all cursor-pointer group"
              >
                <span>Explore Verticals</span>
                <ArrowDown className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Quick Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs text-emerald-200/90 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Onsite & Live Virtual Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-amber-300" />
                <span>Custom Curriculum for Every Cohort</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Evidence-Informed Methodology</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Value Metrics Bar */}
        <div className="border-t border-emerald-800/40 bg-black/30 backdrop-blur-xs py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {VALUE_METRICS.map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-serif font-black text-[#D4AF37]">
                    {item.stat}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                    {item.label}
                  </p>
                  <p className="text-[11px] sm:text-xs text-emerald-200/80 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PARTNER VERTICALS SELECTOR (Interactive Tabs for Gym, College, Corporate)
      ========================================================================= */}
      <section id="partner-verticals" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-10 scroll-mt-24">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0B6B53] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#0B6B53]" />
            <span>Tailored Collaboration Models</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Who We Partner With
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Select your sector below to explore how Path to Inner Peace integrates seamlessly into your facility, campus, or corporate environment.
          </p>
        </div>

        {/* Tab Navigation Pill Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {PARTNER_VERTICALS.map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0B6B53] text-white border-[#0B6B53] shadow-lg scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      isSelected ? 'bg-white/15 text-amber-300' : 'bg-emerald-50 text-[#0B6B53]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-400 text-slate-950' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {tab.badge}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-sm sm:text-base leading-snug">
                    {tab.title}
                  </h3>
                </div>

                <p className={`text-xs mt-2 line-clamp-2 ${isSelected ? 'text-emerald-100/90' : 'text-slate-500'}`}>
                  {tab.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* =========================================================================
            ACTIVE VERTICAL SHOWCASE SECTION
        ========================================================================= */}

        {/* 1. GYM & FITNESS STUDIOS TAB */}
        {activeTab === 'gym' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Gym Featured Hero Card */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Visual Image */}
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-slate-900">
                  <img 
                    src={gymWellnessImage} 
                    alt="Gym and Fitness Studio Somatic Recovery"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="inline-block text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37] text-slate-950 px-2.5 py-0.5 rounded-full">
                      Mind + Muscle Cooldown
                    </span>
                    <p className="text-sm font-medium text-white/90">
                      Transforming gyms from mere calorie-burning rooms into true sanctuaries of vitality and recovery.
                    </p>
                  </div>
                </div>

                {/* Narrative & Solutions */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B53] text-xs font-bold uppercase">
                      <Dumbbell className="w-3.5 h-3.5 text-[#0B6B53]" />
                      <span>Gym & Fitness Studio Partnerships</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                      Elevate Member Retention with Somatic Nervous System Cooldowns
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Most gym members push hard during workouts, leaving in a hyper-aroused sympathetic state that spikes cortisol and impairs sleep. By partnering with Path to Inner Peace, your gym can offer <strong>guided vagus nerve resets, post-workout breathwork, and mental fitness coaching</strong> that dramatically accelerate muscular recovery, prevent burnout, and boost membership retention.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>15-Minute Post-Workout Cooldowns:</strong> Vagus nerve regulation that accelerates tissue repair.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Personal Trainer Mental Conditioning:</strong> Upskill coaches to guide holistic wellbeing.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Digital App Inclusion:</strong> Complimentary 5-day challenge passes for every member.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => handleOpenConsultation('gym', 'Gym & Fitness Studio Partnership')}
                      className="px-6 py-3.5 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Partner With Your Gym</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </button>
                    <span className="text-xs text-slate-500 font-medium">
                      Tailored for boutique studios, CrossFit boxes & major gym chains.
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Gym Programs Cards */}
            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                Key Offerings for Gyms & Fitness Centers
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {GYM_PROGRAMS.map((prog, idx) => {
                  const Icon = prog.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6B53] flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            {prog.tag}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-slate-900">
                          {prog.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {prog.summary}
                        </p>
                        <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                          {prog.details.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#0B6B53] shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 mt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleOpenConsultation('gym', prog.title)}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0B6B53] text-slate-800 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                        >
                          <span>Inquire for This Module</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. COLLEGES & UNIVERSITIES TAB */}
        {activeTab === 'college' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* College Featured Hero Card */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Visual Image */}
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-slate-900">
                  <img 
                    src={collegeWellnessImage} 
                    alt="Colleges and Universities Campus Wellness Workshop"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="inline-block text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37] text-slate-950 px-2.5 py-0.5 rounded-full">
                      Campus Mental Resilience
                    </span>
                    <p className="text-sm font-medium text-white/90">
                      Equipping students with cognitive fortitude, exam calm, and emotional grounding for life.
                    </p>
                  </div>
                </div>

                {/* Narrative & Solutions */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B53] text-xs font-bold uppercase">
                      <GraduationCap className="w-3.5 h-3.5 text-[#0B6B53]" />
                      <span>Higher Education Collaborations</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                      Empowering Students Against Academic Pressure & Career Anxiety
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Students face unprecedented anxiety from competitive exams, placement hurdles, social media comparison, and career uncertainty. Path to Inner Peace conducts lively, experiential campus masterclasses that combine <strong>CBT cognitive clarity, yogic breathwork, and career alignment frameworks</strong> to help students regain emotional poise and academic confidence.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Pre-Exam Calm Sessions:</strong> Rapid calming techniques to prevent test anxiety & memory blocks.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Freshers Induction Masterclasses:</strong> Interactive 90-min auditorium mental reset sessions.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Career Axis Alignment:</strong> 1:1 insights to navigate placement stress and imposter syndrome.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => handleOpenConsultation('college', 'College & University Campus Partnership')}
                      className="px-6 py-3.5 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Partner for Your College</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </button>
                    <span className="text-xs text-slate-500 font-medium">
                      Ideal for student welfare cells, deans, and campus societies.
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* College Programs Cards */}
            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                Key Offerings for Colleges & Educational Institutions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COLLEGE_PROGRAMS.map((prog, idx) => {
                  const Icon = prog.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6B53] flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            {prog.tag}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-slate-900">
                          {prog.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {prog.summary}
                        </p>
                        <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                          {prog.details.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#0B6B53] shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 mt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleOpenConsultation('college', prog.title)}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0B6B53] text-slate-800 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                        >
                          <span>Inquire for This Module</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. CORPORATES & ENTERPRISES TAB */}
        {activeTab === 'corporate' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Corporate Featured Hero Card */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Visual Image */}
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-slate-900">
                  <img 
                    src={corporateBurnoutImage} 
                    alt="Corporate Workplace Stress and Burnout Management"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="inline-block text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37] text-slate-950 px-2.5 py-0.5 rounded-full">
                      Executive Wellness Architecture
                    </span>
                    <p className="text-sm font-medium text-white/90">
                      Restoring focus, team harmony, and psychological safety in high-pressure workplaces.
                    </p>
                  </div>
                </div>

                {/* Narrative & Solutions */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B53] text-xs font-bold uppercase">
                      <Building2 className="w-3.5 h-3.5 text-[#0B6B53]" />
                      <span>Corporate & Enterprise Solutions</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                      Dismantle Chronic Stress & Sustain Peak Cognitive Performance
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Meeting fatigue, constant context switching, and emotional wear drain team velocity and lead to silent attrition. We partner with HR leaders, founders, and L&D heads to implement <strong>practical, science-backed wellness routines</strong> that fit into busy corporate calendars without promoting toxic hustle culture.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Interactive 90-Min Workshops:</strong> High-impact sessions for tech, finance & knowledge workers.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Leadership Resilience Roundtables:</strong> Specialized coaching for managers under pressure.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Flexible Delivery:</strong> Seamless hybrid setups across Zoom/Teams or in-person boardrooms.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => handleOpenConsultation('corporate', 'Corporate Wellness Consultation')}
                      className="px-6 py-3.5 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Book Corporate Session</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </button>
                    <span className="text-xs text-slate-500 font-medium">
                      Trusted by forward-thinking founders and HR decision makers.
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Corporate Programs Cards */}
            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                Key Corporate Wellness Modules
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CORPORATE_PROGRAMS.map((prog, idx) => {
                  const Icon = prog.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6B53] flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            {prog.tag}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-slate-900">
                          {prog.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {prog.summary}
                        </p>
                        <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                          {prog.details.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#0B6B53] shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 mt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleOpenConsultation('corporate', prog.title)}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0B6B53] text-slate-800 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                        >
                          <span>Request This Program</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. COMMUNITIES & RETREATS TAB */}
        {activeTab === 'other' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B53] text-xs font-bold uppercase">
                  <Handshake className="w-3.5 h-3.5 text-[#0B6B53]" />
                  <span>Yoga Studios, Wellness Retreats & NGO Collaborations</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Co-Create Transformative Mindful Experiences
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Are you organizing a wellness retreat, running an independent yoga sanctuary, or seeking a keynote speaker on mental health and higher consciousness? We co-host weekend retreats, sound immersion circles, and specialized masterclasses that enrich community experiences.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h5 className="font-serif font-bold text-sm text-slate-900">Weekend Retreat Intensives</h5>
                    <p className="text-xs text-slate-600">Deep-dive somatic breathwork, mindful journaling and contemplative yogic philosophy for retreat guests.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h5 className="font-serif font-bold text-sm text-slate-900">Studio Masterclass Pop-Ups</h5>
                    <p className="text-xs text-slate-600">Co-branded 2-hour Saturday masterclasses bringing high-demand nervous system recovery to your studio.</p>
                  </div>
                </div>

                <div className="pt-3">
                  <button
                    onClick={() => handleOpenConsultation('other', 'Community & Studio Collaboration')}
                    className="px-6 py-3.5 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Propose a Collaboration</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </section>

      {/* =========================================================================
          FLEXIBLE DELIVERY MODES (Online, Onsite, Hybrid)
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="bg-gradient-to-br from-[#032318] via-[#063525] to-[#021811] text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-emerald-800/40 shadow-xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-widest">
              <Globe2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Multi-Format Institutional Flexibility</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Designed Around Your Campus, Gym or Office
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              We understand that modern organizations operate across dynamic schedules. Every module is tailored for seamless in-person engagement or interactive virtual delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'Live Interactive Masterclasses',
                desc: 'Engaging 60 to 90-minute intensive sessions with immediate physiological breathwork reset.',
                icon: Presentation
              },
              {
                title: 'Multi-Week Progressive Cohorts',
                desc: '3 to 6-week progressive mental stamina and emotional resilience curriculums with weekly check-ins.',
                icon: Clock
              },
              {
                title: 'In-Person Onsite Immersions',
                desc: 'Hands-on experiential workshops in your auditorium, boardroom, or studio facility across India.',
                icon: MapPin
              },
              {
                title: 'Digital 5-Day App Access',
                desc: 'Bulk institutional passes for students, gym members, or employees to access the Path to Inner Peace app.',
                icon: Laptop
              }
            ].map((fmt, idx) => {
              const Icon = fmt.icon;
              return (
                <div 
                  key={idx}
                  className="bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/40 hover:border-[#D4AF37]/60 rounded-2xl p-5 transition-all space-y-2.5 backdrop-blur-xs"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-800/60 border border-emerald-600/40 flex items-center justify-center text-amber-300 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                    {fmt.title}
                  </h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed font-normal">
                    {fmt.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-emerald-800/50 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>
                <strong>Confidential & Evidence-Informed:</strong> Led by Mainak Chatterjee, author and mental wellness mentor.
              </span>
            </div>
            <button
              onClick={() => handleOpenConsultation(activeTab)}
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shrink-0"
            >
              Request Partnership Proposal
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          WHY PARTNER WITH MAINAK CHATTERJEE & PATH TO INNER PEACE
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#0B6B53] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B6B53]" />
                <span>The Path to Inner Peace Difference</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Why Gyms, Colleges & Corporates Trust Our Methodology
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Generic wellness apps and superficial team-building exercises often fail because they don't address the neurological and cognitive foundations of acute stress. We synthesize <strong>Cognitive Behavioral Therapy (CBT) clarity, modern vagal neuroscience, and ancient yogic breathwork</strong> into experiential tools that produce noticeable physiological relief within 15 minutes.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0B6B53] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Zero Fluff, 100% Actionable Protocols</h4>
                    <p className="text-xs text-slate-600">Students, lifters, and executives walk away with daily micro-practices they can use immediately at their desk or gym floor.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0B6B53] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Non-Judgmental & High Psychological Safety</h4>
                    <p className="text-xs text-slate-600">Interactive spaces where young students and seasoned executives alike feel safe acknowledging vulnerability and anxiety.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0B6B53] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Seamless Digital Ecosystem Synergy</h4>
                    <p className="text-xs text-slate-600">Every attendee can continue their progress using the 5-day challenge, binaural sound generator, and reflective guides.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Consultation Invitation Box */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Partner Discovery Call
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Ready to Craft a Custom Partnership?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Schedule a complimentary 20-minute discovery call with our institutional partnerships director to explore the optimal format, curriculum outline, and calendar dates for your organization.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-[#0B6B53] font-semibold">
                  <CalendarCheck className="w-4 h-4" />
                  <span>20-Minute Organizational Assessment Call</span>
                </div>
                <p className="text-slate-500">
                  We'll evaluate your audience size, demographic, timeline, and recommend a tailored in-person or virtual engagement.
                </p>
              </div>

              <button
                onClick={() => handleOpenConsultation(activeTab)}
                className="w-full py-4 px-6 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Partnership Discovery Call</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>No commitment required • Direct consultation with wellness specialists</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          PRIMARY BOTTOM CTA BANNER
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#021811] via-[#093d2e] to-[#032318] text-white p-8 sm:p-12 lg:p-16 border border-emerald-800/40 text-center space-y-6 shadow-2xl"
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Invest in Calmer Minds, Stronger Athletes, and High-Performing Teams
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-emerald-100 font-normal leading-relaxed">
              Equip your gym members, college students, or corporate workforce with scientifically grounded breathwork, mental stamina, and emotional resilience for life.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleOpenConsultation(activeTab)}
              className="inline-flex items-center justify-center gap-2.5 px-9 sm:px-12 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#C89620] text-slate-950 font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-98 transition-all cursor-pointer border border-amber-300"
            >
              <span>Schedule Institutional Consultation</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-emerald-300/80 uppercase tracking-wider font-semibold">
            GYM & ATHLETIC RECOVERY • CAMPUS WELLNESS • CORPORATE STRESS RESET • COMMUNITY MASTERCLASSES
          </p>
        </motion.div>
      </section>

      {/* Partnership Consultation Booking Popup Modal */}
      <PartnerConsultationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedCategory={selectedCategoryForModal}
        preselectedProgram={selectedProgram}
      />

    </div>
  );
};
