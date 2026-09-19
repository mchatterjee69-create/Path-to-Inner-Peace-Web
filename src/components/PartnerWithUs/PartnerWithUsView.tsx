import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Building2, 
  Dumbbell, 
  GraduationCap, 
  Handshake, 
  Flame, 
  Brain, 
  HeartHandshake, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  Globe2, 
  Users2, 
  Target, 
  ShieldCheck, 
  ArrowRight, 
  ArrowDown,
  CalendarCheck, 
  Presentation, 
  Laptop, 
  MapPin, 
  Award, 
  TrendingUp, 
  Check, 
  PhoneCall,
  Activity,
  BookOpen,
  Zap,
  Clock,
  MessageCircle,
  HelpCircle,
  Smile,
  ExternalLink,
  Coins,
  Share2,
  UserCheck,
  Home,
  Megaphone,
  Sparkle,
  Gift,
  Key,
  BadgePercent,
  Wallet,
  ChevronRight,
  Calculator
} from 'lucide-react';
import { PartnerCategory } from '../../types';
import { PartnerConsultationModal } from './PartnerConsultationModal';

// Images
import gymWellnessImage from '../../assets/images/gym_wellness_partner_1789548961424.jpg';
import collegeWellnessImage from '../../assets/images/college_campus_wellness_1789548973586.jpg';
import corporateBurnoutImage from '../../assets/images/corporate_burnout_stress_1788454326993.jpg';
import corporateWellnessBg from '../../assets/images/corporate_wellness_bg_1788440459846.jpg';

// Partner Sphere External Portal Link
export const PARTNER_SPHERE_URL = 'https://p2-ip-partner-sphere.vercel.app/';

export interface ReferEarnVertical {
  id: string;
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  badge: string;
  earningPotential: string;
  commissionRate: string;
  whyPartner: string;
  targetAudience: string[];
  recommendedPrograms: {
    name: string;
    description: string;
  }[];
  partnerPerks: string[];
  codeExample: string;
}

