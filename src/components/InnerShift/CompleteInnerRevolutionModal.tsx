import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { dispatchFormToAdmin } from '../../utils/formSubmit';
import { 
  X, 
  Check, 
  Calendar, 
  Clock, 
  Video, 
  ShieldCheck, 
  Phone, 
  MessageCircle, 
  Sparkles, 
  ArrowRight,
  BookOpen,
  Award,
  Heart,
  Brain,
  Zap,
  Compass,
  Headphones,
  Users,
  CheckCircle2,
  Lock,
  Layers,
  HelpCircle,
  Flame
} from 'lucide-react';

interface CompleteInnerRevolutionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CompleteInnerRevolutionModal: React.FC<CompleteInnerRevolutionModalProps> = ({
  isOpen,
  onClose
}) => {
  const { 
    user, 
    setIsPaymentModalOpen, 
    setSelectedPlan, 
    triggerConfetti, 
    updateUserProfile 
  } = useApp();

  const [name, setName] = useState(user?.name && user.name !== 'Seeker' ? user.name : '');
  const [phone, setPhone] = useState(user?.whatsapp || '');
  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'phases' | 'curriculum' | 'creator'>('overview');

  if (!isOpen) return null;

  const handleEnrollNow = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsSubmitting(true);

    const fullPhone = `${countryCode} ${phone}`.trim();

    if (name.trim() || phone.trim()) {
      updateUserProfile({
        name: name.trim() || user.name,
        whatsapp: fullPhone || user.whatsapp
      });

      // Dispatch lead to admin sheet / notification
      try {
        await dispatchFormToAdmin({
          formType: 'inner_revolution_program_enrollment',
          fullName: name.trim() || user.name || 'Anonymous Seeker',
          mobile: fullPhone || user.whatsapp || 'Not provided',
          email: user.email || 'seeker@innerpeace.com',
          details: {
            program: 'Complete Inner Revolution Program',
            price: '₹2,999 (50% OFF)',
            notes: 'User clicked Enroll Now on Complete Inner Revolution Program'
          }
        });
      } catch (err) {
        console.error('Failed to log enrollment lead', err);
      }
    }

    // Set the plan for Razorpay modal
    setSelectedPlan({
      id: 'INNER_TRANSFORMATION_ELITE',
      name: 'Complete Inner Revolution Program',
      tagline: '4-Week Live Deep Mental Reset & Consciousness Awakening Journey',
      priceINR: 2999,
      priceUSD: 39,
      originalPriceINR: 5999,
      popular: true,
      badge: '50% DISCOUNTED',
      features: [
        '4 Weekly Live Interactive Workshops with Mainak',
        'Deep Meditation & Mind Reprogramming Audios',
        'Practical CBT & Somatic Tools for Stress Control',
        '1:1 Optional Healing Guidance & Q&A',
        'Complete Workbooks, Audiobooks & Study Materials',
        'Lifetime Learnings for Inner Stability & Peace'
      ],
      badgeText: '50% OFF'
    });

    setIsSubmitting(false);
    onClose();
    setIsPaymentModalOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn">
        
        {/* Main Modal Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.3 }}
          className="relative w-full max-w-4xl bg-[#1C2127] text-slate-100 rounded-3xl shadow-2xl border border-slate-700/80 overflow-hidden flex flex-col max-h-[92vh]"
        >
          {/* Top Bar / Navigation */}
          <div className="sticky top-0 z-30 bg-[#1C2127]/95 backdrop-blur-md px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="https://media-cdn.cosmofeed.com/profile/my_image1779941323-2026-28-05-04-08-44.png" 
                alt="Mainak Chatterjee" 
                className="w-8 h-8 rounded-full border border-[#FFCA3A] object-cover"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>Mainak Chatterjee</span>
                  <span className="text-[10px] bg-amber-500/20 text-[#FFCA3A] px-1.5 py-0.5 rounded font-mono font-medium">@pathtoinnerpeace</span>
                </div>
                <div className="text-[10px] text-slate-400">Complete Inner Revolution Program</div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 rounded-full">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Live 4-Week Journey
              </span>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8 space-y-8 font-sans">
            
            {/* Hero Banner with Visual Design Style */}
            <div className="relative rounded-2xl overflow-hidden border border-slate-700/80 shadow-2xl bg-slate-900 group">
              <div className="relative aspect-[16/8] sm:aspect-[21/9] w-full overflow-hidden bg-slate-950">
                <img 
                  src="https://media-cdn.cosmofeed.com/chat/1000155931-2026-30-03-09-07-18.png" 
                  alt="Complete Inner Revolution Program Banner" 
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C2127] via-[#1C2127]/40 to-transparent" />
              </div>

              {/* Title & Price Header Overlay */}
              <div className="p-4 sm:p-6 -mt-12 sm:-mt-16 relative z-10 space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] font-bold uppercase tracking-wider shadow-lg">
                  <Flame className="w-3.5 h-3.5 text-amber-300" />
                  <span>50% Special Limited Discount</span>
                </div>

                <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  Complete Inner Revolution Program
                </h1>

                {/* Price & Duration Badge Card */}
                <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/90 border border-slate-700/80">
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">₹2,999</span>
                    <span className="text-sm sm:text-base text-slate-400 line-through font-mono">₹5,999</span>
                    <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded font-bold">
                      SAVE ₹3,000
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                      <Clock className="w-3.5 h-3.5 text-[#FFCA3A]" />
                      4 Weeks Live
                    </span>
                    <span className="flex items-center gap-1 bg-slate-800 px-2.5 py-1 rounded-md border border-slate-700">
                      <Video className="w-3.5 h-3.5 text-sky-400" />
                      Google Meet
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Registration & Checkout Box */}
            <div className="bg-gradient-to-br from-slate-900 via-[#1e252e] to-slate-900 p-5 sm:p-6 rounded-2xl border border-slate-700/80 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#FFCA3A]" />
                  <h3 className="text-base font-bold text-white">Instant Enrollment</h3>
                </div>
                <span className="text-xs text-[#FFCA3A] font-semibold">One-Time / Lifetime Access</span>
              </div>

              <form onSubmit={handleEnrollNow} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      What's your name? <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#FFCA3A] transition-colors"
                    />
                  </div>

                  {/* Phone Input */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                      Add your phone number <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select 
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        aria-label="Select country code"
                        className="bg-slate-950 border border-slate-700 rounded-xl px-2.5 py-2.5 text-xs text-slate-300 focus:outline-hidden focus:border-[#FFCA3A]"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+65">🇸🇬 +65</option>
                        <option value="+61">🇦🇺 +61</option>
                      </select>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="WhatsApp / Mobile number"
                        className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#FFCA3A] transition-colors"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Safe & encrypted 256-bit payment via Razorpay / Cards / UPI</span>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-8 py-3 bg-gradient-to-r from-[#B5363E] via-red-600 to-[#B5363E] hover:brightness-110 active:scale-[0.98] text-white font-bold text-sm rounded-xl shadow-lg shadow-red-950/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
                  >
                    <span>{isSubmitting ? 'Processing...' : 'Enroll Now (₹2,999)'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>

            {/* Intro Lead Description */}
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 text-slate-200 text-sm sm:text-base leading-relaxed">
              <p className="font-semibold text-white mb-2">
                This 4 weeks Live Journey is designed to create deep, lasting change at the root level:
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                A structured, evidence-backed transformation system integrating neuroscience, cognitive restructuring, mindfulness, and inner consciousness awakening.
              </p>
            </div>

            {/* 6 Core Transformation Root Pillars */}
            <div className="space-y-4">
              <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                <Brain className="w-5 h-5 text-[#FFCA3A]" />
                <span>Core Transformation Pillars</span>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-bold text-emerald-400 mb-1.5">
                    <span className="text-base">🧠</span>
                    <span>Rewire Your Mind</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Identify and transform negative thought patterns using proven psychological techniques like cognitive restructuring and awareness training.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-bold text-rose-400 mb-1.5">
                    <span className="text-base">💔</span>
                    <span>Heal Emotional Wounds</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Release past pain, trauma, and suppressed emotions through guided healing processes and deep inner release.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-bold text-amber-400 mb-1.5">
                    <span className="text-base">⚡</span>
                    <span>Eliminate Stress & Anxiety</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Learn powerful stress management tools to regain calmness, clarity, and emotional stability in everyday situations.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-bold text-sky-400 mb-1.5">
                    <span className="text-base">🧘</span>
                    <span>Master Mindfulness & Meditation</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Build a daily practice that strengthens focus, awareness, and inner peace for lasting mental balance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-bold text-red-400 mb-1.5">
                    <span className="text-base">❤️</span>
                    <span>Improve Relationships</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Understand emotional triggers, communication patterns, and create healthier, more fulfilling connections.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-colors">
                  <div className="flex items-center gap-2 text-sm font-bold text-purple-400 mb-1.5">
                    <span className="text-base">🌌</span>
                    <span>Awaken Your Higher Self</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    Go beyond the surface mind and experience deeper awareness, life purpose, and true inner freedom.
                  </p>
                </div>
              </div>
            </div>

            {/* 🧭 Program Structure (Transformation Phases) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-[#FFCA3A]" />
                <h2 className="text-lg sm:text-xl font-bold text-white">
                  Program Structure (Transformation Phases)
                </h2>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden flex gap-3.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      🔹 Phase 1: Awareness & Mind Detox
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Understand how your mind works. Identify toxic patterns, overthinking loops, and unconscious behaviors that are holding you back.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden flex gap-3.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      🔹 Phase 2: Emotional Healing & Release
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Work through inner blocks, past experiences, and emotional baggage using guided processes and deep reflection.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden flex gap-3.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      🔹 Phase 3: Mind Reprogramming & Inner Strength
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Replace limiting beliefs with empowering ones. Build confidence, clarity, and mental resilience.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden flex gap-3.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    4
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      🔹 Phase 4: Mindfulness & Daily Practices
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Create powerful daily rituals including meditation, breathwork, and awareness exercises for long-term stability.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 relative overflow-hidden flex gap-3.5 items-start">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/30 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    5
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-white">
                      🔹 Phase 5: Deep Awakening & Conscious Living
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Step into a higher level of awareness where you respond to life consciously rather than reacting unconsciously.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 🎧 What You’ll Get */}
            <div className="p-5 sm:p-6 rounded-2xl bg-emerald-950/30 border border-emerald-800/60 space-y-4">
              <h3 className="text-lg font-bold text-emerald-300 flex items-center gap-2">
                <Headphones className="w-5 h-5 text-emerald-400" />
                <span>🎧 What You’ll Get</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-200">
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Guided Weekly Live Four Sessions & Workshops</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Deep Meditation & Mind Reprogramming Audios</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Practical Tools for Stress & Emotional Control</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>1:1 Support / Healing Sessions (Optional)</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Daily Practices & Habit System</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>Workbook, Audiobook & Study Materials after completion of each Session</span>
                </div>
                <div className="flex items-start gap-2.5 sm:col-span-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-bold text-amber-300">Lifetime Learnings for Inner Stability</span>
                </div>
              </div>
            </div>

            {/* 💡 Who This Program Is For & 🚫 What Makes This Different */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-[#FFCA3A] flex items-center gap-2">
                  <span>💡</span>
                  <span>Who This Program Is For</span>
                </h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCA3A]">•</span>
                    <span>Anyone struggling with stress, anxiety, or overthinking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCA3A]">•</span>
                    <span>People feeling emotionally stuck or lost in life</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCA3A]">•</span>
                    <span>Those seeking clarity, purpose, and inner peace</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#FFCA3A]">•</span>
                    <span>Individuals who want real transformation — not temporary motivation</span>
                  </li>
                </ul>
              </div>

              <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
                <h3 className="text-sm sm:text-base font-bold text-rose-400 flex items-center gap-2">
                  <span>🚫</span>
                  <span>What Makes This Different</span>
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed font-semibold">
                  This is not just theory or motivation. This is a step-by-step transformation system combining:
                </p>
                <ul className="space-y-1.5 text-xs text-slate-300 pl-1">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    <span>Psychology-based techniques</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    <span>Mindfulness & meditation practices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    <span>Real-life application tools</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400"></span>
                    <span>Deep inner awareness work</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* 🎯 The Result */}
            <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-emerald-950/40 to-slate-900 border border-emerald-800/50 space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                <span>🎯</span>
                <span>The Result: By the end of this journey, you will experience:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-200">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>A calmer, clearer, and more focused mind</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Emotional balance and inner stability</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Freedom from overthinking and stress patterns</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Stronger relationships and self-awareness</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2 text-amber-300 font-semibold">
                  <CheckCircle2 className="w-4 h-4 text-amber-300 shrink-0" />
                  <span>A deep sense of inner peace and control</span>
                </div>
              </div>
            </div>

            {/* Creator Profile / Mentor Section */}
            <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row items-center sm:items-start gap-4">
              <img 
                src="https://media-cdn.cosmofeed.com/profile/my_image1779941323-2026-28-05-04-08-44.png" 
                alt="Mainak Chatterjee" 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#FFCA3A] object-cover shadow-md shrink-0"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1.5 text-center sm:text-left flex-1">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h4 className="text-base font-bold text-white">Mainak Chatterjee</h4>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded-full font-bold">
                    Author & Mind Mastery Mentor
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  Founder of Path to Inner Peace and MindForge 360°™. Dedicated to helping individuals eliminate stress, master emotional regulation, and achieve effortless clarity.
                </p>
                <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-slate-300">
                  <a 
                    href="https://wa.me/919163670300" 
                    target="_blank" 
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-[#25D366] hover:underline"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Support: +91 9163670300</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Call To Action Banner */}
            <div className="text-center p-6 rounded-2xl bg-gradient-to-r from-red-950/60 via-slate-900 to-red-950/60 border border-red-900/50 space-y-3">
              <h3 className="text-lg sm:text-xl font-bold text-white">
                🚀 Your Inner Revolution Starts Now
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                Step into a calmer, more conscious life with step-by-step guidance, weekly live workshops, and lifetime inner stability.
              </p>
              <div className="pt-2">
                <button
                  onClick={handleEnrollNow}
                  className="px-8 py-3.5 bg-gradient-to-r from-[#B5363E] via-red-600 to-[#B5363E] hover:brightness-110 active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-2xl shadow-xl shadow-red-950/60 cursor-pointer inline-flex items-center gap-2"
                >
                  <span>Enroll In Inner Revolution (₹2,999)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

          {/* Sticky Bottom Checkout Footer */}
          <div className="sticky bottom-0 z-30 bg-[#14181D] px-4 sm:px-6 py-3.5 border-t border-slate-800 flex items-center justify-between gap-4 shadow-2xl">
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Total Investment</div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-emerald-400 font-mono">₹2,999</span>
                <span className="text-xs text-slate-400 line-through font-mono">₹5,999</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">50% OFF</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleEnrollNow}
                disabled={isSubmitting}
                className="px-6 sm:px-8 py-2.5 sm:py-3 bg-gradient-to-r from-[#B5363E] via-red-600 to-[#B5363E] hover:brightness-110 active:scale-[0.98] text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-red-950/50 flex items-center gap-2 cursor-pointer transition-all"
              >
                <span>Enroll Now</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
