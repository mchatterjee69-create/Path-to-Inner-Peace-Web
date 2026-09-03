import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
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
  MoreVertical,
  X,
  Sparkles,
  PhoneCall,
  MessageCircle,
  ChevronRight,
  Building2
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

  // Close mobile drawer when pressing Escape or clicking outside
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'inner-shift', label: 'Inner Shift', icon: Sun },
    { id: 'inner-revolution', label: 'Inner Revolution', icon: Zap },
    { id: 'career-axis', label: 'Career Axis', icon: Compass },
    { id: 'corporate-wellness', label: 'Corporate Wellness', icon: Building2 },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, streak: user.streakDays },
    { id: 'ai-coach', label: 'Inner Peace Guide', icon: Sparkles },
    { id: 'profile', label: 'Member Access', icon: User },
  ] as const;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-emerald-900/10 shadow-xs transition-all w-full">
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4 lg:px-6 h-16 sm:h-20 flex items-center justify-between gap-1 sm:gap-2 lg:gap-4 overflow-hidden">
          
          {/* Brand Logo & Name */}
          <div 
            onClick={() => { setActiveView('landing'); setMobileMenuOpen(false); }} 
            className="flex items-center gap-1.5 sm:gap-2.5 cursor-pointer group min-w-0 shrink"
            role="button"
            tabIndex={0}
            aria-label="Path to Inner Peace Home"
          >
            <div className="w-7 h-7 sm:w-10 sm:h-10 rounded-full overflow-hidden border border-[#D4AF37] shadow-xs bg-black flex items-center justify-center shrink-0">
              <img 
                src="https://cdn.corenexis.com/f/J29m8uBQ4qF.jpeg" 
                alt="Path to Inner Peace Logo" 
                className="w-full h-full object-cover scale-[1.18] rounded-full group-hover:scale-125 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col min-w-0 overflow-hidden">
              <span className="font-poppins font-bold text-[11px] sm:text-sm lg:text-base text-[#0B6B53] tracking-tight whitespace-nowrap leading-tight truncate">
                Path to Inner Peace
              </span>
              <span className="text-[7px] sm:text-[9.5px] font-semibold gold-text tracking-normal whitespace-nowrap leading-none mt-0.5 truncate">
                Transform Your Mind, Elevate Your Life
              </span>
            </div>
          </div>

          {/* Desktop & Laptop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 font-inter text-[10.5px] 2xl:text-xs font-medium text-emerald-900/90 whitespace-nowrap shrink min-w-0">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => setActiveView(item.id)}
                  className={`transition-all duration-150 py-1.5 px-1.5 2xl:px-2.5 rounded-lg flex items-center gap-1 2xl:gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'text-emerald-950 font-bold bg-emerald-50/80 border-b-2 border-[#0B6B53]' 
                      : 'hover:text-emerald-950 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#0B6B53]' : 'text-slate-500'}`} />
                  <span className="whitespace-nowrap">{item.label}</span>
                  {'streak' in item && typeof item.streak === 'number' && item.streak > 0 && (
                    <span className="bg-amber-100 text-amber-900 text-[9px] px-1 py-0.2 rounded-full flex items-center gap-0.5 font-bold shrink-0">
                      <Flame className="w-2.5 h-2.5 text-amber-600 fill-amber-500" />
                      {item.streak}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action CTAs & Profile */}
          <div className="flex items-center gap-1 xs:gap-1.5 sm:gap-2 shrink-0">
            
            {user.completedDays.length >= 5 && (
              <button
                onClick={() => setIsCertificateModalOpen(true)}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 bg-amber-50 text-amber-900 border border-amber-300 rounded-full text-[11px] font-bold hover:bg-amber-100 transition-colors shadow-xs shrink-0 whitespace-nowrap cursor-pointer"
              >
                <Award className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Certificate</span>
              </button>
            )}

            <button
              onClick={() => setActiveView('upgrade')}
              className="flex items-center gap-1 xs:gap-1.5 px-2 xs:px-2.5 sm:px-3 py-1.5 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold rounded-full text-[10px] sm:text-xs hover:brightness-105 active:scale-95 transition-all shadow-xs shadow-amber-500/20 shrink-0 whitespace-nowrap cursor-pointer"
            >
              <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-slate-950 shrink-0" />
              <span className="hidden sm:inline uppercase tracking-wider text-[11px] whitespace-nowrap">MindForge 360°™</span>
              <span className="sm:hidden text-[10px]">Upgrade</span>
            </button>

            {!user.registered ? (
              <button
                onClick={() => setIsRegistrationModalOpen(true)}
                className="relative btn-join-free-animated flex items-center gap-1 xs:gap-1.5 px-2.5 xs:px-3 sm:px-3.5 py-1.5 bg-gradient-to-r from-[#0B6B53] via-emerald-600 to-[#0B6B53] hover:from-emerald-600 hover:to-emerald-700 text-white font-bold rounded-full text-[10px] sm:text-xs active:scale-95 transition-all shadow-md shadow-emerald-950/20 border border-emerald-400/50 shrink-0 whitespace-nowrap cursor-pointer uppercase tracking-wider group"
              >
                <Sun className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-300 shrink-0 animate-[spin_8s_linear_infinite]" />
                <span className="relative z-10 font-bold text-amber-100 group-hover:text-white transition-colors">Join Free</span>
              </button>
            ) : (
              <button
                onClick={() => setActiveView('profile')}
                className="w-7 h-7 sm:w-9 sm:h-9 rounded-full border-2 border-[#0B6B53] overflow-hidden hover:opacity-90 transition-opacity shrink-0 cursor-pointer"
                title="Member Access"
                aria-label="View member profile"
              >
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </button>
            )}

            {/* Mobile & Tablet 3-Dots Menu Button (Hidden on Desktop & Laptop) */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden w-7 h-7 sm:w-8 sm:h-8 text-slate-800 hover:text-emerald-950 bg-slate-100 hover:bg-emerald-50 border border-slate-300 rounded-full shrink-0 flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95 z-10"
              aria-label="Toggle navigation menu"
              title="Navigation Menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-4 h-4 text-[#0B6B53]" /> : <MoreVertical className="w-4 h-4 text-slate-800" />}
            </button>
          </div>
        </div>
      </header>

      {/* Slide-over Mobile & Tablet Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 xl:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity animate-fadeIn"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Panel */}
          <div className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white shadow-2xl z-50 flex flex-col justify-between overflow-y-auto animate-slideLeft">
            
            {/* Drawer Header */}
            <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-[#D4AF37] bg-black shrink-0">
                  <img 
                    src="https://cdn.corenexis.com/f/J29m8uBQ4qF.jpeg" 
                    alt="Logo" 
                    className="w-full h-full object-cover scale-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <span className="font-poppins font-bold text-sm text-[#0B6B53] leading-tight">Path to Inner Peace</span>
                  <span className="text-[10px] sm:text-[11px] font-semibold gold-text tracking-normal leading-tight mt-0.5 whitespace-normal">
                    Transform Your Mind, Elevate Your Life
                  </span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-full hover:bg-slate-200 text-slate-600 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links */}
            <div className="p-4 space-y-1.5 flex-1">
              {navLinks.map((item) => {
                const Icon = item.icon;
                const isActive = activeView === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveView(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`w-full text-left px-3.5 py-3 rounded-xl font-medium flex items-center justify-between transition-all ${
                      isActive 
                        ? 'bg-emerald-50 text-[#0B6B53] font-bold border border-emerald-200/60' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isActive ? 'bg-[#0B6B53] text-white' : 'bg-slate-100 text-slate-600'}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                    </div>

                    {'streak' in item && typeof item.streak === 'number' && item.streak > 0 ? (
                      <span className="bg-amber-100 text-amber-900 text-xs px-2 py-0.5 rounded-full font-bold">
                        {item.streak}d streak
                      </span>
                    ) : (
                      <ChevronRight className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Drawer Footer Actions */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
              {!user.registered && (
                <button
                  onClick={() => {
                    setIsRegistrationModalOpen(true);
                    setMobileMenuOpen(false);
                  }}
                  className="relative btn-join-free-animated w-full py-3 bg-gradient-to-r from-[#0B6B53] via-emerald-600 to-[#0B6B53] text-white font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 uppercase tracking-wider group cursor-pointer border border-emerald-400/40"
                >
                  <Sun className="w-4 h-4 text-amber-300 shrink-0 animate-[spin_8s_linear_infinite]" />
                  <span className="relative z-10 font-bold text-amber-100 group-hover:text-white">Join Free - 5 Day Reset</span>
                </button>
              )}
              <button
                onClick={() => {
                  setActiveView('upgrade');
                  setMobileMenuOpen(false);
                }}
                className="w-full py-3 bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-bold text-xs rounded-xl shadow-md flex items-center justify-center gap-2 cursor-pointer hover:brightness-105 transition-all"
              >
                <Crown className="w-4 h-4 fill-slate-950" />
                <span>Upgrade to MindForge 360°™</span>
              </button>

              <div className="flex items-center justify-center gap-4 pt-2 text-xs text-slate-500">
                <a 
                  href="https://wa.me/919163670300" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-emerald-700"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>WhatsApp Support</span>
                </a>
              </div>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
