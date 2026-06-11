import React, { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { Sparkles, Loader2 } from 'lucide-react';

export const AiAssistantPanel = () => {
  const { resumeData } = useResumeStore();
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', content: string}[]>([
    { role: 'assistant', content: "Hi! I'm your AI Resume Assistant. I can help rewrite your summary, improve your project descriptions, or optimize your resume for ATS. What would you like to work on?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    // Build the system context with the user's actual resume data
    const systemPrompt = `
      You are an expert resume writer and ATS optimization specialist. 
      You are chatting with the user to help them build their resume.
      Provide concise, professional responses. If they ask to generate or rewrite content, provide the exact text they can copy-paste.
      
      User's Current Resume Profile:
      Name: ${resumeData.personalInfo.name}
      Role: ${resumeData.personalInfo.title}
      Skills: ${resumeData.skills.languages}, ${resumeData.skills.frameworks}, ${resumeData.skills.tools}
      Projects: ${resumeData.projects.map(p => p.name).join(', ')}
      Experience: ${resumeData.experience.map(e => e.role + ' at ' + e.company).join(', ')}
      
      User request: ${userMsg}
    `;

    try {
      // Ensure you have VITE_GROQ_API_KEY set in your frontend/.env file
      const apiKey = import.meta.env.VITE_GROQ_API_KEY || '';
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: 'llama-3.1-8b-instant',
          messages: [
            { role: 'system', content: systemPrompt }
          ]
        })
      });

      const data = await response.json();
      
      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `API Error: ${data.error.message}` }]);
      } else if (data.choices && data.choices.length > 0) {
        const text = data.choices[0].message.content;
        setMessages(prev => [...prev, { role: 'assistant', content: text }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Received an empty response from AI.' }]);
      }
    } catch (error: any) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: `Connection Failed: Please ensure you aren't being blocked by CORS or network issues. Error: ${error.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-[350px] border-l border-gray-200 bg-white flex flex-col h-full font-sans shadow-sm z-10">
      <div className="p-5 pb-4 border-b border-gray-100 flex-shrink-0">
        <h2 className="text-xl font-bold text-gray-800 flex items-center">
          <Sparkles className="w-5 h-5 mr-2 text-emerald-600" /> AI Assistant
        </h2>
        <p className="text-xs text-gray-500 mt-1.5">Chat with our AI to optimize your resume content.</p>
      </div>
      
      {/* Chat Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-gray-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className={`text-[10px] font-semibold mb-1 uppercase tracking-wider ${msg.role === 'user' ? 'text-emerald-600 mr-1' : 'text-gray-500 ml-1'}`}>
              {msg.role === 'user' ? 'You' : 'AI Assistant'}
            </span>
            <div className={`p-3 rounded-xl text-[13px] whitespace-pre-wrap max-w-[90%] shadow-sm ${
              msg.role === 'user' 
                ? 'bg-emerald-600 text-white rounded-br-sm' 
                : 'bg-white text-gray-800 rounded-bl-sm border border-gray-200'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex flex-col items-start">
            <span className="text-[10px] font-semibold mb-1 uppercase tracking-wider text-gray-500 ml-1">AI Assistant</span>
            <div className="p-3 rounded-xl bg-white text-gray-500 rounded-bl-sm border border-gray-200 flex items-center text-[13px] shadow-sm">
              <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Thinking...
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
        <div className="flex gap-2">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Ask AI to improve..."
            className="flex-1 resize-none h-[42px] min-h-[42px] max-h-[120px] rounded-lg border border-gray-300 px-3 py-2.5 text-[13px] focus:ring-emerald-500 focus:border-emerald-500 shadow-sm"
            rows={1}
          />
          <button 
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 flex items-center justify-center transition-colors disabled:opacity-50 h-[42px] shadow-sm font-medium text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
