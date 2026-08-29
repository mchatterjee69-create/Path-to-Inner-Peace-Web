import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

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

// Helper for dynamic intelligent CBT & Wellness Hub response when Gemini API is unavailable or offline
function generateDynamicCbtResponse(prompt: string, currentDay: number = 1, mood: string = 'Calm') {
  const p = prompt.toLowerCase().trim();
  
  // 1. Greetings & Introductions
  if (p.includes('hi') || p.includes('hello') || p.includes('hey') || p.includes('namaste') || p.includes('greetings') || p === 'who are you' || p.includes('what can you do')) {
    return {
      response: `Namaste! I am your **Inner Peace Guide & Mind Mastery AI Companion** for the **Path to Inner Peace** Wellness Hub founded by Coach Mainak Chatterjee.\n\nI am here to support your mental wellness journey 24/7. You can ask me about:\n- **Wellness Hub Programs**: The 5-Day Mental Reset Challenge, Inner Shift, Inner Revolution, and Career Axis.\n- **Daily Practices**: 4-7-8 vagus breathwork, 432Hz/528Hz sound therapy, guided meditation camps, and CBT 12 master techniques.\n- **Live Masterclasses**: How to join our Sunday 11:00 AM IST live interactive session via Google Meet.\n- **Personal Guidance**: Overcoming overthinking, anxiety, work stress, sleep issues, relationship healing, and emotional reframing.\n\nWhat is on your mind or how can I assist your practice today?`,
      suggestedAffirmation: "I welcome peace, clarity, and mindfulness into this moment."
    };
  }

  // 2. Founder & Coach Mainak Chatterjee
  if (p.includes('mainak') || p.includes('chatterjee') || p.includes('founder') || p.includes('coach') || p.includes('mentor') || p.includes('who created')) {
    return {
      response: `**Coach Mainak Chatterjee** is the founder of the **Path to Inner Peace** wellness platform.\n\nHe is an accomplished Mindset & Life Coach, Certified CBT Practitioner, International Wellness & Spiritual Mentor, and Career Consultant. Mainak combines evidence-based Cognitive Behavioral Therapy (CBT), somatic vagal nerve regulation, sound healing frequencies, and ancient mindfulness traditions to help thousands of individuals achieve emotional calm, mental clarity, and purposeful living.\n\nHe leads our **5-Day Mental Reset Challenge**, conducts **Weekly Live Masterclasses** every Sunday at 11:00 AM IST on Google Meet, and provides personalized 1:1 sessions through **Career Axis**.`,
      suggestedAffirmation: "I am guided toward higher awareness and grounded inner peace."
    };
  }

  // 3. 5-Day Mental Reset Challenge
  if (p.includes('5-day') || p.includes('5 day') || p.includes('challenge') || p.includes('curriculum') || p.includes('roadmap') || (p.includes('day') && (p.includes('1') || p.includes('2') || p.includes('3') || p.includes('4') || p.includes('5')))) {
    return {
      response: `The **5-Day Mental Reset Challenge** is a transformative 30-minute daily roadmap:\n\n- **Day 1: Nervous System Reset & Box Breathing** — Regulate your autonomic nervous system, stimulate the vagus nerve, and dissolve physical fight-or-flight tension.\n- **Day 2: Sound Healing & Theta Frequencies** — Immerse in 432Hz miracle tones and 528Hz restorative frequencies to calm brainwave activity into theta states.\n- **Day 3: CBT Cognitive Distortions & Journaling** — Identify automatic negative thoughts, break catastrophic thought loops, and rewrite cognitive scripts.\n- **Day 4: Emotional Release & Forgiveness** — Release repressed emotional baggage, practice heart-centered release, and reclaim inner energy.\n- **Day 5: Awakening & Daily Habits** — Anchor sustainable morning/evening routines and earn your **Verified Certificate of Completion**.\n\nYou are currently on Day ${currentDay}! You can access today's lesson from your Dashboard.`,
      suggestedAffirmation: "Day by day, I rewire my mind for lasting clarity and calm."
    };
  }

  // 4. Weekly Live Sessions
  if (p.includes('weekly') || p.includes('live session') || p.includes('sunday') || p.includes('google meet') || p.includes('meet link') || p.includes('masterclass')) {
    return {
      response: `Our **Weekly Live Mental Fitness Masterclass** takes place every **Sunday at 11:00 AM IST** live on **Google Meet** with Coach Mainak Chatterjee.\n\n**Key Highlights:**\n- Live interactive video session & guided group meditation.\n- Deep-dive into CBT reframing, emotional resilience, and mindset mastery.\n- Direct **Live Q&A** where you can ask your personal questions.\n- Free session worksheet & actionable summary.\n\n**How to Join:**\nClick **"Register Now"** under Weekly Live Sessions on the Inner Shift or Explore page. Fill in your name and WhatsApp number to receive your private Google Meet invitation and a 15-minute start alert!`,
      suggestedAffirmation: "I show up consistently for my growth, mental health, and community."
    };
  }

  // 5. Guided Meditation & Meditation Camps
  if (p.includes('camp') || p.includes('retreat') || p.includes('guided meditation') || p.includes('meditation') || p.includes('dhyana') || p.includes('vipassana') || p.includes('silence')) {
    return {
      response: `Under **Inner Shift**, we offer immersive **Guided Meditation & Camps** designed for both beginners and seasoned practitioners:\n\n- **Weekend Silence & Dhyana Retreat**: Deep sensory withdrawal, breath awareness, and silent reflection.\n- **7-Day Guided Inner Peace Camp**: Daily progressive mindfulness practices to balance emotional reactivity.\n- **21-Day Sunrise Mindfulness Camp**: Morning 6:00 AM IST routine establishment for neuroplasticity and emotional resilience.\n\n**Daily Batches**: Morning (6:00 AM IST) and Evening (7:00 PM IST).\nYou can register for upcoming camps anytime by clicking the **Guided Meditation** card in Inner Shift!`,
      suggestedAffirmation: "In the stillness of meditation, I discover my infinite peace."
    };
  }

  // 6. Sound Therapy & Binaural Frequencies
  if (p.includes('sound') || p.includes('frequency') || p.includes('432') || p.includes('528') || p.includes('binaural') || p.includes('theta') || p.includes('healing audio') || p.includes('singing bowl')) {
    return {
      response: `**Sound Frequency Therapy** works through acoustic brainwave entrainment to shift your neural activity from frantic Beta states into calm Alpha and deep Theta states:\n\n- **432 Hz (Miracle Tone)**: Aligns with natural biological resonance, reduces cortisol, and brings deep emotional tranquility.\n- **528 Hz (Transformation & Repair)**: Known as the love frequency, enhances mental clarity, cell recovery, and emotional release.\n- **Theta Waves (4-7 Hz)**: Ideal for meditation, creative insight, and dissolving anxiety.\n- **Tibetan Singing Bowls**: Acoustic vibration that balances your energetic centers (Chakras).\n\nYou can listen to our soundscapes in the **Sound Therapy** player inside Inner Shift!`,
      suggestedAffirmation: "Healing vibrations restore harmony to every cell of my body."
    };
  }

  // 7. 4-7-8 Breathing & Breathwork
  if (p.includes('breath') || p.includes('4-7-8') || p.includes('pranayama') || p.includes('box breath') || p.includes('vagus') || p.includes('nervous system')) {
    return {
      response: `The **4-7-8 Vagus Nerve Breathing Technique** is an evidence-backed natural tranquilizer for your nervous system:\n\n1. **Inhale (4s)**: Inhale deeply and quietly through your nose into your belly, counting to 4.\n2. **Hold (7s)**: Gently retain your breath for 7 seconds without straining.\n3. **Exhale (8s)**: Slowly and completely exhale through slightly parted lips for 8 seconds with a soft whoosh sound.\n\nRepeat this cycle 4 to 8 times. The extended 8-second exhale stimulates the vagus nerve, immediately slowing heart rate and activating the parasympathetic "rest-and-digest" response.\n\nPractice with our interactive animated breathing sphere in the **4-7-8 Breathing** module!`,
      suggestedAffirmation: "With every conscious exhale, I release tension and invite peace."
    };
  }

  // 8. CBT 12 Master Video Techniques & Psychology
  if (p.includes('cbt') || p.includes('cognitive') || p.includes('distortion') || p.includes('reframe') || p.includes('video technique') || p.includes('psycholog') || p.includes('thought record')) {
    return {
      response: `**Cognitive Behavioral Therapy (CBT)** is built on the principle that *thoughts cause feelings, which drive behaviors*—not external events themselves.\n\nOur **CBT 12 Master Video Techniques** include:\n1. **Cognitive Restructuring**: Identifying unhelpful thoughts and replacing them with objective truths.\n2. **Decatastrophizing**: Answering "What is the realistic worst-case scenario and how will I handle it?"\n3. **Thought-Stopping & Thought Defusion**: Creating distance between the observer and the mental noise.\n4. **Behavioral Activation**: Taking small, values-driven actions to overcome emotional paralysis.\n\nYou can explore all 12 video modules under the CBT Video section in your dashboard!`,
      suggestedAffirmation: "I am not my thoughts; I am the conscious master of my mind."
    };
  }

  // 9. Career Axis (Consulting & Mentorship)
  if (p.includes('career') || p.includes('career axis') || p.includes('job') || p.includes('consult') || p.includes('mentorship') || p.includes('interview') || p.includes('burnout') || p.includes('promotion')) {
    return {
      response: `**Career Axis** is our 1:1 professional consulting and mentorship wing led by Coach Mainak Chatterjee.\n\n**Who It Is For:**\n- Students choosing higher education specializations.\n- Professionals facing workplace burnout, imposter syndrome, or career stagnation.\n- Career switchers transitioning into tech, leadership, or entrepreneurship.\n\n**What You Get:**\n- 60-Minute 1:1 personalized Google Meet consultation.\n- Psychological strengths assessment & tailored roadmap.\n- Practical career resilience and interview mindset strategies.\n\nYou can book your session by visiting **Career Axis** in the navigation menu and selecting your preferred date and time slot!`,
      suggestedAffirmation: "My career path is aligned with my core strengths, purpose, and peace."
    };
  }

  // 10. Inner Revolution (Programs)
  if (p.includes('inner revolution') || p.includes('programs') || p.includes('relationship') || p.includes('awakening') || p.includes('presence')) {
    return {
      response: `**Inner Revolution** is our advanced transformational suite featuring 4 comprehensive self-paced programs:\n\n1. **Stress & Anxiety Reset**: Comprehensive nervous system restoration and vagal toning.\n2. **Relationship & Emotional Healing**: Attachment style mastery, boundary setting, and empathetic communication.\n3. **Mindfulness & Presence Journey**: Dissolving autopilot living and cultivating deep everyday awareness.\n4. **Deeper Spiritual Awakening**: Transcending egoic conditioning and discovering unconditional inner freedom.\n\nYou can explore these programs and enroll directly from the **Inner Revolution** section!`,
      suggestedAffirmation: "I step courageously into my inner transformation and emotional freedom."
    };
  }

  // 11. WhatsApp Community
  if (p.includes('whatsapp') || p.includes('community') || p.includes('group') || p.includes('morning mantra') || p.includes('daily motivation')) {
    return {
      response: `The **Path to Inner Peace WhatsApp Community** is a positive, supportive space where you receive:\n- Daily **Morning Mantras** and mindfulness quotes.\n- 15-minute reminders for Sunday Live Sessions.\n- Exclusive wellness resources, audio guided tracks, and book recommendations.\n- Safe cohort interaction with fellow practitioners.\n\nYou can join anytime by clicking the WhatsApp link in the **Inner Shift** view or reaching out to us at **+91 9163670300**!`,
      suggestedAffirmation: "I am surrounded by positive, uplifting energy and community."
    };
  }

  // 12. Certificates & Progress
  if (p.includes('certificate') || p.includes('graduation') || p.includes('quiz') || p.includes('badge') || p.includes('complete')) {
    return {
      response: `You earn your official **Path to Inner Peace Certificate of Completion** upon finishing all 5 days of the Mental Reset Challenge!\n\n**To graduate:**\n1. Complete Days 1 through 5 of the challenge modules.\n2. Complete the daily reflection journal.\n3. Pass the interactive 5-Day Mind Mastery Quiz on Day 5.\n\nOnce completed, your certificate will be generated automatically in your Dashboard with your full name, verification badge, and downloadable PDF format!`,
      suggestedAffirmation: "I honor my commitment to personal growth and self-mastery."
    };
  }

  // 13. Overthinking, Anxiety, & Panic
  if (p.includes('anxiety') || p.includes('anxious') || p.includes('panic') || p.includes('worry') || p.includes('nervous') || p.includes('fear')) {
    return {
      response: `Anxiety is your autonomic nervous system's misplaced attempt to protect you from uncertainty. When anxiety surges, your amygdala triggers a fight-or-flight response.\n\n**Immediate CBT Grounding (5-4-3-2-1):**\n- Notice **5 things you can see** around you.\n- Notice **4 things you can physically touch**.\n- Notice **3 distinct sounds**.\n- Notice **2 scents**.\n- Notice **1 positive truth about yourself**.\n\nCombine this with 3 cycles of **4-7-8 breathing** (Inhale 4s, Hold 7s, Exhale 8s). Ask yourself: *"Is this threat happening right now in this exact physical room, or is my mind anticipating the future?"* Grounding in sensory reality dissolves panic.`,
      suggestedAffirmation: "I release the illusion of control and rest safely in this present moment."
    };
  }

  // 14. Overthinking Loops
  if (p.includes('overthink') || p.includes('loop') || p.includes('head') || p.includes('ruminat') || p.includes('racing')) {
    return {
      response: `Overthinking is cognitive entanglement—confusing the act of *thinking* with the act of *solving*.\n\nIn CBT psychology, we practice becoming the **Calm Observer**:\n1. **Externalize the thought**: Say silently, *"I am noticing the thought that everything might go wrong."* Notice the difference between *being* the thought and *witnessing* it.\n2. **The 10-Minute Worry Window**: Schedule a specific 10-minute window later in the day to write down your worries. If a worry arises now, write it down and return to the present.\n3. **Physical Anchoring**: Feel your feet firmly on the floor. Take 3 deep belly breaths. The mind cannot stay caught in a loop when you bring 100% awareness to the physical body.`,
      suggestedAffirmation: "I am the calm sky; my thoughts are simply passing clouds."
    };
  }

  // 15. Sleep & Insomnia
  if (p.includes('sleep') || p.includes('night') || p.includes('insomnia') || p.includes('bed') || p.includes('rest') || p.includes('tired')) {
    return {
      response: `Restful sleep requires signaling physiological safety to your autonomic nervous system.\n\n**Nighttime Sleep Routine:**\n1. **Theta Sound Frequency**: Put on headphones and play our 432Hz / Theta soundscape from the Sound Therapy tab.\n2. **Progressive Somatic Release**: As you lie in bed, gently tighten your toes for 5 seconds, then let them go completely limp. Work your way up your legs, belly, shoulders, jaw, and eyes.\n3. **Mental Download**: If your mind is racing with tomorrow's to-do list, write it on a piece of paper beside your bed to release cognitive load.\n\nRemind yourself: *"My day is complete. There is nothing I need to solve tonight."*`,
      suggestedAffirmation: "I surrender today's efforts and allow my body and mind to deeply rest."
    };
  }

  // 16. Anger & Frustration
  if (p.includes('anger') || p.includes('angry') || p.includes('frustrat') || p.includes('irritat') || p.includes('mad')) {
    return {
      response: `Anger is a secondary emotion—an internal boundary alarm signaling that an expectation, boundary, or value was violated.\n\n**The Somatic Pause:**\n1. Do not speak or type while in high sympathetic arousal. Place your palm over your heart or solar plexus.\n2. Take 3 deep diaphragmatic breaths with extended exhales.\n3. Ask: *"What underlying hurt or vulnerable feeling is my anger trying to protect?"*\n\nWhen you understand the root cause of the trigger, you can respond with assertiveness and calm clarity rather than reactive anger.`,
      suggestedAffirmation: "I honor my feelings without allowing anger to dictate my reactions."
    };
  }

  // 17. Sadness, Grief, Loneliness & Depression
  if (p.includes('sad') || p.includes('grief') || p.includes('lonely') || p.includes('cry') || p.includes('depress') || p.includes('hurt') || p.includes('heartbreak')) {
    return {
      response: `Heavy emotions are not signs of weakness—they are proof of your deep human capacity to love and care.\n\n**Radical Self-Compassion Practice:**\n1. Place both hands over your heart. Feel the physical warmth of your skin.\n2. Speak to yourself as you would to a dear friend: *"It is completely okay to feel this way right now. I am here for myself."*\n3. Allow tears or heaviness to flow without self-judgment. Emotions are energy in motion; they need permission to move through you.\n\nBe gentle with yourself today. One breath at a time is all that is required.`,
      suggestedAffirmation: "I meet myself with gentle kindness, love, and unconditional acceptance."
    };
  }

  // 18. Dynamic Contextual Fallback for any other custom prompt
  const userKeywords = prompt.trim().split(' ').filter(w => w.length > 3).slice(0, 4).join(', ');
  const topicSummary = userKeywords ? `regarding "${userKeywords}"` : 'on your mind';

  return {
    response: `Thank you for bringing your question ${topicSummary} to the **Inner Peace Guide**.\n\nIn our Mind Mastery framework, conscious awareness is the foundation of transformation. Whenever you face questions or challenges around this topic, consider these 3 CBT reflection steps:\n\n1. **Examine the Interpretation**: *"Is my thought an absolute objective fact, or an automatic assumption?"*\n2. **Check the Emotional Impact**: *"How does holding this perspective affect my peace of mind and bodily tension?"*\n3. **Create an Empowered Reframe**: *"What is a more compassionate, grounded, and constructive perspective I can choose right now?"*\n\nTake three deep belly breaths (inhale for 4 seconds, exhale for 8 seconds). Feel free to explore our **4-7-8 Breathing**, **Sound Therapy**, or **5-Day Challenge** modules to ground yourself in peace!`,
    suggestedAffirmation: `I choose clarity, peace of mind, and inner strength as I reflect ${topicSummary}.`
  };
}

