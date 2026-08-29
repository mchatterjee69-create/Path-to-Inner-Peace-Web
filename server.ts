import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import OpenAI from "openai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

// Lazy OpenAI client initialization for ChatGPT integration
let openAiClientInstance: OpenAI | null = null;
function getOpenAIClient(): OpenAI | null {
  const key = process.env.OPENAI_API_KEY;
  if (!key || key === "MY_OPENAI_API_KEY" || key.trim() === "") return null;
  if (!openAiClientInstance) {
    openAiClientInstance = new OpenAI({ apiKey: key.trim() });
  }
  return openAiClientInstance;
}

const app = express();
const PORT = 3000;

app.use(express.json());

// Target recipient email for all form registrations
const ADMIN_NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || "mchatterjee69@gmail.com";

// Store for all registration form submissions
interface StoredRegistrationRecord {
  id: string;
  formType: string;
  fullName: string;
  email: string;
  mobile: string;
  details: Record<string, any>;
  receivedAt: string;
}

const userRegistrationsStore: StoredRegistrationRecord[] = [];

// ==========================================
// EMAIL NOTIFICATION DISPATCH ENGINE
// ==========================================
async function sendRegistrationEmailToAdmin(payload: {
  formType: string;
  fullName?: string;
  email?: string;
  mobile?: string;
  details?: Record<string, any>;
  receivedAt?: string;
}) {
  const timestamp = payload.receivedAt || new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata" });
  const recipient = ADMIN_NOTIFICATION_EMAIL;

  const detailsRows = Object.entries(payload.details || {})
    .filter(([_, val]) => val !== undefined && val !== null && val !== '')
    .map(([key, val]) => `
      <tr>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0B6B53; width: 35%; text-transform: capitalize;">${key.replace(/([A-Z])/g, ' $1')}:</td>
        <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #1e293b;">${typeof val === 'object' ? JSON.stringify(val) : String(val)}</td>
      </tr>
    `).join('');

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #cbd5e1; border-radius: 16px; overflow: hidden; background-color: #ffffff; box-shadow: 0 4px 12px rgba(0,0,0,0.08);">
      <div style="background: linear-gradient(135deg, #0B6B53 0%, #134E4A 100%); padding: 24px; text-align: center; color: #ffffff;">
        <div style="font-size: 28px; margin-bottom: 6px;">📋</div>
        <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.5px; color: #ffffff;">New User Registration Received</h2>
        <p style="margin: 6px 0 0 0; font-size: 13px; color: #a7f3d0; font-weight: 500;">Path to Inner Peace — ${payload.formType}</p>
      </div>
      <div style="padding: 28px 24px;">
        <div style="background-color: #f0fdf4; border-left: 4px solid #0B6B53; padding: 12px 16px; border-radius: 6px; margin-bottom: 20px;">
          <p style="margin: 0; font-size: 14px; font-weight: 700; color: #065f46;">Notification for Mainak Chatterjee (${recipient})</p>
          <p style="margin: 2px 0 0 0; font-size: 12px; color: #047857;">A new user submitted data on the <strong>Path to Inner Peace</strong> platform.</p>
        </div>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 16px;">
          <tbody>
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0B6B53; width: 35%;">Form Type:</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 700;">${payload.formType}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0B6B53;">Full Name:</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">${payload.fullName || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0B6B53;">Email Address:</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a;"><a href="mailto:${payload.email}" style="color: #0284c7; font-weight: 600; text-decoration: none;">${payload.email || 'N/A'}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0B6B53;">Mobile / WhatsApp:</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #0f172a; font-weight: 600;">${payload.mobile || 'N/A'}</td>
            </tr>
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; font-weight: 600; color: #0B6B53;">Submission Time:</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e2e8f0; color: #64748b;">${timestamp}</td>
            </tr>
            ${detailsRows}
          </tbody>
        </table>
      </div>
      <div style="background-color: #f8fafc; padding: 14px 24px; text-align: center; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0;">
        Path to Inner Peace Admin Lead System • Automated Dispatch to ${recipient}
      </div>
    </div>
  `;

  console.log(`\n==================================================`);
  console.log(`📧 NEW FORM REGISTRATION PUSHED TO ${recipient}`);
  console.log(`Form Type: ${payload.formType}`);
  console.log(`Name: ${payload.fullName} | Email: ${payload.email} | Mobile: ${payload.mobile}`);
  console.log(`Details:`, payload.details);
  console.log(`==================================================\n`);

  // Attempt Nodemailer if SMTP configured
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (host && user && pass) {
    try {
      const transporter = nodemailer.createTransport({
        host,
        port: Number(process.env.SMTP_PORT) || 587,
        secure: Number(process.env.SMTP_PORT) === 465,
        auth: { user, pass }
      });

      await transporter.sendMail({
        from: `"Path to Inner Peace Leads" <${user}>`,
        to: recipient,
        subject: `[New Lead] ${payload.formType} - ${payload.fullName || payload.email || 'User'}`,
        html: htmlBody
      });
      console.log(`✅ Registration email successfully sent via SMTP to ${recipient}`);
    } catch (err: any) {
      console.warn("SMTP email send warning:", err?.message || err);
    }
  }

  // Direct FormSubmit service dispatch to ensure instant delivery to mchatterjee69@gmail.com
  try {
    const flattenedDetails: Record<string, string> = {};
    if (payload.details && typeof payload.details === 'object') {
      Object.entries(payload.details).forEach(([k, v]) => {
        flattenedDetails[k] = typeof v === 'object' ? JSON.stringify(v) : String(v);
      });
    }

    const appOrigin = "https://ais-pre-shboembemwee4psokiddmd-22738377368.asia-southeast1.run.app";

    await fetch(`https://formsubmit.co/ajax/${recipient}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": appOrigin,
        "Referer": `${appOrigin}/`
      },
      body: JSON.stringify({
        _subject: `[New Form Submission] ${payload.formType} - ${payload.fullName || payload.email || 'User'}`,
        _captcha: "false",
        _template: "table",
        _replyto: payload.email || recipient,
        "Form Type": payload.formType,
        "Full Name": payload.fullName || "N/A",
        "Email Address": payload.email || "N/A",
        "Mobile / WhatsApp": payload.mobile || "N/A",
        "Submission Time": timestamp,
        ...flattenedDetails
      })
    });
    console.log(`✅ FormSubmit payload pushed to ${recipient}`);
  } catch (err: any) {
    console.warn("FormSubmit dispatch warning:", err?.message || err);
  }
}

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", app: "Path to Inner Peace", timestamp: new Date().toISOString() });
});

