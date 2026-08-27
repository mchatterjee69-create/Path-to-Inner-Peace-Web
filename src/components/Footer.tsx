import React from 'react';
import { useApp } from '../context/AppContext';
import { FOUNDER_INFO } from '../data/mockData';
import logoImg from '../assets/images/inner_peace_logo_1785607496327.jpg';
import { SocialMediaFooter } from './SocialMediaFooter';
import { 
  Mail, 
  Globe, 
  MessageCircle, 
  Crown
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { setActiveView } = useApp();

  return (
    <footer id="main-footer" className="bg-[#093d30] text-slate-200 border-t border-emerald-900 pt-12 pb-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Brand Column */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <img 
              src={logoImg} 
              alt="Path to Inner Peace Logo" 
              className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/40 shadow-inner bg-white shrink-0"
              referrerPolicy="no-referrer"
            />
            <div>
              <span className="font-heading font-bold text-xl text-white tracking-tight block">
                Path to Inner Peace
              </span>
              <span className="text-xs text-[#D4AF37] font-semibold tracking-wider">
                MindForge 360°™ Ecosystem
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed max-w-sm">
            Science-backed mindfulness, CBT cognitive reframing, and emotional mastery designed for modern lives.
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          {/* Social Media Footer Icons centered horizontally strictly before Quick Navigation */}
          <SocialMediaFooter />

          <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase mb-4 text-[#D4AF37]">
            Quick Navigation
          </h4>
          <ul className="space-y-2 text-xs text-slate-300">
            <li>
              <button onClick={() => setActiveView('inner-shift')} className="hover:text-white transition-colors text-amber-300 font-semibold">
                Inner Shift Program
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('inner-revolution')} className="hover:text-white transition-colors text-emerald-300 font-semibold">
                Inner Revolution
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('dashboard')} className="hover:text-white transition-colors">
                Personal Dashboard
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('reflection')} className="hover:text-white transition-colors flex items-center gap-1">
                <span>Reflection Guide</span>
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('profile')} className="hover:text-white transition-colors text-amber-300 font-semibold">
                Member Access
              </button>
            </li>
            <li>
              <button onClick={() => setActiveView('upgrade')} className="hover:text-white transition-colors text-amber-300 font-semibold flex items-center gap-1">
                <Crown className="w-3 h-3 text-[#D4AF37]" />
                MindForge 360°™ Upgrade
              </button>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="font-heading font-bold text-white text-sm tracking-wider uppercase mb-4 text-[#D4AF37]">
            Contact & Support
          </h4>
          <ul className="space-y-3 text-xs text-slate-300">
            <li className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href={`https://${FOUNDER_INFO.website}`} target="_blank" rel="noreferrer" className="hover:underline">
                {FOUNDER_INFO.website}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
              <a href={`mailto:${FOUNDER_INFO.email}`} className="hover:underline">
                {FOUNDER_INFO.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <a 
                href={`https://wa.me/919163670300`} 
                target="_blank" 
                rel="noreferrer" 
                className="hover:underline"
              >
                WhatsApp: {FOUNDER_INFO.whatsapp}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar with Copyright */}
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-emerald-900/60 flex items-center justify-center text-xs text-slate-400">
        <p>© 2026 Path to Inner peace. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

