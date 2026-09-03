export type ActiveView = 
  | 'landing' 
  | 'explore-path'
  | 'inner-shift'
  | 'inner-revolution'
  | 'career-axis'
  | 'career-axis-booking'
  | 'corporate-wellness'
  | 'dashboard' 
  | 'challenge' 
  | 'breathing' 
  | 'meditation' 
  | 'sound-therapy'
  | 'journal' 
  | 'mood' 
  | 'upgrade' 
  | 'profile' 
  | 'ai-coach'
  | 'cbt-video'
  | 'success';

export interface CorporateConsultationPayload {
  fullName: string;
  workEmail: string;
  company: string;
  designation?: string;
  phone?: string;
  employeeCount?: string;
  preferredProgram: string;
  preferredFormat: 'Online' | 'Offline' | 'Either';
  preferredDate?: string;
  requirementDetails?: string;
}

export interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'CBT Wisdom' | 'Mindfulness' | 'Stress Relief' | 'Spiritual Growth' | 'Sleep & Recovery';
  author: string;
  readTime: string;
  date: string;
  imageUrl: string;
  featured?: boolean;
}

export interface MagazineIssue {
  id: string;
  issueNumber: string;
  title: string;
  monthYear: string;
  coverImageUrl: string;
  description: string;
  topics: string[];
  highlights: string[];
  pdfUrl: string;
  editorsNote: string;
}

export interface FutureProgram {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  location: string;
  instructor: string;
  category: 'Masterclass' | 'Retreat' | 'Mentorship' | 'Intensive';
  description: string;
  highlights: string[];
  isExclusive: boolean;
  capacity: string;
  registeredCount: number;
  userRsvp: boolean;
  imageUrl?: string;
}

export interface MemberResource {
  id: string;
  title: string;
  type: 'pdf' | 'audio' | 'wallpaper' | 'community';
  size: string;
  description: string;
  downloadUrl: string;
}

export interface UserRegistration {
  fullName: string;
  whatsapp: string;
  email: string;
  country: string;
  agreedWhatsapp: boolean;
  registeredAt: string;
}

export interface UserProfile {
  id: string;
  name: string;
  whatsapp: string;
  email: string;
  country: string;
  avatarUrl: string;
  registered: boolean;
  registeredAt?: string;
  currentDay: number; // 1 to 5
  completedDays: number[]; // e.g. [1, 2]
  streakDays: number;
  longestStreak: number;
  meditationMinutes: number;
  xpPoints: number;
  level: number;
  badges: string[]; // badge IDs
  plan: 'FREE_CHALLENGE' | 'INNER_SHIFT' | 'MIND_MASTERY_PRO' | 'INNER_TRANSFORMATION_ELITE';
  isElite: boolean;
}

export interface DayLesson {
  dayNumber: number;
  title: string;
  subtitle: string;
  themeColor: string;
  durationMinutes: number;
  summary: string;
  breathingGoalMinutes: number;
  meditationTrack: {
    title: string;
    subtitle?: string;
    genre?: string;
    audioDescription?: string;
    duration: string;
    audioUrl?: string;
    ambientSound: 'rain' | 'ocean' | 'forest' | 'birds';
    soundName: string;
  };
  lessonContent: string;
  journalPrompts: string[];
  affirmation: string;
  keyTakeaways: string[];
}

export interface JournalEntry {
  id: string;
  dayNumber: number;
  date: string;
  responses: Record<string, string>; // promptId -> answer
  feelingToday: string;
  gratitude: string;
  learnings: string;
}

export interface MoodLog {
  id: string;
  date: string; // YYYY-MM-DD
  dayOfWeek: string;
  moodEmoji: '😁' | '😌' | '😐' | '😔' | '😢';
  moodLabel: string;
  note?: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  category: 'challenge' | 'streak' | 'meditation' | 'mindfulness';
}

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  rating: number;
  text: string;
  videoUrl?: string;
}

export interface PricingPlan {
  id: 'INNER_SHIFT' | 'MIND_MASTERY_PRO' | 'INNER_TRANSFORMATION_ELITE';
  name: string;
  tagline?: string;
  priceINR: number;
  period: string;
  razorpayPlanId?: string;
  paymentUrl?: string;
  popular?: boolean;
  badge?: string;
  features: string[];
  buttonText: string;
  colorScheme: 'emerald' | 'gold' | 'darkEmerald';
}

export interface AdminAnalytics {
  totalUsers: number;
  activeToday: number;
  challengeCompletedCount: number;
  totalRevenueINR: number;
  whatsappRemindersSent: number;
  certificatesIssued: number;
}
