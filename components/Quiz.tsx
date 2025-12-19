
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
      <div className="h-full flex flex-col items-center justify-center p-8 bg-black/30 animate-in fade-in duration-700">
        <div className="w-20 h-20 rounded-full bg-yellow-400 border-4 border-white flex items-center justify-center mb-4 shadow-[0_0_30px_rgba(250,204,21,0.5)]">
          <i className="fas fa-medal text-3xl text-emerald-900"></i>
        </div>
        <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Misión Evaluada</h3>
        <p className="text-emerald-300 font-black text-xl mt-1 uppercase tracking-widest">Puntuación: {score} / {QUIZ_QUESTIONS.length}</p>
        <button 
          onClick={() => { setCurrentIdx(0); setScore(0); setShowResult(false); }} 
          className="mt-6 bg-white text-emerald-900 px-12 py-3 rounded-full font-black uppercase tracking-widest hover:bg-yellow-400 transition transform hover:scale-105 shadow-2xl"
        >
          Reiniciar Ciclo
        </button>
      </div>
    );
  }

  const q = QUIZ_QUESTIONS[currentIdx];

  return (
    <div className="h-full flex flex-col p-6 md:p-8 max-w-6xl mx-auto w-full overflow-y-auto custom-scrollbar">
      {!feedback ? (
        <div className="space-y-4 md:space-y-6">
          <div className="flex items-center gap-4">
            <span className="bg-yellow-400 text-emerald-950 px-3 py-1 rounded-lg font-black text-[10px] uppercase">CASO {currentIdx + 1}</span>
            <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden border border-white/5">
              <div className="h-full bg-gradient-to-r from-yellow-400 to-emerald-400 transition-all duration-700" style={{ width: `${((currentIdx+1)/QUIZ_QUESTIONS.length)*100}%` }}></div>
            </div>
            <span className="text-[10px] font-black text-emerald-300 uppercase opacity-60">Validación Epidemiológica</span>
          </div>
          <h4 className="text-lg md:text-2xl font-black text-white leading-tight drop-shadow-md">{q.q}</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {q.a.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                className="bg-emerald-800/40 border-2 border-emerald-400/20 hover:border-yellow-400 hover:bg-emerald-700/60 p-4 rounded-2xl transition-all text-left text-sm font-bold flex items-center gap-4 group shadow-lg"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-900 border-2 border-emerald-400 flex items-center justify-center text-xs font-black group-hover:bg-yellow-400 group-hover:text-emerald-950 transition-colors shrink-0">
                  {String.fromCharCode(65 + i)}
                </div>
                <span className="flex-1 text-emerald-50 leading-tight">{opt}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center space-y-4 animate-in zoom-in duration-300 py-2">
          <div className={`w-16 h-16 rounded-3xl flex items-center justify-center shadow-2xl border-4 ${feedback.correct ? 'bg-yellow-400 border-white text-emerald-900' : 'bg-red-500 border-white text-white'}`}>
            <i className={`fas ${feedback.correct ? 'fa-check-circle' : 'fa-exclamation-circle'} text-3xl`}></i>
          </div>
          <div className="space-y-1">
            <h5 className={`font-black uppercase text-xs tracking-[0.2em] ${feedback.correct ? 'text-yellow-400' : 'text-red-400'}`}>
              {feedback.correct ? 'Confirmación Técnica' : 'Error en el Análisis'}
            </h5>
            <p className="text-base md:text-lg font-bold text-white max-w-3xl italic leading-relaxed">
              "{feedback.msg}"
            </p>
          </div>
          <button 
            onClick={next} 
            className="bg-white text-emerald-900 font-black px-14 py-3 rounded-full hover:bg-yellow-400 transition-all transform hover:scale-105 uppercase text-xs tracking-widest shadow-2xl"
          >
            Siguiente Caso <i className="fas fa-arrow-right ml-2"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default Quiz;