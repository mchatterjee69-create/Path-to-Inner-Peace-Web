import React, { useState, useEffect } from 'react';
import { X, Download, Mail, RefreshCw, Database, Search, CheckCircle2, UserCheck, Calendar } from 'lucide-react';

interface RegistrationRecord {
  id: string;
  formType: string;
  fullName: string;
  email: string;
  mobile: string;
  details: Record<string, any>;
  receivedAt: string;
}

interface AdminLeadsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLeadsModal: React.FC<AdminLeadsModalProps> = ({ isOpen, onClose }) => {
  const [registrations, setRegistrations] = useState<RegistrationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFormType, setSelectedFormType] = useState<string>('ALL');
  const [dispatchStatus, setDispatchStatus] = useState<string>('');

  const targetEmail = "mchatterjee69@gmail.com";

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/all-registrations');
      const data = await res.json();
      if (data && Array.isArray(data.registrations)) {
        setRegistrations(data.registrations);
      }
    } catch (err) {
      console.error('Failed to fetch admin leads:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchLeads();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredRegistrations = registrations.filter(r => {
    const matchesSearch = 
      (r.fullName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.mobile || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (r.formType || '').toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = selectedFormType === 'ALL' || r.formType === selectedFormType;

    return matchesSearch && matchesType;
  });

  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    const headers = ['Record ID', 'Form Type', 'Full Name', 'Email', 'Mobile', 'Submission Time', 'Details'];
    const rows = registrations.map(r => [
      `"${r.id || ''}"`,
      `"${(r.formType || '').replace(/"/g, '""')}"`,
      `"${(r.fullName || '').replace(/"/g, '""')}"`,
      `"${(r.email || '').replace(/"/g, '""')}"`,
      `"${(r.mobile || '').replace(/"/g, '""')}"`,
      `"${r.receivedAt || ''}"`,
      `"${JSON.stringify(r.details || {}).replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Path_To_Inner_Peace_User_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSendMailDraft = () => {
    const subject = encodeURIComponent(`Path to Inner Peace User Data Lead Report (${registrations.length} Records)`);
    const bodyText = registrations.map((r, i) => 
      `${i + 1}. [${r.formType}] ${r.fullName} | Email: ${r.email} | Mobile: ${r.mobile} | Date: ${r.receivedAt}`
    ).join('\n\n');

    const mailtoUrl = `mailto:${targetEmail}?subject=${subject}&body=${encodeURIComponent(bodyText)}`;
    window.open(mailtoUrl, '_blank');
  };

  const handleTriggerFormSubmitBatch = async () => {
    setDispatchStatus('Dispatching batch to mchatterjee69@gmail.com...');
    try {
      const currentOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://ais-pre-shboembemwee4psokiddmd-22738377368.asia-southeast1.run.app';
      
      await fetch(`https://formsubmit.co/ajax/${targetEmail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Origin': currentOrigin,
          'Referer': `${currentOrigin}/`
        },
        body: JSON.stringify({
          _subject: `[Admin Sync] All Captured User Data Leads (${registrations.length} records)`,
          _captcha: 'false',
          _template: 'table',
          _replyto: targetEmail,
          totalRecords: registrations.length,
          lastSyncTime: new Date().toISOString(),
          leadSummary: registrations.map(r => `${r.formType}: ${r.fullName} (${r.email}, ${r.mobile})`).join(' | ')
        })
      });

      setDispatchStatus(`✅ Successfully pushed ${registrations.length} leads to ${targetEmail}!`);
    } catch (err: any) {
      setDispatchStatus('⚠️ Dispatch note: Check email inbox for FormSubmit activation link if first time.');
    } finally {
      setTimeout(() => setDispatchStatus(''), 5000);
    }
  };

  const formTypes = Array.from(new Set(registrations.map(r => r.formType)));

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-md p-3 sm:p-5 flex items-center justify-center min-h-full">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-emerald-900/15 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0B6B53] to-[#134E4A] p-4 sm:p-6 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <Database className="w-5 h-5 text-amber-300" />
              <h2 className="text-lg sm:text-xl font-bold tracking-tight text-white">
                Admin Leads & User Data Management
              </h2>
            </div>
            <p className="text-xs text-emerald-100 mt-1">
              Recipient: <span className="font-mono font-bold text-amber-300">{targetEmail}</span> • Total Received: <span className="font-bold text-white">{registrations.length}</span>
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          
          {/* Search & Filter */}
          <div className="flex flex-1 items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by name, email, mobile..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
              />
            </div>

            {formTypes.length > 0 && (
              <select
                value={selectedFormType}
                onChange={(e) => setSelectedFormType(e.target.value)}
                className="px-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53]"
              >
                <option value="ALL">All Types ({registrations.length})</option>
                {formTypes.map(t => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={fetchLeads}
              disabled={loading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-all"
              title="Refresh Data"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>

            <button
              onClick={handleExportCSV}
              disabled={registrations.length === 0}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#0B6B53] hover:bg-[#084e3d] text-white text-xs font-bold rounded-xl shadow-sm transition-all disabled:opacity-50"
            >
              <Download className="w-3.5 h-3.5 text-amber-300" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleSendMailDraft}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#1e293b] hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition-all"
            >
              <Mail className="w-3.5 h-3.5 text-amber-300" />
              <span>Draft Email</span>
            </button>
          </div>

        </div>

        {dispatchStatus && (
          <div className="bg-emerald-50 border-b border-emerald-200 text-emerald-800 px-4 py-2 text-xs font-semibold flex items-center justify-between">
            <span>{dispatchStatus}</span>
            <button onClick={() => setDispatchStatus('')} className="text-emerald-900 font-bold hover:underline">Dismiss</button>
          </div>
        )}

        {/* Data Table */}
        <div className="p-4 overflow-y-auto flex-1">
          {filteredRegistrations.length === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                <Database className="w-6 h-6" />
              </div>
              <p className="text-sm font-semibold text-slate-600">
                {searchTerm || selectedFormType !== 'ALL' ? 'No user records matching your search.' : 'No user form submissions recorded yet.'}
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                Submissions from the 5-Day Mind Reset Challenge, Career Axis 1:1 Sessions, and Inquiries will automatically appear here and be dispatched to {targetEmail}.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto border border-slate-200 rounded-xl">
              <table className="w-full text-left text-xs sm:text-sm border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider text-[11px]">
                    <th className="p-3">Ref / ID</th>
                    <th className="p-3">Form Type</th>
                    <th className="p-3">Full Name</th>
                    <th className="p-3">Contact Email</th>
                    <th className="p-3">Mobile</th>
                    <th className="p-3">Received At</th>
                    <th className="p-3">Additional Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredRegistrations.map((r, idx) => (
                    <tr key={r.id || idx} className="hover:bg-emerald-50/50 transition-colors">
                      <td className="p-3 font-mono font-bold text-[#0B6B53] whitespace-nowrap">
                        {r.id || `REG-${idx + 1}`}
                      </td>
                      <td className="p-3 whitespace-nowrap">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-100 text-[#0B6B53]">
                          {r.formType}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-slate-900 whitespace-nowrap">
                        {r.fullName || 'N/A'}
                      </td>
                      <td className="p-3 font-medium text-slate-700 whitespace-nowrap">
                        <a href={`mailto:${r.email}`} className="text-sky-600 hover:underline">
                          {r.email || 'N/A'}
                        </a>
                      </td>
                      <td className="p-3 font-medium text-slate-700 whitespace-nowrap">
                        {r.mobile ? (
                          <a href={`https://wa.me/${r.mobile.replace(/[^0-9]/g, '')}`} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline">
                            {r.mobile}
                          </a>
                        ) : 'N/A'}
                      </td>
                      <td className="p-3 text-slate-500 text-xs whitespace-nowrap">
                        {new Date(r.receivedAt).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' })}
                      </td>
                      <td className="p-3 text-xs text-slate-600 max-w-xs truncate">
                        {r.details ? Object.entries(r.details).map(([k, v]) => `${k}: ${v}`).join(' | ') : 'None'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-100 border-t border-slate-200 text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          <div className="flex items-center gap-1.5 text-emerald-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-[#0B6B53]" />
            <span>Form dispatch active for <strong className="text-slate-900">{targetEmail}</strong></span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerFormSubmitBatch}
              className="px-3 py-1.5 bg-[#0B6B53] hover:bg-[#084e3d] text-white font-bold rounded-lg text-xs transition-colors"
            >
              Push Batch Email
            </button>
            <button
              onClick={onClose}
              className="px-3 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg text-xs transition-colors"
            >
              Close Portal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
