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
  Zap,
  Sparkles,
  Compass,
  Headphones,
  Lightbulb,
  ShieldAlert,
  Target,
  Rocket,
  CheckCircle2,
  Radio,
  Layers,
  Activity,
  Cpu
} from 'lucide-react';

interface InnerMasteryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InnerMasteryModal: React.FC<InnerMasteryModalProps> = ({
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
          formType: 'inner_mastery_module_enrollment',
          fullName: name.trim() || user.name || 'Anonymous Seeker',
          mobile: fullPhone || user.whatsapp || 'Not provided',
          email: user.email || 'seeker@innerpeace.com',
          details: {
            program: 'Inner Mastery Module',
            price: '₹1,199 (Original: ₹2,399)',
            discount: '50% OFF',
            status: 'Lead captured on Inner Mastery modal'
          }
        });
      } catch (err) {
        console.error('Lead dispatch error', err);
      }
    }

    setSelectedPlan({
      id: 'MIND_MASTERY_PRO',
      name: 'Inner Mastery Module',
      tagline: '2 Weeks Live Journey — Rewire Your Mind. Regulate Your Emotions. Reclaim Your Power.',
      priceINR: 1199,
      priceUSD: 19,
      originalPriceINR: 2399,
      popular: true,
      badge: '50% OFF',
      features: [
        'Guided Weekly Live Two Sessions & Workshops',
        'Structured daily practices for mental clarity & focus',
        'Proven systems for emotional self-regulation',
        'Mindfulness tools based on attention training science',
        'Techniques for balancing your nervous system response',
        '1:1 Support / Healing Sessions (Optional)',
        'Workbook, Audiobook & Study Materials after completion of each Session',
        'A lifelong framework for sustained behavioral transformation'
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
                  src="https://media-cdn.cosmofeed.com/chat/WhatsApp-Image-2026-03-28-at-2-2026-02-04-09-18-6.jpeg" 
                  alt="Inner Mastery Module" 
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
                  Inner Mastery Module
                </h1>

                {/* Tagline */}
                <p className="text-xs sm:text-sm font-semibold text-emerald-300 italic">
                  Rewire Your Mind. Regulate Your Emotions. Reclaim Your Power.
                </p>

                {/* Pricing Block */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-2xl sm:text-3xl font-extrabold text-white">₹1199</span>
                  <span className="text-base sm:text-lg text-slate-400 line-through">₹2399</span>
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
                      className="w-full bg-[#1C2127] border border-slate-600 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#307940] transition-colors"
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
                        className="bg-[#1C2127] border border-slate-600 rounded-xl px-3 py-3 text-xs text-slate-300 focus:outline-hidden focus:border-[#307940]"
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
                        className="w-full bg-[#1C2127] border border-slate-600 rounded-xl px-3.5 py-3 text-sm text-white placeholder-slate-500 focus:outline-hidden focus:border-[#307940] transition-colors"
                      />
                    </div>
                  </div>

                  {/* Enroll Button with Exact #307940 background */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl font-bold text-sm sm:text-base text-white shadow-lg active:scale-[0.99] transition-all cursor-pointer flex items-center justify-center gap-2 hover:brightness-110"
                    style={{ backgroundColor: '#307940' }}
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

            {/* Live Class & Curriculum Modules */}
            <div className="bg-[#242A30] rounded-2xl border border-slate-700/80 p-5 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-emerald-400 stroke-[2.2]" />
                <span>Live Sessions & Curriculum</span>
              </h3>

              {/* Live Session Item */}
              <div className="p-3.5 rounded-xl bg-[#1C2127] border border-slate-700 flex items-center justify-between gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <div className="font-semibold text-white text-xs sm:text-sm">Live 2 Weeks Transformation Journey</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>2 Live Weekly Coaching Sessions & Workshops</span>
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
                        <span>Lesson 1: Introduction to Cognitive Awareness & Mind Reconditioning</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* EXACT VERBATIM COURSE DESCRIPTION FROM COSMOFEED / SUPERPROFILE */}
            <div className="bg-[#242A30] rounded-2xl border border-slate-700/80 p-5 sm:p-7 space-y-5 text-slate-200 text-sm leading-relaxed">
              
              {/* Top Subtitle */}
              <p className="font-bold text-white text-base text-emerald-300">
                Rewire Your Mind. Regulate Your Emotions. Reclaim Your Power.
              </p>

              {/* Are You Stuck in This Mental Cycle? */}
              <div className="space-y-2 pt-2 border-t border-slate-700">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Are You Stuck in This Mental Cycle?</span>
                </h3>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7">
                  <p>• Constant overthinking and mental noise <em className="text-slate-400">(cognitive overload)</em></p>
                  <p>• Emotional ups and downs you can’t control <em className="text-slate-400">(emotional dysregulation)</em></p>
                  <p>• Persistent stress, anxiety, and inner restlessness <em className="text-slate-400">(chronic stress response)</em></p>
                  <p>• Lack of clarity, focus, and direction <em className="text-slate-400">(decision fatigue)</em></p>
                </div>
                <p className="text-xs sm:text-sm text-amber-300 font-medium pt-1.5 pl-7">
                  👉 If this feels familiar, your mind is operating on <strong className="text-white">unconscious patterns</strong>—and it’s time to take back control.
                </p>
              </div>

              {/* What This Module Does For You */}
              <div className="space-y-2.5 pt-3 border-t border-slate-700">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>What This Module Does For You</span>
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-7">
                  The <strong className="text-white">Inner Mastery Module</strong> 2 weeks Live Journey is a structured, science-backed transformation experience built on <strong className="text-white">cognitive awareness, emotional regulation, and mind reconditioning principles</strong>.
                </p>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-7">
                  It empowers you to consciously redesign how you think, feel, and respond to life.
                </p>
                <p className="text-slate-200 text-xs sm:text-sm font-semibold pl-7 pt-1">
                  You will learn to:
                </p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Break negative thinking loops using <strong className="text-white">cognitive restructuring</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Shift from reaction to response through <strong className="text-white">stimulus-response awareness</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Regulate emotions with precision using <strong className="text-white">emotional intelligence frameworks</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Build unshakable resilience through <strong className="text-white">psychological hardiness</strong></span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Move from autopilot living to <strong className="text-white">high-level meta-awareness</strong></span>
                  </div>
                </div>
                <div className="pl-7 pt-1.5 text-xs sm:text-sm text-slate-200">
                  <p>This is not information.</p>
                  <p className="font-bold text-emerald-300">This is inner reprogramming at a core level.</p>
                </div>
              </div>

              {/* Core Learning Experience */}
              <div className="space-y-3 pt-3 border-t border-slate-700">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                    <Brain className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Core Learning Experience</span>
                </h3>

                {/* Thought Mastery */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shrink-0" />
                    <span>Thought Mastery</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Decode and rewire limiting beliefs through <strong className="text-white">advanced cognitive reframing</strong>
                  </p>
                </div>

                {/* Emotional Regulation System */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shrink-0" />
                    <span>Emotional Regulation System</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Identify triggers and apply <strong className="text-white">response modulation techniques</strong> for stability
                  </p>
                </div>

                {/* Mindfulness & Presence */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shrink-0" />
                    <span>Mindfulness & Presence</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Train your attention to eliminate anxiety using <strong className="text-white">grounding & awareness practices</strong>
                  </p>
                </div>

                {/* Inner Strength Conditioning */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shrink-0" />
                    <span>Inner Strength Conditioning</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Build resilience with <strong className="text-white">stress adaptation and mental conditioning models</strong>
                  </p>
                </div>

                {/* Conscious Decision Intelligence */}
                <div className="space-y-1 pl-1">
                  <p className="font-bold text-white text-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 inline-block shrink-0" />
                    <span>Conscious Decision Intelligence</span>
                  </p>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed pl-4">
                    Enhance clarity and control using <strong className="text-white">executive function activation</strong>
                  </p>
                </div>
              </div>

              {/* What You Receive */}
              <div className="space-y-2.5 pt-3 border-t border-slate-700">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Headphones className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>What You Receive:</span>
                </h3>
                <div className="space-y-2 text-xs sm:text-sm text-slate-300">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Guided Weekly Live Two Sessions & Workshops</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Structured daily practices for mental clarity & focus</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Proven systems for emotional self-regulation</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Mindfulness tools based on attention training science</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Techniques for balancing your nervous system response</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>1:1 Support / Healing Sessions (Optional)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Workbook, Audiobook & Study Materials after completion of each Session</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>A lifelong framework for sustained behavioral transformation</span>
                  </div>
                </div>
              </div>

              {/* Who This Is For */}
              <div className="space-y-2.5 pt-3 border-t border-slate-700">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 flex items-center justify-center shrink-0">
                    <Lightbulb className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Who This Is For:</span>
                </h3>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7">
                  <p>• Individuals experiencing <strong className="text-white">anxiety, mental fatigue, or emotional instability</strong></p>
                  <p>• Professionals navigating <strong className="text-white">high stress, burnout, and pressure</strong></p>
                  <p>• Students struggling with <strong className="text-white">focus, clarity, and cognitive distraction</strong></p>
                  <p>• Anyone caught in <strong className="text-white">negative thought loops or reactive behavior patterns</strong></p>
                  <p>• Growth-driven individuals committed to <strong className="text-white">self-mastery and inner evolution</strong></p>
                </div>
              </div>

              {/* Your Transformation */}
              <div className="space-y-2.5 pt-3 border-t border-slate-700">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-400 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Your Transformation:</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  Imagine operating from a place where your mind no longer controls you…
                </p>
                <div className="space-y-1 text-xs sm:text-sm text-slate-200 pl-7">
                  <p className="flex items-center gap-2">
                    <span className="text-[#FFCA3A]">✦</span>
                    <span>You respond with clarity instead of reacting impulsively</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#FFCA3A]">✦</span>
                    <span>You maintain emotional balance under pressure</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-[#FFCA3A]">✦</span>
                    <span>You act with awareness, not unconscious conditioning</span>
                  </p>
                </div>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 pt-1 font-semibold">
                  After completing this module, you will experience:
                </p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-9">
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Reduced anxiety through <strong className="text-white">emotional regulation mastery</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Enhanced clarity via <strong className="text-white">cognitive control systems</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Stronger decision-making with <strong className="text-white">executive function alignment</strong></span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Deep inner stability through <strong className="text-white">heightened self-awareness</strong></span>
                  </p>
                </div>
              </div>

              {/* A True Psychological Shift */}
              <div className="space-y-2 pt-3 border-t border-slate-700">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>A True Psychological Shift</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  Right now, most of your life is governed by <strong className="text-white">conditioned responses and subconscious programming</strong>.
                </p>
                <div className="p-3 rounded-xl bg-[#1C2127] border border-slate-700/80 text-xs sm:text-sm text-emerald-300 font-semibold text-center my-2">
                  Interrupt those patterns → Rewire your responses → Consciously design your inner state
                </div>
              </div>

              {/* 👉 Take Control of Your Inner System */}
              <div className="pt-4 border-t border-slate-700 text-center flex flex-col items-center justify-center gap-2">
                <span className="p-1.5 rounded-lg bg-[#307940]/20 text-emerald-400 border border-[#307940]/40 flex items-center justify-center">
                  <Rocket className="w-5 h-5" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider">👉 Take Control of Your Inner System</p>
                  <p className="font-extrabold text-white text-lg sm:text-xl text-emerald-400">
                    Join the Inner Mastery Module Today
                  </p>
                </div>
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
                <span className="text-xl sm:text-2xl font-black text-white">₹1199</span>
                <span className="text-xs text-slate-400 line-through">₹2399</span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold">50% OFF</span>
              </div>
              <div className="text-[10px] text-slate-400">One-Time / Lifetime Access</div>
            </div>

            <button
              onClick={handleEnrollNow}
              disabled={isSubmitting}
              className="px-6 sm:px-8 py-2.5 sm:py-3 font-bold text-xs sm:text-sm text-white rounded-xl shadow-lg active:scale-[0.98] transition-all cursor-pointer hover:brightness-110"
              style={{ backgroundColor: '#307940' }}
            >
              <span>Enroll Now</span>
            </button>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
};
