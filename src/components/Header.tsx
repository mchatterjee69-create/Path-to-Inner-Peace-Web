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
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    user, 
    activeView, 
    setActiveView, 
    setIsRegistrationModalOpen,
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
        <nav className="hidden xl:flex items-center gap-3.5 xl:gap-5 font-inter text-xs xl:text-sm font-medium text-emerald-900/70 whitespace-nowrap">
          <button
            onClick={() => setActiveView('landing')}
            className={`transition-colors py-1 flex items-center gap-1.5 whitespace-nowrap ${activeView === 'landing' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Home className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Home</span>
          </button>
          
          <button
            onClick={() => setActiveView('inner-shift')}
            className={`transition-colors py-1 flex items-center gap-1.5 whitespace-nowrap ${activeView === 'inner-shift' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Sun className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Shift</span>
          </button>

          <button
            onClick={() => setActiveView('inner-revolution')}
            className={`transition-colors py-1 flex items-center gap-1.5 whitespace-nowrap ${activeView === 'inner-revolution' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Zap className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Revolution</span>
          </button>

          <button
            onClick={() => setActiveView('career-axis')}
            className={`transition-colors py-1 flex items-center gap-1.5 whitespace-nowrap ${activeView === 'career-axis' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Compass className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Career Axis</span>
          </button>

          <button
            onClick={() => setActiveView('dashboard')}
            className={`transition-colors py-1 flex items-center gap-1.5 whitespace-nowrap ${activeView === 'dashboard' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <LayoutDashboard className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Dashboard</span>
            {user.streakDays > 0 && (
              <span className="bg-amber-100 text-amber-900 text-xs px-2 py-0.5 rounded-full flex items-center gap-0.5 font-bold shrink-0">
                <Flame className="w-3 h-3 text-amber-600 fill-amber-500" />
                {user.streakDays}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveView('ai-coach')}
            className={`transition-colors py-1 flex items-center gap-1.5 whitespace-nowrap ${activeView === 'ai-coach' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <Compass className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Peace Guide</span>
          </button>

          <button
            onClick={() => setActiveView('profile')}
            className={`transition-colors py-1 flex items-center gap-1.5 whitespace-nowrap ${activeView === 'profile' ? 'text-emerald-900 font-bold border-b-2 border-[#0B6B53]' : 'hover:text-emerald-950'}`}
          >
            <User className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Member Access</span>
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
            className="xl:hidden p-1.5 sm:p-2 text-emerald-900 hover:bg-emerald-50 rounded-full shrink-0 flex items-center justify-center"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-4 space-y-2 text-sm">
          <button
            onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2 whitespace-nowrap"
          >
            <Home className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Home</span>
          </button>
          <button
            onClick={() => { setActiveView('inner-shift'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-semibold text-[#0B6B53] flex items-center gap-2 whitespace-nowrap"
          >
            <Sun className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Shift</span>
          </button>
          <button
            onClick={() => { setActiveView('inner-revolution'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-semibold text-[#0B6B53] flex items-center gap-2 whitespace-nowrap"
          >
            <Zap className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Revolution</span>
          </button>
          <button
            onClick={() => { setActiveView('career-axis'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-semibold text-[#0B6B53] flex items-center gap-2 whitespace-nowrap"
          >
            <Compass className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Career Axis</span>
          </button>
          <button
            onClick={() => { setActiveView('dashboard'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center justify-between whitespace-nowrap"
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
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2 whitespace-nowrap"
          >
            <Compass className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Inner Peace Guide</span>
          </button>
          <button
            onClick={() => { setActiveView('profile'); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-50 font-medium text-slate-700 flex items-center gap-2 whitespace-nowrap"
          >
            <User className="w-4 h-4 text-[#0B6B53] shrink-0" />
            <span className="whitespace-nowrap">Member Access</span>
          </button>
        </div>
      )}
    </header>
  );
};
