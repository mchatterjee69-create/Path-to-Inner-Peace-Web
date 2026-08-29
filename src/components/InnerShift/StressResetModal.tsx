import React, { useState, useRef } from 'react';
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
  Sparkles, 
  Headphones, 
  Lightbulb, 
  ShieldAlert, 
  Target, 
  CheckCircle2, 
  Radio, 
  Cpu, 
  RefreshCw,
  ArrowUp
} from 'lucide-react';

interface StressResetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StressResetModal: React.FC<StressResetModalProps> = ({
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
  const [showScrollTop, setShowScrollTop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

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
          formType: 'stress_reset_framework_enrollment',
          fullName: name.trim() || user.name || 'Anonymous Seeker',
          mobile: fullPhone || user.whatsapp || 'Not provided',
          email: user.email || 'seeker@innerpeace.com',
          details: {
            program: 'Advanced Stress Reset Framework',
            price: '₹799 (Original: ₹999)',
            discount: '20% OFF',
            status: 'Lead captured on Stress Reset modal'
          }
        });
      } catch (err) {
        console.error('Lead dispatch error', err);
      }
    }

    setSelectedPlan({
      id: 'INNER_SHIFT',
      name: 'Advanced Stress Reset Framework',
      tagline: '2 Weeks Live Structured Program — Calm Your Mind. Reset Your System. Build Lasting Emotional Resilience.',
      priceINR: 799,
      priceUSD: 12,
      originalPriceINR: 999,
      popular: true,
      badge: '20% OFF',
      paymentUrl: 'https://rzp.io/rzp/8xw8CNzv',
      period: 'One-Time Live Program (2 Weeks)',
      buttonText: 'Enroll Now (₹799)',
      colorScheme: 'darkEmerald',
      features: [
        'Guided Weekly Live Two Sessions & Workshops',
        'Structured CBT-based exercises for stress reduction',
        'Practical tools for emotional balance & control',
        'Techniques to calm your mind & nervous system instantly',
        'Daily practices to build long-term resilience',
        'A step-by-step system for sustainable stress-free living',
        '1:1 Support / Healing Sessions (Optional)',
        'Workbook, Audiobook & Study Materials after completion of each Session'
      ],
      badgeText: '20% OFF'
    });

    setIsSubmitting(false);
    onClose();
    setIsPaymentModalOpen(true);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-[#04140E]/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 animate-fadeIn font-poppins">
        
        {/* Main SuperProfile / Cosmofeed Styled Page Modal */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.97, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 15 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-3xl bg-[#0c3125] text-white rounded-2xl sm:rounded-3xl shadow-2xl border border-emerald-700/50 overflow-hidden flex flex-col max-h-[94vh]"
          style={{
            backgroundImage: 'radial-gradient(circle at 50% 0%, #154D3D 0%, #09261C 100%)'
          }}
        >
          {/* Top Navbar Header */}
          <div className="sticky top-0 z-40 bg-[#0A291E]/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-emerald-800/80 flex items-center justify-between">
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
            <div className="bg-[#0A261D] rounded-2xl border border-emerald-800/80 overflow-hidden shadow-xl">
              
              {/* Product Cover Image */}
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                <img 
                  src="https://media-cdn.cosmofeed.com/chat/WhatsApp-Image-2026-04-02-at-3-2026-02-04-10-25-23.jpeg" 
                  alt="Advanced Stress Reset Framework" 
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
                  Advanced Stress Reset Framework
                </h1>

                {/* Tagline */}
                <p className="text-xs sm:text-sm font-semibold text-amber-300 italic">
                  Calm Your Mind. Reset Your System. Build Lasting Emotional Resilience.
                </p>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">₹799</span>
                  <span className="text-base sm:text-lg text-slate-400 line-through">₹999</span>
                  <span className="text-xs bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded">
                    20% OFF
                  </span>
                  <span className="text-xs text-slate-400 ml-auto">Lifetime Access</span>
                </div>

                {/* Lead Form Inputs (Exact SuperProfile Style) */}
                <form onSubmit={handleEnrollNow} className="pt-3 space-y-4 border-t border-emerald-800/80">
                  
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
                      className="w-full bg-[#061A13] border border-emerald-700/60 rounded-xl px-3.5 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-hidden focus:border-[#cdad44] transition-colors"
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
                        className="bg-[#061A13] border border-emerald-700/60 rounded-xl px-3 py-3 text-xs text-slate-200 focus:outline-hidden focus:border-[#cdad44]"
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
                        className="w-full bg-[#061A13] border border-emerald-700/60 rounded-xl px-3.5 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-hidden focus:border-[#cdad44] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Enroll Button with Exact Theme background #cdad44 */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-sm sm:text-base text-[#fff9f9] shadow-lg active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 hover:brightness-110"
                    style={{ backgroundColor: '#cdad44' }}
                  >
                    <span>{isSubmitting ? 'Processing...' : 'Enroll Now'}</span>
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                    <span>Safe & secure encrypted checkout</span>
                  </div>

                </form>

              </div>
            </div>

            {/* Live Class & Curriculum Modules */}
            <div className="bg-[#0A261D] rounded-2xl border border-emerald-800/80 p-5 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-amber-400 stroke-[2.2]" />
                <span>Live Sessions & Curriculum</span>
              </h3>

              {/* Live Session Item */}
              <div className="p-3.5 rounded-xl bg-[#061A13] border border-emerald-800/80 flex items-center justify-between gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs sm:text-sm">Live 2 Weeks Stress Reset Program</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>2 Live Weekly CBT Coaching Sessions & Workshops</span>
                    </div>
                  </div>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-bold px-2.5 py-1 rounded-full border border-amber-500/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                  Live Class
                </span>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-2 pt-1">
                <div className="border border-emerald-800/70 rounded-xl bg-[#061A13] overflow-hidden">
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
                    <div className="px-4 pb-3 pt-1 text-xs text-slate-300 border-t border-emerald-900/80 space-y-1.5">
                      <div className="flex items-center gap-2.5 py-1 text-slate-300">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Lesson 1: Introduction to Stress Mechanism & CBT Reset Principles</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* EXACT VERBATIM COURSE DESCRIPTION FROM COSMOFEED / SUPERPROFILE */}
            <div className="bg-[#0A261D] rounded-2xl border border-emerald-800/80 p-5 sm:p-7 space-y-5 text-slate-200 text-sm leading-relaxed">
              
              {/* Top Subtitle */}
              <p className="font-bold text-white text-base text-amber-300">
                Calm Your Mind. Reset Your System. Build Lasting Emotional Resilience.
              </p>

              {/* Are You Trapped in Constant Stress? */}
              <div className="space-y-2 pt-2 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Are You Trapped in Constant Stress?</span>
                </h3>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7">
                  <p>• Feeling mentally exhausted and overwhelmed <em className="text-slate-400">(chronic stress load)</em></p>
                  <p>• Struggling with anxiety, pressure, or burnout <em className="text-slate-400">(stress dysregulation)</em></p>
                  <p>• Overreacting or feeling emotionally drained <em className="text-slate-400">(emotional fatigue)</em></p>
                  <p>• Unable to relax, switch off, or feel at peace <em className="text-slate-400">(nervous system imbalance)</em></p>
                </div>
                <p className="text-xs sm:text-sm text-amber-300 font-medium pt-1.5 pl-7">
                  👉 If this feels like your daily reality, your system is stuck in a <strong className="text-white">stress-response loop</strong>—and it’s time to reset it.
                </p>
              </div>

              {/* ✦ What This Program Does For You */}
              <div className="space-y-2.5 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>✦ What This Program Does For You</span>
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-7">
                  This <strong className="text-white">Advanced Stress Reset Framework</strong> is a powerful, CBT-based (Cognitive Behavioral Therapy) 2 weeks Live structured program designed to help you eliminate stress at its root—not just manage it temporarily.
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-7">
                  Built on principles of <strong className="text-white">cognitive restructuring, behavioral correction, and nervous system regulation</strong>, this program helps you regain control over how your mind and body respond to stress.
                </p>
                <p className="text-slate-200 text-xs sm:text-sm font-semibold pl-7 pt-1">
                  You will learn to:
                </p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Identify and break stress-inducing thought patterns <em className="text-slate-400">(cognitive restructuring)</em></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Replace unhealthy reactions with constructive behaviors <em className="text-slate-400">(behavioral activation)</em></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Calm your mind and body using <strong className="text-white">nervous system regulation techniques</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Build long-term resilience to pressure and uncertainty <em className="text-slate-400">(stress adaptation)</em></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Shift from survival mode to <strong className="text-white">calm, controlled functioning</strong></span>
                  </div>
                </div>
                <div className="pl-7 pt-1.5 text-xs sm:text-sm text-slate-200">
                  <p>This is not temporary relief.</p>
                  <p className="font-bold text-amber-300">This is deep stress elimination and system reset.</p>
                </div>
              </div>

              {/* Core Learning Experience */}
              <div className="space-y-3 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Core Learning Experience</span>
                </h3>

                {/* Understanding Stress Mechanism */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" />
                    <span>Understanding Stress Mechanism</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Decode how stress is created and sustained through <strong className="text-white">thought-behavior cycles</strong>
                  </p>
                </div>

                {/* Cognitive Stress Reset */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" />
                    <span>Cognitive Stress Reset</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Eliminate negative thinking loops using <strong className="text-white">CBT-based reframing techniques</strong>
                  </p>
                </div>

                {/* Emotional Stabilization */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" />
                    <span>Emotional Stabilization</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Regulate emotional responses through <strong className="text-white">trigger awareness & response control</strong>
                  </p>
                </div>

                {/* Nervous System Regulation */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" />
                    <span>Nervous System Regulation</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Learn practical methods to shift from <strong className="text-white">fight-or-flight to calm state</strong>
                  </p>
                </div>

                {/* Resilience Building System */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 inline-block shrink-0" />
                    <span>Resilience Building System</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Develop long-term strength using <strong className="text-white">stress conditioning & adaptation models</strong>
                  </p>
                </div>
              </div>

              {/* What You Receive */}
              <div className="space-y-2.5 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>What You Receive:</span>
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Guided Weekly Live Two Sessions & Workshops</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Structured CBT-based exercises for stress reduction</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Practical tools for emotional balance & control</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Techniques to calm your mind & nervous system instantly</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Daily practices to build long-term resilience</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>A step-by-step system for sustainable stress-free living</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>1:1 Support / Healing Sessions (Optional)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Workbook, Audiobook & Study Materials after completion of each Session</span>
                  </div>
                </div>
              </div>

              {/* Who This Is For */}
              <div className="space-y-2.5 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Who This Is For:</span>
                </h3>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7">
                  <p>• Individuals experiencing <strong className="text-white">chronic stress, anxiety, or burnout</strong></p>
                  <p>• Working professionals under <strong className="text-white">high pressure & deadlines</strong></p>
                  <p>• Students facing <strong className="text-white">academic stress & performance anxiety</strong></p>
                  <p>• Anyone feeling <strong className="text-white">mentally exhausted or emotionally drained</strong></p>
                  <p>• Anyone seeking <strong className="text-white">long-term calm, balance, and resilience</strong></p>
                </div>
              </div>

              {/* Your Transformation */}
              <div className="space-y-2.5 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Your Transformation:</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  Imagine a life where stress no longer controls you…
                </p>
                <div className="space-y-1 text-xs sm:text-sm text-slate-200 pl-7">
                  <p className="flex items-center gap-2">
                    <span className="text-[#FFCA3A]">⬢</span>
                    <span>You stay calm even in high-pressure situations</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#FFCA3A]">⬢</span>
                    <span>You respond with clarity instead of reacting emotionally</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#FFCA3A]">⬢</span>
                    <span>You feel mentally light, stable, and in control</span>
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 pt-1 font-semibold">
                  After completing this program, you will experience:
                </p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-9">
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Significant reduction in stress and anxiety</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Emotional balance through <strong className="text-white">CBT-based regulation</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Clear thinking and improved focus</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>Strong resilience against future stress triggers</span>
                  </p>
                </div>
              </div>

              {/* A Complete System Reset */}
              <div className="space-y-2 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>A Complete System Reset</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  Right now, your mind and body may be conditioned to stay in <strong className="text-white">constant stress mode</strong>.
                </p>
                <div className="p-3 rounded-xl bg-[#061A13] border border-emerald-800/80 text-xs sm:text-sm text-amber-300 font-semibold text-center my-2">
                  Break the stress cycle → Reset your internal system → Build lasting resilience
                </div>
              </div>

              {/* 👉 Take Back Control of Your Mind & Emotions */}
              <div className="pt-4 border-t border-emerald-800/70 text-center flex flex-col items-center justify-center gap-2">
                <div>
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">👉 Take Back Control of Your Mind & Emotions</p>
                  <p className="font-extrabold text-white text-lg sm:text-xl text-amber-400">
                    Join the Stress Management System Today
                  </p>
                </div>
              </div>

            </div>

            {/* Creator / Support Contact Info */}
            <div className="p-4 rounded-xl bg-[#0A261D] border border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Support Contact: +91 9163670300</span>
              </div>
              <a
                href="https://wa.me/919163670300"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

          </div>

          {/* Sticky Bottom Bar */}
          <div className="sticky bottom-0 z-40 bg-[#071E17] px-4 sm:px-6 py-3.5 border-t border-emerald-800/80 flex items-center justify-between gap-4 shadow-2xl">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">₹799</span>
                <span className="text-xs text-slate-400 line-through">₹999</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold">20% OFF</span>
              </div>
              <div className="text-[10px] text-slate-400">One-Time / Lifetime Access</div>
            </div>

            <button
              onClick={handleEnrollNow}
              disabled={isSubmitting}
              className="px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-xs sm:text-sm text-[#fff9f9] rounded-xl shadow-lg active:scale-[0.98] transition-all cursor-pointer hover:brightness-110"
              style={{ backgroundColor: '#cdad44' }}
            >
              <span>Enroll Now</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
