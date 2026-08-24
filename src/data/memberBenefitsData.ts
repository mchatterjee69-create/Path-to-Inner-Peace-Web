import { BlogArticle, MagazineIssue, FutureProgram, MemberResource } from '../types';

import articleCbtThoughts from '../assets/images/article_cbt_thoughts_1785772084198.jpg';
import articleSleepVagus from '../assets/images/article_sleep_vagus_1785772098679.jpg';
import articleWorkplaceCalm from '../assets/images/article_workplace_calm_1785772055657.jpg';
import articleEasternWisdom from '../assets/images/article_eastern_wisdom_1785772114552.jpg';

import magAugustCover from '../assets/images/mag_august_cover_1785772169425.jpg';
import magJulyCover from '../assets/images/mag_july_cover_1785772185906.jpg';
import magJuneCover from '../assets/images/mag_june_cover_1785772252849.jpg';

import innerHorizonCover from '../assets/images/inner_horizon_cover_1785774252941.jpg';

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'art-1',
    title: 'Rewiring Automatic Negative Thoughts (ANTs): A CBT Breakthrough',
    excerpt: 'Learn how Cognitive Behavioral Therapy tools allow you to catch negative thought loops in under 90 seconds before they hijack your nervous system.',
    category: 'CBT Wisdom',
    author: 'Mainak Chatterjee',
    readTime: '5 min read',
    date: 'August 1, 2026',
    imageUrl: articleCbtThoughts,
    featured: true,
    content: `
# Rewiring Automatic Negative Thoughts (ANTs)

Have you ever noticed how a single passing thought can trigger a cascade of anxiety, tightness in your chest, or hours of overthinking? 

In Cognitive Behavioral Therapy (CBT), these intrusive impulses are known as **Automatic Negative Thoughts (ANTs)**. They occur instantaneously without conscious choice, rooted in old survival mechanisms and subconscious conditioning.

### The 3-Step CBT De-Activation Protocol

1. **Catch & Label the ANT**
   When anxiety strikes, refrain from identifying with it. Instead of thinking *"I am failing,"* mentally state *"My mind is generating a failure-catastrophizing thought."* This creates instant cognitive distance.

2. **Test the Evidence**
   Ask yourself:
   - *Is this thought 100% true right now?*
   - *What objective evidence contradicts this fear?*
   - *What is a more balanced, compassionate perspective?*

3. **Somatic Reset**
   Take two slow, deep diaphragm breaths—extending your exhale longer than your inhale—to signal safety to your vagus nerve.

---
*Practice this protocol daily in your MindForge 360°™ Journal for optimal mental resilience.*
`
  },
  {
    id: 'art-2',
    title: 'The Science of Vagus Nerve Stimulation & Deep Sleep',
    excerpt: 'Explore how targeted breathwork frequencies activate the parasympathetic nervous system for restorative sleep and zero brain fog.',
    category: 'Sleep & Recovery',
    author: 'Mainak Chatterjee',
    readTime: '6 min read',
    date: 'July 26, 2026',
    imageUrl: articleSleepVagus,
    featured: false,
    content: `
# Vagus Nerve & Sleep Synchronization

The vagus nerve is the primary highway of your parasympathetic nervous system—the body's internal "rest and digest" control system.

### Why Evening Stress Destroys Sleep Quality
High evening cortisol levels inhibit melatonin production and prevent your brain from entering deep Delta wave restorative cycles.

### The 4-7-8 Nighttime Breathing Method
- Inhale quietly through your nose for **4 seconds**.
- Hold your breath gently for **7 seconds**.
- Exhale completely through your mouth with a soft "whoosh" for **8 seconds**.
- Repeat for 4 full cycles before bed.

By practicing this alongside our binaural theta soundscapes, you reduce sleep latency by up to 60%.
`
  },
  {
    id: 'art-3',
    title: 'Emotional Mastery in High-Pressure Workplaces',
    excerpt: 'Maintain calm, centered composure during intense meetings, conflicts, and tight deadlines with micro-mindfulness pauses.',
    category: 'Stress Relief',
    author: 'Mainak Chatterjee',
    readTime: '4 min read',
    date: 'July 18, 2026',
    imageUrl: articleWorkplaceCalm,
    featured: false,
    content: `
# Maintaining Composure Under Fire

High performance does not require high tension. Emotional mastery is the skill of remaining relaxed in your physical body while your mind stays sharp and focused.

### The Micro-Pause Strategy
Before responding to an escalating email or stressful message:
- Unclench your jaw and relax your shoulders.
- Feel your feet firmly grounded on the floor.
- Take one conscious breath before speaking.

This single second of awareness prevents reactive amygdala hijacking and establishes executive leadership presence.
`
  },
  {
    id: 'art-4',
    title: 'Bridging Eastern Wisdom & Cognitive Psychology',
    excerpt: 'Discover why ancient meditative practices match modern neuroscience principles of neuroplasticity and neural rewiring.',
    category: 'Spiritual Growth',
    author: 'Mainak Chatterjee',
    readTime: '7 min read',
    date: 'July 10, 2026',
    imageUrl: articleEasternWisdom,
    featured: true,
    content: `
# Eastern Wisdom Meets Modern Neuroscience

For thousands of years, Vedic sages and Buddhist scholars emphasized that *mind is everything*. Modern neuroimaging now validates what ancient masters knew through direct experience:

### Neuroplasticity in Action
- **Prefrontal Cortex Expansion**: 8 weeks of consistent 10-minute daily meditation increases grey matter density in areas responsible for emotional regulation and decision making.
- **Amygdala Shrinkage**: The brain's fear and stress center physically reduces in volume with consistent mindfulness practice.

At *Path to Inner Peace*, we fuse these spiritual traditions with practical cognitive tools so you achieve measurable, permanent internal freedom.
`
  }
];

