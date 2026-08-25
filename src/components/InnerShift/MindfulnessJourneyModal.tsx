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
  CheckCircle2,
  Radio,
  RefreshCw,
  Compass,
  Eye
} from 'lucide-react';

interface MindfulnessJourneyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MindfulnessJourneyModal: React.FC<MindfulnessJourneyModalProps> = ({
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
          formType: 'mindfulness_meditation_journey_enrollment',
          fullName: name.trim() || user.name || 'Anonymous Seeker',
          mobile: fullPhone || user.whatsapp || 'Not provided',
          email: user.email || 'seeker@innerpeace.com',
          details: {
            program: 'COMPLETE MINDFULNESS & MEDITATION JOURNEY',
            price: '₹1999 (Original: ₹3999)',
            discount: '50% OFF',
            status: 'Lead captured on Mindfulness & Meditation Journey modal'
          }
        });
      } catch (err) {
        console.error('Lead dispatch error', err);
      }
    }

    setSelectedPlan({
      id: 'INNER_TRANSFORMATION_ELITE',
      name: 'COMPLETE MINDFULNESS & MEDITATION JOURNEY',
      tagline: 'Cultivate Awareness. Deepen Presence. Elevate Consciousness. Integrating 8 Globally Recognized Meditation Approaches & Vipassana Insight.',
      priceINR: 1999,
      priceUSD: 29,
      originalPriceINR: 3999,
      popular: true,
      badge: '50% OFF',
      paymentUrl: 'https://rzp.io/rzp/x8BS9RM',
      period: '2 Weeks Live Immersion',
      buttonText: 'Enroll Now (₹1,999)',
      colorScheme: 'darkEmerald',
      features: [
        'Guided meditation practices across 8 powerful techniques',
        'Vipassana-Based Insight & Non-Reactive Observation',
        'Structured pathway for daily mindfulness development',
        'Techniques for stress reduction and mental clarity',
        'Tools to build focus, presence, and emotional balance',
        'A complete system to integrate meditation into daily life',
        'Live interactive practice sessions & study guides'
      ],
      badgeText: '50% OFF'
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
                  src="https://media-cdn.cosmofeed.com/chat/1000155400-2026-09-04-03-16-59.png" 
                  alt="COMPLETE MINDFULNESS & MEDITATION JOURNEY" 
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
                
                {/* 50% OFF Badge */}
                <div className="absolute top-3 left-3 bg-[#D4AF37] text-slate-950 text-xs font-black px-2.5 py-1 rounded-md uppercase tracking-wider shadow-md">
                  50% OFF
                </div>
              </div>

              {/* Title & Pricing Card Area */}
              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight uppercase">
                    COMPLETE MINDFULNESS & MEDITATION JOURNEY
                  </h1>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-white">₹1999</span>
                  <span className="text-sm sm:text-base text-slate-400 line-through">₹3999</span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded border border-emerald-500/30">
                    SAVE ₹2000 (50% OFF)
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
                <Video className="w-5 h-5 text-emerald-400 stroke-[2.2]" />
                <span>Meditation Journey & Curriculum</span>
              </h3>

              {/* Live Session Item */}
              <div className="p-3.5 rounded-xl bg-[#061A13] border border-emerald-800/80 flex items-center justify-between gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Live Mindfulness & Insight Meditation</p>
                    <p className="text-[11px] text-slate-300">8 Global Traditions & Vipassana Protocols</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold shrink-0 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Guided Experience</span>
                </div>
              </div>

              {/* Modules Accordion */}
              <div className="space-y-2 pt-1">
                <div className="border border-emerald-800/70 rounded-xl bg-[#061A13] overflow-hidden">
                  <button 
                    onClick={() => setExpandedModule(expandedModule === 1 ? null : 1)}
                    className="w-full p-3.5 text-left flex items-center justify-between text-xs sm:text-sm font-semibold text-white hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <span className="flex items-center gap-2">
                      <FolderOpen className="w-4 h-4 text-[#D4AF37]" />
                      <span>Module 1: Introduction</span>
                    </span>
                    {expandedModule === 1 ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                  </button>
                  {expandedModule === 1 && (
                    <div className="px-4 pb-3 pt-1 text-xs text-slate-300 border-t border-emerald-900/80 space-y-1.5">
                      <div className="flex items-center gap-2.5 py-1 text-slate-300">
                        <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>Lesson 1: Foundations of Mindful Attention & Breath Anchoring</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* EXACT VERBATIM COURSE DESCRIPTION FROM COSMOFEED / SUPERPROFILE */}
            <div className="bg-[#0A261D] rounded-2xl border border-emerald-800/80 p-5 sm:p-7 space-y-5 text-slate-200 text-sm leading-relaxed">
              
              {/* Top Subtitle */}
              <p className="font-bold text-white text-base text-emerald-300">
                Cultivate Awareness. Deepen Presence. Elevate Consciousness.
              </p>

              {/* Do You Feel Disconnected from the Present Moment? */}
              <div className="space-y-2 pt-2 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Do You Feel Disconnected from the Present Moment?</span>
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7 list-disc">
                  <li>Constant mental chatter and overthinking (attention fragmentation)</li>
                  <li>Difficulty staying present and focused (lack of mindfulness)</li>
                  <li>Stress, anxiety, or inner restlessness (mental agitation)</li>
                  <li>Seeking deeper peace but unsure how to access it (awareness gap)</li>
                </ul>
                <p className="text-xs sm:text-sm text-slate-300 pt-1.5 font-medium pl-7">
                  👉 If this resonates, your mind is caught in habitual distraction patterns—and it’s time to return to presence.
                </p>
              </div>

              {/* ✦ What This Journey Offers */}
              <div className="space-y-2.5 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>✦ What This Journey Offers</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 leading-relaxed">
                  The Complete Mindfulness & Meditation Journey is a structured, guided experience designed to help you develop deep awareness, present-moment focus, and higher states of consciousness.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 leading-relaxed">
                  Integrating <strong className="text-white">Eight Globally Recognized Meditation Approaches</strong>, including <strong className="text-emerald-300">Vipassana-Based Practices</strong>, this journey offers a comprehensive pathway to inner clarity, balance, and self-awareness.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 leading-relaxed">
                  Built on principles of mindfulness training, attention regulation, and awareness expansion, this experience helps you reconnect with the present and experience life with greater depth.
                </p>
                <div className="pl-7 space-y-1.5 pt-1">
                  <p className="text-xs sm:text-sm font-semibold text-white">You will learn to:</p>
                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Observe thoughts without attachment</strong> (mindful awareness)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Strengthen focus and attention</strong> (attention regulation)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Cultivate inner calm and stillness</strong> (meditative stabilization)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Develop deep insight</strong> through Vipassana observation practices</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Expand awareness beyond habitual thinking</strong> (conscious presence)</span>
                    </div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#061A13] border border-emerald-800/80 text-xs sm:text-sm text-emerald-300 font-semibold text-center my-2 space-y-0.5">
                  <div>This is not just meditation.</div>
                  <div className="text-white font-bold">This is a complete awareness training experience.</div>
                </div>
              </div>

              {/* Core Practice Experience */}
              <div className="space-y-3 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                    <Eye className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Core Practice Experience</span>
                </h3>

                <div className="space-y-3 pl-7">
                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-emerald-400">🔹</span> Foundations of Mindfulness
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Build present-moment awareness through breath and body-based practices
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-emerald-400">🔹</span> Attention & Focus Training
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Strengthen mental clarity using concentration techniques
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-emerald-400">🔹</span> Vipassana Insight Practices
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Develop deep observation and insight through non-reactive awareness
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-emerald-400">🔹</span> Emotional Balance & Stillness
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Calm the mind using structured meditation methods
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-emerald-400">🔹</span> Expanded Awareness States
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Move beyond surface awareness into deeper conscious presence
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
                    <span>Guided meditation practices across 8 powerful techniques</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Structured pathway for daily mindfulness development</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Techniques for stress reduction and mental clarity</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Tools to build focus, presence, and emotional balance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>A complete system to integrate meditation into daily life</span>
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
                  <li>Beginners looking to start a structured meditation practice</li>
                  <li>Individuals struggling with stress, anxiety, or overthinking</li>
                  <li>Professionals seeking focus, clarity, and calmness</li>
                  <li>Spiritual seekers exploring awareness and mindfulness</li>
                  <li>Anyone committed to inner peace and conscious living</li>
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
                  Imagine living each moment with clarity and awareness…
                </p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-200 pl-7">
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">●</span>
                    <span>You are fully present instead of lost in thoughts</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">●</span>
                    <span>Your mind is calm, focused, and balanced</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#D4AF37]">●</span>
                    <span>You experience deeper peace and inner stillness</span>
                  </div>
                </div>
                <div className="pl-7 pt-2 space-y-1.5">
                  <p className="text-xs sm:text-sm font-semibold text-white">After this journey, you will:</p>
                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Develop strong mindfulness and present awareness</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Reduce stress and mental noise significantly</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Improve focus, clarity, and emotional balance</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Experience a deeper connection with yourself and life</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* A Return to Presence */}
              <div className="space-y-2 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>A Return to Presence</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  Most people live in the past or future—rarely experiencing the present moment fully.
                </p>
                <div className="p-3 rounded-xl bg-[#061A13] border border-emerald-800/80 text-xs sm:text-sm text-emerald-300 font-semibold text-center my-2">
                  Train your mind → Anchor in the present → Expand awareness
                </div>
              </div>

              {/* 👉 Begin Your Journey Into Mindfulness */}
              <div className="pt-4 border-t border-emerald-800/70 text-center flex flex-col items-center justify-center gap-2">
                <p className="font-bold text-white text-sm sm:text-base">
                  👉 Begin Your Journey Into Mindfulness
                </p>
                <p className="text-xs text-slate-300">
                  Join the Complete Mindfulness & Meditation Journey
                </p>
              </div>

            </div>

            {/* Creator / Support Contact Info */}
            <div className="p-4 rounded-xl bg-[#0A261D] border border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400" />
                <span>Support Contact: +91 9163670300</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Verified System • Lifetime Access</span>
              </div>
            </div>

            {/* Spacing for sticky bottom bar */}
            <div className="h-12" />

          </div>

          {/* Sticky Bottom Bar */}
          <div className="sticky bottom-0 z-40 bg-[#071E17] px-4 sm:px-6 py-3.5 border-t border-emerald-800/80 flex items-center justify-between gap-4 shadow-2xl">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-black text-white">₹1999</span>
                <span className="text-xs text-slate-400 line-through">₹3999</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold">Special 50% Early Bird Offer</span>
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
