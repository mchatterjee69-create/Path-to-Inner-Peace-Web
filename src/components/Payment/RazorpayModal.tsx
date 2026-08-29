import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2,
  Crown
} from 'lucide-react';

export const RazorpayModal: React.FC = () => {
  const { 
    isPaymentModalOpen, 
    setIsPaymentModalOpen, 
    selectedPlan
  } = useApp();

  if (!isPaymentModalOpen || !selectedPlan) return null;

  const handleJoinInnerShift = () => {
    const nameLower = selectedPlan?.name?.toLowerCase() || '';
    
    let paymentLink = selectedPlan?.paymentUrl;
    if (!paymentLink) {
      if (nameLower.includes('mastery')) {
        paymentLink = 'https://rzp.io/rzp/RhBSpwpY';
      } else if (nameLower.includes('awakening')) {
        paymentLink = 'https://rzp.io/rzp/IrdqANZ3';
      } else if (nameLower.includes('mindfulness') || nameLower.includes('meditation')) {
        paymentLink = 'https://rzp.io/rzp/bCi0e0t';
      } else if (nameLower.includes('relationship')) {
        paymentLink = 'https://rzp.io/rzp/JwfVE56z';
      } else if (nameLower.includes('stress')) {
        paymentLink = 'https://rzp.io/rzp/8xw8CNzv';
      } else if (nameLower.includes('revolution')) {
        paymentLink = 'https://rzp.io/rzp/pJfkvaT';
      } else if (selectedPlan?.id === 'INNER_SHIFT' || nameLower.includes('basic')) {
        paymentLink = 'https://rzp.io/rzp/O6VyUfSW';
      } else if (selectedPlan?.id === 'INNER_TRANSFORMATION_ELITE') {
        paymentLink = 'https://rzp.io/rzp/x8BS9RM';
      } else {
        paymentLink = 'https://rzp.io/rzp/Xv7Q6XB';
      }
    }
    
    window.location.href = paymentLink;
  };

  const isOneTimePayment = 
    selectedPlan.period?.toLowerCase().includes('one-time') ||
    selectedPlan.period?.toLowerCase().includes('week') ||
    selectedPlan.period?.toLowerCase().includes('live') ||
    selectedPlan.period?.toLowerCase().includes('program') ||
    selectedPlan.period?.toLowerCase().includes('immersion') ||
    selectedPlan.period?.toLowerCase().includes('masterclass') ||
    selectedPlan.period?.toLowerCase().includes('workshop') ||
    selectedPlan.name?.toLowerCase().includes('revolution') ||
    selectedPlan.name?.toLowerCase().includes('mastery') ||
    selectedPlan.name?.toLowerCase().includes('stress') ||
    selectedPlan.name?.toLowerCase().includes('relationship') ||
    selectedPlan.name?.toLowerCase().includes('mindfulness') ||
    selectedPlan.name?.toLowerCase().includes('meditation') ||
    selectedPlan.name?.toLowerCase().includes('awakening');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-3 sm:p-4 flex items-center justify-center min-h-full animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col my-auto transition-all">
        
        {/* Header with Emerald Green & Gold Branding */}
        <div className="bg-[#0F4C45] p-5 text-white flex items-center justify-between border-b border-emerald-900/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0B3B36] border border-[#D4AF37] flex items-center justify-center font-bold text-[#D4AF37] text-xs shadow-inner shrink-0">
              <Crown className="w-5 h-5 text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-heading font-extrabold text-base text-white block">
                {selectedPlan.name}
              </span>
              <span className="text-[11px] text-emerald-200 block font-medium">
                Path to Inner Peace • MindForge 360°™
              </span>
            </div>
          </div>

          <button
            onClick={() => setIsPaymentModalOpen(false)}
            className="p-1.5 rounded-full text-emerald-200 hover:text-white hover:bg-emerald-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan Summary Badge */}
        <div className="p-4 bg-emerald-50/60 border-b border-emerald-100/80 flex items-center justify-between text-xs">
          <div>
            <span className="font-bold text-slate-900 block text-sm">{selectedPlan.name}</span>
            <span className="text-slate-500 text-[11px]">{selectedPlan.period}</span>
          </div>
          <div className="text-right whitespace-nowrap">
            <span className="font-heading font-extrabold text-2xl text-[#0F4C45]">₹{selectedPlan.priceINR}</span>
            <span className="text-xs text-emerald-800 font-bold ml-1">
              {isOneTimePayment ? ' (one-time)' : selectedPlan.period.includes('Annual') ? '/ year' : '/ month'}
            </span>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">

          {/* Premium CTA Button */}
          <button
            onClick={handleJoinInnerShift}
            className="w-full py-4 bg-[#0F4C45] hover:bg-[#0B3B36] active:scale-[0.99] text-white font-extrabold text-base sm:text-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all flex items-center justify-center gap-2 group cursor-pointer border border-[#D4AF37]/30"
          >
            <span>Join {selectedPlan.name} – ₹{selectedPlan.priceINR} {isOneTimePayment ? '(One-Time)' : ''}</span>
          </button>

          {/* Secure Payment Note */}
          <div className="text-center space-y-1 text-xs text-slate-600 font-medium">
            <div className="flex items-center justify-center gap-1.5 text-slate-800 font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#0F4C45] shrink-0" />
              <span>🔒 Secure payment powered by Razorpay.</span>
            </div>
            <p className="text-[11px] text-slate-500 max-w-xs mx-auto leading-relaxed">
              Supports UPI, Google Pay, PhonePe, Paytm, Cards and Net Banking.
            </p>
          </div>

          {/* Membership / One-time Benefits List */}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2.5 text-xs font-bold text-slate-700">
            <div className="flex items-center gap-2 text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-[#0F4C45] shrink-0" />
              <span>{isOneTimePayment ? '✔ One-Time Payment (No Recurring Fees)' : '✔ Monthly Membership'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-[#0F4C45] shrink-0" />
              <span>{isOneTimePayment ? '✔ Lifetime Access to Course & Materials' : '✔ Cancel Anytime'}</span>
            </div>
            <div className="flex items-center gap-2 text-slate-800">
              <CheckCircle2 className="w-4 h-4 text-slate-800 shrink-0" />
              <span>✔ Instant Access After Payment</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

