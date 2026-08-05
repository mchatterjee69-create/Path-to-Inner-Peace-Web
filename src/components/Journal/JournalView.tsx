import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { JournalEntry } from '../../types';
import { BookOpen, Calendar, Heart, Sun, CheckCircle2 } from 'lucide-react';

export const JournalView: React.FC = () => {
  const { journalEntries, saveJournalEntry, user, addMoodLog, triggerConfetti } = useApp();

  const [feeling, setFeeling] = useState('😁 Peaceful');
  const [stressed, setStressed] = useState('');
  const [grateful, setGrateful] = useState('');
  const [learned, setLearned] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const todayNum = user.currentDay;

    saveJournalEntry({
      id: Date.now().toString(),
      dayNumber: todayNum,
      date: new Date().toISOString().split('T')[0],
      responses: {
        'stressed': stressed,
        'grateful': grateful,
        'learned': learned
      },
      feelingToday: feeling,
      gratitude: grateful,
      learnings: learned
    });

    setSaved(true);
    triggerConfetti();
    setTimeout(() => setSaved(false), 3000);
  };

  const savedList: JournalEntry[] = Object.values(journalEntries);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fadeIn pb-24">
      
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0B6B53] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
          DAILY COGNITIVE REFLECTION
        </span>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Mental Reset Journal
        </h1>
        <p className="text-slate-600 text-sm">
          Express your feelings, reframe stressors, and cultivate daily gratitude.
        </p>
      </div>

      {/* New Entry Form */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
          <BookOpen className="w-6 h-6 text-[#0B6B53]" />
          <h2 className="font-heading font-bold text-xl text-slate-900">
            Write Today's Reflection
          </h2>
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              1. How do you feel today?
            </label>
            <div className="flex flex-wrap gap-2">
              {['😁 Energetic', '😌 Peaceful', '😐 Neutral', '😔 Anxious', '😢 Exhausted'].map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setFeeling(m)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                    feeling === m 
                      ? 'bg-[#0B6B53] text-white shadow-sm' 
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              2. What stressed you today?
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. Work deadline pressure or unhelpful thought loop..."
              value={stressed}
              onChange={(e) => setStressed(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              3. What are you grateful for today?
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. A warm morning cup of tea, family support, or peaceful breathing..."
              value={grateful}
              onChange={(e) => setGrateful(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:bg-white transition-all"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              4. What did you learn today?
            </label>
            <textarea
              rows={2}
              required
              placeholder="e.g. I am not my thoughts; I can choose calm breath anytime..."
              value={learned}
              onChange={(e) => setLearned(e.target.value)}
              className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:bg-white transition-all"
            />
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 bg-[#0B6B53] hover:bg-[#134E4A] text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
            <span>{saved ? 'Entry Saved! (+50 XP Earned)' : 'Save Journal Entry'}</span>
          </button>

        </form>
      </div>

      {/* History Log */}
      <div className="space-y-4">
        <h3 className="font-heading font-bold text-xl text-slate-900">
          Past Reflection Entries ({savedList.length})
        </h3>

        {savedList.length === 0 ? (
          <div className="bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-500 text-sm">
            No journal entries saved yet. Fill out the form above to record your first reflection!
          </div>
        ) : (
          savedList.map((entry) => (
            <div key={entry.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-3">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                <span className="text-xs font-bold text-[#0B6B53]">
                  Day {entry.dayNumber} Entry • {entry.date}
                </span>
                <span className="text-xs bg-emerald-50 text-emerald-800 px-2.5 py-0.5 rounded-full font-semibold">
                  Mood: {entry.feelingToday}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-700">
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Gratitude:</span>
                  <p className="bg-slate-50 p-2.5 rounded-xl">{entry.gratitude || 'None logged'}</p>
                </div>
                <div>
                  <span className="font-bold text-slate-900 block mb-0.5">Learnings:</span>
                  <p className="bg-slate-50 p-2.5 rounded-xl">{entry.learnings || 'None logged'}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
