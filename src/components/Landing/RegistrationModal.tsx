import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Sun, CheckCircle2, ShieldCheck, HeartHandshake } from 'lucide-react';

export const RegistrationModal: React.FC = () => {
  const { isRegistrationModalOpen, setIsRegistrationModalOpen, registerUser } = useApp();

  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('India');
  const [agreedWhatsapp, setAgreedWhatsapp] = useState(true);
  const [error, setError] = useState('');

  if (!isRegistrationModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) {
      setError('Please enter your full name');
      return;
    }
    if (!whatsapp.trim() || whatsapp.trim().length < 8) {
      setError('Please enter a valid WhatsApp number for daily challenge reminders');
      return;
    }

    registerUser({
      fullName: fullName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim(),
      country,
      agreedWhatsapp,
      registeredAt: new Date().toISOString()
    });

    const liveUrl = 'https://www.youtube.com/live/u42RK5eV_c8?si=wg7ziJNLQNRu7hID';
    const newWin = window.open(liveUrl, '_blank');
    if (!newWin || newWin.closed || typeof newWin.closed === 'undefined') {
      window.location.href = liveUrl;
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center min-h-full animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-900/10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-[#0B6B53] to-[#134E4A] p-4 sm:p-5 text-white text-center relative shrink-0">
          <button
            type="button"
            onClick={() => setIsRegistrationModalOpen(false)}
            className="absolute top-3 right-3 p-1 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
            <Sun className="w-5 h-5 animate-spin-slow text-[#D4AF37]" />
          </div>

          <span className="inline-block px-3 py-0.5 mb-1 bg-[#D4AF37] text-slate-950 font-bold text-[10px] uppercase tracking-widest rounded-full">
            100% FREE REGISTRATION
          </span>

          <h3 className="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">
            Join the 5-Day Reset
          </h3>
          <p className="text-xs text-emerald-100 mt-0.5">
            Rewire your mind in 30 minutes a day with Mainak Chatterjee
          </p>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-3.5 text-slate-800 overflow-y-auto flex-1">
          
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Full Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Ananya Sharma"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              WhatsApp Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="tel"
                required
                placeholder="+91 91636 70300"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:bg-white transition-all"
              />
            </div>
            <p className="text-[11px] text-slate-500 mt-1">Used exclusively to send daily exercise reminders & zoom session links.</p>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Email Address <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <input
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Country
            </label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:bg-white transition-all cursor-pointer"
            >
              <option value="India">🇮🇳 India</option>
              <option value="United States">🇺🇸 United States</option>
              <option value="United Kingdom">🇬🇧 United Kingdom</option>
              <option value="United Arab Emirates">🇦🇪 United Arab Emirates</option>
              <option value="Canada">🇨🇦 Canada</option>
              <option value="Australia">🇦🇺 Australia</option>
              <option value="Singapore">🇸🇬 Singapore</option>
              <option value="Other">🌐 Other Country</option>
            </select>
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              type="checkbox"
              id="whatsappCheck"
              checked={agreedWhatsapp}
              onChange={(e) => setAgreedWhatsapp(e.target.checked)}
              className="mt-1 w-4 h-4 text-[#0B6B53] rounded border-slate-300 focus:ring-[#0B6B53]"
            />
            <label htmlFor="whatsappCheck" className="text-xs text-slate-600 leading-snug cursor-pointer">
              I agree to receive daily WhatsApp notifications, lesson updates, and my certificate alert.
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 px-6 bg-gradient-to-r from-[#0B6B53] to-[#134E4A] text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/20 hover:brightness-110 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5 text-[#D4AF37]" />
            <span>Join Free Challenge Now</span>
          </button>

          <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              100% Privacy
            </span>
            <span className="flex items-center gap-1">
              <HeartHandshake className="w-3.5 h-3.5 text-amber-600" />
              No Credit Card
            </span>
          </div>

        </form>
      </div>
    </div>
  );
};
