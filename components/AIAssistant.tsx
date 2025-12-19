
import React, { useState } from 'react';
import { askExpert } from '../services/geminiService';

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [chat, setChat] = useState<{role: 'user' | 'bot', text: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!question.trim()) return;
    const userMsg = question;
    setQuestion('');
    setChat(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);
    
    const response = await askExpert(userMsg);
    setChat(prev => [...prev, { role: 'bot', text: response || '' }]);
    setLoading(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-32 right-6 z-50 bg-white text-blue-500 border border-slate-200 w-14 h-14 rounded-2xl shadow-xl hover:scale-105 transition-all active:scale-95 flex items-center justify-center"
      >
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-dots'} text-2xl`}></i>
      </button>

      {isOpen && (
        <div className="fixed bottom-52 right-6 z-50 w-80 md:w-96 bg-white border border-slate-200 rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[60vh] animate-in slide-in-from-bottom-5 duration-300">
          <div className="bg-blue-500 p-5 flex items-center justify-between border-b border-blue-400">
            <h3 className="text-white font-black text-sm flex items-center gap-3">
              <i className="fas fa-user-md text-lg"></i> CONSULTA ESPECIALIZADA
            </h3>
            <span className="text-[9px] font-black bg-white/20 text-white px-2 py-1 rounded-lg uppercase tracking-wider">Activo</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-slate-50/50">
            {chat.length === 0 && (
              <div className="bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                <p className="text-slate-500 text-sm font-medium leading-relaxed italic">
                  Bienvenido al centro de apoyo diagnóstico. ¿Desea profundizar en algún aspecto patogénico o clínico del sarampión?
                </p>
              </div>
            )}
            {chat.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-medium leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                  ? 'bg-blue-500 text-white rounded-tr-none' 
                  : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-2xl rounded-tl-none flex gap-1.5 shadow-sm border border-slate-100">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100 flex gap-2">
            <input 
              type="text" 
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Escriba su consulta técnica..."
              className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2 text-slate-800 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-slate-400"
            />
            <button 
              onClick={handleSend}
              disabled={loading}
              className="bg-blue-500 text-white w-10 h-10 rounded-xl hover:bg-blue-600 flex items-center justify-center transition disabled:opacity-50 shadow-md shadow-blue-100"
            >
              <i className="fas fa-paper-plane text-sm"></i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
