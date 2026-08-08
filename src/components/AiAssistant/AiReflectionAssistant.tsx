import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Compass, Send, User, Lightbulb, HeartHandshake, RotateCcw } from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  affirmation?: string;
  timestamp: string;
}

export const AiReflectionAssistant: React.FC = () => {
  const { user } = useApp();

  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome_1',
      sender: 'ai',
      text: `Namaste ${user.name}! I am your Mind Mastery & Stress Reset Coach, trained on practical CBT psychology, vagus nerve regulation, and mindfulness methods. How can I help quiet your mind or guide your reflection today?`,
      affirmation: "I am safe, peaceful, and open to inner clarity.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleClearChat = () => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: `Chat reset. Namaste ${user.name}! What question or reflection is on your mind right now?`,
        affirmation: "Every moment is a fresh beginning.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const sendQuery = async (queryText: string) => {
    if (!queryText.trim() || loading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: queryText.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInputPrompt('');
    setLoading(true);

    const historyPayload = updatedMessages
      .filter(m => m.id !== 'welcome_1')
      .slice(-8)
      .map(m => ({
        sender: m.sender,
        text: m.text
      }));

    try {
      const res = await fetch('/api/ai-reflection', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: queryText.trim(),
          history: historyPayload,
          currentDay: user.currentDay,
          mood: 'Calm'
        })
      });

      const data = await res.json();

      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'ai',
        text: data.response || "Breathe deeply. Allow every thought to pass without resistance.",
        affirmation: data.suggestedAffirmation,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error("AI Reflection chat error:", err);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: "Take 3 deep breaths. Every thought is temporary. What is one small step you can take right now to cultivate peace?",
          affirmation: "I am grounded and calm.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputPrompt.trim()) {
      await sendQuery(inputPrompt);
    }
  };

  const samplePrompts = [
    "I'm feeling overwhelmed by work stress today.",
    "How can I break out of negative overthinking loops?",
    "Give me a 2-minute CBT re-frame for anxiety.",
    "What meditation breath pattern helps before sleep?"
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6 animate-fadeIn pb-24">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-[#0B6B53] font-bold text-xs rounded-full border border-emerald-100">
          <Compass className="w-4 h-4 text-[#0B6B53]" />
          <span>24/7 MIND MASTERY ASSISTANT</span>
        </div>
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
          Inner Peace Reflection Guide
        </h1>
        <p className="text-slate-600 text-sm">
          Get real-time CBT re-framing, reflection guidance, and custom affirmations for your mind.
        </p>
      </div>

      {/* Main Chat Box */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden flex flex-col h-[600px]">
        
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#0B6B53] to-[#134E4A] p-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center text-[#D4AF37]">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-sm text-white flex items-center gap-2">
                <span>Mind Mastery & Stress Reset Coach</span>
              </h3>
              <span className="text-[10px] text-emerald-200 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Reflection Guide Active & Ready
              </span>
            </div>
          </div>

          <button
            onClick={handleClearChat}
            title="Reset Conversation"
            className="p-2 text-emerald-200 hover:text-white hover:bg-white/10 rounded-xl transition-all flex items-center gap-1 text-xs"
          >
            <RotateCcw className="w-4 h-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Message Log */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-slate-50/50">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-[85%] ${
                msg.sender === 'user' ? 'ml-auto flex-row-reverse' : 'mr-auto'
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  msg.sender === 'user'
                    ? 'bg-slate-900 text-white'
                    : 'bg-[#0B6B53] text-[#D4AF37]'
                }`}
              >
                {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Compass className="w-4 h-4" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm space-y-2 shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-[#0B6B53] text-white rounded-tr-none'
                    : 'bg-white text-slate-800 border border-slate-200 rounded-tl-none'
                }`}
              >
                <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

                {msg.affirmation && (
                  <div className="p-3 bg-amber-50 border-l-2 border-[#D4AF37] text-slate-900 text-xs rounded-r-xl font-medium">
                    <span className="text-[#0B6B53] font-bold block mb-0.5">✨ Daily Affirmation:</span>
                    "{msg.affirmation}"
                  </div>
                )}

                <span className={`text-[10px] block text-right ${msg.sender === 'user' ? 'text-emerald-200' : 'text-slate-400'}`}>
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 mr-auto max-w-[80%]">
              <div className="w-8 h-8 rounded-full bg-[#0B6B53] text-[#D4AF37] flex items-center justify-center">
                <Compass className="w-4 h-4 animate-spin" />
              </div>
              <div className="bg-white p-4 rounded-2xl border border-slate-200 text-xs text-slate-500 italic flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Reflection Guide is crafting your personalized CBT reflection...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Quick Prompts */}
        <div className="p-3 bg-white border-t border-slate-100 flex items-center gap-2 overflow-x-auto">
          <Lightbulb className="w-4 h-4 text-[#D4AF37] shrink-0" />
          {samplePrompts.map((sp, idx) => (
            <button
              key={idx}
              type="button"
              disabled={loading}
              onClick={() => sendQuery(sp)}
              className="px-3 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-[#0B6B53] text-[11px] font-medium text-slate-600 rounded-full whitespace-nowrap transition-colors disabled:opacity-50"
            >
              {sp}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-4 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            placeholder="Ask Reflection Guide about your overthinking or feelings..."
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0B6B53] focus:bg-white transition-all"
          />
          <button
            type="submit"
            disabled={loading || !inputPrompt.trim()}
            className="px-5 py-3 bg-[#0B6B53] hover:bg-[#134E4A] disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all flex items-center gap-1.5"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>

      </div>

    </div>
  );
};