export const REFER_EARN_VERTICALS: ReferEarnVertical[] = [
  {
    id: 'yoga-instructor',
    title: 'Yoga Instructor',
    tagline: 'Deepen student transformation with nervous system resets & breathwork mastery',
    icon: Sparkles,
    badge: 'Mind-Body Wellness',
    earningPotential: '₹40,000 - ₹1,20,000/mo',
    commissionRate: 'Flat 50% Commission + Free Activation Reward',
    whyPartner: 'As a yoga teacher, your students look to you for deep inner calm. Recommend our structured CBT cognitive rewiring and 5-Day Mind Reset to help them integrate somatic awareness off the mat.',
    targetAudience: ['Daily Yoga Students', 'Workshop Attendees', 'Private 1:1 Clients', 'Retreat Seekers'],
    recommendedPrograms: [
      { name: '5-Day Mind Reset Challenge (Free Plan)', description: 'Earn an instant Activation Reward on free student signups.' },
      { name: 'Inner Shift (21-Day Transformation)', description: 'Subconscious rewiring & mindful emotional mastery (Flat 50% Commission).' },
      { name: 'Sound Therapy & Binaural Rest', description: 'Theta frequency sonic journeys for deep restorative calm (Flat 50% Commission).' }
    ],
    partnerPerks: [
      'Flat 50% commission on every paid enrollment',
      'Instant activation reward for free plan signups',
      'Co-branded workshop templates & slide decks',
      'Free lifetime access to Path to Inner Peace member portal'
    ],
    codeExample: 'P2IP-YOGA108'
  },
  {
    id: 'fitness-trainer',
    title: 'Fitness Trainer',
    tagline: 'Unlock faster recovery, parasympathetic cooldowns & mind-muscle endurance',
    icon: Flame,
    badge: 'Athletic Conditioning',
    earningPotential: '₹50,000 - ₹1,50,000/mo',
    commissionRate: 'Flat 50% Commission + Free Activation Reward',
    whyPartner: 'High-intensity lifting and conditioning generate acute sympathetic stress. Help your clients drop cortisol rapidly post-workout with guided vagus nerve resets, accelerating muscle protein synthesis and fat loss.',
    targetAudience: ['Personal Training Clients', 'Athletes & Lifters', 'Transformation Clients', 'Fitness Enthusiasts'],
    recommendedPrograms: [
      { name: '5-Day Mind Reset (Free Plan)', description: 'Earn an instant Activation Reward when clients activate free passes.' },
      { name: 'Somatic Vagus Nerve Cooldown', description: '12-min parasympathetic sequence post-lifting (Flat 50% Commission).' },
      { name: 'Mental Conditioning & Flow', description: 'Break workout plateaus & manage perceptual fatigue (Flat 50% Commission).' }
    ],
    partnerPerks: [
      'Flat 50% commission on all client enrollments',
      'Instant activation reward on free passes',
      'Trainer guide: "Neuroscience of Post-Workout Recovery"',
      'Direct monthly bank transfer on every member enrolled'
    ],
    codeExample: 'P2IP-FITPRO'
  },
  {
    id: 'gym-studio',
    title: 'Gym & Fitness Studio',
    tagline: 'Differentiate your facility into a full-spectrum body & mind sanctuary',
    icon: Dumbbell,
    badge: 'Facility & Enterprise',
    earningPotential: '₹80,000 - ₹2,50,000/mo',
    commissionRate: 'Flat 50% Commission + Free Activation Reward',
    whyPartner: 'Member churn happens when gymgoers feel burned out or plateaued. Provide institutional somatic recovery passes and weekend masterclasses to retain members 3x longer.',
    targetAudience: ['Active Studio Members', 'CrossFit & Strength Cohorts', 'High-Tier Membership Tiers', 'Personal Training Roster'],
    recommendedPrograms: [
      { name: '5-Day Member Challenge (Free Plan)', description: 'Bulk free passes with instant partner Activation Rewards.' },
      { name: 'Gym Member Digital Wellness Pass', description: 'Premium app access for full member recovery (Flat 50% Commission).' },
      { name: 'Weekend In-Studio Breathwork Clinic', description: 'Live 90-min experiential breath & reset immersion.' }
    ],
    partnerPerks: [
      'Flat 50% commission on member upgrades & paid subscriptions',
      'Activation rewards on all member free app registrations',
      'Turnkey in-gym posters with custom studio QR codes',
      'Dedicated institutional relationship manager'
    ],
    codeExample: 'P2IP-IRONSANCTUARY'
  },
  {
    id: 'psychologist-counsellor',
    title: 'Psychologist / Counsellor',
    tagline: 'Prescribe evidence-based cognitive & somatic tools between clinical sessions',
    icon: Brain,
    badge: 'Clinical & Therapy',
    earningPotential: '₹50,000 - ₹1,60,000/mo',
    commissionRate: 'Flat 50% Commission + Free Activation Reward',
    whyPartner: 'Support your clients outside the therapy room. Our guided CBT journaling prompts, distress tolerance breathing, and progressive challenge structure act as high-compliance therapeutic homework.',
    targetAudience: ['Therapy Clients', 'Individuals with Mild Anxiety', 'Burnout Candidates', 'Support Group Members'],
    recommendedPrograms: [
      { name: 'Free 5-Day Mind Reset', description: 'Immediate grounding tools with instant partner Activation Reward.' },
      { name: 'CBT Reflective Journaling & Modules', description: 'Cognitive reframing of automatic negative thoughts (Flat 50% Commission).' },
      { name: 'Inner Shift 21-Day Journey', description: 'Structured psychoeducation & somatic habit tracking (Flat 50% Commission).' }
    ],
    partnerPerks: [
      'Flat 50% ethical honorarium on all paid enrollments',
      'Activation reward on free client onboarding',
      'Therapist dashboard with client adherence metrics',
      'Complimentary practitioner credentials & resource pack'
    ],
    codeExample: 'P2IP-DRSHARMA'
  },
  {
    id: 'wellness-coach',
    title: 'Wellness & Life Coach',
    tagline: 'Amplify client breakthroughs with breathwork & subconscious reprogramming',
    icon: Compass,
    badge: 'Coaching & Mentorship',
    earningPotential: '₹60,000 - ₹1,80,000/mo',
    commissionRate: 'Flat 50% Commission + Free Activation Reward',
    whyPartner: 'Coaching sessions often hit walls when clients have chronic nervous system dysregulation. Integrate our science-backed breathwork and mind reset frameworks to help your coachees manifest real breakthroughs.',
    targetAudience: ['1:1 Life Coaching Clients', 'Group Mastermind Members', 'Executive Coachees', 'Spiritual Seekers'],
    recommendedPrograms: [
      { name: 'Free 5-Day Starter Reset', description: 'High-converting free challenge with instant partner Activation Reward.' },
      { name: 'Inner Revolution', description: 'Complete existential and emotional metamorphosis (Flat 50% Commission).' },
      { name: 'Career Axis Mentorship', description: 'Career transitions, imposter feelings & purpose (Flat 50% Commission).' }
    ],
    partnerPerks: [
      'Flat 50% commission on all paid mentorship programs',
      'Instant activation reward for free coachee signups',
      'White-label exercise sheets for your coaching sessions',
      'Monthly partner mastermind with Mainak Chatterjee'
    ],
    codeExample: 'P2IP-COACHPRIYA'
  },
  {
    id: 'corporate-hr',
    title: 'Corporate / HR',
    tagline: 'Combat workplace burnout, Zoom fatigue & foster high psychological safety',
    icon: Building2,
    badge: 'Enterprise & L&D',
    earningPotential: '₹80,000 - ₹3,00,000+ per cohort',
    commissionRate: 'Flat 50% Commission + Free Activation Reward',
    whyPartner: 'HR leaders and People Ops managers face severe turnover from stress and disengagement. Refer our workplace workshops and cohorts to build psychologically safe, high-performing corporate cultures.',
    targetAudience: ['Engineering & Product Teams', 'Sales & High-Quota Performers', 'People Managers & Leaders', 'All-Hands Employees'],
    recommendedPrograms: [
      { name: 'Company-Wide Free 5-Day Reset Pass', description: 'Free employee wellbeing challenge with Activation Rewards.' },
      { name: 'Stress & Burnout Decompression Workshop', description: 'Interactive 90-minute live hybrid session (Flat 50% Commission).' },
      { name: 'Executive Resilience Roundtable', description: 'Emotional regulation for C-suite & directors (Flat 50% Commission).' }
    ],
    partnerPerks: [
      'Flat 50% commission on corporate wellness cohorts',
      'Activation reward for all employee free challenge activations',
      'Customized corporate proposals & GST invoice billing',
      'Anonymized pre & post wellness impact reporting'
    ],
    codeExample: 'P2IP-CORPACME'
  },
  {
    id: 'school-college',
    title: 'School / College',
    tagline: 'Tackle exam anxiety, placement fear & empower the next generation',
    icon: GraduationCap,
    badge: 'Higher Education',
    earningPotential: 'Campus Grant / High-Yield Share',
    commissionRate: 'Flat 50% Commission + Free Activation Reward',
    whyPartner: 'From final exams to campus placements, students carry unprecedented emotional strain. Partner with us to bring inspiring auditorium sessions and digital mental calm passes to your campus.',
    targetAudience: ['Undergraduate & PG Students', 'Final Year Placement Batches', 'Faculty & Student Counselors', 'Competitive Exam Aspirants'],
    recommendedPrograms: [
      { name: 'Campus Free 5-Day Calm Pass', description: 'Instant activation reward on every student free enrollment.' },
      { name: 'Pre-Exam Calm & Focus Reset', description: 'Eliminating exam panic, brain fog & all-nighters (Flat 50% Commission).' },
      { name: 'Placement & Career Fortitude', description: 'Building unshakable interview confidence (Flat 50% Commission).' }
    ],
    partnerPerks: [
      'Flat 50% institutional revenue share on student cohorts',
      'Instant activation reward on all student free app signups',
      'Official collaboration certificate & MoU support',
      'Interactive Q&A with mental wellness mentors'
    ],
    codeExample: 'P2IP-CAMPUSIIT'
  },
  {
    id: 'community-manager',
    title: 'Community / Apartment Manager',
    tagline: 'Bring mindful peace, weekend wellness & vitality to your residential society',
    icon: Home,
    badge: 'Society & Gated Living',
    earningPotential: '₹35,000 - ₹90,000/mo',
    commissionRate: 'Flat 50% Commission + Free Activation Reward',
    whyPartner: 'Residents love community amenities that enhance quality of life. Organize Sunday morning breathwork circles, clubhouse wellness sessions, and share special society promo codes.',
    targetAudience: ['Apartment Residents', 'Senior Citizens & Parents', 'Working Professionals in Society', 'Clubhouse Members'],
    recommendedPrograms: [
      { name: 'Free Society 5-Day Mind Reset', description: 'Instant partner Activation Reward on resident signups.' },
      { name: 'Weekend Clubhouse Breathwork Circle', description: 'Community-wide nervous system harmonization (Flat 50% Commission).' },
      { name: 'Family Stress Relief Workshop', description: 'Work-life balance practices for busy owners (Flat 50% Commission).' }
    ],
    partnerPerks: [
      'Flat 50% commission on all paid community workshops',
      'Activation rewards on all free resident registrations',
      'Ready-to-post WhatsApp announcements & posters',
      'Direct revenue allocation to society welfare fund or manager'
    ],
    codeExample: 'P2IP-GREENSOCIETY'
  },
  {
    id: 'individual-partner',
    title: 'Individual Referral Partner',
    tagline: 'Share your personal healing journey & earn while helping friends and peers',
    icon: UserCheck,
    badge: 'Advocate & Affiliate',
    earningPotential: '₹25,000 - ₹75,000/mo',
    commissionRate: 'Flat 50% Commission + Free Activation Reward',
    whyPartner: 'If you have experienced the life-changing power of breathwork, meditation, and CBT cognitive clarity, become a certified partner. Help colleagues, family, and peers find inner peace and get rewarded.',
    targetAudience: ['Colleagues & Friends', 'Family & Relatives', 'WhatsApp & Social Circles', 'Book Clubs & Peer Groups'],
    recommendedPrograms: [
      { name: '5-Day Mind Reset Challenge (Free Plan)', description: 'Easy entry point: earn an instant Activation Reward on free signups.' },
      { name: 'Inner Shift Transformation', description: '21-day life transformation curriculum (Flat 50% Commission).' },
      { name: 'Career Axis Guidance', description: 'For friends feeling anxious about career & purpose (Flat 50% Commission).' }
    ],
    partnerPerks: [
      'Flat 50% commission on every paid referral',
      'Instant activation reward for every free plan signup',
      'Instant custom referral code generation on Partner Sphere',
      'Real-time WhatsApp notifications on earnings'
    ],
    codeExample: 'P2IP-RAMESH'
  },
  {
    id: 'influencer-creator',
    title: 'Influencer / Creator',
    tagline: 'Monetize your wellness, productivity or lifestyle audience ethically',
    icon: Megaphone,
    badge: 'Creator & Digital Media',
    earningPotential: '₹60,000 - ₹3,00,000+/mo',
    commissionRate: 'Flat 50% Commission + Free Activation Reward',
    whyPartner: 'Your followers trust your recommendations. Partner with a genuine, evidence-informed mental wellness platform. Offer your community exclusive discounts with your personal partner handle.',
    targetAudience: ['Instagram & YouTube Followers', 'Podcast Listeners', 'Substack / Newsletter Subscribers', 'LinkedIn Professional Audience'],
    recommendedPrograms: [
      { name: '5-Day Mind Reset Challenge (Free Plan)', description: 'High-converting free link with instant Activation Reward per signup.' },
      { name: 'Inner Shift & Inner Revolution', description: 'High-ticket deep transformations with massive Flat 50% Commission.' },
      { name: 'Co-Branded Live Stream Sessions', description: 'Live Q&A or guided meditation with Mainak Chatterjee.' }
    ],
    partnerPerks: [
      'Flat 50% commission on all paid course & cohort sales',
      'Instant activation reward on all free challenge link clicks & signups',
      'Custom link tracking & promo code (e.g. PRANA108)',
      'High-converting swipe-up & reel video creative kits'
    ],
    codeExample: 'P2IP-PRANA108'
  }
];