export const MAGAZINE_ISSUES: MagazineIssue[] = [
  {
    id: 'mag-inner-horizon-01',
    issueNumber: 'Issue 01 • August 2026',
    title: 'INNER HORIZON: The Science of Inner Peace',
    monthYear: 'August 2026 Launch Edition',
    coverImageUrl: 'https://plain-apac-prod-public.komododecks.com/202608/24/7FUZEA9VKa2YWPBYl9zz/image.jpg',
    description: 'The official launch issue of Path to Inner Peace magazine. 31 pages of evidence-based neuroscience, CBT frameworks, expert columns, and daily reflection toolkits.',
    topics: [
      'The Science of Inner Peace',
      'CBT & Brain Neuroplasticity',
      'Self-Compassion & Healing',
      'Relationship & Career Clarity',
      '7-Day Inner Peace Challenge'
    ],
    highlights: [
      'From the Editor’s Desk by Mainak Chatterjee (Founder & Editor)',
      'The Neuroscience of Meditation & Stress Biology (Prefrontal Cortex vs Amygdala)',
      'Feature: CBT - Changing Thoughts, Changing Life',
      'Feature: The Power of Self-Compassion by Moytree Bandyopadhyay',
      'Feature: Emotional Healing & Releasing Weight by Tanutra Bhattacharjee',
      'Feature: Relationship Toolkit & 5 Pillars by Sourav Mukherjee',
      'Ask The Experts: Wellness & Spiritual Q&A with Juneli Das & Tarun Goswami',
      '7-Day Inner Peace Challenge & Printable Reflection Journal'
    ],
    pdfUrl: 'https://conscious-gold-2gld9uka.edgeone.dev',
    editorsNote: `Dear Readers,

It gives me immense joy and gratitude to welcome you to the very first issue of Inner Horizon.

Inner Horizon is not just a magazine—it is a movement towards conscious living, emotional well-being, mental clarity and spiritual awakening. It is born out of a simple yet powerful belief—that true transformation begins within.

In today's fast-paced world, we are constantly pulled in a hundred directions. Our minds are overloaded, our hearts heavy, and our souls often feel disconnected. This magazine is our humble attempt to pause, reflect, and realign—with ourselves, with others, and with life itself.

Each month, we will bring you insightful articles, expert perspectives, practical tools, and real-life stories to support you on your journey of inner growth and outer impact.

With peace, purpose and gratitude,
Mainak Chatterjee
Editor & Founder, Path to Inner Peace`
  },
  {
    id: 'mag-aug-2026',
    issueNumber: 'Vol. 12 • August 2026',
    title: 'Rewiring the Anxious Mind: The Inner Peace Blueprint',
    monthYear: 'August 2026',
    coverImageUrl: magAugustCover,
    description: 'An exclusive 36-page digital edition containing deep-dive articles, CBT workbooks, guest interviews, and daily mindfulness protocols by Mainak Chatterjee.',
    topics: ['CBT Anxiety Elimination', 'Somatic Breathwork Protocols', 'Sound Healing Science', 'Daily Calm Routines'],
    highlights: [
      'Cover Story: Breaking Free From Chronic Overthinking',
      'Special Report: The 10-Minute Evening Reset for Deep Sleep',
      'Guided Audio Supplement: 432Hz Miracle Frequency Soundscape',
      'Exclusive Q&A with Founder Mainak Chatterjee'
    ],
    pdfUrl: '#download-august-magazine',
    editorsNote: `Welcome to the August 2026 issue of the Inner Transformation Digital Magazine!
    
In this edition, we unpack the exact steps to conquer subconscious anxiety loops. Mental peace is not a gift bestowed upon a lucky few—it is a trainable psychological skill. Explore our guided CBT worksheets, sound therapy breakdowns, and daily reflection blueprints.`
  },
  {
    id: 'mag-jul-2026',
    issueNumber: 'Vol. 11 • July 2026',
    title: 'The Art of Unshakable Emotional Resilience',
    monthYear: 'July 2026',
    coverImageUrl: magJulyCover,
    description: 'Discover how to navigate life transitions, heartbreak, workplace pressure, and burnout with deep inner stillness.',
    topics: ['Burnout Prevention', 'Relationship Healing', 'Mindful Leadership', 'Vedic Wisdom'],
    highlights: [
      'Mastering Emotional Detachment without Apathy',
      'Healing Relationship Triggers through CBT & Self-Compassion',
      'The 5-Day Inner Shift Transformation Journal'
    ],
    pdfUrl: '#download-july-magazine',
    editorsNote: `Resilience is not about pushing through exhaustion. True resilience is soft, fluid, and grounded. In this July issue, we share transformative tools to help you stay peaceful in the midst of life's unpredictable storms.`
  },
  {
    id: 'mag-jun-2026',
    issueNumber: 'Vol. 10 • June 2026',
    title: 'Peak Focus, Mental Clarity & Brain Health',
    monthYear: 'June 2026',
    coverImageUrl: magJuneCover,
    description: 'Optimize cognitive stamina, eliminate brain fog, and master deep work focus states with evidence-based protocols.',
    topics: ['Neuro-Focus', 'Digital Detox', 'Binaural Beats', 'Morning Rituals'],
    highlights: [
      'How to Reclaim 2 Hours of Daily Attention from Smartphone Addiction',
      'The Gamma Waves Focus Protocol',
      'Nutritional Foundations for Mental Clarity'
    ],
    pdfUrl: '#download-june-magazine',
    editorsNote: `Attention is your most valuable currency. When you master your attention, you master your life experience. Dive into this edition to declutter your digital and mental workspace.`
  }
];

