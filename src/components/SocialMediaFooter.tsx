import React from 'react';
import { 
  Facebook, 
  Instagram, 
  Youtube, 
  Linkedin 
} from 'lucide-react';

export const SocialMediaFooter: React.FC = () => {
  const socialLinks = [
    {
      name: 'Facebook',
      icon: Facebook,
      href: 'https://facebook.com',
      hoverColor: 'hover:bg-[#1877F2]/20 hover:text-[#1877F2] hover:border-[#1877F2]/50',
      title: 'Follow Path to Inner Peace on Facebook'
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com',
      hoverColor: 'hover:bg-[#E4405F]/20 hover:text-[#E4405F] hover:border-[#E4405F]/50',
      title: 'Follow Path to Inner Peace on Instagram'
    },
    {
      name: 'YouTube',
      icon: Youtube,
      href: 'https://youtube.com',
      hoverColor: 'hover:bg-[#FF0000]/20 hover:text-[#FF0000] hover:border-[#FF0000]/50',
      title: 'Subscribe to Path to Inner Peace on YouTube'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com',
      hoverColor: 'hover:bg-[#0A66C2]/20 hover:text-[#0A66C2] hover:border-[#0A66C2]/50',
      title: 'Connect with Mainak Chatterjee on LinkedIn'
    }
  ];

  return (
    <div className="mb-5">
      <span className="text-[11px] font-semibold text-[#D4AF37] tracking-wider uppercase block mb-2.5">
        Follow Us
      </span>
      <div className="flex items-center gap-2">
        {socialLinks.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              id={`social-link-${social.name.toLowerCase()}`}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              title={social.title}
              aria-label={social.title}
              className={`w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-800/60 text-slate-300 flex items-center justify-center transition-all ${social.hoverColor} hover:scale-105 active:scale-95`}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
};

