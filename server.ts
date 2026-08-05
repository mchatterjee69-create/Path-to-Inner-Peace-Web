import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Path to Inner Peace", timestamp: new Date().toISOString() });
});

// Razorpay Create Subscription endpoint
app.post(["/create-subscription", "/api/create-subscription"], async (req, res) => {
  try {
    const { plan_id } = req.body;
    const razorpayKeyId = process.env.RAZORPAY_KEY_ID || process.env.VITE_RAZORPAY_KEY_ID || "rzp_live_TL902GeGcyUkIo";
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    const targetPlanId = plan_id || "plan_TKyyIg8RAcWLUv";
    let subscriptionId = "";
    let isRealSubscription = false;

    // If actual Razorpay credentials are set, attempt calling Razorpay API
    if (razorpayKeySecret && razorpayKeyId) {
      try {
        const auth = Buffer.from(`${razorpayKeyId}:${razorpayKeySecret}`).toString("base64");
        const rzpResponse = await fetch("https://api.razorpay.com/v1/subscriptions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Basic ${auth}`
          },
          body: JSON.stringify({
            plan_id: targetPlanId,
            total_count: 12,
            quantity: 1,
            customer_notify: 1
          })
        });
        const rzpData = await rzpResponse.json();
        if (rzpData && rzpData.id) {
          subscriptionId = rzpData.id;
          isRealSubscription = true;
        }
      } catch (err) {
        console.warn("Razorpay API request error:", err);
      }
    }

    res.json({
      subscription_id: subscriptionId || null,
      is_real_subscription: isRealSubscription,
      key: razorpayKeyId
    });
  } catch (error: any) {
    console.error("Error creating Razorpay subscription:", error);
    res.status(500).json({ error: "Failed to create subscription" });
  }
});

// Helper for dynamic intelligent CBT response when Gemini API is unavailable or unconfigured
function generateDynamicCbtResponse(prompt: string, currentDay: number = 1, mood: string = 'Calm') {
  const p = prompt.toLowerCase();
  
  if (p.includes('anxiety') || p.includes('anxious') || p.includes('fear') || p.includes('panic') || p.includes('worry')) {
    return {
      response: `Anxiety is simply your nervous system's misplaced attempt to protect you. When you feel anxiety rising, your body enters a sympathetic "fight or flight" surge.\n\nTo re-frame this immediately, try the **4-7-8 Vagus Reset**: Inhale through your nose for 4 seconds, hold gently for 7 seconds, and exhale completely with a soft sigh for 8 seconds. Remind yourself: *"This feeling is uncomfortable, but it is not dangerous."*\n\nAsk yourself: What is 1 thing in your immediate physical surroundings that you can see, touch, and hear right now? Grounding brings you back to the present moment.`,
      suggestedAffirmation: "I release the need to control the future and trust in my present strength."
    };
  }
  
  if (p.includes('overthink') || p.includes('thought') || p.includes('loop') || p.includes('mind') || p.includes('head')) {
    return {
      response: `Overthinking happens when we confuse *thinking* about a problem with *solving* a problem. In CBT psychology, we call this cognitive entanglement.\n\nInstead of trying to stop your thoughts, shift your role to the **Calm Observer**. Imagine standing by a quiet riverbank: your thoughts are leaves floating downstream. You don't need to jump into the water to grab every leaf—just observe them pass by.\n\nPractice saying to yourself: *"I am noticing the thought that..."* This simple linguistic shift creates immediate space between your awareness and the mental noise.`,
      suggestedAffirmation: "I am the peaceful observer of my thoughts, not the noise itself."
    };
  }

  if (p.includes('stress') || p.includes('overwhelm') || p.includes('work') || p.includes('pressure') || p.includes('busy')) {
    return {
      response: `Overwhelm occurs when your mind tries to process ten tasks at once instead of honoring the single present step.\n\nTake a 60-second micro-reset right now. Drop your shoulders away from your ears, un-clench your jaw, and let your abdomen expand fully on your next breath. Ask yourself: *"What is the single most meaningful action I can take in the next 15 minutes?"*\n\nLet go of the non-essential for today. Excellence comes from focused calm, not hurried exhaustion.`,
      suggestedAffirmation: "I prioritize my inner peace over external urgency."
    };
  }

  if (p.includes('sleep') || p.includes('night') || p.includes('insomnia') || p.includes('bed') || p.includes('rest')) {
    return {
      response: `Preparing your mind for rest requires systematically signaling safety to your physical body.\n\nAs you lie down, practice **Somatic Muscle Release**: tense your toes for 5 seconds, then let them fall completely limp. Move slowly up to your legs, hands, shoulders, and face. Pair this with our Day 1 or Day 2 soundscapes (Rain with Theta Binaural Tones) to naturally synchronize your brainwaves for deep sleep.`,
      suggestedAffirmation: "I surrender today's efforts and rest in complete peace."
    };
  }

  if (p.includes('confidence') || p.includes('worth') || p.includes('doubt') || p.includes('fail') || p.includes('imposter')) {
    return {
      response: `Self-doubt is rarely based on facts; it is born from old emotional conditioning. You do not need to feel 100% confident before taking action; confidence is forged *through* taking aligned action.\n\nRecognize that your inner critic is just an outdated script. Reframe your inner dialogue: replace *"What if I mess up?"* with *"What if this leads to my greatest growth?"*\n\nYou have survived 100% of your hardest days so far. Trust your inner resilience.`,
      suggestedAffirmation: "I am worthy, capable, and growing stronger every day."
    };
  }

  return {
    response: `Thank you for sharing your reflection. On Day ${currentDay} of your Mind Reset journey, bringing conscious awareness to your thoughts is the catalyst for genuine inner transformation.\n\nRemember the core CBT principle: Thoughts trigger emotions, but you possess the inherent power to choose your response to any thought. Pause, place a hand over your heart, and take three intentional, deep breaths.\n\nWhat is one small act of kindness or clarity you can offer yourself in this exact moment?`,
    suggestedAffirmation: "I choose peace, clarity, and self-compassion today."
  };
}

