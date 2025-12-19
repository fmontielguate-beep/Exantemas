
import React, { useState, useCallback } from 'react';
import FloatingUI from './components/FloatingUI';
import InteractiveExplorer from './components/InteractiveExplorer';
import Quiz from './components/Quiz';
import AIAssistant from './components/AIAssistant';
import VerticalNav from './components/VerticalNav';
import { MEASLES_DATA } from './constants';

const NAV_ORDER = ["Epidemiología", "Incubación", "Pródromo", "Exantema", "Recuperación", "Complicaciones", "Diagnóstico", "Tratamiento", "Prevención"];

const App: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showLabels, setShowLabels] = useState(true);
  const selectedData = selectedId ? MEASLES_DATA[selectedId] : null;

  const handleNavigate = useCallback((direction: 'prev' | 'next' | 'reset') => {
    if (direction === 'reset') { setSelectedId(null); return; }
    const currentIndex = selectedId ? NAV_ORDER.indexOf(selectedId) : -1;
    if (direction === 'next') {
      setSelectedId(NAV_ORDER[(currentIndex + 1) % NAV_ORDER.length]);
    } else if (direction === 'prev') {
      setSelectedId(NAV_ORDER[currentIndex <= 0 ? NAV_ORDER.length - 1 : currentIndex - 1]);
    }
  }, [selectedId]);

  return (
    <div className="relative w-full h-screen grid grid-rows-[80px_1fr_30vh] overflow-hidden bg-slate-950 font-sans">
      <FloatingUI />
      
      {/* HEADER: Fila 1 */}
      <header className="z-40 flex items-center justify-between px-8 bg-blue-900/40 backdrop-blur-md border-b-4 border-yellow-500/50 shadow-2xl">
        <div className="flex items-center gap-5">
          <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-600 p-2.5 rounded-xl shadow-[0_0_20px_rgba(245,158,11,0.5)] border-2 border-white/30 rotate-3 transform hover:rotate-0 transition-transform cursor-pointer">
            <i className="fas fa-virus-covid text-2xl text-white"></i>
          </div>
          <div>
            <h1 className="text-2xl md:text-3xl font-black tracking-tighter text-white drop-shadow-lg uppercase italic">
              Universo <span className="text-yellow-400">Trencadís</span> Médico
            </h1>
            <p className="text-[9px] text-cyan-300 font-black tracking-[0.4em] uppercase opacity-80">Morbillivirus Specialized Explorer</p>
          </div>
        </div>
        
        <button 
          onClick={() => setShowLabels(!showLabels)}
          className={`px-6 py-2 rounded-full border-2 text-[10px] font-black tracking-widest uppercase transition-all shadow-lg ${
            showLabels 
            ? 'bg-yellow-400 border-yellow-200 text-orange-900' 
            : 'bg-white/10 border-white/20 text-white'
          }`}
        >
          Etiquetas: {showLabels ? 'ON' : 'OFF'}
        </button>
      </header>

      {/* WORKSPACE: Fila 2 */}
      <main className="flex overflow-hidden relative">
        {/* Nav Lateral */}
        <aside className="w-60 bg-indigo-950/80 backdrop-blur-xl border-r-4 border-blue-500/50 shadow-2xl overflow-y-auto custom-scrollbar">
          <VerticalNav onSelect={setSelectedId} selectedId={selectedId} />
        </aside>

        {/* Explorer Central */}
        <section className="flex-1 relative bg-black/20">
          <InteractiveExplorer 
            onSelectItem={setSelectedId} 
            onNavigate={handleNavigate}
            showLabels={showLabels} 
          />
        </section>

        {/* Panel Info */}
        <article className="w-[450px] bg-gradient-to-br from-orange-800/90 to-red-950/95 backdrop-blur-2xl border-l-4 border-yellow-600/50 shadow-inner overflow-y-auto custom-scrollbar">
          {!selectedData ? (
            <div className="h-full flex flex-col items-center justify-center p-12 text-center space-y-6">
              <div className="w-24 h-24 rounded-2xl bg-white/5 border-2 border-dashed border-white/20 flex items-center justify-center animate-pulse">
                <i className="fas fa-microscope text-5xl text-yellow-500/50"></i>
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter">Nodo de Diagnóstico</h3>
              <p className="text-orange-200 text-sm font-bold leading-relaxed max-w-xs italic">"Cada fragmento de información es una pieza esencial para el control epidemiológico."</p>
            </div>
          ) : (
            <div className="p-10 space-y-10 animate-in slide-in-from-right-10 duration-500">
              <header className="relative">
                <span className="absolute -top-6 -left-2 text-[60px] font-black text-white/5 select-none uppercase pointer-events-none">
                  {selectedData.type}
                </span>
                <span className="inline-block px-4 py-1 rounded-md bg-white text-orange-900 text-[10px] font-black uppercase tracking-widest shadow-lg mb-4">
                  Protocolo v.2024
                </span>
                <h2 className="text-5xl font-black text-white leading-[0.9] drop-shadow-2xl">{selectedData.title}</h2>
                <div className="h-2 w-32 bg-yellow-400 rounded-full mt-6 shadow-lg shadow-orange-500/50"></div>
              </header>

              <div className="space-y-6">
                <p className="text-xl text-orange-50 leading-relaxed font-bold text-justify tracking-tight border-l-4 border-yellow-400 pl-6 italic">
                  {selectedData.content}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/10 group hover:bg-black/40 transition-colors">
                    <i className="fas fa-shield-halved text-yellow-500 mb-2"></i>
                    <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Nivel de Riesgo</h5>
                    <p className="text-sm font-bold text-white">ALTO - NIVEL 4</p>
                  </div>
                  <div className="p-4 bg-black/20 rounded-2xl border border-white/10 group hover:bg-black/40 transition-colors">
                    <i className="fas fa-check-double text-emerald-400 mb-2"></i>
                    <h5 className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Estado de Datos</h5>
                    <p className="text-sm font-bold text-white">VERIFICADO</p>
                  </div>
                </div>
              </div>

              <footer className="pt-8 border-t border-white/10">
                <button 
                  onClick={() => setSelectedId(null)}
                  className="w-full py-4 rounded-2xl bg-white/5 border-2 border-white/10 text-white font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all text-xs"
                >
                  <i className="fas fa-chevron-left mr-3"></i> Volver al Espacio
                </button>
              </footer>
            </div>
          )}
        </article>
      </main>

      {/* QUIZ: Fila 3 */}
      <section className="z-30 bg-emerald-900/90 backdrop-blur-3xl border-t-4 border-emerald-400 shadow-[0_-10px_40px_rgba(0,0,0,0.8)] overflow-hidden">
        <Quiz />
      </section>

      <AIAssistant />
      
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(0,0,0,0.2); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; border: 2px solid transparent; background-clip: content-box; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.3); }
      `}</style>
    </div>
  );
};

export default App;
