
import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../constants';

const Quiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [feedback, setFeedback] = useState<{msg: string, correct: boolean} | null>(null);

  const handleAnswer = (idx: number) => {
    const q = QUIZ_QUESTIONS[currentIdx];
    const isCorrect = idx === q.c;
    if (isCorrect) setScore(s => s + 1);
    setFeedback({ msg: q.e, correct: isCorrect });
  };

  const next = () => {
    setFeedback(null);
    if (currentIdx + 1 < QUIZ_QUESTIONS.length) setCurrentIdx(i => i + 1);
    else setShowResult(true);
  };

  if (showResult) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 bg-emerald-950/20 overflow-y-auto">
        <div className="p-6 bg-white/10 rounded-full border-4 border-yellow-400 mb-4 shadow-2xl">
          <i className="fas fa-crown text-4xl text-yellow-400"></i>
        </div>
        <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Misión Completada</h3>
        <p className="text-emerald-400 font-black text-base mt-2 uppercase tracking-widest">Aciertos: {score}/{QUIZ_QUESTIONS.length}</p>
        <button 
          onClick={() => { setCurrentIdx(0); setScore(0); setShowResult(false); }} 
          className="mt-6 bg-yellow-500 text-emerald-950 px-10 py-3 rounded-full font-black uppercase hover:bg-yellow-400 transition transform hover:scale-105 shadow-xl"
        >
          Reintentar Evaluación
        </button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[currentIdx];

  return (
    <div className="h-full flex flex-col p-6 max-w-6xl mx-auto w-full overflow-y-auto custom-scrollbar">
      {!feedback ? (
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-4">
            <span className="bg-yellow-400 text-emerald-950 px-3 py-1 rounded-lg font-black text-[10px] uppercase shrink-0">Pregunta {currentIdx + 1}</span>
            <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 transition-all duration-500 shadow-[0_0_10px_#facc15]" style={{ width: `${((currentIdx+1)/QUIZ_QUESTIONS.length)*100}%` }}></div>
            </div>
          </div>
          <h4 className="text-lg md:text-2xl font-black text-white leading-tight drop-shadow-sm">{q.q}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pb-4">
            {q.a.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="bg-white/5 border-2 border-emerald-400/20 hover:border-yellow-400 hover:bg-white/10 p-4 rounded-xl transition-all text-left text-xs md:text-sm font-bold flex items-center gap-4 group"
              >
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-800 border-2 border-emerald-400 flex items-center justify-center text-[10px] md:text-xs font-black group-hover:bg-yellow-400 group-hover:text-emerald-950 transition-colors shrink-0">
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="flex-1 leading-tight">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 animate-in fade-in zoom-in duration-300 py-4">
          <div className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center shadow-2xl border-4 ${feedback.correct ? 'bg-emerald-500 border-white/40' : 'bg-red-500 border-white/40'}`}>
            <i className={`fas ${feedback.correct ? 'fa-check' : 'fa-times'} text-2xl md:text-3xl text-white`}></i>
          </div>
          <div className="space-y-2">
            <h5 className={`font-black uppercase text-xs tracking-widest ${feedback.correct ? 'text-emerald-400' : 'text-red-400'}`}>
              {feedback.correct ? 'Análisis Correcto' : 'Error en Diagnóstico'}
            </h5>
            <p className="text-base md:text-lg font-bold text-white max-w-2xl leading-relaxed italic px-4">
              "{feedback.msg}"
            </p>
          </div>
          <button 
            onClick={next} 
            className="bg-white text-emerald-900 font-black px-12 py-3 rounded-full hover:bg-yellow-400 transition transform hover:scale-105 uppercase text-xs tracking-[0.2em] shadow-xl"
          >
            Continuar Desafío
          </button>
        </div>
      )}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.1); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default Quiz;
