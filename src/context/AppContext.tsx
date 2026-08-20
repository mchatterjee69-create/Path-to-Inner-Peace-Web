import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  ActiveView, 
  UserProfile, 
  JournalEntry, 
  MoodLog, 
  Badge, 
  PricingPlan,
  UserRegistration 
} from '../types';
import { ALL_BADGES, DAYS_DATA, PRICING_PLANS, FOUNDER_INFO } from '../data/mockData';
import confetti from 'canvas-confetti';
import { dispatchFormToAdmin } from '../utils/formSubmit';

interface AppContextType {
  user: UserProfile;
  activeView: ActiveView;
  setActiveView: (view: ActiveView) => void;
  activeDayNumber: number;
  setActiveDayNumber: (day: number) => void;
  journalEntries: Record<number, JournalEntry>;
  moodLogs: MoodLog[];
  badges: Badge[];
  isRegistrationModalOpen: boolean;
  setIsRegistrationModalOpen: (open: boolean) => void;
  registrationTargetDay: number | null;
  setRegistrationTargetDay: (day: number | null) => void;
  isPaymentModalOpen: boolean;
  setIsPaymentModalOpen: (open: boolean) => void;
  selectedPlan: PricingPlan | null;
  setSelectedPlan: (plan: PricingPlan | null) => void;
  isCertificateModalOpen: boolean;
  setIsCertificateModalOpen: (open: boolean) => void;
  isAdminLeadsModalOpen: boolean;
  setIsAdminLeadsModalOpen: (open: boolean) => void;
  isInnerRevolutionModalOpen: boolean;
  setIsInnerRevolutionModalOpen: (open: boolean) => void;
  isInnerMasteryModalOpen: boolean;
  setIsInnerMasteryModalOpen: (open: boolean) => void;
  registerUser: (details: UserRegistration) => void;
  loginUser: (emailOrPhone: string, fullName?: string) => void;
  logoutUser: () => void;
  completeDay: (dayNum: number) => void;
  saveJournalEntry: (entry: JournalEntry) => void;
  addMoodLog: (log: Omit<MoodLog, 'id'>) => void;
  addMeditationMinutes: (mins: number) => void;
  upgradeMembership: (planId: 'INNER_SHIFT' | 'MIND_MASTERY_PRO' | 'INNER_TRANSFORMATION_ELITE') => void;
  triggerConfetti: () => void;
  updateUserProfile: (fields: Partial<UserProfile>) => void;
  founderPhoto: string;
  updateFounderPhoto: (photo: string) => void;
  resetFounderPhoto: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: 'usr_default_101',
  name: 'Seeker',
  whatsapp: '',
  email: '',
  country: 'India',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
  registered: false,
  currentDay: 1,
  completedDays: [],
  streakDays: 1,
  longestStreak: 1,
  meditationMinutes: 0,
  xpPoints: 50,
  level: 1,
  badges: ['day1-completed'],
  plan: 'FREE_CHALLENGE',
  isElite: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial state from localStorage if present
  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('pip_user');
      return saved ? JSON.parse(saved) : DEFAULT_USER;
    } catch {
      return DEFAULT_USER;
    }
  });

  const VALID_VIEWS: ActiveView[] = [
    'landing', 'inner-shift', 'inner-revolution', 'career-axis', 'career-axis-booking',
    'dashboard', 'challenge', 'breathing', 'meditation', 'sound-therapy',
    'journal', 'mood', 'upgrade', 'profile', 'ai-coach', 'cbt-video', 'success'
  ];

  const [activeView, setActiveViewRaw] = useState<ActiveView>(() => {
    try {
      const hash = window.location.hash.replace('#', '') as ActiveView;
      if (hash && ['landing', 'inner-shift', 'inner-revolution', 'career-axis', 'career-axis-booking', 'dashboard', 'challenge', 'breathing', 'meditation', 'sound-therapy', 'journal', 'mood', 'upgrade', 'profile', 'ai-coach', 'cbt-video', 'success'].includes(hash)) {
        return hash;
      }
    } catch (e) {
      console.error(e);
    }
    return 'landing';
  });
  const [activeDayNumber, setActiveDayNumberRaw] = useState<number>(1);

  const setActiveView = (view: ActiveView, pushHistory = true) => {
    setActiveViewRaw(view);
    window.scrollTo({ top: 0, behavior: 'instant' });

    if (pushHistory) {
      try {
        const currentHash = window.location.hash.replace('#', '');
        if (currentHash !== view) {
          const newHash = view === 'landing' ? '' : `#${view}`;
          window.history.pushState({ view }, '', newHash || window.location.pathname + window.location.search);
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const setActiveDayNumber = (day: number) => {
    setActiveDayNumberRaw(day);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  useEffect(() => {
    // Set initial history state if not already set
    try {
      if (!window.history.state || !window.history.state.view) {
        window.history.replaceState({ view: activeView }, '', window.location.hash ? window.location.hash : window.location.pathname + window.location.search);
      }
    } catch (e) {
      console.error(e);
    }

    const handlePopState = (event: PopStateEvent) => {
      let targetView: ActiveView = 'landing';
      if (event.state && event.state.view && VALID_VIEWS.includes(event.state.view)) {
        targetView = event.state.view;
      } else {
        const hash = window.location.hash.replace('#', '') as ActiveView;
        if (hash && VALID_VIEWS.includes(hash)) {
          targetView = hash;
        }
      }
      
      // Close open modals on back/forward
      setIsRegistrationModalOpen(false);
      setIsPaymentModalOpen(false);
      setIsCertificateModalOpen(false);

      setActiveViewRaw(targetView);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);
  const [journalEntries, setJournalEntries] = useState<Record<number, JournalEntry>>(() => {
    try {
      const saved = localStorage.getItem('pip_journals');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [moodLogs, setMoodLogs] = useState<MoodLog[]>(() => {
    try {
      const saved = localStorage.getItem('pip_moods');
      return saved ? JSON.parse(saved) : [
        { id: '1', date: '2026-07-28', dayOfWeek: 'Tue', moodEmoji: '😌', moodLabel: 'Calm' },
        { id: '2', date: '2026-07-29', dayOfWeek: 'Wed', moodEmoji: '😁', moodLabel: 'Joyful' },
        { id: '3', date: '2026-07-30', dayOfWeek: 'Thu', moodEmoji: '😐', moodLabel: 'Neutral' },
        { id: '4', date: '2026-07-31', dayOfWeek: 'Fri', moodEmoji: '😌', moodLabel: 'Peaceful' },
        { id: '5', date: '2026-08-01', dayOfWeek: 'Sat', moodEmoji: '😁', moodLabel: 'Empowered' }
      ];
    } catch {
      return [];
    }
  });

  const [badges, setBadges] = useState<Badge[]>(() => {
    return ALL_BADGES.map(b => ({
      ...b,
      unlocked: user.badges.includes(b.id)
    }));
  });

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [registrationTargetDay, setRegistrationTargetDay] = useState<number | null>(null);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan | null>(PRICING_PLANS[1]);
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState(false);
  const [isAdminLeadsModalOpen, setIsAdminLeadsModalOpen] = useState(false);
  const [isInnerRevolutionModalOpen, setIsInnerRevolutionModalOpen] = useState(false);
  const [isInnerMasteryModalOpen, setIsInnerMasteryModalOpen] = useState(false);

  const [founderPhoto, setFounderPhoto] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('pip_founder_photo');
      return saved || FOUNDER_INFO.image;
    } catch {
      return FOUNDER_INFO.image;
    }
  });

  const updateFounderPhoto = (photo: string) => {
    setFounderPhoto(photo);
    try {
      localStorage.setItem('pip_founder_photo', photo);
    } catch (e) {
      console.error('Failed to save founder photo to localStorage', e);
    }
  };

  const resetFounderPhoto = () => {
    setFounderPhoto(FOUNDER_INFO.image);
    try {
      localStorage.removeItem('pip_founder_photo');
    } catch (e) {
      console.error('Failed to remove founder photo from localStorage', e);
    }
  };

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('pip_user', JSON.stringify(user));
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  useEffect(() => {
    try {
      localStorage.setItem('pip_journals', JSON.stringify(journalEntries));
    } catch (e) {
      console.error(e);
    }
  }, [journalEntries]);

  useEffect(() => {
    try {
      localStorage.setItem('pip_moods', JSON.stringify(moodLogs));
    } catch (e) {
      console.error(e);
    }
  }, [moodLogs]);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0B6B53', '#134E4A', '#D4AF37', '#F59E0B']
      });
    } catch (e) {
      console.log('Confetti failed', e);
    }
  };

  const registerUser = (details: UserRegistration) => {
    const updated: UserProfile = {
      ...user,
      name: details.fullName,
      whatsapp: details.whatsapp,
      email: details.email || `${details.fullName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      country: details.country,
      registered: true,
      registeredAt: details.registeredAt,
      currentDay: 1,
      xpPoints: user.xpPoints + 100
    };
    setUser(updated);
    setIsRegistrationModalOpen(false);
    triggerConfetti();
    setActiveView('dashboard');

    // Automatically push registration data to mchatterjee69@gmail.com
    dispatchFormToAdmin({
      formType: '5-Day Mental Reset Challenge Registration',
      fullName: details.fullName,
      email: details.email || `${details.fullName.toLowerCase().replace(/\s+/g, '')}@example.com`,
      mobile: details.whatsapp,
      details: {
        country: details.country,
        agreedWhatsapp: details.agreedWhatsapp,
        registeredAt: details.registeredAt || new Date().toISOString()
      }
    });
  };

  const loginUser = (emailOrPhone: string, fullName?: string) => {
    const isEmail = emailOrPhone.includes('@');
    const updatedName = fullName && fullName.trim() ? fullName.trim() : (user.name !== 'Seeker' ? user.name : 'Mainak Seeker');
    const updatedEmail = isEmail ? emailOrPhone : (user.email || `${updatedName.toLowerCase().replace(/\s+/g, '')}@pathtoinnerpeace.in`);
    const updatedWhatsapp = !isEmail ? emailOrPhone : (user.whatsapp || '+91 91636 70300');

    const updated: UserProfile = {
      ...user,
      name: updatedName,
      email: updatedEmail,
      whatsapp: updatedWhatsapp,
      registered: true,
      registeredAt: user.registeredAt || new Date().toISOString().split('T')[0],
      xpPoints: user.xpPoints + 50
    };
    setUser(updated);
    triggerConfetti();

    // Notify email on account sign-in
    dispatchFormToAdmin({
      formType: 'User Sign-In / Login',
      fullName: updatedName,
      email: updatedEmail,
      mobile: updatedWhatsapp,
      details: {
        loginInput: emailOrPhone,
        timestamp: new Date().toISOString()
      }
    });
  };

  const logoutUser = () => {
    setUser(DEFAULT_USER);
    try {
      localStorage.removeItem('pip_user');
    } catch (e) {
      console.error(e);
    }
  };

  const updateUserProfile = (fields: Partial<UserProfile>) => {
    setUser(prev => ({ ...prev, ...fields }));
  };

  const completeDay = (dayNum: number) => {
    const completedSet = new Set(user.completedDays);
    completedSet.add(dayNum);
    const completedArr = Array.from(completedSet);

    const nextDay = Math.min(5, Math.max(user.currentDay, dayNum + 1));
    const addedXp = 150;
    const addedMins = DAYS_DATA.find(d => d.dayNumber === dayNum)?.durationMinutes || 30;

    // Check unlocks
    const updatedBadges = [...user.badges];
    if (dayNum === 1 && !updatedBadges.includes('day1-completed')) {
      updatedBadges.push('day1-completed');
    }
    if (dayNum === 3 && !updatedBadges.includes('day3-completed')) {
      updatedBadges.push('day3-completed');
    }
    if (completedArr.length >= 5 && !updatedBadges.includes('challenge-master')) {
      updatedBadges.push('challenge-master');
    }

    const newXp = user.xpPoints + addedXp;
    const newLevel = Math.floor(newXp / 300) + 1;

    setUser(prev => ({
      ...prev,
      completedDays: completedArr,
      currentDay: nextDay,
      streakDays: prev.streakDays + 1,
      longestStreak: Math.max(prev.longestStreak, prev.streakDays + 1),
      meditationMinutes: prev.meditationMinutes + addedMins,
      xpPoints: newXp,
      level: newLevel,
      badges: updatedBadges
    }));

    setBadges(ALL_BADGES.map(b => ({
      ...b,
      unlocked: updatedBadges.includes(b.id)
    })));

    triggerConfetti();

    if (completedArr.length >= 5) {
      setTimeout(() => {
        setIsCertificateModalOpen(true);
      }, 1000);
    }
  };

  const saveJournalEntry = (entry: JournalEntry) => {
    setJournalEntries(prev => ({
      ...prev,
      [entry.dayNumber]: entry
    }));
    // Award 50 XP
    setUser(prev => ({
      ...prev,
      xpPoints: prev.xpPoints + 50
    }));
  };

  const addMoodLog = (logData: Omit<MoodLog, 'id'>) => {
    const newLog: MoodLog = {
      ...logData,
      id: Date.now().toString()
    };
    setMoodLogs(prev => [newLog, ...prev.slice(0, 20)]);
    setUser(prev => ({
      ...prev,
      xpPoints: prev.xpPoints + 20
    }));
  };

  const addMeditationMinutes = (mins: number) => {
    setUser(prev => {
      const updatedMins = prev.meditationMinutes + mins;
      const updatedBadges = [...prev.badges];
      if (updatedMins >= 30 && !updatedBadges.includes('zen-master-30')) {
        updatedBadges.push('zen-master-30');
      }
      return {
        ...prev,
        meditationMinutes: updatedMins,
        xpPoints: prev.xpPoints + (mins * 5),
        badges: updatedBadges
      };
    });
  };

  const upgradeMembership = (planId: 'INNER_SHIFT' | 'MIND_MASTERY_PRO' | 'INNER_TRANSFORMATION_ELITE') => {
    setUser(prev => ({
      ...prev,
      plan: planId,
      isElite: planId === 'INNER_TRANSFORMATION_ELITE',
      xpPoints: prev.xpPoints + 500
    }));
    setIsPaymentModalOpen(false);
    triggerConfetti();
  };

  return (
    <AppContext.Provider
      value={{
        user,
        activeView,
        setActiveView,
        activeDayNumber,
        setActiveDayNumber,
        journalEntries,
        moodLogs,
        badges,
        isRegistrationModalOpen,
        setIsRegistrationModalOpen,
        registrationTargetDay,
        setRegistrationTargetDay,
        isPaymentModalOpen,
        setIsPaymentModalOpen,
        selectedPlan,
        setSelectedPlan,
        isCertificateModalOpen,
        setIsCertificateModalOpen,
        isAdminLeadsModalOpen,
        setIsAdminLeadsModalOpen,
        isInnerRevolutionModalOpen,
        setIsInnerRevolutionModalOpen,
        isInnerMasteryModalOpen,
        setIsInnerMasteryModalOpen,
        registerUser,
        loginUser,
        logoutUser,
        completeDay,
        saveJournalEntry,
        addMoodLog,
        addMeditationMinutes,
        upgradeMembership,
        triggerConfetti,
        updateUserProfile,
        founderPhoto,
        updateFounderPhoto,
        resetFounderPhoto
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
