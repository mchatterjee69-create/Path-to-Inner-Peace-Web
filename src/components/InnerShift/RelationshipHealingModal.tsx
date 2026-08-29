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
  Heart,
  Sparkles,
  Headphones,
  Lightbulb,
  ShieldAlert,
  Target,
  CheckCircle2,
  Radio,
  RefreshCw,
  Users,
  Award
} from 'lucide-react';

interface RelationshipHealingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RelationshipHealingModal: React.FC<RelationshipHealingModalProps> = ({
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
          formType: 'relationship_healing_therapy_enrollment',
          fullName: name.trim() || user.name || 'Anonymous Seeker',
          mobile: fullPhone || user.whatsapp || 'Not provided',
          email: user.email || 'seeker@innerpeace.com',
          details: {
            program: 'Relationship Healing Therapy',
            price: '₹1999 (Original: ₹2999)',
            discount: '33% OFF',
            status: 'Lead captured on Relationship Healing modal'
          }
        });
      } catch (err) {
        console.error('Lead dispatch error', err);
      }
    }

    setSelectedPlan({
      id: 'INNER_TRANSFORMATION_ELITE',
      name: 'Relationship Healing Therapy',
      tagline: 'Heal Deep Emotional Wounds. Rebuild Trust. Create Meaningful Connections — Inspired by John Gottman’s Sound Relationship House Theory.',
      priceINR: 1999,
      priceUSD: 29,
      originalPriceINR: 2999,
      popular: true,
      badge: '33% OFF',
      paymentUrl: 'https://rzp.io/rzp/JwfVE56z',
      period: 'One-Time Live Program (2 Weeks)',
      buttonText: 'Enroll Now (₹1,999)',
      colorScheme: 'darkEmerald',
      features: [
        'Understand and heal emotional triggers (attachment awareness)',
        'Communicate effectively without conflict escalation',
        'Rebuild trust and emotional safety (trust repair framework)',
        'Break repetitive relationship conflicts (pattern interruption techniques)',
        'Deepen connection and intimacy (emotional bonding & attunement)',
        'Personalised counselling therapy support for deeper guidance',
        'Practical exercises & Gottman-inspired relationship toolkits',
        'Workbook, Audio sessions & Study Materials'
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
                  src="https://media-cdn.cosmofeed.com/chat/1000155399-2026-02-04-01-58-50.png" 
                  alt="Relationship Healing Therapy" 
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
                    Relationship Healing Therapy
                  </h1>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl sm:text-3xl font-black text-white">₹1999</span>
                  <span className="text-sm sm:text-base text-slate-400 line-through">₹2999</span>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/20 px-2 py-0.5 rounded border border-amber-500/30">
                    SAVE ₹1000
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
                <Video className="w-5 h-5 text-rose-400 stroke-[2.2]" />
                <span>Therapy Sessions & Curriculum</span>
              </h3>

              {/* Live Session Item */}
              <div className="p-3.5 rounded-xl bg-[#061A13] border border-emerald-800/80 flex items-center justify-between gap-3 text-xs text-slate-200">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-rose-500/15 text-rose-400 border border-rose-500/30 flex items-center justify-center shrink-0 shadow-inner">
                    <Radio className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Live Guided Relationship Therapy Session</p>
                    <p className="text-[11px] text-slate-300">Gottman-Method & Attachment Healing Principles</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-rose-400 font-semibold shrink-0 bg-rose-500/10 px-2.5 py-1 rounded-md border border-rose-500/20">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Live & Interactive</span>
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
                        <span>Lesson 1: Root Causes of Relationship Distress & Attachment Wounds</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* EXACT VERBATIM COURSE DESCRIPTION FROM COSMOFEED / SUPERPROFILE */}
            <div className="bg-[#0A261D] rounded-2xl border border-emerald-800/80 p-5 sm:p-7 space-y-5 text-slate-200 text-sm leading-relaxed">
              
              {/* Top Subtitle */}
              <p className="font-bold text-white text-base text-rose-300">
                Heal Deep Emotional Wounds. Rebuild Trust. Create Meaningful Connections
              </p>

              {/* Are You Experiencing This in Your Relationships? */}
              <div className="space-y-2 pt-2 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                    <ShieldAlert className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Are You Experiencing This in Your Relationships?</span>
                </h3>
                <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300 pl-7 list-disc">
                  <li>Frequent conflicts, misunderstandings, or communication breakdowns (relationship distress)</li>
                  <li>Emotional distance, lack of connection, or feeling unheard (emotional disconnection)</li>
                  <li>Trust issues, past hurts, or unresolved conflicts (attachment wounds)</li>
                  <li>Repeating the same unhealthy patterns again and again (behavioral cycles)</li>
                </ul>
                <p className="text-xs sm:text-sm text-slate-300 pt-1.5 font-medium pl-7">
                  👉 If this feels familiar, your relationship may be shaped by unconscious emotional patterns—and it’s time to heal and transform them.
                </p>
              </div>

              {/* ✦ What This Therapy Offers */}
              <div className="space-y-2.5 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>✦ What This Therapy Offers</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 leading-relaxed">
                  Relationship Healing Therapy is a structured, evidence-based approach inspired by John Gottman’s Sound Relationship House Theory, designed to help you rebuild emotional connection, trust, and stability in your relationships.
                </p>
                <p className="text-xs sm:text-sm text-slate-300 pl-7 leading-relaxed">
                  Built on principles of emotional attunement, communication science, and attachment healing, this experience helps you transform how you connect, communicate, and relate.
                </p>
                <div className="pl-7 space-y-1.5 pt-1">
                  <p className="text-xs sm:text-sm font-semibold text-white">You will learn to:</p>
                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Understand and heal emotional triggers</strong> (attachment awareness)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Communicate effectively</strong> without conflict escalation (healthy communication patterns)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Rebuild trust and emotional safety</strong> (trust repair framework)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Break repetitive relationship conflicts</strong> (pattern interruption techniques)</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong>Deepen connection and intimacy</strong> (emotional bonding & attunement)</span>
                    </div>
                  </div>
                </div>
                <div className="p-3.5 rounded-xl bg-[#061A13] border border-emerald-800/80 text-xs sm:text-sm text-rose-300 font-semibold text-center my-2 space-y-0.5">
                  <div>This is not surface-level advice.</div>
                  <div className="text-white font-bold">This is deep relationship healing and transformation.</div>
                </div>
              </div>

              {/* Core Healing Experience */}
              <div className="space-y-3 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-400 flex items-center justify-center shrink-0">
                    <Heart className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Core Healing Experience</span>
                </h3>

                <div className="space-y-3 pl-7">
                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-rose-400">🔹</span> Emotional Awareness & Triggers
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Identify deep-rooted patterns and heal unresolved emotional wounds
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-rose-400">🔹</span> Effective Communication Skills
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Learn structured methods to express and listen with clarity and empathy
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-rose-400">🔹</span> Conflict Resolution Framework
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Transform conflicts using repair attempts & de-escalation techniques
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-rose-400">🔹</span> Trust & Connection Building
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Rebuild emotional safety through consistent bonding practices
                    </p>
                  </div>

                  <div className="space-y-1">
                    <p className="font-semibold text-white text-xs sm:text-sm flex items-center gap-1.5">
                      <span className="text-rose-400">🔹</span> Healthy Relationship Patterns
                    </p>
                    <p className="text-xs sm:text-sm text-slate-300">
                      Create long-term harmony using conscious relationship design
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
                    <span>Guided techniques for emotional healing & connection</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Proven tools for healthy communication & conflict resolution</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Practical exercises to rebuild trust and intimacy</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Personalised counselling therapy support for deeper guidance</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Deep insights into relationship psychology & patterns</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>A structured approach for lasting, fulfilling relationships</span>
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
                  <li>Individuals facing relationship conflicts or emotional distance</li>
                  <li>Couples struggling with communication and trust issues</li>
                  <li>Anyone dealing with past emotional wounds or attachment issues</li>
                  <li>People stuck in repetitive unhealthy relationship patterns</li>
                  <li>Anyone seeking deeper, healthier, and more meaningful connections</li>
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
                  Imagine experiencing relationships from a place of understanding and connection…
                </p>
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-200 pl-7">
                  <div className="flex items-center gap-2">
                    <span>✨</span>
                    <span>You communicate with clarity instead of frustration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✨</span>
                    <span>You feel emotionally safe, heard, and valued</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span>✨</span>
                    <span>You build deeper, more meaningful bonds</span>
                  </div>
                </div>
                <div className="pl-7 pt-2 space-y-1.5">
                  <p className="text-xs sm:text-sm font-semibold text-white">After this experience, you will:</p>
                  <div className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Heal emotional wounds and past hurts</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Strengthen communication and emotional connection</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Resolve conflicts with maturity and awareness</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>Create stable, fulfilling, and conscious relationships</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* A Deep Emotional Reset */}
              <div className="space-y-2 pt-3 border-t border-emerald-800/70">
                <h3 className="font-bold text-white text-base flex items-center gap-2">
                  <span className="p-1 rounded-md bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center shrink-0">
                    <RefreshCw className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>A Deep Emotional Reset</span>
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 pl-7">
                  Most relationship challenges are not about the situation—they are about <strong className="text-white">unhealed emotions and unconscious patterns</strong>.
                </p>
                <div className="p-3 rounded-xl bg-[#061A13] border border-emerald-800/80 text-xs sm:text-sm text-rose-300 font-semibold text-center my-2">
                  Heal the past → Transform your patterns → Build conscious relationships
                </div>
              </div>

              {/* 👉 Start Your Relationship Transformation Today */}
              <div className="pt-4 border-t border-emerald-800/70 text-center flex flex-col items-center justify-center gap-2">
                <p className="font-bold text-white text-sm sm:text-base">
                  👉 Start Your Relationship Transformation Today
                </p>
                <p className="text-xs text-slate-300">
                  Join Relationship Healing Therapy Now
                </p>
              </div>

            </div>

            {/* Creator / Support Contact Info */}
            <div className="p-4 rounded-xl bg-[#0A261D] border border-emerald-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-rose-400" />
                <span>Support Contact: +91 9163670300</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400 font-medium">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Verified Therapy System • Instant Access</span>
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
                <span className="text-xs text-slate-400 line-through">₹2999</span>
                <span className="text-[10px] bg-rose-500/20 text-rose-300 px-1.5 py-0.5 rounded font-bold">33% OFF</span>
              </div>
              <div className="text-[10px] text-slate-400">One-Time / Lifetime Access</div>
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
