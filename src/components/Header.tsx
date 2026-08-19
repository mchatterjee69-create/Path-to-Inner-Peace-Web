import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import logoImg from '../assets/images/inner_peace_logo_1785607496327.jpg';
import { 
  Home,
  Sun,
  Zap,
  LayoutDashboard,
  User, 
  Crown, 
  Award, 
  Flame, 
  Compass,
  Menu,
  X,
  Database
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    user, 
    activeView, 
    setActiveView, 
    setIsRegistrationModalOpen,
    setIsCertificateModalOpen,
    setIsAdminLeadsModalOpen
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-sm transition-all w-full">
      <div className="max-w-[1600px] mx-auto px-2 sm:px-3 lg:px-4 h-16 sm:h-20 flex items-center justify-between gap-1 lg:gap-2">
        
        {/* Brand Logo & Name */}
        <div 
          onClick={() => setActiveView('landing')} 
          className="flex items-center gap-1.5 sm:gap-2 cursor-pointer group shrink-0"
        >
          <div className="w-8 h-8 sm:w-9 sm:h-9 xl:w-10 xl:h-10 rounded-full overflow-hidden border border-[#D4AF37] shadow-xs bg-black flex items-center justify-center shrink-0">
            <img 
              src="https://cdn.corenexis.com/f/J29m8uBQ4qF.jpeg" 
              alt="Path to Inner Peace Logo" 
              className="w-full h-full object-cover scale-[1.18] rounded-full group-hover:scale-125 transition-transform"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-poppins font-bold text-xs xl:text-sm 2xl:text-base text-[#0B6B53] tracking-tight whitespace-nowrap leading-tight">
              Path to Inner Peace
            </span>
            <span className="text-[8px] xl:text-[9px] font-semibold gold-text tracking-normal whitespace-nowrap leading-none mt-0.5">
              Transform Your Mind, Elevate Your Life
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links - Single Row */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 2xl:gap-3 font-inter text-[10px] xl:text-[11px] 2xl:text-xs font-medium text-emerald-900/90 whitespace-nowrap shrink min-w-0">
          <button
            onClick={() => setActiveView('landing')}
            className={`transition-colors py-1 px-1 xl:px-1.5 flex items-center gap-0.5 xl:gap-1 whitespace-nowrap ${activeView === 'landing' ? 'text-emerald-950 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Home className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Home</span>
          </button>

          <button
            onClick={() => setActiveView('inner-shift')}
            className={`transition-colors py-1 px-1 xl:px-1.5 flex items-center gap-0.5 xl:gap-1 whitespace-nowrap ${activeView === 'inner-shift' ? 'text-emerald-950 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Sun className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Shift</span>
          </button>

          <button
            onClick={() => setActiveView('inner-revolution')}
            className={`transition-colors py-1 px-1 xl:px-1.5 flex items-center gap-0.5 xl:gap-1 whitespace-nowrap ${activeView === 'inner-revolution' ? 'text-emerald-950 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Zap className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Revolution</span>
          </button>

          <button
            onClick={() => setActiveView('career-axis')}
            className={`transition-colors py-1 px-1 xl:px-1.5 flex items-center gap-0.5 xl:gap-1 whitespace-nowrap ${activeView === 'career-axis' ? 'text-emerald-950 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Compass className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Career Axis</span>
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className={`transition-colors py-1 px-1 xl:px-1.5 flex items-center gap-0.5 xl:gap-1 whitespace-nowrap ${activeView === 'dashboard' ? 'text-emerald-950 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <LayoutDashboard className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Dashboard</span>
            {user.streakDays > 0 && (
              <span className="bg-amber-100 text-amber-900 text-[9px] xl:text-[10px] px-1 py-0.2 rounded-full flex items-center gap-0.5 font-bold shrink-0">
                <Flame className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
                {user.streakDays}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveView('ai-coach')}
            className={`transition-colors py-1 px-1 xl:px-1.5 flex items-center gap-0.5 xl:gap-1 whitespace-nowrap ${activeView === 'ai-coach' ? 'text-emerald-950 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Compass className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Peace Guide</span>
          </button>

          <button
            onClick={() => setActiveView('profile')}
            className={`transition-colors py-1 px-1 xl:px-1.5 flex items-center gap-0.5 xl:gap-1 whitespace-nowrap ${activeView === 'profile' ? 'text-emerald-950 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <User className="w-3 h-3 xl:w-3.5 xl:h-3.5 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Member Access</span>
          </button>
        </nav>

        {/* Right Action CTAs & Profile */}
        <div className="flex items-center gap-1 sm:gap-1.5 xl:gap-2 shrink-0">
          
          {user.completedDays.length >= 5 && (
            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="hidden 2xl:flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-[10px] font-bold hover:bg-amber-100 transition-colors shadow-sm shrink-0 whitespace-nowrap"
            >
              <Award className="w-3 h-3 text-[#D4AF37]" />
              <span>Certificate</span>
            </button>
          )}

          <button
            onClick={() => setIsAdminLeadsModalOpen(true)}
            className="flex items-center gap-1 px-2 py-1 bg-emerald-50 text-[#0B6B53] border border-emerald-300 rounded-full text-[10px] xl:text-[11px] font-bold hover:bg-emerald-100 transition-colors shadow-sm shrink-0 whitespace-nowrap"
            title="Admin Leads Portal (mchatterjee69@gmail.com)"
          >
            <Database className="w-3.5 h-3.5 text-[#0B6B53]" />
            <span className="hidden xl:inline">Admin Leads</span>
          </button>

          <button
            onClick={() => setActiveView('upgrade')}
            className="flex items-center gap-1 px-2 xl:px-2.5 py-1 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold rounded-full text-[10px] xl:text-[11px] hover:brightness-105 transition-all shadow-md shadow-amber-500/20 shrink-0 whitespace-nowrap"
          >
            <Crown className="w-3 h-3 fill-slate-950 shrink-0" />
            <span className="hidden sm:inline uppercase tracking-wider text-[10px] xl:text-[11px] whitespace-nowrap">MindForge 360°™</span>
            <span className="sm:hidden text-[10px]">Upgrade</span>
          </button>

          {!user.registered ? (
            <button
              onClick={() => setIsRegistrationModalOpen(true)}
              className="px-2.5 xl:px-3 py-1 rounded-full border border-emerald-900 bg-emerald-900 text-white hover:bg-emerald-800 text-[10px] xl:text-xs font-bold uppercase tracking-wider transition-colors shadow-sm whitespace-nowrap shrink-0"
            >
              Start Free
            </button>
          ) : (
            <button
              onClick={() => setActiveView('profile')}
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-[#0B6B53] overflow-hidden hover:opacity-90 transition-opacity shrink-0"
              title="Member Access"
            >
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </button>
          )}

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 text-emerald-900 hover:bg-emerald-50 rounded-full shrink-0 flex items-center justify-center ml-0.5"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-slate-200 px-4 pt-2 pb-4 space-y-1.5 text-sm">
          <button
            onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeView === 'landing' ? 'bg-emerald-50 text-[#0B6B53] font-bold' : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Home className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Home</span>
          </button>
          <button
            onClick={() => { setActiveView('inner-shift'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeView === 'inner-shift' ? 'bg-emerald-50 text-[#0B6B53] font-bold' : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Sun className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Shift</span>
          </button>
          <button
            onClick={() => { setActiveView('inner-revolution'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeView === 'inner-revolution' ? 'bg-emerald-50 text-[#0B6B53] font-bold' : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Zap className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Revolution</span>
          </button>
          <button
            onClick={() => { setActiveView('career-axis'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeView === 'career-axis' ? 'bg-emerald-50 text-[#0B6B53] font-bold' : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Compass className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Career Axis</span>
          </button>
          <button
            onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center justify-between whitespace-nowrap transition-colors ${
              activeView === 'dashboard' ? 'bg-emerald-50 text-[#0B6B53] font-bold' : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <div className="flex items-center gap-2 whitespace-nowrap">
              <LayoutDashboard className="w-4 h-4 text-[#0B6B53] shrink-0" />
              <span className="whitespace-nowrap">Dashboard</span>
            </div>
            <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full font-bold whitespace-nowrap">
              Streak: {user.streakDays}d
            </span>
          </button>
          <button
            onClick={() => { setActiveView('ai-coach'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeView === 'ai-coach' ? 'bg-emerald-50 text-[#0B6B53] font-bold' : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <Compass className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Peace Guide</span>
          </button>
          <button
            onClick={() => { setActiveView('profile'); setMobileMenuOpen(false); }}
            className={`w-full text-left px-3 py-2 rounded-lg font-medium flex items-center gap-2 whitespace-nowrap transition-colors ${
              activeView === 'profile' ? 'bg-emerald-50 text-[#0B6B53] font-bold' : 'hover:bg-slate-50 text-slate-700'
            }`}
          >
            <User className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Member Access</span>
          </button>
        </div>
      )}
    </header>
  );
};
