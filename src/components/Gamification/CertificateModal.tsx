import React, { useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { FOUNDER_INFO } from '../../data/mockData';
import { X, Award, Download, Share2, Sun, CheckCircle2, ShieldCheck, Printer } from 'lucide-react';

export const CertificateModal: React.FC = () => {
  const { isCertificateModalOpen, setIsCertificateModalOpen, user } = useApp();
  const certRef = useRef<HTMLDivElement>(null);

  if (!isCertificateModalOpen) return null;

  const completionDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const [copiedToast, setCopiedToast] = React.useState(false);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My Path to Inner Peace Certificate',
        text: `I completed the 5-Day Mind Reset Challenge with Mainak Chatterjee!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#D4AF37] my-8">
        
        {/* Top Control Bar */}
        <div className="bg-[#064E3B] p-4 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-2 text-xs font-bold text-[#D4AF37]">
            <Award className="w-4 h-4" />
            <span>OFFICIAL MINDFORGE 360°™ CERTIFICATE</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={handleShare}
              className="p-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
              title="Share"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => setIsCertificateModalOpen(false)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Printable Body */}
        <div ref={certRef} className="p-8 sm:p-12 bg-[#FAF9F6] text-slate-900 text-center space-y-6 relative border-8 border-emerald-900/10 m-2 rounded-2xl">
          
          {/* Watermark Logo */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
            <Sun className="w-96 h-96 text-[#0B6B53]" />
          </div>

          {/* Header Seal */}
          <div className="w-16 h-16 mx-auto rounded-full bg-[#0B6B53] text-[#D4AF37] border-2 border-[#D4AF37] flex items-center justify-center shadow-md">
            <Award className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="font-heading font-bold text-xs uppercase tracking-widest text-[#0B6B53]">
              PATH TO INNER PEACE • MINDFORGE 360°™
            </span>
            <h2 className="font-serif font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
              Certificate of Completion
            </h2>
            <p className="text-xs text-slate-500 italic">
              This is to officially certify that
            </p>
          </div>

          {/* User Name */}
          <div className="py-2 border-b-2 border-[#D4AF37] max-w-md mx-auto">
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#0B6B53]">
              {user.name || 'Seeker'}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-slate-700 max-w-xl mx-auto leading-relaxed">
            has successfully completed the <strong>5-Day 30-Minute Mind Reset Challenge</strong>, demonstrating exceptional commitment to nervous system regulation, CBT thought awareness, somatic breathwork, and emotional healing.
          </p>

          {/* Footer Metadata & Signatures */}
          <div className="pt-8 border-t border-slate-200 grid grid-cols-2 sm:grid-cols-3 gap-6 items-center text-xs">
            
            <div className="text-left space-y-0.5">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Issued Date</span>
              <span className="font-bold text-slate-900">{completionDate}</span>
              <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                Verified Credential
              </span>
            </div>

            {/* QR Code Graphic */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 bg-white border border-slate-300 p-1 rounded-lg shadow-sm flex items-center justify-center">
                <div className="grid grid-cols-3 gap-1 w-full h-full bg-slate-900 p-1 rounded">
                  <div className="bg-[#D4AF37] rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-[#D4AF37] rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-[#0B6B53] rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-[#D4AF37] rounded-sm" />
                  <div className="bg-white rounded-sm" />
                  <div className="bg-[#D4AF37] rounded-sm" />
                </div>
              </div>
              <span className="text-[9px] text-slate-400 font-mono mt-1">ID: PIP-{user.id.slice(-6)}</span>
            </div>

            {/* Signature */}
            <div className="text-right space-y-0.5 col-span-2 sm:col-span-1">
              <span className="font-serif italic font-bold text-lg text-[#0B6B53] block">
                {FOUNDER_INFO.name}
              </span>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">
                Psycho-Spiritual Coach & Founder
              </span>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
