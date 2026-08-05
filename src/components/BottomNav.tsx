import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Home, 
  Sparkles,
  LayoutDashboard, 
  Wind, 
  Radio, 
  Headphones, 
  User 
} from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { activeView, setActiveView } = useApp();

  const navItems = [
    { id: 'landing', label: 'Home', icon: Home },
    { id: 'inner-shift', label: 'Inner Shift', icon: Sparkles },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'profile', label: 'Profile', icon: User },
  ] as const;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200 px-2 py-1.5 shadow-lg">
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition-all ${
                isActive 
                  ? 'text-[#0B6B53] font-bold scale-105' 
                  : 'text-slate-400 hover:text-slate-600 font-medium'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
              <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