// AI Reflection Assistant endpoint using Gemini 2.5 Flash
app.post("/api/ai-reflection", async (req, res) => {
  try {
    const { prompt, journalContext, currentDay, mood } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `You are the "Mind Mastery & Stress Reset Coach", an empathetic psycho-spiritual guide trained in CBT psychology, breathwork, vagus nerve regulation, and mindfulness methods.
Your goal is to promptly answer any question and help users quiet their minds, overcome overthinking, and find inner peace.
User Context:
- Current Challenge Day: ${currentDay || 1}
- Recent Mood: ${mood || 'Calm'}
${journalContext ? `- Journal Entry: "${journalContext}"` : ''}

Rules:
1. Speak with warm compassion, clarity, practical CBT reframing, and grounded spiritual wisdom.
2. Directly answer the user's question with 2-3 concise, actionable paragraphs.
3. Always include 1 inspiring affirmation at the end formatted as "Affirmation: [Your text]".
4. Never give medical diagnosis; focus on mental reset, breath awareness, emotional regulation, and inner clarity.`;

    if (apiKey) {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: [
            { role: 'user', parts: [{ text: `${systemPrompt}\n\nUser Question/Reflection: ${prompt}` }] }
          ]
        });

        const replyText = response.text || "";
        if (replyText) {
          let affirmation = "I am grounded, peaceful, and in control of my inner calm.";
          const match = replyText.match(/Affirmation:\s*([^\n]+)/i);
          if (match && match[1]) {
            affirmation = match[1].trim();
          }

          return res.json({
            response: replyText.replace(/Affirmation:\s*[^\n]+/i, '').trim(),
            suggestedAffirmation: affirmation
          });
        }
      } catch (geminiError: any) {
        console.warn("Gemini API call warning/fallback:", geminiError?.message || geminiError);
      }
    }

    // Dynamic Intelligent CBT & Mind Mastery Fallback Response Engine
    const fallback = generateDynamicCbtResponse(prompt, currentDay, mood);
    return res.json(fallback);

  } catch (error: any) {
    console.error("AI Reflection Error:", error);
    res.json({ 
      response: "Take a gentle deep breath in through your nose for 4 seconds, hold for 4, and exhale smoothly. Whatever is on your mind right now is valid, but it does not define your essence.",
      suggestedAffirmation: "I am safe, calm, and present in this moment."
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Path to Inner Peace server running on http://localhost:${PORT}`);
  });
}

startServer();
