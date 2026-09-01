import React from 'react';
import { useApp } from '../../context/AppContext';
import { PRICING_PLANS } from '../../data/mockData';
import { PricingPlan } from '../../types';
import { 
  Crown, 
  Check 
} from 'lucide-react';
import { HolisticWellnessSection } from '../Landing/HolisticWellnessSection';
import { DropUsALineSection } from '../Landing/DropUsALineSection';

export const MindForgeUpgrade: React.FC = () => {
  const { user, setSelectedPlan, setIsPaymentModalOpen } = useApp();

  const handleSelectPlan = (plan: PricingPlan) => {
    setSelectedPlan(plan);
    setIsPaymentModalOpen(true);
  };

  return (
    <div className="bg-white pt-10 pb-2 sm:pb-3 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10 sm:space-y-12 animate-fadeIn">
      
      {/* Hero Banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] font-bold text-xs uppercase tracking-wider">
          <Crown className="w-4 h-4 text-[#D4AF37]" />
          <span>MINDFORGE 360°™ MEMBERSHIP</span>
        </div>

        <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
          Continue Your Inner Transformation
        </h1>

        <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
          Choose the plan that fits your journey. Step beyond the 5-Day Challenge into lifetime emotional resilience.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isCurrentPlan = user.plan === plan.id;
          const isPopular = plan.popular;
          const isElite = plan.id === 'INNER_TRANSFORMATION_ELITE';

          return (
            <div
              key={plan.id}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                isElite
                  ? 'bg-gradient-to-b from-[#062c22] via-[#0B6B53] to-[#134E4A] text-white shadow-2xl border-2 border-[#D4AF37] ring-4 ring-[#D4AF37]/20'
                  : isPopular
                  ? 'bg-white text-slate-900 border-2 border-[#D4AF37] shadow-xl ring-2 ring-[#D4AF37]/30 scale-[1.02]'
                  : 'bg-white text-slate-900 border border-slate-200 shadow-sm hover:shadow-md'
              }`}
            >
              {/* Top Badge */}
              {plan.badge && (
                <div className={`absolute -top-3.5 left-1/2 -translate-x-1/2 text-[10px] font-extrabold uppercase tracking-widest px-4 py-1 rounded-full shadow-md ${
                  isElite 
                    ? 'bg-[#D4AF37] text-slate-950' 
                    : isPopular 
                    ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950' 
                    : 'bg-emerald-100 text-[#0B6B53]'
                }`}>
                  {plan.badge}
                </div>
              )}

              <div>
                <h3 className={`font-heading font-extrabold text-xl mb-1 ${isElite ? 'text-[#D4AF37]' : 'text-slate-900'}`}>
                  {plan.name}
                </h3>
                {plan.tagline && (
                  <p className={`text-xs font-semibold mb-2 ${isElite ? 'text-amber-200' : 'text-[#0B6B53]'}`}>
                    {plan.tagline}
                  </p>
                )}
                <p className={`text-xs mb-6 ${isElite ? 'text-emerald-100' : 'text-slate-500'}`}>
                  {plan.period}
                </p>

                {/* Price Display */}
                <div className="mb-8 whitespace-nowrap flex items-baseline gap-1">
                  <span className={`font-heading font-extrabold text-4xl sm:text-5xl ${isElite ? 'text-white' : 'text-slate-900'}`}>
                    ₹{plan.priceINR}
                  </span>
                  <span className={`text-xs ${isElite ? 'text-emerald-200' : 'text-slate-500'}`}>
                    {plan.period.includes('Monthly') ? '/ month' : plan.period.includes('Annual') ? '/ year' : 'one-time'}
                  </span>
                </div>

                {/* Features List */}
                <ul className="space-y-3 text-xs mb-8">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-2.5">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        isElite ? 'bg-[#D4AF37] text-slate-950' : 'bg-emerald-100 text-[#0B6B53]'
                      }`}>
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span className={isElite ? 'text-emerald-50 font-medium' : 'text-slate-700 font-medium'}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handleSelectPlan(plan)}
                className={`w-full py-4 rounded-2xl font-extrabold text-sm shadow-lg transition-all ${
                  isElite
                    ? 'bg-gradient-to-r from-[#D4AF37] via-amber-400 to-yellow-500 text-slate-950 hover:brightness-110'
                    : isPopular
                    ? 'bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 hover:brightness-110'
                    : 'bg-[#0B6B53] text-white hover:bg-[#134E4A]'
                }`}
              >
                {plan.buttonText || 'Join Now'}
              </button>

            </div>
          );
        })}
      </div>

      {/* Holistic Wellness One-Stop Solution Section */}
      <HolisticWellnessSection />

      {/* Drop Us A Line Contact Form Section */}
      <DropUsALineSection />

    </div>
  </div>
  );
};
