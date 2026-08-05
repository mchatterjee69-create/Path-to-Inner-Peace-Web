import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Users, 
  TrendingUp, 
  Award, 
  MessageSquare, 
  Mail, 
  ShieldCheck, 
  DollarSign, 
  Send,
  CheckCircle2,
  BarChart3
} from 'lucide-react';

export const AdminPanelModal: React.FC = () => {
  const { isAdminModalOpen, setIsAdminModalOpen, user } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'broadcast' | 'users'>('overview');
  const [broadcastText, setBroadcastText] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  if (!isAdminModalOpen) return null;

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    setBroadcastSent(true);
    setTimeout(() => {
      setBroadcastSent(false);
      setBroadcastText('');
    }, 2500);
  };

  const dummyUsers = [
    { id: '1', name: 'Ananya Sharma', phone: '+91 98765 43210', day: 5, status: 'Completed', plan: 'Mind Mastery Pro' },
    { id: '2', name: 'Rajesh Verma', phone: '+91 98123 45678', day: 3, status: 'In Progress', plan: 'Free Challenge' },
    { id: '3', name: 'Priya Mukherjee', phone: '+91 97654 32109', day: 5, status: 'Completed', plan: 'Inner Transformation Elite' },
    { id: '4', name: user.name || 'Current User', phone: user.whatsapp || '+91 99999 88888', day: user.currentDay, status: 'Active Today', plan: user.plan }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 my-8">
        
        {/* Admin Header */}
        <div className="bg-[#064E3B] p-6 text-white flex items-center justify-between border-b border-emerald-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#0B6B53] text-[#D4AF37] flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-heading font-extrabold text-xl text-white">
                Path to Inner Peace – Admin Control Panel
              </h2>
              <p className="text-xs text-slate-400">
                Founder Portal for Mainak Chatterjee
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="p-2 text-slate-400 hover:text-white rounded-full"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Admin Tabs */}
        <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 flex items-center gap-2">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'overview' ? 'bg-[#0B6B53] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            Dashboard Analytics
          </button>
          <button
            onClick={() => setActiveTab('broadcast')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'broadcast' ? 'bg-[#0B6B53] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            WhatsApp & Email Broadcast
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'users' ? 'bg-[#0B6B53] text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            User Database ({dummyUsers.length})
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6">
          
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center">
                  <span className="text-[11px] font-bold uppercase text-emerald-800">Total Users</span>
                  <span className="font-heading font-extrabold text-2xl text-slate-900 block mt-1">1,048</span>
                </div>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-center">
                  <span className="text-[11px] font-bold uppercase text-amber-800">Challenge Completion</span>
                  <span className="font-heading font-extrabold text-2xl text-slate-900 block mt-1">682</span>
                </div>
                <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-200 text-center">
                  <span className="text-[11px] font-bold uppercase text-indigo-800">Total Revenue (₹)</span>
                  <span className="font-heading font-extrabold text-2xl text-slate-900 block mt-1">₹1,84,500</span>
                </div>
                <div className="p-4 bg-teal-50 rounded-2xl border border-teal-200 text-center">
                  <span className="text-[11px] font-bold uppercase text-teal-800">WhatsApp Sent</span>
                  <span className="font-heading font-extrabold text-2xl text-slate-900 block mt-1">5,240</span>
                </div>
              </div>

              {/* Revenue & Growth Summary */}
              <div className="p-6 bg-slate-900 text-white rounded-2xl space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#D4AF37]">Monthly Conversion Rate</span>
                  <span className="text-xs text-emerald-400 font-bold">+18.4% Growth</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The 5-Day Free Challenge funnel is currently converting 24.2% of free attendees into paid MindForge 360°™ memberships.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'broadcast' && (
            <form onSubmit={handleSendBroadcast} className="space-y-4">
              <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-xs text-amber-900">
                📲 Send instant automated reminders to all 1,048 registered WhatsApp users!
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Broadcast Message</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Namaste Seekers! Day 2 Stress Reset is now active in your dashboard. Click to join..."
                  value={broadcastText}
                  onChange={(e) => setBroadcastText(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-sm"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-3 bg-[#0B6B53] text-white font-bold text-xs rounded-xl flex items-center gap-2 hover:bg-[#134E4A]"
              >
                <Send className="w-4 h-4" />
                <span>{broadcastSent ? 'Broadcast Dispatched to 1,048 Users!' : 'Send WhatsApp Broadcast'}</span>
              </button>
            </form>
          )}

          {activeTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">User</th>
                    <th className="p-3">Phone</th>
                    <th className="p-3">Day</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Plan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {dummyUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50">
                      <td className="p-3 font-bold text-slate-900">{u.name}</td>
                      <td className="p-3">{u.phone}</td>
                      <td className="p-3 font-semibold text-[#0B6B53]">Day {u.day}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 font-semibold">{u.plan}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
