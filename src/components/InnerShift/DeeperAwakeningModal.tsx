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
  Check, 
  ShieldCheck,
  FolderOpen,
  Sparkles,
  Headphones,
  Lightbulb,
  ShieldAlert,
  Target,
  Rocket,
  CheckCircle2,
  Radio,
  RefreshCw,
  Flame,
  Zap,
  Layers,
  Heart
} from 'lucide-react';

interface DeeperAwakeningModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeeperAwakeningModal: React.FC<DeeperAwakeningModalProps> = ({
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
          formType: 'deeper_awakening_masterclass_enrollment',
          fullName: name.trim() || user.name || 'Anonymous Seeker',
          mobile: fullPhone || user.whatsapp || 'Not provided',
          email: user.email || 'seeker@innerpeace.com',
          details: {
            program: 'Deeper Awakening Masterclass',
            price: '₹3999 (Original: ₹5999)',
            discount: '33% OFF',
            status: 'Lead captured on Deeper Awakening Masterclass modal'
          }
        });
      } catch (err) {
        console.error('Lead dispatch error', err);
      }
    }

    setSelectedPlan({
      id: 'INNER_TRANSFORMATION_ELITE',
      name: 'Deeper Awakening Masterclass',
      tagline: 'Transcend Conditioning. Expand Consciousness. Embody Your Highest Self. 4 Weeks Live Immersion with Heartfulness-Based Inner Practices.',
      priceINR: 3999,
      priceUSD: 49,
      originalPriceINR: 5999,
      popular: true,
      badge: '33% OFF',
      paymentUrl: 'https://rzp.io/rzp/x8BS9RM',
      period: '4 Weeks Live Masterclass',
      buttonText: 'Enroll Now (₹3,999)',
      colorScheme: 'darkEmerald',
      features: [
        'Live 4 Weeks Advanced Protocols for Meta-Awareness Expansion',
        'Guided Heartfulness Meditation & Inner Balance Practices',
        'Deep Processes to Identity Deconstruction & Conditioning Release',
        'Experiential Techniques for Emotional Purification & Inner Stillness',
        'Integration Tools to Stabilize Expanded States in Daily Living',
        'Refined Pathway Toward Self-Realization, Purpose, and Inner Freedom',
        'Interactive Masterclass Q&A, Direct Guidance & Study Cohort'
      ],
      badgeText: '33% OFF'
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
              className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-emerald-700/50"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable Body Content */}
          <div className="overflow-y-auto flex-1 p-4 sm:p-6 md:p-8 space-y-6">
            
            {/* Top Course Card */}
            <div className="bg-[#0A261D] rounded-2xl border border-emerald-800/80 overflow-hidden shadow-xl">
              
              {/* Product Cover Image */}
              <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                <img 
                  src="https://media-cdn.cosmofeed.com/chat/1000155401-2026-08-04-11-27-2.png" 
                  alt="Deeper Awakening Masterclass" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                
                {/* 33% OFF Badge */}
                <div className="absolute top-3 left-3 bg-[#D4AF37] text-slate-950 text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                  33% OFF
                </div>
              </div>

              {/* Title & Pricing Card Area */}
              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
                    Deeper Awakening Masterclass
                  </h1>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-white">₹3999</span>
                  <span className="text-sm sm:text-base text-slate-400 line-through">₹5999</span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                    SAVE ₹2000 (33% OFF)
                  </span>
                </div>

                {/* Lead Form Inputs (Exact SuperProfile Style) */}
                <form onSubmit={handleEnrollNow} className="pt-3 space-y-4 border-t border-emerald-800/80">
                  
                  {/* Name field */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      What's your name? <span className="text-rose-400">*</span>
                    </label>
                    <input 
                      type="text" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      className="w-full bg-[#061A13] border border-emerald-700/60 rounded-xl px-3.5 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-hidden focus:border-[#D4AF37] transition-colors"
                    />
                  </div>

                  {/* Phone number with country code */}
                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1.5">
                      Add your phone number <span className="text-rose-400">*</span>
                    </label>
                    <div className="flex gap-2">
                      <select 
                        value={countryCode}
                        onChange={(e) => setCountryCode(e.target.value)}
                        aria-label="Country Code"
                        className="bg-[#061A13] border border-emerald-700/60 rounded-xl px-3 py-3 text-xs text-slate-200 focus:outline-hidden focus:border-[#D4AF37]"
                      >
                        <option value="+91">🇮🇳 +91</option>
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+971">🇦🇪 +971</option>
                        <option value="+65">🇸🇬 +65</option>
                        <option value="+61">🇦🇺 +61</option>
                        <option value="+1">🇨🇦 +1</option>
                      </select>
                      <input 
                        type="tel" 
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="Mobile / WhatsApp number"
                        className="w-full bg-[#061A13] border border-emerald-700/60 rounded-xl px-3.5 py-3 text-sm text-white placeholder-emerald-100/40 focus:outline-hidden focus:border-[#D4AF37] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Submit / Enroll CTA button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl font-bold text-sm text-slate-950 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 hover:brightness-110 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{isSubmitting ? 'Processing...' : 'Enroll now'}</span>
                    <span>&rsaquo;</span>
                  </button>

                </form>

              </div>
            </div>

            {/* Live Class & Curriculum Modules */}
            <div className="bg-[#0A261D] rounded-2xl border border-emerald-800/80 p-5 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-amber-400 stroke-[2.2]" />
                <span>4 Weeks Live Masterclass & Curriculum</span>
              </h3>

              {/* Live Session Item */}
              <div className="p-3.5 rounded-xl bg-[#061A13] border border-emerald-800/80 flex items-center justify-between gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">4 Weeks Live Consciousness Immersion</p>
                    <p className="text-[11px] text-slate-300">Meta-Awareness Training & Heartfulness Cleaning</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-amber-400 font-semibold shrink-0 bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">
                  <Clock className="w-3.5 h-3.5" />
                  <span>4 Weeks Live</span>
                </div>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-2 pt-1">
                {/* Module 1 */}
                <div className="border border-emerald-800/70 rounded-xl bg-[#061A13] overflow-hidden">
                  <button 
                    onClick={() => setExpandedModule(expandedModule === 1 ? null : 1)}
                    className="w-full p-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-[#D4AF37]" />
                      <span>Module 1: Introduction to Meta-Awareness</span>
                    </span>
                    {expandedModule === 1 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedModule === 1 && (
                    <div className="px-4 pb-3 pt-1 text-xs text-slate-300 border-t border-emerald-900/80 space-y-1.5">
                      <div className="flex items-center gap-2.5 py-1 text-slate-300">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Lesson 1: Transcending Cognitive Filters & Observer Consciousness</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Module 2 */}
                <div className="border border-emerald-800/70 rounded-xl bg-[#061A13] overflow-hidden">
                  <button 
                    onClick={() => setExpandedModule(expandedModule === 2 ? null : 2)}
                    className="w-full p-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-[#D4AF37]" />
                      <span>Module 2: Heartfulness Meditation & Identity Dissolution</span>
                    </span>
                    {expandedModule === 2 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedModule === 2 && (
                    <div className="px-4 pb-3 pt-1 text-xs text-slate-300 border-t border-emerald-900/80 space-y-1.5">
                      <div className="flex items-center gap-2.5 py-1 text-slate-300">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Lesson 1: Deep Conditioning Release & Heart-Centered Awareness</span>
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
                Transcend Conditioning. Expand Consciousness. Embody Your Highest Self.
              </p>

              {/* Are You Ready to Move Beyond the Surface of Growth? */}
              <div className="space-y-2 pt-2 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Are You Ready to Move Beyond the Surface of Growth?</span>
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7 list-disc">
                  <li>You’ve worked on yourself, yet sense a deeper layer remains untouched (residual conditioning)</li>
                  <li>You experience awareness, but it isn’t fully stable (state–trait inconsistency)</li>
                  <li>You feel a subtle disconnect between your current identity and your highest potential (self-concept misalignment)</li>
                  <li>You seek not just improvement—but transcendence (evolution of consciousness)</li>
                </ul>
                <p className="text-xs sm:text-sm text-slate-300 pt-1.5 font-medium pl-7">
                  👉 If this resonates, you are not at the beginning—you are at the threshold of a higher-order awakening.
                </p>
              </div>

              {/* ✦ What This Masterclass Facilitates */}
              <div className="space-y-2.5 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>✦ What This Masterclass Facilitates</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 leading-relaxed">
                  This Deeper Awakening 4 weeks live Masterclass is an advanced, high-intensity immersion designed for individuals ready to go beyond cognitive understanding into direct experiential awareness.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 leading-relaxed">
                  Grounded in meta-awareness training, identity transcendence, and Heartfulness-based inner practices, this masterclass facilitates a shift from conditioned perception to expanded, heart-centered awareness.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 leading-relaxed">
                  By integrating Heartfulness techniques, you will not only expand consciousness but also experience inner stillness, emotional balance, and deeper connection within.
                </p>
                <div className="pl-7 space-y-1.5 pt-1">
                  <p className="text-xs sm:text-sm font-semibold text-white">You will learn to:</p>
                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Disidentify from the thinking mind</strong> and access observer consciousness</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Deconstruct conditioned identities</strong> at a root level (deep identity dissolution)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Stabilize higher awareness</strong> through Heartfulness meditation & inner centering</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Expand perception</strong> beyond habitual cognitive filters (consciousness expansion)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Embody alignment</strong> with purpose, clarity, and inner freedom (self-realization)</span>
                    </div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#061A13] border border-emerald-800/80 text-xs sm:text-sm text-amber-300 font-semibold text-center my-2 space-y-0.5">
                  <div>This is not mindset work.</div>
                  <div className="text-white font-bold">This is a shift in the structure of your awareness.</div>
                </div>
              </div>

              {/* Advanced Transformation Experience */}
              <div className="space-y-3 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                    <Layers className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Advanced Transformation Experience</span>
                </h3>

                <div className="space-y-3 pl-7">
                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-amber-400">🔹</span> Meta-Awareness Stabilization
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Move from fleeting awareness to consistent, self-sustained presence
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-amber-400">🔹</span> Deep Conditioning Release
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Dissolve subconscious imprints through non-reactive observation & Heartfulness cleaning practices
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-amber-400">🔹</span> Expanded Consciousness States
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Access and integrate higher-order awareness beyond thought structures
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-amber-400">🔹</span> Heart-Centered Awareness
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Cultivate inner stillness and emotional balance through Heartfulness meditation
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-amber-400">🔹</span> Identity Transcendence & Alignment
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Release constructed self-images and embody your authentic, unconditioned self
                    </p>
                  </div>
                </div>
              </div>

              {/* What You Receive */}
              <div className="space-y-2.5 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>What You Receive</span>
                </h3>
                <div className="space-y-2 pl-7 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Live 4 weeks Advanced protocols for meta-awareness and consciousness expansion</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Guided Heartfulness meditation and inner balance practices</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Deep processes to identity deconstruction and conditioning release</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Experiential techniques for emotional purification and inner stillness</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Integration tools to stabilize expanded states in daily living</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>A refined pathway toward self-realization, purpose, and inner freedom</span>
                  </div>
                </div>
              </div>

              {/* Who This Is For */}
              <div className="space-y-2.5 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Who This Is For</span>
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7 list-disc">
                  <li>Individuals already engaged in self-development, mindfulness, or inner work</li>
                  <li>Seekers ready to move beyond surface-level growth into deep transformation</li>
                  <li>Those exploring consciousness, awareness, and identity beyond the ego</li>
                  <li>People experiencing partial awakening but seeking stability and integration</li>
                  <li>Individuals committed to advanced inner evolution and self-realization</li>
                </ul>
              </div>

              {/* Your Transformation */}
              <div className="space-y-2.5 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Your Transformation</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 font-medium">
                  Imagine operating from a state where awareness is no longer something you practice—it becomes who you are.
                </p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-200 pl-7">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">●</span>
                    <span>You observe thoughts without identification or attachment</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">●</span>
                    <span>You remain calm, centered, and emotionally balanced through heart-based awareness</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">●</span>
                    <span>You act from alignment, not conditioning</span>
                  </div>
                </div>
                <div className="pl-7 pt-2 space-y-1.5">
                  <p className="text-xs sm:text-sm font-semibold text-white">After this masterclass, you will:</p>
                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Experience sustained meta-awareness and inner stillness</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Transcend limiting identities and subconscious patterns</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Develop deep emotional balance through Heartfulness practices</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Operate from clarity, presence, and conscious choice</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Access a profound sense of freedom, purpose, and inner alignment</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Beyond Self-Improvement */}
              <div className="space-y-2 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Beyond Self-Improvement</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  Most approaches focus on changing thoughts or behaviors—while leaving the underlying structure of identity untouched.
                </p>
                <div className="p-3 rounded-xl bg-[#061A13] border border-emerald-800/80 text-xs sm:text-sm text-amber-300 font-semibold text-center my-2">
                  Dissolve conditioning → Expand awareness → Awaken through the heartfulness.
                </div>
              </div>

              {/* 👉 Step Into the Next Level of Consciousness */}
              <div className="pt-4 border-t border-emerald-800/70 text-center flex flex-col items-center justify-center gap-2">
                <span className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                  <Rocket className="w-5 h-5" />
                </span>
                <p className="font-bold text-white text-sm sm:text-base">
                  👉 Step Into the Next Level of Consciousness
                </p>
                <p className="text-xs text-slate-300">
                  Join the Deeper Awakening Masterclass
                </p>
              </div>

            </div>

            {/* Creator / Support Contact Info */}
            <div className="p-4 rounded-xl bg-[#0A261D] border border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Support Contact: +91 9163670300</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Verified Masterclass System • 4 Weeks Immersion</span>
              </div>
            </div>

            {/* Spacing for sticky bottom bar */}
            <div className="h-12" />

          </div>

          {/* Sticky Bottom Bar */}
          <div className="sticky bottom-0 z-40 bg-[#071E17] px-4 sm:px-6 py-3.5 border-t border-emerald-800/80 flex items-center justify-between gap-4 shadow-2xl">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">₹3999</span>
                <span className="text-xs text-slate-400 line-through">₹5999</span>
              </div>
              <span className="text-[10px] text-amber-400 font-semibold">Cohort 2026 Registration Open</span>
            </div>

            <button
              onClick={() => handleEnrollNow()}
              disabled={isSubmitting}
              className="py-2.5 sm:py-3 px-6 sm:px-8 rounded-xl font-bold text-xs sm:text-sm text-slate-950 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 hover:brightness-110 shadow-lg shadow-amber-500/20 active:scale-[0.99] transition-all cursor-pointer flex items-center gap-2 shrink-0"
            >
              <span>{isSubmitting ? 'Processing...' : 'Enroll now'}</span>
              <span>&rsaquo;</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
