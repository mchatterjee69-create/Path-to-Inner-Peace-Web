import React, { useState } from 'react';
import { dispatchFormToAdmin } from '../../utils/formSubmit';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

interface DropUsALineSectionProps {
  className?: string;
}

export const DropUsALineSection: React.FC<DropUsALineSectionProps> = ({ className = '' }) => {
  const { addToast } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setErrorMessage('Please enter your name');
      return;
    }
    if (!formData.mobile.trim() && !formData.email.trim()) {
      setErrorMessage('Please provide either a mobile number or email address');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      await dispatchFormToAdmin({
        formType: 'Drop Us A Line - Contact Inquiry',
        fullName: formData.name.trim(),
        email: formData.email.trim() || undefined,
        mobile: formData.mobile.trim() || undefined,
        details: {
          Message: formData.message.trim() || 'No message provided',
          Source: 'Home Page - Drop Us A Line Section'
        }
      });

      setIsSubmitted(true);
      if (addToast) {
        addToast('Message sent successfully! We will connect with you soon.', 'success');
      }
      setFormData({ name: '', mobile: '', email: '', message: '' });
    } catch (err) {
      console.error('Failed to submit contact form:', err);
      setErrorMessage('Failed to send message. Please try again or reach us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="drop-us-a-line-section" 
      className={`w-full bg-transparent !mt-1 sm:!mt-2 pt-1 pb-2 sm:pt-2 sm:pb-3 px-2 sm:px-4 transition-colors ${className}`}
    >
      <div className="w-full max-w-6xl mx-auto">
        {/* Fullscape Transparent Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pb-2 border-b border-slate-200/80 mb-3">
          <div className="flex items-center gap-2">
            <h2 className="font-heading text-lg sm:text-xl font-bold text-[#0B6B53] tracking-tight whitespace-nowrap">
              Drop us a line!
            </h2>
          </div>
          <p className="text-[11px] sm:text-xs text-slate-500 font-normal truncate">
            Ready to transform your mind and life? We're here to assist.
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-3 px-4 bg-emerald-50/70 border border-emerald-200/60 rounded-lg text-center flex flex-col sm:flex-row items-center justify-between gap-2 animate-fadeIn">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <p className="text-xs text-slate-800 font-medium">
                <span className="font-bold">Thank You!</span> We have received your note and will connect with you shortly.
              </p>
            </div>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-xs font-semibold text-[#0B6B53] hover:underline cursor-pointer whitespace-nowrap"
            >
              Send another note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-2">
            {errorMessage && (
              <div className="p-2 bg-red-50/90 border border-red-200/80 rounded-md text-red-700 text-xs font-medium">
                {errorMessage}
              </div>
            )}

            {/* Row 1: Wide Fullscape 3-column input fields */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Name*"
                  required
                  className="w-full px-3 py-2 bg-transparent border border-slate-300 hover:border-slate-400 rounded-md text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#0B6B53] focus:ring-1 focus:ring-[#0B6B53] transition-colors"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Mobile Number*"
                  className="w-full px-3 py-2 bg-transparent border border-slate-300 hover:border-slate-400 rounded-md text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#0B6B53] focus:ring-1 focus:ring-[#0B6B53] transition-colors"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email*"
                  className="w-full px-3 py-2 bg-transparent border border-slate-300 hover:border-slate-400 rounded-md text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#0B6B53] focus:ring-1 focus:ring-[#0B6B53] transition-colors"
                />
              </div>
            </div>

            {/* Row 2: Message input */}
            <div>
              <input
                type="text"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Messege"
                className="w-full px-3 py-2 bg-transparent border border-slate-300 hover:border-slate-400 rounded-md text-xs sm:text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:border-[#0B6B53] focus:ring-1 focus:ring-[#0B6B53] transition-colors"
              />
            </div>

            {/* Row 3: Send button centered with slightly larger button & text */}
            <div className="flex justify-center pt-1">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-2 bg-[#1B4D3E] hover:bg-[#133D2D] disabled:opacity-75 text-white font-semibold text-sm rounded-full shadow-xs hover:shadow-sm active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Send</span>
                    <Send className="w-3.5 h-3.5 text-emerald-200" />
                  </>
                )}
              </button>
            </div>

            {/* ReCAPTCHA / Privacy notice - compact centered single line */}
            <p className="text-[10px] sm:text-[11px] text-slate-400 text-center leading-none pt-1">
              Protected by reCAPTCHA and Google{' '}
              <a 
                href="https://policies.google.com/privacy" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-600 underline hover:text-[#0B6B53]"
              >
                Privacy Policy
              </a>{' '}
              &{' '}
              <a 
                href="https://policies.google.com/terms" 
                target="_blank" 
                rel="noreferrer" 
                className="text-slate-600 underline hover:text-[#0B6B53]"
              >
                Terms of Service
              </a>.
            </p>
          </form>
        )}
      </div>
    </section>
  );
};
