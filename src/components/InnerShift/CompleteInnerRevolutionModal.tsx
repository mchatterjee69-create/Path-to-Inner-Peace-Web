import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { dispatchFormToAdmin } from '../../utils/formSubmit';
import { 
  X, 
  Video, 
  Lock, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Phone, 
  MessageCircle, 
  Check, 
  ShieldCheck,
  FolderOpen,
  Brain,
  HeartCrack,
  Zap,
  Sparkles,
  Heart,
  Compass,
  Headphones,
  Lightbulb,
  ShieldAlert,
  Target,
  Rocket,
  CheckCircle2,
  CalendarCheck2,
  BookCheck,
  Infinity as InfinityIcon,
  Radio,
  FileText,
  HelpCircle,
  Award
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
    updateUserProfile 
  } = useApp();

  const [name, setName] = useState(user?.name && user.name !== 'Seeker' ? user.name : '');
  const [phone, setPhone] = useState(user?.whatsapp || '');
  const [countryCode, setCountryCode] = useState('+91');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedModule, setExpandedModule] = useState<number | null>(1);

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

      try {
        await dispatchFormToAdmin({
          formType: 'inner_revolution_program_enrollment',
          fullName: name.trim() || user.name || 'Anonymous Seeker',
          mobile: fullPhone || user.whatsapp || 'Not provided',
          email: user.email || 'seeker@innerpeace.com',
          details: {
            program: 'Complete Inner Revolution Program',
            price: '₹2,999 (Original: ₹5,999)',
            discount: '50% OFF',
            status: 'Lead captured on Cosmofeed modal'
          }
        });
      } catch (err) {
        console.error('Lead dispatch error', err);
      }
    }

    setSelectedPlan({
      id: 'INNER_TRANSFORMATION_ELITE',
      name: 'Complete Inner Revolution Program',
      tagline: '4 Weeks Live Journey to create deep, lasting change at the root level',
      priceINR: 2999,
      priceUSD: 39,
      originalPriceINR: 5999,
      popular: true,
      badge: '50% OFF',
      features: [
        'Guided Weekly Live Four Sessions & Workshops',
        'Deep Meditation & Mind Reprogramming Audios',
        'Practical Tools for Stress & Emotional Control',
        '1:1 Support / Healing Sessions (Optional)',
        'Daily Practices & Habit System',
        'Workbook, Audiobook & Study Materials after completion of each Session',
        'Lifetime Learnings for Inner Stability'
      ],
      badgeText: '50% OFF'
    });

    setIsSubmitting(false);
    onClose();
    setIsPaymentModalOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn font-poppins">
        
        {/* Main SuperProfile / Cosmofeed Styled Page Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-[#3D444B] text-white rounded-2xl sm:rounded-3xl shadow-2xl border border-slate-600/60 overflow-hidden flex flex-col max-h-[94vh]"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 0%, #4D565F 0%, #2A3036 100%)'
          }}
        >
          {/* Top Navbar Header */}
          <div className="sticky top-0 z-40 bg-[#2C3238]/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-slate-700/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#D4AF37] shadow-xs bg-black flex items-center justify-center shrink-0">
                <img 
                  src="https://cdn.corenexis.com/f/J29m8uBQ4qF.jpeg" 
                  alt="Path to Inner Peace Logo" 
                  className="w-full h-full object-cover scale-[1.15] rounded-full"
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-xs sm:text-sm font-semibold text-slate-100 tracking-tight">
                Path to Inner Peace
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 text-slate-300 hover:text-white rounded-full hover:bg-white/10 transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Main Container */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8 space-y-6">
            
            {/* Top Course Card */}
            <div className="bg-[#242A30] rounded-2xl border border-slate-700/80 overflow-hidden shadow-xl">
              
              {/* Product Cover Image */}
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                <img 
                  src="https://media-cdn.cosmofeed.com/chat/1000155931-2026-30-03-09-07-18.png" 
                  alt="Complete Inner Revolution Program" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Creator & Course Title Section */}
              <div className="p-5 sm:p-6 space-y-4">
                
                {/* Creator Profile Chip */}
                <div>
                  <div className="text-sm font-bold text-white leading-tight">Mainak Chatterjee</div>
                  <div className="text-xs text-[#FFCA3A] font-medium">@pathtoinnerpeace</div>
                </div>

                {/* Course Title */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-snug">
                  Complete Inner Revolution Program
                </h1>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">₹2999</span>
                  <span className="text-base sm:text-lg text-slate-400 line-through">₹5999</span>
                  <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded">
                    50% OFF
                  </span>
                  <span className="text-xs text-slate-400 ml-auto">Lifetime Access</span>
                </div>

                {/* Lead Form Inputs (Exact SuperProfile Style) */}
                <form onSubmit={handleEnrollNow} className="pt-3 space-y-4 border-t border-slate-700/80">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      What's your name? <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-[#1C2127] border border-slate-600 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#B5363E] transition-colors"
                    />
                  </div>

                  {/* Phone number field */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-200 mb-1.5">
                      Add your phone number <span className="text-red-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select 
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        aria-label="Country Code"
                        className="bg-[#1C2127] border border-slate-600 rounded-xl px-3 py-3 text-xs text-slate-300 focus:outline-hidden focus:border-[#B5363E]"
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
                        placeholder="Mobile / WhatsApp number"
                        className="w-full bg-[#1C2127] border border-slate-600 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#B5363E] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Enroll Button with Exact #B5363E background */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-sm sm:text-base text-white shadow-lg active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{ backgroundColor: '#B5363E' }}
                  >
                    <span>{isSubmitting ? 'Processing...' : 'Enroll Now'}</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Safe & secure encrypted checkout</span>
                  </div>

                </form>

              </div>
            </div>

            {/* Live Class & Curriculum Modules (From Cosmofeed Collection) */}
            <div className="bg-[#242A30] rounded-2xl border border-slate-700/80 p-5 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-rose-400 stroke-[2.2]" />
                <span>Live Sessions & Curriculum</span>
              </h3>

              {/* Live Session Item */}
              <div className="p-3.5 rounded-xl bg-[#1C2127] border border-slate-700 flex items-center justify-between gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs sm:text-sm">Live Online Interactive Workshop</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>Google Meet • 01:31 PM – 02:30 PM (IST)</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 font-bold px-2.5 py-1 rounded-full border border-emerald-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  Live Class
                </span>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-2 pt-1">
                <div className="border border-slate-700 rounded-xl bg-[#1C2127] overflow-hidden">
                  <button 
                    onClick={() => setExpandedModule(expandedModule === 1 ? null : 1)}
                    className="w-full p-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderOpen className="w-4 h-4 text-[#FFCA3A] stroke-[2.2]" />
                      <span>Module 1: Introduction</span>
                    </div>
                    {expandedModule === 1 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedModule === 1 && (
                    <div className="px-4 pb-3 pt-1 text-xs text-slate-300 border-t border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-2.5 py-1 text-slate-300">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Lesson 1: Introduction to Root-Level Mind Detox</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border border-slate-700 rounded-xl bg-[#1C2127] overflow-hidden">
                  <button 
                    onClick={() => setExpandedModule(expandedModule === 2 ? null : 2)}
                    className="w-full p-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <FolderOpen className="w-4 h-4 text-[#FFCA3A] stroke-[2.2]" />
                      <span>Module 2: Deep Transformation System</span>
                    </div>
                    {expandedModule === 2 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedModule === 2 && (
                    <div className="px-4 pb-3 pt-1 text-xs text-slate-300 border-t border-slate-800 space-y-1.5">
                      <div className="flex items-center gap-2.5 py-1 text-slate-300">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Lesson 1: Emotional Release & Conscious Living Protocols</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* EXACT VERBATIM COURSE DESCRIPTION FROM COSMOFEED / SUPERPROFILE */}
            <div className="bg-[#242A30] rounded-2xl border border-slate-700/80 p-5 sm:p-7 space-y-5 text-slate-200 text-sm leading-relaxed">
              
              <p className="font-semibold text-white text-base">
                This 4 weeks Live Journey is designed to create deep, lasting change at the root level:
              </p>

              {/* 🧠 Rewire Your Mind */}
              <div className="space-y-1">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Rewire Your Mind</span>
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-7">
                  Identify and transform negative thought patterns using proven psychological techniques like cognitive restructuring and awareness training.
                </p>
              </div>

              {/* 💔 Heal Emotional Wounds */}
              <div className="space-y-1">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                    <HeartCrack className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Heal Emotional Wounds</span>
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-7">
                  Release past pain, trauma, and suppressed emotions through guided healing processes.
                </p>
              </div>

              {/* ⚡ Eliminate Stress & Anxiety */}
              <div className="space-y-1">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Zap className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Eliminate Stress & Anxiety</span>
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-7">
                  Learn powerful stress management tools to regain calmness, clarity, and emotional stability.
                </p>
              </div>

              {/* 🧘 Master Mindfulness & Meditation */}
              <div className="space-y-1">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-teal-500/15 border border-teal-500/30 text-teal-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Master Mindfulness & Meditation</span>
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-7">
                  Build a daily practice that strengthens focus, awareness, and inner peace.
                </p>
              </div>

              {/* ❤️ Improve Relationships */}
              <div className="space-y-1">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-pink-500/15 border border-pink-500/30 text-pink-400 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Improve Relationships</span>
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-7">
                  Understand emotional triggers, communication patterns, and create healthier, more fulfilling connections.
                </p>
              </div>

              {/* 🌌 Awaken Your Higher Self */}
              <div className="space-y-1">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Awaken Your Higher Self</span>
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-7">
                  Go beyond the surface mind and experience deeper awareness, purpose, and inner freedom.
                </p>
              </div>

              {/* 🧭 Program Structure (Transformation Phases): */}
              <div className="space-y-3 pt-3 border-t border-slate-700">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Program Structure (Transformation Phases):</span>
                </p>

                {/* Phase 1 */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shrink-0" />
                    <span>Phase 1: Awareness & Mind Detox</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Understand how your mind works. Identify toxic patterns, overthinking loops, and unconscious behaviors that are holding you back.
                  </p>
                </div>

                {/* Phase 2 */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shrink-0" />
                    <span>Phase 2: Emotional Healing & Release</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Work through inner blocks, past experiences, and emotional baggage using guided processes and deep reflection.
                  </p>
                </div>

                {/* Phase 3 */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shrink-0" />
                    <span>Phase 3: Mind Reprogramming & Inner Strength</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Replace limiting beliefs with empowering ones. Build confidence, clarity, and mental resilience.
                  </p>
                </div>

                {/* Phase 4 */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shrink-0" />
                    <span>Phase 4: Mindfulness & Daily Practices</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Create powerful daily rituals including meditation, breathwork, and awareness exercises for long-term stability.
                  </p>
                </div>

                {/* Phase 5 */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shrink-0" />
                    <span>Phase 5: Deep Awakening & Conscious Living</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Step into a higher level of awareness where you respond to life consciously rather than reacting unconsciously.
                  </p>
                </div>
              </div>

              {/* 🎧 What You’ll Get: */}
              <div className="space-y-2.5 pt-3 border-t border-slate-700">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>What You’ll Get:</span>
                </p>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Guided Weekly Live Four Sessions & Workshops</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Deep Meditation & Mind Reprogramming Audios</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Practical Tools for Stress & Emotional Control</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>1:1 Support / Healing Sessions (Optional)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Daily Practices & Habit System</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Workbook, Audiobook & Study Materials after completion of each Session</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Lifetime Learnings for Inner Stability</span>
                  </div>
                </div>
              </div>

              {/* 💡 Who This Program Is For: */}
              <div className="space-y-2.5 pt-3 border-t border-slate-700">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Who This Program Is For:</span>
                </p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7">
                  <p>• Anyone struggling with stress, anxiety, or overthinking</p>
                  <p>• People feeling emotionally stuck or lost in life</p>
                  <p>• Those seeking clarity, purpose, and inner peace</p>
                  <p>• Individuals who want real transformation — not temporary motivation</p>
                </div>
              </div>

              {/* 🚫 What Makes This Different: */}
              <div className="space-y-2.5 pt-3 border-t border-slate-700">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>What Makes This Different:</span>
                </p>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">This is not just theory or motivation.</p>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 font-medium">This is a step-by-step transformation system combining:</p>
                <div className="space-y-1 text-xs sm:text-sm text-slate-300 pl-9">
                  <p>• Psychology-based techniques</p>
                  <p>• Mindfulness & meditation practices</p>
                  <p>• Real-life application tools</p>
                  <p>• Deep inner awareness work</p>
                </div>
              </div>

              {/* 🎯 The Result: */}
              <div className="space-y-2.5 pt-3 border-t border-slate-700">
                <p className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>The Result:</span>
                </p>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">By the end of this journey, you will experience:</p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-9">
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>A calmer, clearer, and more focused mind</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Emotional balance and inner stability</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Freedom from overthinking and stress patterns</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Stronger relationships and self-awareness</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>A deep sense of inner peace and control</span>
                  </p>
                </div>
              </div>

              {/* 🚀 Your Inner Revolution Starts Now */}
              <div className="pt-4 border-t border-slate-700 text-center flex items-center justify-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#B5363E]/20 text-rose-400 border border-[#B5363E]/40 flex items-center justify-center">
                  <Rocket className="w-5 h-5" />
                </span>
                <p className="font-extrabold text-white text-lg">
                  Your Inner Revolution Starts Now
                </p>
              </div>

            </div>

            {/* Creator / Support Contact Info */}
            <div className="p-4 rounded-xl bg-[#242A30] border border-slate-700/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Support Contact: +91 9163670300</span>
              </div>
              <a
                href="https://wa.me/919163670300"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Sticky Bottom Bar */}
          <div className="sticky bottom-0 z-40 bg-[#1F2429] px-4 sm:px-6 py-3.5 border-t border-slate-700/80 flex items-center justify-between gap-4 shadow-2xl">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">₹2999</span>
                <span className="text-xs text-slate-400 line-through">₹5999</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">50% OFF</span>
              </div>
              <div className="text-[10px] text-slate-400">One-Time / Lifetime</div>
            </div>

            <button
              onClick={handleEnrollNow}
              disabled={isSubmitting}
              className="px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-xs sm:text-sm text-white rounded-xl shadow-lg active:scale-[0.98] transition-all cursor-pointer"
              style={{ backgroundColor: '#B5363E' }}
            >
              <span>Enroll Now</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