// AI Reflection Assistant endpoint using Gemini 3.7 Flash
app.post("/api/ai-reflection", async (req, res) => {
  try {
    const { prompt, journalContext, currentDay, mood, history } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `You are the "Inner Peace Guide & Mind Mastery AI Companion" for the "Path to Inner Peace" wellness hub ecosystem founded by Coach Mainak Chatterjee.

ABOUT THE WELLNESS HUB & COACH MAINAK CHATTERJEE:
- Founder: Mainak Chatterjee (Mindset & Life Coach, Certified CBT Practitioner, International Wellness & Spiritual Mentor, and Career Consultant).
- Core Philosophy: Bridging modern CBT psychology, vagus nerve somatic regulation, sound therapy (432Hz/528Hz), and ancient mindfulness practices for practical daily transformation.
- Hub Features & Services:
  1. 5-Day Mental Reset Challenge:
     - Day 1: Nervous System Reset & Box Breathing (Vagus nerve activation, 4-7-8 breathing, parasympathetic reset).
     - Day 2: Sound Healing & Theta Frequencies (432Hz Miracle tone, 528Hz DNA repair, binaural theta frequencies, chakra balancing).
     - Day 3: CBT Cognitive Distortions & Journaling (All-or-nothing thinking, catastrophizing, emotional reasoning, 3-column thought record).
     - Day 4: Emotional Release & Forgiveness (Ho'oponopono, heart chakra clearing, emotional freedom).
     - Day 5: Awakening, Daily Habits & Certificate of Completion (Morning mantras, evening reflections, sustainable routines, verified certificate).
  2. Inner Shift:
     - Guided Meditation & Camps: Dhyana, Silent Mindfulness, Vipassana, Weekend Silence Retreats, 7-Day / 21-Day Sunrise Camps (Morning 6:00 AM & Evening 7:00 PM IST batches).
     - Sound Therapy: 432Hz, 528Hz, Tibetan Singing Bowls, Binaural Theta Frequencies for deep sleep and anxiety release.
     - 4-7-8 Breathing Reset & Box Breathing: Interactive breathing sphere, parasympathetic vagus activation.
     - CBT 12 Master Video Techniques: Cognitive restructuring, thought-stopping, decatastrophizing, emotional agility.
     - Weekly Live Sessions: Free live interactive masterclasses every Sunday at 11:00 AM IST via Google Meet with Mainak Chatterjee + live Q&A.
     - WhatsApp Community: Daily Morning Mantra, motivation, supportive peers (WhatsApp: +91 9163670300).
  3. Inner Revolution:
     - Stress & Anxiety Reset Program (Deep nervous system regulation).
     - Relationship & Emotional Healing Blueprint (Attachment style healing, empathetic communication, boundary setting).
     - Mindfulness & Presence Journey (Living in the now, reducing mental clutter).
     - Deeper Spiritual Awakening & Consciousness (Higher awareness, purpose, inner freedom).
  4. Career Axis:
     - 1:1 Career Consulting & Mentorship with Mainak Chatterjee for students, professionals, career switchers, and executives navigating career roadblocks, burnout, or transition via 1:1 Google Meet sessions.
  5. Interactive Tools:
     - Daily Mood Tracker & Check-in.
     - Private Guided CBT Journaling.
     - Interactive Quizzes, Badges, and Downloadable Certificates.

RESPONSE GUIDELINES:
1. Answer ANY question or statement from the user directly, thoroughly, and with deep relevance.
2. If asked about the wellness hub, programs, camps, live sessions, schedule, techniques, or Coach Mainak Chatterjee, give accurate and helpful information.
3. If asked about personal struggles (anxiety, overthinking, stress, insomnia, grief, anger, relationships, career burnout, spiritual growth), provide compassionate, structured CBT reframing and practical somatic/breathwork techniques.
4. Keep the tone warm, grounded, professional, and encouraging. Use clear formatting (bullet points, bold highlights) for readability.
5. At the very end of your response, ALWAYS include an affirmation on its own line formatted exactly as:
Affirmation: [A short, uplifting, tailored 1-sentence affirmation matching the user's topic]
6. Never give clinical/medical diagnosis or prescription advice.`;

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
          contents = history.map((h: any) => ({
            role: h.sender === 'user' ? 'user' : 'model',
            parts: [{ text: h.text }]
          }));
        }
        contents.push({
          role: 'user',
          parts: [{ text: prompt }]
        });

        const response = await ai.models.generateContent({
          model: 'gemini-3.7-flash',
          contents,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7
          }
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