export const PartnerWithUsView: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVerticalId, setSelectedVerticalId] = useState<string>('yoga-instructor');
  const [referralCount, setReferralCount] = useState<number>(15);
  const [activeInstitutionalTab, setActiveInstitutionalTab] = useState<PartnerCategory>('corporate');
  const [selectedProgram, setSelectedProgram] = useState<string | undefined>(undefined);
  const [selectedCategoryForModal, setSelectedCategoryForModal] = useState<PartnerCategory>('corporate');

  const selectedVertical = REFER_EARN_VERTICALS.find(v => v.id === selectedVerticalId) || REFER_EARN_VERTICALS[0];

  // Helper to open the external Partner Sphere portal
  const handleRegisterNow = (customCode?: string) => {
    // Lead directly to https://p2-ip-partner-sphere.vercel.app/ as requested
    window.open(PARTNER_SPHERE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleOpenConsultation = (category: PartnerCategory = 'corporate', programName?: string) => {
    setSelectedCategoryForModal(category);
    setSelectedProgram(programName);
    setIsModalOpen(true);
  };

  // Estimated calculation
  // Avg paid program enrollment ~ ₹2,999; flat 50% commission = ₹1,500 per paid enrollment + free plan activation rewards!
  const avgCommissionPerReferral = 1500;
  const estimatedMonthlyIncome = referralCount * avgCommissionPerReferral;
  const estimatedYearlyIncome = estimatedMonthlyIncome * 12;

  // Specific Programs for Corporates
  const CORPORATE_PROGRAMS = [
    {
      id: 'stress-burnout',
      title: 'Stress & Burnout Decompression',
      icon: Flame,
      summary: 'Practical cognitive & nervous system tools to counteract deadline overwhelm, Zoom fatigue, and talent exhaustion.',
      details: [
        'Recognize subtle cognitive and physiological burnout triggers',
        'In-the-moment 3-minute nervous system reset techniques',
        'Sustainable boundary setting amidst 24/7 Slack culture',
        'Proven retention and energy restoration for high-velocity teams'
      ],
      tag: 'Workplace Essential'
    },
    {
      id: 'mindfulness-focus',
      title: 'Mindfulness & Attentional Focus',
      icon: Brain,
      summary: 'Evidence-informed mindfulness and breathwork practices that elevate focus and reduce context-switching drag.',
      details: [
        'Scientifically grounded breathwork for cognitive clarity',
        'Attentional anchors to handle distraction & email overload',
        'Pre-meeting micro-rituals for calm executive presence',
        'Sustained mental flow without toxic caffeinated spikes'
      ],
      tag: 'Cognitive Flow'
    },
    {
      id: 'emotional-resilience',
      title: 'Executive Emotional Resilience',
      icon: ShieldCheck,
      summary: 'Equip founders, team leads, and managers with emotional regulation to navigate volatility with composure.',
      details: [
        'Cognitive reframing for corporate pivots & crisis moments',
        'Emotional self-regulation to prevent reactive leadership',
        'Eradicating toxic friction with non-defensive communication',
        'Building psychological fortitude across executive ranks'
      ],
      tag: 'Leadership Tier'
    }
  ];

  // Specific Programs for Gyms & Fitness Centers
  const GYM_PROGRAMS = [
    {
      id: 'somatic-recovery',
      title: 'Somatic Vagus Nerve Cooldown',
      icon: Activity,
      summary: 'Bridge the missing link in physical training: shifting members from sympathetic fight-or-flight into parasympathetic deep recovery.',
      details: [
        'Post-workout 12-minute parasympathetic breathwork sequences',
        'Vagus nerve activation to lower heart rate and cortisol post-lifting',
        'Accelerated muscular recovery & enhanced sleep architecture',
        'Reduces central nervous system (CNS) burnout in heavy lifters'
      ],
      tag: 'Post-Workout Gold Standard'
    },
    {
      id: 'mind-muscle-resilience',
      title: 'Mind-Muscle Mental Conditioning',
      icon: Dumbbell,
      summary: 'Teach gym members and athletes how to overcome mental fatigue, self-doubt, and break through training plateaus.',
      details: [
        'Mental grit and perceptual fatigue mitigation',
        'Focus anchors during high-intensity metabolic intervals',
        'Breath-regulated pain tolerance & calm under heavy exertion',
        'Workshops for personal trainers to coach holistic wellbeing'
      ],
      tag: 'Athletic Conditioning'
    },
    {
      id: 'gym-member-pass',
      title: 'Digital Wellness Pass for Members',
      icon: Sparkles,
      summary: 'Provide every gym member with premium app access to the 5-Day Mind Reset challenge, binaural soundscapes, and guided journals.',
      details: [
        'Co-branded gym onboarding mental fitness package',
        'Increases gym member retention and monthly renewal rates',
        'Monthly in-studio weekend breathwork masterclasses',
        'Differentiates your gym as a holistic health sanctuary'
      ],
      tag: 'Retention Multiplier'
    }
  ];

  // Specific Programs for Colleges & Universities
  const COLLEGE_PROGRAMS = [
    {
      id: 'exam-anxiety',
      title: 'Pre-Exam Anxiety & Mental Calm Reset',
      icon: BookOpen,
      summary: 'Targeted cognitive reframing and physiological calming protocols designed specifically for students facing academic evaluation pressure.',
      details: [
        'Overcoming catastrophic thinking and fear of failure',
        'Quick breathing techniques to stop panic before examinations',
        'Attentional clarity to optimize study retention and memory',
        'Healthy study pacing to avoid caffeine-fueled all-nighters'
      ],
      tag: 'Academic Wellness'
    },
    {
      id: 'career-anxiety',
      title: 'Placement & Career Direction Fortitude',
      icon: Compass,
      summary: 'Grounded guidance for final-year students facing placement stress, campus interviews, and career confusion.',
      details: [
        'Overcoming imposter syndrome and interview anxiety',
        'Integrating Career Axis principles to match inner strengths with jobs',
        'Emotional resilience when navigating rejection or market downturns',
        'Clarity over societal comparison and peer envy'
      ],
      tag: 'Career Readiness'
    },
    {
      id: 'campus-induction',
      title: 'Campus Orientation & Youth Mental Reset',
      icon: GraduationCap,
      summary: 'Interactive, high-energy 90-minute auditorium sessions during freshers orientation to build campus-wide mental health awareness.',
      details: [
        'Destigmatizing mental health support on campus',
        'Building emotional regulation habits early in college life',
        'Faculty & student advisor sensitivity workshops',
        'Free digital app passes for all enrolled campus students'
      ],
      tag: 'Campus-Wide Impact'
    }
  ];

  // Refer & Earn FAQs
  const REFER_EARN_FAQS = [
    {
      q: 'How does the Partner Sphere Refer & Earn program work?',
      a: 'Register on Partner Sphere (https://p2-ip-partner-sphere.vercel.app/), select your professional vertical from the 10 available categories, and self-create your unique Referral ID / Partner Code (such as P2IP-RAMESH or PRANA108). Whenever your clients, students, employees, or followers enroll in our programs using your code or custom link, you earn a flat 50% commission on all paid plans, plus an instant Activation Reward on free plan registrations.'
    },
    {
      q: 'What is the commission rate for paid plans and reward for free plans?',
      a: 'We offer an industry-leading flat 50% commission on ALL paid plans and cohorts (Inner Shift, Inner Revolution, Career Axis, and custom corporate sessions). In addition, you earn an instant Activation Reward every single time someone registers and activates their account on our free plan / 5-Day Mind Reset with your Partner Code!'
    },
    {
      q: 'How do I self-create my unique Partner Code?',
      a: 'Click "Register Now & Be Our Partner", choose your vertical from the dropdown on the Partner Sphere registration page, and input your desired unique code (e.g. P2IP-[YOURNAME] or custom brand code). Your code activates instantly with zero waiting time.'
    },
    {
      q: 'When and how are referral commissions and activation rewards paid out?',
      a: 'All referral earnings (flat 50% commission on paid plans + free plan activation rewards) are calculated in real time inside your Partner Sphere dashboard and transferred on the 1st of every month directly to your verified bank account or UPI address with transparent statements.'
    },
    {
      q: 'Can institutions (Gyms, Colleges, Corporates) partner for custom on-site workshops?',
      a: 'Yes! Beyond individual referrals, institutional partners can book bespoke on-site workshops, multi-week employee wellness cohorts, or campus-wide masterclasses with our institutional director via our discovery call option.'
    },
    {
      q: 'Is there any fee to join as a partner?',
      a: 'No, joining the Path to Inner Peace Partner Sphere is 100% free. We provide promotional creatives, flyers, workshop decks, and ongoing partner support at zero charge.'
    }
  ];

  return (
    <div id="partner-with-us-page" className="min-h-screen bg-slate-50 text-slate-900 pb-24 font-sans">
      
      {/* Top Breadcrumb Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 tracking-wide uppercase">
            <Handshake className="w-4 h-4 text-[#0B6B53]" />
            <span>Path to Inner Peace • Partner Sphere & Institutional Network</span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={PARTNER_SPHERE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/90 text-[#0B6B53] hover:bg-[#0B6B53] hover:text-white transition-colors text-xs font-semibold cursor-pointer"
            >
              <span>Partner Sphere Portal</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <span className="hidden md:inline-block text-xs text-slate-500 font-medium">
              10 Dedicated Verticals • Refer & Earn Program
            </span>
          </div>
        </motion.div>
      </div>

      {/* =========================================================================
          HERO SECTION (Keeping Hero Image & Elevated Prominence)
      ========================================================================= */}
      <section className="relative z-10 w-full overflow-hidden bg-gradient-to-b from-[#021811] via-[#032419] to-[#021811] text-white border-b border-emerald-900/40 mt-4">
        {/* Background Image with dark cinematic gradient overlays */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
          <img 
            src={corporateWellnessBg}
            alt="Wellness Partnership Environment"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter brightness-[0.60] contrast-[1.15] saturate-[0.85] opacity-80 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#021811]/85 via-[#032419]/60 to-[#021811]/85" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021811] via-emerald-950/30 to-[#021811]/80" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 pb-14 sm:pb-20 space-y-8">
          <div className="max-w-3xl space-y-6">
            
            {/* Tagline Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/90 border border-[#D4AF37]/60 text-amber-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-xs"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Partner Sphere • Refer & Earn Ecosystem</span>
            </motion.div>

            {/* Main Title */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-white tracking-tight leading-[1.15]">
                Partner With Us
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-semibold text-[#D4AF37] tracking-tight leading-snug">
                Refer & Earn While Empowering Lives with Mental Clarity, Somatic Recovery & Inner Peace
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-sm sm:text-base md:text-lg text-emerald-100/90 leading-relaxed font-normal"
            >
              Join the <strong>Path to Inner Peace Partner Sphere</strong> across our <strong>10 dedicated verticals</strong> — including Yoga Instructors, Fitness Trainers, Gyms, Psychologists, Wellness Coaches, Corporate HRs, Colleges, and Creators. Self-create your unique Partner Code, recommend life-changing breathwork & CBT programs, and earn high-yield recurring referral rewards.
            </motion.p>

            {/* Primary Action Button Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="pt-2 flex flex-wrap items-center gap-4"
            >
              {/* PRIMARY MANDATED CTA BUTTON */}
              <a
                href={PARTNER_SPHERE_URL}
                target="_blank"
                rel="noopener noreferrer"
                id="hero-register-now-partner-btn"
                className="inline-flex items-center justify-center gap-2.5 px-7 sm:px-9 py-3.5 sm:py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#C89620] text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-98 transition-all cursor-pointer border border-amber-300 group"
              >
                <span>Register Now & Be Our Partner</span>
                <ArrowRight className="w-4 h-4 text-slate-950 group-hover:translate-x-0.5 transition-transform" />
              </a>

              {/* SECONDARY ACTION */}
              <button
                onClick={() => {
                  const target = document.getElementById('verticals-showcase');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950/70 hover:bg-emerald-900/80 text-emerald-100 font-semibold text-sm border border-emerald-700/50 backdrop-blur-xs transition-all cursor-pointer group"
              >
                <span>Explore 10 Partner Verticals</span>
                <ArrowDown className="w-4 h-4 text-amber-300 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={() => handleOpenConsultation(activeInstitutionalTab)}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-transparent hover:bg-white/10 text-emerald-200 font-medium text-xs sm:text-sm border border-emerald-600/40 transition-all cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
                <span>Book Institutional RFP Call</span>
              </button>
            </motion.div>

            {/* Quick Trust Badges */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-y-2 gap-x-6 pt-2 text-xs text-emerald-200/90 font-medium"
            >
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-300" />
                <span>Self-Create Your Partner ID (e.g. P2IP-RAMESH)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BadgePercent className="w-4 h-4 text-amber-300" />
                <span>Flat 50% Commission on All Paid Plans</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Gift className="w-4 h-4 text-amber-300" />
                <span>Instant Activation Reward on Free Plan Signups</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Wallet className="w-4 h-4 text-amber-300" />
                <span>Direct Monthly Bank / UPI Transfers</span>
              </div>
            </motion.div>

          </div>
        </div>

        {/* Value Metrics Bar */}
        <div className="border-t border-emerald-800/40 bg-black/40 backdrop-blur-xs py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-serif font-black text-[#D4AF37]">
                  10 Verticals
                </p>
                <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Specialized Solutions
                </p>
                <p className="text-[11px] sm:text-xs text-emerald-200/80">
                  Yoga, Gyms, Psychologists, HR, Colleges, Creators & more
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-serif font-black text-[#D4AF37]">
                  Flat 50%
                </p>
                <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Paid Plan Commission
                </p>
                <p className="text-[11px] sm:text-xs text-emerald-200/80">
                  Flat 50% on all paid plans + free plan activation rewards
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-serif font-black text-[#D4AF37]">
                  Instant Setup
                </p>
                <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Custom Partner ID
                </p>
                <p className="text-[11px] sm:text-xs text-emerald-200/80">
                  Generate your custom referral code in under 60 seconds
                </p>
              </div>

              <div className="space-y-1">
                <p className="text-2xl sm:text-3xl font-serif font-black text-[#D4AF37]">
                  100% Free
                </p>
                <p className="text-xs sm:text-sm font-bold text-white uppercase tracking-wider">
                  Zero Upfront Cost
                </p>
                <p className="text-[11px] sm:text-xs text-emerald-200/80">
                  Marketing toolkits, client passes & slide decks included
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          HOW REFER & EARN WORKS (3 SIMPLE STEPS)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0B6B53] text-xs font-bold tracking-wider uppercase">
            <Coins className="w-3.5 h-3.5 text-[#0B6B53]" />
            <span>Simple 3-Step Growth Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            How The Refer & Earn Program Works
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Turn your passion for wellness, client relationships, or social following into a rewarding recurring income stream while delivering authentic mental peace.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-110 transition-transform -z-0" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0B6B53] text-amber-300 flex items-center justify-center font-serif font-bold text-lg shadow-md">
                01
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Instant Registration
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Select Vertical & Self-Create Code
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Head to <strong>Partner Sphere</strong> (<a href={PARTNER_SPHERE_URL} target="_blank" rel="noopener noreferrer" className="text-emerald-700 underline font-semibold">p2-ip-partner-sphere.vercel.app</a>), select from our 10 professional verticals, and create your custom Partner Code (e.g. <span className="font-mono text-emerald-800 font-bold">P2IP-RAMESH</span> or <span className="font-mono text-emerald-800 font-bold">PRANA108</span>).
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Key className="w-4 h-4 text-[#D4AF37]" />
              <span>Takes less than 60 seconds • 100% Free</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-50 rounded-full group-hover:scale-110 transition-transform -z-0" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-[#D4AF37] text-slate-950 flex items-center justify-center font-serif font-bold text-lg shadow-md">
                02
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full">
                  Empower Your Circle
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Share Tailored Programs
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Recommend Path to Inner Peace programs to your students, gym members, therapy clients, employees, or followers. We furnish you with professional WhatsApp banners, social copy, and flyer PDFs.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Share2 className="w-4 h-4 text-[#0B6B53]" />
              <span>5-Day Reset, Inner Shift, Career Axis & more</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-white rounded-3xl p-7 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between space-y-6 relative overflow-hidden group">
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-110 transition-transform -z-0" />
            <div className="relative z-10 space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 text-amber-400 flex items-center justify-center font-serif font-bold text-lg shadow-md">
                03
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                  Guaranteed Payouts
                </span>
                <h3 className="font-serif font-bold text-xl text-slate-900">
                  Flat 50% Commission & Activation Rewards
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Earn a <strong>flat 50% direct referral commission</strong> on every paid enrollment (Inner Shift, Inner Revolution, Career Axis, Workshops) PLUS an <strong>instant Activation Reward</strong> every time someone signs up for the free plan / 5-Day Reset with your code.
                </p>
              </div>
            </div>

            <div className="relative z-10 pt-4 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
              <Wallet className="w-4 h-4 text-[#0B6B53]" />
              <span>Monthly automated payouts • Transparent ledger</span>
            </div>
          </div>
        </div>

        {/* Central Register Banner CTA */}
        <div className="text-center pt-2">
          <a
            href={PARTNER_SPHERE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer group"
          >
            <span>Register Now & Be Our Partner</span>
            <ExternalLink className="w-4 h-4 text-amber-300 group-hover:translate-x-0.5 transition-transform" />
          </a>
          <p className="text-xs text-slate-500 mt-2">
            Directly open the Partner Sphere registration portal in a new tab
          </p>
        </div>
      </section>

      {/* =========================================================================
          THE 10 PARTNER VERTICALS SHOWCASE (Matching User Screenshot)
      ========================================================================= */}
      <section id="verticals-showcase" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-10 scroll-mt-20">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold tracking-wider uppercase">
            <Target className="w-3.5 h-3.5 text-amber-700" />
            <span>10 Specialized Verticals</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Tailored Refer & Earn Opportunities by Role
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Every profession interacts with mental stress differently. Select your vertical below to view specific client benefits, recommended curriculums, and earning potential.
          </p>
        </div>

        {/* 10 Verticals Selector Chips / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {REFER_EARN_VERTICALS.map((vertical) => {
            const Icon = vertical.icon;
            const isSelected = selectedVerticalId === vertical.id;
            return (
              <button
                key={vertical.id}
                onClick={() => setSelectedVerticalId(vertical.id)}
                className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#0B6B53] text-white border-[#0B6B53] shadow-md scale-[1.02]'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 shadow-xs'
                }`}
              >
                <div className="space-y-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isSelected ? 'bg-white/20 text-amber-300' : 'bg-emerald-50 text-[#0B6B53]'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-serif font-bold text-xs sm:text-sm leading-tight">
                    {vertical.title}
                  </h4>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-100/30 flex items-center justify-between text-[10px]">
                  <span className={isSelected ? 'text-amber-300 font-semibold' : 'text-slate-500 font-medium'}>
                    {vertical.badge}
                  </span>
                  {isSelected && <Check className="w-3 h-3 text-amber-300" />}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Selected Vertical Spotlight Card */}
        <motion.div
          key={selectedVertical.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-lg"
        >
          <div className="p-6 sm:p-8 lg:p-10 space-y-8">
            
            {/* Top Row: Title, Badge, Code Preview & Primary CTA */}
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    {selectedVertical.badge}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-amber-100 text-amber-800">
                    {selectedVertical.commissionRate}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  {selectedVertical.title} Partner Blueprint
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-normal">
                  {selectedVertical.tagline}
                </p>
              </div>

              {/* Action & Referral Code Pill */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2.5">
                  <Key className="w-4 h-4 text-[#D4AF37]" />
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-500">Sample Partner Code</p>
                    <p className="font-mono font-bold text-xs sm:text-sm text-emerald-800">
                      {selectedVertical.codeExample}
                    </p>
                  </div>
                </div>

                <a
                  href={PARTNER_SPHERE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#C89620] text-slate-950 font-bold text-xs sm:text-sm shadow-md hover:shadow-xl hover:brightness-105 transition-all cursor-pointer border border-amber-300 shrink-0"
                >
                  <span>Register Now & Be Our Partner</span>
                  <ExternalLink className="w-4 h-4 text-slate-950" />
                </a>
              </div>
            </div>

            {/* Middle Grid: Why Partner + Target Audience */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-3">
                  <h4 className="text-base sm:text-lg font-serif font-bold text-slate-900 flex items-center gap-2">
                    <Handshake className="w-4 h-4 text-[#0B6B53]" />
                    <span>Why Partner With Us As a {selectedVertical.title}</span>
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {selectedVertical.whyPartner}
                  </p>
                </div>

                {/* Target Audience / Client Fit */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    Who In Your Circle Will Benefit Most:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedVertical.targetAudience.map((audience, i) => (
                      <div key={i} className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0" />
                        <span>{audience}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Partner Perks Checklist */}
                <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/70 space-y-2.5">
                  <h5 className="text-xs font-bold uppercase tracking-wider text-[#0B6B53] flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#0B6B53]" />
                    <span>Exclusive Partner Perks Included:</span>
                  </h5>
                  <ul className="space-y-1.5 text-xs text-slate-700">
                    {selectedVertical.partnerPerks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Recommended Programs to Refer */}
              <div className="lg:col-span-5 space-y-4 bg-slate-50 rounded-2xl p-5 sm:p-6 border border-slate-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <h4 className="font-serif font-bold text-sm sm:text-base text-slate-900 flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#D4AF37]" />
                    <span>Recommended Programs to Share</span>
                  </h4>
                  <span className="text-[11px] text-emerald-800 font-bold">High Conversion</span>
                </div>

                <div className="space-y-3">
                  {selectedVertical.recommendedPrograms.map((prog, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1 shadow-2xs">
                      <div className="flex items-center justify-between">
                        <p className="font-serif font-bold text-xs sm:text-sm text-slate-900">
                          {prog.name}
                        </p>
                        <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                          Eligible for Comm.
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {prog.description}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-2 text-center">
                  <a
                    href={PARTNER_SPHERE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3 px-4 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                  >
                    <span>Create Your {selectedVertical.title} Partner Code</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
                  </a>
                </div>
              </div>

            </div>

          </div>
        </motion.div>
      </section>

      {/* =========================================================================
          INTERACTIVE REFER & EARN COMMISSION CALCULATOR
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="rounded-3xl bg-gradient-to-br from-[#021811] via-[#052b1e] to-[#021811] text-white p-6 sm:p-10 lg:p-12 border border-emerald-800/40 shadow-xl space-y-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Explanation & Slider */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-900/60 border border-emerald-600/40 text-amber-300 text-xs font-bold uppercase tracking-wider">
                <Calculator className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Partner Earnings Simulator</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
                Simulate Your Monthly Referral Income
              </h2>

              <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
                Enjoy an industry-leading <strong>flat 50% commission</strong> across all paid programs (Inner Shift, Inner Revolution, Career Axis, Workshops), plus <strong>instant activation rewards</strong> on free plan registrations. Commissions scale automatically without any upper cap.
              </p>

              {/* Slider Control */}
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between text-xs sm:text-sm font-semibold text-emerald-200">
                  <span>Estimated Monthly Referrals:</span>
                  <span className="text-xl font-bold text-[#D4AF37] font-mono">
                    {referralCount} Enrollees
                  </span>
                </div>

                <input 
                  type="range"
                  min="2"
                  max="100"
                  step="1"
                  value={referralCount}
                  onChange={(e) => setReferralCount(parseInt(e.target.value, 10))}
                  className="w-full h-2.5 bg-emerald-950 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]"
                />

                <div className="flex justify-between text-[11px] text-emerald-300/70 font-mono">
                  <span>2 (Casual)</span>
                  <span>15 (Part-Time Coach)</span>
                  <span>50 (Studio / Gym)</span>
                  <span>100+ (Enterprise / Creator)</span>
                </div>
              </div>

              {/* Perks Tiers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 rounded-xl bg-emerald-950/70 border border-emerald-700/40 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-amber-300">Bronze Tier (1–5)</p>
                  <p className="text-white font-bold">Flat 50% Commission</p>
                  <p className="text-[11px] text-emerald-200/70">+ Free Plan Activation Reward</p>
                </div>
                <div className="p-3 rounded-xl bg-emerald-900/60 border border-emerald-600/50 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-amber-300">Silver Tier (6–20)</p>
                  <p className="text-white font-bold">Flat 50% Commission</p>
                  <p className="text-[11px] text-emerald-200/70">+ Free App Lifetime Access</p>
                </div>
                <div className="p-3 rounded-xl bg-[#0B6B53]/80 border border-[#D4AF37]/50 space-y-1">
                  <p className="text-[10px] uppercase font-bold text-amber-300">Gold Tier (21+)</p>
                  <p className="text-white font-bold">Flat 50% Commission</p>
                  <p className="text-[11px] text-emerald-200/70">+ Co-Hosted Masterclasses</p>
                </div>
              </div>
            </div>

            {/* Right: Projected Output Box */}
            <div className="lg:col-span-5 bg-black/40 rounded-3xl p-6 sm:p-8 border border-emerald-700/50 backdrop-blur-xs flex flex-col justify-between space-y-6 text-center">
              <div className="space-y-2">
                <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37]">
                  Projected Earnings
                </span>
                <p className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white tracking-tight">
                  ₹{estimatedMonthlyIncome.toLocaleString('en-IN')}
                  <span className="text-base sm:text-lg font-normal text-emerald-200 font-sans"> / mo</span>
                </p>
                <p className="text-xs text-emerald-200/70">
                  Approx. ₹{estimatedYearlyIncome.toLocaleString('en-IN')} annually in passive referral rewards
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-xs text-emerald-100/90 space-y-1 text-left">
                <p className="font-semibold text-amber-300 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>No Caps, No Lock-Ins</span>
                </p>
                <p className="text-[11px] text-emerald-200/80">
                  Commissions credited to your verified bank account on the 1st of every month via Partner Sphere.
                </p>
              </div>

              <a
                href={PARTNER_SPHERE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#C89620] text-slate-950 font-bold text-sm sm:text-base shadow-xl hover:brightness-105 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
              >
                <span>Register Now & Be Our Partner</span>
                <ExternalLink className="w-4 h-4 text-slate-950" />
              </a>

              <p className="text-[11px] text-emerald-300/60">
                Instant self-created partner ID • Zero platform fees
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          CURRENT INSTITUTIONAL DEEP-DIVE CONTENT (PRESERVED & ENHANCED)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0B6B53] text-xs font-bold tracking-wider uppercase">
            <Building2 className="w-3.5 h-3.5 text-[#0B6B53]" />
            <span>Institutional & Enterprise Solutions</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-slate-900 tracking-tight">
            Institutional Programs for Gyms, Colleges & Corporates
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            In addition to individual refer & earn links, we execute large-scale on-site or virtual cohorts, faculty training, and executive workshops.
          </p>
        </div>

        {/* Institutional Category Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {[
            { id: 'gym' as PartnerCategory, label: 'Gyms & Fitness Studios', icon: Dumbbell },
            { id: 'college' as PartnerCategory, label: 'Colleges & Universities', icon: GraduationCap },
            { id: 'corporate' as PartnerCategory, label: 'Corporates & Startups', icon: Building2 },
            { id: 'other' as PartnerCategory, label: 'Communities & Retreats', icon: Handshake }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeInstitutionalTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveInstitutionalTab(tab.id)}
                className={`px-5 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all cursor-pointer ${
                  isSelected 
                    ? 'bg-[#0B6B53] text-white shadow-md' 
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 1. GYM & FITNESS STUDIOS TAB */}
        {activeInstitutionalTab === 'gym' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Gym Featured Hero Card */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Visual Image */}
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-slate-900">
                  <img 
                    src={gymWellnessImage} 
                    alt="Gym and Fitness Studio Somatic Recovery"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="inline-block text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37] text-slate-950 px-2.5 py-0.5 rounded-full">
                      Mind + Muscle Cooldown
                    </span>
                    <p className="text-sm font-medium text-white/90">
                      Transforming gyms from mere calorie-burning rooms into true sanctuaries of vitality and recovery.
                    </p>
                  </div>
                </div>

                {/* Narrative & Solutions */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B53] text-xs font-bold uppercase">
                      <Dumbbell className="w-3.5 h-3.5 text-[#0B6B53]" />
                      <span>Gym & Fitness Studio Partnerships</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                      Elevate Member Retention with Somatic Nervous System Cooldowns
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Most gym members push hard during workouts, leaving in a hyper-aroused sympathetic state that spikes cortisol and impairs sleep. By partnering with Path to Inner Peace, your gym can offer <strong>guided vagus nerve resets, post-workout breathwork, and mental fitness coaching</strong> that dramatically accelerate muscular recovery, prevent burnout, and boost membership retention.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>15-Minute Post-Workout Cooldowns:</strong> Vagus nerve regulation that accelerates tissue repair.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Personal Trainer Mental Conditioning:</strong> Upskill coaches to guide holistic wellbeing.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Digital App Inclusion:</strong> Complimentary 5-day challenge passes for every member.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href={PARTNER_SPHERE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Register Gym on Partner Sphere</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </a>
                    <button
                      onClick={() => handleOpenConsultation('gym', 'Gym & Fitness Studio Partnership')}
                      className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-all"
                    >
                      Book In-Studio Workshop
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Gym Programs Cards */}
            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                Key Offerings for Gyms & Fitness Centers
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {GYM_PROGRAMS.map((prog, idx) => {
                  const Icon = prog.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6B53] flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            {prog.tag}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-slate-900">
                          {prog.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {prog.summary}
                        </p>
                        <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                          {prog.details.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#0B6B53] shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 mt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleOpenConsultation('gym', prog.title)}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0B6B53] text-slate-800 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                        >
                          <span>Inquire for This Module</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 2. COLLEGES & UNIVERSITIES TAB */}
        {activeInstitutionalTab === 'college' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* College Featured Hero Card */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Visual Image */}
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-slate-900">
                  <img 
                    src={collegeWellnessImage} 
                    alt="Colleges and Universities Campus Wellness Workshop"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="inline-block text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37] text-slate-950 px-2.5 py-0.5 rounded-full">
                      Campus Mental Resilience
                    </span>
                    <p className="text-sm font-medium text-white/90">
                      Equipping students with cognitive fortitude, exam calm, and emotional grounding for life.
                    </p>
                  </div>
                </div>

                {/* Narrative & Solutions */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B53] text-xs font-bold uppercase">
                      <GraduationCap className="w-3.5 h-3.5 text-[#0B6B53]" />
                      <span>Higher Education Collaborations</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                      Empowering Students Against Academic Pressure & Career Anxiety
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Students face unprecedented anxiety from competitive exams, placement hurdles, social media comparison, and career uncertainty. Path to Inner Peace conducts lively, experiential campus masterclasses that combine <strong>CBT cognitive clarity, yogic breathwork, and career alignment frameworks</strong> to help students regain emotional poise and academic confidence.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Pre-Exam Calm Sessions:</strong> Rapid calming techniques to prevent test anxiety & memory blocks.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Freshers Induction Masterclasses:</strong> Interactive 90-min auditorium mental reset sessions.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Career Axis Alignment:</strong> 1:1 insights to navigate placement stress and imposter syndrome.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href={PARTNER_SPHERE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Register College on Partner Sphere</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </a>
                    <button
                      onClick={() => handleOpenConsultation('college', 'College & University Campus Partnership')}
                      className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-all"
                    >
                      Request Campus Proposal
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* College Programs Cards */}
            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                Key Offerings for Colleges & Educational Institutions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {COLLEGE_PROGRAMS.map((prog, idx) => {
                  const Icon = prog.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6B53] flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            {prog.tag}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-slate-900">
                          {prog.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {prog.summary}
                        </p>
                        <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                          {prog.details.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#0B6B53] shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 mt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleOpenConsultation('college', prog.title)}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0B6B53] text-slate-800 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                        >
                          <span>Inquire for This Module</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 3. CORPORATES & ENTERPRISES TAB */}
        {activeInstitutionalTab === 'corporate' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-12"
          >
            {/* Corporate Featured Hero Card */}
            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-md">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
                
                {/* Visual Image */}
                <div className="lg:col-span-6 relative min-h-[300px] lg:min-h-[440px] overflow-hidden bg-slate-900">
                  <img 
                    src={corporateBurnoutImage} 
                    alt="Corporate Workplace Stress and Burnout Management"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white space-y-1">
                    <span className="inline-block text-[10px] uppercase font-bold tracking-widest bg-[#D4AF37] text-slate-950 px-2.5 py-0.5 rounded-full">
                      Executive Wellness Architecture
                    </span>
                    <p className="text-sm font-medium text-white/90">
                      Restoring focus, team harmony, and psychological safety in high-pressure workplaces.
                    </p>
                  </div>
                </div>

                {/* Narrative & Solutions */}
                <div className="lg:col-span-6 p-6 sm:p-8 lg:p-10 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B53] text-xs font-bold uppercase">
                      <Building2 className="w-3.5 h-3.5 text-[#0B6B53]" />
                      <span>Corporate & Enterprise Solutions</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 leading-tight">
                      Dismantle Chronic Stress & Sustain Peak Cognitive Performance
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      Meeting fatigue, constant context switching, and emotional wear drain team velocity and lead to silent attrition. We partner with HR leaders, founders, and L&D heads to implement <strong>practical, science-backed wellness routines</strong> that fit into busy corporate calendars without promoting toxic hustle culture.
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Interactive 90-Min Workshops:</strong> High-impact sessions for tech, finance & knowledge workers.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Leadership Resilience Roundtables:</strong> Specialized coaching for managers under pressure.</span>
                      </div>
                      <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                        <span><strong>Flexible Delivery:</strong> Seamless hybrid setups across Zoom/Teams or in-person boardrooms.</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 flex flex-wrap items-center gap-4">
                    <a
                      href={PARTNER_SPHERE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <span>Register Corporate on Partner Sphere</span>
                      <ArrowRight className="w-4 h-4 text-amber-300" />
                    </a>
                    <button
                      onClick={() => handleOpenConsultation('corporate', 'Corporate Wellness Consultation')}
                      className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-all"
                    >
                      Book Corporate Discovery Call
                    </button>
                  </div>
                </div>

              </div>
            </div>

            {/* Corporate Programs Cards */}
            <div className="space-y-4">
              <h4 className="text-lg sm:text-xl font-serif font-bold text-slate-900">
                Key Corporate Wellness Modules
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {CORPORATE_PROGRAMS.map((prog, idx) => {
                  const Icon = prog.icon;
                  return (
                    <div 
                      key={idx}
                      className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-lg hover:border-emerald-300 transition-all flex flex-col justify-between"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6B53] flex items-center justify-center">
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-[10px] font-bold uppercase text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            {prog.tag}
                          </span>
                        </div>
                        <h4 className="font-serif font-bold text-base text-slate-900">
                          {prog.title}
                        </h4>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          {prog.summary}
                        </p>
                        <ul className="space-y-1.5 pt-2 border-t border-slate-100 text-xs text-slate-700">
                          {prog.details.map((bullet, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <Check className="w-3.5 h-3.5 text-[#0B6B53] shrink-0 mt-0.5" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="pt-5 mt-3 border-t border-slate-100">
                        <button
                          onClick={() => handleOpenConsultation('corporate', prog.title)}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-50 hover:bg-[#0B6B53] text-slate-800 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer border border-slate-200"
                        >
                          <span>Request This Program</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* 4. COMMUNITIES & RETREATS TAB */}
        {activeInstitutionalTab === 'other' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-8"
          >
            <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
              <div className="max-w-3xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-[#0B6B53] text-xs font-bold uppercase">
                  <Handshake className="w-3.5 h-3.5 text-[#0B6B53]" />
                  <span>Yoga Studios, Wellness Retreats & NGO Collaborations</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900">
                  Co-Create Transformative Mindful Experiences
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Are you organizing a wellness retreat, running an independent yoga sanctuary, or seeking a keynote speaker on mental health and higher consciousness? We co-host weekend retreats, sound immersion circles, and specialized masterclasses that enrich community experiences.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h5 className="font-serif font-bold text-sm text-slate-900">Weekend Retreat Intensives</h5>
                    <p className="text-xs text-slate-600">Deep-dive somatic breathwork, mindful journaling and contemplative yogic philosophy for retreat guests.</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <h5 className="font-serif font-bold text-sm text-slate-900">Studio Masterclass Pop-Ups</h5>
                    <p className="text-xs text-slate-600">Co-branded 2-hour Saturday masterclasses bringing high-demand nervous system recovery to your studio.</p>
                  </div>
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-4">
                  <a
                    href={PARTNER_SPHERE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3.5 rounded-xl bg-[#0B6B53] hover:bg-[#074737] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Register on Partner Sphere</span>
                    <ArrowRight className="w-4 h-4 text-amber-300" />
                  </a>
                  <button
                    onClick={() => handleOpenConsultation('other', 'Community & Studio Collaboration')}
                    className="px-5 py-3.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm transition-all"
                  >
                    <span>Propose a Collaboration</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

      </section>

      {/* =========================================================================
          FLEXIBLE DELIVERY MODES (Online, Onsite, Hybrid)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="bg-gradient-to-br from-[#032318] via-[#063525] to-[#021811] text-white rounded-3xl p-6 sm:p-10 lg:p-12 border border-emerald-800/40 shadow-xl space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-widest">
              <Globe2 className="w-4 h-4 text-[#D4AF37]" />
              <span>Multi-Format Institutional Flexibility</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white tracking-tight">
              Designed Around Your Campus, Gym or Office
            </h2>
            <p className="text-xs sm:text-sm text-emerald-100/80">
              We understand that modern organizations operate across dynamic schedules. Every module is tailored for seamless in-person engagement or interactive virtual delivery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: 'Live Interactive Masterclasses',
                desc: 'Engaging 60 to 90-minute intensive sessions with immediate physiological breathwork reset.',
                icon: Presentation
              },
              {
                title: 'Multi-Week Progressive Cohorts',
                desc: '3 to 6-week progressive mental stamina and emotional resilience curriculums with weekly check-ins.',
                icon: Clock
              },
              {
                title: 'In-Person Onsite Immersions',
                desc: 'Hands-on experiential workshops in your auditorium, boardroom, or studio facility across India.',
                icon: MapPin
              },
              {
                title: 'Digital 5-Day App Access',
                desc: 'Bulk institutional passes for students, gym members, or employees to access the Path to Inner Peace app.',
                icon: Laptop
              }
            ].map((fmt, idx) => {
              const Icon = fmt.icon;
              return (
                <div 
                  key={idx}
                  className="bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-700/40 hover:border-[#D4AF37]/60 rounded-2xl p-5 transition-all space-y-2.5 backdrop-blur-xs"
                >
                  <div className="w-9 h-9 rounded-lg bg-emerald-800/60 border border-emerald-600/40 flex items-center justify-center text-amber-300 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="font-serif font-bold text-sm sm:text-base text-white">
                    {fmt.title}
                  </h3>
                  <p className="text-xs text-emerald-100/80 leading-relaxed font-normal">
                    {fmt.desc}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-emerald-800/50 text-xs text-emerald-200">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
              <span>
                <strong>Evidence-Informed & Confidential:</strong> Led by Mainak Chatterjee, author, life mentor & mental wellness architect.
              </span>
            </div>
            <a
              href={PARTNER_SPHERE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-amber-400 text-slate-950 font-bold text-xs tracking-wider uppercase transition-colors cursor-pointer shrink-0 inline-flex items-center gap-1.5"
            >
              <span>Join Partner Sphere</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>
      </section>

      {/* =========================================================================
          REFER & EARN FAQ SECTION
      ========================================================================= */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 space-y-8">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-[#0B6B53] text-xs font-bold tracking-wider uppercase">
            <HelpCircle className="w-3.5 h-3.5 text-[#0B6B53]" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-tight">
            Frequently Asked Partner Questions
          </h2>
          <p className="text-sm text-slate-600">
            Everything you need to know about referring, partner codes, and commissions.
          </p>
        </div>

        <div className="space-y-4">
          {REFER_EARN_FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-2">
              <h3 className="font-serif font-bold text-base text-slate-900 flex items-start gap-2">
                <span className="text-[#0B6B53]">Q:</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed pl-5">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          PRIMARY BOTTOM CTA BANNER (Mandated Button Link)
      ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#021811] via-[#093d2e] to-[#032318] text-white p-8 sm:p-12 lg:p-16 border border-emerald-800/40 text-center space-y-6 shadow-2xl"
        >
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="inline-block text-xs uppercase tracking-widest font-bold text-[#D4AF37] bg-emerald-950/80 px-3.5 py-1 rounded-full border border-[#D4AF37]/40">
              Partner Sphere • Official Portal
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              Start Referring & Earning With Path to Inner Peace
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-emerald-100 font-normal leading-relaxed">
              Create your unique custom Partner ID in under 60 seconds. Provide genuine healing to your community, clients, or students — backed by transparent monthly payouts.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            {/* MANDATED CTA BUTTON */}
            <a
              href={PARTNER_SPHERE_URL}
              target="_blank"
              rel="noopener noreferrer"
              id="bottom-register-now-partner-btn"
              className="inline-flex items-center justify-center gap-2.5 px-9 sm:px-12 py-4 rounded-xl bg-gradient-to-r from-[#D4AF37] via-amber-400 to-[#C89620] text-slate-950 font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-98 transition-all cursor-pointer border border-amber-300 group"
            >
              <span>Register Now & be our partner</span>
              <ArrowRight className="w-5 h-5 text-slate-950 group-hover:translate-x-1 transition-transform" />
            </a>

            <button
              onClick={() => handleOpenConsultation(activeInstitutionalTab)}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-100 font-semibold text-sm sm:text-base border border-emerald-700/60 transition-all cursor-pointer"
            >
              <CalendarCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>Schedule Institutional Consultation</span>
            </button>
          </div>

          <p className="text-[11px] sm:text-xs text-emerald-300/80 uppercase tracking-wider font-semibold">
            YOGA • FITNESS • GYMS • PSYCHOLOGISTS • LIFE COACHES • CORPORATE HR • COLLEGES • COMMUNITIES • AFFILIATES • CREATORS
          </p>
        </motion.div>
      </section>

      {/* Partnership Consultation Booking Popup Modal */}
      <PartnerConsultationModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        preselectedCategory={selectedCategoryForModal}
        preselectedProgram={selectedProgram}
      />

    </div>
  );
};
