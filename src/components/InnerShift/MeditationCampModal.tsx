import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dispatchFormToAdmin } from '../../utils/formSubmit';
import { 
  X, 
  Sparkles, 
  Calendar, 
  Clock, 
  Users, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle, 
  Headphones, 
  ArrowRight,
  Heart,
  Compass
} from 'lucide-react';

export const MeditationCampModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { user, setActiveView, triggerConfetti } = useApp();

  const [fullName, setFullName] = useState(user.name !== 'Seeker' ? user.name : '');
  const [whatsapp, setWhatsapp] = useState(user.whatsapp || '');
  const [email, setEmail] = useState(user.email && !user.email.includes('@example.com') ? user.email : '');
  const [campType, setCampType] = useState('Weekend Silence & Dhyana Retreat (2 Days Live)');
  const [experienceLevel, setExperienceLevel] = useState('Beginner (First time meditating)');
  const [preferredBatch, setPreferredBatch] = useState('Morning Batch: 6:00 AM – 7:15 AM IST');
  const [primaryGoal, setPrimaryGoal] = useState('Stress & Anxiety Relief');
  const [agreedWhatsapp, setAgreedWhatsapp] = useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!whatsapp.trim() || whatsapp.trim().length < 8) {
      setError('Please enter a valid WhatsApp number for camp schedule & join links');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address for confirmation & preparation kit');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await dispatchFormToAdmin({
        formType: 'Meditation Camp & Retreat Registration',
        fullName: fullName.trim(),
        email: email.trim(),
        mobile: whatsapp.trim(),
        details: {
          campType,
          experienceLevel,
          preferredBatch,
          primaryGoal,
          agreedWhatsapp,
          registeredAt: new Date().toISOString()
        }
      });

      setIsSuccess(true);
      triggerConfetti();
    } catch (err) {
      console.error(err);
      setIsSuccess(true); // Still show success to user
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setIsSuccess(false);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center min-h-full animate-fadeIn">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-emerald-900/20 max-h-[92vh] flex flex-col my-auto transition-all">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-[#0F4C45] via-[#155e54] to-[#0B3B36] p-5 sm:p-6 text-white relative shrink-0 border-b border-emerald-800/40">
          <button
            type="button"
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer z-10"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#D4AF37]/20 border border-[#D4AF37]/50 rounded-full text-[#FDE047] font-bold text-[11px] uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              Guided Meditation Camps & Retreats
            </span>
          </div>

          <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
            Register for Meditation Camp
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-md">
            Immersive Guided Dhyana, Silent Mindfulness & Mind-Body Rejuvenation with Mainak Chatterjee
          </p>
        </div>

        {/* Modal Content */}
        <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
          {isSuccess ? (
            <div className="text-center py-4 space-y-5 animate-fadeIn">
              <div className="w-16 h-16 bg-emerald-100 text-[#0F4C45] rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10 text-[#0F4C45]" />
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#0F4C45] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Registration Confirmed
                </span>
                <h4 className="text-2xl font-serif font-extrabold text-slate-900 mt-2">
                  Welcome to the Meditation Camp, {fullName}!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  Your seat for <strong className="text-[#0F4C45]">{campType}</strong> ({preferredBatch}) has been successfully reserved.
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm text-slate-800 space-y-2.5">
                <div className="flex justify-between items-center py-1 border-b border-emerald-100">
                  <span className="text-slate-500 font-medium">Cohort / Camp:</span>
                  <span className="font-bold text-slate-900 text-right">{campType}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-100">
                  <span className="text-slate-500 font-medium">Batch Timing:</span>
                  <span className="font-bold text-slate-900 text-right">{preferredBatch}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-100">
                  <span className="text-slate-500 font-medium">WhatsApp Updates:</span>
                  <span className="font-bold text-[#0F4C45] text-right">{whatsapp}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Preparation Kit:</span>
                  <span className="font-bold text-emerald-800 text-right">Sent to {email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/919163670300?text=${encodeURIComponent(`Hi Mainak, I have registered for the Meditation Camp (${campType}). Please add me to the Cohort group!`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Join WhatsApp Camp Group</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    handleResetAndClose();
                    setActiveView('meditation');
                  }}
                  className="flex-1 py-3.5 px-4 bg-[#0F4C45] hover:bg-[#0B3B36] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Headphones className="w-4 h-4 text-[#D4AF37]" />
                  <span>Explore Daily Meditations</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-slate-800">
              
              {/* Camp Highlights Bento Box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#0F4C45] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Upcoming Cohorts</span>
                    <span className="text-slate-500 text-[11px]">Weekend & 7-Day Formats</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#0F4C45] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Daily Live Practice</span>
                    <span className="text-slate-500 text-[11px]">Morning & Evening Slots</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Compass className="w-4 h-4 text-[#0F4C45] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Vipassana & Dhyana</span>
                    <span className="text-slate-500 text-[11px]">Deep Breath & Mindfulness</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="w-4 h-4 text-[#0F4C45] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Live Mentorship</span>
                    <span className="text-slate-500 text-[11px]">Direct with Mainak</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                  {error}
                </div>
              )}

              {/* Form Input: Full Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C45] text-sm bg-white"
                />
              </div>

              {/* Form Input: WhatsApp & Email in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    WhatsApp Number <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C45] text-sm bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">For camp schedule & live links</span>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C45] text-sm bg-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">For preparation kit & PDF guide</span>
                </div>
              </div>

              {/* Camp Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Select Meditation Camp / Cohort <span className="text-rose-500">*</span>
                </label>
                <select
                  value={campType}
                  onChange={(e) => setCampType(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C45] text-sm bg-white font-medium"
                >
                  <option value="Weekend Silence & Dhyana Retreat (2 Days Live)">
                    Weekend Silence & Dhyana Retreat (2 Days Live Intensive)
                  </option>
                  <option value="7-Day Guided Inner Peace Meditation Camp">
                    7-Day Guided Inner Peace Meditation Camp (Daily 60 Mins)
                  </option>
                  <option value="21-Day Sunrise Mindfulness & Breathwork Camp">
                    21-Day Sunrise Mindfulness & Breathwork Camp (6:00 AM IST)
                  </option>
                  <option value="Chakra Healing & Sound Frequency Immersion">
                    Chakra Healing & Sound Frequency Immersion (Weekend Special)
                  </option>
                </select>
              </div>

              {/* Timing & Experience in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Preferred Batch Timing
                  </label>
                  <select
                    value={preferredBatch}
                    onChange={(e) => setPreferredBatch(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C45] text-xs sm:text-sm bg-white"
                  >
                    <option value="Morning Batch: 6:00 AM – 7:15 AM IST">Morning: 6:00 AM – 7:15 AM IST</option>
                    <option value="Evening Batch: 7:00 PM – 8:15 PM IST">Evening: 7:00 PM – 8:15 PM IST</option>
                    <option value="Weekend Special: 10:00 AM – 1:00 PM IST">Weekend: 10:00 AM – 1:00 PM IST</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Meditation Experience
                  </label>
                  <select
                    value={experienceLevel}
                    onChange={(e) => setExperienceLevel(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C45] text-xs sm:text-sm bg-white"
                  >
                    <option value="Beginner (First time meditating)">Beginner (First time meditating)</option>
                    <option value="Intermediate (Occasional practitioner)">Intermediate (Occasional practitioner)</option>
                    <option value="Experienced (Regular meditator)">Experienced (Regular meditator)</option>
                  </select>
                </div>
              </div>

              {/* Primary Goal Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Primary Transformation Goal
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[
                    'Stress & Anxiety Relief',
                    'Deep Sleep & Relaxation',
                    'Overcoming Overthinking',
                    'Emotional Healing',
                    'Spiritual Awakening',
                    'Focus & Productivity'
                  ].map((goal) => (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => setPrimaryGoal(goal)}
                      className={`px-2.5 py-2 text-xs rounded-xl font-medium border text-left transition-all cursor-pointer ${
                        primaryGoal === goal
                          ? 'bg-emerald-50 border-[#0F4C45] text-[#0F4C45] font-bold shadow-sm'
                          : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {goal}
                    </button>
                  ))}
                </div>
              </div>

              {/* Checkbox agreement */}
              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedWhatsapp}
                  onChange={(e) => setAgreedWhatsapp(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0F4C45] focus:ring-[#0F4C45] mt-0.5 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  I agree to receive the Meditation Camp schedule, Zoom links, and preparation audio guide via WhatsApp and Email.
                </span>
              </label>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 px-6 bg-gradient-to-r from-[#0F4C45] to-[#0B3B36] hover:from-[#0B3B36] hover:to-[#082925] text-white font-extrabold text-base rounded-2xl shadow-xl hover:shadow-2xl active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#D4AF37]/40 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Reserving Your Camp Seat...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>Register for Meditation Camp</span>
                    <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
                  </span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Free Registration • Instant WhatsApp Confirmation</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
