import { DayLesson, FAQItem, Testimonial, Badge, PricingPlan } from '../types';
import founderMainak from '../assets/images/mainak-chatterjee.jpg';
import avatarKakali from '../assets/images/seeker_kakali_mukherjee_circle.png';
import avatarUjjal from '../assets/images/seeker_ujjal_gayan_circle.png';
import avatarSwati from '../assets/images/seeker_swati_das_circle.png';
import avatarManabendra from '../assets/images/seeker_manabendra_roy_circle.png';
import avatarMoloy from '../assets/images/seeker_moloy_gayan_circle.png';
import avatarBiswajot from '../assets/images/seeker_biswajot_roy_circle.png';
import avatarAmrita from '../assets/images/seeker_amrita_ghosh_circle.png';

export const FOUNDER_INFO = {
  name: 'Mainak Chatterjee',
  title: 'Author, Mind Mastery Coach & Founder',
  achievement: 'Quantum Alchemist & Mindfulness Coach',
  bio: 'Helping people overcome stress, anxiety, emotional pain, relationship struggles, and negative thinking through modern psychology, CBT techniques, mindfulness, meditation, and inner transformation practices.',
  quote: 'Transformation is not about becoming someone new; it is about stripping away the false layers to rediscover your innate inner peace.',
  image: 'https://cdn.corenexis.com/f/H5nVGDp0Fk3.jpg',
  website: 'www.pathtoinnerpeace.in',
  email: 'connect@pathtoinnerpeace.in',
  founderEmail: 'mainak.chatterjee@pathtoinnerpeace.in',
  whatsapp: '+91 91636 70300'
};

export const DAILY_QUOTES = [
  "Peace comes from within. Do not seek it without. – Buddha",
  "Your mind is a sanctuary. Protect it from negative noise.",
  "You cannot stop the waves, but you can learn to surf. – Jon Kabat-Zinn",
  "Between stimulus and response there is a space. In that space is our power to choose. – Viktor Frankl",
  "Every breath is a fresh start to reset your mind and release tension.",
  "Small daily mental resets create monumental life shifts."
];

