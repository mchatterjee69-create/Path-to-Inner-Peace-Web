import React from 'react';
import { BadgeCheck } from 'lucide-react';

interface FreeStarBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FreeStarBadge: React.FC<FreeStarBadgeProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeConfig = {
    sm: {
      wrapper: '-top-2.5 left-2.5 sm:left-3',
      badge: 'px-2 py-0.5 text-[8.5px] sm:text-[9px] gap-1',
      icon: 'w-2.5 h-2.5',
    },
    md: {
      wrapper: '-top-3 sm:-top-3.5 left-2.5 sm:left-4',
      badge: 'px-2.5 sm:px-3 py-0.5 sm:py-1 text-[9.5px] sm:text-[10.5px] gap-1.5',
      icon: 'w-3 h-3',
    },
    lg: {
      wrapper: '-top-3.5 sm:-top-4 left-3 sm:left-5',
      badge: 'px-3 sm:px-3.5 py-1 text-[10.5px] sm:text-xs gap-1.5',
      icon: 'w-3.5 h-3.5',
    }
  };

  const config = sizeConfig[size];

  return (
    <div 
      className={`absolute z-30 pointer-events-none select-none ${config.wrapper} ${className}`}
      title="Complimentary Executive Enrollment"
    >
      <div className={`inline-flex items-center justify-center font-sans font-bold tracking-wider uppercase text-white rounded-full bg-slate-950/95 backdrop-blur-md border border-[#D4AF37]/80 shadow-[0_4px_14px_rgba(0,0,0,0.5),0_0_10px_rgba(212,175,55,0.25)] transition-all duration-300 group-hover:scale-105 group-hover:border-amber-300 group-hover:shadow-[0_4px_18px_rgba(212,175,55,0.4)] ${config.badge}`}>
        {/* Subtle Specular Top Sheen */}
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent rounded-t-full pointer-events-none" />
        
        {/* Executive Verified / Authority Badge Icon */}
        <BadgeCheck className={`${config.icon} text-amber-400 fill-amber-400/20 shrink-0`} />
        
        {/* Professional Corporate Typography */}
        <span className="relative z-10 text-amber-200 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] font-bold tracking-wider">
          Free
        </span>
      </div>
    </div>
  );
};
