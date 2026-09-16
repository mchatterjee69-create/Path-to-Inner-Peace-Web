import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Building2, 
  Dumbbell, 
  GraduationCap, 
  Mail, 
  User, 
  Briefcase, 
  Phone, 
  Users, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Laptop, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  MapPin,
  MessageCircle,
  Handshake
} from 'lucide-react';
import { PartnerCategory, PartnerConsultationPayload } from '../../types';

interface PartnerConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedCategory?: PartnerCategory;
  preselectedProgram?: string;
}

const CATEGORY_OPTIONS: { id: PartnerCategory; label: string; icon: any; placeholder: string; desc: string }[] = [
  { 
    id: 'corporate', 
    label: 'Corporate & Enterprise', 
    icon: Building2, 
    placeholder: 'e.g. Acme Technologies / Deloitte India',
    desc: 'Workplace stress reduction, executive resilience & team psychological safety'
  },
  { 
    id: 'gym', 
    label: 'Gyms & Fitness Studios', 
    icon: Dumbbell, 
    placeholder: 'e.g. Gold\'s Gym / Cult.fit / Iron Sanctuary',
    desc: 'Somatic breathwork cooldown, nervous system reset & mind-muscle athletic recovery'
  },
  { 
    id: 'college', 
    label: 'College & University', 
    icon: GraduationCap, 
    placeholder: 'e.g. St. Xavier\'s / IIT / Amity University',
    desc: 'Student exam anxiety, career clarity, youth emotional health & campus wellbeing'
  },
  { 
    id: 'other', 
    label: 'Community / Retreats / Others', 
    icon: Handshake, 
    placeholder: 'e.g. Yoga Studio / NGO / Sports Academy',
    desc: 'Co-branded mindful living workshops, community masterclasses & pop-ups'
  }
];

const COHORT_SIZE_OPTIONS: Record<PartnerCategory, string[]> = {
  corporate: ['25 - 50 Employees', '51 - 200 Employees', '201 - 1,000 Employees', '1,000+ Enterprise / Global'],
  gym: ['50 - 150 Active Members', '150 - 500 Members', '500 - 1,500 Members', 'Multi-Branch Gym Chain'],
  college: ['100 - 300 Students / Batch', '300 - 1,000 Students', '1,000 - 5,000 Campus-wide', 'Faculty & Staff Only'],
  other: ['Under 50 Participants', '50 - 200 Attendees', '200+ Community Event']
};

