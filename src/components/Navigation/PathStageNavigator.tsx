import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Sun, 
  Zap, 
  Compass, 
  Home
} from 'lucide-react';

interface PathStageNavigatorProps {
  currentSection: 'inner-shift' | 'inner-revolution' | 'career-axis';
}

export const PathStageNavigator: React.FC<PathStageNavigatorProps> = ({ 
  currentSection 
}) => {
  const { setActiveView } = useApp();

  const pages = [
    {
      id: 'inner-shift',
      name: 'Inner Shift',
      icon: Sun,
    },
    {
      id: 'inner-revolution',
      name: 'Inner Revolution',
      icon: Zap,
    },
    {
      id: 'career-axis',
      name: 'Career Axis',
      icon: Compass,
    },
  ] as const;

  const navigateToPage = (pageId: 'inner-shift' | 'inner-revolution' | 'career-axis') => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveView(pageId);
  };

  return (
    <nav 
      aria-label="Path to Inner Peace Navigation"
      className="w-full bg-[#FAF9F6] border-b border-slate-200 py-3.5 px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8 sticky top-16 sm:top-20 z-30 shadow-xs backdrop-blur-md bg-[#FAF9F6]/95"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
        
        {/* 3 Serially Linked Section Buttons */}
        <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-center sm:justify-start">
          {pages.map((page) => {
            const isActive = currentSection === page.id;
            const Icon = page.icon;

            return (
              <button
                key={page.id}
                id={`nav-link-${page.id}`}
                onClick={() => navigateToPage(page.id)}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#062C22] text-[#D4AF37] border border-[#D4AF37]/60 shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200/90 shadow-2xs hover:text-[#0B6B53]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isActive ? 'text-[#D4AF37]' : 'text-slate-500'}`} />
                <span>{page.name}</span>
              </button>
            );
          })}
        </div>

        {/* Back to Home Link */}
        <div className="flex items-center gap-2">
          <button
            id="nav-back-home"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setActiveView('landing');
            }}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-[#0B6B53] px-3 py-1.5 rounded-lg hover:bg-slate-200/60 transition-colors cursor-pointer"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </button>
        </div>

      </div>
    </nav>
  );
};
