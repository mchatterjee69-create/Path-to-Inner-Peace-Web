import React, { useState } from 'react';
import { 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Heart, 
  Share2, 
  ChevronRight, 
  ShoppingBag, 
  ShoppingCart, 
  Package, 
  Award, 
  Sparkles, 
  Info, 
  CheckCircle2, 
  X, 
  CreditCard, 
  Smartphone, 
  Lock, 
  ThumbsUp, 
  MessageSquare,
  Search,
  BookOpen,
  Music,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import journalPhoto from '../../assets/images/inner_healing_journal_1790660025558.jpg';
import singingBowlPhoto from '../../assets/images/tibetan_singing_bowl_1790660045207.jpg';
import innerAlgorithmPhoto from '../../assets/images/inner_algorithm_book_1790661685776.jpg';
import tshirtPhoto from '../../assets/images/inner_peace_tshirt_1790662367932.jpg';
import malaPhoto from '../../assets/images/sandalwood_japa_mala_1790662384710.jpg';
import incensePhoto from '../../assets/images/brass_lotus_incense_1790662400266.jpg';
import cushionPhoto from '../../assets/images/zafu_meditation_cushion_1790662441124.jpg';

interface ProductFormat {
  id: string;
  name: string;
  badge: string;
  price: number;
  mrp: number;
  deliveryText: string;
  description: string;
}

interface ProductItem {
  id: string;
  title: string;
  subtitle: string;
  authorOrMaker: string;
  category: string;
  badge: string;
  rating: number;
  ratingCount: number;
  boughtCount: string;
  imageUrl: string;
  amazonUrl?: string;
  formats: ProductFormat[];
  specs: { label: string; value: string }[];
  bulletPoints: string[];
  reviews: {
    id: string;
    name: string;
    date: string;
    rating: number;
    title: string;
    comment: string;
    verified: boolean;
    helpfulCount: number;
  }[];
}

const PRODUCTS: ProductItem[] = [
  {
    id: 'prod-journal',
    title: '21-Day Inner Healing Journal: A Guided Daily Journey to Release, Reconnect, Rebuild & Transform',
    subtitle: 'Official MindForge 360°™ Workbook by Mainak Chatterjee',
    authorOrMaker: 'Mainak Chatterjee (Founder, Path to Inner Peace)',
    category: 'Journals & Workbooks',
    badge: '#1 Best Seller in Mental Wellness & Meditation',
    rating: 4.9,
    ratingCount: 1482,
    boughtCount: '500+ bought in past month',
    imageUrl: journalPhoto,
    formats: [
      {
        id: 'hardcopy',
        name: 'Hard Copy',
        badge: 'Deluxe Spiral-Bound',
        price: 199,
        mrp: 499,
        deliveryText: 'FREE Doorstep Delivery in 3-5 business days',
        description: 'Premium physical spiral-bound workbook with 120 GSM bleed-proof ivory paper, gold foil accents, and lay-flat wire binding.'
      },
      {
        id: 'webapp',
        name: 'Web & Application',
        badge: 'Cloud Sync & Mobile App',
        price: 299,
        mrp: 699,
        deliveryText: 'Instant Digital Access on Web & Android/iOS App',
        description: 'Interactive digital portal with daily guided prompts, cloud mood journal, daily streak badges, and biometric relaxation audio integration.'
      },
      {
        id: 'pdf',
        name: 'Interactive PDF',
        badge: 'Fillable Tablet & GoodNotes',
        price: 399,
        mrp: 899,
        deliveryText: 'Instant One-Click Download + Lifetime Updates',
        description: 'Interactive hyperlinked PDF workbook with fillable text forms, clickable daily navigation, fully optimized for iPad, Android tablets, Kindle, and Apple Pencil.'
      }
    ],
    bulletPoints: [
      'RELEASE & RECONNECT: A science-backed 21-day self-reflection protocol engineered by Mainak Chatterjee to dismantle overthinking, emotional fatigue, and subconscious tension.',
      'TARGETED 5-PILLAR ARCHITECTURE: Features structured daily routines for Greater Self-Awareness, Emotional Balance, Healthier Relationships, Positive Habits, and a Meaningful Life.',
      'MINDFORGE 360°™ CBT PROTOCOLS: Includes morning intention priming, afternoon cognitive resets, and evening gratitude grounding with somatic breathwork cues.',
      'PREMIUM ARTISAN QUALITY: Printed on archival-grade 120 GSM paper with a durable double-wire spiral spine that opens 360° flat on any desk or nightstand.',
      'EXCLUSIVE BONUS CONTENT: Includes scanned QR codes for companion binaural audio soundscapes and instant access to the Path to Inner Peace community.'
    ],
    specs: [
      { label: 'Author', value: 'Mainak Chatterjee (Founder, Path to Inner Peace)' },
      { label: 'Publisher', value: 'Path to Inner Peace Publications' },
      { label: 'Language', value: 'English (Clear, Beginner Friendly)' },
      { label: 'Edition', value: 'Official 1st Edition (2026)' },
      { label: 'Print Length', value: '120 Illustrated Pages' },
      { label: 'Format Dimensions', value: '8.5 x 11 inches (A4 Deluxe Workbook)' },
      { label: 'Paper Quality', value: '120 GSM Bleed-Proof Natural Ivory Paper' },
      { label: 'Binding', value: 'Double-Loop Metal Spiral Lay-Flat Binding' },
      { label: 'Cover Finish', value: 'Matte Soft-Touch with Spot UV Gold Emboss' },
      { label: 'Country of Origin', value: 'India' }
    ],
    reviews: [
      {
        id: 'rev-1',
        name: 'Priya Mukherjee',
        date: 'September 24, 2026',
        rating: 5,
        title: 'Life changing workbook — the paper quality and prompts are exceptional!',
        comment: 'I ordered the Hard Copy after attending Day 1 of the 5-day challenge. The physical journal is magnificent. The 120 GSM paper means my ink doesn’t bleed through at all. Doing the 10-minute morning prompt before checking my phone has completely eliminated my morning anxiety spikes.',
        verified: true,
        helpfulCount: 84
      },
      {
        id: 'rev-2',
        name: 'Dr. Rajesh Sundaram',
        date: 'September 19, 2026',
        rating: 5,
        title: 'Scientific, structured, and profoundly therapeutic',
        comment: 'As a practicing clinician, I often see patients struggling with unstructured journaling. Mainak’s 21-day framework provides cognitive guardrails rooted in CBT and somatic grounding. The Interactive PDF works seamlessly on my iPad with Apple Pencil.',
        verified: true,
        helpfulCount: 52
      },
      {
        id: 'rev-3',
        name: 'Ananya Sharma',
        date: 'September 12, 2026',
        rating: 5,
        title: 'Best Rs. 199 I have ever invested in my mental health',
        comment: 'The prompts feel like having Mainak guiding you through your emotional blocks in private. The sunrise cover art is inspiring, and the habit tracker helps me stay accountable every single night.',
        verified: true,
        helpfulCount: 41
      }
    ]
  },
  {
    id: 'prod-bowl',
    title: 'Authentic Handcrafted Tibetan Singing Bowl Set (4.5" 7-Metal Himalayan Bronze Alloy, 432 Hz Resonant Frequency)',
    subtitle: 'Includes Dual-Ended Suede Wooden Striker & Hand-Sewn Brocade Silk Ring Cushion',
    authorOrMaker: 'Handcrafted by Traditional Himalayan Artisans',
    category: 'Sound Healing & Meditation',
    badge: "Founder's Choice for Tibetan Singing Bowl",
    rating: 4.9,
    ratingCount: 894,
    boughtCount: '300+ bought in past month',
    imageUrl: singingBowlPhoto,
    formats: [
      {
        id: 'bowl-set',
        name: 'Complete Artisan Set',
        badge: 'Bowl + Striker + Brocade Cushion',
        price: 900,
        mrp: 1899,
        deliveryText: 'FREE Express Doorstep Delivery in 2-4 business days',
        description: 'Includes hand-hammered 4.5" antique bronze singing bowl, custom wooden striker with suede leather rim, hand-sewn brocade ring cushion, and quickstart sound guide.'
      }
    ],
    bulletPoints: [
      'AUTHENTIC 7-METAL ALLOY: Hand-hammered by master Himalayan metalworkers using traditional bronze and brass acoustic alloys for rich, lingering harmonic overtones.',
      'TUNED TO 432 HZ HEALING FREQUENCY: Emits a deeply calming, low-distortion acoustic chime that stimulates Alpha and Theta brainwaves to soothe an overactive nervous system.',
      'DUAL-SIDED STRIKER MALLET: Solid hardwood mallet featuring one smooth wooden edge for crisp bell strikes and one plush suede wrap for warm, sustained singing friction.',
      'HAND-SEWN BROCADE SILK CUSHION: Traditional round donut cushion stabilizes the bowl while in use and isolates acoustic vibration from dampening table surfaces.',
      'IDEAL FOR MEDITATION & YOGA: Perfect for chakra alignment, sound baths, yoga studio sessions, deep relaxation pauses, and office desk stress resets.'
    ],
    specs: [
      { label: 'Bowl Diameter', value: '4.5 inches (11.5 cm)' },
      { label: 'Bowl Weight', value: 'approx. 420 grams' },
      { label: 'Material', value: 'Hand-hammered 7-metal acoustic bronze & brass alloy' },
      { label: 'Tuned Frequency', value: '432 Hz (Heart & Mind Chakra Harmonic)' },
      { label: 'Mallet Length', value: '5 inches solid teakwood with premium suede' },
      { label: 'Cushion', value: 'Hand-embroidered silk brocade ring cushion (crimson/gold)' },
      { label: 'Craftsmanship', value: '100% Traditional Handcrafted Himalayan Artisanship' },
      { label: 'Included Items', value: '1x Bowl, 1x Striker Mallet, 1x Brocade Cushion, 1x Meditation Guide' },
      { label: 'Country of Origin', value: 'India / Himalayan Region' }
    ],
    reviews: [
      {
        id: 'rev-b1',
        name: 'Vikramaditya Sen',
        date: 'September 22, 2026',
        rating: 5,
        title: 'Deep, sustained resonance — rings for over 45 seconds!',
        comment: 'I was blown away by the sonic quality for just ₹900. When you glide the suede striker around the rim, it starts humming with a deep, rich vibration that you can literally feel in your chest. Arrived safely packaged in 3 days.',
        verified: true,
        helpfulCount: 79
      },
      {
        id: 'rev-b2',
        name: 'Sunita Ghosh',
        date: 'September 15, 2026',
        rating: 5,
        title: 'Beautiful craftsmanship and authentic brass tone',
        comment: 'My meditation corner looks and feels complete now. The tone instantly calms my thoughts whenever I sit down after a chaotic work day. Very easy to sing even for complete beginners.',
        verified: true,
        helpfulCount: 38
      }
    ]
  },
  {
    id: 'prod-algorithm',
    title: 'The Inner Algorithm: Journey from Chaos to Consciousness',
    subtitle: 'A Step-by-Step Blueprint to Rewire Subconscious Patterns, Master Mindfulness & Awaken Inner Stillness',
    authorOrMaker: 'Mainak Chatterjee (Founder, Path to Inner Peace)',
    category: 'Books & Philosophy',
    badge: '#1 New Release in Cognitive Psychology & Meditation',
    rating: 4.9,
    ratingCount: 1246,
    boughtCount: '400+ bought in past month',
    imageUrl: innerAlgorithmPhoto,
    amazonUrl: 'https://www.amazon.in/Inner-Algorithm-Journey-Chaos-Consciousness-ebook/dp/B0GYX4MKQ5?dplnkId=ef66a2ab-da84-4a7e-98cd-f17124566710',
    formats: [
      {
        id: 'kindle',
        name: 'Kindle Edition',
        badge: 'Instant Digital eBook',
        price: 149,
        mrp: 449,
        deliveryText: 'Instant One-Click Delivery to your Kindle App / Device',
        description: 'Instant digital edition compatible with Kindle e-readers, Kindle iOS/Android apps, iPad, and web reader with adjustable typography & night mode.'
      },
      {
        id: 'paperback',
        name: 'Paperback',
        badge: 'Classic Print Edition',
        price: 299,
        mrp: 599,
        deliveryText: 'FREE Doorstep Delivery in 2-4 business days',
        description: 'High-quality trade paperback printed on eye-comfort cream paper with matte velvet cover lamination and chapter reflection workbooks.'
      },
      {
        id: 'hardcover',
        name: 'Hardcover',
        badge: "Collector's Founder Edition",
        price: 499,
        mrp: 899,
        deliveryText: 'FREE Expedited Courier in 2-3 business days',
        description: "Deluxe hardcover collector's edition with gold foil debossing, satin ribbon page marker, and personally signed author note by Mainak Chatterjee."
      }
    ],
    bulletPoints: [
      'BREAK FREE FROM THE CHAOS LOOP: Discover why the modern human brain defaults to hyper-vigilance, overthinking, and emotional exhaustion—and how to intentionally recode those neural circuits.',
      'THE INNER ALGORITHM PROTOCOL: A pragmatic, non-dogmatic methodology combining Cognitive Behavioral Therapy (CBT), neuroplasticity, and mindfulness to unhook from automated reactive scripts.',
      'MASTERING EMOTIONAL DE-ESCALATION: Practical somatic techniques to calm the amygdala within 90 seconds during high-stress conflicts, career decisions, and personal relationship strain.',
      'FROM NOISE TO INNER STILLNESS: Proven meditative practices to transition from chaotic external dependency to deep, unshakeable self-reliance and conscious presence.',
      'INCLUDES COMPANION AUDIO MEDITATIONS: Embedded QR codes throughout chapters give readers instant access to exclusive guided audio sessions recorded by author Mainak Chatterjee.'
    ],
    specs: [
      { label: 'Author', value: 'Mainak Chatterjee' },
      { label: 'Publisher', value: 'Path to Inner Peace Publishing' },
      { label: 'ASIN', value: 'B0GYX4MKQ5' },
      { label: 'Language', value: 'English' },
      { label: 'Print Length', value: '248 Pages' },
      { label: 'Format Dimensions', value: '5.5 x 8.5 inches' },
      { label: 'Item Weight', value: '320 g' },
      { label: 'Categories', value: 'Cognitive Psychology, Meditation, Self-Help, Neuroscience' },
      { label: 'Country of Origin', value: 'India' }
    ],
    reviews: [
      {
        id: 'rev-ia1',
        name: 'Siddharth Roy',
        date: 'September 26, 2026',
        rating: 5,
        title: 'The clearest manual on human consciousness and overthinking I’ve ever read',
        comment: 'Mainak brings an engineer’s precision to spiritual awakening. There is zero fluff. The breakdown of how automated mental loops create unnecessary suffering completely changed how I respond to work stress.',
        verified: true,
        helpfulCount: 68
      },
      {
        id: 'rev-ia2',
        name: 'Meera Deshmukh',
        date: 'September 20, 2026',
        rating: 5,
        title: 'Must read for anyone feeling overwhelmed by modern chaotic life',
        comment: 'I bought the Kindle edition first, read it in two sittings, and immediately ordered the physical copy for my bookshelf. The chapters on emotional de-escalation are pure gold.',
        verified: true,
        helpfulCount: 47
      }
    ]
  },
  {
    id: 'prod-tshirt',
    title: 'Official "Path to Inner Peace" Organic Cotton T-Shirt with Golden Sacred Emblem',
    subtitle: 'Breathable 220 GSM Bio-Washed Combed Cotton with Sacred Golden Emblem (Hero Section Official Logo)',
    authorOrMaker: 'Path to Inner Peace Official Wear',
    category: 'Official Apparel & Merch',
    badge: '#1 Best Seller in Mindful Apparel',
    rating: 4.9,
    ratingCount: 784,
    boughtCount: '600+ bought in past month',
    imageUrl: tshirtPhoto,
    formats: [
      {
        id: 'size-s',
        name: 'Size S (38")',
        badge: 'Small (Chest 38", Length 27")',
        price: 499,
        mrp: 999,
        deliveryText: 'FREE Doorstep Delivery in 2-4 business days',
        description: 'Small size (38" chest) — 100% Super-combed organic cotton featuring the official golden radiant lotus logo.'
      },
      {
        id: 'size-m',
        name: 'Size M (40")',
        badge: 'Medium (Chest 40", Length 28")',
        price: 499,
        mrp: 999,
        deliveryText: 'FREE Doorstep Delivery in 2-4 business days',
        description: 'Medium size (40" chest) — 100% Super-combed organic cotton featuring the official golden radiant lotus logo.'
      },
      {
        id: 'size-l',
        name: 'Size L (42")',
        badge: 'Large (Chest 42", Length 29")',
        price: 499,
        mrp: 999,
        deliveryText: 'FREE Doorstep Delivery in 2-4 business days',
        description: 'Large size (42" chest) — 100% Super-combed organic cotton featuring the official golden radiant lotus logo.'
      },
      {
        id: 'size-xl',
        name: 'Size XL (44")',
        badge: 'Extra Large (Chest 44", Length 30")',
        price: 499,
        mrp: 999,
        deliveryText: 'FREE Doorstep Delivery in 2-4 business days',
        description: 'Extra Large size (44" chest) — 100% Super-combed organic cotton featuring the official golden radiant lotus logo.'
      },
      {
        id: 'size-xxl',
        name: 'Size XXL (46")',
        badge: 'Double XL (Chest 46", Length 31")',
        price: 499,
        mrp: 999,
        deliveryText: 'FREE Doorstep Delivery in 2-4 business days',
        description: 'Double XL size (46" chest) — 100% Super-combed organic cotton featuring the official golden radiant lotus logo.'
      }
    ],
    bulletPoints: [
      'OFFICIAL HERO SECTION SACRED LOGO: Features the exact iconic Path to Inner Peace circular golden emblem with the radiant lotus & sunburst seal printed on the center chest.',
      '100% COMBED ORGANIC COTTON (220 GSM): Premium heavyweight fabric that feels feather-soft, highly breathable, and cooling whether meditating, practicing yoga, or lounging.',
      'DOUBLE BIO-WASHED & PRE-SHRUNK: Treated with eco-conscious bio-enzymes to prevent post-wash shrinkage and eliminate fabric pilling over prolonged wear.',
      'HIGH-DENSITY METALLIC GOLD INK: Specialized heat-cured screen print engineered to endure 100+ machine washes without peeling, fading, or cracking.',
      'UNISEX MODERN COMFORT CUT: Engineered with tubular body construction, reinforced shoulder-to-shoulder taping, and a shape-retaining ribbed Lycra crew neckline.'
    ],
    specs: [
      { label: 'Brand', value: 'Path to Inner Peace Official Wear' },
      { label: 'Emblem Logo', value: 'Official Golden Radiant Lotus (Hero Section Seal)' },
      { label: 'Fit Type', value: 'Unisex Regular Comfort Fit' },
      { label: 'Fabric Composition', value: '100% Super-Combed Bio-Washed Organic Cotton' },
      { label: 'Fabric Weight', value: '220 GSM Heavyweight Premium Weave' },
      { label: 'Collar Style', value: 'Ribbed Crew Neck with Lycra Shape Retention' },
      { label: 'Sleeve Type', value: 'Comfort Half Sleeves' },
      { label: 'Wash Care Instructions', value: 'Machine wash cold inside-out, gentle cycle, do not iron directly on print' },
      { label: 'Country of Origin', value: 'India (Crafted ethically in Tirupur, Tamil Nadu)' }
    ],
    reviews: [
      {
        id: 'rev-ts1',
        name: 'Aakash Verma',
        date: 'September 27, 2026',
        rating: 5,
        title: 'Outstanding fabric quality! The gold lotus emblem is crisp and vibrant',
        comment: 'Received my T-shirt in Size L today. The 220 GSM cotton feels substantially more luxurious than standard branded tees. The gold emblem from the homepage looks majestic in person. Wore it to morning meditation and it feels incredibly breathable.',
        verified: true,
        helpfulCount: 56
      },
      {
        id: 'rev-ts2',
        name: 'Deepa Nambiar',
        date: 'September 25, 2026',
        rating: 5,
        title: 'True to size, super soft bio-washed feel',
        comment: 'The ribbed collar sits perfectly flat without gaping. The black color is deep pitch-black and after the first wash, the golden logo stayed as bright as day one. Great value for ₹499.',
        verified: true,
        helpfulCount: 39
      }
    ]
  },
  {
    id: 'prod-mala',
    title: 'Authentic 108 Natural Sandalwood & Sacred Bodhi Seed Japa Mala Beads (8mm)',
    subtitle: 'Hand-Knotted 108 Bead Meditation Rosary with Traditional Saffron Silk Tassel & Brass Spacers',
    authorOrMaker: 'Handcrafted by Himalayan Spiritual Artisans',
    category: 'Sacred Space & Meditation',
    badge: "Founder's Choice for Meditation Mala",
    rating: 4.9,
    ratingCount: 512,
    boughtCount: '350+ bought in past month',
    imageUrl: malaPhoto,
    formats: [
      {
        id: 'mala-standard',
        name: '108 Mala Beads',
        badge: 'Classic 108 Beads + Silk Tassel',
        price: 549,
        mrp: 1199,
        deliveryText: 'FREE Express Delivery in 2-4 business days',
        description: 'Authentic 108 hand-knotted sandalwood & bodhi seed rosary with guru bead and golden saffron silk tassel.'
      },
      {
        id: 'mala-deluxe',
        name: 'Sacred Duo Set',
        badge: 'Mala + Silk Brocade Pouch',
        price: 649,
        mrp: 1499,
        deliveryText: 'FREE Express Delivery in 2-4 business days',
        description: 'Includes 108 Mala beads plus an embroidered silk brocade storage pouch for travel and daily japa protection.'
      }
    ],
    bulletPoints: [
      'GENUINE AROMATIC SANDALWOOD: Naturally fragrant white sandalwood beads release a delicate, soothing aroma that anchors focus and quietens an overactive mind.',
      '108 SACRED TRADITIONAL COUNT: Exactly 108 natural 8mm beads plus 1 Guru Meru bead, individually hand-knotted to allow smooth, effortless finger movement.',
      'NATURAL HIMALAYAN BODHI SEEDS: Hand-selected authentic bodhi seeds symbolize enlightenment, mental clarity, and spiritual groundedness.',
      'DURABLE REINFORCED CORD: Strung on high-tensile multi-ply sacred thread designed to withstand hundreds of thousands of daily mantra cycles without breaking.',
      'TACTILE MINDFULNESS ANCHOR: Wear as a sacred wrist wrap / necklace or use for japa meditation, conscious breath counts, and somatic anxiety relief.'
    ],
    specs: [
      { label: 'Bead Count', value: '108 Sacred Beads + 1 Guru (Meru) Bead' },
      { label: 'Bead Diameter', value: '8 mm Uniform Spherical Beads' },
      { label: 'Materials', value: 'Natural White Sandalwood, Himalayan Bodhi Seeds, Brass Spacers' },
      { label: 'Tassel', value: 'Pure Saffron Golden Silk Thread' },
      { label: 'Knotting Style', value: 'Hand-knotted between each individual bead' },
      { label: 'Circumference', value: 'Approx. 85 cm (Wearable as necklace or 4-fold wrist wrap)' },
      { label: 'Country of Origin', value: 'India' }
    ],
    reviews: [
      {
        id: 'rev-m1',
        name: 'Kavita Sengupta',
        date: 'September 23, 2026',
        rating: 5,
        title: 'Authentic natural sandalwood fragrance that fills the room',
        comment: 'You can immediately tell this is genuine sandalwood by the delicate woody scent. The hand-knotting makes it so comfortable to rotate between thumb and middle finger during morning chanting. Absolutely divine.',
        verified: true,
        helpfulCount: 42
      }
    ]
  },
  {
    id: 'prod-incense',
    title: 'Handcrafted Antique Brass Lotus Incense Burner & Sacred Organic Herbal Dhoop Set',
    subtitle: 'Detachable 6-Hole Brass Lotus Ash Catcher with 30 Charcoal-Free Sandalwood & Frankincense Cones',
    authorOrMaker: 'Traditional Heritage Brass Artisans',
    category: 'Sacred Space & Meditation',
    badge: 'Top Rated in Aromatherapy & Sacred Decor',
    rating: 4.8,
    ratingCount: 428,
    boughtCount: '250+ bought in past month',
    imageUrl: incensePhoto,
    formats: [
      {
        id: 'incense-standard',
        name: 'Lotus + 30 Dhoop Cones',
        badge: 'Solid Brass Burner + 30 Cones',
        price: 399,
        mrp: 799,
        deliveryText: 'FREE Express Delivery in 2-4 business days',
        description: 'Solid brass lotus burner with 30 organic natural sandalwood and frankincense dhoop cones.'
      },
      {
        id: 'incense-bundle',
        name: 'Sanctum Sanctuary Bundle',
        badge: 'Burner + 30 Cones + Palo Santo',
        price: 499,
        mrp: 999,
        deliveryText: 'FREE Express Delivery in 2-4 business days',
        description: 'Includes brass lotus burner, 30 herbal cones, plus 2 sustainably harvested Peruvian Palo Santo smudge sticks.'
      }
    ],
    bulletPoints: [
      'SOLID VINTAGE BRASS LOTUS: Intricately cast solid brass with 6 tiered incense holes accommodating stick incense, dhoop cones, and coil incense.',
      '100% ORGANIC & CHARCOAL-FREE: Cones made from rolled temple flower petals, pure essential oils, and therapeutic herbs; zero toxic black smoke.',
      'ELEGANT ASH CATCHER: Broad 3.5-inch scalloped brass petal base catches all falling ash cleanly to keep your altar and table pristine.',
      'PURIFIES & ELEVATES ENERGY: Ideal for morning meditation priming, evening wind-down, space clearing, and sound therapy ambiance.',
      'HEIRLOOM CRAFTSMANSHIP: Heavyweight brass that develops a graceful vintage patina over time; easy to rinse and polish.'
    ],
    specs: [
      { label: 'Burner Diameter', value: '3.5 inches (9 cm)' },
      { label: 'Material', value: 'Solid Cast Antique Brass Alloy' },
      { label: 'Holes', value: '6 Multipurpose Caliber Holes (Stick / Cone / Coil)' },
      { label: 'Included Cones', value: '30 Organic Herbal Dhoop Cones' },
      { label: 'Smoke Profile', value: 'Low Smoke / 100% Charcoal-Free & Sulfur-Free' },
      { label: 'Country of Origin', value: 'India' }
    ],
    reviews: [
      {
        id: 'rev-in1',
        name: 'Gaurav Banerjee',
        date: 'September 21, 2026',
        rating: 5,
        title: 'Heavy solid brass, catches all ash and looks gorgeous',
        comment: 'No more messy ash scattered across my meditation altar. The brass has a wonderful antique sheen, and the dhoop cones smell genuinely calming without any harsh chemical smoke.',
        verified: true,
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'prod-cushion',
    title: 'Ergonomic Zafu Meditation Cushion with Golden Lotus Embroidery & Organic Buckwheat Hulls',
    subtitle: 'Spine-Aligning Round Sitting Pillow with Removable Washable Forest Green Canvas Cover',
    authorOrMaker: 'Path to Inner Peace Wellness Studio',
    category: 'Sacred Space & Meditation',
    badge: 'Physiotherapist Recommended',
    rating: 4.9,
    ratingCount: 340,
    boughtCount: '200+ bought in past month',
    imageUrl: cushionPhoto,
    formats: [
      {
        id: 'cushion-standard',
        name: 'Standard Zafu Cushion',
        badge: '14" x 5" Ergonomic Round Zafu',
        price: 799,
        mrp: 1699,
        deliveryText: 'FREE Doorstep Delivery in 2-4 business days',
        description: 'Full-size ergonomic 14"x5" Zafu cushion filled with 100% organic cleaned buckwheat hulls.'
      },
      {
        id: 'cushion-master',
        name: 'Meditation Master Set',
        badge: 'Zafu Pillow + Zabuton Mat',
        price: 1399,
        mrp: 2999,
        deliveryText: 'FREE Doorstep Delivery in 2-4 business days',
        description: 'Includes Zafu pillow plus matching high-density cushioned floor mat for complete knee and ankle support.'
      }
    ],
    bulletPoints: [
      'PERFECT POSTURAL ALIGNMENT: Elevates the pelvis to naturally tilt the spine into a healthy S-curve, eliminating lower back fatigue and leg numbness.',
      '100% ORGANIC BUCKWHEAT HULLS: Molds precisely to your body contours while allowing natural airflow so you remain cool and comfortable.',
      'GOLDEN EMBROIDERED LOTUS: Features the sacred gold lotus motif with durable double-stitched seams and a reinforced side carry handle.',
      'REMOVABLE & WASHABLE COVER: Premium heavyweight cotton canvas outer cover with concealed zipper for easy machine washing.',
      'ADJUSTABLE FIRMNESS: Inner zippered cotton liner lets you easily add or remove buckwheat hulls to customize your ideal sitting height.'
    ],
    specs: [
      { label: 'Dimensions', value: '14 inches diameter x 5 inches height (35 x 13 cm)' },
      { label: 'Weight', value: 'Approx. 2.1 kg (Filled with natural hulls)' },
      { label: 'Cover Fabric', value: 'Heavy-Duty 100% Cotton Canvas (Forest Green)' },
      { label: 'Filling', value: '100% Triple-Cleaned Natural Organic Buckwheat Hulls' },
      { label: 'Embroidery', value: 'Metallic Golden Thread Sacred Lotus Emblem' },
      { label: 'Country of Origin', value: 'India' }
    ],
    reviews: [
      {
        id: 'rev-c1',
        name: 'Tanvi Agarwal',
        date: 'September 18, 2026',
        rating: 5,
        title: 'Eliminated my lower back strain during 30-minute sits',
        comment: 'Before this cushion, my legs would fall asleep after 10 minutes. The buckwheat hulls adapt perfectly to your pelvic angle and keep your spine upright effortlessly. The forest green canvas with gold embroidery is stunning.',
        verified: true,
        helpfulCount: 37
      }
    ]
  }
];

export const PremiumStoreSection: React.FC = () => {
  const { user } = useApp();
  
  // Selected product and active format
  const [selectedProductId, setSelectedProductId] = useState<string>('prod-journal');
  const [selectedFormatId, setSelectedFormatId] = useState<string>('hardcopy');
  const [quantity, setQuantity] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  
  // Interactive Reviews state
  const [newReviewAuthor, setNewReviewAuthor] = useState<string>(user?.name || '');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);
  const [newReviewTitle, setNewReviewTitle] = useState<string>('');
  const [newReviewComment, setNewReviewComment] = useState<string>('');
  const [isReviewFormOpen, setIsReviewFormOpen] = useState<boolean>(false);
  const [userSubmittedReviews, setUserSubmittedReviews] = useState<Record<string, any[]>>({});
  const [reviewToast, setReviewToast] = useState<string | null>(null);

  // Checkout Modal State
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);
  const [checkoutStep, setCheckoutStep] = useState<'details' | 'success'>('details');
  const [customerName, setCustomerName] = useState<string>(user?.name || 'Valued Member');
  const [customerEmail, setCustomerEmail] = useState<string>(user?.email || 'member@pathtoinnerpeace.in');
  const [customerPhone, setCustomerPhone] = useState<string>(user?.whatsapp || '+91 98765 43210');
  const [customerAddress, setCustomerAddress] = useState<string>('Flat 402, Green Valley Apartments, Near Lake Road');
  const [customerCity, setCustomerCity] = useState<string>('Kolkata');
  const [customerPincode, setCustomerPincode] = useState<string>('700029');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [orderConfirmedId, setOrderConfirmedId] = useState<string>('');

  const currentProduct = PRODUCTS.find(p => p.id === selectedProductId) || PRODUCTS[0];
  const currentFormat = currentProduct.formats.find(f => f.id === selectedFormatId) || currentProduct.formats[0];

  const handleSelectProduct = (product: ProductItem) => {
    setSelectedProductId(product.id);
    setSelectedFormatId(product.formats[0].id);
    setQuantity(1);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleSelectFormat = (formatId: string) => {
    setSelectedFormatId(formatId);
  };

  const handleBuyNow = () => {
    setIsCheckoutModalOpen(true);
    setCheckoutStep('details');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `AMZ-PIP-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderConfirmedId(generatedId);
    setCheckoutStep('success');
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewTitle.trim() || !newReviewComment.trim()) return;

    const newRev = {
      id: `custom-rev-${Date.now()}`,
      name: newReviewAuthor.trim() || 'Verified Member',
      date: 'Just now',
      rating: newReviewRating,
      title: newReviewTitle.trim(),
      comment: newReviewComment.trim(),
      verified: true,
      helpfulCount: 0
    };

    setUserSubmittedReviews(prev => ({
      ...prev,
      [currentProduct.id]: [newRev, ...(prev[currentProduct.id] || [])]
    }));

    setNewReviewTitle('');
    setNewReviewComment('');
    setIsReviewFormOpen(false);
    setReviewToast('Thank you! Your verified review has been published to the store.');
    setTimeout(() => setReviewToast(null), 4000);
  };

  // Combine static and user reviews
  const allCurrentReviews = [
    ...(userSubmittedReviews[currentProduct.id] || []),
    ...currentProduct.reviews
  ];

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = categoryFilter === 'All' || p.category === categoryFilter;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-fadeIn pb-12">

      {/* ====================================================================
         PREMIUM STORE HERO SECTION & TOP NAVIGATION (DEEP GREEN THEME)
         ==================================================================== */}
      <div className="bg-gradient-to-br from-[#021811] via-[#053225] to-[#0B6B53] text-white rounded-3xl p-4 sm:p-6 shadow-xl border border-emerald-600/40 relative overflow-hidden">
        {/* Ambient atmospheric emerald glows matching other sections */}
        <div className="absolute top-0 right-0 transform translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 transform -translate-x-12 translate-y-12 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Upper Store Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-emerald-600/30 pb-4 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#D4AF37] to-amber-300 flex items-center justify-center text-slate-950 font-black shadow-md">
              <ShoppingBag className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-white tracking-tight">
                  Path to Inner Peace Store
                </span>
                <span className="bg-emerald-900/80 text-amber-300 border border-amber-300/40 text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                  <Sparkles className="w-2.5 h-2.5 text-[#D4AF37]" />
                  <span>Exclusive Member Store</span>
                </span>
              </div>
              <p className="text-xs text-emerald-100/90 font-inter">
                Official Mindfulness Journals, Himalayan Sound Bowls & Member Exclusives
              </p>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full md:w-80 relative">
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products in official store..."
              className="w-full bg-[#021811]/60 border border-emerald-600/40 rounded-xl py-2 pl-9 pr-3 text-xs text-white placeholder-emerald-200/50 focus:outline-none focus:border-amber-400 transition-colors shadow-inner"
            />
            <Search className="w-4 h-4 text-emerald-300/70 absolute left-3 top-2.5 pointer-events-none" />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-emerald-300 hover:text-white"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Member Exclusive Perks Ticker */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 text-xs text-emerald-100/90 relative z-10">
          <div className="flex items-center gap-2">
            <span className="bg-gradient-to-r from-amber-400 to-[#D4AF37] text-slate-950 font-black text-[10px] px-2 py-0.5 rounded-sm shadow-xs">
              EXCLUSIVE
            </span>
            <span className="text-white font-medium">
              Free Delivery & Member Priority Dispatch on all items
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-emerald-200/80">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
              <span>100% Authentic Founder Edition</span>
            </span>
            <span className="flex items-center gap-1">
              <RotateCcw className="w-3.5 h-3.5 text-emerald-300" />
              <span>7-Day Replacement Guarantee</span>
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pt-4 scrollbar-none relative z-10">
          {['All', 'Official Apparel & Merch', 'Journals & Workbooks', 'Books & Philosophy', 'Sound Healing & Meditation', 'Sacred Space & Meditation'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                categoryFilter === cat
                  ? 'bg-gradient-to-r from-amber-400 to-[#D4AF37] text-slate-950 font-bold shadow-sm'
                  : 'bg-[#021811]/50 text-emerald-100/90 hover:bg-[#021811]/80 hover:text-white border border-emerald-600/30'
              }`}
            >
              {cat === 'All' ? 'All Products' : cat}
            </button>
          ))}
        </div>

      </div>

      {/* Toast Notification */}
      {reviewToast && (
        <div className="bg-emerald-900 border border-emerald-500 text-emerald-100 p-3.5 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            <span>{reviewToast}</span>
          </div>
          <button onClick={() => setReviewToast(null)}>
            <X className="w-4 h-4 text-emerald-300" />
          </button>
        </div>
      )}

      {/* ====================================================================
         PRODUCT CATALOG CAROUSEL / QUICK SELECT CARDS
         ==================================================================== */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((prod) => {
          const isSelected = prod.id === selectedProductId;
          const minPrice = Math.min(...prod.formats.map(f => f.price));
          const maxMrp = Math.max(...prod.formats.map(f => f.mrp));

          return (
            <div 
              key={prod.id}
              onClick={() => handleSelectProduct(prod)}
              className={`p-4 rounded-3xl cursor-pointer transition-all border-2 flex items-center gap-4 relative overflow-hidden bg-white shadow-sm hover:shadow-md ${
                isSelected 
                  ? 'border-amber-400 bg-amber-50/20 ring-2 ring-amber-400/30' 
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 shrink-0 relative p-1 flex items-center justify-center">
                <img 
                  src={prod.imageUrl} 
                  alt={prod.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain hover:scale-105 transition-transform"
                />
                <span className="absolute top-1 left-1 bg-[#0B6B53] text-white font-bold text-[8.5px] px-1.5 py-0.5 rounded shadow-xs">
                  {prod.id === 'prod-tshirt' ? 'T-Shirt' : prod.id === 'prod-journal' ? 'Journal' : prod.id === 'prod-algorithm' ? 'Philosophy Book' : prod.id === 'prod-bowl' ? 'Singing Bowl' : prod.id === 'prod-mala' ? 'Japa Mala' : prod.id === 'prod-incense' ? 'Incense' : 'Cushion'}
                </span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="bg-[#E67A00] text-white text-[9px] font-bold px-1.5 py-0.2 rounded-xs whitespace-nowrap">
                    {prod.badge.includes('Best Seller') ? '#1 Best Seller' : prod.badge.includes('Choice') ? "Founder's Choice" : prod.badge.includes('New Release') ? '#1 New Release' : 'Top Rated'}
                  </span>
                  <span className="text-[10px] text-slate-500 font-inter line-clamp-1">
                    {prod.category}
                  </span>
                </div>

                <h4 className="font-heading font-bold text-sm text-slate-900 line-clamp-2 leading-snug">
                  {prod.title}
                </h4>

                <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-blue-700 font-bold text-[11px]">
                    {prod.ratingCount}
                  </span>
                </div>

                <div className="flex items-baseline gap-2 mt-2">
                  <span className="text-rose-600 font-semibold text-xs">
                    from
                  </span>
                  <span className="text-slate-950 font-black text-lg">
                    ₹{minPrice}
                  </span>
                  <span className="text-slate-400 line-through text-xs">
                    ₹{maxMrp}
                  </span>
                </div>
              </div>

              {isSelected && (
                <div className="absolute top-3 right-3 bg-amber-400 text-slate-950 rounded-full p-1 shadow">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ====================================================================
         EXPANDED PRODUCT DETAIL SHOWCASE
         ==================================================================== */}
      <div className="bg-white rounded-3xl p-5 sm:p-8 shadow-xl border border-slate-200">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Column 1: Image Gallery & Badges (Lg: 5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Main Product Image Stage */}
            <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-4 aspect-[4/4] flex items-center justify-center shadow-inner group">
              <img 
                src={currentProduct.imageUrl} 
                alt={currentProduct.title}
                referrerPolicy="no-referrer"
                className="max-h-[360px] w-auto object-contain transition-transform duration-300 group-hover:scale-105"
              />

              {/* Badges Over Image */}
              <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
                <span className="bg-[#E67A00] text-white font-extrabold text-[10px] uppercase tracking-wider px-2.5 py-1 rounded shadow">
                  {currentProduct.badge}
                </span>
                <span className="bg-[#0B6B53] text-white font-bold text-[10px] px-2 py-0.5 rounded shadow flex items-center gap-1">
                  <Check className="w-3 h-3 text-amber-300" />
                  <span>Verified Founder Stock</span>
                </span>
              </div>

              <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-md text-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-full border border-slate-200 shadow-sm flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>High Res Photography</span>
              </div>
            </div>

            {/* Thumbnail Strip */}
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              <div className="w-16 h-16 rounded-xl border-2 border-amber-400 p-1 bg-white cursor-pointer shadow-xs shrink-0 flex items-center justify-center">
                <img 
                  src={currentProduct.imageUrl} 
                  alt="Thumbnail" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                />
              </div>

              {currentProduct.id === 'prod-tshirt' && (
                <div 
                  className="w-16 h-16 rounded-xl border-2 border-amber-400/80 p-1 bg-black cursor-pointer shadow-xs shrink-0 flex flex-col items-center justify-center relative overflow-hidden group" 
                  title="Official Hero Section Golden Emblem Logo printed on center chest"
                >
                  <img 
                    src="https://cdn.corenexis.com/f/J29m8uBQ4qF.jpeg" 
                    alt="Official Hero Section Sacred Logo" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover scale-110 rounded-lg group-hover:scale-125 transition-transform"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/90 text-[7px] text-[#D4AF37] font-bold text-center leading-tight py-0.5">
                    Hero Logo
                  </span>
                </div>
              )}
              
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-xs text-slate-600 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-800 block">Official Founder Certified Content</span>
                  <span className="text-[11px] text-slate-500">
                    {currentProduct.id === 'prod-tshirt'
                      ? 'Features the official hero section golden emblem lotus logo'
                      : 'Curated specifically for member inner healing'}
                  </span>
                </div>
                <Award className="w-5 h-5 text-amber-500 shrink-0" />
              </div>
            </div>

            {/* Trust Assurance Strip */}
            <div className="grid grid-cols-3 gap-2 text-center pt-2">
              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
                <Truck className="w-4 h-4 text-emerald-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-800">FREE Delivery</span>
                <span className="text-[9px] text-slate-500">Across India</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-blue-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-800">100% Genuine</span>
                <span className="text-[9px] text-slate-500">Direct From Hub</span>
              </div>
              <div className="p-2.5 bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-amber-600 mb-1" />
                <span className="text-[10px] font-bold text-slate-800">Easy Returns</span>
                <span className="text-[9px] text-slate-500">7-Day Guarantee</span>
              </div>
            </div>

          </div>

          {/* Column 2: Product Info, Formats & Specifications (Lg: 4 Cols) */}
          <div className="lg:col-span-4 space-y-4">
            
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-blue-700 hover:underline cursor-pointer">
                  Visit the Path to Inner Peace Store
                </span>
                {currentProduct.amazonUrl && (
                  <a
                    href={currentProduct.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-amber-800 hover:text-amber-950 font-bold bg-amber-100/90 hover:bg-amber-200 px-2 py-0.5 rounded-md border border-amber-300 transition-colors"
                  >
                    <span>Official Publication ASIN: B0GYX4MKQ5</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                )}
              </div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-slate-900 leading-snug mt-1">
                {currentProduct.title}
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                by <strong className="text-slate-800">{currentProduct.authorOrMaker}</strong>
              </p>
            </div>

            {/* Ratings & Social Proof */}
            <div className="flex flex-wrap items-center gap-2 text-xs border-b border-slate-200 pb-3">
              <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-200 text-amber-900 font-bold">
                <span>{currentProduct.rating}</span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>
              <span className="text-blue-700 font-medium hover:underline cursor-pointer">
                {currentProduct.ratingCount.toLocaleString()} ratings
              </span>
              <span className="text-slate-300">•</span>
              <span className="text-slate-500 font-medium">
                {currentProduct.boughtCount}
              </span>
            </div>

            {/* FORMAT / EDITION SELECTOR */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 block">
                  {currentProduct.id === 'prod-tshirt' ? 'Select T-Shirt Size:' : 'Select Edition / Format:'}
                </span>
                {currentProduct.id === 'prod-tshirt' && (
                  <span className="text-[10px] text-slate-500 font-medium">
                    Unisex Regular Fit • Pre-Shrunk
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {currentProduct.formats.map((fmt) => {
                  const isSelected = fmt.id === selectedFormatId;
                  const discountPercent = Math.round(((fmt.mrp - fmt.price) / fmt.mrp) * 100);

                  return (
                    <button
                      key={fmt.id}
                      type="button"
                      onClick={() => handleSelectFormat(fmt.id)}
                      className={`p-2.5 rounded-2xl text-left border-2 transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-amber-500 bg-amber-50/50 shadow-sm ring-1 ring-amber-400'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 block leading-tight">
                          {fmt.name}
                        </span>
                        {isSelected && (
                          <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-500 block mt-0.5 leading-tight line-clamp-1">
                        {fmt.badge}
                      </span>
                      <div className="mt-2 flex items-baseline gap-1.5">
                        <span className="text-slate-950 font-black text-sm">
                          ₹{fmt.price}
                        </span>
                        <span className="text-slate-400 text-[11px] line-through">
                          ₹{fmt.mrp}
                        </span>
                      </div>
                      <span className="text-[9.5px] font-bold text-emerald-700 bg-emerald-50 px-1 py-0.2 rounded mt-1 inline-block">
                        Save {discountPercent}%
                      </span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <strong className="text-slate-800">{currentFormat.name}:</strong> {currentFormat.description}
              </p>
            </div>

            {/* "About this item" Bullet points */}
            <div className="space-y-2 border-t border-slate-200 pt-3">
              <h4 className="font-heading font-bold text-sm text-slate-900">
                About this item
              </h4>
              <ul className="space-y-2 text-xs text-slate-700">
                {currentProduct.bulletPoints.map((bp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{bp}</span>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* Column 3: Store Buy Box & Action Panel (Lg: 3 Cols) */}
          <div className="lg:col-span-3">
            <div className="rounded-3xl border-2 border-slate-200 p-5 bg-white shadow-lg space-y-4 sticky top-24">
              
              {/* Dynamic Price Display */}
              <div>
                <div className="flex items-baseline gap-2">
                  <span className="text-rose-600 font-extrabold text-2xl">
                    -{Math.round(((currentFormat.mrp - currentFormat.price) / currentFormat.mrp) * 100)}%
                  </span>
                  <div className="flex items-start">
                    <span className="text-xs font-semibold mt-1">₹</span>
                    <span className="text-3xl font-black text-slate-950">
                      {currentFormat.price}
                    </span>
                  </div>
                </div>
                <div className="text-xs text-slate-500 mt-0.5">
                  M.R.P.: <span className="line-through">₹{currentFormat.mrp}</span>
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Inclusive of all taxes
                </div>
              </div>

              {/* Prime Delivery Promise */}
              <div className="bg-amber-50/60 p-3 rounded-2xl border border-amber-200/80 space-y-1 text-xs">
                <div className="flex items-center gap-1.5 text-slate-900 font-bold">
                  <span className="bg-[#FF9900] text-slate-950 text-[10px] px-1.5 py-0.2 rounded font-black">
                    prime
                  </span>
                  <span>FREE Delivery</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {currentFormat.deliveryText}
                </p>
              </div>

              {/* In Stock Badge */}
              <div className="flex items-center gap-1.5 text-emerald-700 font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>In Stock.</span>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center justify-between text-xs border border-slate-200 rounded-xl px-3 py-2 bg-slate-50">
                <span className="font-semibold text-slate-700">Quantity:</span>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="bg-transparent font-bold text-slate-900 focus:outline-none cursor-pointer"
                >
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={5}>5 (Family & Friends)</option>
                </select>
              </div>

              {/* Action Buttons: Buy Now & Add to Cart */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#FFA41C] to-[#FF8F00] hover:from-[#f39b15] hover:to-[#e67e00] text-slate-950 font-poppins font-black text-sm rounded-2xl shadow-md hover:shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-500/40"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Buy Now — ₹{currentFormat.price * quantity}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  className="w-full py-2.5 px-4 bg-[#FFD814] hover:bg-[#F7CA00] text-slate-950 font-poppins font-bold text-xs rounded-2xl shadow-xs hover:shadow active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-300"
                >
                  <ShoppingCart className="w-3.5 h-3.5" />
                  <span>Add to Cart</span>
                </button>

                {currentProduct.amazonUrl && (
                  <a
                    href={currentProduct.amazonUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 px-4 bg-gradient-to-r from-[#021811] to-[#0B6B53] hover:brightness-115 text-amber-300 hover:text-white font-poppins font-bold text-xs rounded-2xl shadow-xs transition-all flex items-center justify-center gap-2 border border-emerald-600/40 cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                    <span>View & Buy on Amazon.in</span>
                  </a>
                )}
              </div>

              {/* Security & Dispatch meta */}
              <div className="space-y-1.5 text-[11px] text-slate-600 border-t border-slate-100 pt-3">
                <div className="flex justify-between">
                  <span className="text-slate-400">Payment:</span>
                  <span className="font-semibold text-blue-700 flex items-center gap-1">
                    <Lock className="w-3 h-3 text-emerald-600" />
                    <span>Secure transaction</span>
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Dispatches from:</span>
                  <span className="font-semibold text-slate-800">Path to Inner Peace Hub</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Sold by:</span>
                  <span className="font-semibold text-slate-800">MindForge Wellness</span>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ====================================================================
           PRODUCT SPECIFICATIONS TABLE
           ==================================================================== */}
        <div className="mt-10 border-t border-slate-200 pt-8">
          <div className="max-w-4xl">
            <h3 className="font-heading font-extrabold text-lg text-slate-900 mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-amber-500" />
              <span>Product Specifications & Details</span>
            </h3>

            <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <table className="w-full text-left text-xs divide-y divide-slate-200">
                <tbody className="divide-y divide-slate-200 bg-white">
                  {currentProduct.specs.map((item, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50/70' : 'bg-white'}>
                      <td className="py-2.5 px-4 font-bold text-slate-700 w-1/3 sm:w-1/4">
                        {item.label}
                      </td>
                      <td className="py-2.5 px-4 text-slate-900 font-medium">
                        {item.value}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* ====================================================================
           CUSTOMER REVIEWS & USER REVIEW SUBMISSION
           ==================================================================== */}
        <div className="mt-12 border-t border-slate-200 pt-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Reviews Summary Column (Lg: 4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="font-heading font-extrabold text-lg text-slate-900">
                Customer Reviews
              </h3>

              <div className="flex items-center gap-2">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="font-heading font-black text-xl text-slate-900">
                  {currentProduct.rating} out of 5
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {allCurrentReviews.length + 1480} global ratings across India
              </p>

              {/* Star breakdown bar chart */}
              <div className="space-y-2 pt-2 text-xs">
                {[
                  { star: '5 star', percent: 89 },
                  { star: '4 star', percent: 8 },
                  { star: '3 star', percent: 2 },
                  { star: '2 star', percent: 1 },
                  { star: '1 star', percent: 0 }
                ].map((row) => (
                  <div key={row.star} className="flex items-center gap-2">
                    <span className="w-12 text-blue-700 font-medium hover:underline cursor-pointer">
                      {row.star}
                    </span>
                    <div className="flex-1 h-4 bg-slate-100 rounded-md overflow-hidden border border-slate-200 relative">
                      <div 
                        className="h-full bg-amber-400 rounded-md"
                        style={{ width: `${row.percent}%` }}
                      />
                    </div>
                    <span className="w-8 text-right font-medium text-slate-600">
                      {row.percent}%
                    </span>
                  </div>
                ))}
              </div>

              {/* Write a Review Button */}
              <div className="border-t border-slate-200 pt-4 space-y-2">
                <h4 className="font-heading font-bold text-sm text-slate-900">
                  Review this product
                </h4>
                <p className="text-xs text-slate-600">
                  Share your thoughts and inner transformation with other community seekers.
                </p>
                <button
                  type="button"
                  onClick={() => setIsReviewFormOpen(!isReviewFormOpen)}
                  className="w-full py-2 px-4 rounded-xl border border-slate-300 text-slate-800 font-bold text-xs hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-amber-500" />
                  <span>{isReviewFormOpen ? 'Cancel Review' : 'Write a customer review'}</span>
                </button>
              </div>

            </div>

            {/* Reviews List & Submission Form (Lg: 8 cols) */}
            <div className="lg:col-span-8 space-y-5">
              
              {/* Write Review Form */}
              {isReviewFormOpen && (
                <form 
                  onSubmit={handleAddReview}
                  className="p-5 rounded-2xl bg-amber-50/40 border border-amber-200 space-y-3.5 shadow-sm animate-fadeIn"
                >
                  <h4 className="font-heading font-bold text-sm text-slate-900">
                    Create Review for {currentProduct.title.slice(0, 40)}...
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Your Name</label>
                      <input 
                        type="text"
                        value={newReviewAuthor}
                        onChange={(e) => setNewReviewAuthor(e.target.value)}
                        placeholder="e.g. Priya Sharma"
                        required
                        className="w-full bg-white border border-slate-300 rounded-xl p-2 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-700 block mb-1">Overall Rating</label>
                      <div className="flex items-center gap-1.5 pt-1">
                        {[1, 2, 3, 4, 5].map((starVal) => (
                          <button
                            type="button"
                            key={starVal}
                            onClick={() => setNewReviewRating(starVal)}
                            className="cursor-pointer"
                          >
                            <Star 
                              className={`w-6 h-6 ${
                                starVal <= newReviewRating 
                                  ? 'fill-amber-400 text-amber-400' 
                                  : 'text-slate-300'
                              }`} 
                            />
                          </button>
                        ))}
                        <span className="text-xs font-bold text-slate-700 ml-2">
                          {newReviewRating} Star{newReviewRating > 1 ? 's' : ''}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs">
                    <label className="font-semibold text-slate-700 block mb-1">Add a Headline</label>
                    <input 
                      type="text"
                      value={newReviewTitle}
                      onChange={(e) => setNewReviewTitle(e.target.value)}
                      placeholder="What's most important to know?"
                      required
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="text-xs">
                    <label className="font-semibold text-slate-700 block mb-1">Write your review</label>
                    <textarea 
                      rows={3}
                      value={newReviewComment}
                      onChange={(e) => setNewReviewComment(e.target.value)}
                      placeholder="What did you like or dislike? How did this support your inner healing?"
                      required
                      className="w-full bg-white border border-slate-300 rounded-xl p-2 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setIsReviewFormOpen(false)}
                      className="px-4 py-1.5 rounded-xl border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-white"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-1.5 bg-[#FFD814] hover:bg-[#F7CA00] text-slate-950 font-bold text-xs rounded-xl shadow-xs"
                    >
                      Submit Review
                    </button>
                  </div>
                </form>
              )}

              {/* Filter Reviews Header */}
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="font-heading font-bold text-sm text-slate-900">
                  Top reviews from India
                </span>
                <span className="text-xs text-slate-500">
                  Showing verified member feedback
                </span>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {allCurrentReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-2xl bg-slate-50/70 border border-slate-200 space-y-2">
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full bg-emerald-950 text-amber-300 font-bold text-xs flex items-center justify-center">
                          {rev.name.charAt(0)}
                        </div>
                        <span className="text-xs font-bold text-slate-900">{rev.name}</span>
                      </div>
                      <span className="text-[11px] text-slate-400">{rev.date}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-3.5 h-3.5 ${
                              i < rev.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'
                            }`} 
                          />
                        ))}
                      </div>
                      <h5 className="font-bold text-xs text-slate-900">
                        {rev.title}
                      </h5>
                    </div>

                    {rev.verified && (
                      <span className="text-[#C45500] font-bold text-[10.5px] block">
                        Verified Purchase
                      </span>
                    )}

                    <p className="text-xs text-slate-700 leading-relaxed font-inter">
                      {rev.comment}
                    </p>

                    <div className="flex items-center gap-3 pt-1 text-[11px] text-slate-500">
                      <button 
                        type="button" 
                        className="px-2.5 py-0.5 border border-slate-300 rounded-md hover:bg-white flex items-center gap-1 font-medium cursor-pointer"
                      >
                        <ThumbsUp className="w-3 h-3 text-slate-400" />
                        <span>Helpful ({rev.helpfulCount})</span>
                      </button>
                      <span className="cursor-pointer hover:underline">Report</span>
                    </div>

                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* ====================================================================
         1-CLICK CHECKOUT MODAL
         ==================================================================== */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-scale my-8">
            
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-[#021811] via-[#0B6B53] to-[#021811] text-white p-4 sm:p-5 flex items-center justify-between border-b border-emerald-600/40">
              <div className="flex items-center gap-2">
                <span className="bg-gradient-to-r from-amber-400 to-[#D4AF37] text-slate-950 font-black text-xs px-2 py-0.5 rounded shadow-xs">
                  SECURE PAY
                </span>
                <span className="font-heading font-extrabold text-sm sm:text-base text-white">
                  Fast 1-Click Checkout
                </span>
              </div>
              <button 
                onClick={() => setIsCheckoutModalOpen(false)}
                className="w-8 h-8 rounded-full bg-emerald-900/60 text-emerald-200 hover:text-white flex items-center justify-center"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {checkoutStep === 'details' ? (
              <form onSubmit={handlePlaceOrder} className="p-5 sm:p-6 space-y-4 text-xs">
                
                {/* Order Summary Strip */}
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-center gap-3">
                  <div className="w-14 h-14 rounded-xl bg-white border border-slate-200 overflow-hidden shrink-0 p-1 flex items-center justify-center">
                    <img 
                      src={currentProduct.imageUrl} 
                      alt={currentProduct.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h5 className="font-bold text-slate-900 text-xs line-clamp-1">
                      {currentProduct.title}
                    </h5>
                    <div className="text-[11px] text-slate-600">
                      Edition: <strong className="text-slate-800">{currentFormat.name}</strong> • Qty: <strong>{quantity}</strong>
                    </div>
                    <div className="flex items-baseline gap-2 mt-0.5">
                      <span className="font-black text-slate-950 text-sm">
                        ₹{currentFormat.price * quantity}
                      </span>
                      <span className="text-slate-400 line-through text-[11px]">
                        ₹{currentFormat.mrp * quantity}
                      </span>
                      <span className="text-emerald-700 font-bold text-[10px]">
                        FREE Delivery
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="space-y-2">
                  <h5 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-500" />
                    <span>Delivery Address & Contact</span>
                  </h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-slate-600 block mb-0.5">Full Name</label>
                      <input 
                        type="text" 
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        required
                        className="w-full border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-slate-600 block mb-0.5">Phone / WhatsApp</label>
                      <input 
                        type="text" 
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        required
                        className="w-full border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-600 block mb-0.5">Email (for order invoice & digital copy)</label>
                    <input 
                      type="email" 
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      required
                      className="w-full border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  {currentFormat.id === 'hardcopy' || currentProduct.id === 'prod-bowl' ? (
                    <>
                      <div>
                        <label className="text-[11px] text-slate-600 block mb-0.5">Street Address</label>
                        <input 
                          type="text" 
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          required
                          className="w-full border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-400"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-[11px] text-slate-600 block mb-0.5">City</label>
                          <input 
                            type="text" 
                            value={customerCity}
                            onChange={(e) => setCustomerCity(e.target.value)}
                            required
                            className="w-full border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] text-slate-600 block mb-0.5">PIN Code</label>
                          <input 
                            type="text" 
                            value={customerPincode}
                            onChange={(e) => setCustomerPincode(e.target.value)}
                            required
                            className="w-full border border-slate-300 rounded-xl p-2 bg-slate-50 focus:bg-white focus:outline-none focus:border-amber-400"
                          />
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="p-2.5 bg-blue-50 border border-blue-200 text-blue-900 rounded-xl text-[11px]">
                      ⚡ Instant Access: Link will be sent to your email immediately upon completion.
                    </div>
                  )}
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-2 border-t border-slate-200 pt-3">
                  <h5 className="font-heading font-bold text-slate-900 text-xs uppercase tracking-wide flex items-center gap-1.5">
                    <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Select Payment Method</span>
                  </h5>

                  <div className="space-y-1.5">
                    {[
                      { id: 'upi', label: 'UPI / Google Pay / PhonePe / Paytm', tag: 'Fastest' },
                      { id: 'card', label: 'Credit / Debit Card / Net Banking', tag: 'All Banks' },
                      { id: 'cod', label: 'Cash on Delivery (Available for physical items)', tag: 'Verified' }
                    ].map((m) => (
                      <label 
                        key={m.id}
                        className={`flex items-center justify-between p-2.5 rounded-xl border cursor-pointer transition-all ${
                          paymentMethod === m.id 
                            ? 'border-amber-400 bg-amber-50/50' 
                            : 'border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <input 
                            type="radio" 
                            name="paymentMethod" 
                            checked={paymentMethod === m.id}
                            onChange={() => setPaymentMethod(m.id as any)}
                            className="text-amber-500 focus:ring-amber-400"
                          />
                          <span className="font-bold text-slate-800 text-xs">{m.label}</span>
                        </div>
                        <span className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.2 rounded font-semibold">
                          {m.tag}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Order Summary Total Box */}
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 space-y-1 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Items Total:</span>
                    <span>₹{currentFormat.price * quantity}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Member Delivery:</span>
                    <span className="text-emerald-700 font-bold">FREE (Saved ₹80)</span>
                  </div>
                  <div className="flex justify-between text-slate-950 font-black text-sm pt-1 border-t border-slate-200">
                    <span>Order Total:</span>
                    <span className="text-rose-700">₹{currentFormat.price * quantity}</span>
                  </div>
                </div>

                {/* Submit Order Button */}
                <button
                  type="submit"
                  className="w-full py-3 px-4 bg-gradient-to-r from-[#FFA41C] to-[#FF8F00] hover:from-[#f39b15] hover:to-[#e67e00] text-slate-950 font-poppins font-black text-sm rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer border border-amber-500/50"
                >
                  <Lock className="w-4 h-4" />
                  <span>Place Your Order — ₹{currentFormat.price * quantity}</span>
                </button>

                <p className="text-[10.5px] text-center text-slate-500">
                  By placing your order, you agree to Path to Inner Peace terms of sale & delivery policy.
                </p>

              </form>
            ) : (
              /* Success Screen */
              <div className="p-6 sm:p-8 text-center space-y-4 animate-scale">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle2 className="w-10 h-10" />
                </div>

                <div>
                  <h4 className="font-heading font-extrabold text-xl text-slate-900">
                    Order Placed Successfully!
                  </h4>
                  <p className="text-xs text-slate-600 mt-1">
                    An order confirmation & tax invoice have been dispatched to <strong className="text-slate-800">{customerEmail}</strong>.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-left text-xs space-y-2">
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Order ID:</span>
                    <span className="font-mono font-bold text-slate-900">{orderConfirmedId}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Item Ordered:</span>
                    <span className="font-bold text-slate-900 line-clamp-1">{currentProduct.title.slice(0, 30)}...</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1.5">
                    <span className="text-slate-500">Selected Format:</span>
                    <span className="font-bold text-slate-900">{currentFormat.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Estimated Delivery:</span>
                    <span className="font-bold text-emerald-700">Within 3 Business Days</span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="w-full py-2.5 px-4 bg-[#FFD814] hover:bg-[#F7CA00] text-slate-950 font-bold text-xs rounded-xl shadow-xs"
                  >
                    Continue Shopping in Store
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