export const DAYS_DATA: DayLesson[] = [
  {
    dayNumber: 1,
    title: 'Mental Detox',
    subtitle: 'Negative Thought Awareness & Brain De-Cluttering',
    themeColor: '#0B6B53',
    durationMinutes: 30,
    summary: 'Identify subconscious negative loops, quiet cognitive chatter, and begin your brain de-cluttering process with gentle breath awareness.',
    breathingGoalMinutes: 5,
    meditationTrack: {
      title: 'Mind De-Cluttering & Cognitive Clearance Meditation',
      subtitle: 'Gentle Rain with Theta Binaural Tones (6Hz)',
      genre: 'Gentle Rain with Theta Binaural Tones (6Hz)',
      duration: '10:00',
      ambientSound: 'rain',
      soundName: 'Gentle Rain & 6Hz Theta Brainwave',
      audioDescription: 'Soft continuous rainfall overlayed with 6Hz Theta binaural beat frequency (216Hz/222Hz carrier waves) designed for deep cognitive clearance and subconscious mental detox.'
    },
    lessonContent: `Welcome to Day 1 of your 5-Day Mind Reset Challenge!
Today we focus on Mental Detox. Most stress stems from unobserved automatic negative thoughts (ANTs). By bringing conscious awareness to these thought patterns without judgment, you loosen their grip on your nervous system.

Key Principle: You are not your thoughts; you are the observer of your thoughts.`,
    journalPrompts: [
      'What repeating negative thought or worry occupied your mind today?',
      'How does your body physically react when you feel stressed or overwhelmed?',
      'Name 3 things in your immediate environment that bring you comfort.'
    ],
    affirmation: 'I am the calm observer of my thoughts. I let go of what no longer serves my mental peace.',
    keyTakeaways: [
      'Recognize Automatic Negative Thoughts (ANTs) early.',
      'Use 5-minute conscious breath pauses during high-stress moments.',
      'Separate your true identity from temporary mental noise.'
    ]
  },
  {
    dayNumber: 2,
    title: 'Stress Reset',
    subtitle: 'Nervous System Calming & Cortisol Reduction',
    themeColor: '#134E4A',
    durationMinutes: 30,
    summary: 'Activate your parasympathetic nervous system using Box Breathing and somatic stress release exercises to lower cortisol levels.',
    breathingGoalMinutes: 5,
    meditationTrack: {
      title: 'Vagus Nerve Reset & Deep Stress Relief Meditation',
      subtitle: 'Deep Ocean Waves with Solfeggio 528Hz',
      genre: 'Deep Ocean Waves with Solfeggio 528Hz',
      duration: '12:00',
      ambientSound: 'ocean',
      soundName: 'Ocean Waves & 528Hz Solfeggio Tone',
      audioDescription: 'Dynamic ocean tidal swells with a 13-second rhythmic swell cycle, combined with 528Hz Solfeggio Miracle frequency and 136.1Hz Om resonance to lower cortisol and activate vagus nerve soothing.'
    },
    lessonContent: `Day 2 is dedicated to Stress Reset. When stress builds up, your body remains stuck in "fight or flight" mode. Through rhythmic 4-4-4-4 breathing and somatic body scanning, we signal your vagus nerve that you are completely safe.

Key Principle: Changing your breathing pattern instantly signals your brain to lower stress hormones.`,
    journalPrompts: [
      'What was the primary trigger for your stress over the past week?',
      'How did your body feel after completing today\'s 5-minute breathing exercise?',
      'What is one boundary you can set today to protect your time and energy?'
    ],
    affirmation: 'With every exhale, I release all physical tension and surrender to deep relaxation.',
    keyTakeaways: [
      'Understand the Vagus Nerve connection to stress response.',
      'Practice Box Breathing (Inhale 4s, Hold 4s, Exhale 4s, Hold 4s).',
      'Create small sanctuary moments throughout your workday.'
    ]
  },
  {
    dayNumber: 3,
    title: 'Emotional Healing',
    subtitle: 'Forgiveness, Releasing Hurt & Self-Compassion',
    themeColor: '#D4AF37',
    durationMinutes: 30,
    summary: 'Release old emotional weight, practice radical self-forgiveness, and nurture your heart with loving-kindness practices.',
    breathingGoalMinutes: 5,
    meditationTrack: {
      title: 'Heart Center & Emotional Forgiveness Meditation',
      subtitle: 'Pine Forest Solitude with 639Hz Heart Chakra Harmony',
      genre: 'Pine Forest Solitude with 639Hz Heart Chakra Harmony & Bamboo Flute',
      duration: '12:00',
      ambientSound: 'forest',
      soundName: 'Pine Forest & 639Hz Heart Solfeggio',
      audioDescription: 'Whispering pine wind with authentic 639Hz Heart Chakra Solfeggio harmonics and live meditative Pentatonic wood flute melodies to release emotional baggage.'
    },
    lessonContent: `Day 3 brings Emotional Healing. Unprocessed resentment and guilt act like emotional anchors, holding you back from authentic peace. Forgiveness is not about excusing others—it is about freeing yourself from emotional baggage.

Key Principle: Self-compassion is the foundation of lasting emotional strength.`,
    journalPrompts: [
      'Is there a past mistake or person you are still holding resentment toward?',
      'What words of forgiveness and kindness do you need to hear from yourself today?',
      'How can you offer yourself more grace when things don\'t go as planned?'
    ],
    affirmation: 'I release all past grievances and open my heart to radical forgiveness and self-love.',
    keyTakeaways: [
      'Understand that forgiveness is self-liberation.',
      'Replace harsh self-criticism with supportive self-talk.',
      'Nurture your emotional heart with daily gratitude.'
    ]
  },
  {
    dayNumber: 4,
    title: 'Confidence Reset',
    subtitle: 'Overcoming Imposter Syndrome & Identity Shift',
    themeColor: '#0B6B53',
    durationMinutes: 30,
    summary: 'Dismantle self-doubt, reframe limiting beliefs, and step into an empowered self-image grounded in resilience.',
    breathingGoalMinutes: 5,
    meditationTrack: {
      title: 'Radiant Self-Confidence & Inner Worth Meditation',
      subtitle: 'Morning Birdsong with 741Hz Awakening & Alpha Waves',
      genre: 'Morning Birdsong with 741Hz Awakening Frequency & 10Hz Alpha Waves',
      duration: '10:00',
      ambientSound: 'birds',
      soundName: 'Morning Birdsong & 741Hz Alpha Awakening',
      audioDescription: 'Vibrant spring morning bird calls (Robin & Warbler) paired with 741Hz Intuition/Confidence Solfeggio tone and 10Hz Alpha wave pulses for dismantling self-doubt.'
    },
    lessonContent: `Day 4 focuses on Confidence Reset. Confidence is not the absence of fear; it is the deep trust that you can handle whatever arises. By rewriting your core identity statements, you realign your actions with your highest potential.

Key Principle: Your self-worth is inherent and does not depend on external approval.`,
    journalPrompts: [
      'In what area of your life have you been doubting your capabilities?',
      'What are 3 genuine strengths or victories you have achieved in your life?',
      'Describe how your most confident, peaceful self walks into a room.'
    ],
    affirmation: 'I trust my inner wisdom, honor my worth, and step boldly into my power.',
    keyTakeaways: [
      'Catch and reframe "I cannot" thoughts into "I am learning to" statements.',
      'Practice visualization of your confident future self.',
      'Celebrate micro-victories daily.'
    ]
  },
  {
    dayNumber: 5,
    title: 'Subconscious Mind Reprogramming',
    subtitle: 'Neural Conditioning, Limiting Belief Reframing & Lifelong Mastery',
    themeColor: '#D4AF37',
    durationMinutes: 30,
    summary: 'Reprogram deep subconscious belief patterns, anchor lifelong mental clarity, and establish sustainable neural conditioning for peak inner peace.',
    breathingGoalMinutes: 5,
    meditationTrack: {
      title: 'Subconscious Reprogramming & Deep Neural Reset Meditation',
      subtitle: 'Sunrise Meadow with 852Hz Sacred Life Mastery & Harmonic Triad',
      genre: 'Sunrise Meadow with 852Hz Sacred Life Mastery & Harmonic Chords',
      duration: '15:00',
      ambientSound: 'birds',
      soundName: 'Sunrise Meadow & 852Hz Sacred Frequency',
      audioDescription: 'Full dawn meadow soundscape with multi-species bird symphony coupled with 852Hz Spiritual Order Solfeggio frequency and A-Major 432Hz Sacred Triad to imprint deep subconscious tranquility.'
    },
    lessonContent: `Congratulations on reaching Day 5! Today is your Subconscious Mind Reprogramming & Integration Day. You have built momentum, quieted acute stress, and cultivated emotional space. Now we rewire deep subconscious belief patterns and anchor these daily resets into permanent neural pathways.

Key Principle: The subconscious mind learns through repetition, emotion, and alpha-state conditioning. Small daily rituals create permanent inner peace.`,
    journalPrompts: [
      'What old subconscious belief or story are you consciously choosing to replace today?',
      'What daily 10-minute subconscious alignment ritual will you pledge to continue for the next 30 days?',
      'How will your life, relationships, and decisions change when your subconscious mind is calibrated to inner peace?'
    ],
    affirmation: 'My subconscious mind is wired for peace, clarity, and unwavering self-trust.',
    keyTakeaways: [
      'Reprogram subconscious thought triggers with daily neural conditioning.',
      'Anchor deep alpha-state visualizations for emotional sovereignty.',
      'Establish a non-negotiable 10-minute daily subconscious alignment ritual.'
    ]
  }
];