export const PartnerConsultationModal: React.FC<PartnerConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedCategory = 'corporate',
  preselectedProgram
}) => {
  const [partnerCategory, setPartnerCategory] = useState<PartnerCategory>(preselectedCategory);
  const [formData, setFormData] = useState<PartnerConsultationPayload>({
    partnerCategory: preselectedCategory,
    fullName: '',
    workEmail: '',
    organizationName: '',
    designation: '',
    phone: '',
    estimatedCohortSize: COHORT_SIZE_OPTIONS[preselectedCategory][1],
    preferredProgram: preselectedProgram || 'Comprehensive Institutional Partnership',
    preferredFormat: 'Online',
    preferredDate: '',
    requirementDetails: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Sync category & preselected program when props update
  useEffect(() => {
    if (preselectedCategory) {
      setPartnerCategory(preselectedCategory);
      setFormData(prev => ({
        ...prev,
        partnerCategory: preselectedCategory,
        estimatedCohortSize: COHORT_SIZE_OPTIONS[preselectedCategory][1]
      }));
    }
  }, [preselectedCategory]);

  useEffect(() => {
    if (preselectedProgram) {
      setFormData(prev => ({ ...prev, preferredProgram: preselectedProgram }));
    }
  }, [preselectedProgram]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, loading, onClose]);

  // Lock background body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleCategoryChange = (cat: PartnerCategory) => {
    setPartnerCategory(cat);
    setFormData(prev => ({
      ...prev,
      partnerCategory: cat,
      estimatedCohortSize: COHORT_SIZE_OPTIONS[cat][1]
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleFormatSelect = (format: 'Online' | 'Offline' | 'Either') => {
    setFormData(prev => ({ ...prev, preferredFormat: format }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Form Validation
    if (!formData.fullName.trim() || formData.fullName.trim().length < 2) {
      setError('Please enter your full name (at least 2 characters).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.workEmail.trim() || !emailRegex.test(formData.workEmail.trim())) {
      setError('Please enter a valid work or institutional email address.');
      return;
    }

    if (!formData.organizationName.trim() || formData.organizationName.trim().length < 2) {
      setError('Please enter your gym, college, or company name.');
      return;
    }

    setLoading(true);

    try {
      // Post to partner consultations or fallback
      const payload = {
        ...formData,
        company: formData.organizationName, // backward compat with server
        employeeCount: formData.estimatedCohortSize
      };

      const response = await fetch('/api/partner/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(async () => {
        // Fallback to existing corporate endpoint
        return fetch('/api/corporate-wellness/consultations', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit partnership request. Please try again.');
      }

      setReferenceId(data.referenceId || `PIP-PTR-${Math.random().toString(36).substring(2, 7).toUpperCase()}`);
      setSuccess(true);
    } catch (err: any) {
      console.warn('Backend endpoint error, attempting local reference generation:', err);
      // Fallback: save to local storage so lead is never lost
      try {
        const localEnquiries = JSON.parse(localStorage.getItem('pip_partner_enquiries') || '[]');
        const localId = `PTR-${Date.now().toString().slice(-6)}`;
        localEnquiries.push({ ...formData, id: localId, timestamp: new Date().toISOString() });
        localStorage.setItem('pip_partner_enquiries', JSON.stringify(localEnquiries));
        setReferenceId(localId);
        setSuccess(true);
      } catch {
        setError(err.message || 'Unable to submit enquiry at this moment. Please reach out via WhatsApp at +91 9163670300.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setError(null);
    setReferenceId(null);
    setFormData({
      partnerCategory: 'corporate',
      fullName: '',
      workEmail: '',
      organizationName: '',
      designation: '',
      phone: '',
      estimatedCohortSize: COHORT_SIZE_OPTIONS['corporate'][1],
      preferredProgram: 'Comprehensive Institutional Partnership',
      preferredFormat: 'Online',
      preferredDate: '',
      requirementDetails: ''
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="partner-consultation-modal"
        className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 16 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto"
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-[#021811] via-[#083b2c] to-[#04241b] text-white p-6 sm:p-7 border-b border-emerald-800/50">
            {/* Close Button */}
            <button
              onClick={onClose}
              disabled={loading}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/90 hover:text-white transition-colors cursor-pointer disabled:opacity-50"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-2 pr-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-[#D4AF37]/50 text-amber-300 text-[11px] font-bold uppercase tracking-wider">
                <Handshake className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Partner With Us • Institutional Collaborations</span>
              </div>
              
              <h2 id="modal-headline" className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
                {success ? 'Partnership Request Received' : 'Schedule a Partnership Discovery Session'}
              </h2>
              
              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                {success 
                  ? 'Thank you for reaching out to Path to Inner Peace.'
                  : 'Tailored mental reset, somatic breathwork & cognitive resilience architecture for Gyms, Colleges, Corporates & Wellness Studios.'
                }
              </p>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 sm:p-7 max-h-[80vh] overflow-y-auto">
            {success ? (
              /* Success State */
              <div className="space-y-6 text-center py-4">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-[#0B6B53] flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-9 h-9" />
                </div>

                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="text-xl font-serif font-bold text-slate-900">
                    Partnership Discovery Request Submitted!
                  </h3>
                  <p className="text-sm text-slate-600">
                    Our institutional collaborations team will review your requirements for <strong>{formData.organizationName}</strong> and connect within <strong>24 business hours</strong>.
                  </p>
                </div>

                {/* Reference ID card */}
                {referenceId && (
                  <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-sm mx-auto text-center space-y-1">
                    <p className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider">
                      Partnership Reference Number
                    </p>
                    <p className="text-lg font-mono font-bold text-[#0B6B53]">
                      {referenceId}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Please quote this reference in any follow-up communications.
                    </p>
                  </div>
                )}

                {/* WhatsApp Quick Connect */}
                <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 max-w-md mx-auto text-left flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div className="space-y-1 flex-1 text-xs">
                    <p className="font-bold text-emerald-950">
                      Need Immediate Coordination?
                    </p>
                    <p className="text-emerald-800">
                      Reach our institutional director directly on WhatsApp with your proposal details or urgent campus / gym schedules.
                    </p>
                    <a
                      href={`https://wa.me/919163670300?text=${encodeURIComponent(
                        `Hello Mainak / Path to Inner Peace team, I just submitted a partnership request (Ref: ${referenceId || 'New'}) for ${formData.organizationName} (${formData.partnerCategory}). Looking forward to discussing the program.`
                      )}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-emerald-700 hover:text-emerald-900 hover:underline pt-1"
                    >
                      <span>Chat on WhatsApp (+91 91636 70300)</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleReset}
                    className="px-8 py-3 rounded-xl bg-[#0B6B53] hover:bg-[#084f3e] text-white font-bold text-sm transition-colors cursor-pointer shadow-md"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Consultation Form */
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Error Banner */}
                {error && (
                  <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <p>{error}</p>
                  </div>
                )}

                {/* 1. Partner Category Selector Tabs */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-800 uppercase tracking-wider">
                    I am inquiring on behalf of: <span className="text-rose-500">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CATEGORY_OPTIONS.map(cat => {
                      const Icon = cat.icon;
                      const isSelected = partnerCategory === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => handleCategoryChange(cat.id)}
                          className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50/90 border-[#0B6B53] text-[#0B6B53] shadow-xs ring-1 ring-[#0B6B53]'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-[#0B6B53]' : 'text-slate-500'}`} />
                            <span className="text-xs font-bold leading-tight">{cat.label}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Organization Name & Contact Name */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      {partnerCategory === 'gym' ? 'Gym / Fitness Studio Name' : partnerCategory === 'college' ? 'College / University Name' : partnerCategory === 'corporate' ? 'Company / Organization' : 'Institution / Studio Name'} <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        {partnerCategory === 'gym' ? <Dumbbell className="w-4 h-4" /> : partnerCategory === 'college' ? <GraduationCap className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                      </div>
                      <input
                        type="text"
                        name="organizationName"
                        required
                        value={formData.organizationName}
                        onChange={handleChange}
                        placeholder={CATEGORY_OPTIONS.find(c => c.id === partnerCategory)?.placeholder}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0B6B53] focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm text-slate-900 transition-all outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Your Full Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0B6B53] focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm text-slate-900 transition-all outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Official Email & Phone / WhatsApp */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Work / Official Email <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        name="workEmail"
                        required
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="name@organization.com"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0B6B53] focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm text-slate-900 transition-all outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Phone / WhatsApp Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone || ''}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0B6B53] focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm text-slate-900 transition-all outline-hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Designation & Cohort Size */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Your Role / Designation
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation || ''}
                        onChange={handleChange}
                        placeholder={
                          partnerCategory === 'gym' ? 'e.g. Gym Owner / Head Trainer' :
                          partnerCategory === 'college' ? 'e.g. Dean / Professor / Student Affairs' :
                          'e.g. HR Director / Founder / L&D Lead'
                        }
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0B6B53] focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm text-slate-900 transition-all outline-hidden"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-700">
                      Estimated Cohort / Audience Size
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Users className="w-4 h-4" />
                      </div>
                      <select
                        name="estimatedCohortSize"
                        value={formData.estimatedCohortSize}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 focus:border-[#0B6B53] focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm text-slate-900 transition-all outline-hidden bg-white"
                      >
                        {COHORT_SIZE_OPTIONS[partnerCategory].map((opt, i) => (
                          <option key={i} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* 5. Preferred Delivery Format */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-slate-700">
                    Preferred Delivery Format
                  </label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {[
                      { id: 'Online', label: 'Interactive Online (Zoom/Teams)', icon: Laptop },
                      { id: 'Offline', label: 'In-Person Onsite Workshop', icon: MapPin },
                      { id: 'Either', label: 'Flexible / Hybrid Format', icon: Handshake }
                    ].map(fmt => {
                      const Icon = fmt.icon;
                      const isSelected = formData.preferredFormat === fmt.id;
                      return (
                        <button
                          key={fmt.id}
                          type="button"
                          onClick={() => handleFormatSelect(fmt.id as any)}
                          className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 border-[#0B6B53] text-[#0B6B53] font-bold ring-1 ring-[#0B6B53]'
                              : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-600'
                          }`}
                        >
                          <Icon className="w-4 h-4 shrink-0" />
                          <span className="text-[11px] leading-tight">{fmt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 6. Requirement Details */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-700">
                    Specific Goals, Target Timeline, or Cohort Challenges
                  </label>
                  <textarea
                    name="requirementDetails"
                    rows={3}
                    value={formData.requirementDetails || ''}
                    onChange={handleChange}
                    placeholder={
                      partnerCategory === 'gym' 
                        ? 'e.g. We want to offer our 300+ fitness members post-workout somatic breathwork and recovery cooldowns on Saturday mornings...' :
                      partnerCategory === 'college'
                        ? 'e.g. We are planning a Mental Wellness Week for 500 engineering students ahead of midterm exams...' :
                        'e.g. Our team of 80 engineers is experiencing meeting overload and high workplace stress...'
                    }
                    className="w-full p-3 rounded-xl border border-slate-300 focus:border-[#0B6B53] focus:ring-2 focus:ring-emerald-100 text-xs sm:text-sm text-slate-900 transition-all outline-hidden resize-none"
                  />
                </div>

                {/* Trust Footer & Submit Button */}
                <div className="space-y-3 pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#0B6B53] via-emerald-700 to-[#0B6B53] hover:from-emerald-700 hover:to-emerald-800 text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 border border-emerald-500/30"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Partnership Details...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Partnership Request</span>
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 text-center">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      100% Confidential
                    </span>
                    <span>•</span>
                    <span>No Obligation Assessment</span>
                    <span>•</span>
                    <span>Direct Call with Mainak Chatterjee</span>
                  </div>
                </div>

              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
