import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { FOUNDER_INFO } from '../../data/mockData';
import { 
  BLOG_ARTICLES, 
  MAGAZINE_ISSUES, 
  FUTURE_PROGRAMS, 
  MEMBER_RESOURCES 
} from '../../data/memberBenefitsData';
import { 
  BlogArticle, 
  MagazineIssue, 
  FutureProgram, 
  MemberResource 
} from '../../types';
import { 
  User, 
  Mail, 
  MessageCircle, 
  Globe, 
  Crown, 
  Award, 
  Clock, 
  Flame, 
  LogOut, 
  CheckCircle2,
  ShieldCheck,
  BookOpen,
  Book,
  FileText,
  Calendar,
  Download,
  Sun,
  Star,
  Search,
  Lock,
  ArrowRight,
  Check,
  Users,
  Bell,
  X,
  ExternalLink,
  Video,
  MapPin,
  Bookmark,
  Key,
  ChevronRight,
  Quote,
  Zap
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    user, 
    loginUser, 
    registerUser, 
    logoutUser, 
    updateUserProfile, 
    setIsCertificateModalOpen, 
    setActiveView,
    founderPhoto
  } = useApp();

  // Auth Page Tabs & Form States (when user is not logged in)
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  
  // Login Form States
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginRemember, setLoginRemember] = useState(true);
  const [loginError, setLoginError] = useState('');

  // Sign Up Form States
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPhone, setSignupPhone] = useState('');
  const [signupCountry, setSignupCountry] = useState('India');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupAgreeWhatsapp, setSignupAgreeWhatsapp] = useState(true);
  const [signupError, setSignupError] = useState('');

  // Logged-in Portal Tab & Search States
  const [activePortalTab, setActivePortalTab] = useState<'profile' | 'articles' | 'magazine' | 'programs' | 'downloads'>('profile');
  
  // Profile Form Edit States
  const [editName, setEditName] = useState(user.name);
  const [editPhone, setEditPhone] = useState(user.whatsapp);
  const [editEmail, setEditEmail] = useState(user.email);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Benefits Modals & Filtering States
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(null);
  const [articleCategoryFilter, setArticleCategoryFilter] = useState<string>('All');
  const [articleSearchQuery, setArticleSearchQuery] = useState<string>('');
  const [bookmarkedArticleIds, setBookmarkedArticleIds] = useState<string[]>([]);

  const [selectedMagazine, setSelectedMagazine] = useState<MagazineIssue | null>(null);
  const [magTab, setMagTab] = useState<'overview' | 'toc' | 'experts'>('overview');
  const [rsvpPrograms, setRsvpPrograms] = useState<Record<string, boolean>>({
    'prog-1': true // Default RSVP for demo user
  });
  const [rsvpToast, setRsvpToast] = useState<string | null>(null);
  const [isLogoutConfirmOpen, setIsLogoutConfirmOpen] = useState(false);
  const [actionToast, setActionToast] = useState<string | null>(null);

  const handleDownloadMagazineFile = (mag: MagazineIssue) => {
    const filename = `${mag.title.replace(/[^a-zA-Z0-9]/g, '_')}_31_Pages_Edition.html`;

    const htmlDoc = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${mag.title} — Printable Issue PDF</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
    
    body {
      font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
      background-color: #0f172a;
      color: #334155;
      margin: 0;
      padding: 0;
      line-height: 1.6;
    }

    .container {
      max-width: 920px;
      margin: 40px auto;
      background: #ffffff;
      padding: 48px;
      border-radius: 24px;
      box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25);
    }

    .header-banner {
      background: linear-gradient(135deg, #022c22 0%, #0f172a 100%);
      color: #ffffff;
      padding: 36px;
      border-radius: 20px;
      margin-bottom: 36px;
      border: 1px solid #059669;
    }

    .badge {
      display: inline-block;
      background: #fbbf24;
      color: #0f172a;
      font-weight: 800;
      font-size: 11px;
      padding: 4px 12px;
      border-radius: 9999px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 12px;
    }

    h1 {
      font-family: 'Cinzel', serif;
      font-size: 30px;
      margin: 0 0 8px 0;
      color: #ffffff;
    }

    .subtitle {
      color: #fbbf24;
      font-size: 14px;
      font-weight: 600;
      margin: 0;
    }

    .editor-box {
      background: #fffbeb;
      border: 1px solid #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 24px;
      border-radius: 12px;
      margin: 28px 0;
    }

    .editor-title {
      font-weight: 800;
      color: #78350f;
      font-size: 12px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 8px;
    }

    .editor-quote {
      font-style: italic;
      color: #451a03;
      font-size: 13px;
      white-space: pre-line;
      line-height: 1.7;
    }

    h2 {
      font-family: 'Cinzel', serif;
      font-size: 20px;
      color: #0f172a;
      border-bottom: 2px solid #e2e8f0;
      padding-bottom: 8px;
      margin-top: 36px;
    }

    .highlight-grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 12px;
      margin: 20px 0;
    }

    .highlight-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 14px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 600;
      color: #1e293b;
    }

    .chapter-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 16px;
      font-size: 13px;
    }

    .chapter-table th, .chapter-table td {
      padding: 12px 16px;
      border: 1px solid #e2e8f0;
      text-align: left;
    }

    .chapter-table th {
      background: #f1f5f9;
      color: #0f172a;
      font-weight: 700;
    }

    .page-num {
      font-weight: 800;
      color: #0b6b53;
      background: #e6f4f1;
      padding: 2px 8px;
      border-radius: 6px;
    }

    .footer {
      text-align: center;
      margin-top: 48px;
      padding-top: 24px;
      border-top: 1px solid #e2e8f0;
      font-size: 12px;
      color: #64748b;
    }

    @media print {
      body { background: white; }
      .container { box-shadow: none; padding: 0; }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header-banner">
      <span class="badge">${mag.issueNumber}</span>
      <h1>${mag.title}</h1>
      <p class="subtitle">${mag.monthYear} — Path to Inner Peace Full Edition</p>
    </div>

    <div class="editor-box">
      <div class="editor-title">Editor's Note — Mainak Chatterjee (Founder & Editor)</div>
      <div class="editor-quote">"${mag.editorsNote}"</div>
    </div>

    <h2>Featured Articles & Worksheets</h2>
    <div class="highlight-grid">
      ${mag.highlights.map(h => `<div class="highlight-card">✓ ${h}</div>`).join('')}
    </div>

    <h2>Full 31-Page Table of Contents & Roadmap</h2>
    <table class="chapter-table">
      <thead>
        <tr>
          <th>Page</th>
          <th>Chapter / Article Title</th>
          <th>Key Topics & Features</th>
        </tr>
      </thead>
      <tbody>
        <tr><td><span class="page-num">Pg 04</span></td><td><strong>About Path to Inner Peace</strong></td><td>Mission, Vision, Values (Compassion, Integrity) & Impact (5000+ Lives)</td></tr>
        <tr><td><span class="page-num">Pg 05</span></td><td><strong>The Science of Inner Peace</strong></td><td>Prefrontal Cortex, Amygdala, Hippocampus & Vagus Nerve Responses</td></tr>
        <tr><td><span class="page-num">Pg 06</span></td><td><strong>How the Mind Creates Stress</strong></td><td>5-Stage Stress Cycle & Biological Impact on Heart, Lungs, Immunity</td></tr>
        <tr><td><span class="page-num">Pg 07</span></td><td><strong>CBT: Changing Thoughts, Changing Life</strong></td><td>Cognitive Behavioral Therapy & Reframing 5 Thinking Traps</td></tr>
        <tr><td><span class="page-num">Pg 08</span></td><td><strong>The Neuroscience of Meditation</strong></td><td>Brain Waves (Beta, Alpha, Theta, Delta) & Grey Matter Expansion</td></tr>
        <tr><td><span class="page-num">Pg 09</span></td><td><strong>The Power of Mindfulness</strong></td><td>Mindful vs Mindless Living Comparison & 5 Daily Practices</td></tr>
        <tr><td><span class="page-num">Pg 10</span></td><td><strong>Integrating Inner Peace into Daily Life</strong></td><td>6 Everyday Strategies & 21-Day Challenge Overview</td></tr>
        <tr><td><span class="page-num">Pg 11-12</span></td><td><strong>Feature: The Power of Self-Compassion</strong></td><td>By Moytree Bandyopadhyay (Student & Habit Practitioner)</td></tr>
        <tr><td><span class="page-num">Pg 12-13</span></td><td><strong>Feature: Emotional Healing</strong></td><td>By Tanutra Bhattacharjee (Spiritual Guru)</td></tr>
        <tr><td><span class="page-num">Pg 14</span></td><td><strong>Feature: Relationship Toolkit</strong></td><td>By Sourav Mukherjee (Relationship Expert)</td></tr>
        <tr><td><span class="page-num">Pg 15</span></td><td><strong>Career Clarity Framework</strong></td><td>Passion vs Purpose Matrix & Decision-Making Matrix</td></tr>
        <tr><td><span class="page-num">Pg 16</span></td><td><strong>Managing Anxiety Naturally</strong></td><td>Anxiety Reset Framework & 5-4-3-2-1 Sensory Grounding</td></tr>
        <tr><td><span class="page-num">Pg 17</span></td><td><strong>Overthinking: When Mind Won't Slow Down</strong></td><td>Deconstructing Overthinking Loops & Reframing Prompts</td></tr>
        <tr><td><span class="page-num">Pg 18</span></td><td><strong>Sleep & Mental Health</strong></td><td>Sleep Hygiene, 7-7-7 Rule & Bedtime Breathwork</td></tr>
        <tr><td><span class="page-num">Pg 19</span></td><td><strong>Emotional Intelligence (EQ)</strong></td><td>5 Core Components & Daily Reflection Habits</td></tr>
        <tr><td><span class="page-num">Pg 21</span></td><td><strong>Guided Meditation Script</strong></td><td>10-Minute Daily Protocol for Deep Calm</td></tr>
        <tr><td><span class="page-num">Pg 22</span></td><td><strong>Spiritual Awakening</strong></td><td>Ego Living vs Awakened Living Comparison</td></tr>
        <tr><td><span class="page-num">Pg 23</span></td><td><strong>7-Day Inner Peace Challenge</strong></td><td>Printable Progress Tracker & Rules</td></tr>
        <tr><td><span class="page-num">Pg 24</span></td><td><strong>Reflection Journal Worksheet</strong></td><td>Daily & Deeper Self-Awareness Prompts</td></tr>
        <tr><td><span class="page-num">Pg 25</span></td><td><strong>Success Story: Ananya's Journey</strong></td><td>Real Case Study on Overcoming Chronic Anxiety in Kolkata</td></tr>
        <tr><td><span class="page-num">Pg 26</span></td><td><strong>Book Reviews</strong></td><td>Power of Now, Atomic Habits, Untethered Soul & Man's Search for Meaning</td></tr>
        <tr><td><span class="page-num">Pg 27</span></td><td><strong>Words That Elevate</strong></td><td>Timeless Inspirational Quotes from Buddha, Ram Dass, Rumi</td></tr>
        <tr><td><span class="page-num">Pg 28</span></td><td><strong>Ask The Experts Q&A Panel</strong></td><td>Juneli Das, Nandini Bhattacharjee, Tarun Goswami</td></tr>
        <tr><td><span class="page-num">Pg 29</span></td><td><strong>Upcoming Programs & Community</strong></td><td>Rewire Your Brain Challenge, Meditation Camp & Behala Food Drive</td></tr>
      </tbody>
    </table>

    <div style="margin-top: 36px; padding: 24px; background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px;">
      <h3 style="margin-top: 0; color: #166534;">✓ Complete Printable Issue & Worksheets Included</h3>
      <p style="margin-bottom: 0; font-size: 13px; color: #14532d;">
        To save or print as a standard PDF document, press <strong>Ctrl+P</strong> (or <strong>Cmd+P</strong>) and select "Save as PDF".
      </p>
    </div>

    <div class="footer">
      <p><strong>Path to Inner Peace</strong> — A Holistic Inner Transformation Platform</p>
      <p>www.pathtoinnerpeace.in | connect@pathtoinnerpeace.in | WhatsApp: +91 9163670300</p>
      <p>© 2026 Path to Inner Peace. All Rights Reserved.</p>
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setActionToast(`✓ Downloaded "${mag.title}" (Printable Document) to your device!`);
    setTimeout(() => setActionToast(null), 4000);
  };

  const handleDownloadResourceFile = (res: typeof MEMBER_RESOURCES[0]) => {
    if (res.downloadUrl && res.downloadUrl !== '#') {
      window.open(res.downloadUrl, '_blank');
      return;
    }

    const filename = `${res.title.replace(/[^a-zA-Z0-9]/g, '_')}_Pro_Resource.html`;
    const htmlDoc = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${res.title} — Path to Inner Peace Resource</title>
  <style>
    body { font-family: system-ui, sans-serif; padding: 40px; background: #0f172a; color: #f8fafc; }
    .card { background: #1e293b; padding: 32px; border-radius: 16px; border: 1px solid #334155; max-width: 700px; margin: 0 auto; }
    h1 { color: #f59e0b; margin-top: 0; }
    .badge { background: #0b6b53; color: white; padding: 4px 12px; border-radius: 999px; font-size: 12px; font-weight: bold; }
    .footer { margin-top: 40px; text-align: center; color: #94a3b8; font-size: 12px; }
  </style>
</head>
<body>
  <div class="card">
    <span class="badge">${res.type.toUpperCase()} • ${res.size}</span>
    <h1>${res.title}</h1>
    <p>${res.description}</p>
    <hr style="border-color: #334155; margin: 24px 0;">
    <h3>Official Access Granted — Pro Member Edition</h3>
    <p>This is your official downloadable resource from Path to Inner Peace. Keep this file saved on your device for offline practice.</p>
    <div class="footer">
      www.pathtoinnerpeace.in | Path to Inner Peace Pro Vault
    </div>
  </div>
</body>
</html>`;

    const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setActionToast(`✓ Downloaded "${res.title}" to your device!`);
    setTimeout(() => setActionToast(null), 4000);
  };

  const handlePerformLogout = () => {
    setIsLogoutConfirmOpen(false);
    logoutUser();
    setAuthMode('login');
    setLoginIdentifier('');
    setLoginPassword('');
    setLoginError('');
    setActivePortalTab('profile');
    setActionToast('You have been logged out successfully.');
    setTimeout(() => setActionToast(null), 3500);
  };

  // Handlers for Login & Signup
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginIdentifier.trim()) {
      setLoginError('Please enter your email or WhatsApp number.');
      return;
    }
    setLoginError('');
    loginUser(loginIdentifier, 'Member Seeker');
  };

  const handleDemoLogin = (type: 'seeker' | 'pro') => {
    if (type === 'pro') {
      loginUser('pro.member@pathtoinnerpeace.in', 'Ananya Sharma');
    } else {
      loginUser('seeker@pathtoinnerpeace.in', 'Aarav Kumar');
    }
  };

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupName.trim() || !signupPhone.trim()) {
      setSignupError('Please fill in your name and WhatsApp number.');
      return;
    }
    setSignupError('');
    registerUser({
      fullName: signupName,
      email: signupEmail,
      whatsapp: signupPhone,
      country: signupCountry,
      agreedWhatsapp: signupAgreeWhatsapp,
      registeredAt: new Date().toISOString().split('T')[0]
    });
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name: editName,
      whatsapp: editPhone,
      email: editEmail
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const toggleRsvp = (programId: string, programTitle: string) => {
    setRsvpPrograms(prev => {
      const nextState = !prev[programId];
      if (nextState) {
        setRsvpToast(`Seat confirmed for "${programTitle}"! Access details sent to your WhatsApp & Email.`);
      } else {
        setRsvpToast(`RSVP cancelled for "${programTitle}".`);
      }
      setTimeout(() => setRsvpToast(null), 3500);
      return { ...prev, [programId]: nextState };
    });
  };

  const toggleBookmark = (artId: string) => {
    setBookmarkedArticleIds(prev => 
      prev.includes(artId) ? prev.filter(id => id !== artId) : [...prev, artId]
    );
  };

  // Filtered Articles
  const filteredArticles = BLOG_ARTICLES.filter(art => {
    const matchesCategory = articleCategoryFilter === 'All' || art.category === articleCategoryFilter;
    const matchesSearch = art.title.toLowerCase().includes(articleSearchQuery.toLowerCase()) || 
                          art.excerpt.toLowerCase().includes(articleSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  /* ========================================================================
     VIEW 1: SIGN UP & LOG IN PAGE (For Logged Out / Non-Registered Users)
     ======================================================================== */
  if (!user.registered) {
    return (
      <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-10 animate-fadeIn pb-24">
        
        {/* Top Branding Hero */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#0B6B53] font-bold text-xs uppercase tracking-wider">
            <Sun className="w-4 h-4 text-[#0B6B53]" />
            <span>MEMBER PORTAL ACCESS</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-900 tracking-tight leading-tight">
            Welcome to Path to Inner Peace
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Sign in or create your account to access your personal transformation dashboard, monthly digital magazines, expert CBT articles, and live program invitations.
          </p>
        </div>

        {/* Auth Box & Benefits Preview Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Auth Form Box (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
            
            {/* Auth Toggle Tabs */}
            <div className="grid grid-cols-2 bg-slate-100/80 p-1.5 border-b border-slate-200">
              <button
                type="button"
                onClick={() => setAuthMode('login')}
                className={`py-3 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 ${
                  authMode === 'login'
                    ? 'bg-white text-slate-900 shadow-sm border border-slate-200/80'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <Key className="w-4 h-4 text-[#0B6B53]" />
                <span>Log In</span>
              </button>

              <button
                type="button"
                onClick={() => setAuthMode('signup')}
                className={`py-3 text-xs sm:text-sm font-bold rounded-2xl transition-all flex items-center justify-center gap-2 ${
                  authMode === 'signup'
                    ? 'bg-[#0B6B53] text-white shadow-sm'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                <User className="w-4 h-4" />
                <span>Create Account</span>
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              
              {/* LOG IN FORM */}
              {authMode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  <div>
                    <h2 className="font-heading font-extrabold text-xl text-slate-900">
                      Sign In to Your Member Portal
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Enter your registered Email Address or WhatsApp Number to continue.
                    </p>
                  </div>

                  {loginError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                      {loginError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Email or WhatsApp Number
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="you@example.com or +91 9876543210"
                        value={loginIdentifier}
                        onChange={(e) => setLoginIdentifier(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          setActionToast('Password reset instructions sent to your registered WhatsApp/Email!');
                          setTimeout(() => setActionToast(null), 3500);
                        }}
                        className="text-xs font-semibold text-[#0B6B53] hover:underline"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="password"
                        placeholder="••••••••"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={loginRemember}
                        onChange={(e) => setLoginRemember(e.target.checked)}
                        className="w-4 h-4 text-[#0B6B53] rounded"
                      />
                      <span>Keep me logged in on this device</span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0B6B53] text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/10 hover:bg-[#134E4A] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Log In to Member Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  {/* Demo Quick Login Options */}
                  <div className="pt-4 border-t border-slate-100 space-y-2">
                    <p className="text-[11px] uppercase font-bold text-slate-400 text-center tracking-wider">
                      Instant Demo Test Sign-In
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleDemoLogin('seeker')}
                        className="p-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Zap className="w-3.5 h-3.5 text-amber-500" />
                        <span>Demo Seeker</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDemoLogin('pro')}
                        className="p-2.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl text-xs font-bold text-amber-900 flex items-center justify-center gap-1.5 transition-colors"
                      >
                        <Crown className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Demo Pro Member</span>
                      </button>
                    </div>
                  </div>
                </form>
              ) : (
                /* SIGN UP FORM */
                <form onSubmit={handleSignupSubmit} className="space-y-4">
                  <div>
                    <h2 className="font-heading font-extrabold text-xl text-slate-900">
                      Create Your Free Account
                    </h2>
                    <p className="text-xs text-slate-500 mt-0.5">
                      Join thousands of seekers transforming their mental health and inner peace.
                    </p>
                  </div>

                  {signupError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
                      {signupError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Full Name *
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        placeholder="e.g. Rahul Sharma"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <MessageCircle className="w-4 h-4 text-emerald-600 absolute left-3.5 top-3.5" />
                        <input
                          type="tel"
                          placeholder="+91 9876543210"
                          value={signupPhone}
                          onChange={(e) => setSignupPhone(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="email"
                          placeholder="rahul@example.com"
                          value={signupEmail}
                          onChange={(e) => setSignupEmail(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Country
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <select
                          value={signupCountry}
                          onChange={(e) => setSignupCountry(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
                        >
                          <option value="India">India (🇮🇳)</option>
                          <option value="United States">United States (🇺🇸)</option>
                          <option value="United Kingdom">United Kingdom (🇬🇧)</option>
                          <option value="Canada">Canada (🇨🇦)</option>
                          <option value="Australia">Australia (🇦🇺)</option>
                          <option value="UAE">UAE (🇦🇪)</option>
                          <option value="Other">Other Country</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                        Create Password
                      </label>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                        <input
                          type="password"
                          placeholder="••••••••"
                          value={signupPassword}
                          onChange={(e) => setSignupPassword(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-emerald-50/80 border border-emerald-200/60 rounded-xl space-y-2 text-xs text-emerald-950">
                    <label className="flex items-start gap-2.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={signupAgreeWhatsapp}
                        onChange={(e) => setSignupAgreeWhatsapp(e.target.checked)}
                        className="w-4 h-4 text-[#0B6B53] rounded mt-0.5 shrink-0"
                      />
                      <span className="leading-tight">
                        Receive daily 30-minute mental reset reminders & exclusive masterclass invitations on WhatsApp.
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#0B6B53] text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-900/10 hover:bg-[#134E4A] transition-all flex items-center justify-center gap-2"
                  >
                    <span>Create Account & Unlock Benefits</span>
                    <Sun className="w-4 h-4 text-amber-300" />
                  </button>

                  <p className="text-[11px] text-center text-slate-400">
                    By registering, you agree to Path to Inner Peace Privacy Policy & Terms.
                  </p>
                </form>
              )}

            </div>
          </div>

          {/* Right Benefits Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="bg-gradient-to-br from-[#0B6B53] to-[#134E4A] p-6 sm:p-8 rounded-3xl text-white space-y-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 transform translate-x-6 -translate-y-6 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#D4AF37]">
                  PRO MEMBER ADVANTAGE
                </span>
                <h3 className="font-heading font-extrabold text-2xl text-white">
                  Why Create an Account?
                </h3>
                <p className="text-xs text-emerald-100 leading-relaxed">
                  Join Mainak Chatterjee’s inner circle and gain instant access to exclusive mental transformation tools.
                </p>
              </div>

              <div className="space-y-4 text-xs">
                
                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <BookOpen className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Inner Peace Blog & Articles</h4>
                    <p className="text-emerald-100/80 mt-0.5">
                      Read expert articles on CBT techniques, vagus nerve stimulation, and stress management.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <Book className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Monthly Digital Magazine Access</h4>
                    <p className="text-emerald-100/80 mt-0.5">
                      Receive monthly digital editions packed with workbooks, audio supplements, & wisdom.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <Calendar className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">Future Program Invitations</h4>
                    <p className="text-emerald-100/80 mt-0.5">
                      Get VIP invitations to live Zoom masterclasses, retreats, and group coaching sessions.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white/10 p-3.5 rounded-2xl backdrop-blur-sm border border-white/10">
                  <Award className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-white text-sm">MindForge 360°™ Certificate & Badges</h4>
                    <p className="text-emerald-100/80 mt-0.5">
                      Track your daily streak, unlock level badges, and claim your official completion certificate.
                    </p>
                  </div>
                </div>

              </div>

              <div className="pt-2 text-center border-t border-emerald-800/60">
                <p className="text-[11px] text-emerald-200/80 italic">
                  "Your mental peace is your greatest superpower." – Mainak Chatterjee
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    );
  }

  /* ========================================================================
     VIEW 2: LOGGED-IN PRO MEMBER PROFILE & BENEFITS PORTAL
     ======================================================================== */
  return (
    <div className="max-w-6xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn pb-24">
      
      {/* RSVP Notification Toast */}
      {rsvpToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#0B6B53] text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400 flex items-center gap-3 animate-slideDown">
          <CheckCircle2 className="w-5 h-5 text-[#D4AF37] shrink-0" />
          <span className="text-xs font-bold">{rsvpToast}</span>
        </div>
      )}

      {/* Pro Member Header Profile Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left z-10">
          <div className="relative">
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-[#0B6B53] shadow-md"
              referrerPolicy="no-referrer"
            />
            <div className="absolute -bottom-2 -right-2 bg-amber-400 text-slate-950 p-1 rounded-full shadow border-2 border-white" title="Pro Member">
              <Crown className="w-4 h-4 fill-slate-950" />
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 text-[#0B6B53] px-2.5 py-0.5 rounded-full border border-emerald-300">
                {user.plan.replace(/_/g, ' ')}
              </span>
              <span className="text-[10px] font-bold text-amber-900 bg-amber-100 px-2.5 py-0.5 rounded-full border border-amber-300">
                Level {user.level} Seeker
              </span>
              {user.isElite && (
                <span className="text-[10px] font-bold text-slate-950 bg-gradient-to-r from-[#D4AF37] to-amber-500 px-2.5 py-0.5 rounded-full shadow-sm">
                  ELITE MEMBER
                </span>
              )}
            </div>

            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-900">
              {user.name}
            </h1>

            <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-2">
              <span>{user.email || 'Registered Member'}</span>
              <span>•</span>
              <span>{user.whatsapp || 'WhatsApp Connected'}</span>
            </p>
          </div>
        </div>

        {/* Action Header Buttons */}
        <div className="flex items-center gap-3 shrink-0 z-10">
          {user.completedDays.length >= 5 && (
            <button
              onClick={() => setIsCertificateModalOpen(true)}
              className="px-4 py-2.5 bg-amber-100 text-amber-900 font-bold text-xs rounded-xl border border-amber-300 flex items-center gap-2 hover:bg-amber-200 transition-all shadow-sm"
            >
              <Award className="w-4 h-4 text-[#D4AF37]" />
              <span>View Certificate</span>
            </button>
          )}

          <button
            onClick={() => setIsLogoutConfirmOpen(true)}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs rounded-xl border border-rose-200 transition-all flex items-center gap-2 shadow-sm"
            title="Log Out of your account"
          >
            <LogOut className="w-4 h-4 text-rose-600" />
            <span>Log Out</span>
          </button>
        </div>

      </div>

      {/* Pro Member Navigation Portal Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-200">
        
        <button
          onClick={() => setActivePortalTab('profile')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activePortalTab === 'profile'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Profile & Stats</span>
        </button>

        <button
          onClick={() => setActivePortalTab('articles')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activePortalTab === 'articles'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4 text-emerald-400" />
          <span>Inner Peace Blog & Articles</span>
        </button>

        <button
          onClick={() => setActivePortalTab('magazine')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activePortalTab === 'magazine'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Book className="w-4 h-4 text-amber-400" />
          <span>Monthly Magazine Access</span>
        </button>

        <button
          onClick={() => setActivePortalTab('programs')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activePortalTab === 'programs'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Calendar className="w-4 h-4 text-amber-300" />
          <span>Future Program Invitations</span>
          <span className="bg-amber-400 text-slate-950 text-[10px] px-1.5 py-0.5 rounded-full font-extrabold">
            VIP
          </span>
        </button>

        <button
          onClick={() => setActivePortalTab('downloads')}
          className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap flex items-center gap-2 ${
            activePortalTab === 'downloads'
              ? 'bg-[#0B6B53] text-white shadow-md'
              : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
          }`}
        >
          <Download className="w-4 h-4" />
          <span>Resource Vault</span>
        </button>

      </div>

      {/* ====================================================================
         TAB 1: PROFILE & PROGRESS OVERVIEW
         ==================================================================== */}
      {activePortalTab === 'profile' && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* Featured Monthly Magazine Launch Access Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 p-6 sm:p-8 rounded-3xl border border-emerald-800/50 shadow-xl text-white flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-5 z-10 text-center sm:text-left">
              <div className="w-20 h-28 shrink-0 rounded-xl overflow-hidden shadow-2xl border border-amber-400/40 relative">
                <img 
                  src={MAGAZINE_ISSUES[0]?.coverImageUrl} 
                  alt="INNER HORIZON Issue 01" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-2 max-w-xl">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                    Exclusive Member Access
                  </span>
                  <span className="text-[10px] font-bold text-emerald-300">
                    Launch Issue • Issue 01 (July 2026)
                  </span>
                </div>
                <h3 className="font-heading font-extrabold text-lg sm:text-xl text-white leading-snug">
                  INNER HORIZON: The Science of Inner Peace
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Enjoy full 31-page digital magazine access including CBT rewiring workbooks, neuroscience of meditation, and expert columns.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 z-10 w-full md:w-auto">
              <button
                type="button"
                onClick={() => {
                  setSelectedMagazine(MAGAZINE_ISSUES[0]);
                  setMagTab('overview');
                }}
                className="w-full sm:w-auto px-5 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <Book className="w-4 h-4" />
                <span>Read Issue 01 Now</span>
              </button>
              <button
                type="button"
                onClick={() => handleDownloadMagazineFile(MAGAZINE_ISSUES[0])}
                className="w-full sm:w-auto px-4 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs rounded-2xl border border-emerald-500/80 transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Download Issue PDF</span>
              </button>
              <button
                type="button"
                onClick={() => setActivePortalTab('magazine')}
                className="w-full sm:w-auto px-4 py-3 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl border border-white/20 transition-all flex items-center justify-center gap-2"
              >
                <span>All Issues</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Progress Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Current Streak</span>
              <div className="flex items-center justify-center gap-1.5">
                <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="font-heading font-extrabold text-2xl text-slate-900">{user.streakDays} Days</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Zen Meditation</span>
              <div className="flex items-center justify-center gap-1.5">
                <Clock className="w-5 h-5 text-[#0B6B53]" />
                <span className="font-heading font-extrabold text-2xl text-slate-900">{user.meditationMinutes} Mins</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Seeker XP</span>
              <div className="flex items-center justify-center gap-1.5">
                <Star className="w-5 h-5 text-amber-500 fill-amber-400" />
                <span className="font-heading font-extrabold text-2xl text-slate-900">{user.xpPoints} XP</span>
              </div>
            </div>

            <div className="bg-white p-5 rounded-3xl border border-slate-200 shadow-sm text-center space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Badges Unlocked</span>
              <div className="flex items-center justify-center gap-1.5">
                <Award className="w-5 h-5 text-indigo-600" />
                <span className="font-heading font-extrabold text-2xl text-slate-900">{user.badges.length} Badges</span>
              </div>
            </div>
          </div>

          {/* Edit Profile Information */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="font-heading font-extrabold text-xl text-slate-900">
                  Account Profile Details
                </h2>
                <p className="text-xs text-slate-500">
                  Manage your personal information and contact preferences.
                </p>
              </div>

              {savedSuccess && (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  Saved!
                </span>
              )}
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0B6B53] text-white font-bold text-xs rounded-xl hover:bg-[#134E4A] transition-all shadow-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>

          {/* Account Session Security & Logout Card */}
          <div className="bg-rose-50/60 p-6 rounded-3xl border border-rose-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <LogOut className="w-4 h-4 text-rose-600" />
                <h3 className="font-heading font-bold text-sm text-slate-900">Active Member Session</h3>
              </div>
              <p className="text-xs text-slate-600">
                Currently signed in as <span className="font-bold text-slate-900">{user.email || user.whatsapp || user.name}</span>.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsLogoutConfirmOpen(true)}
              className="px-5 py-2.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-md flex items-center gap-2 shrink-0"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out of Account</span>
            </button>
          </div>

        </div>
      )}

      {/* ====================================================================
         TAB 2: INNER PEACE BLOG & ARTICLES
         ==================================================================== */}
      {activePortalTab === 'articles' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-emerald-900 text-white p-6 sm:p-8 rounded-3xl shadow-lg">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-[#D4AF37]">
                MEMBER EXCLUSIVE ARTICLES
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Mindset, CBT & Meditation Knowledge Base
              </h2>
              <p className="text-xs text-emerald-100">
                Curated research, psychological tools, and spiritual guides written by Mainak Chatterjee.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative min-w-[260px]">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                placeholder="Search articles..."
                value={articleSearchQuery}
                onChange={(e) => setArticleSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 text-white placeholder-emerald-200/60 border border-white/20 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {['All', 'CBT Wisdom', 'Sleep & Recovery', 'Stress Relief', 'Spiritual Growth'].map((cat) => (
              <button
                key={cat}
                onClick={() => setArticleCategoryFilter(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                  articleCategoryFilter === cat
                    ? 'bg-[#0B6B53] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredArticles.map((art) => {
              const isBookmarked = bookmarkedArticleIds.includes(art.id);
              return (
                <div
                  key={art.id}
                  className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col group"
                >
                  <div className="relative h-48 overflow-hidden bg-gradient-to-br from-[#0B6B53] to-slate-900">
                    <img
                      src={art.imageUrl}
                      alt={art.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#0B6B53] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm z-10 border border-emerald-400/30">
                      {art.category}
                    </div>
                    
                    <button
                      onClick={() => toggleBookmark(art.id)}
                      className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-colors z-10 ${
                        isBookmarked ? 'bg-amber-400 text-slate-950' : 'bg-black/40 text-white hover:bg-black/60'
                      }`}
                      title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Article'}
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 font-medium">
                        <span>{art.date}</span>
                        <span>•</span>
                        <span>{art.readTime}</span>
                        <span>•</span>
                        <span>By {art.author}</span>
                      </div>

                      <h3 className="font-heading font-bold text-lg text-slate-900 group-hover:text-[#0B6B53] transition-colors leading-snug">
                        {art.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {art.excerpt}
                      </p>
                    </div>

                    <button
                      onClick={() => setSelectedArticle(art)}
                      className="w-full py-2.5 bg-slate-50 hover:bg-emerald-50 text-[#0B6B53] font-bold text-xs rounded-xl border border-slate-200 hover:border-emerald-200 transition-all flex items-center justify-center gap-1.5"
                    >
                      <span>Read Full Article</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ====================================================================
         TAB 3: MONTHLY DIGITAL MAGAZINE ACCESS
         ==================================================================== */}
      {activePortalTab === 'magazine' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400/20 text-[#D4AF37] border border-amber-400/30 rounded-full text-xs font-bold">
                <Crown className="w-4 h-4" />
                <span>INNER TRANSFORMATION DIGITAL MAGAZINE</span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Monthly Pro Member Magazine Editions
              </h2>
              <p className="text-xs text-amber-100/90 leading-relaxed">
                As a Pro Member of Path to Inner Peace, you receive full digital access to our monthly transformation magazine, including audio supplement tracks and printable CBT workbooks.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-2xl border border-white/15 text-center shrink-0">
              <span className="text-[10px] uppercase font-bold text-amber-300 block">Current Issue</span>
              <span className="font-heading font-extrabold text-xl text-white">August 2026</span>
              <span className="text-[11px] text-emerald-200 block mt-1 font-semibold">✓ Access Unlocked</span>
            </div>
          </div>

          {/* Magazine Issues Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MAGAZINE_ISSUES.map((mag) => (
              <div
                key={mag.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-lg transition-all"
              >
                <div className="space-y-4">
                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-amber-950 to-slate-900">
                    <img
                      src={mag.coverImageUrl}
                      alt={mag.title}
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow z-10">
                      {mag.issueNumber}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-heading font-extrabold text-lg text-slate-900 leading-tight">
                      {mag.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {mag.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Included Highlights:
                      </span>
                      {mag.highlights.slice(0, 2).map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0B6B53] shrink-0" />
                          <span className="truncate">{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedMagazine(mag)}
                    className="py-3 bg-[#0B6B53] text-white font-bold text-xs rounded-xl hover:bg-[#134E4A] transition-all flex items-center justify-center gap-1.5 shadow-md"
                  >
                    <Book className="w-4 h-4 text-amber-300" />
                    <span>Read Online</span>
                  </button>
                  <button
                    onClick={() => handleDownloadMagazineFile(mag)}
                    className="py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download PDF</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ====================================================================
         TAB 4: INVITATIONS TO FUTURE PROGRAMS
         ==================================================================== */}
      {activePortalTab === 'programs' && (
        <div className="space-y-8 animate-fadeIn">
          
          <div className="bg-gradient-to-br from-[#0B6B53] to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-400 text-slate-950 rounded-full text-xs font-bold">
              <Calendar className="w-4 h-4" />
              <span>VIP MEMBER INVITATIONS</span>
            </div>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
              Upcoming Live Masterclasses, Retreats & Intensives
            </h2>
            <p className="text-xs text-emerald-100/90 leading-relaxed max-w-2xl">
              As a member of Path to Inner Peace, you get priority seat reservation and direct invitations to live Zoom sessions, group mentorships, and retreats led by Mainak Chatterjee.
            </p>
          </div>

          {/* Programs List */}
          <div className="space-y-6">
            {FUTURE_PROGRAMS.map((prog) => {
              const isRsvped = !!rsvpPrograms[prog.id];

              return (
                <div
                  key={prog.id}
                  className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-start justify-between gap-6 hover:shadow-md transition-all overflow-hidden"
                >
                  <div className="space-y-4 max-w-2xl flex-1">
                    {prog.imageUrl && (
                      <div className="w-full h-44 rounded-2xl overflow-hidden relative border border-slate-200 shadow-sm bg-gradient-to-br from-[#0B6B53] to-slate-900 mb-2">
                        <img 
                          src={prog.imageUrl} 
                          alt={prog.title}
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-extrabold uppercase bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-200">
                        {prog.category}
                      </span>
                      {prog.isExclusive && (
                        <span className="text-[10px] font-bold bg-emerald-100 text-[#0B6B53] px-2.5 py-0.5 rounded-full">
                          Inner Circle Priority
                        </span>
                      )}
                      <span className="text-[10px] text-slate-400 font-bold">
                        Instructor: {prog.instructor}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-heading font-extrabold text-xl text-slate-900 leading-snug">
                        {prog.title}
                      </h3>
                      <p className="text-xs font-semibold text-[#0B6B53] mt-0.5">
                        {prog.subtitle}
                      </p>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {prog.description}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#0B6B53]" />
                        <span className="font-semibold">{prog.date}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-amber-600" />
                        <span>{prog.time}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-indigo-600" />
                        <span>{prog.location}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-emerald-700" />
                        <span>{prog.capacity}</span>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">
                        Program Highlights:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {prog.highlights.map((hl, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                            <Check className="w-3.5 h-3.5 text-[#0B6B53] shrink-0" />
                            <span>{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* RSVP & Action Box */}
                  <div className="w-full md:w-56 shrink-0 bg-slate-50 p-5 rounded-2xl border border-slate-200 text-center space-y-3">
                    {isRsvped ? (
                      <div className="space-y-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-extrabold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300">
                          <CheckCircle2 className="w-4 h-4 text-[#0B6B53]" />
                          VIP Seat Reserved
                        </span>
                        <p className="text-[11px] text-slate-500">
                          Zoom link & calendar invitation added.
                        </p>
                        <button
                          onClick={() => toggleRsvp(prog.id, prog.title)}
                          className="w-full py-2 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-bold text-xs rounded-xl border border-slate-200 transition-colors"
                        >
                          Cancel Reservation
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase text-amber-700 block">
                          Limited Spots Remaining
                        </span>
                        <button
                          onClick={() => toggleRsvp(prog.id, prog.title)}
                          className="w-full py-3 bg-[#0B6B53] text-white font-bold text-xs rounded-xl hover:bg-[#134E4A] transition-all shadow-md flex items-center justify-center gap-1.5"
                        >
                          <Crown className="w-3.5 h-3.5 text-amber-300" />
                          <span>Reserve My VIP Spot</span>
                        </button>
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      )}

      {/* ====================================================================
         TAB 5: RESOURCE VAULT & DOWNLOADS
         ==================================================================== */}
      {activePortalTab === 'downloads' && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-2">
            <h2 className="font-heading font-extrabold text-2xl text-slate-900">
              Pro Member Resource Vault
            </h2>
            <p className="text-xs text-slate-500">
              Download official CBT workbooks, 528Hz audio soundscapes, and join our private MindForge 360°™ VIP community.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {MEMBER_RESOURCES.map((res) => (
              <div
                key={res.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-start gap-4 hover:shadow-md transition-all"
              >
                <div className="p-3 bg-emerald-50 text-[#0B6B53] rounded-2xl shrink-0">
                  {res.type === 'pdf' && <FileText className="w-6 h-6" />}
                  {res.type === 'audio' && <BookOpen className="w-6 h-6" />}
                  {res.type === 'wallpaper' && <Star className="w-6 h-6" />}
                  {res.type === 'community' && <MessageCircle className="w-6 h-6" />}
                </div>

                <div className="space-y-2 flex-1">
                  <div>
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase">
                      <span>{res.type}</span>
                      <span>{res.size}</span>
                    </div>
                    <h3 className="font-heading font-bold text-base text-slate-900">
                      {res.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {res.description}
                  </p>

                  <button
                    onClick={() => handleDownloadResourceFile(res)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0B6B53] hover:underline pt-1 text-left"
                  >
                    <span>{res.type === 'community' ? 'Join Community Now' : 'Download File'}</span>
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* ====================================================================
         ARTICLE READER MODAL
         ==================================================================== */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white max-w-3xl w-full max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scaleUp">
            
            <div className="relative h-64 overflow-hidden shrink-0 bg-gradient-to-br from-[#0B6B53] to-slate-950">
              <img 
                src={selectedArticle.imageUrl} 
                alt={selectedArticle.title} 
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-black/30" />
              
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/80 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                <span className="bg-[#0B6B53] text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {selectedArticle.category}
                </span>
                <h2 className="font-heading font-extrabold text-2xl text-white leading-tight">
                  {selectedArticle.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-slate-700 leading-relaxed text-sm">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-100 pb-3">
                <span>By {selectedArticle.author}</span>
                <span>{selectedArticle.date} • {selectedArticle.readTime}</span>
              </div>

              <div className="whitespace-pre-line font-inter">
                {selectedArticle.content}
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <img src={founderPhoto} alt={FOUNDER_INFO.name} referrerPolicy="no-referrer" className="w-10 h-10 rounded-full object-cover border border-[#D4AF37] shrink-0" />
                  <div>
                    <h4 className="font-bold text-emerald-950 text-xs">Author: Mainak Chatterjee</h4>
                    <p className="text-[11px] text-emerald-800">Founder of Path to Inner Peace & MindForge 360°™</p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedArticle(null);
                    setActiveView('ai-coach');
                  }}
                  className="px-3.5 py-2 bg-[#0B6B53] text-white font-bold text-xs rounded-xl"
                >
                  Ask Reflection Guide About This
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================================
         MAGAZINE READER MODAL
         ==================================================================== */}
      {selectedMagazine && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white max-w-4xl w-full max-h-[92vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col animate-scaleUp">
            
            {/* Top Modal Header */}
            <div className="p-5 bg-gradient-to-r from-slate-900 via-slate-950 to-emerald-950 text-white flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400/20 rounded-xl flex items-center justify-center text-amber-400 border border-amber-400/30">
                  <Book className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase bg-amber-400 text-slate-950 px-2 py-0.5 rounded-full">
                      {selectedMagazine.issueNumber}
                    </span>
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-white mt-0.5">
                    {selectedMagazine.title}
                  </h3>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedMagazine(null);
                  setMagTab('overview');
                }}
                className="p-2 bg-slate-800 text-slate-300 rounded-full hover:bg-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Reader Modal Navigation Tabs */}
            <div className="bg-slate-100 border-b border-slate-200 px-6 py-2 flex items-center gap-2 overflow-x-auto">
              <button
                onClick={() => setMagTab('overview')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  magTab === 'overview'
                    ? 'bg-[#0B6B53] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Overview & Editor's Note</span>
              </button>

              <button
                onClick={() => setMagTab('toc')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  magTab === 'toc'
                    ? 'bg-[#0B6B53] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Table of Contents (31 Pages)</span>
              </button>

              <button
                onClick={() => setMagTab('experts')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  magTab === 'experts'
                    ? 'bg-[#0B6B53] text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Ask The Experts & Columnists</span>
              </button>
            </div>

            {/* Reader Content Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700 leading-relaxed text-xs sm:text-sm">
              
              {/* TAB 1: OVERVIEW & EDITOR'S NOTE */}
              {magTab === 'overview' && (
                <div className="space-y-6 animate-fadeIn">
                  
                  {/* Cover & Hero Banner */}
                  <div className="flex flex-col md:flex-row items-center gap-6 bg-gradient-to-br from-emerald-900 via-slate-900 to-emerald-950 p-6 rounded-3xl text-white border border-emerald-800/40">
                    <img 
                      src={selectedMagazine.coverImageUrl} 
                      alt={selectedMagazine.title} 
                      referrerPolicy="no-referrer"
                      className="w-36 h-48 object-cover rounded-2xl shadow-2xl border border-amber-400/30 shrink-0"
                    />
                    <div className="space-y-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-400/30">
                        Official Path to Inner Peace Edition
                      </span>
                      <h3 className="font-heading font-extrabold text-xl sm:text-2xl text-white leading-tight">
                        {selectedMagazine.title}
                      </h3>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {selectedMagazine.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 pt-1">
                        {selectedMagazine.topics.map((tp, idx) => (
                          <span key={idx} className="text-[10px] bg-white/10 text-emerald-200 px-2.5 py-0.5 rounded-full border border-white/10">
                            {tp}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Editor's Note */}
                  <div className="p-6 bg-amber-50/80 border border-amber-200 rounded-3xl space-y-3 shadow-sm">
                    <div className="flex items-center gap-2">
                      <Quote className="w-5 h-5 text-amber-700 shrink-0" />
                      <h4 className="font-heading font-extrabold text-amber-950 text-sm">
                        From the Editor's Desk — Mainak Chatterjee (Founder)
                      </h4>
                    </div>
                    <p className="text-xs text-amber-950 leading-relaxed italic whitespace-pre-line font-inter">
                      "{selectedMagazine.editorsNote}"
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="space-y-3">
                    <h4 className="font-heading font-extrabold text-base text-slate-900">
                      In This Issue's Featured Edition:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedMagazine.highlights.map((hl, idx) => (
                        <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-2.5 text-xs font-semibold text-slate-800">
                          <CheckCircle2 className="w-4 h-4 text-[#0B6B53] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              )}

              {/* TAB 2: TABLE OF CONTENTS (31 PAGES) */}
              {magTab === 'toc' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <h4 className="font-bold text-emerald-950 text-xs">INNER HORIZON (Issue 01 — 31 Full Pages)</h4>
                      <p className="text-[11px] text-emerald-800">Complete roadmap of articles, CBT workbooks, and neuroscience chapters.</p>
                    </div>
                    <span className="text-xs font-bold text-[#0B6B53] bg-white px-3 py-1 rounded-full border border-emerald-300">
                      Issue 01
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      { page: 'Pg 04', title: 'About Path to Inner Peace', desc: 'Our mission, vision, values (Compassion, Integrity, Excellence) & impact (5000+ lives).' },
                      { page: 'Pg 05', title: 'The Science of Inner Peace', desc: 'Prefrontal Cortex vs Amygdala, Hippocampus memory, and Vagus Nerve relaxation responses.' },
                      { page: 'Pg 06', title: 'How the Mind Creates Stress', desc: 'The 5-stage stress cycle & biological impact on Heart, Lungs, Immunity & Digestion.' },
                      { page: 'Pg 07', title: 'CBT: Changing Thoughts, Changing Life', desc: 'Reframing 5 thinking traps (All-or-Nothing, Catastrophizing, Overgeneralization).' },
                      { page: 'Pg 08', title: 'The Neuroscience of Meditation', desc: 'Brain wave frequencies (Beta, Alpha, Theta, Delta) & grey matter expansion studies.' },
                      { page: 'Pg 09', title: 'The Power of Mindfulness', desc: 'Mindful vs Mindless living comparison & 5 simple daily mindfulness practices.' },
                      { page: 'Pg 10', title: 'Integrating Inner Peace into Daily Life', desc: '6 practical strategies & 21-Day Inner Peace Challenge overview.' },
                      { page: 'Pg 11', title: 'Feature: The Power of Self-Compassion', desc: 'Column by Moytree Bandyopadhyay (Student & Habit Practitioner) on 3 pillars of kindness.' },
                      { page: 'Pg 12', title: 'Feature: Emotional Healing', desc: 'Column by Tanutra Bhattacharjee (Spiritual Guru) on releasing unchosen emotional weight.' },
                      { page: 'Pg 14', title: 'Feature: Relationship Toolkit', desc: 'Column by Sourav Mukherjee (Relationship Expert) on 5 Pillars of healthy connection.' },
                      { page: 'Pg 15', title: 'Career Clarity Framework', desc: 'Passion vs Purpose matrix, Career Clarity Wheel, and decision-making roadmap.' },
                      { page: 'Pg 16', title: 'Managing Anxiety Naturally', desc: 'Anxiety Reset Framework & 5-4-3-2-1 Sensory Grounding Technique.' },
                      { page: 'Pg 17', title: 'Overthinking: When Mind Won’t Slow Down', desc: 'Deconstructing the overthinking cycle & question techniques.' },
                      { page: 'Pg 18', title: 'Sleep & Mental Health', desc: 'Sleep hygiene, 7-7-7 rule, and 4-7-8 bedtime breath practice.' },
                      { page: 'Pg 19', title: 'Emotional Intelligence (EQ)', desc: '5 Core components of EQ & daily reflection habits for self-regulation.' },
                      { page: 'Pg 21', title: 'Guided Meditation Script & Practice Guide', desc: 'Step-by-step 10-minute meditation protocol for daily calm.' },
                      { page: 'Pg 22', title: 'Spiritual Awakening', desc: 'Signs of awakening, Ego living vs Awakened living comparison.' },
                      { page: 'Pg 23', title: '7-Day Inner Peace Challenge', desc: 'Interactive daily tracker for Awareness, Gratitude, Breathwork & Let Go.' },
                      { page: 'Pg 24', title: 'Reflection Journal Worksheet', desc: 'Daily & deeper reflection prompts for self-awareness.' },
                      { page: 'Pg 25', title: 'Success Story: Ananya’s Transformation', desc: 'Real case study on overcoming chronic workplace anxiety in Kolkata.' },
                      { page: 'Pg 26', title: 'Book Recommendations', desc: 'Reviews of The Power of Now, Atomic Habits, Untethered Soul & Man’s Search for Meaning.' },
                      { page: 'Pg 27', title: 'Inspirational Words That Elevate', desc: 'Timeless quotes from Buddha, Ram Dass, Eckhart Tolle & Rumi.' },
                      { page: 'Pg 28', title: 'Ask The Experts Q&A Panel', desc: 'Expert columnists: Juneli Das, Nandini Bhattacharjee & Tarun Goswami.' },
                      { page: 'Pg 29', title: 'Upcoming Programs & Community', desc: '21-Day Brain Rewire Challenge, Meditation Camp & Behala Food Drive.' }
                    ].map((item, idx) => (
                      <div key={idx} className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-start gap-3 hover:bg-emerald-50/50 hover:border-emerald-200 transition-all">
                        <span className="text-[10px] font-extrabold bg-[#0B6B53] text-white px-2.5 py-1 rounded-lg shrink-0">
                          {item.page}
                        </span>
                        <div className="space-y-0.5">
                          <h5 className="font-heading font-bold text-xs text-slate-900">{item.title}</h5>
                          <p className="text-[11px] text-slate-600 leading-snug">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: EXPERTS & COLUMNISTS */}
              {magTab === 'experts' && (
                <div className="space-y-6 animate-fadeIn">
                  <div className="text-center space-y-1 max-w-xl mx-auto">
                    <h4 className="font-heading font-extrabold text-lg text-slate-900">
                      Expert Advisory Panel & Feature Columnists
                    </h4>
                    <p className="text-xs text-slate-600">
                      Leading wisdom practitioners, coaches, and authors featured in INNER HORIZON (Issue 01).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-2">
                      <div className="w-14 h-14 bg-emerald-100 text-[#0B6B53] font-extrabold text-xl rounded-full flex items-center justify-center mx-auto border-2 border-emerald-300">
                        JD
                      </div>
                      <h5 className="font-heading font-bold text-sm text-slate-900">Juneli Das</h5>
                      <p className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                        International Wellness Coach
                      </p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Specializes in holistic well-being, stress management, and creating purpose-driven daily routines.
                      </p>
                    </div>

                    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-2">
                      <div className="w-14 h-14 bg-amber-100 text-amber-900 font-extrabold text-xl rounded-full flex items-center justify-center mx-auto border-2 border-amber-300">
                        NB
                      </div>
                      <h5 className="font-heading font-bold text-sm text-slate-900">Nandini Bhattacharjee</h5>
                      <p className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                        Relationship Expert & AbMF President
                      </p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Expert in relationship dynamics, emotional healing, and building authentic, lasting bonds.
                      </p>
                    </div>

                    <div className="p-5 bg-white border border-slate-200 rounded-2xl shadow-sm text-center space-y-2">
                      <div className="w-14 h-14 bg-slate-900 text-amber-400 font-extrabold text-xl rounded-full flex items-center justify-center mx-auto border-2 border-amber-400/40">
                        TG
                      </div>
                      <h5 className="font-heading font-bold text-sm text-slate-900">Tarun Goswami</h5>
                      <p className="text-[10px] font-extrabold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                        Spiritual Expert & Author
                      </p>
                      <p className="text-[11px] text-slate-600 leading-relaxed">
                        Guides individuals on the path of spiritual awakening, meditation, and inner transformation.
                      </p>
                    </div>
                  </div>

                  {/* Feature Writers */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-3">
                    <h5 className="font-heading font-bold text-xs text-slate-900 uppercase tracking-wider">
                      Featured Guest Writers & Practitioners
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="p-3 bg-white rounded-xl border border-slate-200">
                        <h6 className="font-bold text-xs text-slate-900">Moytree Bandyopadhyay</h6>
                        <p className="text-[10px] text-slate-500">Student, Content Creator & Habit Practitioner</p>
                        <span className="text-[10px] font-bold text-[#0B6B53] block mt-1">Article: The Power of Self-Compassion</span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200">
                        <h6 className="font-bold text-xs text-slate-900">Tanutra Bhattacharjee</h6>
                        <p className="text-[10px] text-slate-500">Engineer, Teacher & Spiritual Guru</p>
                        <span className="text-[10px] font-bold text-[#0B6B53] block mt-1">Article: Emotional Healing</span>
                      </div>

                      <div className="p-3 bg-white rounded-xl border border-slate-200">
                        <h6 className="font-bold text-xs text-slate-900">Sourav Mukherjee</h6>
                        <p className="text-[10px] text-slate-500">Accountant & Relationship Practitioner</p>
                        <span className="text-[10px] font-bold text-[#0B6B53] block mt-1">Article: Relationship Toolkit</span>
                      </div>
                    </div>
                  </div>

                </div>
              )}

            </div>

            {/* Modal Bottom Footer Action Bar */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
              <span className="text-xs text-slate-500 font-semibold">
                ✓ Full 31-Page Edition Included for Pro Members
              </span>

              <button
                onClick={() => handleDownloadMagazineFile(selectedMagazine)}
                className="w-full sm:w-auto px-6 py-3 bg-[#0B6B53] text-white font-bold text-xs rounded-xl hover:bg-[#134E4A] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <Download className="w-4 h-4 text-amber-300" />
                <span>Download Printable Issue PDF (31 Pages)</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* ====================================================================
         LOG OUT CONFIRMATION MODAL
         ==================================================================== */}
      {isLogoutConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white max-w-md w-full rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 border border-slate-200 animate-scaleUp">
            <div className="w-14 h-14 bg-rose-100 text-rose-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <LogOut className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <h3 className="font-heading font-extrabold text-2xl text-slate-900">
                Log Out of Account?
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Are you sure you want to log out of <span className="font-bold text-slate-900">{user.name}</span>? Your completed days, streaks, and journal entries are securely stored on this device.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={() => setIsLogoutConfirmOpen(false)}
                className="w-full py-3 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-200 transition-all border border-slate-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handlePerformLogout}
                className="w-full py-3 bg-rose-600 text-white font-bold text-xs rounded-xl hover:bg-rose-700 transition-all shadow-md flex items-center justify-center gap-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Yes, Log Out</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ====================================================================
         ACTION TOAST NOTIFICATION
         ==================================================================== */}
      {actionToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center gap-3 animate-slideUp">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{actionToast}</span>
          <button
            onClick={() => setActionToast(null)}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors ml-2"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

    </div>
  );
};
