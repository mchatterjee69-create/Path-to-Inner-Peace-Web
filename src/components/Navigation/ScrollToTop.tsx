import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Scroll to top of page"
      className="fixed bottom-18 lg:bottom-6 right-4 lg:right-6 z-30 p-2.5 sm:p-3 rounded-full bg-[#0B6B53] hover:bg-[#08523f] text-white shadow-xl shadow-emerald-950/20 border border-[#D4AF37]/50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center group"
    >
      <ArrowUp className="w-4 h-4 sm:w-5 sm:h-5 text-amber-300 group-hover:-translate-y-0.5 transition-transform" />
    </button>
  );
};
