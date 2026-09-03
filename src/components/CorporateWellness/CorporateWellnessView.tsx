import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
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
  Sparkle
} from 'lucide-react';
import { CorporateConsultationModal } from './CorporateConsultationModal';
import corporateWellnessBg from '../../assets/images/corporate_wellness_bg_1788440459846.jpg';
import corporateBurnoutImage from '../../assets/images/corporate_burnout_stress_1788454326993.jpg';

export const CorporateWellnessView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>(undefined);

  const handleOpenConsultation = (programName?: string) => {
    setSelectedProgram(programName);
    setIsModalOpen(true);
  };

  const KEY_PROGRAMS = [
    {
      id: 'stress-burnout',
      title: 'Stress & Burnout Management',
      icon: Flame,
      summary: 'Practical tools to manage workplace stress, emotional pressure and burnout.',
      details: [
        'Recognize early physiological & cognitive burnout indicators',
        'Real-time emotional de-escalation & calm reset techniques',
        'Sustainable pacing & healthy mental boundary setting',
        'Prevent talent exhaustion in high-velocity teams'
      ],
      tag: 'Core Essential'
    },
    {
      id: 'mindfulness-meditation',
      title: 'Mindfulness & Meditation',
      icon: Brain,
      summary: 'Evidence-informed mindfulness and meditation practices for focus, calm and mental clarity.',
      details: [
        'Scientifically grounded breathwork & micro-meditations',
        'Attentional grounding amidst Slack/email notification overload',
        'Daily rituals to reset between high-stakes meetings',
        'Enhanced calm, emotional equilibrium & psychological safety'
      ],
      tag: 'Evidence-Informed'
    },
    {
      id: 'emotional-resilience',
      title: 'Emotional Resilience',
      icon: ShieldCheck,
      summary: 'Develop greater self-awareness, emotional regulation and resilience under pressure.',
      details: [
        'Cognitive reframing for unexpected crises and roadblocks',
        'Strengthening mental fortitude in volatile market environments',
        'Self-regulation tools to prevent impulsive or reactive decisions',
        'Cultivating psychological stamina across leadership'
      ],
      tag: 'Leadership & Teams'
    },
    {
      id: 'workplace-relationships',
      title: 'Workplace Relationships',
      icon: HeartHandshake,
      summary: 'Build healthier communication, trust and interpersonal relationships within teams.',
      details: [
        'Empathetic listening and non-violent communication',
        'Navigating cross-functional disagreements constructively',
        'Fostering psychological safety and team belonging',
        'Eradicating workplace friction and passive disconnection'
      ],
      tag: 'Team Dynamics'
    },
    {
      id: 'focus-productivity',
      title: 'Focus & Productivity',
      icon: Target,
      summary: 'Improve attention, mental clarity and sustainable performance without promoting unhealthy overwork.',
      details: [
        'Deep work frameworks & cognitive energy management',
        'Reducing context switching & mental fragmentation',
        'High-leverage prioritization without 14-hour burnout',
        'Sustainable peak cognitive output for knowledge workers'
      ],
      tag: 'Sustainable Output'
    },
    {
      id: 'higher-consciousness',
      title: 'Higher Consciousness & Inner Growth',
      icon: Sparkles,
      summary: 'Guided practices for deeper self-awareness, purpose and conscious living.',
      details: [
        'Aligning individual passion with broader organizational mission',
        'Ethical clarity and conscious leadership philosophy',
        'Inner stillness, meditation and contemplative reflection',
        'Holistic wellbeing that enriches both career and personal life'
      ],
      tag: 'Holistic Growth'
    },
  ];

  const CORPORATE_FORMATS = [
    {
      title: 'Corporate Workshops',
      description: 'Engaging, interactive 90-minute to half-day workshops designed for hands-on learning and immediate workplace application.',
      icon: Presentation
    },
    {
      title: 'Employee Wellness Sessions',
      description: 'Recurring weekly or bi-weekly guided wellness routines focused on rejuvenation, breathwork and stress release.',
      icon: Users2
    },
    {
      title: 'Mindfulness & Meditation Programs',
      description: 'Structured multi-week progressive tracks establishing sustainable mindfulness practices for company teams.',
      icon: Brain
    },
    {
      title: 'Stress Management Programs',
      description: 'Comprehensive organizational stress-reduction frameworks, audit insights and preventative wellbeing toolkits.',
      icon: Flame
    },
    {
      title: 'Leadership & Emotional Resilience Sessions',
      description: 'Executive-level coaching and roundtables addressing executive burnout, empathetic stewardship and decision clarity.',
      icon: ShieldCheck
    },
    {
      title: 'Customized Wellness Programs',
      description: 'Bespoke corporate packages aligned specifically to your company culture, organizational calendar and team objectives.',
      icon: Sparkle
    },
  ];

  const VALUE_PILLARS = [
    {
      stat: '94%',
      label: 'Stress Reduction',
      desc: 'Employees report immediate drops in acute workplace anxiety and overload.'
    },
    {
      stat: '3.2x',
      label: 'Wellbeing ROI',
      desc: 'Measurable returns through reduced absenteeism, healthcare costs and attrition.'
    },
    {
      stat: 'Hybrid',
      label: 'Online & Onsite',
      desc: 'Seamless delivery across distributed global setups or corporate headquarters.'
    },
    {
      stat: '100%',
      label: 'Tailored Programs',
      desc: 'Built around your organizational culture, team schedule, and L&D objectives.'
    }
  ];

  return (
    <div id="corporate-wellness-page" className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      
      {/* Top Breadcrumb & Portal Header */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-10">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4 pb-4 border-b border-slate-200"
        >
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 tracking-wide uppercase">
            <Building2 className="w-4 h-4 text-[#0B6B53]" />
            <span>Path to Inner Peace • Corporate Wellness Solutions</span>
          </div>
          <span className="hidden sm:inline-block text-xs text-slate-500 font-medium">
            Workplace Mental Health & Leadership Resilience
          </span>
        </motion.div>
      </div>

      {/* PROMINENT FOREGROUND LAYERED IMAGE (ELEVATED 3D EFFECT OVERLAPPING DEEP EMERALD HERO) */}
      <div className="relative z-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 -mb-16 sm:-mb-24 md:-mb-32 lg:-mb-40">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
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
              alt="Workplace Burnout & Stress - Back-to-back meetings, deadlines and employee mental health"
              className="w-full h-auto object-cover transform hover:scale-[1.008] transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          HERO & INTRO SECTION (Extending Behind Elevated Foreground Image)
      ========================================================================= */}
      <section className="relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#021811] via-[#032419] to-[#021811] text-white border-b border-emerald-900/40">
        {/* Background Image with sophisticated darkening gradients */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <img 
            src={corporateWellnessBg}
            alt="Corporate Wellness Environment - Mindful professional workplace"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.28] contrast-[1.15] saturate-[0.9] scale-105"
          />
          {/* Subtle multi-layer emerald gradient overlays for clean text contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#021811]/95 via-[#032318]/90 to-[#021811]/92" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021811] via-transparent to-[#021811]/90" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-900/30 via-transparent to-[#021811]/95" />
        </div>

        {/* Hero Content Container (With top padding so green background & text remain clearly visible behind & below overlapping image) */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 md:pt-40 lg:pt-48 pb-14 sm:pb-20">
          <div className="max-w-3xl space-y-6">
            
            {/* Tagline / Eyebrow Pill */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-amber-200 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-xs"
            >
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Path to Inner Peace • Corporate Wellness Solutions</span>
            </motion.div>

            {/* Main Section Heading */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                Corporate Wellness
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-[#D4AF37] tracking-tight leading-snug">
                Building Healthier Minds. Stronger Teams. Better Workplaces.
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-normal"
            >
              Path to Inner Peace is your holistic corporate wellness partner, helping forward-thinking organizations reduce workplace stress, improve emotional wellbeing, strengthen interpersonal trust, enhance focus and cultivate a resilient, compassionate workplace culture. Designed specifically for HR leaders, founders, business owners and L&D teams seeking sustainable, high-impact organizational transformation.
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-3 flex flex-wrap items-center gap-4"
            >
              <button
                onClick={() => handleOpenConsultation()}
                className="btn-corporate-primary inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#C89620] text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-98 transition-all cursor-pointer border border-amber-300"
              >
                <span>Book a Corporate Wellness Session</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>

              <button
                onClick={() => {
                  const target = document.getElementById('key-areas') || document.getElementById('key-programs');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-100 font-semibold text-sm border border-emerald-700/50 backdrop-blur-xs transition-all cursor-pointer group"
              >
                <span>Key Areas</span>
                <ArrowDown className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition-transform" />
              </button>
            </motion.div>

            {/* Quick Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-4 text-xs text-emerald-200/90 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Customized to Team Size</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Globe2 className="w-4 h-4 text-amber-300" />
                <span>Online & In-Person Delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-300" />
                <span>Evidence-Informed Methodology</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Quick Value Metrics Bar */}
        <div className="border-t border-emerald-800/40 bg-black/25 backdrop-blur-xs py-6">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {VALUE_PILLARS.map((pillar, idx) => (
                <div key={idx} className="space-y-1">
                  <p className="text-2xl sm:text-3xl font-serif font-black text-[#D4AF37]">
                    {pillar.stat}
                  </p>
                  <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                    {pillar.label}
                  </p>
                  <p className="text-[11px] sm:text-xs text-emerald-200/80 line-clamp-2">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY PROGRAM AREAS (Elegant Premium Cards)
      ========================================================================= */}
      <section id="key-areas" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-10 scroll-mt-24">
        <div id="key-programs" />
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0B6B53] text-xs font-bold tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 text-[#0B6B53]" />
            <span>Holistic Workplace Curriculum</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Key Corporate Wellness Program Areas
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Targeted wellness modules designed to systematically dismantle chronic workplace stress, empower mental resilience, and unlock collaborative potential.
          </p>
        </div>

        {/* Programs Grid: 6 Premium Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {KEY_PROGRAMS.map((prog, index) => {
            const Icon = prog.icon;
            return (
              <motion.div
                key={prog.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="group relative bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-sm hover:shadow-xl hover:border-emerald-700/40 transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Badge & Icon */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#0B6B53] group-hover:bg-[#0B6B53] group-hover:text-white transition-colors">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10.5px] font-bold tracking-wider uppercase text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200/80">
                      {prog.tag}
                    </span>
                  </div>

                  {/* Card Title */}
                  <h3 className="text-lg sm:text-xl font-serif font-bold text-slate-900 group-hover:text-[#0B6B53] transition-colors leading-snug">
                    {prog.title}
                  </h3>

                  {/* Card Summary */}
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
                    {prog.summary}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-2 pt-2 border-t border-slate-100">
                    {prog.details.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-[#0B6B53] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card CTA */}
                <div className="pt-6 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenConsultation(prog.title)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0B6B53] text-slate-800 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200 hover:border-[#0B6B53]"
                  >
                    <span>Request This Program</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* =========================================================================
          CORPORATE FORMATS: "Designed Around Your Organization"
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-10">
        
        {/* Compact Formats Card Container */}
        <div className="bg-gradient-to-br from-[#032318] via-[#063525] to-[#021811] text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-emerald-800/40 shadow-xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-widest">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Flexible Delivery Modes</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Designed Around Your Organization
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              Every organization is unique. Our corporate sessions can be conducted <strong>online or offline</strong>, depending on your organizational requirements and team distribution.
            </p>
          </div>

          {/* Formats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {CORPORATE_FORMATS.map((fmt, idx) => {
              const Icon = fmt.icon;
              return (
                <div 
                  key={idx}
                  className="bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/40 hover:border-[#D4AF37]/60 rounded-2xl p-5 transition-all space-y-2.5 backdrop-blur-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-800/60 border border-emerald-600/40 flex items-center justify-center text-amber-300 shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                      {fmt.title}
                    </h3>
                  </div>
                  <p className="text-xs text-emerald-100/80 leading-relaxed font-normal">
                    {fmt.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Format Note: Online & Offline */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-emerald-800/50 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>
                <strong>Flexible Formats:</strong> Interactive live webinars via Zoom/Teams, or immersive in-person workshops across major cities.
              </span>
            </div>
            <button
              onClick={() => handleOpenConsultation()}
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shrink-0"
            >
              Book a Corporate Wellness Session
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          WHY CHOOSE PATH TO INNER PEACE (Trust, Methodology & Value)
      ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 lg:p-12 shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#0B6B53] text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0B6B53]" />
                <span>Executive-Ready Wellness Architecture</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight leading-tight">
                Why Corporate Leaders Trust Path to Inner Peace
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Generic wellness apps often fail to move the needle because they do not address the foundational cognitive and emotional patterns of high-stress business environments. We combine evidence-informed mindfulness, CBT cognitive clarity, and yogic consciousness to deliver real, tangible shifts in team dynamics.
              </p>

              <div className="space-y-3.5 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0B6B53] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Zero Fluff, 100% Practical Tools</h4>
                    <p className="text-xs text-slate-600">Techniques designed for busy executives and knowledge workers who need immediate relief without taking days off.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0B6B53] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Psychological Safety & Discretion</h4>
                    <p className="text-xs text-slate-600">Confidential, non-judgmental spaces that encourage authentic reflection and reduce silent burnout.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-[#0B6B53] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900">Custom Organizational Alignment</h4>
                    <p className="text-xs text-slate-600">Tailored to your industry pace, whether high-growth tech startups, banking, consulting, or manufacturing.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Card: Consultation Invitation Box */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-6 sm:p-8 space-y-6">
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider">
                  Partner With Us
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                  Ready to Elevate Your Team's Wellbeing?
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Schedule a complimentary 20-minute discovery call with our corporate wellness consulting team to explore the right program format and roadmap for your employees.
                </p>
              </div>

              <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-2.5 text-xs text-slate-700">
                <div className="flex items-center gap-2 text-[#0B6B53] font-semibold">
                  <CalendarCheck className="w-4 h-4" />
                  <span>Next Step: 20-Minute Organizational Assessment</span>
                </div>
                <p className="text-slate-500">
                  We will review your company size, team stress indicators, preferred dates and recommend tailored session outlines.
                </p>
              </div>

              <button
                onClick={() => handleOpenConsultation()}
                className="w-full py-4 px-6 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-sm sm:text-base shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book a Corporate Wellness Session</span>
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
              Invest in Healthier Minds and High-Performing Teams
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-emerald-100 font-normal leading-relaxed">
              Equip your workforce with scientifically backed stress-management tools, mindfulness practices and emotional resilience frameworks that sustain human flourishing.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => handleOpenConsultation()}
              className="inline-flex items-center justify-center gap-2.5 px-9 sm:px-12 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#C89620] text-slate-950 font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-98 transition-all cursor-pointer border border-amber-300"
            >
              <span>Book a Corporate Wellness Session</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-emerald-300/80 uppercase tracking-wider font-semibold">
            CORPORATE WELLNESS • WORKPLACE WELLNESS • EMPLOYEE WELLBEING • MINDFULNESS AT WORK
          </p>
        </motion.div>
      </section>

      {/* Corporate Consultation Booking Popup Modal */}
      <CorporateConsultationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedProgram={selectedProgram}
      />

    </div>
  );
};
