import React from 'react';
import { 
  HeartPulse, 
  Compass, 
  Moon, 
  Heart, 
  Lightbulb, 
  Zap, 
  Sun, 
  Wind, 
  Headphones, 
  BookOpen, 
  Activity 
} from 'lucide-react';

export const BenefitsSection: React.FC = () => {
  const benefits = [
    {
      title: 'Reduce Stress',
      description: 'Lower cortisol levels through targeted vagus nerve stimulation.',
      icon: HeartPulse,
      color: 'bg-emerald-50 text-[#0B6B53]'
    },
    {
      title: 'Calm Overthinking',
      description: 'Break anxious thought loops using cognitive re-framing techniques.',
      icon: Compass,
      color: 'bg-amber-50 text-amber-700'
    },
    {
      title: 'Better Sleep',
      description: 'Unwind your mind before bedtime with deep restorative soundscapes.',
      icon: Moon,
      color: 'bg-emerald-50 text-[#0B6B53]'
    },
    {
      title: 'Emotional Healing',
      description: 'Release past grievances and cultivate radical self-compassion.',
      icon: Heart,
      color: 'bg-rose-50 text-rose-700'
    },
    {
      title: 'Mental Clarity',
      description: 'Eliminate brain fog and gain sharp focus for work and daily decisions.',
      icon: Lightbulb,
      color: 'bg-teal-50 text-teal-700'
    },
    {
      title: 'Confidence Reset',
      description: 'Overcome imposter syndrome and step boldly into your core worth.',
      icon: Zap,
      color: 'bg-yellow-50 text-yellow-700'
    },
    {
      title: 'Mindfulness',
      description: 'Cultivate non-judgmental present-moment awareness every day.',
      icon: Sun,
      color: 'bg-[#0B6B53]/10 text-[#0B6B53]'
    },
    {
      title: 'Breathing Exercises',
      description: 'Master 3-10 minute Box Breathing and Calming Breath patterns.',
      icon: Wind,
      color: 'bg-teal-50 text-teal-700'
    },
    {
      title: 'Guided Meditation',
      description: 'Immerse in daily audio tracks accompanied by nature soundscapes.',
      icon: Headphones,
      color: 'bg-purple-50 text-purple-700'
    },
    {
      title: 'Daily Journaling',
      description: 'Reflect deeply with daily CBT prompts and gratitude logs.',
      icon: BookOpen,
      color: 'bg-amber-50 text-amber-800'
    },
    {
      title: 'Healthy Habits',
      description: 'Build an unbroken streak of 10-minute daily mental reset rituals.',
      icon: Activity,
      color: 'bg-[#134E4A]/10 text-[#134E4A]'
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
            HOLISTIC MENTAL TRANSFORMATION
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 mt-3 tracking-tight">
            Comprehensive Benefits of Your 5-Day Reset
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Every session combines modern psychology, CBT techniques, and psycho-spiritual wisdom to deliver profound, measurable shifts in your well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {benefits.map((b, idx) => {
            const Icon = b.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-[#0B6B53]/30 hover:shadow-lg hover:-translate-y-1 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl ${b.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-900 mb-2">
                  {b.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
