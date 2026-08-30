import React from 'react';
import { useApp } from '../../context/AppContext';
import { DAILY_QUOTES, DAYS_DATA } from '../../data/mockData';
import { 
  Flame, 
  Sun, 
  Quote, 
  Clock, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Wind, 
  Headphones, 
  BookOpen, 
  Bell, 
  Crown, 
  Radio, 
  Compass, 
  User,
  ExternalLink,
  Sparkles,
  FileText
} from 'lucide-react';
import { ScrollReveal, StaggerContainer, StaggerItem } from '../ScrollReveal';
import { FreeStarBadge } from '../Common/FreeStarBadge';

export const DashboardOverview: React.FC = () => {
  const { user, setActiveView, setActiveDayNumber, setIsRegistrationModalOpen, setIsCertificateModalOpen } = useApp();

  const currentDayData = DAYS_DATA.find(d => d.dayNumber === user.currentDay) || DAYS_DATA[0];
  const progressPercent = Math.round((user.completedDays.length / 5) * 100);

  // Quote of the day based on date
  const quoteIndex = new Date().getDate() % DAILY_QUOTES.length;
  const todayQuote = DAILY_QUOTES[quoteIndex];

  if (!user.registered) {
    return (
      <div className="max-w-4xl mx-auto my-12 p-8 bg-white rounded-3xl border border-slate-200 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 flex items-center justify-center text-[#0B6B53]">
          <Sun className="w-8 h-8 text-[#0B6B53]" />
        </div>
        <h2 className="font-heading font-extrabold text-2xl text-slate-900">
          Welcome to Path to Inner Peace
        </h2>
        <p className="text-slate-600 text-sm max-w-md mx-auto">
          You are one step away from unlocking your personal 5 Day Mind Reset Challenge dashboard!
        </p>
        <button
          onClick={() => setIsRegistrationModalOpen(true)}
          className="relative btn-glowing-gold pl-10 pr-7 py-3.5 bg-gradient-to-r from-[#D4AF37] via-amber-400 to-amber-500 text-slate-950 font-bold text-sm rounded-xl hover:brightness-110 active:scale-95 transition-all shadow-xl border border-amber-200/50 cursor-pointer inline-flex items-center gap-2.5 group"
        >
          <FreeStarBadge size="sm" />
          <span>5 Day Mind Reset Challenge</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn overflow-hidden">
      
      {/* Top Banner Greeting */}
      <ScrollReveal variant="slide-down">
        <div className="relative overflow-hidden bg-gradient-to-r from-[#0B6B53] via-[#134E4A] to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            
            <div className="flex items-center gap-4">
              <img 
                src={user.avatarUrl} 
                alt={user.name} 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-[#D4AF37] shadow-lg"
                referrerPolicy="no-referrer"
              />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider bg-[#D4AF37] text-slate-950 px-2.5 py-0.5 rounded-full">
                    Level {user.level} Seeker
                  </span>
                  <span className="text-[11px] font-semibold text-emerald-200">
                    {user.xpPoints} XP
                  </span>
                </div>
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                  Namaste, {user.name}! 🙏
                </h1>
                <p className="text-xs text-emerald-100 mt-1">
                  Your inner peace journey continues today with Day {user.currentDay}: {currentDayData.title}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  setActiveDayNumber(user.currentDay);
                  setActiveView('challenge');
                }}
                className="px-6 py-3 bg bg-gradient-to-r from-[#D4AF37] to-amber-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center gap-2"
              >
                <span>Continue Day {user.currentDay}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      </ScrollReveal>

      {/* Stats Cards Grid */}
      <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Streak */}
        <StaggerItem variant="scale">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 h-full">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
              <Flame className="w-6 h-6 fill-amber-500" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">
                {user.streakDays} Days
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Active Streak (Best: {user.longestStreak}d)
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* Meditation Minutes */}
        <StaggerItem variant="scale">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 h-full">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0B6B53] flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">
                {user.meditationMinutes} Mins
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Total Zen Time
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* Challenge Progress */}
        <StaggerItem variant="scale">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 h-full">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#0B6B53] flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">
                {user.completedDays.length} / 5 Days
              </div>
              <div className="text-xs font-semibold text-slate-500">
                {progressPercent}% Reset Complete
              </div>
            </div>
          </div>
        </StaggerItem>

        {/* Badges Earned */}
        <StaggerItem variant="scale">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 h-full">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-[#D4AF37] flex items-center justify-center shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-2xl text-slate-900">
                {user.badges.length} Badges
              </div>
              <div className="text-xs font-semibold text-slate-500">
                Level {user.level} Unlocked
              </div>
            </div>
          </div>
        </StaggerItem>

      </StaggerContainer>

      {/* Daily Quote Card */}
      <ScrollReveal variant="fade">
        <div className="bg-gradient-to-r from-amber-50 via-emerald-50 to-teal-50 p-6 rounded-2xl border border-amber-200/80 shadow-sm flex items-start gap-4">
          <Quote className="w-6 h-6 text-[#D4AF37] shrink-0 mt-0.5" />
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#0B6B53]">
              DAILY WISDOM QUOTE
            </span>
            <p className="text-sm font-heading font-medium text-slate-800 italic mt-1">
              "{todayQuote}"
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Featured Magazine Banner in Dashboard */}
      <ScrollReveal variant="slide-up">
        <div className="bg-gradient-to-r from-[#041F18] via-[#083D30] to-[#0A2E24] p-6 sm:p-7 rounded-3xl border-2 border-[#D4AF37]/50 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center gap-5 z-10 text-center sm:text-left">
            <div className="w-24 h-36 shrink-0 rounded-2xl overflow-hidden shadow-2xl border-2 border-amber-300/60 relative bg-slate-950 group">
              <img 
                src="https://plain-apac-prod-public.komododecks.com/202608/24/7FUZEA9VKa2YWPBYl9zz/image.jpg" 
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/inner_horizon_cover.jpg';
                }}
                alt="INNER HORIZON Issue 01" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-2 left-2 bg-[#D4AF37] text-slate-950 text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow">
                Launch
              </div>
            </div>

            <div className="space-y-2 max-w-xl">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  <Sparkles className="w-3 h-3 fill-slate-950" />
                  <span>Free Member Publication</span>
                </span>
                <span className="text-[10px] font-bold text-amber-300">
                  Issue 01 • 31 Full Pages
                </span>
              </div>
              <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white leading-tight">
                INNER HORIZON: <span className="text-[#D4AF37]">The Science of Inner Peace</span>
              </h3>
              <p className="text-xs text-emerald-100/90 leading-relaxed font-inter">
                Read the inaugural edition packed with neuroscience research, 12 CBT tools, reflection worksheets, and exclusive expert columns.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-center gap-3 shrink-0 z-10 w-full md:w-auto">
            <a
              href="https://pdftourl.net/files/1787569013151-d9247f94-efc8-4315-8014-b0dae41f9088.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto md:w-full px-5 py-3 bg-gradient-to-r from-[#D4AF37] to-amber-400 text-slate-950 font-extrabold text-xs rounded-xl shadow-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              <span>Open Digital Issue (PDF)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            <button
              type="button"
              onClick={() => setActiveView('profile')}
              className="w-full sm:w-auto md:w-full px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-all flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-amber-300" />
              <span>Open in Member Portal</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* Main Task Card & Quick Action Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Today's Challenge Task */}
        <div className="lg:col-span-8">
          <ScrollReveal variant="slide-up">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53]">
                    TODAY'S RESET FOCUS
                  </span>
                  <h2 className="font-heading font-extrabold text-2xl text-slate-900 mt-1">
                    Day {currentDayData.dayNumber}: {currentDayData.title}
                  </h2>
                </div>

                <span className="px-3 py-1 bg-emerald-100 text-[#0B6B53] font-bold text-xs rounded-full">
                  30 Min Session
                </span>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {currentDayData.summary}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <button 
                  onClick={() => setActiveView('sound-therapy')}
                  className="p-3.5 rounded-xl bg-amber-50/90 border border-amber-200 hover:bg-amber-100 text-left transition-all flex flex-col justify-between gap-2 group shadow-sm hover:shadow"
                >
                  <div className="flex items-center justify-between w-full">
                    <Radio className="w-5 h-5 text-[#D4AF37]" />
                    <span className="text-[10px] font-bold uppercase bg-amber-200/60 text-amber-950 px-1.5 py-0.5 rounded">Acoustic</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-amber-950 group-hover:text-amber-900">Sound Therapy</p>
                    <p className="text-[10px] text-amber-800/90 truncate">Binaural & Bowls</p>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveView('breathing')}
                  className="p-3.5 rounded-xl bg-emerald-50/90 border border-emerald-200 hover:bg-emerald-100 text-left transition-all flex flex-col justify-between gap-2 group shadow-sm hover:shadow"
                >
                  <div className="flex items-center justify-between w-full">
                    <Wind className="w-5 h-5 text-[#0B6B53]" />
                    <span className="text-[10px] font-bold uppercase bg-emerald-200/60 text-emerald-950 px-1.5 py-0.5 rounded">Somatic</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-[#0B6B53]">Box Breathing</p>
                    <p className="text-[10px] text-slate-500">Nervous system calm</p>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveView('meditation')}
                  className="p-3.5 rounded-xl bg-indigo-50/90 border border-indigo-200 hover:bg-indigo-100 text-left transition-all flex flex-col justify-between gap-2 group shadow-sm hover:shadow"
                >
                  <div className="flex items-center justify-between w-full">
                    <Headphones className="w-5 h-5 text-indigo-600" />
                    <span className="text-[10px] font-bold uppercase bg-indigo-200/60 text-indigo-950 px-1.5 py-0.5 rounded">Mindful</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-indigo-900">Guided Reset</p>
                    <p className="text-[10px] text-slate-500 truncate">{currentDayData.meditationTrack.title}</p>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveView('journal')}
                  className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 hover:bg-amber-100/80 text-left transition-all flex flex-col justify-between gap-2 group shadow-sm hover:shadow"
                >
                  <div className="flex items-center justify-between w-full">
                    <BookOpen className="w-5 h-5 text-amber-700" />
                    <span className="text-[10px] font-bold uppercase bg-amber-200/60 text-amber-950 px-1.5 py-0.5 rounded">Reflect</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-amber-900">Daily Journal</p>
                    <p className="text-[10px] text-slate-500">CBT prompt</p>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveView('ai-coach')}
                  className="p-3.5 rounded-xl bg-teal-50/90 border border-teal-200 hover:bg-teal-100 text-left transition-all flex flex-col justify-between gap-2 group shadow-sm hover:shadow"
                >
                  <div className="flex items-center justify-between w-full">
                    <Compass className="w-5 h-5 text-[#0B6B53]" />
                    <span className="text-[10px] font-bold uppercase bg-teal-200/60 text-teal-950 px-1.5 py-0.5 rounded">24/7 Guide</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-[#0B6B53]">Inner Peace Guide</p>
                    <p className="text-[10px] text-slate-500">Reflection guide</p>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveView('cbt-video')}
                  className="p-3.5 rounded-xl bg-gradient-to-br from-amber-50 to-emerald-50 border border-amber-300 hover:border-amber-400 text-left transition-all flex flex-col justify-between gap-2 group shadow-sm hover:shadow col-span-2 sm:col-span-1"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="text-lg">🎬</span>
                    <span className="text-[10px] font-extrabold uppercase bg-[#D4AF37] text-slate-950 px-1.5 py-0.5 rounded">10 Mins Video</span>
                  </div>
                  <div>
                    <p className="text-xs font-extrabold text-slate-900 group-hover:text-[#0B6B53]">12 CBT Techniques</p>
                    <p className="text-[10px] text-slate-600">Animated Masterclass</p>
                  </div>
                </button>

                <button 
                  onClick={() => setActiveView('profile')}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 hover:bg-slate-100 text-left transition-all flex flex-col justify-between gap-2 group shadow-sm hover:shadow"
                >
                  <div className="flex items-center justify-between w-full">
                    <User className="w-5 h-5 text-slate-700" />
                    <span className="text-[10px] font-bold uppercase bg-slate-200 text-slate-800 px-1.5 py-0.5 rounded">Member</span>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-900 group-hover:text-slate-950">Member Access</p>
                    <p className="text-[10px] text-slate-500">Badges & certs</p>
                  </div>
                </button>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  onClick={() => {
                    setActiveDayNumber(user.currentDay);
                    setActiveView('challenge');
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#0B6B53] hover:bg-[#134E4A] text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <span>Start Today's 30-Min Lesson</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {user.completedDays.length >= 5 && (
                  <button
                    onClick={() => setIsCertificateModalOpen(true)}
                    className="w-full sm:w-auto px-6 py-3.5 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2 border border-amber-300"
                  >
                    <Award className="w-4 h-4 text-[#D4AF37]" />
                    <span>View Certificate</span>
                  </button>
                )}
              </div>

            </div>
          </ScrollReveal>
        </div>

        {/* Sidebar: Upcoming Reminder & Quick Tools */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* Upcoming WhatsApp Reminder Alert */}
          <ScrollReveal variant="slide-left" delay={0.1}>
            <div className="bg-[#064E3B] text-white p-6 rounded-3xl border border-emerald-800/80 shadow-md space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-500/20 text-[#D4AF37] rounded-xl">
                  <Bell className="w-5 h-5 animate-bounce" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-sm text-white">
                    WhatsApp Reminder Active
                  </h4>
                  <p className="text-xs text-emerald-200">
                    Daily reminder sent to {user.whatsapp || 'Registered WhatsApp'}
                  </p>
                </div>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed bg-[#0B6B53]/50 p-3 rounded-xl border border-emerald-700/40">
                💡 Tip: The best time to practice your 30-minute reset is early morning or right before bedtime for deep sleep recovery.
              </p>
            </div>
          </ScrollReveal>

          {/* Upgrade Teaser */}
          <ScrollReveal variant="slide-left" delay={0.2}>
            <div className="bg-gradient-to-br from-[#134E4A] to-[#0B6B53] text-white p-6 rounded-3xl shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Crown className="w-5 h-5 text-[#D4AF37]" />
                <span className="font-heading font-bold text-sm text-[#D4AF37]">
                  MindForge 360°™ Upgrade
                </span>
              </div>
              <p className="text-xs text-emerald-100 leading-relaxed">
                Unlock 50+ guided meditations, Personal Reflection Guide 24/7, and live monthly masterclasses with Mainak Chatterjee.
              </p>
              <button
                onClick={() => setActiveView('upgrade')}
                className="w-full py-2.5 bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm"
              >
                View Membership Plans
              </button>
            </div>
          </ScrollReveal>

        </div>

      </div>

    </div>
  );
};