// ==========================================
// REGISTRATION FORM NOTIFICATION ENDPOINT
// ==========================================
app.post("/api/notify-registration", async (req, res) => {
  try {
    const { formType, fullName, email, whatsapp, mobile, details, country } = req.body;

    const cleanFullName = (fullName || (details && details.fullName) || "").trim();
    const cleanEmail = (email || (details && details.email) || "").trim();
    const cleanMobile = (whatsapp || mobile || (details && details.whatsapp) || (details && details.mobile) || "").trim();

    const record: StoredRegistrationRecord = {
      id: "REG-" + Date.now() + "-" + Math.random().toString(36).substring(2, 6).toUpperCase(),
      formType: formType || "General Registration",
      fullName: cleanFullName,
      email: cleanEmail,
      mobile: cleanMobile,
      details: {
        country: country || (details && details.country) || "India",
        ...details
      },
      receivedAt: new Date().toISOString()
    };

    userRegistrationsStore.push(record);

    // Push email notification to mchatterjee69@gmail.com
    await sendRegistrationEmailToAdmin({
      formType: record.formType,
      fullName: record.fullName,
      email: record.email,
      mobile: record.mobile,
      details: record.details,
      receivedAt: record.receivedAt
    });

    res.json({
      success: true,
      message: `Registration data pushed successfully to ${ADMIN_NOTIFICATION_EMAIL}`,
      recordId: record.id
    });
  } catch (error: any) {
    console.error("Error processing registration notification:", error);
    res.status(500).json({ success: false, error: "Server error occurred while notifying registration." });
  }
});

// Endpoint to retrieve all registrations
app.get("/api/admin/all-registrations", (_req, res) => {
  res.json({
    total: userRegistrationsStore.length,
    targetEmail: ADMIN_NOTIFICATION_EMAIL,
    registrations: userRegistrationsStore
  });
});


// ==========================================
// CAREER AXIS BOOKING & AVAILABILITY ENGINE
// ==========================================
interface CareerAxisBookingRecord {
  id: string;
  fullName: string;
  email: string;
  mobile: string;
  age: number;
  currentStatus: string;
  careerField: string;
  preferredDate: string; // YYYY-MM-DD
  preferredTime: string; // e.g. "10:00 AM"
  timezone: string;
  helpDescription: string;
  additionalInfo?: string;
  createdAt: string;
}

const CAREER_AXIS_DEFAULT_SLOTS = [
  '10:00 AM',
  '11:30 AM',
  '02:00 PM',
  '03:30 PM',
  '05:00 PM',
  '06:30 PM',
  '08:00 PM'
];

// Persistent in-memory bookings store
const careerAxisBookingsStore: CareerAxisBookingRecord[] = [
  {
    id: "CA-2026-INIT1",
    fullName: "Sample Client",
    email: "client@example.com",
    mobile: "+919876543210",
    age: 22,
    currentStatus: "Student",
    careerField: "Computer Science & AI",
    preferredDate: "2026-08-15",
    preferredTime: "02:00 PM",
    timezone: "Asia/Kolkata",
    helpDescription: "Seeking guidance on engineering specializations.",
    createdAt: new Date().toISOString()
  }
];

// Get Available Slots for a given Date
app.get("/api/career-axis/slots", (req, res) => {
  try {
    const { date } = req.query;
    if (!date || typeof date !== "string") {
      return res.status(400).json({ error: "Query parameter 'date' (YYYY-MM-DD) is required." });
    }

    const todayStr = new Date().toISOString().split('T')[0];
    const isPastDate = date < todayStr;

    // Get already booked times for this date
    const bookedTimes = new Set(
      careerAxisBookingsStore
        .filter(b => b.preferredDate === date)
        .map(b => b.preferredTime)
    );

    const now = new Date();
    
    const slots = CAREER_AXIS_DEFAULT_SLOTS.map(timeStr => {
      let isAvailable = !bookedTimes.has(timeStr) && !isPastDate;

      // If selected date is today, check if slot time has already passed
      if (date === todayStr && isAvailable) {
        const [time, modifier] = timeStr.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (modifier === 'PM' && hours < 12) hours += 12;
        if (modifier === 'AM' && hours === 12) hours = 0;

        const slotDateTime = new Date();
        slotDateTime.setHours(hours, minutes, 0, 0);

        if (slotDateTime <= now) {
          isAvailable = false;
        }
      }

      return {
        time: timeStr,
        available: isAvailable,
        booked: bookedTimes.has(timeStr)
      };
    });

    res.json({
      date,
      slots,
      isPastDate
    });
  } catch (error: any) {
    console.error("Error fetching Career Axis slots:", error);
    res.status(500).json({ error: "Failed to fetch time slots" });
  }
});

