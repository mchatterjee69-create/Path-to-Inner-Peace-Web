import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Home, 
  Sun, 
  Zap, 
  LayoutDashboard, 
  User, 
  Compass,
  Crown
} from 'lucide-react';
import { ActiveView } from '../../types';

export const MobileBottomNav: React.FC = () => {
  const { user, activeView, setActiveView, setIsRegistrationModalOpen } = useApp();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Auto-hide bottom nav slightly when scrolling fast down, show immediately on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 150 && currentScrollY > lastScrollY + 20) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY - 10 || currentScrollY < 100) {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navItems: { id: ActiveView; label: string; icon: React.ComponentType<{ className?: string }>; badge?: string }[] = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'inner-shift', label: 'Shift', icon: Sun },
    { id: 'inner-revolution', label: 'Revolution', icon: Zap },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, badge: user.streakDays > 0 ? `${user.streakDays}d` : undefined },
    { id: 'profile', label: 'Member', icon: User }
  ];

  return (
    <nav 
      aria-label="Mobile Navigation Bar"
      className={`fixed bottom-0 left-0 right-0 z-40 lg:hidden transition-all duration-300 transform ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
      } bg-white/95 backdrop-blur-xl border-t border-emerald-900/10 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-1 px-2`}
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'dashboard' && !user.registered) {
                  setIsRegistrationModalOpen(true);
                } else {
                  setActiveView(item.id);
                }
              }}
              className={`relative flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all duration-150 active:scale-90 ${
                isActive 
                  ? 'text-[#0B6B53] font-bold' 
                  : 'text-slate-500 hover:text-emerald-900 font-medium'
              }`}
            >
              {/* Active Indicator Pip */}
              {isActive && (
                <span className="absolute top-0.5 w-1 h-1 rounded-full bg-[#0B6B53]" />
              )}

              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform duration-200 ${isActive ? 'scale-110 text-[#0B6B53]' : 'text-slate-500'}`} />
                {item.badge && (
                  <span className="absolute -top-1 -right-2 bg-amber-500 text-slate-950 font-black text-[9px] px-1 py-0.2 rounded-full shadow-xs">
                    {item.badge}
                  </span>
                )}
              </div>

              <span className={`text-[10px] tracking-tight leading-tight mt-0.5 whitespace-nowrap ${isActive ? 'text-[#0B6B53] font-bold' : 'text-slate-600'}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};
