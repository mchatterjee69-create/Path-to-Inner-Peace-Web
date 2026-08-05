import React, { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Sun, ShieldCheck, ArrowRight, Crown, BookOpen, HeartHandshake } from 'lucide-react';

export const SuccessView: React.FC = () => {
  const { user, selectedPlan, setActiveView, triggerConfetti } = useApp();

  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-emerald-950 via-[#093D30] to-slate-950 text-white py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-xl w-full bg-slate-900/90 backdrop-blur-xl rounded-3xl p-6 sm:p-10 border-2 border-[#D4AF37] shadow-2xl space-y-8 text-center animate-fadeIn my-auto">
        
        {/* Success Icon Badge */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#D4AF37] via-amber-400 to-yellow-500 flex items-center justify-center mx-auto shadow-xl shadow-amber-500/20 animate-pulse">
            <CheckCircle2 className="w-14 h-14 text-slate-950 stroke-[2.5]" />
          </div>
          <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full border-2 border-slate-900 shadow-md">
            <Sun className="w-5 h-5" />
          </div>
        </div>

        {/* Header Text */}
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/50 text-[#FFE885] text-xs font-bold uppercase tracking-wider">
            <Crown className="w-4 h-4 text-[#FFE885]" />
            <span>PAYMENT VERIFIED & CONFIRMED</span>
          </div>

          <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
            🎉 Welcome to {selectedPlan?.name || 'Basic Shift'}!
          </h1>
          <p className="text-emerald-100/90 text-base max-w-md mx-auto leading-relaxed font-semibold">
            Your subscription is now active.
          </p>
        </div>

        {/* Transaction Summary Card */}
        <div className="bg-slate-800/80 rounded-2xl p-5 border border-slate-700/80 text-left space-y-3 text-xs">
          <div className="flex justify-between items-center pb-2 border-b border-slate-700">
            <span className="text-slate-400">Merchant</span>
            <span className="font-bold text-white">Path to Inner Peace</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-700">
            <span className="text-slate-400">Plan Activated</span>
            <span className="font-extrabold text-[#FFE885]">{selectedPlan?.name || 'MIND MASTERY PRO'}</span>
          </div>
          <div className="flex justify-between items-center pb-2 border-b border-slate-700">
            <span className="text-slate-400">Amount Paid</span>
            <span className="font-extrabold text-white text-sm">₹{selectedPlan?.priceINR || 499}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Gateway Link</span>
            <span className="text-emerald-300 font-mono text-[11px]">https://razorpay.me/@pathtoinnerpeace</span>
          </div>
        </div>

        {/* Included Features Reminder */}
        <div className="bg-emerald-950/60 p-4 rounded-2xl border border-emerald-700/50 text-left space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FFE885]">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Your Premium Benefits Are Unlocked</span>
          </div>
          <ul className="text-xs text-emerald-100/80 space-y-1.5 pl-6 list-disc">
            <li>Unlimited access to 50+ guided meditation audio tracks</li>
            <li>24/7 Personal Reflection Guide & Stress Toolkit</li>
            <li>Monthly live masterclasses with Mainak Chatterjee</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={() => {
              setActiveView('dashboard');
              window.history.pushState({}, '', '/');
            }}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-yellow-500 text-slate-950 font-extrabold text-sm shadow-xl hover:brightness-110 transition-all flex items-center justify-center gap-2"
          >
            <span>Go to Premium Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              setActiveView('challenge');
              window.history.pushState({}, '', '/');
            }}
            className="w-full py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2"
          >
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Start Today's 5-Day Reset Challenge</span>
          </button>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 pt-2">
          <HeartHandshake className="w-3.5 h-3.5 text-emerald-400" />
          <span>Need help? Contact support at connect@pathtoinnerpeace.in</span>
        </div>

      </div>
    </div>
  );
};