export const FUTURE_PROGRAMS: FutureProgram[] = [
  {
    id: 'prog-1',
    title: '7-Day Advanced Chakra Sound Healing & Mind Reset Intensive',
    subtitle: 'A Live Online Transformation Experience with Mainak Chatterjee',
    date: 'August 20 - August 26, 2026',
    time: '7:30 PM - 8:30 PM IST (Daily Live)',
    location: 'Path to Inner Peace Live Zoom Portal',
    instructor: 'Mainak Chatterjee',
    category: 'Intensive',
    description: 'An immersive 7-day live experience designed to dissolve deep-seated emotional blockages, balance your 7 energy centers (chakras), and align your nervous system with custom sound healing frequencies.',
    highlights: [
      '7 Live 60-minute sessions with live Q&A',
      'Custom 528Hz & 432Hz Sound Immersion Recordings',
      'Downloadable Energy Alignment Workbook',
      'Direct WhatsApp Mentorship Group Access'
    ],
    isExclusive: true,
    capacity: '100 Members Only',
    registeredCount: 78,
    userRsvp: false,
    imageUrl: articleEasternWisdom
  },
  {
    id: 'prog-2',
    title: 'MindForge 360°™ Masterclass: Conquering Fear & Imposter Syndrome',
    subtitle: 'Interactive VIP Group Coaching Session',
    date: 'September 5, 2026',
    time: '11:00 AM - 1:00 PM IST',
    location: 'Private Inner Circle Stream',
    instructor: 'Mainak Chatterjee',
    category: 'Masterclass',
    description: 'Unpack the psychological roots of imposter syndrome, fear of judgment, and self-sabotage. Learn actionable CBT exercises to step into confident self-authorship.',
    highlights: [
      'Live Cognitive Restructuring Demonstrations',
      'Peer Mastermind & Group Breakout Exercises',
      'Lifetime Access to Session HD Recording',
      'Digital Certificate of Participation'
    ],
    isExclusive: true,
    capacity: '50 Members Only',
    registeredCount: 39,
    userRsvp: false,
    imageUrl: articleCbtThoughts
  },
  {
    id: 'prog-3',
    title: 'Annual Inner Peace Silent Meditation Retreat 2026',
    subtitle: 'Himalayan Foothills (Rishikesh) & Hybrid Online Experience',
    date: 'October 15 - October 18, 2026',
    time: '4-Day Immersive Retreat',
    location: 'Rishikesh Campus & Virtual VR Stream',
    instructor: 'Mainak Chatterjee & Guest Masters',
    category: 'Retreat',
    description: 'Disconnect from the noisy outer world and step into 4 days of silence, sacred sound immersion, riverbank meditation, and profound self-realization.',
    highlights: [
      'Guided Noble Silence & Mindful Walking',
      'Daily Ganga Aarti & Sacred Sound Baths',
      'Personal 1-on-1 Spiritual Guidance Session',
      'Organic Sattvic Meals & Accommodations Included'
    ],
    isExclusive: false,
    capacity: '30 Physical Seats / Unlimited Virtual',
    registeredCount: 22,
    userRsvp: false,
    imageUrl: articleSleepVagus
  }
];