export const ALL_BADGES: Badge[] = [
  {
    id: 'day1-completed',
    title: 'Mental Detox Pioneer',
    description: 'Completed Day 1: Awareness of negative thought loops.',
    icon: 'Sun',
    unlocked: false,
    category: 'challenge'
  },
  {
    id: 'day3-completed',
    title: 'Emotional Healer',
    description: 'Completed Day 3: Practiced forgiveness and self-compassion.',
    icon: 'Heart',
    unlocked: false,
    category: 'challenge'
  },
  {
    id: 'challenge-master',
    title: 'Reset Champion',
    description: 'Completed all 5 Days of the Mind Reset Challenge!',
    icon: 'Award',
    unlocked: false,
    category: 'challenge'
  },
  {
    id: '3-day-streak',
    title: '3-Day Fire Streak',
    description: 'Maintained a 3-day continuous reset streak.',
    icon: 'Flame',
    unlocked: false,
    category: 'streak'
  },
  {
    id: 'zen-master-30',
    title: 'Zen Meditator (30m)',
    description: 'Accumulated 30 total minutes of guided meditation.',
    icon: 'Moon',
    unlocked: false,
    category: 'meditation'
  },
  {
    id: 'breath-master',
    title: 'Breathwork Guru',
    description: 'Completed 3 or more dedicated breathing exercises.',
    icon: 'Wind',
    unlocked: false,
    category: 'mindfulness'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Kakali Mukherjee',
    role: 'Sr. Executive, Antardarshan',
    location: 'Kolkata, India',
    avatar: 'https://aesthetic-tan-eqomvyi8.edgeone.dev/',
    fallbackAvatar: avatarKakali,
    rating: 5,
    text: 'I never imagined such clarity and emotional healing was possible in such a short time. An absolute blessing for my emotional well-being.'
  },
  {
    id: '2',
    name: 'Ujjal Gayan',
    role: 'Facilitator, Antardarshan',
    location: 'Kolkata, India',
    avatar: 'https://used-fuchsia-rde93htk.edgeone.dev/',
    fallbackAvatar: avatarUjjal,
    rating: 5,
    text: 'Whole Program completely changed how I think, feel, and live.'
  },
  {
    id: '3',
    name: 'Swati Das',
    role: 'Coordinator, Antardarshan',
    location: 'West Bengal, India',
    avatar: 'https://net-magenta-haioh5hu.edgeone.dev/',
    fallbackAvatar: avatarSwati,
    rating: 5,
    text: 'My relationship and emotional stability improved a lot.'
  },
  {
    id: '4',
    name: 'Manabendra Roy',
    role: 'Executive, Antardarshan',
    location: 'Kolkata, India',
    avatar: 'https://ethnic-amber-k6lbldsr.edgeone.dev/',
    fallbackAvatar: avatarManabendra,
    rating: 5,
    text: 'I came broken, I left empowered. thanks to Path to Inner peace.'
  },
  {
    id: '5',
    name: 'Moloy Gayan',
    role: 'Executive, Antardarshan',
    location: 'West Bengal, India',
    avatar: 'https://silky-aquamarine-yeaklugg.edgeone.dev/',
    fallbackAvatar: avatarMoloy,
    rating: 5,
    text: 'Within weeks, my stress reduced and my clarity improved. It feels like I finally have control over my life.'
  },
  {
    id: '6',
    name: 'Biswajot Roy',
    role: 'Secretary, Antardarshan',
    location: 'Kolkata, India',
    avatar: 'https://provincial-green-tucj1wp8.edgeone.dev/',
    fallbackAvatar: avatarBiswajot,
    rating: 5,
    text: 'From confusion to clarity, the transformations we have seen during holistic program of Path to Inner Peace are truly remarkable.'
  },
  {
    id: '7',
    name: 'Amrita Ghosh',
    role: 'Owner, Monginis Batanagar',
    location: 'Kolkata, India',
    avatar: 'https://zealous-peach-nh74nijk.edgeone.dev/',
    fallbackAvatar: avatarAmrita,
    rating: 5,
    text: 'Very much satisfied after 3 sessions, I just tell it is really helpful for me..'
  }
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Is the 5-Day Mind Reset Challenge completely free?',
    answer: 'Yes! The 5-Day 30-Minute Mind Reset Challenge is 100% free with no hidden charges or credit card required.'
  },
  {
    question: 'Can beginners with zero meditation experience join?',
    answer: 'Absolutely. The program is specifically structured for beginners and busy professionals. Every session is fully guided step-by-step.'
  },
  {
    question: 'How much time do I need to dedicate daily?',
    answer: 'Only 30 minutes per day! You can complete the sessions at your own pace morning, afternoon, or night.'
  },
  {
    question: 'Will daily recordings and materials be available?',
    answer: 'Yes, you get full access to daily video/audio sessions, breathing guides, journal prompts, and guided tracks in your web dashboard.'
  },
  {
    question: 'Can I access this challenge from my mobile device?',
    answer: 'Yes! Path to Inner Peace is built as a progressive web app (PWA), perfectly optimized for smartphones, tablets, and desktop browsers.'
  },
  {
    question: 'What happens after completing the 5 days?',
    answer: 'You will receive an official verifiable Certificate of Completion and the option to join our premium MindForge 360°™ membership for long-term growth.'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'INNER_SHIFT',
    name: 'Basic Shift',
    tagline: 'Build Your Mental Fitness Foundation',
    priceINR: 199,
    period: 'Monthly Access',
    paymentUrl: 'https://rzp.io/rzp/O6VyUfSW',
    razorpayPlanId: 'plan_TKyyIg8RAcWLUv',
    badge: 'BEGINNER FRIENDLY',
    features: [
      'Foundation Meditation Training',
      'Mindfulness Training',
      'Essential Sound Therapy',
      'Daily Stress Relief Techniques',
      'Overthinking Reset Practices',
      'Weekly Guided Practice Plan',
      'Better Sleep Relaxation Audio',
      'Mental Reset Starter Guide',
      'Monthly Mental Fitness Assessment',
      'Progress Tracking',
      'Community Updates',
      'Digital Certificate of Completion'
    ],
    buttonText: 'Join Now',
    colorScheme: 'emerald'
  },
  {
    id: 'MIND_MASTERY_PRO',
    name: 'MIND MASTERY PRO',
    tagline: 'Accelerate Your Mental Growth',
    priceINR: 499,
    period: 'Monthly Access',
    popular: true,
    badge: 'MOST POPULAR CHOICE',
    paymentUrl: 'https://rzp.io/rzp/Xv7Q6XB',
    features: [
      'Everything in Basic, PLUS:',
      'Advanced Meditation Training',
      'Professional Mindfulness Program',
      'Guided Sound Therapy Sessions',
      'Emotional Balance Practices',
      'Focus & Mental Clarity Training',
      'Weekly LIVE Coaching Sessions',
      'Standard Personal Practice Roadmap',
      'WhatsApp Community Support',
      'MindForge 360°™ Community Access',
      'Exclusive Monthly Workshops',
      'Advanced CBT Exercises',
      'Digital Certificate of Completion'
    ],
    buttonText: 'Upgrade Now (₹499)',
    colorScheme: 'gold'
  },
  {
    id: 'INNER_TRANSFORMATION_ELITE',
    name: 'INNER TRANSFORMATION ELITE',
    tagline: 'Complete Mind Transformation Experience',
    priceINR: 1499,
    period: 'Monthly Access',
    badge: 'LUXURY ELITE MEMBERSHIP',
    paymentUrl: 'https://rzp.io/rzp/x8BS9RM',
    features: [
      'Everything in Pro, PLUS:',
      'Personalized Meditation Program',
      'Personalized Sound Therapy',
      'Advanced Emotional Mastery Practices',
      'Peak Focus & Performance Training',
      'Priority Access to LIVE Sessions',
      'Customized Personal Transformation Roadmap',
      'Priority WhatsApp Support',
      'MindForge 360°™ Inner Circle Access',
      'Advanced Meditation Library',
      'Deep Self-Awareness Practices',
      'Exclusive Premium Masterclasses',
      'Personal Growth Reviews',
      'Premium Certificate of Completion',
      'Early Access to New Programs',
      'Exclusive Member Resources & Bonuses'
    ],
    buttonText: 'Become Elite (₹1499)',
    colorScheme: 'darkEmerald'
  }
];
