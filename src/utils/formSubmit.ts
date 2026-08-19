/**
 * Utility to dispatch all user form submissions (Challenge Registrations,
 * Career Axis Bookings, Inquiries, and User Signups) to mchatterjee69@gmail.com
 */

export interface FormSubmitPayload {
  formType: string;
  fullName: string;
  email?: string;
  mobile?: string;
  details?: Record<string, any>;
}

export async function dispatchFormToAdmin(payload: FormSubmitPayload): Promise<boolean> {
  const adminEmail = "mchatterjee69@gmail.com";
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

  // 1. Primary Dispatch: Call backend Express endpoint
  try {
    await fetch("/api/notify-registration", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        formType: payload.formType,
        fullName: payload.fullName,
        email: payload.email,
        mobile: payload.mobile,
        details: payload.details,
        timestamp
      })
    });
  } catch (err) {
    console.warn("Backend notify-registration warning:", err);
  }

  // 2. Client-side Backup Dispatch: Direct FormSubmit post to mchatterjee69@gmail.com
  try {
    const flattenedDetails: Record<string, string> = {};
    if (payload.details && typeof payload.details === "object") {
      Object.entries(payload.details).forEach(([k, v]) => {
        flattenedDetails[k] = typeof v === "object" ? JSON.stringify(v) : String(v);
      });
    }

    const formSubmitBody = {
      _subject: `[New Lead] ${payload.formType} - ${payload.fullName || payload.email || 'User'}`,
      _captcha: "false",
      _template: "table",
      _replyto: payload.email || adminEmail,
      "Form Type": payload.formType,
      "Full Name": payload.fullName || "N/A",
      "Email Address": payload.email || "N/A",
      "Mobile / WhatsApp": payload.mobile || "N/A",
      "Submission Timestamp": timestamp,
      ...flattenedDetails
    };

    const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-shboembemwee4psokiddmd-22738377368.asia-southeast1.run.app';

    await fetch(`https://formsubmit.co/ajax/${adminEmail}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Origin": currentOrigin,
        "Referer": `${currentOrigin}/`
      },
      body: JSON.stringify(formSubmitBody)
    });

    console.log(`✅ Form data dispatched to ${adminEmail}`);
    return true;
  } catch (err) {
    console.warn("Client-side FormSubmit backup warning:", err);
    return false;
  }
}
