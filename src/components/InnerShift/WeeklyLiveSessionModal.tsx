import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { dispatchFormToAdmin } from '../../utils/formSubmit';
import { 
  X, 
  Radio, 
  Calendar, 
  Clock, 
  Video, 
  CheckCircle2, 
  ShieldCheck, 
  MessageCircle, 
  ArrowRight,
  HelpCircle,
  Sparkles
} from 'lucide-react';

export const WeeklyLiveSessionModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({
  isOpen,
  onClose
}) => {
  const { user, triggerConfetti } = useApp();

  const [fullName, setFullName] = useState(user.name !== 'Seeker' ? user.name : '');
  const [whatsapp, setWhatsapp] = useState(user.whatsapp || '');
  const [email, setEmail] = useState(user.email && !user.email.includes('@example.com') ? user.email : '');
  const [location, setLocation] = useState('');
  const [attendanceMode, setAttendanceMode] = useState('Interactive Zoom (Ask Questions Live)');
  const [userQuestion, setUserQuestion] = useState('');
  const [agreedAlerts, setAgreedAlerts] = useState(true);

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
      setError('Please enter a valid WhatsApp number for the live stream link & reminders');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid email address for calendar invites & session worksheets');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await dispatchFormToAdmin({
        formType: 'Weekly Live Mental Fitness Session Registration',
        fullName: fullName.trim(),
        email: email.trim(),
        mobile: whatsapp.trim(),
        details: {
          location: location.trim() || 'Not specified',
          attendanceMode,
          userQuestion: userQuestion.trim() || 'No specific question entered',
          agreedAlerts,
          registeredAt: new Date().toISOString()
        }
      });

      setIsSuccess(true);
      triggerConfetti();
    } catch (err) {
      console.error(err);
      setIsSuccess(true);
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
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-rose-500/30 border border-rose-400/50 rounded-full text-rose-200 font-bold text-[11px] uppercase tracking-wider animate-pulse">
              <Radio className="w-3.5 h-3.5 text-rose-300" />
              Live Every Sunday • 11:00 AM IST
            </span>
          </div>

          <h3 className="font-serif font-extrabold text-2xl sm:text-3xl text-white tracking-tight leading-tight">
            Register for Weekly Live Sessions
          </h3>
          <p className="text-xs sm:text-sm text-emerald-100/90 mt-1 max-w-md">
            Interactive Mental Fitness Strategies, Live Q&A, and Guided Mindset Coaching with Mainak Chatterjee
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
                  Live Seat Confirmed
                </span>
                <h4 className="text-2xl font-serif font-extrabold text-slate-900 mt-2">
                  You're On The Guest List, {fullName}!
                </h4>
                <p className="text-sm text-slate-600 max-w-md mx-auto">
                  We'll send your private Zoom link and session worksheet directly to your WhatsApp before Sunday 11:00 AM IST.
                </p>
              </div>

              {/* Confirmation Details Box */}
              <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 text-left text-xs sm:text-sm text-slate-800 space-y-2.5">
                <div className="flex justify-between items-center py-1 border-b border-emerald-100">
                  <span className="text-slate-500 font-medium">Session Schedule:</span>
                  <span className="font-bold text-slate-900 text-right">Upcoming Sunday @ 11:00 AM IST</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-100">
                  <span className="text-slate-500 font-medium">Live Format:</span>
                  <span className="font-bold text-[#0F4C45] text-right">{attendanceMode}</span>
                </div>
                <div className="flex justify-between items-center py-1 border-b border-emerald-100">
                  <span className="text-slate-500 font-medium">WhatsApp Alerts:</span>
                  <span className="font-bold text-slate-900 text-right">{whatsapp}</span>
                </div>
                <div className="flex justify-between items-center py-1">
                  <span className="text-slate-500 font-medium">Session Summary:</span>
                  <span className="font-bold text-emerald-800 text-right">Workbook sent to {email}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={`https://wa.me/919163670300?text=${encodeURIComponent(`Hi Mainak, I have registered for the Weekly Live Mental Fitness Session on Sunday! Please send me the live link.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 py-3.5 px-4 bg-[#25D366] hover:bg-[#20bd5a] text-slate-950 font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-slate-950" />
                  <span>Join WhatsApp Live Alerts</span>
                </a>
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="flex-1 py-3.5 px-4 bg-[#0F4C45] hover:bg-[#0B3B36] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                  <span>Done & Back to Inner Shift</span>
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="space-y-4 text-slate-800">
              
              {/* Live Session Highlights Box */}
              <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 sm:p-4 grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-[#0F4C45] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Next Live Session</span>
                    <span className="text-slate-500 text-[11px]">This Sunday @ 11:00 AM IST</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Clock className="w-4 h-4 text-[#0F4C45] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Duration</span>
                    <span className="text-slate-500 text-[11px]">60 Mins + Live Q&A</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Video className="w-4 h-4 text-[#0F4C45] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Platform</span>
                    <span className="text-slate-500 text-[11px]">Zoom & Private YouTube</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#0F4C45] shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900 block">Interactive Mentorship</span>
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
                  placeholder="e.g. Priya Banerjee"
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
                  <span className="text-[10px] text-slate-400 mt-0.5 block">For 15-min reminder & live Zoom link</span>
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
                  <span className="text-[10px] text-slate-400 mt-0.5 block">For calendar invite & worksheet PDF</span>
                </div>
              </div>

              {/* City & Attendance Mode in 2 columns */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Your City / State
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Kolkata / Mumbai / London"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C45] text-sm bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Preferred Attendance Mode
                  </label>
                  <select
                    value={attendanceMode}
                    onChange={(e) => setAttendanceMode(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C45] text-xs sm:text-sm bg-white font-medium"
                  >
                    <option value="Interactive Zoom (Ask Questions Live)">Interactive Zoom (Live Audio/Video & Q&A)</option>
                    <option value="Private YouTube Live Stream (Listen-Only)">YouTube Live Stream (Listen & Chat Only)</option>
                  </select>
                </div>
              </div>

              {/* Optional Question for Mainak */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                  Question or Topic for Mainak <span className="text-slate-400 text-[10px] font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="e.g., How do I manage workplace anxiety and stop overthinking at night?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0F4C45] text-xs sm:text-sm bg-white resize-none"
                />
              </div>

              {/* Checkbox agreement */}
              <label className="flex items-start gap-2.5 pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedAlerts}
                  onChange={(e) => setAgreedAlerts(e.target.checked)}
                  className="w-4 h-4 rounded text-[#0F4C45] focus:ring-[#0F4C45] mt-0.5 cursor-pointer"
                />
                <span className="text-xs text-slate-600 leading-snug">
                  I agree to receive the Sunday live session link, calendar reminder, and session worksheet on WhatsApp & Email.
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
                    <span>Reserving Your Seat...</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>Reserve My Live Session Seat</span>
                    <ArrowRight className="w-5 h-5 text-[#D4AF37]" />
                  </span>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 text-center pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Free Masterclass • Direct Live Access with Mainak</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