export interface WelcomeKitItem {
  id: string;
  number: number;
  title: string;
  description: string;
  category: string;
  tag: string;
}

export const WELCOME_KIT_ITEMS: WelcomeKitItem[] = [
  {
    id: 'wk-1',
    number: 1,
    title: 'Mental Fitness Assessment',
    description: 'understand where your mind fitness stand',
    category: 'Assessment',
    tag: 'Core Diagnostic'
  },
  {
    id: 'wk-2',
    number: 2,
    title: 'Personalised Mind Report',
    description: 'Get your Custom Mind Insights & Mental Fitness Score',
    category: 'Report',
    tag: 'Personalized Insights'
  },
  {
    id: 'wk-3',
    number: 3,
    title: '5 Minute Stress Reset Audio',
    description: 'Calm your mind, anytime, anywhere',
    category: 'Audio Therapy',
    tag: 'Fast Relief'
  },
  {
    id: 'wk-4',
    number: 4,
    title: 'Better Sleep Blueprint',
    description: 'Sleep deeper. Wake up refreshed',
    category: 'Sleep Science',
    tag: 'Restorative Protocol'
  },
  {
    id: 'wk-5',
    number: 5,
    title: 'Mental Reset Starter Guide',
    description: 'Simple steps to reset your mind daily',
    category: 'Daily Guide',
    tag: 'Starter Playbook'
  }
];

export const MEMBER_RESOURCES: MemberResource[] = [
  {
    id: 'res-1',
    title: 'Mental Fitness Assessment',
    type: 'pdf',
    size: 'Included',
    description: 'understand where your mind fitness stand',
    downloadUrl: '#'
  },
  {
    id: 'res-2',
    title: 'Personalised Mind Report',
    type: 'pdf',
    size: 'Included',
    description: 'Get your Custom Mind Insights & Mental Fitness Score',
    downloadUrl: '#'
  },
  {
    id: 'res-3',
    title: '5 Minute Stress Reset Audio',
    type: 'audio',
    size: 'Included',
    description: 'Calm your mind, anytime, anywhere',
    downloadUrl: '#'
  },
  {
    id: 'res-4',
    title: 'Better Sleep Blueprint',
    type: 'pdf',
    size: 'Included',
    description: 'Sleep deeper. Wake up refreshed',
    downloadUrl: '#'
  },
  {
    id: 'res-5',
    title: 'Mental Reset Starter Guide',
    type: 'pdf',
    size: 'Included',
    description: 'Simple steps to reset your mind daily',
    downloadUrl: '#'
  }
];