// Confirm a New Career Axis Booking
app.post("/api/career-axis/bookings", (req, res) => {
  try {
    const {
      fullName,
      email,
      mobile,
      age,
      currentStatus,
      careerField,
      preferredDate,
      preferredTime,
      timezone,
      helpDescription,
      additionalInfo
    } = req.body;

    // Server-side strict validations
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({ success: false, error: "Please enter a valid full name (minimum 2 characters)." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({ success: false, error: "Please provide a valid email address." });
    }

    const cleanMobile = (mobile || '').replace(/\s+/g, '');
    if (!cleanMobile || cleanMobile.length < 10) {
      return res.status(400).json({ success: false, error: "Please enter a valid mobile number with at least 10 digits." });
    }

    const numAge = Number(age);
    if (!age || isNaN(numAge) || numAge <= 0 || numAge > 120) {
      return res.status(400).json({ success: false, error: "Please enter a valid age." });
    }

    if (!currentStatus) {
      return res.status(400).json({ success: false, error: "Please select your current status." });
    }

    if (!careerField || typeof careerField !== 'string' || careerField.trim().length < 2) {
      return res.status(400).json({ success: false, error: "Please enter your current career or education field." });
    }

    if (!preferredDate || typeof preferredDate !== 'string') {
      return res.status(400).json({ success: false, error: "Please select a preferred session date." });
    }

    if (!preferredTime || typeof preferredTime !== 'string' || !preferredTime.trim()) {
      return res.status(400).json({ success: false, error: "Please select a valid time slot." });
    }

    if (!helpDescription || typeof helpDescription !== 'string' || helpDescription.trim().length < 2) {
      return res.status(400).json({ success: false, error: "Please briefly describe what you need help with." });
    }

    // Generate Unique Reference ID (e.g. CA-2026-8A3F2)
    const randomCode = Math.random().toString(36).substring(2, 7).toUpperCase();
    const referenceId = `CA-2026-${randomCode}`;

    const newBooking: CareerAxisBookingRecord = {
      id: referenceId,
      fullName: fullName.trim(),
      email: email.trim(),
      mobile: cleanMobile,
      age: numAge,
      currentStatus,
      careerField: careerField.trim(),
      preferredDate,
      preferredTime,
      timezone: timezone || "Local Timezone",
      helpDescription: helpDescription.trim(),
      additionalInfo: (additionalInfo || '').trim(),
      createdAt: new Date().toISOString()
    };

    // Save into backend store
    careerAxisBookingsStore.push(newBooking);

    // Also push into global userRegistrationsStore
    userRegistrationsStore.push({
      id: newBooking.id,
      formType: "Career Axis 1:1 Consulting Session Booking",
      fullName: newBooking.fullName,
      email: newBooking.email,
      mobile: newBooking.mobile,
      details: {
        age: newBooking.age,
        currentStatus: newBooking.currentStatus,
        careerField: newBooking.careerField,
        preferredDate: newBooking.preferredDate,
        preferredTime: newBooking.preferredTime,
        timezone: newBooking.timezone,
        helpDescription: newBooking.helpDescription,
        additionalInfo: newBooking.additionalInfo
      },
      receivedAt: newBooking.createdAt
    });

    // Push email notification to mchatterjee69@gmail.com
    sendRegistrationEmailToAdmin({
      formType: "Career Axis 1:1 Consulting Session Booking",
      fullName: newBooking.fullName,
      email: newBooking.email,
      mobile: newBooking.mobile,
      details: {
        referenceId: newBooking.id,
        age: newBooking.age,
        currentStatus: newBooking.currentStatus,
        careerField: newBooking.careerField,
        preferredDate: newBooking.preferredDate,
        preferredTime: newBooking.preferredTime,
        timezone: newBooking.timezone,
        helpDescription: newBooking.helpDescription,
        additionalInfo: newBooking.additionalInfo
      },
      receivedAt: newBooking.createdAt
    }).catch(err => console.error("Career Axis Email Notify Error:", err));

    console.log(`[Career Axis Backend] Successfully saved booking ${referenceId} for ${fullName} on ${preferredDate} at ${preferredTime}`);

    return res.json({
      success: true,
      booking: newBooking
    });

  } catch (error: any) {
    console.error("Error creating Career Axis booking:", error);
    res.status(500).json({ success: false, error: "Server error occurred while creating booking. Please try again." });
  }
});

// Admin / List Bookings Endpoint
app.get("/api/career-axis/bookings", (_req, res) => {
  res.json({
    total: careerAxisBookingsStore.length,
    bookings: careerAxisBookingsStore.map(b => ({
      id: b.id,
      fullName: b.fullName,
      preferredDate: b.preferredDate,
      preferredTime: b.preferredTime,
      currentStatus: b.currentStatus,
      createdAt: b.createdAt
    }))
  });
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

// Helper for dynamic intelligent CBT, Wellness Hub & Higher Consciousness response when Gemini API is unavailable or offline
function generateDynamicCbtResponse(prompt: string, currentDay: number = 1, mood: string = 'Calm') {
  const p = prompt.toLowerCase().trim();
  
  // 1. Greetings & Introductions
  if (p.includes('hi') || p.includes('hello') || p.includes('hey') || p.includes('namaste') || p.includes('greetings') || p === 'who are you' || p.includes('what can you do')) {
    return {
      response: `Namaste! I am your **Inner Peace Guide & Mind Mastery AI Companion**—a comprehensive psycho-spiritual and wellness mentor.\n\nI am here to guide and support you across all aspects of your inner journey, including:\n- **Stress Management & Burnout**: Somatic vagal regulation, cortisol reduction, and nervous system recalibration.\n- **Meditation & Breathwork**: Vipassana, Zen, Yoga Nidra, Loving-Kindness (Metta), Dhyana, 4-7-8, and Pranayama.\n- **Mindfulness**: Present-moment awareness, non-attachment, equanimity, and breaking autopilot reactivity.\n- **Relationships & Emotional Recovery**: Attachment styles, boundary setting, conscious communication, heartbreak healing, and relationship recovery.\n- **Higher Consciousness & Awakening**: Non-duality (Advaita), witness consciousness, ego transcendence, shadow work, chakra alignment, and discovering your Dharma.\n- **Path to Inner Peace Hub**: The 5-Day Challenge, guided camps, 432Hz/528Hz sound therapy, CBT masterclasses, and Career Axis.\n\nFeel free to ask any question or share what is on your heart and mind.`,
      suggestedAffirmation: "I open my heart and mind to infinite peace, wisdom, and self-discovery."
    };
  }

  // 2. Higher Consciousness, Awakening, Ego & Non-Duality
  if (p.includes('consciousness') || p.includes('awakening') || p.includes('ego') || p.includes('non-duality') || p.includes('advaita') || p.includes('soul') || p.includes('spiritual') || p.includes('enlighten') || p.includes('witness') || p.includes('sakshi') || p.includes('dark night') || p.includes('kundalini') || p.includes('dharma') || p.includes('chakra')) {
    return {
      response: `**Higher Consciousness & The Awakening Journey**\n\nSpiritual awakening is the fundamental shift from identifying with the mind's transient thoughts and egoic personality to resting in the **Witness Consciousness** (Sakshi Bhav)—the eternal, silent awareness in which all experiences arise and dissolve.\n\n**Core Awakening Practices:**\n1. **Self-Inquiry (Atma Vichara)**: When a thought, worry, or emotion arises, ask: *"Who is aware of this thought?"* Notice the spacious, untouched silence that observes without judging.\n2. **Ego Dissolution**: The ego is not an enemy to be destroyed; it is simply a bundle of conditioned beliefs, memories, and survival identities. By observing it with compassionate detachment, its compulsive grip naturally dissolves.\n3. **Navigating the Dark Night of the Soul**: If you are experiencing a collapse of old identities, know that this is sacred shedding. The old foundation must fall away for authentic truth and spiritual presence to emerge.\n4. **Chakra & Energetic Alignment**: Bring your breath down along your central energetic channel (Sushumna Nadi) from the root (Muladhara) to the crown (Sahasrara), aligning groundedness with spiritual clarity.`,
      suggestedAffirmation: "I am not the passing waves of thought; I am the boundless ocean of silent awareness."
    };
  }

  // 3. Relationships, Attachment Styles, Heartbreak & Recovery
  if (p.includes('relationship') || p.includes('attachment') || p.includes('heartbreak') || p.includes('breakup') || p.includes('ex') || p.includes('partner') || p.includes('toxic') || p.includes('narcissis') || p.includes('boundar') || p.includes('intimacy') || p.includes('communication') || p.includes('divorce') || p.includes('forgive')) {
    return {
      response: `**Relationship Healing & Emotional Recovery**\n\nRelationships are powerful mirrors reflecting our unhealed attachment wounds, unresolved inner child needs, and core conditioning. Transforming your relationships begins with cultivating internal security.\n\n**Keys to Relationship Recovery & Mastery:**\n1. **Healing Attachment Insecurity**: Anxious attachment stems from fear of abandonment; avoidant attachment stems from fear of engulfment. To heal, become the compassionate, secure parent to your own inner child first.\n2. **Conscious Non-Violent Communication (NVC)**: Speak through the 4-step framework:\n   - *Observation*: "When I notice X..."\n   - *Feeling*: "I feel vulnerable/unheard..."\n   - *Need*: "Because my core need is safety/connection..."\n   - *Request*: "Would you be open to talking through this tonight?"\n3. **Sovereign Boundaries**: A boundary is not an aggressive wall; it is a clear, loving guideline for how you allow others to interact with your energy.\n4. **Heartbreak & Emotional Release**: Grief is love with nowhere to go. Practice the Hawaiian **Ho'oponopono** mantra directed to your heart: *"I am sorry. Please forgive me. Thank you. I love you."*`,
      suggestedAffirmation: "I establish loving boundaries, honor my emotional needs, and attract conscious love."
    };
  }

  // 4. Meditation Traditions & Advanced Breathwork
  if (p.includes('vipassana') || p.includes('zen') || p.includes('zazen') || p.includes('yoga nidra') || p.includes('transcendental') || p.includes('metta') || p.includes('loving-kindness') || p.includes('pranayama') || p.includes('nadi shodhana') || p.includes('dhyana') || p.includes('mantra') || p.includes('singing bowl')) {
    return {
      response: `**Deep Meditation & Breath Disciplines**\n\nMeditation is the art of familiarizing the mind with its own natural stillness.\n\n**Core Traditional Disciplines:**\n- **Vipassana (Insight Meditation)**: Objective, equanimous observation of physical bodily sensations (Vedana) without craving pleasant states or resisting unpleasant ones. This systematically unconditions deep-seated mental reactivity (Sankharas).\n- **Yoga Nidra (Psychic Sleep)**: A guided threshold state between wakefulness and deep sleep (Theta/Delta waves) that releases deep subconscious tension and reprogramms your neural blueprint.\n- **Metta (Loving-Kindness)**: Expanding unconditional goodwill: *"May all beings be safe, peaceful, healthy, and live with ease."*\n- **Nadi Shodhana (Alternate Nostril Breathing)**: Restores neurological balance between the left (logical/parasympathetic) and right (creative/sympathetic) brain hemispheres.\n- **Sound & Mantra Meditation**: Using 432Hz/528Hz acoustic entrainment or sacred primordial syllables (Om, So-Hum) to dissolve mental chatter.`,
      suggestedAffirmation: "In the sacred silence of meditation, I reunite with my deepest truth."
    };
  }

  // 5. Mindfulness in Daily Life & Mindful Living
  if (p.includes('mindful') || p.includes('presence') || p.includes('present moment') || p.includes('now') || p.includes('autopilot') || p.includes('eating') || p.includes('equanimity') || p.includes('non-attachment') || p.includes('flow state')) {
    return {
      response: `**Mindfulness & Everyday Presence**\n\nMindfulness is paying attention on purpose, in the present moment, without judgment. When mindfulness becomes a way of living rather than a 10-minute exercise, your entire life transforms.\n\n**Everyday Mindfulness Practices:**\n1. **The STOP Practice**: \n   - **S**top whatever you are doing.\n   - **T**ake one conscious, diaphragmatic breath.\n   - **O**bserve your sensations, emotions, and thoughts without judging them.\n   - **P**roceed with clarity, intentionality, and grace.\n2. **Mindful Sensory Engagement**: Whether washing dishes, sipping tea, or walking, engage all five senses. Feel the warmth, hear the subtle sounds, notice the textures.\n3. **Cultivating Equanimity (Upekkha)**: Allowing reality to be as it is in this exact second, without needing to fight or manipulate it. Peace is not the absence of storms; it is peace in the midst of the storm.`,
      suggestedAffirmation: "I anchor my awareness in the sacred present moment where peace resides."
    };
  }

  // 6. Stress Management, Polyvagal Theory & Burnout Recovery
  if (p.includes('stress') || p.includes('burnout') || p.includes('work') || p.includes('pressure') || p.includes('overwhelm') || p.includes('cortisol') || p.includes('polyvagal') || p.includes('exhaust')) {
    return {
      response: `**Comprehensive Stress Management & Nervous System Recalibration**\n\nChronic stress occurs when your autonomic nervous system remains locked in a sympathetic hyper-arousal state, flooding your body with cortisol and adrenaline.\n\n**Evidence-Based Reset Protocol:**\n1. **Somatic Polyvagal Vagus Nerve Reset**: \n   - Perform the **4-7-8 Breathing Cycle**: Inhale 4s through the nose, gently hold 7s, and exhale slowly through slightly parted lips for 8s. 4 cycles will drop heart rate variability into rest-and-digest.\n   - **Vocal Toning (Bhramari / Humming)**: Make a low "Voo" or "Hum" sound on long exhales. The vibration stimulates the ventral vagal pathway in the larynx.\n2. **Cognitive De-escalation**: Ask yourself: *"Is this an actual survival emergency, or an urgent narrative created by mental expectations?"*\n3. **Radical Priority Pruning**: Strip away non-essential tasks for the next 48 hours. Your physical and emotional well-being is the foundation from which all accomplishment flows.`,
      suggestedAffirmation: "I release the urgency of the world and honor my nervous system's need for peace."
    };
  }

  // 7. Inner Child Healing, Shadow Work & Self-Worth
  if (p.includes('inner child') || p.includes('shadow') || p.includes('self-worth') || p.includes('shame') || p.includes('guilt') || p.includes('imposter') || p.includes('worth') || p.includes('confidence') || p.includes('trauma')) {
    return {
      response: `**Inner Child Healing & Shadow Integration**\n\nCarl Jung stated: *"Until you make the unconscious conscious, it will direct your life and you will call it fate."*\n\n**Healing Your Inner Child & Shadow:**\n1. **Inner Child Dialogue**: Place your hand over your heart. Envision yourself as a 5- or 7-year-old. Speak to that child: *"I see you. You are completely safe now. You no longer have to perform, be perfect, or carry adult burdens to be loved."*\n2. **Shadow Integration**: The qualities in others that trigger strong irritation in you often point to repressed parts of your own shadow. Ask: *"What is this trigger trying to show me about my disowned emotions?"*\n3. **Overcoming Imposter Syndrome**: Recognize that feelings of inadequacy are common survival defenses. Your worth is intrinsic, not earned through exhausting perfectionism.`,
      suggestedAffirmation: "I embrace every part of myself with unconditional love, compassion, and acceptance."
    };
  }

  // 8. Founder & Coach Mainak Chatterjee
  if (p.includes('mainak') || p.includes('chatterjee') || p.includes('founder') || p.includes('coach') || p.includes('mentor') || p.includes('who created')) {
    return {
      response: `**Coach Mainak Chatterjee** is the founder of the **Path to Inner Peace** wellness platform.\n\nHe is an accomplished Mindset & Life Coach, Certified CBT Practitioner, International Wellness & Spiritual Mentor, and Career Consultant. Mainak combines evidence-based Cognitive Behavioral Therapy (CBT), somatic vagal nerve regulation, sound healing frequencies, and ancient mindfulness traditions to help thousands of individuals achieve emotional calm, mental clarity, and purposeful living.\n\nHe leads our **5-Day Mental Reset Challenge**, conducts **Weekly Live Masterclasses** every Sunday at 11:00 AM IST on Google Meet, and provides personalized 1:1 sessions through **Career Axis**.`,
      suggestedAffirmation: "I am guided toward higher awareness and grounded inner peace."
    };
  }

  // 9. 5-Day Mental Reset Challenge
  if (p.includes('5-day') || p.includes('5 day') || p.includes('challenge') || p.includes('curriculum') || p.includes('roadmap') || (p.includes('day') && (p.includes('1') || p.includes('2') || p.includes('3') || p.includes('4') || p.includes('5')))) {
    return {
      response: `The **5-Day Mental Reset Challenge** is a transformative 30-minute daily roadmap:\n\n- **Day 1: Nervous System Reset & Box Breathing** — Regulate your autonomic nervous system, stimulate the vagus nerve, and dissolve physical fight-or-flight tension.\n- **Day 2: Sound Healing & Theta Frequencies** — Immerse in 432Hz miracle tones and 528Hz restorative frequencies to calm brainwave activity into theta states.\n- **Day 3: CBT Cognitive Distortions & Journaling** — Identify automatic negative thoughts, break catastrophic thought loops, and rewrite cognitive scripts.\n- **Day 4: Emotional Release & Forgiveness** — Release repressed emotional baggage, practice heart-centered release, and reclaim inner energy.\n- **Day 5: Awakening & Daily Habits** — Anchor sustainable morning/evening routines and earn your **Verified Certificate of Completion**.\n\nYou are currently on Day ${currentDay}! You can access today's lesson from your Dashboard.`,
      suggestedAffirmation: "Day by day, I rewire my mind for lasting clarity and calm."
    };
  }

  // 10. Weekly Live Sessions
  if (p.includes('weekly') || p.includes('live session') || p.includes('sunday') || p.includes('google meet') || p.includes('meet link') || p.includes('masterclass')) {
    return {
      response: `Our **Weekly Live Mental Fitness Masterclass** takes place every **Sunday at 11:00 AM IST** live on **Google Meet** with Coach Mainak Chatterjee.\n\n**Key Highlights:**\n- Live interactive video session & guided group meditation.\n- Deep-dive into CBT reframing, emotional resilience, and mindset mastery.\n- Direct **Live Q&A** where you can ask your personal questions.\n- Free session worksheet & actionable summary.\n\n**How to Join:**\nClick **"Register Now"** under Weekly Live Sessions on the Inner Shift or Explore page. Fill in your name and WhatsApp number to receive your private Google Meet invitation and a 15-minute start alert!`,
      suggestedAffirmation: "I show up consistently for my growth, mental health, and community."
    };
  }

  // 11. Guided Meditation & Meditation Camps
  if (p.includes('camp') || p.includes('retreat') || p.includes('guided meditation') || p.includes('meditation') || p.includes('silence')) {
    return {
      response: `Under **Inner Shift**, we offer immersive **Guided Meditation & Camps** designed for both beginners and seasoned practitioners:\n\n- **Weekend Silence & Dhyana Retreat**: Deep sensory withdrawal, breath awareness, and silent reflection.\n- **7-Day Guided Inner Peace Camp**: Daily progressive mindfulness practices to balance emotional reactivity.\n- **21-Day Sunrise Mindfulness Camp**: Morning 6:00 AM IST routine establishment for neuroplasticity and emotional resilience.\n\n**Daily Batches**: Morning (6:00 AM IST) and Evening (7:00 PM IST).\nYou can register for upcoming camps anytime by clicking the **Guided Meditation** card in Inner Shift!`,
      suggestedAffirmation: "In the stillness of meditation, I discover my infinite peace."
    };
  }

  // 12. Sound Therapy & Binaural Frequencies
  if (p.includes('sound') || p.includes('frequency') || p.includes('432') || p.includes('528') || p.includes('binaural') || p.includes('theta') || p.includes('healing audio')) {
    return {
      response: `**Sound Frequency Therapy** works through acoustic brainwave entrainment to shift your neural activity from frantic Beta states into calm Alpha and deep Theta states:\n\n- **432 Hz (Miracle Tone)**: Aligns with natural biological resonance, reduces cortisol, and brings deep emotional tranquility.\n- **528 Hz (Transformation & Repair)**: Known as the love frequency, enhances mental clarity, cell recovery, and emotional release.\n- **Theta Waves (4-7 Hz)**: Ideal for meditation, creative insight, and dissolving anxiety.\n- **Tibetan Singing Bowls**: Acoustic vibration that balances your energetic centers (Chakras).\n\nYou can listen to our soundscapes in the **Sound Therapy** player inside Inner Shift!`,
      suggestedAffirmation: "Healing vibrations restore harmony to every cell of my body."
    };
  }

  // 13. 4-7-8 Breathing & Breathwork
  if (p.includes('breath') || p.includes('4-7-8') || p.includes('box breath') || p.includes('vagus')) {
    return {
      response: `The **4-7-8 Vagus Nerve Breathing Technique** is an evidence-backed natural tranquilizer for your nervous system:\n\n1. **Inhale (4s)**: Inhale deeply and quietly through your nose into your belly, counting to 4.\n2. **Hold (7s)**: Gently retain your breath for 7 seconds without straining.\n3. **Exhale (8s)**: Slowly and completely exhale through slightly parted lips for 8 seconds with a soft whoosh sound.\n\nRepeat this cycle 4 to 8 times. The extended 8-second exhale stimulates the vagus nerve, immediately slowing heart rate and activating the parasympathetic "rest-and-digest" response.\n\nPractice with our interactive animated breathing sphere in the **4-7-8 Breathing** module!`,
      suggestedAffirmation: "With every conscious exhale, I release tension and invite peace."
    };
  }

  // 14. CBT 12 Master Video Techniques & Psychology
  if (p.includes('cbt') || p.includes('cognitive') || p.includes('distortion') || p.includes('reframe') || p.includes('video technique') || p.includes('psycholog') || p.includes('thought record')) {
    return {
      response: `**Cognitive Behavioral Therapy (CBT)** is built on the principle that *thoughts cause feelings, which drive behaviors*—not external events themselves.\n\nOur **CBT 12 Master Video Techniques** include:\n1. **Cognitive Restructuring**: Identifying unhelpful thoughts and replacing them with objective truths.\n2. **Decatastrophizing**: Answering "What is the realistic worst-case scenario and how will I handle it?"\n3. **Thought-Stopping & Thought Defusion**: Creating distance between the observer and the mental noise.\n4. **Behavioral Activation**: Taking small, values-driven actions to overcome emotional paralysis.\n\nYou can explore all 12 video modules under the CBT Video section in your dashboard!`,
      suggestedAffirmation: "I am not my thoughts; I am the conscious master of my mind."
    };
  }

  // 15. Career Counselling, Purpose, Ikigai & Mentorship
  if (p.includes('career') || p.includes('counsel') || p.includes('counselling') || p.includes('career axis') || p.includes('job') || p.includes('interview') || p.includes('promotion') || p.includes('workplace') || p.includes('profession') || p.includes('resume') || p.includes('ikigai') || p.includes('salary') || p.includes('transition') || p.includes('colleague')) {
    return {
      response: `**Career Counseling, Professional Fulfillment & Ikigai Alignment**\n\nTrue career success is achieved when your inner strengths, psychological resilience, and outer professional ambitions work in harmony without sacrificing your mental peace.\n\n**Core Career Mastery Pillars:**\n1. **The Ikigai Alignment Framework**: Evaluate your path across 4 intersecting dimensions:\n   - *Passion*: What you naturally love doing.\n   - *Vocation*: What the world needs and values.\n   - *Profession*: What you can be paid well for.\n   - *Mission*: Where your unique strengths solve meaningful problems.\n2. **Managing Workplace Imposter Syndrome**: Feelings of self-doubt are normal during growth. Reframe your inner monologue from *"I must know everything"* to *"I am a capable learner who adds distinct value."*\n3. **Psychological Boundary Setting**: Prevent burnout by separating your personal self-worth from daily workplace emergencies. Communicate clear turn-around timelines and protect restorative off-hours.\n4. **1:1 Mentorship with Coach Mainak Chatterjee**: For personalized career roadmapping, resume/interview psychological prep, and executive mindset mastery, explore **Career Axis** in the main navigation!`,
      suggestedAffirmation: "My professional path expands in perfect harmony with my highest potential and inner peace."
    };
  }

  // 16. Overthinking, Anxiety, & Panic
  if (p.includes('anxiety') || p.includes('anxious') || p.includes('panic') || p.includes('worry') || p.includes('nervous') || p.includes('fear')) {
    return {
      response: `Anxiety is your autonomic nervous system's misplaced attempt to protect you from uncertainty. When anxiety surges, your amygdala triggers a fight-or-flight response.\n\n**Immediate CBT Grounding (5-4-3-2-1):**\n- Notice **5 things you can see** around you.\n- Notice **4 things you can physically touch**.\n- Notice **3 distinct sounds**.\n- Notice **2 scents**.\n- Notice **1 positive truth about yourself**.\n\nCombine this with 3 cycles of **4-7-8 breathing** (Inhale 4s, Hold 7s, Exhale 8s). Ask yourself: *"Is this threat happening right now in this exact physical room, or is my mind anticipating the future?"* Grounding in sensory reality dissolves panic.`,
      suggestedAffirmation: "I release the illusion of control and rest safely in this present moment."
    };
  }

  // 17. Overthinking Loops
  if (p.includes('overthink') || p.includes('loop') || p.includes('head') || p.includes('ruminat') || p.includes('racing')) {
    return {
      response: `Overthinking is cognitive entanglement—confusing the act of *thinking* with the act of *solving*.\n\nIn CBT psychology, we practice becoming the **Calm Observer**:\n1. **Externalize the thought**: Say silently, *"I am noticing the thought that everything might go wrong."* Notice the difference between *being* the thought and *witnessing* it.\n2. **The 10-Minute Worry Window**: Schedule a specific 10-minute window later in the day to write down your worries. If a worry arises now, write it down and return to the present.\n3. **Physical Anchoring**: Feel your feet firmly on the floor. Take 3 deep belly breaths. The mind cannot stay caught in a loop when you bring 100% awareness to the physical body.`,
      suggestedAffirmation: "I am the calm sky; my thoughts are simply passing clouds."
    };
  }

  // 18. Sleep & Insomnia
  if (p.includes('sleep') || p.includes('night') || p.includes('insomnia') || p.includes('bed') || p.includes('rest') || p.includes('tired')) {
    return {
      response: `Restful sleep requires signaling physiological safety to your autonomic nervous system.\n\n**Nighttime Sleep Routine:**\n1. **Theta Sound Frequency**: Put on headphones and play our 432Hz / Theta soundscape from the Sound Therapy tab.\n2. **Progressive Somatic Release**: As you lie in bed, gently tighten your toes for 5 seconds, then let them go completely limp. Work your way up your legs, belly, shoulders, jaw, and eyes.\n3. **Mental Download**: If your mind is racing with tomorrow's to-do list, write it on a piece of paper beside your bed to release cognitive load.\n\nRemind yourself: *"My day is complete. There is nothing I need to solve tonight."*`,
      suggestedAffirmation: "I surrender today's efforts and allow my body and mind to deeply rest."
    };
  }

  // 19. Anger & Frustration
  if (p.includes('anger') || p.includes('angry') || p.includes('frustrat') || p.includes('irritat') || p.includes('mad')) {
    return {
      response: `Anger is a secondary emotion—an internal boundary alarm signaling that an expectation, boundary, or value was violated.\n\n**The Somatic Pause:**\n1. Do not speak or type while in high sympathetic arousal. Place your palm over your heart or solar plexus.\n2. Take 3 deep diaphragmatic breaths with extended exhales.\n3. Ask: *"What underlying hurt or vulnerable feeling is my anger trying to protect?"*\n\nWhen you understand the root cause of the trigger, you can respond with assertiveness and calm clarity rather than reactive anger.`,
      suggestedAffirmation: "I honor my feelings without allowing anger to dictate my reactions."
    };
  }

  // 20. Sadness, Grief, Loneliness & Depression
  if (p.includes('sad') || p.includes('grief') || p.includes('lonely') || p.includes('cry') || p.includes('depress') || p.includes('hurt') || p.includes('heartbreak')) {
    return {
      response: `Heavy emotions are not signs of weakness—they are proof of your deep human capacity to love and care.\n\n**Radical Self-Compassion Practice:**\n1. Place both hands over your heart. Feel the physical warmth of your skin.\n2. Speak to yourself as you would to a dear friend: *"It is completely okay to feel this way right now. I am here for myself."*\n3. Allow tears or heaviness to flow without self-judgment. Emotions are energy in motion; they need permission to move through you.\n\nBe gentle with yourself today. One breath at a time is all that is required.`,
      suggestedAffirmation: "I meet myself with gentle kindness, love, and unconditional acceptance."
    };
  }

  // 21. Dynamic Open-Ended Contextual Synthesizer for any custom prompt
  const userKeywords = prompt.trim().split(' ').filter(w => w.length > 3).slice(0, 5).join(' ');
  const topicSummary = userKeywords ? `regarding "${userKeywords}"` : 'on your mind';

  return {
    response: `Thank you for bringing your question ${topicSummary} to the **Inner Peace Guide**.\n\nAcross modern psychology, mindfulness, and spiritual wisdom, conscious awareness is the catalyst for transformation. When reflecting on this topic, consider these 3 core pillars:\n\n1. **Cognitive Clarity**: Distinguish between objective reality and the mind's automatic stories or assumptions. Notice the difference between what is actually happening and how your mind interprets it.\n2. **Somatic & Nervous System Attunement**: Notice where this topic lands in your physical body. Take three slow, grounding breaths (inhale for 4 seconds, exhale for 8 seconds) to soften physical resistance.\n3. **Higher Perspective & Inner Wisdom**: Ask yourself: *"If I viewed this situation from unconditional self-compassion, peace, and spiritual growth, what would be the most constructive next step?"*\n\nYou are always whole, capable, and capable of returning to your centered inner stillness.`,
    suggestedAffirmation: `I choose clarity, peace of mind, and inner alignment as I navigate ${topicSummary}.`
  };
}

// AI Reflection Assistant endpoint powering ChatGPT (OpenAI GPT-4o) & Gemini 3.7 Flash
app.post("/api/ai-reflection", async (req, res) => {
  try {
    const { prompt, journalContext, currentDay, mood, history, preferredEngine } = req.body;

    const systemPrompt = `You are the "Inner Peace Guide & Mind Mastery AI Companion" for the "Path to Inner Peace" wellness ecosystem founded by Coach Mainak Chatterjee.

ROLE & COMPREHENSIVE EXPERTISE:
You are an unrestricted, deeply insightful, empathetic psycho-spiritual and wellness mentor with world-class expertise spanning:
1. Universal Wellness & Stress Management: Somatic vagus nerve regulation, polyvagal theory, cortisol reduction, breathwork (4-7-8, box breathing, alternate nostril), burnout recovery, nervous system safety.
2. Meditation Traditions & Disciplines: Vipassana (body scan & sensations), Zen/Zazen (silent illumination), Yoga Nidra (psychic sleep & subconscious reprogramming), Loving-Kindness (Metta), Transcendental meditation, Dhyana, sound & mantra chanting.
3. Mindfulness & Everyday Living: Present-moment awareness, non-attachment, equanimity (Upekkha), breaking autopilot reactivity, mindful eating/working, flow states.
4. Relationships & Its Recovery: Healing anxious/avoidant attachment styles, recovering from toxic or narcissistic dynamics, conscious Non-Violent Communication (NVC), boundary setting, heartbreak recovery, grief release, forgiveness and Ho'oponopono, emotional safety.
5. Higher Consciousness & Spiritual Awakening: Non-duality (Advaita), Witness Consciousness (Sakshi Bhav), ego transcendence, Carl Jung shadow work & archetypes, navigating the Dark Night of the Soul, Kundalini & chakra energy alignment, discovering Dharma and soul purpose.
6. Career & Its Counselling: Ikigai alignment, career transition guidance, workplace imposter syndrome, stress & toxic workplace management, executive mindset, strategic interview psychological grounding, values-driven career growth.
7. Path to Inner Peace Hub: 5-Day Mental Reset Challenge, Inner Shift, Inner Revolution, Career Axis 1:1 mentorship, 432Hz/528Hz sound therapy, and Sunday 11:00 AM IST Google Meet live masterclasses with Coach Mainak Chatterjee.

RESPONSE GUIDELINES:
1. Answer ANY user query, topic, scenario, or life situation with comprehensive, direct, and tailored wisdom.
2. Structure your answers with clear headings, bullet points, or numbered steps for effortless reading.
3. Integrate practical somatic exercises, CBT reframes, psychological models, or spiritual insights where relevant.
4. Keep the tone warm, grounded, compassionate, and empowering.
5. At the very end of your response, ALWAYS include an affirmation on its own line formatted exactly as:
Affirmation: [A short, uplifting, tailored 1-sentence affirmation matching the user's topic]
6. Never provide medical/clinical prescriptions.`;

    // 1. Check OpenAI / ChatGPT (GPT-4o / GPT-4o-mini)
    const openai = getOpenAIClient();
    if (openai) {
      try {
        const messages: any[] = [
          { role: "system", content: systemPrompt }
        ];

        if (Array.isArray(history) && history.length > 0) {
          history.slice(-8).forEach((h: any) => {
            messages.push({
              role: h.sender === 'user' ? 'user' : 'assistant',
              content: h.text
            });
          });
        }

        messages.push({
          role: "user",
          content: prompt
        });

        const chatGptPromise = openai.chat.completions.create({
          model: "gpt-4o",
          messages,
          temperature: 0.7,
          max_tokens: 850
        });

        const timeoutPromise = new Promise<null>((resolve) =>
          setTimeout(() => resolve(null), 6500)
        );

        const completion: any = await Promise.race([chatGptPromise, timeoutPromise]);

        if (completion && completion.choices && completion.choices[0]?.message?.content) {
          const replyText = completion.choices[0].message.content.trim();
          let affirmation = "I am grounded, peaceful, and in control of my inner calm.";
          const match = replyText.match(/Affirmation:\s*([^\n]+)/i);
          if (match && match[1]) {
            affirmation = match[1].trim();
          }

          return res.json({
            response: replyText.replace(/Affirmation:\s*[^\n]+/i, '').trim(),
            suggestedAffirmation: affirmation,
            engine: "ChatGPT (GPT-4o)"
          });
        }
      } catch (openAiError: any) {
        console.warn("OpenAI ChatGPT API call warning/fallback:", openAiError?.message || openAiError);
      }
    }

    // 2. Check Gemini 3.7 Flash API
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({
          apiKey,
          httpOptions: {
            headers: {
              'User-Agent': 'aistudio-build'
            }
          }
        });

        // Build contents array including previous chat history if available
        let contents: any[] = [];
        if (Array.isArray(history) && history.length > 0) {
          contents = history.slice(-6).map((h: any) => ({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          }));
        }
        contents.push({
          role: 'user',
          parts: [{ text: prompt }]
        });

        const generatePromise = ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
            maxOutputTokens: 850
          }
        });

        const timeoutPromise = new Promise<null>((resolve) => 
          setTimeout(() => resolve(null), 6500)
        );

        const response: any = await Promise.race([generatePromise, timeoutPromise]);

        if (response && response.text) {
          const replyText = response.text || "";
          let affirmation = "I am grounded, peaceful, and in control of my inner calm.";
          const match = replyText.match(/Affirmation:\s*([^\n]+)/i);
          if (match && match[1]) {
            affirmation = match[1].trim();
          }

          return res.json({
            response: replyText.replace(/Affirmation:\s*[^\n]+/i, '').trim(),
            suggestedAffirmation: affirmation,
            engine: "Gemini 3.7 Flash"
          });
        }
      } catch (geminiError: any) {
        console.warn("Gemini API call warning/fallback:", geminiError?.message || geminiError);
      }
    }

    // 3. Dynamic Intelligent CBT & Mind Mastery Fallback Response Engine
    const fallback = generateDynamicCbtResponse(prompt, currentDay, mood);
    return res.json({
      ...fallback,
      engine: "Inner Peace Knowledge Engine"
    });

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
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = fs.existsSync(path.join(process.cwd(), 'dist'))
      ? path.join(process.cwd(), 'dist')
      : path.resolve(__dirname, '..', 'dist');

    const indexHtmlPath = fs.existsSync(path.join(distPath, 'index.html'))
      ? path.join(distPath, 'index.html')
      : path.join(process.cwd(), 'index.html');

    app.use(express.static(distPath, {
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
      }
    }));
    app.get('*', (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(indexHtmlPath);
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Path to Inner Peace server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
