import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
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

  // Fallback webhook trigger to ensure notification delivery to mchatterjee69@gmail.com
  try {
    fetch("https://submit-form.com/mchatterjee69@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json", "Accept": "application/json" },
      body: JSON.stringify({
        recipient,
        formType: payload.formType,
        fullName: payload.fullName,
        email: payload.email,
        mobile: payload.mobile,
        timestamp,
        ...payload.details
      })
    }).catch(() => {});
  } catch (err) {
    // Ignore fallback errors
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

// Helper for dynamic intelligent CBT response when Gemini API is unavailable or unconfigured
function generateDynamicCbtResponse(prompt: string, currentDay: number = 1, mood: string = 'Calm') {
  const p = prompt.toLowerCase().trim();
  
  if (p.includes('hi') || p.includes('hello') || p.includes('hey') || p.includes('namaste') || p.includes('greetings')) {
    return {
      response: `Namaste! I am your 24/7 Mind Mastery & Stress Reset Coach on Day ${currentDay} of your inner peace journey.\n\nWhether you are dealing with a busy mind, seeking CBT reframing for stress, or wanting a quick breath regulation exercise, I am here to support you. What is currently present in your mind right now?`,
      suggestedAffirmation: "I welcome peace and clarity into this present moment."
    };
  }

  if (p.includes('anxiety') || p.includes('anxious') || p.includes('fear') || p.includes('panic') || p.includes('worry') || p.includes('nervous')) {
    return {
      response: `Anxiety is your autonomic nervous system's misplaced attempt to protect you from uncertainty. When anxiety surges, your amygdala triggers a sympathetic fight-or-flight response.\n\nTo signal safety to your nervous system immediately, perform the **4-7-8 Vagus Nerve Reset**: Inhale through your nose for 4 seconds, gently hold for 7 seconds, and exhale slowly through un-pursed lips for 8 seconds. Repeat this 3 times.\n\nAsk yourself: *"Is this threat real right now in this exact room, or is my mind projecting into the future?"* Grounding yourself in physical facts brings immediate relief.`,
      suggestedAffirmation: "I release the need to control the future and rest safely in the present moment."
    };
  }

  if (p.includes('overthink') || p.includes('thought') || p.includes('loop') || p.includes('mind') || p.includes('head') || p.includes('ruminat')) {
    return {
      response: `Overthinking is cognitive entanglement—confusing the act of *thinking* with the act of *solving*.\n\nIn CBT psychology, we practice becoming the **Calm Observer**. Imagine sitting by a peaceful river. Each thought is simply a floating leaf drifting past. You do not need to jump into the water to grab every leaf—just observe them float away.\n\nTry labeling your thoughts silently: *"I am noticing the thought that..."* This simple linguistic shift instantly creates healthy space between your core self and the mental noise.`,
      suggestedAffirmation: "I am the peaceful observer of my thoughts, not the noise itself."
    };
  }

  if (p.includes('stress') || p.includes('overwhelm') || p.includes('work') || p.includes('pressure') || p.includes('busy') || p.includes('exhaust')) {
    return {
      response: `Overwhelm happens when your mind tries to hold ten future tasks at once instead of honoring the single task before you.\n\nTake a 60-second physical reset right now: drop your shoulders away from your ears, unclench your jaw, and let your belly soften completely on your next breath.\n\nAsk yourself: *"What is the single most meaningful action I can take in the next 15 minutes?"* Focus on that one step. Excellence comes from focused calm, not hurried exhaustion.`,
      suggestedAffirmation: "I prioritize my inner peace over external urgency."
    };
  }

  if (p.includes('sleep') || p.includes('night') || p.includes('insomnia') || p.includes('bed') || p.includes('rest') || p.includes('tired')) {
    return {
      response: `Preparing your mind for restorative sleep requires signaling physiological safety to your body.\n\nAs you lie down, try **Somatic Progressive Muscle Release**: gently squeeze your toes for 5 seconds, then let them fall completely limp. Work your way up through your legs, stomach, shoulders, and face.\n\nCombine this with our Day 1 or Day 2 Binaural Theta Soundscapes in the app to synchronize your brainwaves into deep delta sleep.`,
      suggestedAffirmation: "I surrender today's efforts and rest in complete peace."
    };
  }

  if (p.includes('anger') || p.includes('angry') || p.includes('frustrat') || p.includes('irritat') || p.includes('mad')) {
    return {
      response: `Anger is often a secondary emotion—a boundary alarm signaling that a core value, expectation, or boundary was crossed.\n\nBefore reacting, practice the **Somatic Pause**: place your hand over your solar plexus, breathe deeply into your belly, and allow the heat of the anger to soften. \n\nAsk yourself: *"What underlying need or hurt is my anger trying to protect?"* Responding from calm awareness gives you back your personal power.`,
      suggestedAffirmation: "I honor my feelings without letting anger drive my actions."
    };
  }

  if (p.includes('sad') || p.includes('grief') || p.includes('lonely') || p.includes('cry') || p.includes('depress') || p.includes('hurt')) {
    return {
      response: `Heavy emotions like sadness or grief are not signs of weakness—they are signs of your deep capacity to care and feel.\n\nInstead of pushing the feeling away or judging yourself, offer yourself radical self-compassion. Place both hands over your heart, feel the warmth of your skin, and tell yourself: *"It is okay to feel this way right now. I am here for myself."*\n\nGive yourself permission to go gently today. Healing is not linear, and every breath you take is progress.`,
      suggestedAffirmation: "I meet myself with gentle kindness, love, and radical acceptance."
    };
  }

  if (p.includes('focus') || p.includes('procrastinat') || p.includes('distract') || p.includes('motivation') || p.includes('lazy')) {
    return {
      response: `Procrastination is rarely a time-management issue; it is an emotional regulation response to perceived discomfort or fear of failure.\n\nTo break the resistance, apply the **5-Minute Micro-Step Rule**: promise yourself you will work on the task for just 5 minutes with zero expectation of perfection. Once you overcome the initial inertia, momentum naturally takes over.\n\nClean your physical space, take 3 deep breath cycles, and begin with just one small action.`,
      suggestedAffirmation: "I move forward with ease, taking one small mindful step at a time."
    };
  }

  if (p.includes('meditat') || p.includes('breath') || p.includes('challenge') || p.includes('day') || p.includes('mainak') || p.includes('certificate')) {
    return {
      response: `In the 5-Day Mental Reset Challenge by Coach Mainak Chatterjee, daily 30-minute practice is designed to rewire your neural pathways through sound therapy, box breathing, CBT journaling, and guided meditation.\n\nConsistency matters far more than perfection. Even 10-15 minutes of present awareness today strengthens your brain's prefrontal cortex and lowers cortisol levels.\n\nCheck your Dashboard for today's Day ${currentDay} guided lesson and soundscape!`,
      suggestedAffirmation: "Every moment of present awareness rewires my mind for lasting peace."
    };
  }

  // Extract key terms from user's custom prompt to make the response dynamically personalized
  const userKeywords = prompt.trim().split(' ').filter(w => w.length > 3).slice(0, 3).join(', ');
  const topicSummary = userKeywords ? `regarding "${userKeywords}"` : 'on your mind';

  return {
    response: `Thank you for sharing your thoughts ${topicSummary}. On Day ${currentDay} of your Mind Reset journey, bringing conscious awareness to whatever you are experiencing is the first step toward freedom.\n\nIn CBT psychology, we recognize that our automatic interpretations create our emotional reality. When you examine your thoughts around this topic, ask yourself:\n1. *"Is this thought 100% true, or is it an assumption?"*\n2. *"How does holding this thought make me feel?"*\n3. *"What is a more compassionate, peaceful way to view this situation?"*\n\nPause, place a hand on your heart, and take three deep, slow belly breaths. You have the inner power to choose peace in every moment.`,
    suggestedAffirmation: `I choose peace, clarity, and self-compassion when reflecting ${topicSummary}.`
  };
}

// AI Reflection Assistant endpoint using Gemini 3.6 Flash
app.post("/api/ai-reflection", async (req, res) => {
  try {
    const { prompt, journalContext, currentDay, mood, history } = req.body;
    
    const apiKey = process.env.GEMINI_API_KEY;

    const systemPrompt = `You are the "Mind Mastery & Stress Reset Coach" for the "Path to Inner Peace" 5-Day Mental Reset Challenge by Coach Mainak Chatterjee.
You are an empathetic psycho-spiritual guide trained in CBT psychology, breathwork, vagus nerve regulation, and mindfulness methods.
Your goal is to answer ANY prompt or question from the user with direct, thoughtful, and specific guidance. Never give repetitive generic answers. Every response must address the user's exact words.

User Context:
- Current Challenge Day: ${currentDay || 1}
- Recent Mood: ${mood || 'Calm'}
${journalContext ? `- Journal Entry: "${journalContext}"` : ''}

Rules:
1. Speak with warm compassion, clarity, practical CBT reframing, and grounded wisdom.
2. Directly answer the user's specific question or statement with 2-3 tailored, highly relevant paragraphs.
3. At the very end of your message, add an affirmation formatted strictly as: "Affirmation: [A short, custom, uplifting 1-sentence affirmation customized for this topic]".
4. Do not give medical diagnosis; focus on mental reset, breath awareness, emotional regulation, and inner clarity.`;

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
          model: 'gemini-3.6-flash',
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
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath, {
      setHeaders: (res, filePath) => {
        if (filePath.endsWith('.html')) {
          res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
          res.setHeader('Pragma', 'no-cache');
          res.setHeader('Expires', '0');
        }
      }
    }));
    app.get('*', (_req, res) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Path to Inner Peace server running on http://localhost:${PORT}`);
  });
}

startServer();
