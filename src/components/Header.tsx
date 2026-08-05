import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/images/inner_peace_logo_1785607496327.jpg';
import { 
  User, 
  Crown, 
  Award, 
  Flame, 
  Compass, 
  ShieldCheck,
  Menu,
  X,
  Radio
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    user, 
    activeView, 
    setActiveView, 
    setIsRegistrationModalOpen,
    setIsAdminModalOpen,
    setIsCertificateModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-emerald-900/10 transition-all w-full">
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-1.5 sm:gap-2">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveView('landing')} 
          className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group shrink-0"
        >
          <img 
            src={logoImg} 
            alt="Path to Inner Peace Logo" 
            className="w-7 h-7 sm:w-10 sm:h-10 rounded-full object-cover shadow-sm group-hover:scale-105 transition-transform shrink-0 border border-emerald-800/10"
            referrerPolicy="no-referrer"
          />
          <div className="flex flex-col min-w-0">
            <span className="font-poppins font-bold text-xs xs:text-sm sm:text-base md:text-lg text-[#0B6B53] tracking-tight whitespace-nowrap leading-tight">
              Path to Inner Peace
            </span>
            <span className="text-[8px] xs:text-[9px] sm:text-[11px] font-semibold gold-text tracking-normal whitespace-nowrap leading-none mt-0.5">
              Transform Your Mind, Elevate Your Life
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 font-inter text-sm font-medium text-emerald-900/70">
          <button
            onClick={() => setActiveView('landing')}
            className={`transition-colors py-1 ${activeView === 'landing' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            Home
          </button>
          
          <button
            onClick={() => setActiveView('inner-shift')}
            className={`transition-colors py-1 ${activeView === 'inner-shift' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            Inner Shift
          </button>

          <button
            onClick={() => setActiveView('inner-revolution')}
            className={`transition-colors py-1 ${activeView === 'inner-revolution' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            Inner Revolution
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className={`transition-colors py-1 flex items-center gap-1.5 ${activeView === 'dashboard' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            Dashboard
            {user.streakDays > 0 && (
              <span className="bg-amber-100 text-amber-900 text-xs px-2 py-0.5 rounded-full flex items-center gap-0.5 font-bold">
                <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                {user.streakDays}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveView('ai-coach')}
            className={`transition-colors py-1 flex items-center gap-1 ${activeView === 'ai-coach' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Compass className="w-4 h-4 text-[#0B6B53]" />
            Inner Peace Guide
          </button>
        </nav>

        {/* Right Action CTAs & Profile */}
        <div className="flex items-center gap-1 sm:gap-2.5 shrink-0">
          
          {user.completedDays.length >= 5 && (
            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-xs font-bold hover:bg-amber-100 transition-colors shadow-sm"
            >
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>Certificate</span>
            </button>
          )}

          <button
            onClick={() => setActiveView('upgrade')}
            className="flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3.5 py-1 sm:py-1.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold rounded-full text-[10px] sm:text-xs hover:brightness-105 transition-all shadow-md shadow-amber-500/20"
          >
            <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-slate-950" />
            <span className="hidden sm:inline uppercase tracking-wider text-[11px]">MindForge 360°™</span>
            <span className="sm:hidden text-[10px]">Upgrade</span>
          </button>

          {!user.registered ? (
            <button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full border border-emerald-900 text-emerald-900 text-[10px] sm:text-xs font-bold uppercase tracking-wider hover:bg-emerald-50 transition-colors shadow-sm whitespace-nowrap"
            >
              Start Free
            </button>
          ) : (
            <button
              onClick={() => setActiveView('profile')}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 border-[#0B6B53] overflow-hidden hover:opacity-90 transition-opacity shrink-0"
              title="Profile & Settings"
            >
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          )}

          <button
            onClick={() => setIsAdminModalOpen(true)}
            className="p-1.5 text-slate-400 hover:text-emerald-900 transition-colors rounded-full hover:bg-emerald-50 hidden lg:block"
            title="Admin Portal"
          >
            <ShieldCheck className="w-5 h-5" />
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 sm:p-2 text-emerald-900 hover:bg-emerald-50 rounded-full shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 text-sm">
          <button
            onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700"
          >
            Home
          </button>
          <button
            onClick={() => { setActiveView('inner-shift'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-semibold text-[#0B6B53]"
          >
            Inner Shift
          </button>
          <button
            onClick={() => { setActiveView('inner-revolution'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-semibold text-[#0B6B53]"
          >
            Inner Revolution
          </button>
          <button
            onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between"
          >
            <span>Dashboard</span>
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold">
              Streak: {user.streakDays}d
            </span>
          </button>
          <button
            onClick={() => { setActiveView('profile'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
          >
            <User className="w-4 h-4 text-[#0B6B53]" />
            Profile & Settings
          </button>
          <button
            onClick={() => { setActiveView('ai-coach'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2"
          >
            <Compass className="w-4 h-4 text-[#0B6B53]" />
            Inner Peace Guide
          </button>
          <button
            onClick={() => { setIsAdminModalOpen(true); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-500 text-xs flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4" />
            Admin Panel
          </button>
        </div>
      )}
    </header>
  );
};
