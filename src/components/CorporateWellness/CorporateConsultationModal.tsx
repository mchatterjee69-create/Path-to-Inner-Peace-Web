import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Building2, 
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
  ShieldCheck
} from 'lucide-react';
import { CorporateConsultationPayload } from '../../types';

interface CorporateConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProgram?: string;
}

const PROGRAM_OPTIONS = [
  'Stress & Burnout Management',
  'Mindfulness & Meditation',
  'Emotional Resilience',
  'Workplace Relationships',
  'Focus & Productivity',
  'Customized Corporate Wellness Program',
] as const;

const EMPLOYEE_COUNT_OPTIONS = [
  '1 - 25 Employees',
  '26 - 100 Employees',
  '101 - 500 Employees',
  '501 - 1,000 Employees',
  '1,000+ Employees',
  'Global / Enterprise'
];

export const CorporateConsultationModal: React.FC<CorporateConsultationModalProps> = ({
  isOpen,
  onClose,
  preselectedProgram
}) => {
  const [formData, setFormData] = useState<CorporateConsultationPayload>({
    fullName: '',
    workEmail: '',
    company: '',
    designation: '',
    phone: '',
    employeeCount: '26 - 100 Employees',
    preferredProgram: preselectedProgram || 'Customized Corporate Wellness Program',
    preferredFormat: 'Online',
    preferredDate: '',
    requirementDetails: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  // Sync preselected program when prop changes
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
      setError('Please enter a valid work email address.');
      return;
    }

    if (!formData.company.trim() || formData.company.trim().length < 2) {
      setError('Please enter your company or organization name.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/corporate-wellness/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit consultation request. Please try again.');
      }

      setReferenceId(data.referenceId || `CW-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`);
      setSuccess(true);
    } catch (err: any) {
      console.warn('Backend endpoint error, attempting fallback notification:', err);
      // Fallback to notify-registration endpoint to ensure zero lead loss
      try {
        const fallbackRes = await fetch('/api/notify-registration', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            formType: 'Corporate Wellness Consultation',
            fullName: formData.fullName,
            email: formData.workEmail,
            mobile: formData.phone,
            details: {
              company: formData.company,
              designation: formData.designation,
              employeeCount: formData.employeeCount,
              preferredProgram: formData.preferredProgram,
              preferredFormat: formData.preferredFormat,
              preferredDate: formData.preferredDate,
              requirementDetails: formData.requirementDetails
            }
          })
        });

        if (fallbackRes.ok) {
          setReferenceId(`CW-2026-${Math.random().toString(36).substring(2, 7).toUpperCase()}`);
          setSuccess(true);
          return;
        }
      } catch (fallbackErr) {
        console.error('Fallback notify failed:', fallbackErr);
      }
      setError(err.message || 'Something went wrong while submitting your request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetAndClose = () => {
    setSuccess(false);
    setError(null);
    setReferenceId(null);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        id="corporate-consultation-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 overflow-y-auto"
        aria-labelledby="modal-heading"
        role="dialog"
        aria-modal="true"
      >
        {/* Backdrop (Click outside to close) */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            if (!loading) handleResetAndClose();
          }}
          className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-emerald-900/20 overflow-hidden z-10 my-auto text-slate-900 max-h-[92vh] flex flex-col"
          onClick={e => e.stopPropagation()}
        >
          {/* Header Banner */}
          <div className="relative bg-gradient-to-r from-[#021d15] via-[#052e22] to-[#0b4d37] text-white px-5 sm:px-8 py-5 sm:py-6 border-b border-emerald-800/40 shrink-0">
            {/* Close Button */}
            <button
              onClick={handleResetAndClose}
              disabled={loading}
              className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors focus:outline-none focus:ring-2 focus:ring-[#D4AF37] cursor-pointer"
              aria-label="Close consultation modal"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>

            <div className="flex items-center gap-2 text-amber-300 font-semibold text-xs sm:text-sm tracking-wider uppercase mb-1.5">
              <Building2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Path to Inner Peace • Corporate Wellness</span>
            </div>

            <h3 id="modal-heading" className="text-xl sm:text-2xl lg:text-3xl font-serif font-bold text-white tracking-tight">
              Book a Corporate Wellness Session
            </h3>
            
            <p className="mt-1.5 text-xs sm:text-sm text-emerald-100/90 max-w-xl font-normal leading-relaxed">
              Tell us a little about your organization and your wellness requirements. We'll get in touch to explore the right program for your team.
            </p>
          </div>

          {/* Modal Content Body */}
          <div className="overflow-y-auto px-5 sm:px-8 py-5 sm:py-6 flex-1 space-y-6">
            {success ? (
              /* Success Message Screen */
              <div className="py-6 sm:py-8 text-center space-y-5">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border-2 border-[#0B6B53] shadow-md">
                  <CheckCircle2 className="w-9 h-9 sm:w-11 sm:h-11 text-[#0B6B53]" />
                </div>

                <div className="space-y-2 max-w-lg mx-auto">
                  <span className="inline-block text-xs font-bold text-[#D4AF37] tracking-wider uppercase bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    Enquiry Confirmed
                  </span>
                  <h4 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
                    Corporate Wellness Session Requested
                  </h4>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    Thank you for reaching out to <strong className="text-[#0B6B53]">Path to Inner Peace</strong>. Your corporate wellness enquiry has been received. Our team will connect with you shortly.
                  </p>
                </div>

                {referenceId && (
                  <div className="inline-block bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl text-xs font-mono text-slate-700 shadow-2xs">
                    Reference Code: <span className="font-bold text-[#0B6B53]">{referenceId}</span>
                  </div>
                )}

                <div className="pt-4 flex justify-center">
                  <button
                    onClick={handleResetAndClose}
                    className="px-8 py-3 bg-[#0B6B53] hover:bg-[#074737] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer text-sm"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                {error && (
                  <div className="flex items-start gap-2.5 p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-800 text-xs sm:text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-600 mt-0.5" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Section: Contact & Company (Grid) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Field 1: Full Name * */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Priya Sharma"
                        required
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 2: Work Email * */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="priya@company.com"
                        required
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 3: Company / Organization * */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Company / Organization <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="e.g. Acme Corp Ltd"
                        required
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 4: Designation / Role */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Designation / Role
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Briefcase className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        name="designation"
                        value={formData.designation}
                        onChange={handleChange}
                        placeholder="e.g. Head of HR, Founder, L&D Lead"
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 5: Phone / WhatsApp Number */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Phone / WhatsApp Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Field 6: Number of Employees */}
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Number of Employees
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Users className="w-4 h-4" />
                      </div>
                      <select
                        name="employeeCount"
                        value={formData.employeeCount}
                        onChange={handleChange}
                        className="w-full pl-9 pr-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:border-transparent transition-all"
                      >
                        {EMPLOYEE_COUNT_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Field 7: Preferred Program */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                    Preferred Program Area
                  </label>
                  <select
                    name="preferredProgram"
                    value={formData.preferredProgram}
                    onChange={handleChange}
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:border-transparent transition-all"
                  >
                    {PROGRAM_OPTIONS.map(prog => (
                      <option key={prog} value={prog}>{prog}</option>
                    ))}
                  </select>
                </div>

                {/* Field 8: Preferred Format (Online, Offline, Either) & Field 9: Preferred Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Preferred Format
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Online', 'Offline', 'Either'] as const).map(fmt => (
                        <button
                          key={fmt}
                          type="button"
                          onClick={() => handleFormatSelect(fmt)}
                          className={`py-2 px-2 text-xs font-semibold rounded-lg border text-center transition-all cursor-pointer ${
                            formData.preferredFormat === fmt
                              ? 'bg-[#0B6B53] text-white border-[#0B6B53] shadow-xs'
                              : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {fmt}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                      Preferred Session / Meeting Date
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Calendar className="w-4 h-4" />
                      </div>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        min={new Date().toISOString().split('T')[0]}
                        className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:border-transparent transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Field 10: Tell us briefly about your requirement */}
                <div className="space-y-1.5">
                  <label className="block text-xs sm:text-sm font-semibold text-slate-800">
                    Tell us briefly about your requirement
                  </label>
                  <textarea
                    name="requirementDetails"
                    rows={3}
                    value={formData.requirementDetails}
                    onChange={handleChange}
                    placeholder="Share any specific challenges, team goals, target audience (e.g., engineering, leadership, company-wide), or preferred timelines..."
                    className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:border-transparent transition-all resize-none"
                  />
                </div>

                {/* Trust and Privacy Note */}
                <div className="flex items-center gap-2 text-[11px] text-slate-500 pt-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Your organizational information is strictly confidential and protected.</span>
                </div>

                {/* Primary Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#0B6B53] via-emerald-700 to-[#0B6B53] hover:from-emerald-700 hover:to-[#0B6B53] text-white font-bold text-sm sm:text-base shadow-lg shadow-emerald-900/20 hover:shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75 active:scale-[0.99] border border-emerald-500/30"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>Book a Corporate Wellness Session</span>
                        <ArrowRight className="w-4 h-4 text-amber-300" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
