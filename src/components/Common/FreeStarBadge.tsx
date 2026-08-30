import React from 'react';

interface FreeStarBadgeProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const FreeStarBadge: React.FC<FreeStarBadgeProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const sizeClasses = {
    sm: 'w-16 sm:w-18 h-8 sm:h-9 -top-2.5 sm:-top-3 -left-3 sm:-left-4',
    md: 'w-20 sm:w-24 h-9.5 sm:h-11 -top-3.5 sm:-top-4 -left-4 sm:-left-5.5',
    lg: 'w-24 sm:w-28 h-11 sm:h-13 -top-4 sm:-top-5 -left-5 sm:-left-6.5'
  };

  return (
    <div 
      className={`absolute z-30 pointer-events-none select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.55)] transform -rotate-12 transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-8 ${sizeClasses[size]} ${className}`}
      title="100% Free"
    >
      <svg 
        viewBox="0 0 130 52" 
        className="w-full h-full overflow-visible"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Main Crimson / Ruby Satin Ribbon Gradient */}
          <linearGradient id="rubyBentRibbonGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#991B1B" />
            <stop offset="25%" stopColor="#DC2626" />
            <stop offset="55%" stopColor="#EF4444" />
            <stop offset="80%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#7F1D1D" />
          </linearGradient>

          {/* Underfold Dark Shadow Gradient */}
          <linearGradient id="bentUnderfoldDark" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#450A0A" />
            <stop offset="100%" stopColor="#1E0505" />
          </linearGradient>

          {/* Metallic Gold Trim Gradient */}
          <linearGradient id="bentGoldTrimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="65%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Ribbon Drop Shadow */}
          <filter id="bentRibbonShadow" x="-20%" y="-20%" width="140%" height="150%">
            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.6" />
          </filter>

          {/* Text Baseline Curved Path for Curved "FREE" Typography */}
          <path id="freeArcPath" d="M 24,31.5 Q 65,22.5 106,31.5" />
          <path id="freeArcShadowPath" d="M 24,33 Q 65,24 106,33" />
        </defs>

        <g filter="url(#bentRibbonShadow)">
          {/* --- LEFT RIBBON TAIL & UNDERFOLD (BENT DOWNWARD) --- */}
          {/* Left Ribbon Tail */}
          <path
            d="M 22,20 
               L 6,24 
               L 12,34 
               L 5,44 
               L 22,38 Z"
            fill="url(#rubyBentRibbonGrad)"
            stroke="url(#bentGoldTrimGrad)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Left Underfold Dark Shadow Wedge */}
          <polygon
            points="20,20 25,12 25,20"
            fill="url(#bentUnderfoldDark)"
          />
          <polygon
            points="20,38 25,44 25,38"
            fill="url(#bentUnderfoldDark)"
          />

          {/* --- RIGHT RIBBON TAIL & UNDERFOLD (BENT DOWNWARD) --- */}
          {/* Right Ribbon Tail */}
          <path
            d="M 108,20 
               L 124,24 
               L 118,34 
               L 125,44 
               L 108,38 Z"
            fill="url(#rubyBentRibbonGrad)"
            stroke="url(#bentGoldTrimGrad)"
            strokeWidth="1"
            strokeLinejoin="round"
          />
          {/* Right Underfold Dark Shadow Wedge */}
          <polygon
            points="110,20 105,12 105,20"
            fill="url(#bentUnderfoldDark)"
          />
          <polygon
            points="110,38 105,44 105,38"
            fill="url(#bentUnderfoldDark)"
          />

          {/* --- MAIN ARCHED / BENT RED RIBBON BAR --- */}
          <path
            d="M 20,16 
               Q 65,7 110,16 
               C 113,16.8 114,18.5 113.5,21 
               L 110,42 
               C 109.5,44 107.5,44.8 105,44.2 
               Q 65,35 25,44.2 
               C 22.5,44.8 20.5,44 20,42 
               L 16.5,21 
               C 16,18.5 17,16.8 20,16 Z"
            fill="url(#rubyBentRibbonGrad)"
            stroke="url(#bentGoldTrimGrad)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />

          {/* Inner Arched Gold Pinstripe */}
          <path
            d="M 22,18.5 
               Q 65,10 108,18.5 
               L 105,39.5 
               Q 65,31 25,39.5 Z"
            fill="none"
            stroke="#FEF08A"
            strokeWidth="0.75"
            strokeOpacity="0.8"
            strokeLinejoin="round"
          />

          {/* Top Half Arched Specular Glaze */}
          <path
            d="M 21,18 
               Q 65,9.5 109,18 
               L 108,25 
               Q 65,16.5 22,25 Z"
            fill="#FFFFFF"
            fillOpacity="0.22"
          />
        </g>

        {/* --- CURVED / BENT "FREE" TYPOGRAPHY FOLLOWING ARC PATH --- */}
        {/* Drop Shadow along Arc */}
        <text
          fill="#380505"
          fontSize="17"
          fontWeight="900"
          fontFamily="'Montserrat', 'Poppins', -apple-system, sans-serif"
          letterSpacing="0.16em"
        >
          <textPath href="#freeArcShadowPath" startOffset="50%" textAnchor="middle">
            FREE
          </textPath>
        </text>

        {/* Mid 3D Extrusion along Arc */}
        <text
          fill="#7F1D1D"
          fontSize="17"
          fontWeight="900"
          fontFamily="'Montserrat', 'Poppins', -apple-system, sans-serif"
          letterSpacing="0.16em"
        >
          <textPath href="#freeArcPath" startOffset="50%" textAnchor="middle">
            FREE
          </textPath>
        </text>

        {/* Crisp Pure White Foreground along Arc */}
        <text
          fill="#FFFFFF"
          stroke="#FFFFFF"
          strokeWidth="0.35"
          fontSize="17"
          fontWeight="900"
          fontFamily="'Montserrat', 'Poppins', -apple-system, sans-serif"
          letterSpacing="0.16em"
          style={{
            filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.5))'
          }}
        >
          <textPath href="#freeArcPath" startOffset="50%" textAnchor="middle">
            FREE
          </textPath>
        </text>
      </svg>
    </div>
  );
};
