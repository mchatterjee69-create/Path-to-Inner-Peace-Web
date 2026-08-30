import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Send, User, Lightbulb, HeartHandshake, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  affirmation?: string;
  timestamp: string;
}

export const AiReflectionAssistant: React.FC = () => {
  const { user } = useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'ai',
      text: `Namaste ${user.name}! I am your Mind Mastery & Stress Reset Coach, trained on practical CBT psychology, vagus nerve regulation, and mindfulness methods. How can I help quiet your mind or guide your reflection today?`,
      affirmation: "I am safe, peaceful, and open to inner clarity.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Chat reset. Namaste ${user.name}! What question or reflection is on your mind right now?`,
        affirmation: "Every moment is a fresh beginning.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  // Ultra-fast client-side knowledge fallback engine for instant, zero-lag responses across all devices & topics
  const getClientKnowledgeAnswer = (prompt: string): { text: string; affirmation: string } => {
    const p = prompt.toLowerCase().trim();

    // 1. Greetings & General Capabilities
    if (p.includes('hi') || p.includes('hello') || p.includes('hey') || p.includes('namaste') || p.includes('who are you') || p.includes('what can you do')) {
      return {
        text: `Namaste ${user.name}! I am your **Inner Peace Guide & Mind Mastery AI Companion**—a comprehensive psycho-spiritual and wellness mentor.\n\nI am here to guide and support you across all aspects of your inner journey, including:\n- **Stress Management & Burnout**: Somatic vagal regulation, cortisol reduction, and nervous system recalibration.\n- **Meditation & Breathwork**: Vipassana, Zen, Yoga Nidra, Loving-Kindness (Metta), Dhyana, 4-7-8, and Pranayama.\n- **Mindfulness**: Present-moment awareness, non-attachment, equanimity, and breaking autopilot reactivity.\n- **Relationships & Emotional Recovery**: Attachment styles, boundary setting, conscious communication, heartbreak healing, and relationship recovery.\n- **Higher Consciousness & Awakening**: Non-duality (Advaita), witness consciousness, ego transcendence, shadow work, chakra alignment, and discovering your Dharma.\n- **Path to Inner Peace Hub**: The 5-Day Challenge, guided camps, 432Hz/528Hz sound therapy, CBT masterclasses, and Career Axis.\n\nWhat is on your mind or how can I assist your practice today?`,
        affirmation: "I welcome peace, clarity, and mindfulness into this moment."
      };
    }

    // 2. Higher Consciousness, Awakening, Ego & Non-Duality
    if (p.includes('consciousness') || p.includes('awakening') || p.includes('ego') || p.includes('non-duality') || p.includes('advaita') || p.includes('soul') || p.includes('spiritual') || p.includes('enlighten') || p.includes('witness') || p.includes('sakshi') || p.includes('dark night') || p.includes('kundalini') || p.includes('dharma') || p.includes('chakra')) {
      return {
        text: `**Higher Consciousness & The Awakening Journey**\n\nSpiritual awakening is the fundamental shift from identifying with the mind's transient thoughts and egoic personality to resting in the **Witness Consciousness** (Sakshi Bhav)—the eternal, silent awareness in which all experiences arise and dissolve.\n\n**Core Awakening Practices:**\n1. **Self-Inquiry (Atma Vichara)**: When a thought, worry, or emotion arises, ask: *"Who is aware of this thought?"* Notice the spacious, untouched silence that observes without judging.\n2. **Ego Dissolution**: The ego is not an enemy to be destroyed; it is simply a bundle of conditioned beliefs, memories, and survival identities. By observing it with compassionate detachment, its compulsive grip naturally dissolves.\n3. **Navigating the Dark Night of the Soul**: If you are experiencing a collapse of old identities, know that this is sacred shedding. The old foundation must fall away for authentic truth and spiritual presence to emerge.\n4. **Chakra & Energetic Alignment**: Bring your breath down along your central energetic channel (Sushumna Nadi) from the root (Muladhara) to the crown (Sahasrara), aligning groundedness with spiritual clarity.`,
        affirmation: "I am not the passing waves of thought; I am the boundless ocean of silent awareness."
      };
    }

    // 3. Relationships, Attachment Styles, Heartbreak & Recovery
    if (p.includes('relationship') || p.includes('attachment') || p.includes('heartbreak') || p.includes('breakup') || p.includes('ex') || p.includes('partner') || p.includes('toxic') || p.includes('narcissis') || p.includes('boundar') || p.includes('intimacy') || p.includes('communication') || p.includes('divorce') || p.includes('forgive')) {
      return {
        text: `**Relationship Healing & Emotional Recovery**\n\nRelationships are powerful mirrors reflecting our unhealed attachment wounds, unresolved inner child needs, and core conditioning. Transforming your relationships begins with cultivating internal security.\n\n**Keys to Relationship Recovery & Mastery:**\n1. **Healing Attachment Insecurity**: Anxious attachment stems from fear of abandonment; avoidant attachment stems from fear of engulfment. To heal, become the compassionate, secure parent to your own inner child first.\n2. **Conscious Non-Violent Communication (NVC)**: Speak through the 4-step framework:\n   - *Observation*: "When I notice X..."\n   - *Feeling*: "I feel vulnerable/unheard..."\n   - *Need*: "Because my core need is safety/connection..."\n   - *Request*: "Would you be open to talking through this tonight?"\n3. **Sovereign Boundaries**: A boundary is not an aggressive wall; it is a clear, loving guideline for how you allow others to interact with your energy.\n4. **Heartbreak & Emotional Release**: Grief is love with nowhere to go. Practice the Hawaiian **Ho'oponopono** mantra directed to your heart: *"I am sorry. Please forgive me. Thank you. I love you."*`,
        affirmation: "I establish loving boundaries, honor my emotional needs, and attract conscious love."
      };
    }

    // 4. Meditation Traditions & Advanced Breathwork
    if (p.includes('vipassana') || p.includes('zen') || p.includes('zazen') || p.includes('yoga nidra') || p.includes('transcendental') || p.includes('metta') || p.includes('loving-kindness') || p.includes('pranayama') || p.includes('nadi shodhana') || p.includes('dhyana') || p.includes('mantra') || p.includes('singing bowl')) {
      return {
        text: `**Deep Meditation & Breath Disciplines**\n\nMeditation is the art of familiarizing the mind with its own natural stillness.\n\n**Core Traditional Disciplines:**\n- **Vipassana (Insight Meditation)**: Objective, equanimous observation of physical bodily sensations (Vedana) without craving pleasant states or resisting unpleasant ones. This systematically unconditions deep-seated mental reactivity (Sankharas).\n- **Yoga Nidra (Psychic Sleep)**: A guided threshold state between wakefulness and deep sleep (Theta/Delta waves) that releases deep subconscious tension and reprogramms your neural blueprint.\n- **Metta (Loving-Kindness)**: Expanding unconditional goodwill: *"May all beings be safe, peaceful, healthy, and live with ease."*\n- **Nadi Shodhana (Alternate Nostril Breathing)**: Restores neurological balance between the left (logical/parasympathetic) and right (creative/sympathetic) brain hemispheres.\n- **Sound & Mantra Meditation**: Using 432Hz/528Hz acoustic entrainment or sacred primordial syllables (Om, So-Hum) to dissolve mental chatter.`,
        affirmation: "In the sacred silence of meditation, I reunite with my deepest truth."
      };
    }

    // 5. Mindfulness in Daily Life & Mindful Living
    if (p.includes('mindful') || p.includes('presence') || p.includes('present moment') || p.includes('now') || p.includes('autopilot') || p.includes('eating') || p.includes('equanimity') || p.includes('non-attachment') || p.includes('flow state')) {
      return {
        text: `**Mindfulness & Everyday Presence**\n\nMindfulness is paying attention on purpose, in the present moment, without judgment. When mindfulness becomes a way of living rather than a 10-minute exercise, your entire life transforms.\n\n**Everyday Mindfulness Practices:**\n1. **The STOP Practice**: \n   - **S**top whatever you are doing.\n   - **T**ake one conscious, diaphragmatic breath.\n   - **O**bserve your sensations, emotions, and thoughts without judging them.\n   - **P**roceed with clarity, intentionality, and grace.\n2. **Mindful Sensory Engagement**: Whether washing dishes, sipping tea, or walking, engage all five senses. Feel the warmth, hear the subtle sounds, notice the textures.\n3. **Cultivating Equanimity (Upekkha)**: Allowing reality to be as it is in this exact second, without needing to fight or manipulate it. Peace is not the absence of storms; it is peace in the midst of the storm.`,
        affirmation: "I anchor my awareness in the sacred present moment where peace resides."
      };
    }

    // 6. Stress Management, Polyvagal Theory & Burnout Recovery
    if (p.includes('stress') || p.includes('burnout') || p.includes('work') || p.includes('pressure') || p.includes('overwhelm') || p.includes('cortisol') || p.includes('polyvagal') || p.includes('exhaust')) {
      return {
        text: `**Comprehensive Stress Management & Nervous System Recalibration**\n\nChronic stress occurs when your autonomic nervous system remains locked in a sympathetic hyper-arousal state, flooding your body with cortisol and adrenaline.\n\n**Evidence-Based Reset Protocol:**\n1. **Somatic Polyvagal Vagus Nerve Reset**: \n   - Perform the **4-7-8 Breathing Cycle**: Inhale 4s through the nose, gently hold 7s, and exhale slowly through slightly parted lips for 8s. 4 cycles will drop heart rate variability into rest-and-digest.\n   - **Vocal Toning (Bhramari / Humming)**: Make a low "Voo" or "Hum" sound on long exhales. The vibration stimulates the ventral vagal pathway in the larynx.\n2. **Cognitive De-escalation**: Ask yourself: *"Is this an actual survival emergency, or an urgent narrative created by mental expectations?"*\n3. **Radical Priority Pruning**: Strip away non-essential tasks for the next 48 hours. Your physical and emotional well-being is the foundation from which all accomplishment flows.`,
        affirmation: "I release the urgency of the world and honor my nervous system's need for peace."
      };
    }

    // 7. Inner Child Healing, Shadow Work & Self-Worth
    if (p.includes('inner child') || p.includes('shadow') || p.includes('self-worth') || p.includes('shame') || p.includes('guilt') || p.includes('imposter') || p.includes('worth') || p.includes('confidence') || p.includes('trauma')) {
      return {
        text: `**Inner Child Healing & Shadow Integration**\n\nCarl Jung stated: *"Until you make the unconscious conscious, it will direct your life and you will call it fate."*\n\n**Healing Your Inner Child & Shadow:**\n1. **Inner Child Dialogue**: Place your hand over your heart. Envision yourself as a 5- or 7-year-old. Speak to that child: *"I see you. You are completely safe now. You no longer have to perform, be perfect, or carry adult burdens to be loved."*\n2. **Shadow Integration**: The qualities in others that trigger strong irritation in you often point to repressed parts of your own shadow. Ask: *"What is this trigger trying to show me about my disowned emotions?"*\n3. **Overcoming Imposter Syndrome**: Recognize that feelings of inadequacy are common survival defenses. Your worth is intrinsic, not earned through exhausting perfectionism.`,
        affirmation: "I embrace every part of myself with unconditional love, compassion, and acceptance."
      };
    }

    // 8. Founder & Coach Mainak Chatterjee
    if (p.includes('mainak') || p.includes('chatterjee') || p.includes('founder') || p.includes('coach') || p.includes('mentor')) {
      return {
        text: `**Coach Mainak Chatterjee** is the founder of the **Path to Inner Peace** wellness platform.\n\nHe is an accomplished Mindset & Life Coach, Certified CBT Practitioner, International Wellness & Spiritual Mentor, and Career Consultant. Coach Mainak leads our **5-Day Mind Reset Challenge**, conducts **Weekly Live Masterclasses** every Sunday at 11:00 AM IST on Google Meet, and provides personalized 1:1 sessions through **Career Axis**.`,
        affirmation: "I am guided toward higher awareness and grounded inner peace."
      };
    }

    // 9. 5-Day Challenge
    if (p.includes('5-day') || p.includes('5 day') || p.includes('challenge') || p.includes('curriculum') || p.includes('roadmap') || (p.includes('day') && (p.includes('1') || p.includes('2') || p.includes('3') || p.includes('4') || p.includes('5')))) {
      return {
        text: `The **5-Day Mind Reset Challenge** is a 30-minute daily roadmap designed to rewire mental habits:\n\n- **Day 1: Nervous System Reset & Box Breathing** — Regulate autonomic tone and stimulate the vagus nerve.\n- **Day 2: Sound Healing & Theta Frequencies** — 432Hz and 528Hz restorative frequencies to calm brainwaves.\n- **Day 3: CBT Cognitive Distortions & Journaling** — Identify automatic negative thoughts and break catastrophic thought loops.\n- **Day 4: Emotional Release & Forgiveness** — Release repressed emotional baggage and practice heart-centered clearing.\n- **Day 5: Awakening & Daily Habits** — Anchor morning/evening routines and earn your **Certificate of Completion**.\n\nYou are currently on Day ${user.currentDay}! You can access your daily module from the Dashboard.`,
        affirmation: "Day by day, I rewire my mind for lasting clarity and calm."
      };
    }

    // 10. Weekly Live Masterclasses
    if (p.includes('weekly') || p.includes('live session') || p.includes('sunday') || p.includes('google meet') || p.includes('meet link') || p.includes('masterclass')) {
      return {
        text: `Our **Weekly Live Mental Fitness Masterclass** takes place every **Sunday at 11:00 AM IST** live on **Google Meet** with Coach Mainak Chatterjee.\n\n**Highlights:**\n- Live interactive video session & guided group meditation.\n- Deep-dive into CBT reframing, emotional resilience, and mindset mastery.\n- Direct **Live Q&A** where you can ask personal questions.\n\n**To Join:** Click **"Register Now"** under Weekly Live Sessions on the Inner Shift or Explore page to receive your Google Meet invitation link on WhatsApp!`,
        affirmation: "I show up consistently for my growth, mental health, and community."
      };
    }

    // 11. Guided Meditation & Camps
    if (p.includes('camp') || p.includes('retreat') || p.includes('guided meditation') || p.includes('meditation') || p.includes('silence')) {
      return {
        text: `Under **Inner Shift**, we offer immersive **Guided Meditation & Camps**:\n\n- **Weekend Silence & Dhyana Retreat**: Deep sensory withdrawal and breath awareness.\n- **7-Day Guided Inner Peace Camp**: Daily progressive mindfulness practices.\n- **21-Day Sunrise Mindfulness Camp**: Morning 6:00 AM IST routine establishment for neuroplasticity.\n\n**Daily Batches**: Morning (6:00 AM IST) and Evening (7:00 PM IST). Register by clicking the **Guided Meditation** card in Inner Shift!`,
        affirmation: "In the stillness of meditation, I discover my infinite peace."
      };
    }

    // 12. Sound Frequency Therapy
    if (p.includes('sound') || p.includes('frequency') || p.includes('432') || p.includes('528') || p.includes('binaural') || p.includes('theta') || p.includes('healing audio')) {
      return {
        text: `**Sound Frequency Therapy** works through acoustic brainwave entrainment:\n\n- **432 Hz (Miracle Tone)**: Aligns with natural biological resonance, reduces cortisol, and brings deep tranquility.\n- **528 Hz (Transformation & Repair)**: Promotes mental clarity, cell recovery, and emotional release.\n- **Theta Waves (4-7 Hz)**: Ideal for meditation, deep restorative rest, and dissolving anxiety.\n\nYou can listen to our soundscapes in the **Sound Therapy** player inside Inner Shift!`,
        affirmation: "Healing vibrations restore harmony to every cell of my body."
      };
    }

    // 13. 4-7-8 Breathing
    if (p.includes('breath') || p.includes('4-7-8') || p.includes('box breath') || p.includes('vagus')) {
      return {
        text: `The **4-7-8 Vagus Nerve Breathing Technique** is a natural nervous system reset:\n\n1. **Inhale (4s)**: Inhale deeply and quietly through your nose into your belly.\n2. **Hold (7s)**: Gently retain your breath without straining.\n3. **Exhale (8s)**: Slowly and completely exhale through slightly parted lips with a soft whoosh sound.\n\nRepeat 4 to 8 cycles. The prolonged exhale activates your parasympathetic nervous system, slowing heart rate and inducing immediate calm. Practice with our animated breathing sphere in the **4-7-8 Breathing** module!`,
        affirmation: "With every conscious exhale, I release tension and invite peace."
      };
    }

    // 14. Career & Counselling, Ikigai, Purpose & Workplace Resilience
    if (p.includes('career') || p.includes('counsel') || p.includes('counselling') || p.includes('career axis') || p.includes('job') || p.includes('interview') || p.includes('promotion') || p.includes('workplace') || p.includes('profession') || p.includes('resume') || p.includes('ikigai') || p.includes('salary') || p.includes('transition') || p.includes('colleague') || p.includes('leadership')) {
      return {
        text: `**Career Counseling, Professional Fulfillment & Ikigai Alignment**\n\nTrue professional success is achieved when your inner strengths, psychological resilience, and outer ambitions work in harmony without sacrificing your mental peace.\n\n**Core Career Mastery Pillars:**\n1. **The Ikigai Alignment Framework**: Evaluate your path across 4 intersecting dimensions:\n   - *Passion*: What you naturally love doing.\n   - *Vocation*: What the world needs and values.\n   - *Profession*: What you can be paid well for.\n   - *Mission*: Where your unique strengths solve meaningful problems.\n2. **Managing Workplace Imposter Syndrome**: Feelings of self-doubt are normal during growth. Reframe your inner monologue from *"I must know everything"* to *"I am a capable learner who adds distinct value."*\n3. **Psychological Boundary Setting**: Prevent burnout by separating your personal self-worth from daily workplace emergencies. Communicate clear turn-around timelines and protect restorative off-hours.\n4. **1:1 Mentorship with Coach Mainak Chatterjee**: For personalized career roadmapping, resume/interview psychological prep, and executive mindset mastery, explore **Career Axis** in the main navigation!`,
        affirmation: "My professional path expands in perfect harmony with my highest potential and inner peace."
      };
    }

    // 15. CBT Techniques
    if (p.includes('cbt') || p.includes('cognitive') || p.includes('distortion') || p.includes('reframe') || p.includes('video technique')) {
      return {
        text: `**Cognitive Behavioral Therapy (CBT)** teaches that *thoughts determine feelings, which guide behaviors*.\n\nOur **CBT 12 Master Video Techniques** help you identify cognitive distortions like catastrophizing or emotional reasoning, and replace them with objective, empowering truths. Access all 12 modules from your dashboard!`,
        affirmation: "I am not my thoughts; I am the conscious master of my mind."
      };
    }

    // 16. Anxiety & Panic
    if (p.includes('anxiety') || p.includes('panic') || p.includes('worry') || p.includes('fear') || p.includes('nervous')) {
      return {
        text: `When anxiety surges, ground yourself immediately using the **5-4-3-2-1 Somatic Grounding Technique**:\n- **5** things you can see around you.\n- **4** things you can physically touch.\n- **3** distinct sounds you can hear.\n- **2** scents you can smell.\n- **1** positive truth about yourself.\n\nCombine this with 3 cycles of **4-7-8 breathing** (Inhale 4s, Hold 7s, Exhale 8s). Remind yourself: *"I am safe in this present moment."*`,
        affirmation: "I release the illusion of control and rest safely in this present moment."
      };
    }

    // 17. Overthinking Loops
    if (p.includes('overthink') || p.includes('loop') || p.includes('head') || p.includes('ruminat') || p.includes('racing')) {
      return {
        text: `Overthinking is cognitive entanglement—confusing *thinking* with *solving*.\n\n**3 Steps to Stop Mental Loops:**\n1. **Observe and Label**: Say silently, *"I am noticing the thought that..."* This creates immediate distance between you and the mental noise.\n2. **The 10-Minute Worry Window**: Schedule a set time later today to write down your worries.\n3. **Body Grounding**: Feel both feet flat on the floor and take 3 deep belly breaths to pull energy out of the head into the physical body.`,
        affirmation: "I am the calm sky; my thoughts are simply passing clouds."
      };
    }

    // 18. Sleep & Rest
    if (p.includes('sleep') || p.includes('night') || p.includes('insomnia') || p.includes('bed') || p.includes('rest') || p.includes('tired')) {
      return {
        text: `**Restful Sleep Routine:**\n1. **Theta Sound Frequency**: Play our 432Hz / Theta soundscape from the Sound Therapy tab.\n2. **Progressive Muscle Release**: Tighten your toes for 5 seconds, then let them go limp. Work your way up to your jaw and forehead.\n3. **Mental Download**: Write any lingering to-do items on paper to clear cognitive load.\n\nRemind yourself: *"My day is complete. There is nothing I need to solve tonight."*`,
        affirmation: "I surrender today's efforts and allow my body and mind to deeply rest."
      };
    }

    // 19. Dynamic Open-Ended Contextual Synthesizer for any other topic
    const words = prompt.trim().split(' ').filter(w => w.length > 3).slice(0, 4).join(' ');
    const summary = words ? `regarding "${words}"` : "on your mind";

    return {
      text: `Thank you for bringing your question ${summary} to the **Inner Peace Guide**.\n\nAcross modern psychology, mindfulness, and spiritual wisdom, conscious awareness is the catalyst for transformation. When reflecting on this topic, consider these 3 core pillars:\n\n1. **Cognitive Clarity**: Distinguish between objective reality and the mind's automatic stories or assumptions. Notice the difference between what is actually happening and how your mind interprets it.\n2. **Somatic & Nervous System Attunement**: Notice where this topic lands in your physical body. Take three slow, grounding breaths (inhale for 4 seconds, exhale for 8 seconds) to soften physical resistance.\n3. **Higher Perspective & Inner Wisdom**: Ask yourself: *"If I viewed this situation from unconditional self-compassion, peace, and spiritual growth, what would be the most constructive next step?"*\n\nYou are always whole, capable, and capable of returning to your centered inner stillness.`,
      affirmation: `I choose clarity, peace of mind, and inner alignment as I navigate ${summary}.`
    };
  };

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputPrompt('');
    setLoading(true);

    const historyPayload = updatedMessages
      .filter(m => m.id !== 'welcome_1')
      .slice(-6)
      .map(m => ({
        sender: m.sender,
        text: m.text
      }));

    // Setup an AbortController with a 6.5s timeout for fast response guarantee while providing full AI depth
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    try {
      const res = await fetch('/api/ai-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryText.trim(),
          history: historyPayload,
          currentDay: user.currentDay,
          mood: 'Calm'
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server returned ${res.status}`);
      }

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.response || "Breathe deeply. Allow every thought to pass without resistance.",
        affirmation: data.suggestedAffirmation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      clearTimeout(timeoutId);
      // Instant intelligent fallback without ever hanging
      const fallbackData = getClientKnowledgeAnswer(queryText.trim());
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: fallbackData.text,
        affirmation: fallbackData.affirmation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputPrompt.trim()) {
      await sendQuery(inputPrompt);
    }
  };

  // Domain categories with curated quick prompts
  const topicCategories = [
    { id: 'all', label: '🌟 All Topics' },
    { id: 'wellness', label: '🌿 Stress & Somatics' },
    { id: 'meditation', label: '🧘 Meditation' },
    { id: 'mindfulness', label: '✨ Mindfulness' },
    { id: 'relationships', label: '❤️ Relationships & Recovery' },
    { id: 'consciousness', label: '🌌 Higher Consciousness' },
    { id: 'career', label: '💼 Career & Counselling' },
    { id: 'hub', label: '🏆 Hub Programs' }
  ];

  const [selectedCategory, setSelectedCategory] = useState('all');

  const promptsByCategory: Record<string, string[]> = {
    all: [
      "How to heal an anxious attachment style in a relationship?",
      "Explain witness consciousness (Sakshi Bhav) and ego transcendence",
      "How to align my career with Ikigai and overcome workplace burnout?",
      "How to do a 10-minute somatic reset for anxiety & cortisol?",
      "What are the core Vipassana & Yoga Nidra meditation techniques?",
      "How to stop overthinking loops with CBT reframing?"
    ],
    wellness: [
      "How to stimulate the vagus nerve using 4-7-8 breathing?",
      "How to recover from chronic work burnout and nervous system exhaustion?",
      "What is the 5-4-3-2-1 somatic grounding method for panic attacks?",
      "How do 432Hz and 528Hz acoustic frequencies lower cortisol?"
    ],
    meditation: [
      "What are the steps of Vipassana insight body scan meditation?",
      "How does Yoga Nidra reprogram subconscious neural patterns?",
      "How to practice Nadi Shodhana (alternate nostril breathing)?",
      "How to practice Metta (Loving-Kindness) meditation for emotional release?"
    ],
    mindfulness: [
      "How to break autopilot reactivity using the STOP mindfulness method?",
      "How to cultivate non-attachment and equanimity (Upekkha)?",
      "How to enter deep creative flow states through mindful focus?",
      "How to practice mindful eating and sensory grounding in daily life?"
    ],
    relationships: [
      "How to heal an anxious attachment style and overcome fear of abandonment?",
      "How to recover from a toxic or narcissistic relationship dynamic?",
      "How to set healthy emotional boundaries without guilt?",
      "How to heal heartbreak and release grief using Ho'oponopono?"
    ],
    consciousness: [
      "Explain Witness Consciousness (Sakshi Bhav) vs. the egoic mind",
      "How to navigate the Dark Night of the Soul and spiritual crisis?",
      "How to do Carl Jung shadow integration for repressed emotions?",
      "How to align the 7 Chakras along the central Sushumna channel?"
    ],
    career: [
      "How to align my career path with my natural strengths & Ikigai?",
      "How to overcome imposter syndrome in a competitive workplace?",
      "How to maintain psychological boundaries in high-stress jobs?",
      "How does Coach Mainak's 1:1 Career Axis consultation work?"
    ],
    hub: [
      "What is the 5-Day Mind Reset Challenge curriculum?",
      "How do I join the Sunday 11:00 AM IST Live Masterclass on Google Meet?",
      "What are the 12 CBT Video Masterclasses in the dashboard?",
      "Tell me about the 21-Day Sunrise Mindfulness Camp"
    ]
  };

  const currentPrompts = promptsByCategory[selectedCategory] || promptsByCategory.all;

  // Helper to render basic markdown (bold text, lists, linebreaks) cleanly
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-2">
        {lines.map((line, lIdx) => {
          const trimmed = line.trim();
          if (!trimmed) {
            return <div key={lIdx} className="h-1" />;
          }

          // Bullet points
          if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
            const content = trimmed.substring(2);
            return (
              <div key={lIdx} className="flex items-start gap-2 pl-2">
                <span className="text-[#D4AF37] font-bold mt-0.5">•</span>
                <span className="flex-1">{formatInline(content)}</span>
              </div>
            );
          }

          // Numbered lists
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={lIdx} className="flex items-start gap-2 pl-2">
                <span className="text-[#0B6B53] font-bold text-xs mt-0.5">{numMatch[1]}.</span>
                <span className="flex-1">{formatInline(numMatch[2])}</span>
              </div>
            );
          }

          return (
            <p key={lIdx} className="leading-relaxed">
              {formatInline(line)}
            </p>
          );
        })}
      </div>
    );
  };

  const formatInline = (text: string) => {
    // Parse **bold** text
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong key={pIdx} className="font-semibold text-slate-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      if (part.startsWith('*') && part.endsWith('*')) {
        return (
          <em key={pIdx} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }
      return part;
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-fadeIn pb-24">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#0B6B53] font-bold text-xs rounded-full border border-emerald-100 shadow-sm">
          <Compass className="w-4 h-4 text-[#0B6B53]" />
          <span>24/7 WELLNESS & COACH AI COMPANION</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Inner Peace Guide & Coach AI
        </h1>
        <p className="text-slate-600 text-sm">
          Powered by ChatGPT & Advanced AI. Ask anything regarding Wellness, Stress Management, Meditation, Mindfulness, Relationship Recovery, Higher Consciousness, or Career Counselling.
        </p>
      </div>

      {/* Domain Category Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none px-1">
        {topicCategories.map((cat) => (
          <button
            key={cat.id}
            type="button"
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 shrink-0 ${
              selectedCategory === cat.id
                ? 'bg-[#0B6B53] text-white shadow-sm ring-2 ring-[#0B6B53]/20'
                : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[620px]">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#0B6B53] to-[#134E4A] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                <span>Inner Peace Guide & Coach</span>
                <span className="px-2 py-0.5 bg-emerald-800/80 text-emerald-200 text-[10px] font-semibold rounded-full border border-emerald-500/30">
                  ChatGPT & AI Active
                </span>
              </h3>
              <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Comprehensive Wellness, Consciousness & Career Mentor
              </span>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            title="Reset Conversation"
            className="p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition-all flex items-center gap-1 text-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[88%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-[#0B6B53] text-[#D4AF37]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm space-y-2.5 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#0B6B53] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                {msg.sender === 'user' ? (
                  <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>
                ) : (
                  renderFormattedText(msg.text)
                )}

                {msg.affirmation && (
                  <div className="p-3 bg-amber-50/90 border-l-2 border-[#D4AF37] text-slate-900 text-xs rounded-r-xl font-medium shadow-xs">
                    <span className="text-[#0B6B53] font-bold block mb-0.5">✨ Daily Affirmation:</span>
                    "{msg.affirmation}"
                  </div>
                )}

                <span className={`text-[10px] block text-right ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 mr-auto max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-[#0B6B53] text-[#D4AF37] flex items-center justify-center">
                <Compass className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-500 italic flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                ChatGPT & Inner Peace Guide is formulating your personalized answer...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts based on Active Category */}
        <div className="p-2.5 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto scrollbar-none">
          <Lightbulb className="w-4 h-4 text-[#D4AF37] shrink-0 ml-1" />
          {currentPrompts.map((sp, idx) => (
            <button
              key={idx}
              type="button"
              disabled={loading}
              onClick={() => sendQuery(sp)}
              className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-[#0B6B53] text-[11px] font-medium text-slate-700 rounded-full whitespace-nowrap transition-colors disabled:opacity-50 border border-slate-200/60 shrink-0"
            >
              {sp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask anything on wellness, stress, meditation, mindfulness, relationships, higher consciousness, or career..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={loading || !inputPrompt.trim()}
            className="px-5 py-3 bg-[#0B6B53] hover:bg-[#134E4A] disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
